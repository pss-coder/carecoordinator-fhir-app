import {
  Appointment,
  Practitioner,
  Reference,
  build,
  findReference,
  isReferenceOf,
  reference,
} from "@bonfhir/core/r4b";
import { FhirSubscription } from "@bonfhir/subscriptions/r4b";

import io from 'socket.io-client'



export const arrivedAppointments: FhirSubscription<Appointment> = {
  criteria: "Appointment?status=arrived",
  reason: "Create encounters for arrived appointments",
  endpoint: "arrived-appointments",

  async handler({ fhirClient, resource: appointment, logger }) {
    // This is just a precaution
    if (!appointment || appointment.status !== "arrived") return;

    //console.log(appointment.identifier); // Get patient ID from appointment identifier

    console.log("calling socket emit api: ");

    // call API here?
    // pass patient id, here
    await fetch("http://localhost:3000/api", {
      method: "POST"
    })
      .then((response) => response.text())
      .then((body) => {
        console.log(body);
      })
      .catch((error) => console.log(error));
    
    // Check if the appointment already has an encounter associated
    // const existingEncounters = await fhirClient.search("Encounter", (search) =>
    //   search.appointment(appointment),
    // );
    // if (existingEncounters.searchMatch().length > 0) return;

    // const socket = io('http://localhost:3000');
    // console.log(socket.connected)
    // socket.emit("message1", 'Appointment Created')
    

    // Create the new encounter
    // Note that we're using the build function from @bonfhir/core to create the encounter.
    // We reference the appointment, and copy the appointment's subject and participants as well.
    // const newEncounter = build("Encounter", {
    //   status: "arrived",
    //   class: {
    //     system: "http://terminology.hl7.org/CodeSystem/v3-ActCode",
    //     code: "AMB",
    //     display: "ambulatory",
    //   },
    //   appointment: [reference(appointment)],
    //   subject: findReference(
    //     appointment.participant.map((p) => p.actor),
    //     "Patient",
    //   ),
    //   participant: appointment.participant
    //     .filter((participant) =>
    //       isReferenceOf(participant.actor, "Practitioner"),
    //     )
    //     .map((participant) => ({
    //       individual: participant.actor as Reference<Practitioner>,
    //       type: participant.type,
    //     })),
    // });

    // // save new encounter to server
    // const result = await fhirClient.save(newEncounter);

    // logger?.info("Created encounter", result);

  },
};
