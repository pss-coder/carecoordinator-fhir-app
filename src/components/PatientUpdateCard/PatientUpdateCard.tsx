import { Text, Card, RingProgress, Group, useMantineTheme, Spoiler } from '@mantine/core';
import classes from './PatientUpdateCard.module.css';

const stats = [
  { value: 447, label: 'Remaining' },
  { value: 76, label: 'In progress' },
];

export function PatientUpdateCard() {
  const theme = useMantineTheme();
  const completed = 1887;
  const total = 2334;
  const items = stats.map((stat) => (
    <div key={stat.label}>
      <Text className={classes.label}>{stat.value}</Text>
      <Text size="xs" c="dimmed">
        {stat.label}
      </Text>
    </div>
  ));

  return (
    <Card withBorder p="xl" radius="md" className={classes.card}>
      <div className={classes.inner}>
        <div>
          <Text fz="xl" className={classes.label}>
            Patient Update
          </Text>

          <Text size="xs" lineClamp={4}>
          the patient was found to be cold and sweaty. This nurse was able to wake the patient by tapping them on the arm and stating their name, but the patient remained in a disoriented, drowsy state.
          </Text>
          
          <div>
            <Text className={classes.lead} mt={30}>
            18871887188718871887188718871887
            </Text>
            <Text fz="xs" c="dimmed">
              Completed
            </Text>
          </div>
          <Group mt="lg">{items}</Group>
        </div>

        {/* <div className={classes.ring}>
          <RingProgress
            roundCaps
            thickness={6}
            size={150}
            sections={[{ value: (completed / total) * 100, color: theme.primaryColor }]}
            label={
              <div>
                <Text ta="center" fz="lg" className={classes.label}>
                  {((completed / total) * 100).toFixed(0)}%
                </Text>
                <Text ta="center" fz="xs" c="dimmed">
                  Completed
                </Text>
              </div>
            }
          />
        </div> */}
      </div>
    </Card>
  );
}