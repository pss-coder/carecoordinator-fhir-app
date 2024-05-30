# FHIR Web App Setup

## Introduction

This repository provides instructions to set up a FHIR web app with backend server. The setup involves Docker, npm, and running specific commands to start the server and add sample data. Additionally, it demonstrates integration with a Telegram bot.

## Prerequisites

- Node.js v21.7.1 installed
- Docker installed

## Setup Instructions

### 1. Set Up Docker and Launch
Ensure Docker is installed and running on your system.

### 2. Install Dependencies
Run the following command to install the necessary dependencies:

```sh
npm install
```

### 3. Launch the FHIR server by running:
``` sh
npm run fhir:start-server
```

### 4. Add Sample Data
Open another command line window and run the following command to add sample data. You can stop this process anytime once you have sufficient data:
```sh
npm run fhir:add-sample-data
```

### 5. Access the Server Data
The server data can be accessed via: http://localhost:8080
For development purposes, you can use the following credentials:
Email: admin@example.com
Password: medplum_admin

### 6. Run Web app
The server data SHOULD only be accessed via: http://localhost:3000

### Integration with Telegram Bot
To integrate with the Telegram bot, refer to the repository [here](https://github.com/pss-coder/CareCoordinateBOT).


### Tutorials
For a detailed tutorial on setting up a FHIR-based server, visit [Bonfhir's documentation](https://bonfhir.dev/packages/intro).

### Tools Used
[Mantine](https://mantine.dev/)
[TailwindCSS](https://tailwindcss.com/docs/installation)
[bonFHIR](https://bonfhir.dev/)
[Medplum](https://www.medplum.com/docs)
[Socket.io](https://socket.io/)
[HL7 FHIR](https://hl7.org/fhir/index.html)
