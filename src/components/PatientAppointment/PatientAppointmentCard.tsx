"use client"

import { Appointment, asError, build } from "@bonfhir/core/r4b";
import { useFhirCreateMutation, useFhirSearch } from "@bonfhir/query/r4b";
import { FhirQueryLoader, FhirValue } from "@bonfhir/react/r4b";
import { Button, ButtonGroup, Card, Group, List, Notification, Text } from "@mantine/core";
import { useState } from "react";



export default function PatientAppointmentCard({patientID}) {

    const appointmentSearchQuery = useFhirSearch("Appointment");

    const createAppointmentMutation = useFhirCreateMutation("Appointment", {
      mutation: {
        onSuccess: (appointment) => {
          alert("Appointment Created")
        },
        onError: (error) => {
          console.log(error)
          alert("Something went wrong")
        }
        }
      });

    const buildAppointment = (patientId) =>
      build("Appointment", {
        status: "arrived",
        identifier: [
          {
            system: "Patient",
            value: patientID
          }
        ],
        start: new Date().toISOString(),
        end: new Date().toISOString(),
        participant: [
          {
            type: [
              {
                coding: [
                  {
                    code: "ADM" // Admittor
                  }
                ]
              }
            ],
            "status": "accepted"
          },
        ]
      })



    function getPatientAppointments(query, patientId) {
      const appointments = []
      query.data?.searchMatch().map(appt => {
        if (appt.identifier) {
          //appointments.push(appt)
          appt.identifier?.map(item => {
                if (item.value === patientID) {
                  appointments.push(appt)
                }
            })
        }
    })
    return appointments
    }

    if (appointmentSearchQuery.isLoading) {
      return <div>Loading...</div>;
    }
  
    if (appointmentSearchQuery.isError) {
      return <div>{asError(appointmentSearchQuery.error)?.message}</div>;
    }

    return (
        <Card withBorder radius={'md'} shadow="md" padding="lg">
          <Group justify="space-between">
            <Text >Appointments</Text>
            <Button
              loading={createAppointmentMutation.isPending}
              onClick={() => createAppointmentMutation.mutate(buildAppointment(patientID))}
            >Demo Add</Button>
          </Group>
          <List spacing="sm" size="sm" center>
            {getPatientAppointments(appointmentSearchQuery, patientID).map(appt => {
              return (
                <List.Item key={appt.id}>
                  <Group>
                      <FhirValue
                    type="string"
                    value={appt.status}
                  />
                  <FhirValue
                    type="dateTime"
                    value={appt.start}
                  />
                  -
                  <FhirValue
                    type="dateTime"
                    value={appt.end}
                  />
                  </Group>
                
            </List.Item>
              )
            })}

          </List>
        </Card>
      );
}