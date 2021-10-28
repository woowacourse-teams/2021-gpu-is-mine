import { render, screen, userEvent } from "../../__test__/test-utils";
import JobRegisterForm from "./JobRegisterForm";

describe("JobRegisterForm", () => {
  test("docker hub Image Input에 docker pull 을 입력하면 생략된다 ", async () => {
    render(<JobRegisterForm labId={1} />);

    const dockerHubImageInput = screen.getByRole("combobox", { name: "Docker Hub Image" });

    userEvent.type(dockerHubImageInput, "docker pull aprn7950/mnist_test_100_auto");
    userEvent.tab();

    expect(dockerHubImageInput).toHaveValue("aprn7950/mnist_test_100_auto");
  });
});
