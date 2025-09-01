
import { NextRequest, NextResponse } from 'next/server';
import { getConnection } from '@/lib/db';
import { promises as fs } from 'fs';
import path from 'path';
import jwt from 'jsonwebtoken';

export async function POST(req: NextRequest) {
  const connection = await getConnection();
  try {
    const token = req.cookies.get('token')?.value;

    if (!token) {
      return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
    }

    try {
      jwt.verify(token, 'your_jwt_secret');
    } catch (error) {
      return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
    }

    const data = await req.formData();
    const file = data.get('image') as File;
    const name = data.get('name') as string;
    const address = data.get('address') as string;
    const city = data.get('city') as string;
    const state = data.get('state') as string;
    const contact = data.get('contact') as string;
    const email_id = data.get('email_id') as string;

    if (!file) {
      return NextResponse.json({ success: false, message: 'No image uploaded' }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const imageName = `${Date.now()}_${file.name}`;
    const imagePath = path.join(process.cwd(), 'public', 'schoolImages', imageName);
    await fs.writeFile(imagePath, buffer);

    const [result] = await connection.execute(
      'INSERT INTO schools (name, address, city, state, contact, email_id, image) VALUES (?, ?, ?, ?, ?, ?, ?)',
      [name, address, city, state, contact, email_id, `/schoolImages/${imageName}`]
    );

    return NextResponse.json({ success: true, result });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ success: false, error: 'An error occurred' }, { status: 500 });
  } finally {
    await connection.end();
  }
}
