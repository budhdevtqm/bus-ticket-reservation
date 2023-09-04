module.exports = {
  env: {
    browser: true,
    es2021: true
  },
  extends: ["airbnb"],
  overrides: [
    {
      env: {
        node: true
      },
      files: [".eslintrc.js", ".eslintrc.cjs"],
      parserOptions: {
        sourceType: "script"
      }
    }
  ],
  parserOptions: {
    ecmaVersion: 2023, // You can specify the actual version number here if you want
    sourceType: "module",
    ecmaFeatures: {
      jsx: true
    }
  },
  rules: {
    semi: ["error", "always"],
    quotes: ["error", "double"],
    "comma-dangle": [
      "warn",
      {
        arrays: "never",
        objects: "never",
        imports: "never",
        exports: "never",
        functions: "never"
      }
    ],
    "react/function-component-definition": [
      "error",
      {
        namedComponents: "arrow-function",
        unnamedComponents: "arrow-function"
      }
    ],
    "arrow-body-style": "off",
    "no-underscore-dangle": ["error", { allow: ["_place"] }],
    allowElseIf: 0,
    "react/prop-types": "off"
  }
};
