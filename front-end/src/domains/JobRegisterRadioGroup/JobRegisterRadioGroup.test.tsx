import { gpuServersRedux } from "../../__fixtures__";
import { sortByIsOn, sortByPerformanceDesc } from "./JobRegisterRadioGroup";

describe("sort", () => {
  test("sortByPerformanceDesc", () => {
    gpuServersRedux
      .slice()
      .sort(sortByPerformanceDesc)
      .map(({ performance }) => performance)
      .reduce((prev, curr) => {
        expect(prev).toBeGreaterThan(curr);

        return curr;
      }, Infinity);
  });

  test("sortByIsOn: On-Server comes earlier than Off-Server", () => {
    const sorted = gpuServersRedux
      .slice()
      .sort(sortByIsOn)
      .map(({ isOn }) => isOn);

    const lastTrue = sorted.lastIndexOf(true);
    const firstFalse = sorted.indexOf(false);

    if (lastTrue === -1 || firstFalse === -1) {
      return;
    }

    expect(lastTrue).toBeLessThan(firstFalse);

    sorted.slice(0, lastTrue + 1).forEach((el) => expect(el).toBe(true));
    sorted.slice(firstFalse).forEach((el) => expect(el).toBe(false));
  });
});
