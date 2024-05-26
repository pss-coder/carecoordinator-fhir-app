"use client";
import { Config } from "@/config";
import { FetchFhirClient, FhirClient } from "@bonfhir/core/r4b";
import { MantineRenderer } from "@bonfhir/mantine/r4b";
import { FhirQueryProvider } from "@bonfhir/query/r4b";
import { FhirUIProvider } from "@bonfhir/react/r4b";
import "@mantine/code-highlight/styles.css";
import { AppShell, Center, Loader, MantineProvider } from "@mantine/core";
import "@mantine/core/styles.css";
import "@mantine/dates/styles.css";
import "@mantine/tiptap/styles.css";
import { SessionProvider, signIn, signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { PropsWithChildren, useEffect, useState } from "react";

export default function SandboxLayout({ children }: PropsWithChildren) {
  const router = useRouter();

  return (
    <html lang="en">
      <head>
        <title>bonFHIR sample Next app</title>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
        <link rel="icon" href="/favicon.svg" sizes="any" />
        {/* <ColorSchemeScript forceColorScheme="light" /> */}
      </head>
      <body>
        <MantineProvider>
          <SessionProvider>
            <WithAuth>
              <FhirUIProvider
                renderer={MantineRenderer}
                onNavigate={({ target, aux }) => {
                  if (aux) {
                    window.open(target, "_blank");
                  } else {
                    router.push(target);
                  }
                }}
              >
                <>{children}</>
                {/* <ReactQueryDevtools /> */}
              </FhirUIProvider>
            </WithAuth>
          </SessionProvider>
        </MantineProvider>
      </body>
    </html>
  );
}

function WithAuth(props: PropsWithChildren) {
  const { data: session, status } = useSession({
    required: true,
    onUnauthenticated() {
      signIn("medplum");
    },
  });
  const [fhirClient, setFhirClient] = useState<FhirClient>();

  useEffect(() => {
    if (session?.accessToken) {
      setFhirClient(
        new FetchFhirClient({
          baseUrl: Config.public.fhirUrl,
          auth: `Bearer ${session.accessToken}`,
          async onError(response) {
            if (response.status === 401) {
              signOut({ callbackUrl: "/" });
            }
          },
        }),
      );
    }
  }, [session?.accessToken]);

  if (status !== "authenticated" || !session?.accessToken || !fhirClient) {
    return (
      <AppShell>
        <AppShell.Main>
          <Center h="100vh">
            <Loader />
          </Center>
        </AppShell.Main>
      </AppShell>
    );
  }

  return (
    <FhirQueryProvider fhirClient={fhirClient}>
      {props.children}
    </FhirQueryProvider>
  );
}
