import { gpuServersResponses } from "../../__fixtures__";
import { sortByIsOn, sortByPerformanceDesc } from "./JobRegisterRadioGroup";

describe("sort", () => {
  test("sortByPerformanceDesc", () => {
    gpuServersResponses.gpuServers
      .slice()
      .sort(sortByPerformanceDesc)
      .map(({ gpuBoard: { performance } }) => performance)
      .reduce((prev, curr) => {
        expect(prev).toBeGreaterThan(curr);

        return curr;
      }, Infinity);
  });

  test("sortByIsOn: On-Server comes earlier than Off-Server", () => {
    gpuServersResponses.gpuServers
      .slice()
      .sort(sortByIsOn)
      .map(({ isOn }) => isOn)
      .reduce((prev, curr) => {
        if (prev) {
          expect(curr).not.toBe(false);
        } else {
          expect(curr).toBe(false);
        }

        return curr;
      });
  });
});
