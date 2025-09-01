
import { NextResponse, NextRequest } from 'next/server';
import { getConnection } from '@/lib/db';
import jwt from 'jsonwebtoken';

export async function GET(req: NextRequest) {
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

    const [rows] = await connection.execute('SELECT name, address, city, image FROM schools');
    return NextResponse.json({ success: true, data: rows });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ success: false, error: 'An error occurred' }, { status: 500 });
  } finally {
    await connection.end();
  }
}
