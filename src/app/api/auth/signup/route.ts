import { NextRequest, NextResponse } from 'next/server';
import { getConnection } from '@/lib/db';
import bcrypt from 'bcryptjs';

export async function POST(req: NextRequest) {
  const connection = await getConnection();
  try {
    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json({ success: false, message: 'Email and password are required' }, { status: 400 });
    }

    const [existingUser] = await connection.execute('SELECT * FROM users WHERE email = ?', [email]);

    // @ts-ignore
    if (existingUser.length > 0) {
      return NextResponse.json({ success: false, message: 'User already exists' }, { status: 400 });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await connection.execute('INSERT INTO users (email, password) VALUES (?, ?)', [email, hashedPassword]);

    return NextResponse.json({ success: true, message: 'User created successfully' });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ success: false, error: 'An error occurred' }, { status: 500 });
  } finally {
    await connection.end();
  }
}
