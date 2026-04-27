import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#171717",
        mist: "#eef0ed",
        line: "#d8dbd6",
        amber: "#f59f16",
        pine: "#12362f",
      },
      boxShadow: {
        soft: "0 18px 50px rgba(23, 23, 23, 0.12)",
        panel: "0 10px 32px rgba(23, 23, 23, 0.08)",
      },
    },
  },
  plugins: [],
};

export default config;
