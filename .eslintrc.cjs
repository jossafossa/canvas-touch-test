module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    // recommended rules from eslint
    "eslint:recommended",
  ],
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
  },
  rules: {
    "no-plusplus": "off",
    "linebreak-style": "off",
    "object-curly-spacing": [ "error", "always" ],
    "array-bracket-spacing": [ "error", "always" ],
    "computed-property-spacing": [ "error", "always" ],
    "block-spacing": [ "error", "always" ],
    "space-in-parens": [ "error", "always" ],

    // use double quotes
    quotes: [ "error", "double" ],
    
    "no-else-return": "error",

    // use semicolons

  },
};
