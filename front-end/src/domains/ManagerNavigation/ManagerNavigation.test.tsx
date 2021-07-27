import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Location } from "history";
import { MemoryRouter, Route } from "react-router-dom";
import ManagerNavigation from "./ManagerNavigation";
import { PATH } from "../../constants";

describe("ManagerNavigation", () => {
  const leftClick = { button: 0 };

  const renderWithRouter = () => {
    let testLocation = {} as Location;

    render(
      <MemoryRouter initialEntries={["/"]}>
        <ManagerNavigation />
        <Route
          path="*"
          render={({ location }) => {
            testLocation = location;

            return null;
          }}
        />
      </MemoryRouter>
    );

    return () => testLocation;
  };

  test("Gpu 서버 관리 조회 Route 테스트", () => {
    const getLocation = renderWithRouter();

    userEvent.click(screen.getByRole("link", { name: "gpu-server-view" }), leftClick);

    expect(getLocation().pathname).toBe(PATH.MANAGER.GPU_SERVER.VIEW);
  });

  test("Gpu 서버 관리 등록 Route 테스트", () => {
    const getLocation = renderWithRouter();

    userEvent.click(screen.getByRole("link", { name: "gpu-server-register" }), leftClick);

    expect(getLocation().pathname).toBe(PATH.MANAGER.GPU_SERVER.REGISTER);
  });

  test("Job 관리 등록  Route 테스트", () => {
    const getLocation = renderWithRouter();

    userEvent.click(screen.getByRole("link", { name: "job-register" }), leftClick);

    expect(getLocation().pathname).toBe(PATH.MANAGER.JOB.REGISTER);
  });
});
