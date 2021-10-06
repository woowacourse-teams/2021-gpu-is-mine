import { render, screen } from "@testing-library/react";
import Input from "./Input";

describe("Input", () => {
  test("label prop이 그대로 화면에 표시된다", () => {
    render(<Input label="동동" value="3" onChange={() => {}} />);

    expect(screen.getByText("동동")).toHaveTextContent("동동");
  });
});
