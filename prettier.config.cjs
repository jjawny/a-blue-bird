/** @type {import("prettier").Config} */
const config = {
  printWidth: 128,
  plugins: [require.resolve("prettier-plugin-tailwindcss")],
};

module.exports = config;
