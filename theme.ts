import { extendTheme } from "@chakra-ui/react";

const colors = {
  crimson: {
    light: "#DC143C",
    dark: "#7F0000",
  },
  cream: {
    light: "#FFFDD0",
    dark: "#1A1A1A",
  },
};

const theme = extendTheme({
  colors,
  config: {
    initialColorMode: "light",
    useSystemColorMode: false,
  },
});

export default theme;
