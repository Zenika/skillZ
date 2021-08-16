module.exports = {
  important: true,
  // Active dark mode on class basis
  darkMode: "class",
  // purge: ["./src/pages/**/*.tsx", "./src/components/**/*.tsx"],

  theme: {

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
        cyan: "#00E3EC",
        blue: "#52B9FF",
        red: "#bf1d67",
      },
      light: {
        light: "#F9F9F9",
        med: "#F3F3F3",
        dark: "#BCBCBC",
        ultrawhite: "#FFFFFF",
        graytext: "rgba(0, 0, 0, 0.87)",
        graybutton: "rgba(0, 0, 0, 0.1)",
        radargrid: "rgba(0, 0, 0, 0.2)",
        panel: "#FFFFFF",
        yellow: "#F4C042",
        violet: "#D264EC",
        cyan: "#00E3EC",
        blue: "#52B9FF",
        red: "#bf1d67",
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
      filters: [{
      name: 'brightness',
          theme: {
            88: '88%',
          },
          name: 'contrast',
          theme: {
            81: "81%",
          },
          name: 'saturate',
          theme: {
            1685: '1685%',
          },
          name: 'sepia',
          theme: {
            20: '80%',
          },
      }],
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
  plugins: [require("tailwindcss-css-filters")],
};
