import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Location } from "history";
import { MemoryRouter, Route } from "react-router-dom";
import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import UserNavigation from "./UserNavigation";
import { PATH } from "../../constants";
import memberReducer from "../../features/member/memberSlice";

const store = configureStore({
  reducer: {
    member: memberReducer,
  },
  preloadedState: {
    member: {
      login: {
        status: "succeed",
        error: null,
      },
      signup: {
        status: "idle",
        error: null,
      },
      myInfo: {
        id: 2,
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
      <Provider store={store}>
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
      </Provider>
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
});
