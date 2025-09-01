
import mysql from 'mysql2/promise';

export async function getConnection() {
  const connection = await mysql.createConnection({
    host: 'localhost',
    user: 'root', // Replace with your XAMPP MySQL username if it's not 'root'
    password: '', // Replace with your XAMPP MySQL password if you have one
    database: 'school_db',
  });
  return connection;
}
