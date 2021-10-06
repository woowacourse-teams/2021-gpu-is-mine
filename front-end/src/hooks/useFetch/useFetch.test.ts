import { renderHook, act } from "@testing-library/react-hooks/dom";
import { AxiosError } from "axios";
import useFetch, { generateStatusBoolean, unwrapResult } from "./useFetch";

const mockGetData = jest.fn<unknown, unknown[]>();

jest.mock("../../utils/axios", () => ({ getData: (...args: unknown[]) => mockGetData(...args) }));

describe("generateStatusBoolean", () => {
  test("when status is idle", () => {
    expect(generateStatusBoolean("idle")).toMatchObject({
      isIdle: true,
      isLoading: false,
      isSucceed: false,
      isFailed: false,
    });
  });

  test("when status is loading", () => {
    expect(generateStatusBoolean("loading")).toMatchObject({
      isIdle: false,
      isLoading: true,
      isSucceed: false,
      isFailed: false,
    });
  });

  test("when status is succeed", () => {
    expect(generateStatusBoolean("succeed")).toMatchObject({
      isIdle: false,
      isLoading: false,
      isSucceed: true,
      isFailed: false,
    });
  });

  test("when status is failed", () => {
    expect(generateStatusBoolean("failed")).toMatchObject({
      isIdle: false,
      isLoading: false,
      isSucceed: false,
      isFailed: true,
    });
  });
});

describe("unwrapResult", () => {
  test("when error exists, it returns rejected Promise with error", () => {
    const error = new Error() as AxiosError;
    const params = { data: {}, error };

    expect(unwrapResult(params)).rejects.toBe(error);
  });

  test("when error doesn't exist, it returns resolved Promise with data", () => {
    const data = {};
    const params = { data, error: null };

    expect(unwrapResult(params)).resolves.toBe(data);
  });
});

describe("useFetch", () => {
  afterEach(() => {
    mockGetData.mockClear();
  });

  test("initial return value", () => {
    const { result } = renderHook(() => useFetch("url"));

    expect(result.current.status).toBe("idle");
    expect(result.current.data).toBeNull();
    expect(result.current.error).toBeNull();
  });

  test("makeRequest when data fetching has succeed", async () => {
    const returnedData = {};

    mockGetData.mockImplementation(() => Promise.resolve(returnedData));

    const { result, waitForNextUpdate } = renderHook(() => useFetch("url"));

    expect(result.current.status).toBe("idle");

    const prev = { ...result.current };

    act(() => {
      result.current.makeRequest();
    });

    expect(result.current.status).toBe("loading");
    expect(result.current.data).toBe(prev.data);
    expect(result.current.error).toBe(prev.error);

    await waitForNextUpdate();

    expect(mockGetData).toBeCalledTimes(1);

    expect(result.current.status).toBe("succeed");
    expect(result.current.data).toBe(returnedData);
    expect(result.current.error).toBe(null);
  });

  test("makeRequest when data fetching has failed", async () => {
    const thrownError = {};

    mockGetData.mockImplementation(() => Promise.reject(thrownError));

    const { result, waitForNextUpdate } = renderHook(() => useFetch("url"));

    expect(result.current.status).toBe("idle");

    const prev = { ...result.current };

    act(() => {
      result.current.makeRequest();
    });

    expect(result.current.status).toBe("loading");
    expect(result.current.data).toBe(prev.data);
    expect(result.current.error).toBe(prev.error);

    await waitForNextUpdate();

    expect(mockGetData).toBeCalledTimes(1);

    expect(result.current.status).toBe("failed");
    expect(result.current.data).toBe(null);
    expect(result.current.error).toBe(thrownError);
  });

  test("status should become idle when done is called", async () => {
    const returnedData = {};

    mockGetData.mockImplementation(() => Promise.resolve(returnedData));

    const { result, waitForNextUpdate } = renderHook(() => useFetch("url"));

    expect(result.current.status).toBe("idle");

    act(() => {
      result.current.makeRequest();
    });

    await waitForNextUpdate();

    expect(mockGetData).toBeCalledTimes(1);

    expect(result.current.status).toBe("succeed");
    expect(result.current.data).toBe(returnedData);
    expect(result.current.error).toBe(null);

    const prev = { ...result.current };

    act(() => {
      result.current.done();
    });

    expect(result.current.status).toBe("idle");
    expect(result.current.data).toBe(prev.data);
    expect(result.current.error).toBe(prev.error);
  });
});
