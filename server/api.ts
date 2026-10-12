import pg from 'pg';
import dotenv from 'dotenv';
dotenv.config();

const { Pool } = pg;

const connectionString = process.env.DATABASE_URL || '';

const pool = new Pool({
  connectionString,
  ssl: {
    rejectUnauthorized: false
  }
});

let isTableInitialized = false;

export async function initDb(): Promise<boolean> {
  if (!connectionString) {
    console.warn('[Neon DB] DATABASE_URL not set in .env');
    return false;
  }
  if (isTableInitialized) return true;

  try {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS applications (
        id SERIAL PRIMARY KEY,
        application_ref VARCHAR(50) UNIQUE NOT NULL,
        full_name VARCHAR(150) NOT NULL,
        father_name VARCHAR(150) NOT NULL,
        mother_name VARCHAR(150),
        dob VARCHAR(20),
        gender VARCHAR(20),
        marital_status VARCHAR(20),
        category VARCHAR(50) NOT NULL,
        amount NUMERIC(10, 2) NOT NULL,
        mobile VARCHAR(15) NOT NULL,
        email VARCHAR(100),
        identification_mark TEXT,
        address_line TEXT,
        pincode VARCHAR(10),
        home_district VARCHAR(100),
        preferred_division VARCHAR(100),
        is_employed VARCHAR(10),
        employer_name VARCHAR(150),
        current_post VARCHAR(100),
        leaving_date VARCHAR(50),
        employment_type VARCHAR(50),
        noc_status VARCHAR(50),
        applied_post VARCHAR(100) NOT NULL,
        tenth_board VARCHAR(100),
        tenth_year VARCHAR(10),
        tenth_percent VARCHAR(10),
        twelfth_board VARCHAR(100),
        twelfth_year VARCHAR(10),
        twelfth_percent VARCHAR(10),
        typing_certificate VARCHAR(100),
        ncc_wing VARCHAR(50),
        utr_number VARCHAR(50) NOT NULL,
        payment_status VARCHAR(20) DEFAULT 'pending',
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );
    `);
    await pool.query(`
      ALTER TABLE applications ADD COLUMN IF NOT EXISTS payment_status VARCHAR(20) DEFAULT 'pending';
    `);
    isTableInitialized = true;
    console.log('[Neon DB] Table "applications" verified and ready in PostgreSQL.');
    return true;
  } catch (err) {
    console.error('[Neon DB] Init error:', err);
    return false;
  }
}

export interface ApplicationDbPayload {
  applicationRef: string;
  fullName: string;
  fatherName: string;
  motherName?: string;
  dob: string;
  gender: string;
  maritalStatus: string;
  category: string;
  amount: number | string;
  mobile: string;
  email?: string;
  identificationMark?: string;
  addressLine?: string;
  pincode?: string;
  homeDistrict?: string;
  preferredDivision?: string;
  isEmployed?: string;
  employerName?: string;
  currentPost?: string;
  leavingDate?: string;
  employmentType?: string;
  nocStatus?: string;
  appliedPost: string;
  tenthBoard?: string;
  tenthYear?: string;
  tenthPercent?: string;
  twelfthBoard?: string;
  twelfthYear?: string;
  twelfthPercent?: string;
  typingCertificate?: string;
  nccWing?: string;
  utrNumber: string;
}

export async function saveApplication(data: ApplicationDbPayload): Promise<{ success: boolean; message?: string; applicationRef?: string }> {
  if (!connectionString) {
    return { success: false, message: 'DATABASE_URL not configured' };
  }
  await initDb();
  const cleanAmount = parseFloat(String(data.amount || 0).replace(/[^0-9.]/g, '')) || 0;

  const query = `
    INSERT INTO applications (
      application_ref, full_name, father_name, mother_name, dob, gender, marital_status,
      category, amount, mobile, email, identification_mark, address_line, pincode,
      home_district, preferred_division, is_employed, employer_name, current_post,
      leaving_date, employment_type, noc_status, applied_post, tenth_board, tenth_year,
      tenth_percent, twelfth_board, twelfth_year, twelfth_percent, typing_certificate,
      ncc_wing, utr_number
    ) VALUES (
      $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18,
      $19, $20, $21, $22, $23, $24, $25, $26, $27, $28, $29, $30, $31, $32
    )
    ON CONFLICT (application_ref) DO UPDATE SET
      utr_number = EXCLUDED.utr_number
    RETURNING id, application_ref;
  `;

  const values = [
    data.applicationRef,
    data.fullName,
    data.fatherName,
    data.motherName || null,
    data.dob,
    data.gender,
    data.maritalStatus,
    data.category,
    cleanAmount,
    data.mobile,
    data.email || null,
    data.identificationMark || null,
    data.addressLine || null,
    data.pincode || null,
    data.homeDistrict || null,
    data.preferredDivision || null,
    data.isEmployed || 'no',
    data.employerName || null,
    data.currentPost || null,
    data.leavingDate || null,
    data.employmentType || null,
    data.nocStatus || null,
    data.appliedPost,
    data.tenthBoard || null,
    data.tenthYear || null,
    data.tenthPercent || null,
    data.twelfthBoard || null,
    data.twelfthYear || null,
    data.twelfthPercent || null,
    data.typingCertificate || null,
    data.nccWing || null,
    data.utrNumber
  ];

  try {
    const result = await pool.query(query, values);
    return { success: true, applicationRef: result.rows[0]?.application_ref || data.applicationRef };
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Database insertion error';
    console.error('[Neon DB] Save error:', message);
    return { success: false, message };
  }
}

export async function getApplicationStatus(queryStr: string): Promise<{ success: boolean; message?: string; application?: Record<string, any> }> {
  if (!connectionString) {
    return { success: false, message: 'DATABASE_URL not configured' };
  }
  await initDb();

  const trimmed = queryStr.trim();
  if (!trimmed) {
    return { success: false, message: 'Search parameter is required' };
  }

  const query = `
    SELECT * FROM applications 
    WHERE mobile = $1 
       OR LOWER(email) = LOWER($1) 
       OR UPPER(application_ref) = UPPER($1)
    ORDER BY id DESC 
    LIMIT 1;
  `;

  try {
    const result = await pool.query(query, [trimmed]);
    if (result.rows.length === 0) {
      return { success: false, message: 'कोई रिकॉर्ड नहीं मिला (No application found with this Mobile, Email, or Application Ref)' };
    }
    return { success: true, application: result.rows[0] };
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Database query error';
    console.error('[Neon DB] Status query error:', message);
    return { success: false, message };
  }
}

export async function adminLogin(user: string, pass: string): Promise<{ success: boolean; message?: string; token?: string }> {
  const expectedUser = process.env.ADMIN_USER || 'admin';
  const expectedPass = process.env.ADMIN_PASS || 'forest@2026';

  if (user === expectedUser && pass === expectedPass) {
    return { success: true, token: 'causes_admin_authenticated' };
  }
  return { success: false, message: 'अमान्य एडमिन यूज़रनेम या पासवर्ड (Invalid Admin Credentials)' };
}

export async function getAllApplications(): Promise<{ success: boolean; applications?: Record<string, any>[]; message?: string }> {
  if (!connectionString) {
    return { success: false, message: 'DATABASE_URL not configured' };
  }
  await initDb();
  try {
    const result = await pool.query(`SELECT * FROM applications ORDER BY id DESC`);
    return { success: true, applications: result.rows };
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Database error';
    return { success: false, message };
  }
}

export async function updatePaymentStatus(applicationRef: string, status: string): Promise<{ success: boolean; application?: Record<string, any>; message?: string }> {
  if (!connectionString) {
    return { success: false, message: 'DATABASE_URL not configured' };
  }
  await initDb();
  try {
    const result = await pool.query(
      `UPDATE applications SET payment_status = $1 WHERE application_ref = $2 RETURNING *`,
      [status, applicationRef]
    );
    if (result.rows.length === 0) {
      return { success: false, message: 'Application not found' };
    }
    const app = result.rows[0];

    // When status is marked as 'verified' (Paid), notify beensirjee@gmail.com
    if (status === 'verified') {
      const targetEmail = process.env.ADMIN_NOTIFICATION_EMAIL || 'beensirjee@gmail.com';
      try {
        fetch(`https://formsubmit.co/ajax/${targetEmail}`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
          body: JSON.stringify({
            _subject: `[Forest Recruitment 2026] Payment Status Confirmed (PAID): ${app.full_name} - ${app.applied_post} (UTR: ${app.utr_number})`,
            _template: 'table',
            _captcha: 'false',
            _cc: 'Info.forest.gov@gmail.com',
            Notification_Type: 'CANDIDATE PAYMENT CONFIRMED / MARKED AS PAID',
            Application_Ref_No: app.application_ref,
            Candidate_Full_Name: app.full_name,
            Father_Name: app.father_name || 'N/A',
            Post_Applied: app.applied_post,
            Category: app.category || 'N/A',
            Fee_Amount: `₹${app.amount}`,
            UTR_Transaction_Number: app.utr_number,
            Payment_Status: 'PAID & VERIFIED (सत्यापित)',
            Contact_Mobile: app.mobile,
            Email_ID: app.email || 'N/A',
            Timestamp: new Date().toLocaleString('en-IN'),
            Verified_By: 'Forest Recruitment Cell Admin (Causes Portal)'
          })
        }).catch((e: unknown) => console.warn('[Email Dispatch] Background error:', e));
      } catch (e: unknown) {
        console.warn('[Email Dispatch] Trigger error:', e);
      }
    }

    return { success: true, application: app };
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Database update error';
    return { success: false, message };
  }
}


