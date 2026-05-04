import { NextResponse } from "next/server";
import { getAllConversations, createConversation } from "@/lib/dal";

export async function GET() {
  const conversations = await getAllConversations();
  return NextResponse.json(conversations);
}

export async function POST() {
  const conversation = await createConversation();
  return NextResponse.json(conversation);
}