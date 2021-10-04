module.exports = {
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      backgroundColor: (theme) => ({
        ...theme("colors"),
        primary: "#6AA7B3",
      }),
      textColor: (theme) => ({
        ...theme("colors"),

        primary: "#6AA7B3",
      }),
      borderColor: (theme) => ({
        ...theme("colors"),

        primary: "#6AA7B3",
      }),
      fontFamily: {
        body: ["Lato"],
      },
    },
  },
  variants: {
    extend: {
      backgroundColor: ["disabled"],
      backgroundOpacity: ["disabled"],
    },
  },
  plugins: [],
};
