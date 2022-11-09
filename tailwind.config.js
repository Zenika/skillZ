module.exports = {
  important: true,
  // Active dark mode on class basis
  darkMode: "class",
  content: ["./src/**/*.tsx"],

  theme: {
    filter: {
      name: "brightness",
      88: "88%",
    },

    colors: {
      dark: {
        light: "#292929",
        med: "#1e1e1e",
        dark: "#121212",
        ultradark: "#000000",
        graytext: "rgba(255, 255, 255, 0.87)",
        graybutton: "rgba(255, 255, 255, 0.1)",
        radargrid: "rgba(255, 255, 255, 0.2)",
        panel: "#292929",
        yellow: "#F4C042",
        violet: "#D264EC",
        green: "#3bb78f",
        red: "#bf1d67",
        blue: "#52B9FF",
      },
      light: {
        light: "#F9F9F9",
        med: "#F3F3F3",
        dark: "#E0E0E0",
        ultrawhite: "#FFFFFF",
        graytext: "rgba(0, 0, 0, 0.87)",
        graybutton: "rgba(0, 0, 0, 0.1)",
        radargrid: "rgba(0, 0, 0, 0.2)",
        panel: "#FFFFFF",
        yellow: "#F4C042",
        violet: "#D264EC",
        green: "#3bb78f",
        red: "#bf1d67",
        blue: "#52B9FF",
      },
    },
    backgroundPosition: {
      right: "right 2rem bottom 50%",
      rightDropdown: "right 2rem bottom 45%",
    },
    minHeight: {
      homePanel: "400px",
      homePanelMobile: "300px",
    },
    extend: {
      hueRotate: {
        8: "8deg",
      },
      width: {
        13: "3.25rem",
        15: "3.75rem",
        radar: "800px",
      },
      height: {
        radar: "800px",
        "1/6": "16.66%",
        "1/12": "8.333333%",
      },
      margin: {
        radar: "8.333333%",
      },
    },
  },
  variants: {
    extend: {
      backgroundColor: ["checked"],
      borderColor: ["checked"],
      inset: ["checked"],
      zIndex: ["hover", "active"],
      opacity: ["disabled"],
    },
  },
  plugins: [],
};
