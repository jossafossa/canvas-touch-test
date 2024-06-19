require( "eslint-plugin-only-warn" );

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
    "object-curly-spacing": [ "warn", "always" ],
    "array-bracket-spacing": [ "warn", "always" ],
    "computed-property-spacing": [ "warn", "always" ],
    "block-spacing": [ "warn", "always" ],
    "space-in-parens": [ "warn", "always" ],

    // use double quotes
    quotes: [ "warn", "double" ],
    
    "no-else-return": "warn",

    // use semicolons

  },

};
