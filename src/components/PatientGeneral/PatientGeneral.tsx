import { useFhirRead } from "@bonfhir/query/r4b";
import { FhirQueryLoader, FhirValue } from "@bonfhir/react/r4b";
import { Avatar, Group, Paper, Stack, Text } from "@mantine/core";

export function PatientGeneral({patientID}) {
    
    const patientQuery = useFhirRead(
        "Patient",
        patientID,
      );


      return (
        <Paper p="xl">
          <Paper shadow="xs" p="xl">
            <FhirQueryLoader query={patientQuery}>
              {(patient) => (
                <Group justify="center" gap="xl">
                    <Stack>
                        <Group>
                            <Avatar variant="white" size={"xl"} radius={"xl"} src={null} alt="no image here" />
                            <Stack>
                                <Text>Patient</Text>
                                <Text size="xl">
                                    <FhirValue type="HumanName" value={patient.name} />
                                </Text>
                            </Stack>
                        </Group>
                    </Stack>
                  <Stack>
                  <Group>
                    <Text fw={600}>Birthday: </Text>
                    <FhirValue
                      type="date"
                      value={patient.birthDate}
                      options={{ dateStyle: "full" }}
                    />
                  </Group>
                  <Group>
                    <Text fw={600}>Address: </Text>
                    <FhirValue type="Address" value={patient.address} />
                  </Group>
                  <Group>
                    <Text fw={600}>Contact: </Text>
                    <FhirValue type="ContactPoint" value={patient.telecom} />
                  </Group>
                  </Stack>
                  
                </Group>
              )}
            </FhirQueryLoader>
          </Paper>
        </Paper>
      );
}