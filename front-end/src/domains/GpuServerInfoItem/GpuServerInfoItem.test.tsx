import { MemoryRouter } from "react-router-dom";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { rest } from "msw";
import { useMoveToPage } from "../../hooks";
import GpuServerInfoItem from "./GpuServerInfoItem";
import { ThemeProvider } from "../../styles";
import { BASE_URL, PATH } from "../../constants";
import { MemberType } from "../../types";
import server from "../../__mocks__/server";
import { simpleGpuServer } from "../../__fixtures__/gpuServersResponses";

const refresh = jest.fn();

jest.mock("../../hooks/useHistory/useHistory.ts", () => ({
  ...jest.requireActual<Record<string, unknown>>("../../hooks/useHistory/useHistory.ts"),
  useMoveToPage: jest.fn<void, [string]>(),
}));

describe("GpuServer/InfoItem", () => {
  const setup = (memberType: MemberType = "USER") => {
    render(
      <ThemeProvider>
        <MemoryRouter initialEntries={[`${PATH.GPU_SERVER.VIEW}/${simpleGpuServer.id}`]}>
          <GpuServerInfoItem
            {...simpleGpuServer}
            labId={1}
            memberType={memberType}
            refresh={refresh}
          />
        </MemoryRouter>
      </ThemeProvider>
    );

    const detailButton = screen.getByRole("button", { name: "상세", hidden: true });
    expect(detailButton).toBeInTheDocument();

    return {
      detailButton,
    };
  };

  test("상세 버튼을 클릭하면 상세 화면으로 이동한다", async () => {
    const { detailButton } = setup();

    userEvent.click(detailButton, { button: 1 });

    expect(useMoveToPage).toHaveBeenCalledWith(`${PATH.GPU_SERVER.VIEW}/${simpleGpuServer.id}`);
  });

  test("삭제 버튼을 클릭하면 Confirm가 표시된다", async () => {
    setup("MANAGER");

    const deleteButton = screen.getByRole("button", { name: /삭제/, hidden: true });

    userEvent.click(deleteButton, { button: 1 });

    const confirm = await screen.findByRole("dialog", { name: /confirm/i });

    expect(confirm).toBeInTheDocument();
    expect(confirm).toHaveTextContent(`${simpleGpuServer.serverName}을(를) 정말 삭제하시겠습니까?`);
  });

  test("삭제 버튼을 클릭하여 발생한 Confirm의 확인 버튼을 클릭하면 Alert가 표시된다", async () => {
    setup("MANAGER");

    // 삭제 버튼을 클릭한다
    const deleteButton = screen.getByRole("button", { name: /삭제/, hidden: true });
    userEvent.click(deleteButton, { button: 1 });

    // Confirm창이 표시된다
    expect(await screen.findByRole("dialog", { name: /confirm/i })).toBeInTheDocument();

    // Confirm 창의 확인 버튼을 클릭한다
    const confirmButton = screen.getByRole("button", { name: /확인/, hidden: true });
    userEvent.click(confirmButton, { button: 1 });

    // Confirm창이 닫힌 것을 확인한다
    expect(screen.queryByRole("dialog", { name: /confirm/i })).not.toBeInTheDocument();

    // 삭제에 성공하였다는 메세지를 가진 Alert창이 표시된다
    const alert = await screen.findByText(`${simpleGpuServer.serverName}을(를) 삭제하였습니다.`);
    expect(alert).toBeInTheDocument();

    // Alert창의 확인 버튼을 클릭한다
    userEvent.click(screen.getByRole("button", { name: /confirm/ }), { button: 1 });
    expect(refresh).toHaveBeenCalled();
  });

  // TODO: 에러에 따른 구체적인 디렉션 추가 필요
  test("서버를 삭제하려고 시도하였으나 에러가 발생하여 실패하면, 에러 메세지를 표시한다", async () => {
    server.use(
      rest.delete(`${BASE_URL}/labs/:labId/gpus/:serverId`, (_, res, ctx) => res(ctx.status(400)))
    );

    setup("MANAGER");

    // 삭제 버튼을 클릭한다
    const deleteButton = screen.getByRole("button", { name: /삭제/, hidden: true });
    userEvent.click(deleteButton, { button: 1 });

    // Confirm창이 표시된다
    expect(await screen.findByRole("dialog", { name: /confirm/i })).toBeInTheDocument();

    // Confirm 창의 확인 버튼을 클릭한다
    const confirmButton = screen.getByRole("button", { name: /확인/, hidden: true });
    userEvent.click(confirmButton, { button: 1 });

    // Confirm창이 닫힌 것을 확인한다
    expect(screen.queryByRole("dialog", { name: /confirm/i })).not.toBeInTheDocument();

    // 삭제에 실패하였다는 메세지를 가진 Alert창이 표시된다
    const alert = await screen.findByText(`${simpleGpuServer.serverName} 삭제에 실패하였습니다.`);
    expect(alert).toBeInTheDocument();

    // Alert창의 확인 버튼을 클릭한다
    userEvent.click(screen.getByRole("button", { name: /confirm/ }), { button: 1 });
  });

  test("삭제 버튼을 클릭하여 발생한 Confirm의 취소 버튼을 클릭하면 Confirm이 표시되지 않는다", async () => {
    setup("MANAGER");

    // 삭제 버튼을 클릭한다
    const deleteButton = screen.getByRole("button", { name: /삭제/, hidden: true });
    userEvent.click(deleteButton, { button: 1 });

    // Confirm창이 표시된다
    expect(await screen.findByRole("dialog", { name: /confirm/i })).toBeInTheDocument();

    // Confirm 창의 취소 버튼을 클릭한다
    const confirmButton = screen.getByRole("button", { name: /취소/, hidden: true });
    userEvent.click(confirmButton, { button: 1 });

    // Confirm창이 닫힌 것을 확인한다
    expect(screen.queryByRole("dialog", { name: /confirm/i })).not.toBeInTheDocument();
  });
});
