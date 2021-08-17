module.exports = {
  preset: "ts-jest",
  testEnvironment: "jsdom",
  rootDir: "src",
  moduleDirectories: [".yarn/cache", "src/__test__"],
  setupFilesAfterEnv: ["@testing-library/jest-dom/extend-expect", "<rootDir>/__test__/setup.ts"],
  moduleNameMapper: {
    "\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$":
      "<rootDir>/__mocks__/fileMock.ts",
  },
};
