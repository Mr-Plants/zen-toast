module.exports = {
  testMatch: ['<rootDir>/test/*.spec.js'],
  transform: {
    "^.+\\.js$": "babel-jest",
    ".*\\.(vue)$": "vue-jest"
  },
  transformIgnorePatterns: ['<rootDir>/node_modules/']
};
