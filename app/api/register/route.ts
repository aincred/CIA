// // // import { NextResponse } from 'next/server';
// // // import { db } from '@/lib/db';
// // // import { registrations } from '@/lib/schema';
// // // import { eq } from 'drizzle-orm';

// // // export async function POST(request: Request) {
// // //   try {
// // //     const body = await request.json();

// // //     // 1. Insert data into Neon
// // //     // We utilize the 'returning' feature to get the ID that was just created
// // //     const result = await db.insert(registrations).values({
// // //       fullName: body.fullName,
// // //       parentName: body.parentName,
// // //       dob: body.dob,
// // //       gender: body.gender,
// // //       aadhaarLast4: body.aadhaarLast4,
// // //       studentContact: body.studentContact,
// // //       parentContact: body.parentContact,
// // //       email: body.email,
// // //       address: body.address,
// // //       photoBase64: body.photoBase64, // Be careful with large files here
// // //       collegeName: body.collegeName,
// // //       branch: body.branch,
// // //       yearSemester: body.yearSemester,
// // //       rollNo: body.rollNo,
// // //       collegeIdNo: body.collegeIdNo,
// // //       cgpa: body.cgpa,
// // //       docAadhaar: body.docAadhaar,
// // //       docCollegeId: body.docCollegeId,
// // //       docNoc: body.docNoc,
// // //       docPayment: body.docPayment,
// // //       docPhoto: body.docPhoto,
// // //       feeAmount: body.feeAmount,
// // //       installmentType: body.installmentType,
// // //       paymentMode: body.paymentMode,
// // //       transactionId: body.transactionId,
// // //       paymentDate: body.paymentDate,
// // //       agreedToTerms: body.agreedToTerms,
// // //       signatureBase64: body.signatureBase64,
// // //       declarationDate: body.declarationDate,
// // //     }).returning({ id: registrations.id });

// // //     const newId = result[0].id;

// // //     // 2. Generate the permanent Batch Code using the unique Database ID
// // //     const generatedBatchCode = `CIA/A1/${String(newId).padStart(3, '0')}`;

// // //     // 3. Update the record with the generated code
// // //     await db.update(registrations)
// // //       .set({ batchCode: generatedBatchCode })
// // //       .where(eq(registrations.id, newId));

// // //     return NextResponse.json({ 
// // //       success: true, 
// // //       message: 'Registration successful', 
// // //       batchCode: generatedBatchCode 
// // //     });

// // //   } catch (error) {
// // //     console.error('Registration Error:', error);
// // //     return NextResponse.json(
// // //       { success: false, message: 'Internal Server Error' },
// // //       { status: 500 }
// // //     );
// // //   }
// // // }

// // import { NextResponse } from 'next/server';
// // import { db } from '@/lib/db'; // Ensure this path matches your project structure
// // import { registrations } from '@/lib/schema'; // Ensure this matches your Drizzle schema
// // import { eq, desc } from 'drizzle-orm';

// // // FORCE DYNAMIC: Ensures the route is not cached statically
// // export const dynamic = 'force-dynamic';

// // export async function POST(request: Request) {
// //   try {
// //     const body = await request.json();

// //     // Basic Validation: Check if critical fields exist
// //     if (!body.fullName || !body.studentContact) {
// //       return NextResponse.json(
// //         { success: false, message: 'Missing required fields' },
// //         { status: 400 }
// //       );
// //     }

// //     // 1. Insert data into Neon Database
// //     // We use .returning({ id: ... }) to get the primary key of the new row immediately
// //     const result = await db.insert(registrations).values({
// //       fullName: body.fullName,
// //       parentName: body.parentName,
// //       dob: body.dob,
// //       gender: body.gender,
// //       aadhaarLast4: body.aadhaarLast4,
// //       studentContact: body.studentContact,
// //       parentContact: body.parentContact,
// //       email: body.email,
// //       address: body.address,
      
// //       // STORAGE NOTE: Storing Base64 in DB is fine for prototypes, 
// //       // but for production, consider uploading to S3/Uploadthing and saving the URL here.
// //       photoBase64: body.photoBase64, 
      
// //       collegeName: body.collegeName,
// //       branch: body.branch,
// //       yearSemester: body.yearSemester,
// //       rollNo: body.rollNo,
// //       collegeIdNo: body.collegeIdNo,
// //       cgpa: body.cgpa,
      
// //       // Booleans for document checklist
// //       docAadhaar: body.docAadhaar || false,
// //       docCollegeId: body.docCollegeId || false,
// //       docNoc: body.docNoc || false,
// //       docPayment: body.docPayment || false,
// //       docPhoto: body.docPhoto || false,
      
// //       feeAmount: body.feeAmount,
// //       installmentType: body.installmentType,
// //       paymentMode: body.paymentMode,
// //       transactionId: body.transactionId,
// //       paymentDate: body.paymentDate,
      
// //       agreedToTerms: body.agreedToTerms || false,
// //       signatureBase64: body.signatureBase64,
// //       declarationDate: body.declarationDate,
// //     }).returning({ id: registrations.id });

// //     // If insert failed or returned no ID
// //     if (!result || result.length === 0) {
// //       throw new Error('Database insert failed');
// //     }

// //     const newId = result[0].id;

// //     // 2. Generate the permanent Batch Code (e.g., CIA/A1/005)
// //     const generatedBatchCode = `CIA/A1/${String(newId).padStart(3, '0')}`;

// //     // 3. Update the record with the generated code
// //     await db.update(registrations)
// //       .set({ batchCode: generatedBatchCode })
// //       .where(eq(registrations.id, newId));

// //     // 4. Return Success JSON
// //     return NextResponse.json({ 
// //       success: true, 
// //       message: 'Registration successful', 
// //       batchCode: generatedBatchCode 
// //     });

// //   } catch (error: any) {
// //     console.error('Registration API Error:', error);
    
// //     // Return a JSON error so the frontend doesn't crash with "Unexpected token <"
// //     return NextResponse.json(
// //       { 
// //         success: false, 
// //         message: 'Internal Server Error', 
// //         error: error.message 
// //       },
// //       { status: 500 }
// //     );
// //   }
// // }


// // export async function GET() {
// //   try {
// //     // Fetch all registrations, sorted by newest first
// //     const data = await db
// //       .select()
// //       .from(registrations)
// //       .orderBy(desc(registrations.id));

// //     // Disable caching so you always see the latest data
// //     return NextResponse.json(
// //       { success: true, data }, 
// //       { headers: { 'Cache-Control': 'no-store, max-age=0' } }
// //     );
// //   } catch (error) {
// //     console.error('Fetch Error:', error);
// //     return NextResponse.json(
// //       { success: false, message: 'Failed to fetch data' }, 
// //       { status: 500 }
// //     );
// //   }
// // }


// // app/api/register/route.ts
// import { NextResponse } from 'next/server';
// import { db } from '@/lib/db';
// import { registrations } from '@/lib/schema';
// import { eq, desc } from 'drizzle-orm';

// export const dynamic = 'force-dynamic';

// export async function POST(request: Request) {
//   try {
//     const body = await request.json();

//     // 1. Basic Validation
//     if (!body.fullName || !body.studentContact) {
//       return NextResponse.json(
//         { success: false, message: 'Missing required fields' },
//         { status: 400 }
//       );
//     }

//     // 2. Insert Data (Initialize codes as null)
//     const result = await db.insert(registrations).values({
//       // Personal
//       fullName: body.fullName,
//       parentName: body.parentName,
//       dob: body.dob,
//       gender: body.gender,
//       aadhaarLast4: body.aadhaarLast4,
//       studentContact: body.studentContact,
//       parentContact: body.parentContact,
//       email: body.email,
//       address: body.address,
      
//       // Files
//       photoBase64: body.photoBase64, 
//       signatureBase64: body.signatureBase64,
      
//       // Academic
//       collegeName: body.collegeName,
//       branch: body.branch,
//       yearSemester: body.yearSemester,
//       rollNo: body.rollNo,
//       collegeIdNo: body.collegeIdNo,
//       cgpa: body.cgpa,
      
//       // Docs
//       docAadhaar: body.docAadhaar || false,
//       docCollegeId: body.docCollegeId || false,
//       docNoc: body.docNoc || false,
//       docPhoto: body.docPhoto || false,
//       docPayment: body.docPayment || false,
      
//       // Payment (Handle safely if missing)
//       feeAmount: body.feeAmount || null,
//       installmentType: body.installmentType || null,
//       paymentMode: body.paymentMode || null,
//       transactionId: body.transactionId || null,
//       paymentDate: body.paymentDate || null,
      
//       // Declaration
//       agreedToTerms: body.agreedToTerms || false,
//       declarationDate: body.declarationDate,
      
//       // Initialize codes as null
//       batchCode: null,
//       registrationNo: null,
//     }).returning({ id: registrations.id });

//     if (!result || result.length === 0) {
//       throw new Error('Database insert failed');
//     }

//     const newId = result[0].id;
//     const currentYear = new Date().getFullYear();

//     // 3. Generate Codes
//     const generatedBatchCode = `CIA/B1/${String(newId).padStart(3, '0')}`;
//   const generatedRegNo = 'CIA/B1';

//     // 4. Update the record with generated codes
//     await db.update(registrations)
//       .set({ 
//         batchCode: generatedBatchCode,
//         registrationNo: generatedRegNo
//       })
//       .where(eq(registrations.id, newId));

//     // 5. Return Success
//     return NextResponse.json({ 
//       success: true, 
//       message: 'Registration successful', 
//       batchCode: generatedBatchCode,
//       registrationNo: generatedRegNo
//     });

//   } catch (error: any) {
//     console.error('Registration API Error:', error);
//     return NextResponse.json(
//       { 
//         success: false, 
//         message: 'Internal Server Error', 
//         error: error.message 
//       },
//       { status: 500 }
//     );
//   }
// }

// export async function GET() {
//   try {
//     const data = await db
//       .select()
//       .from(registrations)
//       .orderBy(desc(registrations.id));

//     return NextResponse.json(
//       { success: true, data }, 
//       { headers: { 'Cache-Control': 'no-store, max-age=0' } }
//     );
//   } catch (error) {
//     console.error('Fetch Error:', error);
//     return NextResponse.json(
//       { success: false, message: 'Failed to fetch data' }, 
//       { status: 500 }
//     );
//   }
// }

// app/api/register/route.ts
import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { registrations } from '@/lib/schema';
import { eq, desc } from 'drizzle-orm';
import nodemailer from 'nodemailer'; // 1. Import Nodemailer

export const dynamic = 'force-dynamic';

export async function POST(request: Request) {
  try {
    const body = await request.json();

    // 1. Basic Validation
    if (!body.fullName || !body.studentContact || !body.email) {
      return NextResponse.json(
        { success: false, message: 'Missing required fields' },
        { status: 400 }
      );
    }

    // 2. Insert Data (Initialize codes as null)
    const result = await db.insert(registrations).values({
      // Personal
      fullName: body.fullName,
      parentName: body.parentName,
      dob: body.dob,
      gender: body.gender,
      aadhaarLast4: body.aadhaarLast4,
      studentContact: body.studentContact,
      parentContact: body.parentContact,
      email: body.email,
      address: body.address,
      
      // Files
      photoBase64: body.photoBase64, 
      signatureBase64: body.signatureBase64,
      
      // Academic
      collegeName: body.collegeName,
      branch: body.branch,
      yearSemester: body.yearSemester,
      rollNo: body.rollNo,
      collegeIdNo: body.collegeIdNo,
      cgpa: body.cgpa,
      
      // Docs
      docAadhaar: body.docAadhaar || false,
      docCollegeId: body.docCollegeId || false,
      docNoc: body.docNoc || false,
      docPhoto: body.docPhoto || false,
      docPayment: body.docPayment || false,
      
      // Payment
      feeAmount: body.feeAmount || null,
      installmentType: body.installmentType || null,
      paymentMode: body.paymentMode || null,
      transactionId: body.transactionId || null,
      paymentDate: body.paymentDate || null,
      
      // Declaration
      agreedToTerms: body.agreedToTerms || false,
      declarationDate: body.declarationDate,
      
      // Initialize codes as null
      batchCode: null,
      registrationNo: null,
    }).returning({ id: registrations.id });

    if (!result || result.length === 0) {
      throw new Error('Database insert failed');
    }

    const newId = result[0].id;
    
    // 3. Generate Codes
    // Example: CIA/B1/001 (padded ID)
    const generatedBatchCode = `CIA/B1/${String(newId).padStart(3, '0')}`;
    
    // Example logic for Reg No (You can customize this)
   const generatedRegNo = 'CIA/B1'; 

    // 4. Update the record with generated codes
    await db.update(registrations)
      .set({ 
        batchCode: generatedBatchCode,
        registrationNo: generatedRegNo
      })
      .where(eq(registrations.id, newId));

    // ============================================================
    // 5. SEND EMAIL LOGIC (New Addition)
    // ============================================================
    try {
      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS,
        },
      });

      const mailOptions = {
        from: `"Cyber Intelligence Academy" <${process.env.EMAIL_USER}>`,
        to: body.email,
        subject: 'Registration Confirmed: Cyber Intelligence Academy',
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background-color: #f8fafc; padding: 20px; border: 1px solid #e2e8f0;">
            
            <div style="background-color: #0f172a; padding: 20px; text-align: center; border-bottom: 4px solid #10b981; border-radius: 8px 8px 0 0;">
              <h2 style="color: #ffffff; margin: 0; font-size: 24px;">Registration Successful</h2>
            </div>
            
            <div style="background-color: #ffffff; padding: 30px; border-radius: 0 0 8px 8px; border: 1px solid #e2e8f0; border-top: none;">
              <p style="color: #334155; font-size: 16px;">Dear <strong>${body.fullName}</strong>,</p>
              
              <p style="color: #475569; line-height: 1.6;">
                Welcome to the <strong>Cyber Intelligence Academy</strong>. Your application for the Internship Program has been successfully processed.
              </p>
              
              <div style="background-color: #ecfdf5; border: 1px solid #10b981; padding: 20px; margin: 25px 0; border-radius: 6px;">
                <h3 style="color: #065f46; margin-top: 0; margin-bottom: 15px; font-size: 18px;">Your Credentials</h3>
                <table style="width: 100%; border-collapse: collapse;">
                  <tr>
                    <td style="padding: 8px 0; color: #475569; font-weight: bold; width: 140px;">Batch Code:</td>
                    <td style="padding: 8px 0; color: #0f172a; font-family: monospace; font-size: 16px;">${generatedBatchCode}</td>
                  </tr>
                  <tr>
                    <td style="padding: 8px 0; color: #475569; font-weight: bold;">Registration No:</td>
                    <td style="padding: 8px 0; color: #10b981; font-weight: bold; font-family: monospace; font-size: 16px;">${generatedRegNo}</td>
                  </tr>
                </table>
              </div>

              <p style="color: #475569;">Please keep this email safe. You will need these details for attendance and certification.</p>

              <hr style="border: 0; border-top: 1px solid #e2e8f0; margin: 30px 0;">

              <div style="text-align: center;">
                <p style="color: #64748b; font-size: 14px; margin-bottom: 5px;">Need Assistance?</p>
                <div style="display: inline-block; background-color: #1e293b; color: #ffffff; padding: 10px 20px; rounded: 30px; border-radius: 50px; font-weight: bold;">
                  📞 Help Desk: 8252866584
                </div>
              </div>
            </div>
            
            <div style="text-align: center; padding-top: 20px; color: #94a3b8; font-size: 12px;">
              &copy; ${new Date().getFullYear()} Dreamworks Infotech Pvt. Ltd.
            </div>
          </div>
        `,
      };

      await transporter.sendMail(mailOptions);
      console.log(`Email sent successfully to ${body.email}`);

    } catch (emailError) {
      // We log the error but do NOT stop the process, 
      // because the user is already registered in the DB.
      console.error('Failed to send email:', emailError);
    }
    // ============================================================
    // END EMAIL LOGIC
    // ============================================================


    // 6. Return Success
    return NextResponse.json({ 
      success: true, 
      message: 'Registration successful', 
      batchCode: generatedBatchCode,
      registrationNo: generatedRegNo
    });

  } catch (error: any) {
    console.error('Registration API Error:', error);
    return NextResponse.json(
      { 
        success: false, 
        message: 'Internal Server Error', 
        error: error.message 
      },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const data = await db
      .select()
      .from(registrations)
      .orderBy(desc(registrations.id));

    return NextResponse.json(
      { success: true, data }, 
      { headers: { 'Cache-Control': 'no-store, max-age=0' } }
    );
  } catch (error) {
    console.error('Fetch Error:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to fetch data' }, 
      { status: 500 }
    );
  }
}