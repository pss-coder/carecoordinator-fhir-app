import { Center, Container, Grid, SimpleGrid, Text, ThemeIcon, rem } from "@mantine/core";
import {
  IconCircleDotted,
  IconFileCode,
  IconFlame,
  IconReceiptOff,
} from "@tabler/icons-react";
import classes from "./LogoCloud.module.css";

const features = [
  {
    icon: IconReceiptOff,
    title: "Free and open source",
    description:
      "All packages are published under MIT license, you can use Mantine in any project",
  },
  {
    icon: IconFileCode,
    title: "TypeScript based",
    description:
      "Build type safe applications, all components and hooks export types",
  },
  {
    icon: IconCircleDotted,
    title: "No annoying focus ring",
    description:
      "With new :focus-visible selector focus ring will appear only when user navigates with keyboard",
  },
  {
    icon: IconFlame,
    title: "Flexible",
    description:
      "Customize colors, spacing, shadows, fonts and many other settings with global theme object",
  },
];

export function LogoCloud() {
  const items = features.map((feature) => (
    <Grid.Col span="auto" key={feature.title}>
      <ThemeIcon
        w={80}
        h={60}
        radius="md"
        // variant="gradient"
        gradient={{ deg: 133, from: "blue", to: "blue" }}
      >
        <feature.icon
          style={{ width: rem(35), height: rem(35) }}
          stroke={1.5}
        />
      </ThemeIcon>
      {/* <Text fz="lg" mt="sm" fw={500}>
        {feature.title}
      </Text>
      <Text c="dimmed" fz="sm">
        {feature.description}
      </Text> */}
    </Grid.Col>
  ));

  return (
    <Container className={classes.wrapper}>
      {/* <Grid.Col span={{ base: 12, md: 5 }}>
          <Title className={classes.title} order={2}>
            A fully featured React components library for your next project
          </Title>
          <Text c="dimmed">
            Build fully functional accessible web applications faster than ever – Mantine includes
            more than 120 customizable components and hooks to cover you in any situation
          </Text>

          <Button
            variant="gradient"
            gradient={{ deg: 133, from: 'blue', to: 'cyan' }}
            size="lg"
            radius="md"
            mt="xl"
          >
            Get started
          </Button>
        </Grid.Col> */}

      <Grid justify="center" align="center">
        {items}
        {/* {items} */}
      </Grid>
    </Container>
  );
}
