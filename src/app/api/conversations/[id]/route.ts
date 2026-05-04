import { NextResponse } from "next/server";
import { deleteConversation } from "@/lib/dal";

export async function DELETE(
  _req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  await deleteConversation(Number(id));
  return NextResponse.json({ success: true });
}