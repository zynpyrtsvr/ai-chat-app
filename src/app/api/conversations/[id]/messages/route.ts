import { NextResponse } from "next/server";
import { getMessagesByConversationId, createMessage } from "@/lib/dal";

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const messages = await getMessagesByConversationId(Number(id));
  return NextResponse.json(messages);
}

export async function POST(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const { role, content } = await req.json();
  const message = await createMessage(Number(id), role, content);
  return NextResponse.json(message);
}