module.exports = {
  preset: "ts-jest",
  testEnvironment: "jsdom",
  rootDir: "src",
  moduleDirectories: ["node_modules", "src/__test__"],
  setupFilesAfterEnv: ["@testing-library/jest-dom/extend-expect"],
  moduleNameMapper: {
    "\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$":
      "<rootDir>/__mocks__/fileMock.ts",
  },
};
