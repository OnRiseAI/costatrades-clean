import { NextRequest, NextResponse } from "next/server";
import { DemoResponse } from "@shared/api";

export async function GET(request: NextRequest) {
  const response: DemoResponse = {
    message: "Hello from Next.js API route",
  };
  return NextResponse.json(response);
}
