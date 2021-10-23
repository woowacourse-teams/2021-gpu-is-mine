import { render, screen } from "../../../__test__/test-utils";
import GpuServerDetailSummary from "./GpuServerDetailSummary";
import { gpuServerDetailResponse } from "../../../__fixtures__";

describe("GpuServerDetailSummary", () => {
  test("data", () => {
    render(<GpuServerDetailSummary detail={gpuServerDetailResponse} serverId={1} labId={1} />);

    expect(screen.getByText(gpuServerDetailResponse.serverName)).toBeInTheDocument();

    expect(screen.getByRole("alert", { name: /서버 상태/ })).toBeInTheDocument();

    expect(screen.getByText(/RAM 용량/)).toBeInTheDocument();
    expect(
      screen.getByText(gpuServerDetailResponse.memorySize, { exact: false })
    ).toBeInTheDocument();

    expect(screen.getByText(/디스크 용량/)).toBeInTheDocument();
    expect(
      screen.getByText(gpuServerDetailResponse.diskSize, { exact: false })
    ).toBeInTheDocument();

    expect(screen.getByText(/GPU 장치명/)).toBeInTheDocument();
    expect(screen.getByText(gpuServerDetailResponse.gpuBoard.modelName)).toBeInTheDocument();

    expect(screen.getByText(/성능/)).toBeInTheDocument();
    expect(
      screen.getByText(gpuServerDetailResponse.gpuBoard.performance, { exact: false })
    ).toBeInTheDocument();

    expect(screen.getByText(/현재 실행중인 Job/)).toBeInTheDocument();
    expect(screen.getByText(/가짜 뉴스 검증을 위한 댓글 분류 학습/)).toBeInTheDocument();

    expect(screen.getByText(/대기 중인 Job/)).toBeInTheDocument();
    expect(screen.getByText(/1개/)).toBeInTheDocument();
  });
});
