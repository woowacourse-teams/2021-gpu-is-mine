import { Location } from "history";
import { MemoryRouter, Route } from "react-router-dom";
import { configureStore } from "@reduxjs/toolkit";
import { render, screen, userEvent, waitFor } from "../../__test__/test-utils";
import UserNavigation from "./UserNavigation";
import { PATH } from "../../constants";
import authReducer from "../../features/member/authSlice";
import { PrivateRoute } from "../../routes";

const store = configureStore({
  reducer: {
    auth: authReducer,
  },
  preloadedState: {
    auth: {
      status: "succeed",
      error: null,
      myInfo: {
        memberId: 2,
        email: "test@test.com",
        name: "name",
        labId: 1,
        labName: "GIM Lab - woowacourse",
        memberType: "MANAGER",
      },
    },
  },
});

describe("UserNavigation", () => {
  const renderWithRouter = () => {
    let testLocation = {} as Location;

    render(
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
    );

    return () => testLocation;
  };

  test("Gpu 서버 관리 조회 Route 테스트", () => {
    const getLocation = renderWithRouter();

    userEvent.click(screen.getByRole("link", { name: "gpu-server-view" }));

    expect(getLocation().pathname).toBe(PATH.GPU_SERVER.VIEW);
  });

  test("Job 관리 조회  Route 테스트", () => {
    const getLocation = renderWithRouter();

    userEvent.click(screen.getByRole("link", { name: "job-view" }));

    expect(getLocation().pathname).toBe(PATH.JOB.VIEW);
  });

  test("Job 관리 등록  Route 테스트", () => {
    const getLocation = renderWithRouter();

    userEvent.click(screen.getByRole("link", { name: "job-register" }));

    expect(getLocation().pathname).toBe(PATH.JOB.REGISTER);
  });

  test("로그아웃 버튼을 클릭하면 로그아웃된다", async () => {
    render(
      <MemoryRouter initialEntries={["/"]}>
        <PrivateRoute exact path="/">
          <UserNavigation />
        </PrivateRoute>
      </MemoryRouter>,
      { store }
    );

    userEvent.click(screen.getByRole("button", { name: /로그아웃/ }));

    await waitFor(() =>
      expect(screen.queryByRole("button", { name: /로그아웃/ })).not.toBeInTheDocument()
    );
  });
});
