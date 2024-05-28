"use client";

import {
  ActionIcon,
  Badge,
  Group,
  Text,
  Tooltip,
  UnstyledButton,
  rem,
} from "@mantine/core";
import {
  IconBulb,
  IconCheckbox,
  IconPlus,
  IconUser,
} from "@tabler/icons-react";
//   import { UserButton } from '../UserButton/UserButton';
import { useFhirSearch } from "@bonfhir/query/r4b";
import { FhirValue } from "@bonfhir/react/r4b";
import classes from "./Navbar.module.css";
import { UserButton } from "./UserButton/UserButton";
import { useState } from "react";

const links = [
  { icon: IconBulb, label: "Activity", notifications: 3 },
  { icon: IconCheckbox, label: "Tasks", notifications: 4 },
  { icon: IconUser, label: "My Care Team" },
];

const collections = [
  { emoji: "👍", label: "Sales" },
  { emoji: "🚚", label: "Deliveries" },
  { emoji: "💸", label: "Discounts" },
  { emoji: "💰", label: "Profits" },
  { emoji: "✨", label: "Reports" },
  { emoji: "🛒", label: "Orders" },
  { emoji: "📅", label: "Events" },
  { emoji: "🙈", label: "Debts" },
  { emoji: "💁‍♀️", label: "Customers" },
];

export function Navbar({patientLinks}) {

  // Get Patients List
  // const patientsSearchQuery = useFhirSearch("Patient");

  // const PatientsList = (patientsSearchQuery: UseQueryResult<BundleNavigator<Retrieved<Patient>>>): ReactNode => {
  //   return (
  //     <FhirQueryLoader query={patientsSearchQuery}>
  //       {patientsSearchQuery.data?.searchMatch().map((patient) => {
  //       return (
  //         <a
  //         href="#"
  //         onClick={(event) => event.preventDefault()}
  //         key={patient.id}
  //         className={classes.collectionLink}
  //       >
  //         <span style={{ marginRight: rem(9), fontSize: rem(16) }}>{<FhirValue type="HumanName" value={patient.name} />}</span>{' '}
  //       </a>
  //       );
  //     })}
  //   </FhirQueryLoader>
  //   )
  // }

  const mainLinks = links.map((link) => (
    <UnstyledButton key={link.label} className={classes.mainLink}>
      <div className={classes.mainLinkInner}>
        <link.icon size={20} className={classes.mainLinkIcon} stroke={1.5} />
        <span>{link.label}</span>
      </div>
      {link.notifications && (
        <Badge size="sm" variant="filled" className={classes.mainLinkBadge}>
          {link.notifications}
        </Badge>
      )}
    </UnstyledButton>
  ));

  const collectionLinks = collections.map((collection) => (
    <a
      href="#"
      onClick={(event) => event.preventDefault()}
      key={collection.label}
      className={classes.collectionLink}
    >
      <span style={{ marginRight: rem(9), fontSize: rem(16) }}>
        {collection.emoji}
      </span>{" "}
      {collection.label}
    </a>
  ));

  return (
    <nav className={classes.navbar}>
      <div className={classes.section}>
        <UserButton />
      </div>

      <div className={classes.section}>
        <div className={classes.mainLinks}>{mainLinks}</div>
      </div>

      <div className={classes.section}>
        <Group className={classes.collectionsHeader} justify="space-between">
          <Text size="xs" fw={500} c="dimmed">
            My Patients
          </Text>
          {/* <Tooltip label="Create collection" withArrow position="right">
            <ActionIcon variant="default" size={18}>
              <IconPlus
                style={{ width: rem(12), height: rem(12) }}
                stroke={1.5}
              />
            </ActionIcon>
          </Tooltip> */}
        </Group>
        <div className={classes.collections}>{patientLinks}</div>
      </div>
    </nav>
  );
}
