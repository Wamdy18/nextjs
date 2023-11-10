import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    const body = await request.json();

    const newItem = await prisma.item.create({
        data: {
            label: body.label,
            description: body.description,
            oldPrice: body.oldPrice,
            newPrice: body.newPrice,
            originalLink: body.originalLink,
            image: body.image
        }
    });

    return NextResponse.json(newItem, { status: 201 });
}

export async function GET(request: NextRequest) {
    const itemsArray = await prisma.item.findMany()

    return NextResponse.json(itemsArray, { status: 200 })
}