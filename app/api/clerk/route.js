import { Webhook } from "svix";
import connectDB from "@/config/db";
import User from "@/models/User";
import { headers } from "next/headers";
import { NextResponse } from "next/server";


export async function POST(req) {
    const wh = new Webhook(process.env.SIGNING_SECRET)
    
    const headerPayload = await headers()

    const svixHeadres = {
        "svix-id": headerPayload.get("svix-id"),
        "svix-timestamp": headerPayload.get("svix-timestamp"),
        "svix-signature": headerPayload.get("svix-signature")
    }

    const payload = await req.json()
    const body = JSON.stringify(payload)


    const {data, type} = wh.verify(body, svixHeadres) 


    const userData = {
        _id: data.id,
        email: 'default@xxx.com',
        name: data.first_name + " " + data.last_name,
        image: data.image_url
    }


    await connectDB()



    switch (type) {
        case "user.created":
            await User.create(userData)
            break;
        case "user.updated":
            await User.findByIdAndUpdate(data.id, userData)
            break;
        case "user.deleted":
            await User.findByIdAndDelete(data.id)
            break;
        default:
            break;

    }

    return NextResponse.json({
        message: 'Event received'
    })
}