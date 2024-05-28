"use client";
// import "@mantine/code-highlight/styles.css";
import { ColorSchemeScript, MantineProvider, Notification, createTheme, em } from "@mantine/core";
import "@mantine/core/styles.css";
import { PropsWithChildren } from "react";

/**
 * Customize Mantine Theme.
 * https://mantine.dev/theming/theme-object/
 */
const theme = createTheme({
  // breakpoints: {
  //       xs: '36em',
  //       sm: '48em',
  //       md: '62em',
  //       lg: '75em',
  //       xl: '88em',
  // }
});

export default function RootLayout({ children }: PropsWithChildren) {
  // const router = useRouter();

  return (
    <html lang="en">
      <head>
        <title>Care Coordinator</title>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
        <link rel="icon" href="/favicon.svg" sizes="any" />

        <ColorSchemeScript forceColorScheme="light" />
      </head>
      <body>
        <MantineProvider theme={theme} deduplicateCssVariables={false}>
          {children}
        </MantineProvider>
        
      </body>
    </html>
  );
}
