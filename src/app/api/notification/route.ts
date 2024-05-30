export const dynamic = "force-dynamic"; // defaults to auto
import { NextResponse } from 'next/server';
import { io } from 'socket.io-client';


//NOTE: JUST FOR DEMO, NOT IDEAL TO DO THIS APPROACH IN DEPLOYMENT

// Use to consume notes/appt
export async function GET(request: Request) {
    const { searchParams } = new URL(request.url)
    const type = searchParams.get('type');
    
    console.log(type)
    // console.log(id)

    // check type first
        // update or appointment
        // emit: receivingAppt

    const socket = io('http://localhost:3000');

    if (type === "appointment") {
        const id = searchParams.get('id');
        const start = searchParams.get('start');
        const end = searchParams.get('end');
        socket.emit('receivingAppt', {'id': id, 'type': 'appointment', start: start, end: end});
        return Response.json({ test: "Success" });
    }

    else if (type === "update") {
        const id = searchParams.get('id');
        const note = searchParams.get('note');
        socket.emit('receivingUpdate', {'id': id, 'type': 'update', 'note': note});
        return Response.json({ test: "Success" });
    }

    else if (type === "consent_verification") {
        const img_url = searchParams.get('img_url');
        socket.emit('receivingConsent', {'img_url': img_url, 'type': 'consent_verification'});
        return Response.json({ test: "Success" });
    }

    return NextResponse.json({ test: "Fail" });
}

// send data out
export async function POST() {

}
