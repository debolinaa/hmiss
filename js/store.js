/**
 * HMIS - Central Reactive State Management & Persistent Data Store
 * Software Engineering Lab Project
 * Team: Abhinaba Giri (Admin), Santorshi Ghosh (Doctor), Shreyasree Ghosh (Receptionist), Debolina Dey (Patient)
 */

const STORAGE_KEY = 'HMIS_SYSTEM_DATABASE_V1';

// Initial Seed Data with connected clinical records
const INITIAL_HMIS_DATA = {
  // 1. Users & Credentials
  users: [
    {
      id: 'usr-admin-01',
      username: 'admin',
      password: '123',
      name: 'Abhinaba Giri',
      role: 'admin',
      email: 'abhinaba.admin@hmis.med',
      phone: '+91 98301 11001',
      department: 'Hospital Administration',
      avatar: 'AG',
      status: 'active',
      lastLogin: '2026-09-13 09:30'
    },
    {
      id: 'usr-doc-01',
      username: 'doctor',
      password: '123',
      name: 'Dr. Santorshi Ghosh',
      role: 'doctor',
      email: 'dr.santorshi@hmis.med',
      phone: '+91 98302 22002',
      department: 'Cardiology & General Medicine',
      avatar: 'SG',
      status: 'active',
      specialization: 'MD (Cardiology), MBBS',
      opdRoom: 'Room 104, OPD Block A',
      consultationFee: 600,
      lastLogin: '2026-09-13 10:15'
    },
    {
      id: 'usr-recep-01',
      username: 'receptionist',
      password: '123',
      name: 'Shreyasree Ghosh',
      role: 'receptionist',
      email: 'shreyasree.frontdesk@hmis.med',
      phone: '+91 98303 33003',
      department: 'Reception & Admissions',
      avatar: 'SG',
      status: 'active',
      shift: 'Morning (08:00 - 16:00)',
      lastLogin: '2026-09-13 08:00'
    },
    {
      id: 'usr-pat-01',
      username: 'patient',
      password: '123',
      name: 'Debolina Dey',
      role: 'patient',
      email: 'debolina.dey@email.com',
      phone: '+91 98304 44004',
      patientUid: 'HMIS-2026-0001',
      avatar: 'DD',
      status: 'active',
      lastLogin: '2026-09-13 11:45'
    }
  ],

  // 2. Hospital Departments
  departments: [
    { id: 'dept-gm', name: 'General Medicine', code: 'GM', head: 'Dr. Santorshi Ghosh', opdFee: 500, floor: '1st Floor, Wing A', active: true },
    { id: 'dept-cardio', name: 'Cardiology', code: 'CARD', head: 'Dr. Santorshi Ghosh', opdFee: 800, floor: '2nd Floor, Wing B', active: true },
    { id: 'dept-ortho', name: 'Orthopedics', code: 'ORTH', head: 'Dr. Arindam Roy', opdFee: 600, floor: '1st Floor, Wing C', active: true },
    { id: 'dept-ped', name: 'Pediatrics', code: 'PED', head: 'Dr. Swati Bhattacharya', opdFee: 500, floor: 'Ground Floor, Wing D', active: true },
    { id: 'dept-rad', name: 'Radiology & Imaging', code: 'RAD', head: 'Dr. Kunal Sen', opdFee: 400, floor: 'Basement 1', active: true },
    { id: 'dept-path', name: 'Pathology & Lab', code: 'PATH', head: 'Dr. Rita Sen', opdFee: 300, floor: 'Ground Floor, Wing B', active: true },
    { id: 'dept-emg', name: 'Emergency & Trauma', code: 'EMG', head: 'Dr. Santorshi Ghosh', opdFee: 1000, floor: 'Ground Floor, Emergency Wing', active: true }
  ],

  // 3. Hospital Staff
  staff: [
    { id: 'stf-01', name: 'Dr. Santorshi Ghosh', role: 'Doctor', designation: 'Senior Consultant Physician & Cardiologist', department: 'Cardiology & General Medicine', qualification: 'MBBS, MD', contact: '+91 98302 22002', shift: 'Morning', status: 'On Duty' },
    { id: 'stf-02', name: 'Dr. Arindam Roy', role: 'Doctor', designation: 'Consultant Orthopedic Surgeon', department: 'Orthopedics', qualification: 'MS (Ortho), DNB', contact: '+91 98305 55005', shift: 'Morning', status: 'On Duty' },
    { id: 'stf-03', name: 'Dr. Swati Bhattacharya', role: 'Doctor', designation: 'Consultant Pediatrician', department: 'Pediatrics', qualification: 'MD (Pediatrics)', contact: '+91 98306 66006', shift: 'Evening', status: 'Off Duty' },
    { id: 'stf-04', name: 'Shreyasree Ghosh', role: 'Receptionist', designation: 'Chief Front Desk Officer', department: 'Reception & Admissions', qualification: 'B.Sc, Hospital Mgmt Dip', contact: '+91 98303 33003', shift: 'Morning', status: 'On Duty' },
    { id: 'stf-05', name: 'Priyanka Das', role: 'Nurse', designation: 'Head Nursing Supervisor (IPD)', department: 'IPD Wards', qualification: 'B.Sc Nursing, RN', contact: '+91 98307 77007', shift: 'Morning', status: 'On Duty' },
    { id: 'stf-06', name: 'Abhinaba Giri', role: 'Administrator', designation: 'Chief Hospital Information Officer', department: 'Administration & IT', qualification: 'M.Tech (Software Engg)', contact: '+91 98301 11001', shift: 'General', status: 'On Duty' }
  ],

  // 4. Patients Registry (Debolina Dey has UID HMIS-2026-0001)
  patients: [
    {
      uid: 'HMIS-2026-0001',
      name: 'Debolina Dey',
      age: 24,
      gender: 'Female',
      bloodGroup: 'A+',
      phone: '+91 98304 44004',
      email: 'debolina.dey@email.com',
      address: '72/B Park Circus Avenue, Kolkata, WB - 700017',
      emergencyContact: 'Mr. Dey (Father): +91 98311 22334',
      registrationDate: '2026-09-01',
      insuranceProvider: 'Star Health Insurance',
      insurancePolicyNo: 'SH-POL-2026-88192',
      allergies: 'Penicillin, Dust mite',
      chronicConditions: 'Mild Asthmatic Bronchitis'
    },
    {
      uid: 'HMIS-2026-0002',
      name: 'Rahul Sharma',
      age: 38,
      gender: 'Male',
      bloodGroup: 'B+',
      phone: '+91 98311 77889',
      email: 'rahul.sharma@example.com',
      address: '14 Salt Lake Sector 2, Kolkata, WB - 700091',
      emergencyContact: 'Sunita Sharma (Wife): +91 98311 77890',
      registrationDate: '2026-09-05',
      insuranceProvider: 'HDFC ERGO Health',
      insurancePolicyNo: 'HDFC-882910-C',
      allergies: 'None',
      chronicConditions: 'Hypertension Grade 1'
    },
    {
      uid: 'HMIS-2026-0003',
      name: 'Ananya Sen',
      age: 46,
      gender: 'Female',
      bloodGroup: 'O+',
      phone: '+91 98322 33445',
      email: 'ananya.sen@example.com',
      address: '22A Jadavpur Central Road, Kolkata, WB - 700032',
      emergencyContact: 'Ranjan Sen: +91 98322 33446',
      registrationDate: '2026-09-08',
      insuranceProvider: 'National Insurance Co.',
      insurancePolicyNo: 'NIC-WB-99381',
      allergies: 'Sulfa drugs',
      chronicConditions: 'Type 2 Diabetes Mellitus'
    },
    {
      uid: 'HMIS-2026-0004',
      name: 'Vikram Banerjee',
      age: 63,
      gender: 'Male',
      bloodGroup: 'AB+',
      phone: '+91 98333 44556',
      email: 'vikram.banerjee@example.com',
      address: '88 New Alipore, Block C, Kolkata, WB - 700053',
      emergencyContact: 'Deepak Banerjee (Son): +91 98333 44557',
      registrationDate: '2026-09-10',
      insuranceProvider: 'Care Health Insurance',
      insurancePolicyNo: 'CARE-MED-44810',
      allergies: 'Aspirin',
      chronicConditions: 'Ischemic Heart Disease, Post CABG'
    },
    {
      uid: 'HMIS-2026-0005',
      name: 'Priya Mukherjee',
      age: 29,
      gender: 'Female',
      bloodGroup: 'O-',
      phone: '+91 98344 55667',
      email: 'priya.m@example.com',
      address: '15/2 Gariahat Road, Kolkata, WB - 700019',
      emergencyContact: 'S. Mukherjee: +91 98344 55668',
      registrationDate: '2026-09-12',
      insuranceProvider: 'None (Cash Self-Pay)',
      insurancePolicyNo: 'N/A',
      allergies: 'None',
      chronicConditions: 'None'
    }
  ],

  // 5. Beds & Ward Inventory
  beds: [
    // General Ward (GW-01 to GW-10) - Rate: Rs. 1,000 / day
    { id: 'bed-gw-01', bedNumber: 'GW-01', ward: 'General Ward', type: 'Standard Bed', dailyRate: 1000, status: 'occupied', patientUid: 'HMIS-2026-0004', patientName: 'Vikram Banerjee', admissionId: 'adm-2026-001', assignedDate: '2026-09-10' },
    { id: 'bed-gw-02', bedNumber: 'GW-02', ward: 'General Ward', type: 'Standard Bed', dailyRate: 1000, status: 'available', patientUid: null, patientName: null, admissionId: null, assignedDate: null },
    { id: 'bed-gw-03', bedNumber: 'GW-03', ward: 'General Ward', type: 'Standard Bed', dailyRate: 1000, status: 'available', patientUid: null, patientName: null, admissionId: null, assignedDate: null },
    { id: 'bed-gw-04', bedNumber: 'GW-04', ward: 'General Ward', type: 'Standard Bed', dailyRate: 1000, status: 'available', patientUid: null, patientName: null, admissionId: null, assignedDate: null },
    { id: 'bed-gw-05', bedNumber: 'GW-05', ward: 'General Ward', type: 'Standard Bed', dailyRate: 1000, status: 'reserved', patientUid: 'HMIS-2026-0003', patientName: 'Ananya Sen', admissionId: null, assignedDate: '2026-09-13' },
    { id: 'bed-gw-06', bedNumber: 'GW-06', ward: 'General Ward', type: 'Standard Bed', dailyRate: 1000, status: 'available', patientUid: null, patientName: null, admissionId: null, assignedDate: null },
    { id: 'bed-gw-07', bedNumber: 'GW-07', ward: 'General Ward', type: 'Standard Bed', dailyRate: 1000, status: 'available', patientUid: null, patientName: null, admissionId: null, assignedDate: null },
    { id: 'bed-gw-08', bedNumber: 'GW-08', ward: 'General Ward', type: 'Standard Bed', dailyRate: 1000, status: 'occupied', patientUid: 'HMIS-2026-0002', patientName: 'Rahul Sharma', admissionId: 'adm-2026-002', assignedDate: '2026-09-12' },
    { id: 'bed-gw-09', bedNumber: 'GW-09', ward: 'General Ward', type: 'Standard Bed', dailyRate: 1000, status: 'available', patientUid: null, patientName: null, admissionId: null, assignedDate: null },
    { id: 'bed-gw-10', bedNumber: 'GW-10', ward: 'General Ward', type: 'Standard Bed', dailyRate: 1000, status: 'available', patientUid: null, patientName: null, admissionId: null, assignedDate: null },

    // Semi-Private Ward (SP-01 to SP-06) - Rate: Rs. 2,500 / day
    { id: 'bed-sp-01', bedNumber: 'SP-01', ward: 'Semi-Private Ward', type: 'Motorized Hospital Bed', dailyRate: 2500, status: 'available', patientUid: null, patientName: null, admissionId: null, assignedDate: null },
    { id: 'bed-sp-02', bedNumber: 'SP-02', ward: 'Semi-Private Ward', type: 'Motorized Hospital Bed', dailyRate: 2500, status: 'available', patientUid: null, patientName: null, admissionId: null, assignedDate: null },
    { id: 'bed-sp-03', bedNumber: 'SP-03', ward: 'Semi-Private Ward', type: 'Motorized Hospital Bed', dailyRate: 2500, status: 'available', patientUid: null, patientName: null, admissionId: null, assignedDate: null },
    { id: 'bed-sp-04', bedNumber: 'SP-04', ward: 'Semi-Private Ward', type: 'Motorized Hospital Bed', dailyRate: 2500, status: 'available', patientUid: null, patientName: null, admissionId: null, assignedDate: null },
    { id: 'bed-sp-05', bedNumber: 'SP-05', ward: 'Semi-Private Ward', type: 'Motorized Hospital Bed', dailyRate: 2500, status: 'available', patientUid: null, patientName: null, admissionId: null, assignedDate: null },
    { id: 'bed-sp-06', bedNumber: 'SP-06', ward: 'Semi-Private Ward', type: 'Motorized Hospital Bed', dailyRate: 2500, status: 'available', patientUid: null, patientName: null, admissionId: null, assignedDate: null },

    // Intensive Care Unit (ICU-01 to ICU-04) - Rate: Rs. 6,000 / day
    { id: 'bed-icu-01', bedNumber: 'ICU-01', ward: 'Intensive Care Unit (ICU)', type: 'Ventilator Equipped ICU Bed', dailyRate: 6000, status: 'occupied', patientUid: 'HMIS-2026-0004', patientName: 'Vikram Banerjee (Monitoring)', admissionId: 'adm-2026-001', assignedDate: '2026-09-11' },
    { id: 'bed-icu-02', bedNumber: 'ICU-02', ward: 'Intensive Care Unit (ICU)', type: 'Ventilator Equipped ICU Bed', dailyRate: 6000, status: 'available', patientUid: null, patientName: null, admissionId: null, assignedDate: null },
    { id: 'bed-icu-03', bedNumber: 'ICU-03', ward: 'Intensive Care Unit (ICU)', type: 'Ventilator Equipped ICU Bed', dailyRate: 6000, status: 'available', patientUid: null, patientName: null, admissionId: null, assignedDate: null },
    { id: 'bed-icu-04', bedNumber: 'ICU-04', ward: 'Intensive Care Unit (ICU)', type: 'Ventilator Equipped ICU Bed', dailyRate: 6000, status: 'available', patientUid: null, patientName: null, admissionId: null, assignedDate: null }
  ],

  // 6. Appointments & OPD Queue
  appointments: [
    {
      id: 'apt-2026-001',
      tokenNumber: 'TKN-01',
      patientUid: 'HMIS-2026-0001',
      patientName: 'Debolina Dey',
      doctorName: 'Dr. Santorshi Ghosh',
      department: 'Cardiology & General Medicine',
      date: '2026-09-13',
      timeSlot: '10:00 AM - 10:30 AM',
      type: 'OPD Consultation',
      status: 'Completed',
      fee: 600,
      notes: 'Follow-up for seasonal bronchospasm and chest heaviness.'
    },
    {
      id: 'apt-2026-002',
      tokenNumber: 'TKN-02',
      patientUid: 'HMIS-2026-0002',
      patientName: 'Rahul Sharma',
      doctorName: 'Dr. Santorshi Ghosh',
      department: 'General Medicine',
      date: '2026-09-13',
      timeSlot: '10:30 AM - 11:00 AM',
      type: 'Routine Checkup',
      status: 'In Consultation',
      fee: 500,
      notes: 'Hypertension review with BP fluctuations.'
    },
    {
      id: 'apt-2026-003',
      tokenNumber: 'TKN-03',
      patientUid: 'HMIS-2026-0005',
      patientName: 'Priya Mukherjee',
      doctorName: 'Dr. Santorshi Ghosh',
      department: 'General Medicine',
      date: '2026-09-13',
      timeSlot: '11:00 AM - 11:30 AM',
      type: 'New Consultation',
      status: 'Waiting',
      fee: 500,
      notes: 'Persistent mild fever and body aches for 3 days.'
    },
    {
      id: 'apt-2026-004',
      tokenNumber: 'TKN-04',
      patientUid: 'HMIS-2026-0001',
      patientName: 'Debolina Dey',
      doctorName: 'Dr. Santorshi Ghosh',
      department: 'Cardiology & General Medicine',
      date: '2026-09-20',
      timeSlot: '10:00 AM - 10:30 AM',
      type: 'Review Follow-up',
      status: 'Scheduled',
      fee: 600,
      notes: 'Scheduled post-medication 1-week review.'
    }
  ],

  // 7. IPD Admissions & Bed Allocation History
  admissions: [
    {
      id: 'adm-2026-001',
      patientUid: 'HMIS-2026-0004',
      patientName: 'Vikram Banerjee',
      admittingDoctor: 'Dr. Santorshi Ghosh',
      admissionDate: '2026-09-10 14:30',
      ward: 'Intensive Care Unit (ICU)',
      bedNumber: 'ICU-01',
      dailyRate: 6000,
      admissionReason: 'Acute coronary syndrome, unstable angina with chest pain',
      status: 'Admitted',
      dischargeDate: null,
      dischargeSummaryId: null
    },
    {
      id: 'adm-2026-002',
      patientUid: 'HMIS-2026-0002',
      patientName: 'Rahul Sharma',
      admittingDoctor: 'Dr. Santorshi Ghosh',
      admissionDate: '2026-09-12 18:00',
      ward: 'General Ward',
      bedNumber: 'GW-08',
      dailyRate: 1000,
      admissionReason: 'Hypertensive urgency with severe migraine and dizziness',
      status: 'Admitted',
      dischargeDate: null,
      dischargeSummaryId: null
    }
  ],

  // 8. Clinical Diagnoses & Consultations
  diagnoses: [
    {
      id: 'diag-2026-001',
      patientUid: 'HMIS-2026-0001',
      patientName: 'Debolina Dey',
      doctorName: 'Dr. Santorshi Ghosh',
      date: '2026-09-13',
      appointmentId: 'apt-2026-001',
      vitals: { bp: '118/76 mmHg', pulse: '74 bpm', temp: '98.4 °F', spo2: '99%', weight: '54 kg' },
      chiefComplaints: 'Occasional dry cough and mild nocturnal wheezing triggered by dust.',
      clinicalFindings: 'Bilateral mild expiratory wheeze. Heart sounds S1S2 normal, no murmurs.',
      primaryDiagnosis: 'Allergic Bronchitis with Mild Reversible Airway Obstruction',
      icdCode: 'J45.909',
      advice: 'Avoid cold beverages and dusty environments. Steam inhalation twice daily.',
      recommendedTests: ['Complete Blood Count (CBC)', 'Absolute Eosinophil Count (AEC)', 'Chest X-Ray PA View']
    },
    {
      id: 'diag-2026-002',
      patientUid: 'HMIS-2026-0004',
      patientName: 'Vikram Banerjee',
      doctorName: 'Dr. Santorshi Ghosh',
      date: '2026-09-11',
      appointmentId: null,
      vitals: { bp: '144/92 mmHg', pulse: '88 bpm', temp: '98.6 °F', spo2: '97%', weight: '72 kg' },
      chiefComplaints: 'Substernal chest tightness radiating to left shoulder on mild exertion.',
      clinicalFindings: 'ST-T depressions noted on lead V4-V6. Elevated Troponin I.',
      primaryDiagnosis: 'Non-ST Elevation Myocardial Infarction (NSTEMI) / Unstable Angina',
      icdCode: 'I21.4',
      advice: 'Complete bed rest in ICU. Continuous cardiac telemetry monitoring.',
      recommendedTests: ['Serial Troponin-I', '12-Lead ECG', '2D Echocardiography', 'Serum Electrolytes']
    }
  ],

  // 9. Prescriptions
  prescriptions: [
    {
      id: 'rx-2026-001',
      patientUid: 'HMIS-2026-0001',
      patientName: 'Debolina Dey',
      doctorName: 'Dr. Santorshi Ghosh',
      date: '2026-09-13',
      diagnosisId: 'diag-2026-001',
      diagnosisName: 'Allergic Bronchitis',
      medicines: [
        { name: 'Tab. Montelukast + Levocetirizine (Montair-LC)', dosage: '10mg/5mg', frequency: '0-0-1 (Night)', duration: '10 days', instruction: 'After dinner' },
        { name: 'Inhaler Budesonide + Formoterol (Budecort-F 200)', dosage: '200 mcg', frequency: '1-0-1 (Twice Daily)', duration: '14 days', instruction: '2 puffs with spacer, rinse mouth after use' },
        { name: 'Syp. Ambroxol + Guaiphenesin', dosage: '10 ml', frequency: '1-0-1', duration: '5 days', instruction: 'After food with warm water' }
      ],
      investigationsOrdered: ['Complete Blood Count (CBC)', 'Chest X-Ray PA'],
      generalAdvice: 'Drink lukewarm fluids. Return for OPD follow-up on 2026-09-20.',
      digitalSignature: 'Dr. Santorshi Ghosh, MD, Reg. No. WBMC-74291'
    },
    {
      id: 'rx-2026-002',
      patientUid: 'HMIS-2026-0004',
      patientName: 'Vikram Banerjee',
      doctorName: 'Dr. Santorshi Ghosh',
      date: '2026-09-11',
      diagnosisId: 'diag-2026-002',
      diagnosisName: 'Unstable Angina / NSTEMI',
      medicines: [
        { name: 'Tab. Clopidogrel', dosage: '75 mg', frequency: '1-0-0', duration: '30 days', instruction: 'After breakfast' },
        { name: 'Tab. Atorvastatin', dosage: '40 mg', frequency: '0-0-1', duration: '30 days', instruction: 'Bedtime' },
        { name: 'Tab. Metoprolol Succinate', dosage: '25 mg', frequency: '1-0-0', duration: '15 days', instruction: 'Morning after food' },
        { name: 'Tab. Sorbitrate (SOS)', dosage: '5 mg', frequency: 'SOS (As needed)', duration: '10 days', instruction: 'Sublingual if chest pain occurs' }
      ],
      investigationsOrdered: ['2D Echo', 'Serum Creatinine', 'Lipid Profile'],
      generalAdvice: 'Low salt, low fat diet. Avoid physical exertion.',
      digitalSignature: 'Dr. Santorshi Ghosh, MD, Reg. No. WBMC-74291'
    }
  ],

  // 10. Diagnostic Test Reports
  testReports: [
    {
      id: 'test-2026-001',
      patientUid: 'HMIS-2026-0001',
      patientName: 'Debolina Dey',
      testName: 'Complete Blood Count (CBC)',
      category: 'Pathology',
      orderedBy: 'Dr. Santorshi Ghosh',
      dateOrdered: '2026-09-13',
      dateReported: '2026-09-13',
      status: 'Reported',
      results: [
        { parameter: 'Hemoglobin (Hb)', value: '12.8 g/dL', normalRange: '12.0 - 15.5 g/dL', flag: 'Normal' },
        { parameter: 'Total Leukocyte Count (TLC)', value: '7,400 /cu.mm', normalRange: '4,000 - 11,000', flag: 'Normal' },
        { parameter: 'Eosinophils', value: '7.2 %', normalRange: '1.0 - 6.0 %', flag: 'High (Allergic)' },
        { parameter: 'Platelet Count', value: '2.4 Lakhs/cu.mm', normalRange: '1.5 - 4.5 Lakhs', flag: 'Normal' }
      ],
      impression: 'Mild eosinophilia consistent with allergic airway hyperresponsiveness.',
      consultantPathologist: 'Dr. Rita Sen, MD (Path)'
    },
    {
      id: 'test-2026-002',
      patientUid: 'HMIS-2026-0001',
      patientName: 'Debolina Dey',
      testName: 'Digital Chest X-Ray (PA View)',
      category: 'Radiology',
      orderedBy: 'Dr. Santorshi Ghosh',
      dateOrdered: '2026-09-13',
      dateReported: '2026-09-13',
      status: 'Reported',
      results: [
        { parameter: 'Lung Fields', value: 'Clear, no active focal consolidation or effusion', normalRange: 'Clear', flag: 'Normal' },
        { parameter: 'Cardiothoracic Ratio', value: '< 0.50 (Within limits)', normalRange: '< 0.50', flag: 'Normal' },
        { parameter: 'Bony Cage & Diaphragm', value: 'Normal domes, CP angles sharp', normalRange: 'Normal', flag: 'Normal' }
      ],
      impression: 'No active pulmonary parenchymal lesion. Normal radiographic study.',
      consultantPathologist: 'Dr. Kunal Sen, MD (Radiodiagnosis)'
    },
    {
      id: 'test-2026-003',
      patientUid: 'HMIS-2026-0004',
      patientName: 'Vikram Banerjee',
      testName: 'Lipid Profile & Cardiac Biomarkers',
      category: 'Pathology',
      orderedBy: 'Dr. Santorshi Ghosh',
      dateOrdered: '2026-09-11',
      dateReported: '2026-09-11',
      status: 'Reported',
      results: [
        { parameter: 'Total Cholesterol', value: '224 mg/dL', normalRange: '< 200 mg/dL', flag: 'High' },
        { parameter: 'LDL Cholesterol', value: '142 mg/dL', normalRange: '< 100 mg/dL', flag: 'High' },
        { parameter: 'Triglycerides', value: '190 mg/dL', normalRange: '< 150 mg/dL', flag: 'High' },
        { parameter: 'High-Sensitivity Troponin-I', value: '0.08 ng/mL', normalRange: '< 0.04 ng/mL', flag: 'Critical' }
      ],
      impression: 'Hyperlipidemia with mildly elevated cardiac Troponin-I.',
      consultantPathologist: 'Dr. Rita Sen, MD (Path)'
    }
  ],

  // 11. Clinical Follow-ups (Doctor IPD Rounds)
  clinicalFollowUps: [
    {
      id: 'cfu-01',
      admissionId: 'adm-2026-001',
      patientUid: 'HMIS-2026-0004',
      patientName: 'Vikram Banerjee',
      doctorName: 'Dr. Santorshi Ghosh',
      date: '2026-09-11 09:30',
      roundType: 'Morning Round (ICU)',
      vitals: { bp: '138/86 mmHg', hr: '78 bpm', spo2: '98%', urineOutput: '1200 ml / 24h' },
      progressNotes: 'Patient resting comfortably. No fresh recurrence of angina. Serial ECG shows stabilizing T waves.',
      treatmentAdjustments: 'Continue IV Heparin infusion and oral antiplatelet therapy. Repeat Troponin at 18:00 hrs.',
      nurseInstructions: 'Monitor BP hourly. Strict bed rest.'
    },
    {
      id: 'cfu-02',
      admissionId: 'adm-2026-001',
      patientUid: 'HMIS-2026-0004',
      patientName: 'Vikram Banerjee',
      doctorName: 'Dr. Santorshi Ghosh',
      date: '2026-09-12 10:00',
      roundType: 'Morning Round (ICU)',
      vitals: { bp: '128/80 mmHg', hr: '72 bpm', spo2: '99%', urineOutput: 'Adequate' },
      progressNotes: 'Chest pain completely subsided. Patient tolerating light oral diet. Stable hemodynamics.',
      treatmentAdjustments: 'Plan step-down transfer from ICU to General Ward bed GW-01 tomorrow morning.',
      nurseInstructions: 'Allow sitting in chair for 30 minutes.'
    }
  ],

  // 12. Discharge Summaries
  dischargeSummaries: [
    {
      id: 'dc-2026-001',
      admissionId: 'adm-2026-001',
      patientUid: 'HMIS-2026-0004',
      patientName: 'Vikram Banerjee',
      attendingDoctor: 'Dr. Santorshi Ghosh',
      admissionDate: '2026-09-10',
      dischargeDate: '2026-09-14',
      diagnosisAtAdmission: 'Acute Coronary Syndrome, Unstable Angina',
      finalDiagnosis: 'Coronary Artery Disease - Unstable Angina (Stabilized)',
      hospitalCourse: 'Patient admitted via Emergency with acute chest pain. Admitted to ICU bed ICU-01, initiated on dual antiplatelet therapy, statin, and beta blockers. Monitored for 48 hours; pain subsided and troponin normalized. Stepped down to ward and fully mobilized.',
      conditionAtDischarge: 'Hemodynamically stable, asymptomatic, afebrile.',
      dischargeMedications: [
        'Tab. Clopidogrel 75mg once daily',
        'Tab. Atorvastatin 40mg once daily at bedtime',
        'Tab. Metoprolol Succinate 25mg once daily'
      ],
      dietInstructions: 'Low salt, low cholesterol, diabetic-friendly cardiac diet.',
      followUpInstructions: 'Review in Cardiology OPD with Dr. Santorshi Ghosh in 10 days.',
      status: 'Ready for Final Billing'
    }
  ],

  // 13. Bills & Financial Accounts
  bills: [
    {
      id: 'bill-2026-001',
      billNumber: 'INV-2026-0001',
      patientUid: 'HMIS-2026-0001',
      patientName: 'Debolina Dey',
      billType: 'OPD Consultation & Diagnostic Tests',
      date: '2026-09-13',
      appointmentId: 'apt-2026-001',
      items: [
        { description: 'OPD Specialist Consultation - Dr. Santorshi Ghosh', category: 'Consultation', amount: 600 },
        { description: 'Complete Blood Count (CBC) with Differential', category: 'Pathology', amount: 350 },
        { description: 'Digital Chest X-Ray PA View', category: 'Radiology', amount: 550 },
        { description: 'Hospital Registration & Administrative Fee', category: 'Admin', amount: 100 }
      ],
      subTotal: 1600,
      discount: 100, // Fixed discount
      taxRate: 5, // 5% GST
      taxAmount: 75,
      insuranceCovered: 1000, // Paid by Star Health Insurance
      grandTotal: 1575,
      patientPayable: 575,
      amountPaid: 575,
      balanceDue: 0,
      paymentStatus: 'Paid',
      paymentMethod: 'UPI / Online Portal',
      transactionRef: 'UPI-TXN-99882103',
      isDuplicate: false,
      reprintCount: 0
    },
    {
      id: 'bill-2026-002',
      billNumber: 'INV-2026-0002',
      patientUid: 'HMIS-2026-0002',
      patientName: 'Rahul Sharma',
      billType: 'IPD Hospitalization & Treatment (Provisional)',
      date: '2026-09-13',
      appointmentId: 'apt-2026-002',
      items: [
        { description: 'Emergency Admission & Physician Evaluation', category: 'Consultation', amount: 1000 },
        { description: 'General Ward Bed Charges (2 Days @ Rs. 1,000/day)', category: 'Bed Charges', amount: 2000 },
        { description: 'Nursing & Vital Monitoring Charges', category: 'Nursing', amount: 600 },
        { description: 'Serum Electrolytes & Renal Function Test', category: 'Pathology', amount: 850 }
      ],
      subTotal: 4450,
      discount: 250,
      taxRate: 5,
      taxAmount: 210,
      insuranceCovered: 3000,
      grandTotal: 4410,
      patientPayable: 1410,
      amountPaid: 500,
      balanceDue: 910,
      paymentStatus: 'Partial',
      paymentMethod: 'Credit Card',
      transactionRef: 'CC-AUTH-441928',
      isDuplicate: false,
      reprintCount: 0
    }
  ],

  // 14. Duty Roster & Shifts
  dutyRoster: [
    { id: 'rost-01', staffName: 'Dr. Santorshi Ghosh', role: 'Doctor', department: 'Cardiology', shift: 'Morning (09:00 - 15:00)', days: 'Mon, Tue, Wed, Thu, Fri, Sat', status: 'Active' },
    { id: 'rost-02', staffName: 'Dr. Arindam Roy', role: 'Doctor', department: 'Orthopedics', shift: 'Morning (10:00 - 16:00)', days: 'Mon, Wed, Fri', status: 'Active' },
    { id: 'rost-03', staffName: 'Dr. Swati Bhattacharya', role: 'Doctor', department: 'Pediatrics', shift: 'Evening (14:00 - 20:00)', days: 'Tue, Thu, Sat', status: 'Active' },
    { id: 'rost-04', staffName: 'Shreyasree Ghosh', role: 'Receptionist', department: 'Reception Counter 1', shift: 'Morning (08:00 - 16:00)', days: 'All Days', status: 'Active' },
    { id: 'rost-05', staffName: 'Priyanka Das', role: 'Nurse', department: 'IPD Ward 1', shift: 'Morning (07:00 - 15:00)', days: 'Mon to Sat', status: 'Active' },
    { id: 'rost-06', staffName: 'Abhinaba Giri', role: 'Administrator', department: 'Admin Office', shift: 'General (09:30 - 18:00)', days: 'Mon to Sat', status: 'Active' }
  ],

  // 15. Consultation Schedule
  consultationSchedules: [
    { id: 'sch-01', doctorName: 'Dr. Santorshi Ghosh', department: 'Cardiology & General Medicine', room: 'OPD Room 104', days: 'Monday to Saturday', timing: '09:30 AM - 01:30 PM', maxPatients: 25, slotDuration: '15 mins' },
    { id: 'sch-02', doctorName: 'Dr. Arindam Roy', department: 'Orthopedics', room: 'OPD Room 106', days: 'Mon, Wed, Fri', timing: '10:00 AM - 02:00 PM', maxPatients: 20, slotDuration: '15 mins' },
    { id: 'sch-03', doctorName: 'Dr. Swati Bhattacharya', department: 'Pediatrics', room: 'OPD Room 108', days: 'Tue, Thu, Sat', timing: '02:30 PM - 06:30 PM', maxPatients: 20, slotDuration: '15 mins' }
  ],

  // 16. Billing Configuration Settings (Managed by Admin Abhinaba Giri)
  billingConfig: {
    baseConsultationFee: 500,
    specialistConsultationFee: 800,
    emergencyFee: 1000,
    wardRates: {
      generalWard: 1000,
      semiPrivate: 2500,
      icu: 6000
    },
    defaultTaxGstPercent: 5,
    standardDiscountPercent: 5,
    acceptedInsurances: [
      'Star Health Insurance',
      'HDFC ERGO Health',
      'National Insurance Co.',
      'Care Health Insurance',
      'ICICI Lombard',
      'Ayushman Bharat / PMJAY'
    ]
  },

  // 17. Patient Feedback
  feedback: [
    {
      id: 'fb-001',
      patientUid: 'HMIS-2026-0001',
      patientName: 'Debolina Dey',
      date: '2026-09-13',
      rating: 5,
      department: 'Cardiology & General Medicine',
      doctorName: 'Dr. Santorshi Ghosh',
      staffRating: 5,
      cleanlinessRating: 5,
      comments: 'Dr. Santorshi Ghosh was exceptionally patient and thorough with my diagnosis. The electronic prescription was clear and registration by Shreyasree at the front desk was seamless!',
      status: 'Reviewed by Admin'
    }
  ],

  // 18. System Audit & Security Logs
  auditLogs: [
    { id: 'log-01', timestamp: '2026-09-13 08:00', user: 'Shreyasree Ghosh', role: 'receptionist', action: 'FRONT_DESK_LOGIN', details: 'Shift commenced. OPD registration counter opened.' },
    { id: 'log-02', timestamp: '2026-09-13 09:30', user: 'Abhinaba Giri', role: 'admin', action: 'SECURITY_AUDIT', details: 'System health check completed. Daily backup verified.' },
    { id: 'log-03', timestamp: '2026-09-13 10:15', user: 'Dr. Santorshi Ghosh', role: 'doctor', action: 'OPD_SESSION_START', details: 'Consultation room 104 logged in. Queue activated.' },
    { id: 'log-04', timestamp: '2026-09-13 11:20', user: 'Dr. Santorshi Ghosh', role: 'doctor', action: 'PRESCRIPTION_ISSUED', details: 'Rx issued for patient Debolina Dey (UID HMIS-2026-0001).' },
    { id: 'log-05', timestamp: '2026-09-13 11:45', user: 'Debolina Dey', role: 'patient', action: 'PATIENT_PORTAL_LOGIN', details: 'Viewed prescription and settled OPD consultation invoice online.' }
  ]
};

// Data Store Class with automatic persistence
class HMISDataStore {
  constructor() {
    this.state = this.loadState();
    this.listeners = [];
  }

  loadState() {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        return JSON.parse(stored);
      }
    } catch (e) {
      console.warn('Unable to read from localStorage, using in-memory state.', e);
    }
    // Initialize default seed
    this.saveStateToStorage(INITIAL_HMIS_DATA);
    return JSON.parse(JSON.stringify(INITIAL_HMIS_DATA));
  }

  saveStateToStorage(data) {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch (e) {
      console.warn('Unable to persist to localStorage.', e);
    }
  }

  persist() {
    this.saveStateToStorage(this.state);
    this.notifyListeners();
  }

  subscribe(listener) {
    this.listeners.push(listener);
    return () => {
      this.listeners = this.listeners.filter(l => l !== listener);
    };
  }

  notifyListeners() {
    this.listeners.forEach(fn => {
      try { fn(this.state); } catch (e) { console.error('Listener error', e); }
    });
  }

  resetToDefault() {
    this.state = JSON.parse(JSON.stringify(INITIAL_HMIS_DATA));
    this.persist();
    this.logAction('Abhinaba Giri', 'admin', 'SYSTEM_RESET', 'Database reset to default assignment seed state.');
    return this.state;
  }

  exportDatabaseJSON() {
    return JSON.stringify(this.state, null, 2);
  }

  importDatabaseJSON(jsonString) {
    try {
      const parsed = JSON.parse(jsonString);
      if (parsed && parsed.users && parsed.patients && parsed.beds) {
        this.state = parsed;
        this.persist();
        this.logAction('Abhinaba Giri', 'admin', 'DATABASE_RESTORE', 'Database restored from imported JSON backup.');
        return { success: true, message: 'Database restored successfully.' };
      }
      return { success: false, message: 'Invalid HMIS database format.' };
    } catch (e) {
      return { success: false, message: 'Invalid JSON file content.' };
    }
  }

  logAction(userName, userRole, action, details) {
    const now = new Date();
    const timestamp = now.toISOString().replace('T', ' ').substring(0, 16);
    const newLog = {
      id: 'log-' + Date.now(),
      timestamp,
      user: userName,
      role: userRole,
      action,
      details
    };
    this.state.auditLogs.unshift(newLog);
    // Keep max 50 logs
    if (this.state.auditLogs.length > 50) {
      this.state.auditLogs.pop();
    }
    this.saveStateToStorage(this.state);
  }

  // ==========================================
  // PATIENT MANAGEMENT
  // ==========================================

  getPatients() {
    return this.state.patients;
  }

  getPatientByUID(uid) {
    return this.state.patients.find(p => p.uid.toLowerCase() === uid.toLowerCase());
  }

  generateNextPatientUID() {
    const currentYear = new Date().getFullYear();
    const existing = this.state.patients
      .map(p => {
        const match = p.uid.match(/HMIS-\d{4}-(\d+)/);
        return match ? parseInt(match[1], 10) : 0;
      })
      .filter(n => !isNaN(n));
    const maxNum = existing.length > 0 ? Math.max(...existing) : 0;
    const nextNum = (maxNum + 1).toString().padStart(4, '0');
    return `HMIS-${currentYear}-${nextNum}`;
  }

  registerPatient(patientData, operatorName = 'Shreyasree Ghosh') {
    const uid = patientData.uid || this.generateNextPatientUID();
    const newPatient = {
      uid,
      name: patientData.name,
      age: parseInt(patientData.age, 10) || 0,
      gender: patientData.gender || 'Other',
      bloodGroup: patientData.bloodGroup || 'Unknown',
      phone: patientData.phone,
      email: patientData.email || '',
      address: patientData.address || '',
      emergencyContact: patientData.emergencyContact || '',
      registrationDate: new Date().toISOString().substring(0, 10),
      insuranceProvider: patientData.insuranceProvider || 'None',
      insurancePolicyNo: patientData.insurancePolicyNo || 'N/A',
      allergies: patientData.allergies || 'None',
      chronicConditions: patientData.chronicConditions || 'None'
    };

    this.state.patients.unshift(newPatient);

    // Also auto-create a patient portal login if user doesn't exist
    const existingUser = this.state.users.find(u => u.patientUid === uid || u.username === uid.toLowerCase());
    if (!existingUser) {
      this.state.users.push({
        id: 'usr-pat-' + Date.now(),
        username: uid.toLowerCase(),
        password: '123',
        name: newPatient.name,
        role: 'patient',
        email: newPatient.email,
        phone: newPatient.phone,
        patientUid: uid,
        avatar: newPatient.name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase(),
        status: 'active',
        lastLogin: 'Never'
      });
    }

    this.logAction(operatorName, 'receptionist', 'PATIENT_REGISTERED', `New patient registered: ${newPatient.name} with UID ${uid}`);
    this.persist();
    return newPatient;
  }

  updatePatientProfile(uid, updatedFields) {
    const patient = this.getPatientByUID(uid);
    if (!patient) return false;
    Object.assign(patient, updatedFields);
    this.persist();
    return patient;
  }

  // ==========================================
  // APPOINTMENTS & OPD QUEUE
  // ==========================================

  getAppointments() {
    return this.state.appointments;
  }

  bookAppointment(data, bookedBy = 'Shreyasree Ghosh') {
    const aptCount = this.state.appointments.length + 1;
    const tokenNum = 'TKN-' + aptCount.toString().padStart(2, '0');
    const aptId = 'apt-2026-' + aptCount.toString().padStart(3, '0');

    const newApt = {
      id: aptId,
      tokenNumber: tokenNum,
      patientUid: data.patientUid,
      patientName: data.patientName,
      doctorName: data.doctorName,
      department: data.department,
      date: data.date || new Date().toISOString().substring(0, 10),
      timeSlot: data.timeSlot || '10:00 AM - 10:30 AM',
      type: data.type || 'OPD Consultation',
      status: data.status || 'Scheduled',
      fee: parseInt(data.fee, 10) || 500,
      notes: data.notes || ''
    };

    this.state.appointments.unshift(newApt);
    this.logAction(bookedBy, 'staff', 'APPOINTMENT_BOOKED', `Booked ${newApt.tokenNumber} for ${newApt.patientName} with ${newApt.doctorName}`);
    this.persist();
    return newApt;
  }

  updateAppointmentStatus(id, newStatus, doctorOrStaff = 'Dr. Santorshi Ghosh') {
    const apt = this.state.appointments.find(a => a.id === id);
    if (apt) {
      apt.status = newStatus;
      this.logAction(doctorOrStaff, 'doctor', 'APPOINTMENT_STATUS_UPDATE', `Appointment ${apt.tokenNumber} status updated to ${newStatus}`);
      this.persist();
      return apt;
    }
    return null;
  }

  // ==========================================
  // CLINICAL DIAGNOSIS & PRESCRIPTIONS
  // ==========================================

  saveDiagnosisAndPrescription(data, doctorName = 'Dr. Santorshi Ghosh') {
    const now = new Date();
    const today = now.toISOString().substring(0, 10);

    // 1. Create Diagnosis Record
    const diagId = 'diag-2026-' + (this.state.diagnoses.length + 1).toString().padStart(3, '0');
    const newDiag = {
      id: diagId,
      patientUid: data.patientUid,
      patientName: data.patientName,
      doctorName: doctorName,
      date: today,
      appointmentId: data.appointmentId || null,
      vitals: data.vitals || { bp: '120/80', pulse: '72', temp: '98.6', spo2: '99%', weight: '60' },
      chiefComplaints: data.chiefComplaints || '',
      clinicalFindings: data.clinicalFindings || '',
      primaryDiagnosis: data.primaryDiagnosis || '',
      icdCode: data.icdCode || 'R69',
      advice: data.advice || '',
      recommendedTests: data.recommendedTests || []
    };
    this.state.diagnoses.unshift(newDiag);

    // 2. Create Prescription Record
    const rxId = 'rx-2026-' + (this.state.prescriptions.length + 1).toString().padStart(3, '0');
    const newRx = {
      id: rxId,
      patientUid: data.patientUid,
      patientName: data.patientName,
      doctorName: doctorName,
      date: today,
      diagnosisId: diagId,
      diagnosisName: data.primaryDiagnosis,
      medicines: data.medicines || [],
      investigationsOrdered: data.recommendedTests || [],
      generalAdvice: data.advice || '',
      digitalSignature: `${doctorName}, Reg. No. WBMC-${Math.floor(10000 + Math.random() * 90000)}`
    };
    this.state.prescriptions.unshift(newRx);

    // 3. Mark appointment completed if attached
    if (data.appointmentId) {
      this.updateAppointmentStatus(data.appointmentId, 'Completed', doctorName);
    }

    // 4. Auto-generate pending test orders if recommended
    if (data.recommendedTests && data.recommendedTests.length > 0) {
      data.recommendedTests.forEach(testName => {
        this.state.testReports.unshift({
          id: 'test-2026-' + (this.state.testReports.length + 1).toString().padStart(3, '0'),
          patientUid: data.patientUid,
          patientName: data.patientName,
          testName,
          category: testName.includes('X-Ray') || testName.includes('ECG') ? 'Radiology' : 'Pathology',
          orderedBy: doctorName,
          dateOrdered: today,
          dateReported: today,
          status: 'Reported',
          results: [
            { parameter: testName, value: 'Routine evaluation conducted', normalRange: 'Within Normal Limits', flag: 'Normal' }
          ],
          impression: 'Evaluation completed as ordered by physician.',
          consultantPathologist: 'Dr. Rita Sen, MD'
        });
      });
    }

    this.logAction(doctorName, 'doctor', 'DIAGNOSIS_AND_RX_CREATED', `Consultation finalized for ${data.patientName} (${data.patientUid})`);
    this.persist();
    return { diagnosis: newDiag, prescription: newRx };
  }

  // ==========================================
  // BEDS & IPD MANAGEMENT
  // ==========================================

  getBeds() {
    return this.state.beds;
  }

  admitPatientToIPD(data, admittedBy = 'Shreyasree Ghosh') {
    const bed = this.state.beds.find(b => b.id === data.bedId);
    if (!bed) return { success: false, message: 'Bed not found' };
    if (bed.status === 'occupied') return { success: false, message: 'Bed is already occupied!' };

    const admId = 'adm-2026-' + (this.state.admissions.length + 1).toString().padStart(3, '0');
    const nowStr = new Date().toISOString().replace('T', ' ').substring(0, 16);

    // Update Bed
    bed.status = 'occupied';
    bed.patientUid = data.patientUid;
    bed.patientName = data.patientName;
    bed.admissionId = admId;
    bed.assignedDate = nowStr;

    // Create Admission
    const newAdm = {
      id: admId,
      patientUid: data.patientUid,
      patientName: data.patientName,
      admittingDoctor: data.admittingDoctor || 'Dr. Santorshi Ghosh',
      admissionDate: nowStr,
      ward: bed.ward,
      bedNumber: bed.bedNumber,
      dailyRate: bed.dailyRate,
      admissionReason: data.admissionReason || 'In-patient clinical observation and medical management',
      status: 'Admitted',
      dischargeDate: null,
      dischargeSummaryId: null
    };

    this.state.admissions.unshift(newAdm);
    this.logAction(admittedBy, 'receptionist', 'PATIENT_ADMITTED_IPD', `Admitted ${data.patientName} to ${bed.ward} (${bed.bedNumber})`);
    this.persist();
    return { success: true, admission: newAdm, bed };
  }

  transferBed(admissionId, newBedId, transferredBy = 'Shreyasree Ghosh') {
    const admission = this.state.admissions.find(a => a.id === admissionId && a.status === 'Admitted');
    if (!admission) return { success: false, message: 'Active admission not found' };

    const oldBed = this.state.beds.find(b => b.bedNumber === admission.bedNumber);
    const newBed = this.state.beds.find(b => b.id === newBedId);

    if (!newBed) return { success: false, message: 'Target bed not found' };
    if (newBed.status === 'occupied') return { success: false, message: 'Target bed is occupied!' };

    // Release old bed
    if (oldBed) {
      oldBed.status = 'available';
      oldBed.patientUid = null;
      oldBed.patientName = null;
      oldBed.admissionId = null;
      oldBed.assignedDate = null;
    }

    // Assign new bed
    const nowStr = new Date().toISOString().replace('T', ' ').substring(0, 16);
    newBed.status = 'occupied';
    newBed.patientUid = admission.patientUid;
    newBed.patientName = admission.patientName;
    newBed.admissionId = admission.id;
    newBed.assignedDate = nowStr;

    // Update Admission
    admission.ward = newBed.ward;
    admission.bedNumber = newBed.bedNumber;
    admission.dailyRate = newBed.dailyRate;

    this.logAction(transferredBy, 'receptionist', 'BED_TRANSFER', `Transferred ${admission.patientName} from ${oldBed ? oldBed.bedNumber : 'unknown'} to ${newBed.bedNumber}`);
    this.persist();
    return { success: true, admission, oldBed, newBed };
  }

  saveClinicalFollowUp(data, doctorName = 'Dr. Santorshi Ghosh') {
    const nowStr = new Date().toISOString().replace('T', ' ').substring(0, 16);
    const cfuId = 'cfu-' + Date.now();
    const newFollowUp = {
      id: cfuId,
      admissionId: data.admissionId,
      patientUid: data.patientUid,
      patientName: data.patientName,
      doctorName: doctorName,
      date: nowStr,
      roundType: data.roundType || 'Routine Doctor Round',
      vitals: data.vitals || { bp: '120/80', hr: '72', spo2: '99%', urineOutput: 'Adequate' },
      progressNotes: data.progressNotes || '',
      treatmentAdjustments: data.treatmentAdjustments || '',
      nurseInstructions: data.nurseInstructions || ''
    };

    this.state.clinicalFollowUps.unshift(newFollowUp);
    this.logAction(doctorName, 'doctor', 'CLINICAL_FOLLOWUP_ADDED', `Clinical round note recorded for ${data.patientName}`);
    this.persist();
    return newFollowUp;
  }

  saveDischargeSummary(data, doctorName = 'Dr. Santorshi Ghosh') {
    const dcId = 'dc-2026-' + (this.state.dischargeSummaries.length + 1).toString().padStart(3, '0');
    const nowStr = new Date().toISOString().substring(0, 10);

    const newSummary = {
      id: dcId,
      admissionId: data.admissionId,
      patientUid: data.patientUid,
      patientName: data.patientName,
      attendingDoctor: doctorName,
      admissionDate: data.admissionDate,
      dischargeDate: nowStr,
      diagnosisAtAdmission: data.diagnosisAtAdmission || '',
      finalDiagnosis: data.finalDiagnosis || '',
      hospitalCourse: data.hospitalCourse || '',
      conditionAtDischarge: data.conditionAtDischarge || 'Hemodynamically stable and improved',
      dischargeMedications: data.dischargeMedications || [],
      dietInstructions: data.dietInstructions || 'Standard healthy nutritious diet',
      followUpInstructions: data.followUpInstructions || 'Review in OPD in 7 days',
      status: 'Ready for Final Billing'
    };

    this.state.dischargeSummaries.unshift(newSummary);

    // Update admission record
    const admission = this.state.admissions.find(a => a.id === data.admissionId);
    if (admission) {
      admission.dischargeSummaryId = dcId;
      admission.status = 'Discharge Prepared';
    }

    this.logAction(doctorName, 'doctor', 'DISCHARGE_SUMMARY_PREPARED', `Discharge summary generated for ${data.patientName}`);
    this.persist();
    return newSummary;
  }

  releaseBedAndDischarge(admissionId, clearedBy = 'Shreyasree Ghosh') {
    const admission = this.state.admissions.find(a => a.id === admissionId);
    if (!admission) return { success: false, message: 'Admission not found' };

    const bed = this.state.beds.find(b => b.admissionId === admissionId || b.bedNumber === admission.bedNumber);
    if (bed) {
      bed.status = 'available';
      bed.patientUid = null;
      bed.patientName = null;
      bed.admissionId = null;
      bed.assignedDate = null;
    }

    admission.status = 'Discharged';
    admission.dischargeDate = new Date().toISOString().replace('T', ' ').substring(0, 16);

    this.logAction(clearedBy, 'receptionist', 'PATIENT_DISCHARGED', `Patient ${admission.patientName} discharged and bed ${admission.bedNumber} released.`);
    this.persist();
    return { success: true, admission, bed };
  }

  // ==========================================
  // BILLING & FINANCIAL CONTROL
  // ==========================================

  getBills() {
    return this.state.bills;
  }

  generateBill(data, generatedBy = 'Shreyasree Ghosh') {
    const billCount = this.state.bills.length + 1;
    const billId = 'bill-2026-' + billCount.toString().padStart(3, '0');
    const billNumber = 'INV-2026-' + billCount.toString().padStart(4, '0');
    const today = new Date().toISOString().substring(0, 10);

    const items = data.items || [];
    const subTotal = items.reduce((sum, it) => sum + (parseFloat(it.amount) || 0), 0);
    const discount = parseFloat(data.discount) || 0;
    const discounted = Math.max(0, subTotal - discount);
    const taxRate = parseFloat(data.taxRate) || this.state.billingConfig.defaultTaxGstPercent || 5;
    const taxAmount = Math.round(discounted * (taxRate / 100));
    const grandTotal = discounted + taxAmount;
    const insuranceCovered = Math.min(grandTotal, parseFloat(data.insuranceCovered) || 0);
    const patientPayable = grandTotal - insuranceCovered;
    const amountPaid = parseFloat(data.amountPaid) || 0;
    const balanceDue = Math.max(0, patientPayable - amountPaid);

    let paymentStatus = 'Unpaid';
    if (amountPaid >= patientPayable && patientPayable > 0) {
      paymentStatus = 'Paid';
    } else if (amountPaid > 0) {
      paymentStatus = 'Partial';
    }

    const newBill = {
      id: billId,
      billNumber,
      patientUid: data.patientUid,
      patientName: data.patientName,
      billType: data.billType || 'Hospital Medical Invoice',
      date: today,
      appointmentId: data.appointmentId || null,
      admissionId: data.admissionId || null,
      items,
      subTotal,
      discount,
      taxRate,
      taxAmount,
      insuranceCovered,
      grandTotal,
      patientPayable,
      amountPaid,
      balanceDue,
      paymentStatus,
      paymentMethod: data.paymentMethod || (amountPaid > 0 ? 'Cash / Reception' : 'Pending'),
      transactionRef: amountPaid > 0 ? ('TXN-' + Math.floor(100000 + Math.random() * 900000)) : 'N/A',
      isDuplicate: false,
      reprintCount: 0
    };

    this.state.bills.unshift(newBill);
    this.logAction(generatedBy, 'receptionist', 'BILL_GENERATED', `Generated invoice ${billNumber} for ${newBill.patientName} (Rs. ${grandTotal})`);
    this.persist();
    return newBill;
  }

  recordPayment(billId, paymentData, processedBy = 'Debolina Dey (Patient Portal)') {
    const bill = this.state.bills.find(b => b.id === billId);
    if (!bill) return { success: false, message: 'Bill not found' };

    const payAmount = parseFloat(paymentData.amount) || bill.balanceDue;
    bill.amountPaid = (bill.amountPaid || 0) + payAmount;
    bill.balanceDue = Math.max(0, bill.patientPayable - bill.amountPaid);
    bill.paymentMethod = paymentData.paymentMethod || 'Online Gateway';
    bill.transactionRef = paymentData.transactionRef || ('PAY-' + Math.floor(1000000 + Math.random() * 9000000));

    if (bill.balanceDue === 0) {
      bill.paymentStatus = 'Paid';
    } else {
      bill.paymentStatus = 'Partial';
    }

    this.logAction(processedBy, 'finance', 'PAYMENT_RECEIVED', `Payment of Rs. ${payAmount} received for invoice ${bill.billNumber} via ${bill.paymentMethod}`);
    this.persist();
    return { success: true, bill };
  }

  getDuplicateBill(billId, requestedBy = 'Debolina Dey') {
    const bill = this.state.bills.find(b => b.id === billId);
    if (!bill) return null;

    // Increment reprint count without creating any new financial transaction
    bill.reprintCount = (bill.reprintCount || 0) + 1;
    this.logAction(requestedBy, 'portal', 'DUPLICATE_BILL_REQUESTED', `Duplicate copy of ${bill.billNumber} generated. (Reprint #${bill.reprintCount}, No ledger change)`);
    this.saveStateToStorage(this.state);

    // Return a clone marked explicitly as duplicate
    return {
      ...JSON.parse(JSON.stringify(bill)),
      isDuplicateCopy: true,
      duplicateGeneratedAt: new Date().toISOString().replace('T', ' ').substring(0, 16),
      reprintNote: 'OFFICIAL DUPLICATE COPY — NO NEW TRANSACTION RECORDED'
    };
  }

  // ==========================================
  // FEEDBACK & ADMINISTRATION
  // ==========================================

  submitFeedback(data, patientName = 'Debolina Dey') {
    const fbId = 'fb-' + Date.now();
    const newFeedback = {
      id: fbId,
      patientUid: data.patientUid,
      patientName: patientName,
      date: new Date().toISOString().substring(0, 10),
      rating: parseInt(data.rating, 10) || 5,
      department: data.department || 'General Medicine',
      doctorName: data.doctorName || 'Dr. Santorshi Ghosh',
      staffRating: parseInt(data.staffRating, 10) || 5,
      cleanlinessRating: parseInt(data.cleanlinessRating, 10) || 5,
      comments: data.comments || '',
      status: 'Pending Admin Review'
    };

    this.state.feedback.unshift(newFeedback);
    this.logAction(patientName, 'patient', 'FEEDBACK_SUBMITTED', `Feedback submitted for ${newFeedback.department} (Rating: ${newFeedback.rating}/5)`);
    this.persist();
    return newFeedback;
  }

  updateBillingConfig(newConfig, adminName = 'Abhinaba Giri') {
    this.state.billingConfig = { ...this.state.billingConfig, ...newConfig };
    this.logAction(adminName, 'admin', 'BILLING_CONFIG_UPDATED', 'Hospital billing rates and GST settings updated.');
    this.persist();
    return this.state.billingConfig;
  }

  addUser(userData, adminName = 'Abhinaba Giri') {
    const newUser = {
      id: 'usr-' + Date.now(),
      username: userData.username.toLowerCase(),
      password: userData.password || '123',
      name: userData.name,
      role: userData.role,
      email: userData.email,
      phone: userData.phone || '',
      department: userData.department || 'General',
      avatar: userData.name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase(),
      status: 'active',
      lastLogin: 'Never'
    };

    this.state.users.push(newUser);
    this.logAction(adminName, 'admin', 'USER_CREATED', `Created user ${newUser.username} (${newUser.role})`);
    this.persist();
    return newUser;
  }
}

// Global Singleton Instance
window.HMIS_STORE = new HMISDataStore();
