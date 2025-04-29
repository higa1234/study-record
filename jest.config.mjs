export default {
    testEnvironment: "jsdom",
    moduleNameMapper: {
      "^@/(.*)$": "<rootDir>/src/$1",
      "\\.(css|less)$": "identity-obj-proxy",
    },
    testEnvironment: "jest-environment-jsdom",
    setupFilesAfterEnv: ["./jest.setup.js"],
    transform: {
        "^.+\\.[t|j]sx?$": "babel-jest",
    },
  };
  
  