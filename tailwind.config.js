/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{html,ts,tsx}"],
  theme: {
    extend: {},
    colors: {
      background: "#F5F5F5",
      white: "#ffffff",
      primary: "#0085FF",
      backgroundHighlight: "#EFEFEF",
      editorPlaceholder: "#C6C6C6",
      black: "#000000",
      transparent: "transparent",
      secondary: "#e4e4e4",
      hashtag: "#0094ff",
      header: "#232323",
      border: {
        1: "#AEAEAE",
        dark: "#828282",
        light: "#DADADA",
      },
    },
    fontFamily: {
      sans: ['"Inter"'],
    },
  },
  plugins: [],
};
