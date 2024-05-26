"use client";

import { Navbar } from "@/components/Navbar/Navbar";
import { useFhirSearch } from "@bonfhir/query/r4b";
import { FhirValue } from "@bonfhir/react/r4b";
import {
  AppShell,
  Burger,
  Container,
  Grid,
  Group,
  Notification,
  Paper,
  SimpleGrid,
  Stack,
  Text,
  Title,
  rem,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { act, useState } from "react";
import classes from "./page.module.css";
import { PatientGeneral } from "@/components/PatientGeneral/PatientGeneral";
import PatientReportsTable from "@/components/PatientsTable/PatientsReportTable";
import { PatientUpdateCard } from "@/components/PatientUpdateCard/PatientUpdateCard";

const PRIMARY_COL_HEIGHT = rem(500);

export default function Sandbox() {
  const [opened, { toggle }] = useDisclosure();

  const patientsSearchQuery = useFhirSearch("Patient");

  const [active, setActive] = useState("")

  const patientLinks = patientsSearchQuery.data
    ?.searchMatch()
    .map((patient) => (
      <a
        href="#"
        data-active={patient.id === active || undefined}
        onClick={(event) =>{ event.preventDefault(); setActive(patient.id); console.log(patient.id)}}
        key={patient.id}
        className={classes.patientLinks}
      >
        <span style={{ marginRight: rem(9), fontSize: rem(16) }}>
          {
            <FhirValue
              className={classes.patientLink}
              type="HumanName"
              value={patient.name}
            />
          }
        </span>{" "}
      </a>
    ));


  return (
    <AppShell
      header={{ height: 50 }}
      navbar={{
        width: 320,
        breakpoint: "sm",
        collapsed: { mobile: !opened },
      }}
      padding="md"
    >
      <AppShell.Header>
        <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
      </AppShell.Header>

      <AppShell.Navbar>
        <Navbar patientLinks={patientLinks} />
      </AppShell.Navbar>

      <AppShell.Main>
        {/* <Container my="xl"> */}
        {active && 
      <Container fluid my="md">
      <Grid>
        <Grid.Col span={{ base: 12, xs: 8 }}> <PatientGeneral patientID={active} /></Grid.Col>
        <Grid.Col span={{ base: 12, xs: 4 }}><PatientUpdateCard /></Grid.Col>
        <Grid.Col span={{ base: 12, xs: 8 }}><PatientReportsTable patientId={active} /></Grid.Col>
        {/* <Grid.Col span={{ base: 12, xs: 4 }}>{child}</Grid.Col>
        <Grid.Col span={{ base: 12, xs: 3 }}>{child}</Grid.Col>
        <Grid.Col span={{ base: 12, xs: 3 }}>{child}</Grid.Col>
        <Grid.Col span={{ base: 12, xs: 6 }}>{child}</Grid.Col> */}
      </Grid>
    </Container>
        }
        {/* </Container> */}
      </AppShell.Main>
    </AppShell>
  );
}
