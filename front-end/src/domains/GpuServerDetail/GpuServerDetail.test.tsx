import { render, screen } from "@testing-library/react";

import GpuServerDetail from "./GpuServerDetail";
import { gpuServerResponse } from "../../__fixtures__/gpuServersResponses";

jest.mock("../../hooks", () => ({ useGetGpuServerById: () => ({ data: gpuServerResponse }) }));

describe("GpuServerDetail", () => {
  test("data", () => {
    render(<GpuServerDetail labId={1} />);

    expect(screen.getByText(/GPU 연산량/)).toBeInTheDocument();
    expect(screen.getByText(gpuServerResponse.gpuBoard.performance)).toBeInTheDocument();
    expect(screen.getByText(/현재 실행중인 Job/)).toBeInTheDocument();
    expect(screen.getByText(/대기 중인 Job/)).toBeInTheDocument();
  });
});
