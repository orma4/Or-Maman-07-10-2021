const getDesignTokens = (mode) => ({
  typography: {
    htmlFontSize: 10,
  },
  palette: {
    mode,
  },
  components: {
    MuiTypography: {
      styleOverrides: {
        h1: {
          fontSize: "4.6rem",
          fontWeight: "bold",
          marginBottom: "2rem",
          "@media (max-width: 767px)": {
            fontSize: "4.4rem",
          },
        },
        h2: {
          color: "#b5bfcb",
          fontSize: "4rem",
          fontWeight: "bold",
          marginBottom: "2rem",
          "@media (max-width: 767px)": {
            fontSize: "3.5rem",
          },
        },
      },
    },
  },
});

export default getDesignTokens;
