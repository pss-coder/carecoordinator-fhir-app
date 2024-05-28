export const dynamic = "force-dynamic"; // defaults to auto
import { NextResponse } from 'next/server';
import { io } from 'socket.io-client';


//NOTE: JUST FOR DEMO, NOT IDEAL TO DO THIS APPROACH IN DEPLOYMENT

// Use to consume notes/appt
export async function GET(request: Request) {
    const { searchParams } = new URL(request.url)
    const type = searchParams.get('type');
    const id = searchParams.get('id');
    console.log(type)
    console.log(id)

    // check type first
        // update or appointment
        // emit: receivingAppt

    const socket = io('http://localhost:3000');

    if (type === "appointment") {
        socket.emit('receivingAppt', {'id': id, 'type': 'appointment'});
        return Response.json({ test: "Success" });
    }

    else if (type === "update") {
        socket.emit('receivingUpdate', {'id': id, 'type': 'appointment'});
        return Response.json({ test: "Success" });
    }

    return NextResponse.json({ test: "Fail" });
}

// send data out
export async function POST() {

}
