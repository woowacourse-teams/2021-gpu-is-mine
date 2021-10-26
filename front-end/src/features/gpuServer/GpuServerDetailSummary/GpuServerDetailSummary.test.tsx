import { configureStore, EnhancedStore } from "@reduxjs/toolkit";
import { render, screen } from "../../../__test__/test-utils";
import gpuServerReducer, { GpuServerSliceState } from "../gpuServerSlice";
import authReducer from "../../member/authSlice";
import GpuServerDetailSummary from "./GpuServerDetailSummary";
import { gpuServer, succeedAuthState } from "../../../__fixtures__";

const store: EnhancedStore = configureStore({
  reducer: { gpuServer: gpuServerReducer, auth: authReducer },
  preloadedState: {
    auth: succeedAuthState,
    gpuServer: {
      entities: [gpuServer],
      "gpuServer/fetchAll": {
        status: "succeed",
        error: null,
      },
      "gpuServer/fetchById": {
        status: "succeed",
        error: null,
      },
      "gpuServer/register": {
        status: "idle",
        error: null,
      },
      "gpuServer/deleteById": {
        status: "idle",
        error: null,
      },
    } as unknown as GpuServerSliceState,
  },
});

describe("GpuServerDetailSummary", () => {
  test("data", () => {
    render(<GpuServerDetailSummary serverId={gpuServer.id} />, { store });

    expect(screen.getByText(gpuServer.serverName)).toBeInTheDocument();

    expect(screen.getByRole("alert", { name: /서버 상태/ })).toBeInTheDocument();

    expect(screen.getByText(/RAM 용량/)).toBeInTheDocument();
    expect(screen.getByText(gpuServer.memorySize, { exact: false })).toBeInTheDocument();

    expect(screen.getByText(/디스크 용량/)).toBeInTheDocument();
    expect(screen.getByText(gpuServer.diskSize, { exact: false })).toBeInTheDocument();

    expect(screen.getByText(/GPU 장치명/)).toBeInTheDocument();
    expect(screen.getByText(gpuServer.modelName)).toBeInTheDocument();

    expect(screen.getByText(/성능/)).toBeInTheDocument();
    expect(screen.getByText(gpuServer.performance, { exact: false })).toBeInTheDocument();

    expect(screen.getByText(/현재 실행중인 Job/)).toBeInTheDocument();
    expect(screen.getByText(gpuServer.runningJob.name)).toBeInTheDocument();

    expect(screen.getByText(/대기중인 Job/)).toBeInTheDocument();
    expect(screen.getByText(gpuServer.waitingJobCount, { exact: false })).toBeInTheDocument();
  });
});
