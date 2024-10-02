import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const formData = await req.formData();
  const uploadedFile = formData.get('file');

  if (!uploadedFile) {
    return NextResponse.json({ success: false, message: 'No file uploaded' }, { status: 400 });
  }

  console.log(uploadedFile);

  return NextResponse.json({ success: true, file: uploadedFile });
}