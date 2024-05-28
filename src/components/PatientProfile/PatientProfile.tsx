import { useFhirRead } from "@bonfhir/query/r4b";
import { FhirQueryLoader, FhirValue } from "@bonfhir/react/r4b";
import { Avatar, Button, Card, Group, Paper, Stack, Text } from "@mantine/core";
import { text } from "stream/consumers";

export function PatientProfile({patientID}) {
    
    const patientQuery = useFhirRead(
        "Patient",
        patientID,
      );

      return (
            <FhirQueryLoader query={patientQuery}>
              {(patient) => (
                <Card withBorder shadow="sm" radius={"md"}>
                  <Text>For Demo: {patient.id}</Text>
                  <Card.Section withBorder inheritPadding py="xs" >
                    <Group justify="space-between">
                      <Text fw={500}>Patient <FhirValue rendererProps={{text: {fw: '500'}}} options={{style:'shorter'}} type="HumanName" value={patient.name} /> Profile</Text>
                      <Button >Edit</Button>
                    </Group>
                  </Card.Section>

                  <Card.Section withBorder inheritPadding py="xs">
                  <Stack>
                        <Group>
                            <Stack gap={'xs'} align="flex-start" justify="flex-start">
                              <Text size="sm" c={"dimmed"}>Full Name</Text>
                              <FhirValue rendererProps={{text: {fw: '500'}}} options={{style:'full'}} type="HumanName" value={patient.name} />
                            </Stack>

                            <Stack gap={'xs'} align="flex-start" justify="flex-start">
                              <Text size="sm" c={"dimmed"}>NRIC/FIN</Text>
                              <Text>S9738332R</Text>
                            </Stack>
                        </Group>
                    </Stack>
                  </Card.Section>

                  <Card.Section withBorder inheritPadding py="xs">
                  <Stack>
                        <Group>
                            <Stack gap={'xs'} align="flex-start" justify="flex-start">
                              <Text size="sm" c={"dimmed"}>Address</Text>
                              <FhirValue type="Address" value={patient.address} />
                            </Stack>
                        </Group>
                    </Stack>
                  </Card.Section>

                  <Card.Section withBorder inheritPadding py="xs">
                  <Stack>
                        <Group>
                            <Stack gap={'xs'} align="flex-start" justify="flex-start">
                              <Text size="sm" c={"dimmed"}>Gender</Text>
                              <FhirValue type="code" value={patient.gender} />
                            </Stack>

                            <Stack gap={'xs'} align="flex-start" justify="flex-start">
                              <Text size="sm" c={"dimmed"}>DOB</Text>
                              <FhirValue type="date" value={patient.birthDate} />
                            </Stack>

                            <Stack gap={'xs'} align="flex-start" justify="flex-start">
                              <Text size="sm" c={"dimmed"}>Communication</Text>
                              {patient.communication?.map(item => (
                                <>
                                  <FhirValue type="CodeableConcept" value={item.language} />
                                </>
                              ))}
                            </Stack>

                            <Stack gap={'xs'} align="flex-start" justify="flex-start">
                              <Text size="sm" c={"dimmed"}>Contact</Text>
                              <FhirValue type="ContactPoint" value={patient.telecom} />
                            </Stack>
                        </Group>
                    </Stack>
                  </Card.Section>



                </Card>
              )}
            </FhirQueryLoader>
      );
}