import { pgTable, serial, text, varchar, date, timestamp, pgEnum, boolean } from 'drizzle-orm/pg-core';

// Define Enums (optional, but good for strict inputs)
export const statusEnum = pgEnum('status', ['Verified', 'Pending']);

export const students = pgTable('students', {
  id: serial('id').primaryKey(),
  fullName: text('full_name').notNull(),
  gender: varchar('gender', { length: 20 }),
  dob: varchar('dob', { length: 20 }), // Keeping as string to match your form, ideally use date()
  guardianType: varchar('guardian_type', { length: 50 }),
  guardianName: text('guardian_name'),
  studentContact: varchar('student_contact', { length: 20 }).notNull(),
  whatsappContact: varchar('whatsapp_contact', { length: 20 }),
  email: text('email').notNull(),
  permAddress: text('perm_address'),
  tempAddress: text('temp_address'),
  college: text('college'),
  passoutYear: varchar('passout_year', { length: 10 }),
  semester: varchar('semester', { length: 20 }),
  marks: varchar('marks', { length: 10 }),
  bloodGroup: varchar('blood_group', { length: 5 }),
  selectedCourse: text('selected_course'),
  paymentMethod: varchar('payment_method', { length: 50 }).default('Cash'),
  paymentDate: varchar('payment_date', { length: 20 }),
  receiptNo: varchar('receipt_no', { length: 50 }),
  status: statusEnum('status').default('Pending'),
  registrationDate: timestamp('registration_date').defaultNow(),
});


// NEW: Admin Schema for Security
export const admins = pgTable('admins', {
  id: serial('id').primaryKey(),
  email: text('email').notNull().unique(),
  passwordHash: text('password_hash').notNull(),
  lastLogin: timestamp('last_login'),
  createdAt: timestamp('created_at').defaultNow(),
});


export const registrations = pgTable('registrations', {
  id: serial('id').primaryKey(), // Auto-incrementing ID for the Batch Sequence
  
  // Personal Details
  fullName: text('full_name').notNull(),
  parentName: text('parent_name').notNull(),
  dob: text('dob').notNull(),
  gender: text('gender').notNull(),
  aadhaarLast4: text('aadhaar_last_4').notNull(),
  studentContact: text('student_contact').notNull(),
  parentContact: text('parent_contact').notNull(),
  email: text('email').notNull(),
  address: text('address').notNull(),
  
  // Storing images as Base64 strings for simplicity in this guide. 
  // For production, use AWS S3 or Vercel Blob and store the URL here instead.
  photoBase64: text('photo_base64'), 

  // Academic Details
  collegeName: text('college_name').notNull(),
  branch: text('branch').notNull(),
  yearSemester: text('year_semester').notNull(),
  rollNo: text('roll_no').notNull(),
  collegeIdNo: text('college_id_no').notNull(),
  cgpa: text('cgpa').notNull(),

  // Documents (Boolean flags)
  docAadhaar: boolean('doc_aadhaar').default(false),
  docCollegeId: boolean('doc_college_id').default(false),
  docNoc: boolean('doc_noc').default(false),
  docPayment: boolean('doc_payment').default(false),
  docPhoto: boolean('doc_photo').default(false),

  // Fee Details
  feeAmount: text('fee_amount').notNull(),
  installmentType: text('installment_type').notNull(),
  paymentMode: text('payment_mode').notNull(),
  transactionId: text('transaction_id').notNull(),
  paymentDate: text('payment_date').notNull(),

  // Declaration
  agreedToTerms: boolean('agreed_to_terms').default(false),
  signatureBase64: text('signature_base64'),
  declarationDate: text('declaration_date'),
  
  // Metadata
  batchCode: text('batch_code'), // We will generate this on the server
  createdAt: timestamp('created_at').defaultNow(),
});