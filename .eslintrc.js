module.exports = {
  extends: ["plugin:jsx-a11y/recommended", "airbnb"],
  plugins: ["jsx-a11y"],
  rules: {
    "no-console": "off"
  },
  env: {"browser": true}
};