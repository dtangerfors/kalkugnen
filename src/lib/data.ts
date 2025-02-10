import { sql } from '@vercel/postgres';
import {
  User,
  Booking
} from './types';

export async function fetchBookings() {
  try {
    const data = await sql<Booking>`SELECT bookings.*, users.user_color
    FROM bookings
    JOIN users ON bookings.user_id = users.id
    WHERE bookings.is_canceled = false
    ORDER BY created_at ASC;`;
    return data.rows;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch booking data.');
  }
}

export async function fetchBookingById(id: string) {
  try {
    const booking = await sql`SELECT * FROM bookings WHERE id=${id}`;
    return booking.rows[0] as Booking;
  } catch (error) {
    console.error('Failed to fetch user:', error);
    throw new Error('Failed to fetch user.');
  }
}

export async function fetchUsers() {
  try {
    const users = await sql<User>`SELECT id, name, email, user_role, user_color FROM users`;
    return users.rows;
  } catch (error) {
    console.error('Failed to fetch user:', error);
    throw new Error('Failed to fetch user.');
  }
}

export async function getUser(id: string) {
  try {
    const user = await sql`SELECT * FROM users WHERE id=${id}`;
    return user.rows[0] as User;
  } catch (error) {
    console.error('Failed to fetch user:', error);
    throw new Error('Failed to fetch user.');
  }
}

export async function getUserByEmail(email: string) {
  try {
    const user = await sql`SELECT * FROM users WHERE email=${email}`;
    return user.rows[0] as User;
  } catch (error) {
    console.error('Failed to fetch user:', error);
    throw new Error('Failed to fetch user.');
  }
}

export async function fetchUserBookings(id: string) {
  try {
    const data = await sql<Booking>`SELECT * FROM bookings WHERE user_id=${id}`;
    return data.rows;
  } catch (error) {
    console.error('Failed to fetch user:', error);
    throw new Error('Failed to fetch user.');
  }
}

export async function fetchPosts() {
  const res = await fetch("https://admin.sbv.dtangerfors.se/wp-json/wp/v2/posts?categories=15")
  // The return value is *not* serialized
  // You can return Date, Map, Set, etc.
 
  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error('Failed to fetch data')
  }
 
  return res.json()
}

export async function getData(url: string) {
  const res = await fetch(url)
  // The return value is *not* serialized
  // You can return Date, Map, Set, etc.
 
  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error('Failed to fetch data')
  }
 
  return res.json()
}