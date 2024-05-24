"use client";

import { Hero } from '@/components/Hero/Hero';
import { Navbar } from '@/components/Navbar/Navbar';
import PatientsTable from '@/components/PatientsTable/PatientsTable';
import { AppShell, Burger, Container, Grid, Paper, SimpleGrid, Skeleton, Stack, Title, rem } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';


const PRIMARY_COL_HEIGHT = rem(500);



export default function Sandbox() {
  const [opened, { toggle }] = useDisclosure();

  const SECONDARY_COL_HEIGHT = `calc(${PRIMARY_COL_HEIGHT} / 2 - var(--mantine-spacing-md) / 2)`;


  return (
    <AppShell
      header={{ height: 50 }}
      navbar={{
        width: 320,
        breakpoint: 'sm',
        collapsed: { mobile: !opened },
      }}
      padding="md"
    >
      <AppShell.Header>
        <Burger
          opened={opened}
          onClick={toggle}
          hiddenFrom="sm"
          size="sm"
        />
      </AppShell.Header>

      <AppShell.Navbar>
        <Navbar />
      </AppShell.Navbar>

      <AppShell.Main>
        
      <Container fluid my="xl">
      <SimpleGrid cols={{ base: 1, sm: 2 }} spacing="md">
        {/* <Skeleton height={PRIMARY_COL_HEIGHT} radius="md" animate={false} /> */}
        <Stack>
          <Paper withBorder shadow='sm' radius={15} p={10}>
            <Title>Patient List</Title>
            <PatientsTable />
          </Paper>
          
        </Stack>
        
        {/* <Grid gutter="md">
          <Grid.Col>
            <Skeleton height={SECONDARY_COL_HEIGHT} radius="md" animate={false} />
          </Grid.Col>
          <Grid.Col span={6}>
            <Skeleton height={SECONDARY_COL_HEIGHT} radius="md" animate={false} />
          </Grid.Col>
          <Grid.Col span={6}>
            <Skeleton height={SECONDARY_COL_HEIGHT} radius="md" animate={false} />
          </Grid.Col>
        </Grid> */}
      </SimpleGrid>
    </Container>

    
      </AppShell.Main>
    </AppShell>
  );
}