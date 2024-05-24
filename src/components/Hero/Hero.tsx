import { Container, Text, Button, Group, Grid, AspectRatio, Image, Paper, Pill } from '@mantine/core';
import { GithubIcon } from '@mantinex/dev-icons';
import classes from './Hero.module.css';
import image from "@/image/image.png"
import { IconChevronRight, IconPhoto } from '@tabler/icons-react';
import { LogoCloud } from '../LogoCloud/LogoCloud';

export function Hero() {
  return (
    <div className={classes.wrapper}>
    <Container fluid size={1500} className={classes.inner}>

        <Grid gutter="xl">
            <Grid.Col className={classes.left}  span={{ base: 12, md: 7, lg: 7 }}>

            <Group mb={20}>
                <Button variant="fill" radius={50}>What's New</Button>
                <Button
                    component="a"
                    // href="https://github.com/mantinedev/mantine"
                    variant="white"
                    c={'dimmed'}
                    // leftSection={<GithubIcon size={20} />}
                    rightSection={<IconChevronRight size={20} />}
                    >
                    Just Shipped v1.2
                </Button>
            </Group>

            <h1 className={classes.title}>
          {' '}
          <Text component="span" variant="gradient" gradient={{ from: 'blue', to: 'cyan' }} inherit>
          Shared Care
          </Text>{' '}
          Model for Community Service Providers
        </h1>

        <Text className={classes.description} color="dimmed">
        Bringining community service providers and hospitals together, <br/> working as one team to provide better care for everyone.
        </Text>

        <Group className={classes.controls}>
          <Button
            // size="md"
            // className={classes.control}
            variant="gradient"
            gradient={{ from: 'black', to: 'black' }}
            // rightSection={<IconChevronRight size={20} />}
          >
           Try Sandbox
          </Button>

          <Button
            component="a"
            // href="https://github.com/mantinedev/mantine"
            // size="xl"
            variant="white"
            color='black'
            // className={classes.control}
            // leftSection={<GithubIcon size={20} />}
            rightSection={<IconChevronRight size={20} />}
          >
            GitHub
          </Button>
        </Group>
            </Grid.Col>



        <Grid.Col className={classes.right} span={{ base: 0, md: 5, lg: 5 }} >
            <Paper className={classes.image_wrapper} shadow='xl'>
                <Image 
                // h={'auto'}
                w={1200}
                radius={5} src={image.src} alt='screenshot of ocp app' />
            </Paper>
            
        </Grid.Col>
        </Grid>

        <LogoCloud/>
      </Container>

    </div>
  );
}