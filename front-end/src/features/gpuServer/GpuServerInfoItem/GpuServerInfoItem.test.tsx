import { configureStore } from "@reduxjs/toolkit";
import { rest } from "msw";
import { render, screen, userEvent } from "../../../__test__/test-utils";
import { BASE_URL, PATH } from "../../../constants";
import { useMoveToPage } from "../../../hooks";
import GpuServerInfoItem from "./GpuServerInfoItem";
import server from "../../../__mocks__/server";
import { succeedAuthState, gpuServer } from "../../../__fixtures__";
import gpuServerReducer from "../gpuServerSlice";
import type { GpuServerSliceState } from "../gpuServerSlice";
import authReducer from "../../member/authSlice";

jest.mock("../../../hooks/useHistory/useHistory.ts", () => ({
  ...jest.requireActual<Record<string, unknown>>("../../../hooks/useHistory/useHistory.ts"),
  useMoveToPage: jest.fn<void, [string]>(),
}));

const store = configureStore({
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

describe("GpuServer/InfoItem", () => {
  const setup = () => {
    render(<GpuServerInfoItem serverId={gpuServer.id} />, { store });

    const detailButton = screen.getByRole("button", { name: "상세", hidden: true });
    expect(detailButton).toBeInTheDocument();

    return {
      detailButton,
    };
  };

  test("상세 버튼을 클릭하면 상세 화면으로 이동한다", async () => {
    const { detailButton } = setup();

    userEvent.click(detailButton);

    expect(useMoveToPage).toHaveBeenCalledWith(`${PATH.GPU_SERVER.VIEW}/${gpuServer.id}`);
  });

  test("삭제 버튼을 클릭하면 Confirm가 표시된다", async () => {
    setup();

    const deleteButton = screen.getByRole("button", { name: /삭제/, hidden: true });

    userEvent.click(deleteButton);

    const confirm = await screen.findByRole("dialog");

    expect(confirm).toBeInTheDocument();
    expect(confirm).toHaveTextContent(`${gpuServer.serverName}을(를) 삭제하시겠습니까?`);
  });

  test("삭제 버튼을 클릭하여 발생한 Confirm의 취소 버튼을 클릭하면 Confirm이 표시되지 않는다", async () => {
    setup();

    // 삭제 버튼을 클릭한다
    const deleteButton = screen.getByRole("button", { name: /삭제/, hidden: true });
    userEvent.click(deleteButton);

    // Confirm창이 표시된다
    expect(await screen.findByRole("dialog")).toBeInTheDocument();

    // Confirm 창의 취소 버튼을 클릭한다
    const confirmButton = screen.getByRole("button", { name: /취소/, hidden: true });
    userEvent.click(confirmButton);

    // Confirm창이 닫힌 것을 확인한다
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  test("삭제 버튼을 클릭하여 발생한 Confirm의 확인 버튼을 클릭하면 Alert가 표시된다", async () => {
    setup();

    // 삭제 버튼을 클릭한다
    const deleteButton = screen.getByRole("button", { name: /삭제/, hidden: true });
    userEvent.click(deleteButton);

    // Confirm창이 표시된다
    expect(await screen.findByRole("dialog")).toBeInTheDocument();

    // Confirm 창의 확인 버튼을 클릭한다
    const confirmButton = screen.getByRole("button", { name: /확인/, hidden: true });
    userEvent.click(confirmButton);

    // Confirm창이 닫힌 것을 확인한다
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();

    // 삭제에 성공하였다는 메세지를 가진 Alert창이 표시된다
    const alert = await screen.findByText(`${gpuServer.serverName}을(를) 삭제하였습니다.`);
    expect(alert).toBeInTheDocument();
  });

  // TODO: 에러에 따른 구체적인 디렉션 추가 필요
  test("서버를 삭제하려고 시도하였으나 에러가 발생하여 실패하면, 에러 메세지를 표시한다", async () => {
    server.use(
      rest.delete(`${BASE_URL}/labs/:labId/gpus/:serverId`, (_, res, ctx) => res(ctx.status(400)))
    );

    setup();

    // 삭제 버튼을 클릭한다
    const deleteButton = screen.getByRole("button", { name: /삭제/, hidden: true });
    userEvent.click(deleteButton);

    // Confirm창이 표시된다
    expect(await screen.findByRole("dialog")).toBeInTheDocument();

    // Confirm 창의 확인 버튼을 클릭한다
    const confirmButton = screen.getByRole("button", { name: /확인/, hidden: true });
    userEvent.click(confirmButton);

    // Confirm창이 닫힌 것을 확인한다
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();

    // 삭제에 실패하였다는 메세지를 가진 토스트가 표시된다
    const alert = await screen.findByText(`GPU 서버 삭제 실패`);
    expect(alert).toBeInTheDocument();
  });
});
