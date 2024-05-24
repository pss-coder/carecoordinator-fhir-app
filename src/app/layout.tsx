"use client";
import { Header } from "@/components/Header/Header";
import { Config } from "@/config";
import { FetchFhirClient, FhirClient } from "@bonfhir/core/r4b";
import { MantineRenderer } from "@bonfhir/mantine/r4b";
import { FhirQueryProvider } from "@bonfhir/query/r4b";
import { FhirUIProvider } from "@bonfhir/react/r4b";
// import "@mantine/code-highlight/styles.css";
import {
  AppShell,
  Center,
  ColorSchemeScript,
  Loader,
  MantineProvider,
  createTheme,
} from "@mantine/core";
import "@mantine/core/styles.css";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { SessionProvider, signIn, signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Children, PropsWithChildren, useEffect, useState } from "react";

/**
 * Customize Mantine Theme.
 * https://mantine.dev/theming/theme-object/
 */
const theme = createTheme({});

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
        <MantineProvider theme={theme}>{children}</MantineProvider>
      </body>
    </html>
  );
}