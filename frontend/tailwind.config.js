module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#2D947A",
        secondary: "#263959",
        para: "#696E77",
        "secondary-rgba": "rgba(15, 53, 103, 0.693)",
      },
      screens: {
        "2xl": { max: "1535px" },
        xl: { max: "1279px" },
        lg: { max: "1023px" },
        md: { max: "800px" },
        mobile: { max: "512px" },
      },
      boxShadow: {
        shadow1: "0px 10px 60px rgba(15,53,103,0.1)",
        shadow2: "rgba(99, 99, 99, 0.2) 0px 2px 2px 0px;",
      },
    },
  },
  plugins: [],
}
