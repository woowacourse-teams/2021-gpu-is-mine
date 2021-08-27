import { addHours, formatDate } from "./date";

describe("date", () => {
  test("formatDate", () => {
    expect(formatDate(new Date(2021, 7, 19, 13, 50))).toBe("2021-08-19 13:50");

    expect(formatDate(new Date(1954, 0, 9, 4, 7))).toBe("1954-01-09 04:07");
  });

  test("addHours: 정수 시간", () => {
    const originalDate = new Date(2021, 7, 19, 13, 50);

    expect(addHours(originalDate, -24)).toEqual(new Date("2021-08-18T13:50"));

    expect(addHours(originalDate, -10)).toEqual(new Date("2021-08-19T03:50"));

    expect(addHours(originalDate, 0)).toEqual(originalDate);

    expect(addHours(originalDate, 10)).toEqual(new Date("2021-08-19T23:50"));

    expect(addHours(originalDate, 12)).toEqual(new Date("2021-08-20T01:50"));
  });

  test("addHours: 소숫점 미만은 반올림되어 정수 시간만 반영된다", () => {
    const originalDate = new Date(2021, 7, 19, 13, 50);
    expect(addHours(originalDate, -0.5)).toEqual(new Date("2021-08-19T12:50"));
    expect(addHours(originalDate, 0.5)).toEqual(originalDate);
  });
});
