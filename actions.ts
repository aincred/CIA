'use server';

import { db } from './lib/db';
import { students } from './lib/schema';
import { eq, desc } from 'drizzle-orm';
import { revalidatePath } from 'next/cache';

// 1. Fetch all students
export async function getStudents() {
  const data = await db.select().from(students).orderBy(desc(students.registrationDate));
  // Convert dates/types to match your frontend interface
  return data.map(s => ({
    ...s,
    id: s.id.toString(), // Convert number ID to string for frontend
    registrationDate: s.registrationDate ? new Date(s.registrationDate).toISOString().split('T')[0] : '',
    status: s.status as 'Verified' | 'Pending'
  }));
}

// 2. Add a new student
export async function addStudent(formData: any) {
  const receiptNo = `CIA-${Math.floor(1000 + Math.random() * 9000)}`;
  
  try {
    await db.insert(students).values({
      ...formData,
      receiptNo,
      registrationDate: new Date(),
      status: 'Pending'
    });
    
    revalidatePath('/'); // Refresh data automatically
    return { success: true, message: 'Registration Successful' };
  } catch (error) {
    console.error('DB Error:', error);
    return { success: false, message: 'Database Error' };
  }
}

// 3. Toggle Status
export async function toggleStatus(id: string, currentStatus: string) {
  const newStatus = currentStatus === 'Verified' ? 'Pending' : 'Verified';
  
  await db.update(students)
    .set({ status: newStatus as 'Verified' | 'Pending' })
    .where(eq(students.id, parseInt(id)));
    
  revalidatePath('/');
  return { success: true };
}

// 4. Delete Student
export async function deleteStudent(id: string) {
  await db.delete(students).where(eq(students.id, parseInt(id)));
  revalidatePath('/');
  return { success: true };
}

