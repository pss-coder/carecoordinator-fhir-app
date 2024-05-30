import { Image, Text, Container, ThemeIcon, Title, SimpleGrid, Avatar } from '@mantine/core';
// import IMAGES from './images';
import classes from './Features.module.css';
import { IconAvocado } from '@tabler/icons-react';

const data = [
  {
    image: 'auditors',
    title: 'Pharmacists',
    description: 'Azurill can be seen bouncing and playing on its big, rubbery tail',
  },
  {
    image: 'lawyers',
    title: 'Lawyers',
    description: 'Fans obsess over the particular length and angle of its arms',
  },
  {
    image: 'accountants',
    title: 'Bank owners',
    description: 'They divvy up their prey evenly among the members of their pack',
  },
  {
    image: 'others',
    title: 'Others',
    description: 'Phanpy uses its long nose to shower itself',
  },
];

export function Features() {
  const items = data.map((item) => (
    <div className={classes.item} key={item.image}>
      <ThemeIcon 
      color="rgba(255, 255, 255, 1)"
      autoContrast
      className={classes.itemIcon} size={60} radius="md">
        <IconAvocado size={20} />
      </ThemeIcon>

      <div>
        <Text fw={700} fz="lg" className={classes.itemTitle}>
          {item.title}
        </Text>
        <Text c="white">{item.description}</Text>
      </div>
    </div>
  ));

  return (
    <div className={classes.bg}>
    <Container pt={30} pb={50} className={classes.wrapper}>
      <Text className={classes.supTitle}>Use cases</Text>

      <Title className={classes.title} order={2}>
        PharmLand is <span className={classes.highlight}>not</span> just for pharmacists
      </Title>

      <Container size={660} p={0}>
        <Text c="white" className={classes.description}>
          Its lungs contain an organ that creates electricity. The crackling sound of electricity
          can be heard when it exhales. Azurill’s tail is large and bouncy. It is packed full of the
          nutrients this Pokémon needs to grow.
        </Text>
      </Container>

      <SimpleGrid cols={{ base: 1, xs: 2 }} spacing={50} mt={30}>
        {items}
      </SimpleGrid>
    </Container>
    </div>
  );
}