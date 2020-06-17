module.exports = {
  root: true, // prevents eslint from searching for further configuration files in parent directories
  parser: "@typescript-eslint/parser",
  plugins: ["@typescript-eslint"],
  extends: ["plugin:@typescript-eslint/recommended", "prettier", "prettier/@typescript-eslint"],
  env: {
    es6: true,
    node: true,
  },
  parserOptions: {
    sourceType: "module",
    ecmaVersion: 2018,
  },
  rules: {
    "jsx-a11y/anchor-is-valid": "off",
    "@typescript-eslint/explicit-member-accessibility": "off",
    "@typescript-eslint/no-unused-vars": "off",
    "@typescript-eslint/no-unused-vars-experimental": "error",
  },
  globals: {},
};

// module.exports = {
//   root: true,
//   env: {
//     node: true,
//     es6: true
//   },
//   extends: [
//     "airbnb",
//     "plugin:@typescript-eslint/recommended",
//     "prettier",
//     "prettier/react",
//     "prettier/@typescript-eslint"
//   ],
//   globals: {
//     Atomics: "readonly",
//     SharedArrayBuffer: "readonly"
//   },
//   parserOptions: {
//     ecmaFeatures: {
//       jsx: true
//     },
//     ecmaVersion: 2018,
//     sourceType: "module"
//   },
//   parser: "@typescript-eslint/parser",
//   plugins: ["@typescript-eslint", "react"],
//   rules: {
//     "jsx-a11y/anchor-is-valid": "off",
//     "@typescript-eslint/explicit-member-accessibility": "off",
//     "react/prop-types": 0
//   }
// };
