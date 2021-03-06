module.exports = {
  root: true,
  env: { node: true },
  extends: ["plugin:vue/essential", "@vue/prettier"],
  rules: {
    "vue/html-self-closing": "off",
    "no-irregular-whitespace": "off",
    "vue/no-parsing-error": [2, { "x-invalid-end-tag": false }],
    "no-console": process.env.NODE_ENV === "production" ? "error" : "off",
    "no-debugger": process.env.NODE_ENV === "production" ? "error" : "off"
  },
  parserOptions: { parser: "babel-eslint" }
}
