module.exports = {
  preset: "ts-jest",
  testEnvironment: "jsdom",
  rootDir: "src",
  moduleDirectories: ["node_modules", "src/__test__"],
  setupFilesAfterEnv: ["@testing-library/jest-dom/extend-expect"],
};
