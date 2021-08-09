import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Location } from "history";
import { MemoryRouter, Route } from "react-router-dom";
import { AuthProvider } from "../../components";
import UserNavigation from "./UserNavigation";
import { PATH } from "../../constants";

describe("UserNavigation", () => {
  const leftClick = { button: 0 };

  const renderWithRouter = () => {
    let testLocation = {} as Location;

    render(
      <AuthProvider>
        <MemoryRouter initialEntries={["/"]}>
          <UserNavigation />
          <Route
            path="*"
            render={({ location }: { location: Location }) => {
              testLocation = location;

              return null;
            }}
          />
        </MemoryRouter>
      </AuthProvider>
    );

    return () => testLocation;
  };

  test("Gpu 서버 관리 조회 Route 테스트", () => {
    const getLocation = renderWithRouter();

    userEvent.click(screen.getByRole("link", { name: "gpu-server-view" }), leftClick);

    expect(getLocation().pathname).toBe(PATH.USER.GPU_SERVER.VIEW);
  });

  test("Job 관리 조회  Route 테스트", () => {
    const getLocation = renderWithRouter();

    userEvent.click(screen.getByRole("link", { name: "job-view" }), leftClick);

    expect(getLocation().pathname).toBe(PATH.USER.JOB.VIEW);
  });

  test("Job 관리 등록  Route 테스트", () => {
    const getLocation = renderWithRouter();

    userEvent.click(screen.getByRole("link", { name: "job-register" }), leftClick);

    expect(getLocation().pathname).toBe(PATH.USER.JOB.REGISTER);
  });
});
