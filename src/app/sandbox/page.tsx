"use client";

import { Navbar } from "@/components/Navbar/Navbar";
import { useFhirCreateMutation, useFhirSearch } from "@bonfhir/query/r4b";
import { FhirValue } from "@bonfhir/react/r4b";
import {
  Affix,
  AppShell,
  Badge,
  Burger,
  Button,
  Card,
  Container,
  Grid,
  Group,
  Image,
  List,
  Notification,
  Paper,
  SimpleGrid,
  Stack,
  Text,
  Textarea,
  Title,
  Transition,
  rem,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import {  act, useEffect, useState } from "react";
import classes from "./page.module.css";
import PatientReportsTable from "@/components/PatientsTable/PatientsReportTable";
import { PatientUpdateCard } from "@/components/PatientUpdateCard/PatientUpdateCard";
import io from 'socket.io-client';
import { PatientProfile } from "@/components/PatientProfile/PatientProfile";
import PatientAppointmentCard from "@/components/PatientAppointment/PatientAppointmentCard";
import { Communication, asError, build } from "@bonfhir/core/r4b";
import { search } from "@/markdoc/search.mjs";

// const socket = io('http://localhost:3000');

function useSocket(url) {
  const [socket, setSocket] = useState(null)

  useEffect(() => {
    const socketIo = io(url)

    setSocket(socketIo)

    function cleanup() {
      socketIo.disconnect()
    }
    return cleanup

    // should only run once and not on every re-render,
    // so pass an empty array
  }, [])

  return socket
}

export default function Sandbox() {

  const [opened, { toggle }] = useDisclosure();

  const patientsSearchQuery = useFhirSearch("Patient");

  const [active, setActive] = useState("")

  const [showAlert, setShowAlert] = useState({isDisplay: false, id: "", type: ""});

  const socket = useSocket('http://localhost:3000')

  const [imgsURL, setImgURL] = useState([
    {
      url: "https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/images/bg-7.png"
    },
    {

    }
  ]);

  useEffect(() => {

    if (socket) {
      socket.on('clientSendAppt', (data) => {
        console.log("Recieved appointment from server ::", data)
        setShowAlert({isDisplay: true, id: data.id, type: "Appointment Update"});
        // Execute any command
      })
  
      socket.on('clientSendUpdate', (data) => {
        console.log("Recieved patient updates from server ::", data)
        setShowAlert({isDisplay: true, id: data.id, type: "Patient Progress Update"});
      })

      socket.on('clientSendPhoto', (data) => {
        console.log("Recieved patient consent form from server ::", data)
        // TODO: update Image view - simple one would do! 
        setImgURL(imgUrl => [...imgUrl, {url: data.img_url}])
      })

    }
  }, [socket])

  const [updates, setUpdates] = useState([
    'Blood pressure normal.',
    'Medication adjusted.',
  ]);

  const addUpdate = (note) => {
    setUpdates((prevUpdates) => [note, ...prevUpdates]);
  };


  const ProgressUpdate = ({ updates, addUpdate, patientId }) => {
    const [note, setNote] = useState('');
    const handleAddNote = () => {
      addUpdate(note);
      setNote('');
    };

    // Get Communication about Patient
    const communicationSearchQuery = useFhirSearch("Communication", (search) => 
      search
      ._sort("-_lastUpdated")
    );

    const createCommunicationMutation = useFhirCreateMutation("Communication", {
      mutation: {
        onSuccess: async (communication) => {

          const query = new URLSearchParams({
            id: patientId ,
            type: 'update',
            note: note
          });
           
            await fetch(`http://localhost:3000/api/notification?${query.toString()}`, {
            method: "GET"
          })
            .then((response) => response.text())
            .then((body) => {
              console.log(body);
            })
            .catch((error) => console.log(error));

          // alert("Progress Updated")

        },
        onError: (error) => {
          console.log(error)
          alert("Something went wrong")
        }
        }
      });

    const buildCommunication = (patientId, note) =>
      build("Communication", {
        status: "in-progress",
        identifier: [
          {
            system: "Patient",
            value: patientId
          }
        ],
        note: [
          { "text": note,
            "time": new Date().toISOString()
          }
        ]
      })



    function getCommunications(query, patientId) {
      const communications = []
      query.data?.searchMatch().map(notes => {
        if (notes.identifier) {
          //appointments.push(appt)
          notes.identifier?.map(item => {
                if (item.value === patientId) {
                  communications.push(notes)
                  // console.log(item)
                }
            })
        }
    })
    if (communications.length != 0) { return communications[0].note[0] }
    
    return {text: "add latest progress"}
    }

    if (communicationSearchQuery.isLoading) {
      return <div>Loading...</div>;
    }
  
    if (communicationSearchQuery.isError) {
      return <div>{asError(communicationSearchQuery.error)?.message}</div>;
    }

  
    return (
      <Card withBorder radius={'md'} shadow="sm" padding="lg" >
        <Text weight={500} style={{ marginBottom: 10 }}>Latest Progress</Text>
        <List spacing="sm" size="sm" center>
          {/* {updates.map((update, index) => (
            <List.Item key={index}>{update}</List.Item>
          ))} */}
          <List.Item>
            <FhirValue type="string" value={getCommunications(communicationSearchQuery, patientId).text} />
          </List.Item>
          {/* {getCommunications(communicationSearchQuery, patientId).reverse().map(notes => {
            return (
              <List.Item key={notes.id}>
                  <FhirValue type="string" value={notes.note.note[0].text} />
              </List.Item>
            )
          })} */}
        </List>
        <Textarea
          placeholder="update latest progress"
          value={note}
          onChange={(event) => setNote(event.currentTarget.value)}
          minRows={3}
          style={{ marginTop: 15 }}
        />
        <Group style={{ marginTop: 10 }}>
          <Button
             loading={createCommunicationMutation.isPending}
             onClick={() => createCommunicationMutation.mutate(buildCommunication(patientId, note))}
          >Update Progress</Button>
        </Group>
      </Card>
    );
  };
  


  const patientLinks = patientsSearchQuery.data
    ?.searchMatch()
    .map((patient) => (
      <a
        href="#"
        data-active={patient.id === active || undefined}
        onClick={(event) =>{ event.preventDefault(); setActive(patient.id); console.log(patient.id);}}
        key={patient.id}
        className={classes.patientLinks}
      >
        <span style={{ marginRight: rem(9), fontSize: rem(16) }}>
          {
            <FhirValue
              className={classes.patientLink}
              type="HumanName"
              value={patient.name}
            />
          }
        </span>{" "}
      </a>
    ));


  return (
     <AppShell
      header={{ height: 80 }}
      navbar={{
        width: 320,
        breakpoint: "sm",
        collapsed: { mobile: !opened },
      }}
      padding="md"
    >
      <AppShell.Header>
        <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
      </AppShell.Header>

      <AppShell.Navbar>
        <Navbar patientLinks={patientLinks} />
      </AppShell.Navbar>

      <AppShell.Main>
      <Affix position={{ top: 20, right: 20 }}>
          <Transition
            mounted={showAlert.isDisplay}
            transition="slide-left"
            duration={400}
            timingFunction="ease"
          >
          {(styles) => <div style={styles}>
          <Notification title={`${showAlert.type} for Patient id ${showAlert.id}`} onClick={() => {setShowAlert({isDisplay: false, id: "", type: ""});}}>
            {/* Patient Appointment .... */}
          </Notification>
            </div>}
    </Transition>

        </Affix>
        {/* <Container my="xl"> */}
          {/* <CardsCarousel /> */}
          <Group>
            {imgsURL.map(image => (
              <>
                  <Image
              alt="consent form"
              height={100}
              w={100}
          radius="md"
          src={image.url}
        />
              </>
            ))}
          </Group>
          
    

        {active && 
      <Container fluid my="md">
      <Grid>
      <Grid.Col span={{ base: 12, lg: 8 }}>
          {/* <PatientCard patient={patient} /> */}
          <PatientProfile patientID={active} />
        </Grid.Col>
        <Grid.Col span={{ base: 12, lg: 4 }}>
          <ProgressUpdate updates={updates} addUpdate={addUpdate} patientId={active} />
        </Grid.Col>
        <Grid.Col  span={{ base: 12, lg: 4 }}>
          <PatientAppointmentCard patientID={active} />
        </Grid.Col>
        {/* <Grid.Col span={{ base: 12, xs: 8 }}> <PatientGeneral patientID={active} /></Grid.Col>
        <Grid.Col span={{ base: 12, xs: 4 }}><PatientUpdateCard /></Grid.Col>
        <Grid.Col span={{ base: 12, xs: 8 }}><PatientReportsTable patientId={active} /></Grid.Col> */}
        {/* <Grid.Col span={{ base: 12, xs: 4 }}>{child}</Grid.Col>
        <Grid.Col span={{ base: 12, xs: 3 }}>{child}</Grid.Col>
        <Grid.Col span={{ base: 12, xs: 3 }}>{child}</Grid.Col>
        <Grid.Col span={{ base: 12, xs: 6 }}>{child}</Grid.Col> */}
      </Grid>
    </Container>
        }
        {/* </Container> */}
      </AppShell.Main>

    </AppShell>
  );
}
