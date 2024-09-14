import { extendTheme } from "@chakra-ui/react";

const theme = extendTheme({
  colors: {
    brand: {
      primary: "#002f6d",
      secondary: "#ff9202",
    },
  },
  components: {
    Button: {
      baseStyle: {
        fontWeight: "bold",
      },
      variants: {
        solid: {
          bg: "brand.secondary",
          color: "white",
          _hover: {
            bg: "#e68200",
          },
        },
        outline: {
          borderColor: "brand.secondary",
          color: "brand.secondary",
          _hover: {
            bg: "#fff5e6",
          },
        },
      },
    },
    Heading: {
      baseStyle: {
        color: "brand.primary",
      },
    },
    Text: {
      baseStyle: {
        color: "brand.primary",
      },
    },
  },
});

export default theme;
