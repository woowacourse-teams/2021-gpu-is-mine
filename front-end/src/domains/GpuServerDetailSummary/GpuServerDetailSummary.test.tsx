/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { render, screen } from "@testing-library/react";
import GpuServerDetailSummary from "./GpuServerDetailSummary";
import { gpuServerResponse } from "../../__fixtures__";

jest.mock("./useGpuServerDetailSummary", () => ({
  ...jest.requireActual("./useGpuServerDetailSummary"),
  useGpuServerDetail: () => ({ detail: gpuServerResponse }),
}));

describe("GpuServerDetailSummary", () => {
  test("data", () => {
    render(<GpuServerDetailSummary serverId={1} labId={1} />);

    expect(screen.getByText(gpuServerResponse.serverName)).toBeInTheDocument();

    expect(screen.getByRole("alert", { name: /서버 상태/ })).toBeInTheDocument();

    expect(screen.getByText(/RAM 용량/)).toBeInTheDocument();
    expect(screen.getByText(gpuServerResponse.memorySize)).toBeInTheDocument();

    expect(screen.getByText(/디스크 용량/)).toBeInTheDocument();
    expect(screen.getByText(gpuServerResponse.diskSize)).toBeInTheDocument();

    expect(screen.getByText(/GPU 장치명/)).toBeInTheDocument();
    expect(screen.getByText(gpuServerResponse.gpuBoard.modelName)).toBeInTheDocument();

    expect(screen.getByText(/성능/)).toBeInTheDocument();
    expect(screen.getByText(gpuServerResponse.gpuBoard.performance)).toBeInTheDocument();

    expect(screen.getByText(/현재 실행중인 Job/)).toBeInTheDocument();
    expect(screen.getByText(/가짜 뉴스 검증을 위한 댓글 분류 학습/)).toBeInTheDocument();

    expect(screen.getByText(/대기 중인 Job/)).toBeInTheDocument();
    expect(screen.getByText(/1개/)).toBeInTheDocument();
  });
});
