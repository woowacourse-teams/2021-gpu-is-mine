import { renderHook } from "@testing-library/react-hooks/dom";
import useInterval from "./useInterval";

beforeEach(() => {
  jest.useFakeTimers("legacy");
});

describe("useInterval", () => {
  test("delay 가 null 인 경우, callback은 호출되지 않는다", () => {
    const callback = jest.fn();
    renderHook(() => useInterval(callback, null));

    jest.runAllTimers();

    expect(setInterval).not.toHaveBeenCalled();
  });

  test("delay ms 간격으로 callback이 주기적으로 호출된다", () => {
    const callback = jest.fn();
    const delay = 10_000;
    renderHook(() => useInterval(callback, delay));

    expect(setInterval).toHaveBeenCalledWith(expect.any(Function), delay);

    jest.advanceTimersByTime(delay);

    expect(callback).toHaveBeenCalledTimes(1);

    jest.advanceTimersByTime(delay);

    expect(callback).toHaveBeenCalledTimes(2);
  });

  test("callback 함수가 변경되어도 delay ms 간격으로 callback이 호출된다", () => {
    const callback = jest.fn();
    const delay = 15_000;
    const initialProps = { callback, delay };

    const { rerender } = renderHook<typeof initialProps, void>(
      (props) => useInterval(props.callback, props.delay),
      { initialProps }
    );

    // useInterval 이 실행된 직후 setInterval이 1회 호출된다
    expect(setInterval).toHaveBeenCalledTimes(1);

    // delay/2 ms 가 지난 이후에 어떤 이유로 useInterval 이 재호출되며 callback 의 참조값이 변경되었다
    const newCallback = jest.fn();
    jest.advanceTimersByTime(delay / 2);
    rerender({ callback: newCallback, delay });

    // callback이 변경되어도 clearInterval(useEffect cleanup function)과 setInterval은 호출되지 않는다.
    expect(clearInterval).not.toBeCalled();
    expect(setInterval).toHaveBeenCalledTimes(1);

    // 추가로 delay/2 ms 가 지나, setInterval의 interval만큼 경과되어 newCallback이 실행된다.
    jest.advanceTimersByTime(delay / 2);
    expect(newCallback).toHaveBeenCalledTimes(1);

    // delay/2 ms 가 지나도 newCallback은 실행되지 않는다.
    jest.advanceTimersByTime(delay / 2);
    expect(newCallback).toHaveBeenCalledTimes(1);
  });
});
