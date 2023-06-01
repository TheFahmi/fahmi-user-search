module.exports = {
  preset: "react-scripts",
  transform: {
    "^.+\\.(js|jsx)$": "babel-jest",
  },
  transformIgnorePatterns: [
    "<rootDir>/node_modules/(?!axios)",
  ],
};
