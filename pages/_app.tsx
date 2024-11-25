import {
  ChakraProvider,
  ColorModeProvider,
  ThemeProvider,
} from "@chakra-ui/react";
import { AppProps } from "next/app";
import { AuthProvider } from "../context/AuthContext";
import theme from "../theme";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider>
      <ThemeProvider theme={theme}>
        <ColorModeProvider options={{ initialColorMode: "light" }}>
          <AuthProvider>
            <Component {...pageProps} />
          </AuthProvider>
        </ColorModeProvider>
      </ThemeProvider>
    </ChakraProvider>
  );
}
