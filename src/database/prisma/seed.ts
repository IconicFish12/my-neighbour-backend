import 'dotenv/config';
import { PrismaPg } from '@prisma/adapter-pg';
import {
  PrismaClient,
  UserRole,
  EmployeeRole,
  Gender,
  UnitStatus,
  PaymentMethod,
  MaintenanceCategory,
  MaintenanceStatus,
  PaymentType,
  ContactRole,
  ComplaintStatus,
  ResidentStatus,
  RegistrationStatus,
  RegistrationMethod,
  DocumentType,
  ApprovalStatus,
} from '../generated/prisma/client.ts';
import * as bcrypt from 'bcrypt';

const connectionString =
  process.env.DATABASE_URL_SUPABASE || process.env.DATABASE_URL;

if (!connectionString) {
  console.error(
    '❌ Error: DATABASE_URL or DATABASE_URL_SUPABASE environment variable is not defined.',
  );
  process.exit(1);
}

const adapter = new PrismaPg({ connectionString });
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log('🌱 Starting database seeding...');

  // 1. Clean existing data in reverse relation order
  console.log('🧹 Cleaning old database records...');
  await prisma.forumComments.deleteMany();
  await prisma.forumPosts.deleteMany();
  await prisma.postTags.deleteMany();
  await prisma.payments.deleteMany();
  await prisma.bills.deleteMany();
  await prisma.complaints.deleteMany();
  await prisma.securityReports.deleteMany();
  await prisma.announcements.deleteMany();
  await prisma.residentDocuments.deleteMany();
  await prisma.familyApprovals.deleteMany();
  await prisma.familyCodes.deleteMany();
  await prisma.residents.deleteMany();
  await prisma.employees.deleteMany();
  await prisma.contacts.deleteMany();
  await prisma.units.deleteMany();
  await prisma.users.deleteMany();

  const defaultPassword = await bcrypt.hash('Password123!', 10);

  // 2. Create Units (10 units)
  console.log('🏢 Seeding Residential Units...');
  const unitData = [
    {
      unitNumber: 'A-101',
      buildingName: 'Griya Asri Block A',
      floorNumber: 1,
      numberOfRooms: 3,
      priceSale: 450000000,
      squareFootage: 72,
      location: 'Blok A No. 1',
      status: UnitStatus.OCCUPIED,
    },
    {
      unitNumber: 'A-102',
      buildingName: 'Griya Asri Block A',
      floorNumber: 1,
      numberOfRooms: 3,
      priceSale: 450000000,
      squareFootage: 72,
      location: 'Blok A No. 2',
      status: UnitStatus.OCCUPIED,
    },
    {
      unitNumber: 'A-103',
      buildingName: 'Griya Asri Block A',
      floorNumber: 1,
      numberOfRooms: 4,
      priceSale: 550000000,
      squareFootage: 90,
      location: 'Blok A No. 3',
      status: UnitStatus.OCCUPIED,
    },
    {
      unitNumber: 'A-104',
      buildingName: 'Griya Asri Block A',
      floorNumber: 1,
      numberOfRooms: 3,
      priceSale: 450000000,
      squareFootage: 72,
      location: 'Blok A No. 4',
      status: UnitStatus.AVAILABLE,
    },
    {
      unitNumber: 'A-105',
      buildingName: 'Griya Asri Block A',
      floorNumber: 1,
      numberOfRooms: 5,
      priceSale: 750000000,
      squareFootage: 120,
      location: 'Blok A No. 5',
      status: UnitStatus.MAINTENANCE,
    },
    {
      unitNumber: 'B-201',
      buildingName: 'Griya Asri Block B',
      floorNumber: 2,
      numberOfRooms: 3,
      priceSale: 480000000,
      squareFootage: 75,
      location: 'Blok B No. 1',
      status: UnitStatus.OCCUPIED,
    },
    {
      unitNumber: 'B-202',
      buildingName: 'Griya Asri Block B',
      floorNumber: 2,
      numberOfRooms: 3,
      priceSale: 480000000,
      squareFootage: 75,
      location: 'Blok B No. 2',
      status: UnitStatus.AVAILABLE,
    },
    {
      unitNumber: 'B-203',
      buildingName: 'Griya Asri Block B',
      floorNumber: 2,
      numberOfRooms: 4,
      priceSale: 600000000,
      squareFootage: 95,
      location: 'Blok B No. 3',
      status: UnitStatus.VACANT,
    },
    {
      unitNumber: 'B-204',
      buildingName: 'Griya Asri Block B',
      floorNumber: 2,
      numberOfRooms: 3,
      priceSale: 480000000,
      squareFootage: 75,
      location: 'Blok B No. 4',
      status: UnitStatus.AVAILABLE,
    },
    {
      unitNumber: 'B-205',
      buildingName: 'Griya Asri Block B',
      floorNumber: 2,
      numberOfRooms: 4,
      priceSale: 620000000,
      squareFootage: 100,
      location: 'Blok B No. 5',
      status: UnitStatus.OCCUPIED,
    },
  ];

  const units = await Promise.all(
    unitData.map((u) => prisma.units.create({ data: u })),
  );

  // 3. Create Users & Employees
  console.log('👨‍💼 Seeding Employee Users...');
  const adminUser = await prisma.users.create({
    data: {
      fullName: 'Budi Santoso',
      firstName: 'Budi',
      lastName: 'Santoso',
      username: 'admin_budi',
      primaryEmail: 'admin.budi@neighbour.com',
      contactNumber: '081234567890',
      password: defaultPassword,
      role: UserRole.EMPLOYEE,
      gender: Gender.MALE,
    },
  });

  const adminEmployee = await prisma.employees.create({
    data: {
      userId: adminUser.id,
      employeeNumberId: 'EMP-001',
      hireDate: new Date('2023-01-15'),
      employeePosition: EmployeeRole.ADMIN,
      workingHours: 40,
      salary: 8500000,
      bonus: 1000000,
    },
  });

  const managerUser = await prisma.users.create({
    data: {
      fullName: 'Siti Rahma',
      firstName: 'Siti',
      lastName: 'Rahma',
      username: 'manager_siti',
      primaryEmail: 'manager.siti@neighbour.com',
      contactNumber: '081234567891',
      password: defaultPassword,
      role: UserRole.EMPLOYEE,
      gender: Gender.FEMALE,
    },
  });

  const managerEmployee = await prisma.employees.create({
    data: {
      userId: managerUser.id,
      employeeNumberId: 'EMP-002',
      hireDate: new Date('2023-03-01'),
      employeePosition: EmployeeRole.PROPERTY_MANAGER,
      workingHours: 40,
      salary: 10000000,
      bonus: 1500000,
    },
  });

  const techUser = await prisma.users.create({
    data: {
      fullName: 'Joko Widodo',
      firstName: 'Joko',
      lastName: 'Widodo',
      username: 'tech_joko',
      primaryEmail: 'tech.joko@neighbour.com',
      contactNumber: '081234567892',
      password: defaultPassword,
      role: UserRole.EMPLOYEE,
      gender: Gender.MALE,
    },
  });

  const techEmployee = await prisma.employees.create({
    data: {
      userId: techUser.id,
      employeeNumberId: 'EMP-003',
      hireDate: new Date('2023-05-10'),
      employeePosition: EmployeeRole.TECHNICIAN,
      workingHours: 40,
      salary: 6000000,
      bonus: 500000,
    },
  });

  const secUser = await prisma.users.create({
    data: {
      fullName: 'Agus Pratama',
      firstName: 'Agus',
      lastName: 'Pratama',
      username: 'sec_agus',
      primaryEmail: 'sec.agus@neighbour.com',
      contactNumber: '081234567893',
      password: defaultPassword,
      role: UserRole.EMPLOYEE,
      gender: Gender.MALE,
    },
  });

  const secEmployee = await prisma.employees.create({
    data: {
      userId: secUser.id,
      employeeNumberId: 'EMP-004',
      hireDate: new Date('2023-06-01'),
      employeePosition: EmployeeRole.SECURITY,
      workingHours: 48,
      salary: 5500000,
      bonus: 400000,
    },
  });

  // 4. Create Residents & Families
  console.log('🏡 Seeding Resident Users & Families...');

  // Head 1 (Unit A-101)
  const headUser1 = await prisma.users.create({
    data: {
      fullName: 'Ahmad Dahlan',
      firstName: 'Ahmad',
      lastName: 'Dahlan',
      username: 'ahmad_dahlan',
      primaryEmail: 'ahmad.dahlan@gmail.com',
      contactNumber: '081399887766',
      password: defaultPassword,
      role: UserRole.RESIDENT,
      gender: Gender.MALE,
      dateOfBirth: new Date('1985-04-12'),
    },
  });

  const headResident1 = await prisma.residents.create({
    data: {
      userId: headUser1.id,
      unitId: units[0]!.id,
      emergencyContactName: 'Fatimah (Istri)',
      emergencyContactNumber: '081399887767',
      movedInDate: new Date('2022-01-10'),
      residentStatus: ResidentStatus.HEAD_HOUSE_HOLD,
      registrationStatus: RegistrationStatus.APPROVED,
      registrationMethod: RegistrationMethod.USER_DRIVEN,
      kprPaymentAmount: 3500000,
      kprDueDate: new Date('2026-08-10'),
      isKprPaid: true,
    },
  });

  const familyCode1 = await prisma.familyCodes.create({
    data: {
      code: 'FAM-AHMAD101',
      headOfHousehold: headResident1.id,
      unitId: units[0]!.id,
      maxMembers: 6,
    },
  });

  // Family Member 1 (Under Head 1)
  const famUser1 = await prisma.users.create({
    data: {
      fullName: 'Fatimah Zahra',
      firstName: 'Fatimah',
      lastName: 'Zahra',
      username: 'fatimah_z',
      primaryEmail: 'fatimah.zahra@gmail.com',
      contactNumber: '081399887767',
      password: defaultPassword,
      role: UserRole.RESIDENT,
      gender: Gender.FEMALE,
      dateOfBirth: new Date('1988-08-20'),
    },
  });

  const famResident1 = await prisma.residents.create({
    data: {
      userId: famUser1.id,
      unitId: units[0]!.id,
      familyCode: familyCode1.code,
      emergencyContactName: 'Ahmad Dahlan',
      emergencyContactNumber: '081399887766',
      movedInDate: new Date('2022-01-10'),
      residentStatus: ResidentStatus.FAMILY_MEMBERS,
      registrationStatus: RegistrationStatus.APPROVED,
      approvedByHeadOfHousehold: headResident1.id,
      approvalDate: new Date('2022-01-12'),
    },
  });

  // Head 2 (Unit A-102)
  const headUser2 = await prisma.users.create({
    data: {
      fullName: 'Hendra Wijaya',
      firstName: 'Hendra',
      lastName: 'Wijaya',
      username: 'hendra_w',
      primaryEmail: 'hendra.wijaya@yahoo.com',
      contactNumber: '081511223344',
      password: defaultPassword,
      role: UserRole.RESIDENT,
      gender: Gender.MALE,
      dateOfBirth: new Date('1990-11-05'),
    },
  });

  const headResident2 = await prisma.residents.create({
    data: {
      userId: headUser2.id,
      unitId: units[1]!.id,
      emergencyContactName: 'Dewi Wijaya',
      emergencyContactNumber: '081511223345',
      movedInDate: new Date('2022-06-15'),
      residentStatus: ResidentStatus.HEAD_HOUSE_HOLD,
      registrationStatus: RegistrationStatus.APPROVED,
      registrationMethod: RegistrationMethod.ADMIN_DRIVEN,
      approvedBy: adminEmployee.id,
      approvalDate: new Date('2022-06-15'),
      kprPaymentAmount: 4200000,
      kprDueDate: new Date('2026-08-15'),
      isKprPaid: false,
    },
  });

  const familyCode2 = await prisma.familyCodes.create({
    data: {
      code: 'FAM-HENDRA102',
      headOfHousehold: headResident2.id,
      unitId: units[1]!.id,
      maxMembers: 5,
    },
  });

  // Pending Family Member (Awaiting Head 2 approval)
  const pendingUser = await prisma.users.create({
    data: {
      fullName: 'Kevin Wijaya',
      firstName: 'Kevin',
      lastName: 'Wijaya',
      username: 'kevin_w',
      primaryEmail: 'kevin.wijaya@gmail.com',
      contactNumber: '081511223346',
      password: defaultPassword,
      role: UserRole.RESIDENT,
      gender: Gender.MALE,
      dateOfBirth: new Date('2005-02-14'),
    },
  });

  const pendingResident = await prisma.residents.create({
    data: {
      userId: pendingUser.id,
      unitId: units[1]!.id,
      familyCode: familyCode2.code,
      movedInDate: new Date('2024-01-01'),
      residentStatus: ResidentStatus.FAMILY_MEMBERS,
      registrationStatus: RegistrationStatus.AWAITING_FAMILY_APPROVAL,
      pendingApproval: true,
    },
  });

  await prisma.familyApprovals.create({
    data: {
      familyMemberId: pendingResident.id,
      headOfHouseholdId: headResident2.id,
      status: ApprovalStatus.PENDING,
      notes: 'Permintaan bergabung dengan keluarga Bapak Hendra Wijaya',
    },
  });

  // Head 3 (Unit B-205)
  const headUser3 = await prisma.users.create({
    data: {
      fullName: 'Rina Kusuma',
      firstName: 'Rina',
      lastName: 'Kusuma',
      username: 'rina_kusuma',
      primaryEmail: 'rina.kusuma@hotmail.com',
      contactNumber: '081766554433',
      password: defaultPassword,
      role: UserRole.RESIDENT,
      gender: Gender.FEMALE,
      dateOfBirth: new Date('1992-09-30'),
    },
  });

  const headResident3 = await prisma.residents.create({
    data: {
      userId: headUser3.id,
      unitId: units[9]!.id,
      emergencyContactName: 'Bambang Kusuma',
      emergencyContactNumber: '081766554434',
      movedInDate: new Date('2023-02-01'),
      residentStatus: ResidentStatus.HEAD_HOUSE_HOLD,
      registrationStatus: RegistrationStatus.APPROVED,
    },
  });

  // 5. Resident Documents
  console.log('📑 Seeding Resident Documents...');
  await prisma.residentDocuments.createMany({
    data: [
      {
        residentId: headResident1.id,
        documentType: DocumentType.ID_CARD,
        fileName: 'ktp_ahmad.pdf',
        fileUrl: 'documents/pdf/ktp_ahmad.pdf',
        fileSize: 1048576,
        isVerified: true,
        verifiedBy: adminEmployee.id,
        verifiedAt: new Date('2022-01-11'),
      },
      {
        residentId: headResident1.id,
        documentType: DocumentType.FAMILY_CARD,
        fileName: 'kk_ahmad.pdf',
        fileUrl: 'documents/pdf/kk_ahmad.pdf',
        fileSize: 2097152,
        isVerified: true,
        verifiedBy: adminEmployee.id,
        verifiedAt: new Date('2022-01-11'),
      },
      {
        residentId: headResident2.id,
        documentType: DocumentType.ID_CARD,
        fileName: 'ktp_hendra.jpg',
        fileUrl: 'images/ktp_hendra.jpg',
        fileSize: 524288,
        isVerified: true,
        verifiedBy: adminEmployee.id,
        verifiedAt: new Date('2022-06-15'),
      },
      {
        residentId: headResident2.id,
        documentType: DocumentType.KPR_PROOF,
        fileName: 'bukti_kpr_hendra.pdf',
        fileUrl: 'documents/pdf/kpr_hendra.pdf',
        fileSize: 1572864,
        isVerified: true,
      },
      {
        residentId: headResident3.id,
        documentType: DocumentType.ID_CARD,
        fileName: 'ktp_rina.pdf',
        fileUrl: 'documents/pdf/ktp_rina.pdf',
        fileSize: 819200,
        isVerified: false,
      },
    ],
  });

  // 6. Bills & Payments
  console.log('💳 Seeding Bills & Payments...');
  const bill1 = await prisma.bills.create({
    data: {
      amount: 350000,
      type: PaymentType.IURAN_BULANAN,
      dueDate: new Date('2026-07-10'),
      isPaid: true,
      unitId: units[0]!.id,
      employeeId: adminEmployee.id,
    },
  });

  await prisma.payments.create({
    data: {
      amount: 350000,
      residentId: headResident1.id,
      unitId: units[0]!.id,
      processedByEmployeeId: adminEmployee.id,
      billId: bill1.id,
      paymentDate: new Date('2026-07-05'),
    },
  });

  const bill2 = await prisma.bills.create({
    data: {
      amount: 350000,
      type: PaymentType.IURAN_BULANAN,
      dueDate: new Date('2026-07-10'),
      isPaid: true,
      unitId: units[1]!.id,
      employeeId: adminEmployee.id,
    },
  });

  await prisma.payments.create({
    data: {
      amount: 350000,
      residentId: headResident2.id,
      unitId: units[1]!.id,
      processedByEmployeeId: managerEmployee.id,
      billId: bill2.id,
      paymentDate: new Date('2026-07-08'),
    },
  });

  const bill3 = await prisma.bills.create({
    data: {
      amount: 4200000,
      type: PaymentType.CICILAN_KPR,
      dueDate: new Date('2026-08-10'),
      isPaid: false,
      unitId: units[1]!.id,
      employeeId: managerEmployee.id,
    },
  });

  const bill4 = await prisma.bills.create({
    data: {
      amount: 350000,
      type: PaymentType.IURAN_BULANAN,
      dueDate: new Date('2026-08-10'),
      isPaid: false,
      unitId: units[9]!.id,
      employeeId: adminEmployee.id,
    },
  });

  // 7. Complaints
  console.log('🛠️ Seeding Resident Complaints...');
  await prisma.complaints.createMany({
    data: [
      {
        title: 'Pipa Air Bocor di Dapur',
        description:
          'Pipa utama di bawah sink dapur bocor deras sejak pagi ini.',
        category: MaintenanceCategory.HIGH,
        status: ComplaintStatus.IN_PROGRESS,
        residentId: headResident1.id,
        employeeId: techEmployee.id,
        unitId: units[0]!.id,
        submittedAt: new Date('2026-07-28T08:30:00'),
      },
      {
        title: 'Lampu Jalan Blok A Mati',
        description:
          'Lampu penerangan jalan di depan rumah A-102 mati total saat malam.',
        category: MaintenanceCategory.MEDIUM,
        status: ComplaintStatus.VERIFIED,
        residentId: headResident2.id,
        employeeId: techEmployee.id,
        unitId: units[1]!.id,
        submittedAt: new Date('2026-07-27T19:00:00'),
      },
      {
        title: 'Genangan Air di Garasi',
        description: 'Drainase di depan garasi tersumbat daun kering.',
        category: MaintenanceCategory.LOW,
        status: ComplaintStatus.COMPLETED,
        residentId: headResident3.id,
        employeeId: techEmployee.id,
        unitId: units[9]!.id,
        submittedAt: new Date('2026-07-20T10:00:00'),
        resolvedAt: new Date('2026-07-21T14:00:00'),
        resolutionDetails: 'Pembersihan saluran drainase dari sampah daun.',
      },
      {
        title: 'Bau Sampah Menyengat',
        description:
          'Tumpukan sampah di tempat penampungan sementara belum diangkut 3 hari.',
        category: MaintenanceCategory.URGENT,
        status: ComplaintStatus.NEW,
        residentId: headResident1.id,
        unitId: units[0]!.id,
        submittedAt: new Date('2026-07-29T11:15:00'),
      },
    ],
  });

  // 8. Announcements
  console.log('📢 Seeding Announcements...');
  await prisma.announcements.createMany({
    data: [
      {
        title: 'Kerja Bakti Lingkungan Perumahan',
        content:
          'Diimbau kepada seluruh warga untuk mengikuti kerja bakti massal pada hari Minggu, 2 Agustus 2026 pukul 07:00 WIB di Lapangan Utama.',
        employeeId: managerEmployee.id,
        publishDate: new Date('2026-07-25'),
      },
      {
        title: 'Pemeliharaan Jaringan Listrik PLN',
        content:
          'Akan dilakukan pemadaman listrik sementara untuk perbaikan pemeliharaan jaringan pada hari Kamis dari pukul 09:00 - 12:00 WIB.',
        employeeId: techEmployee.id,
        publishDate: new Date('2026-07-26'),
        expiryDate: new Date('2026-07-31'),
      },
      {
        title: 'Penguatan Keamanan Pos Utama',
        content:
          'Setiap tamu wajib menyerahkan kartu identitas (KTP/SIM) di pos sekuriti gerbang utama demi keamanan bersama.',
        employeeId: secEmployee.id,
        publishDate: new Date('2026-07-28'),
      },
    ],
  });

  // 9. Forum Posts, Tags & Comments
  console.log('💬 Seeding Forum Discussions...');
  const tag1 = await prisma.postTags.create({ data: { tagName: 'Fasilitas' } });
  const tag2 = await prisma.postTags.create({ data: { tagName: 'Kegiatan' } });
  const tag3 = await prisma.postTags.create({ data: { tagName: 'Keamanan' } });

  const post1 = await prisma.forumPosts.create({
    data: {
      title: 'Usulan Penambahan CCTV di Area Taman Anak',
      content:
        'Halo tetangga sekalian, bagaimana jika kita mengusulkan penambahan unit CCTV di area bermain anak-anak demi keamanan buah hati kita?',
      authorRole: UserRole.RESIDENT,
      userId: headUser1.id,
      tags: { connect: [{ id: tag1.id }, { id: tag3.id }] },
    },
  });

  await prisma.forumComments.createMany({
    data: [
      {
        content: 'Sangat setuju Pak Ahmad! Keamanan anak-anak nomor satu.',
        userId: headUser2.id,
        postId: post1.id,
      },
      {
        content:
          'Saya dukung usulannya, nanti bisa kita bahas di rapat warga bulanan.',
        userId: managerUser.id,
        postId: post1.id,
      },
    ],
  });

  const post2 = await prisma.forumPosts.create({
    data: {
      title: 'Rencana Olahraga Bersama Setiap Sabtu Pagi',
      content:
        'Mari hidup sehat! Siapa yang berminat gabung senam dan jalan sehat tiap Sabtu jam 06:00 WIB?',
      authorRole: UserRole.RESIDENT,
      userId: headUser3.id,
      tags: { connect: [{ id: tag2.id }] },
    },
  });

  await prisma.forumComments.create({
    data: {
      content: 'Wah menarik sekali Bu Rina, saya siap ikutan!',
      userId: famUser1.id,
      postId: post2.id,
    },
  });

  // 10. Important Contacts
  console.log('📞 Seeding Important Contacts...');
  await prisma.contacts.createMany({
    data: [
      {
        name: 'Pos Sekuriti Gerbang Utama',
        role: ContactRole.EMPLOYEE,
        phoneNumber: '021-5550101',
        email: 'security@neighbour.com',
      },
      {
        name: 'Kantor Pengelola Komplek',
        role: ContactRole.EMPLOYEE,
        phoneNumber: '021-5550102',
        email: 'office@neighbour.com',
      },
      {
        name: 'Polsek Terdekat',
        role: ContactRole.EMERGENCY_SERVICES,
        phoneNumber: '110',
        email: 'polsek@polri.go.id',
      },
      {
        name: 'Layanan Ambulans & RSUD',
        role: ContactRole.EMERGENCY_SERVICES,
        phoneNumber: '118',
        email: 'emergency@rsud.go.id',
      },
      {
        name: 'Pemadam Kebakaran',
        role: ContactRole.EMERGENCY_SERVICES,
        phoneNumber: '113',
        email: 'damkar@pemda.go.id',
      },
    ],
  });

  // 11. Security Reports
  console.log('🛡️ Seeding Security Reports...');
  await prisma.securityReports.createMany({
    data: [
      {
        title: 'Patroli Malam Area Blok A & B',
        description:
          'Patroli keliling malam pukul 02:00 WIB. Kondisi aman, pagar portir terkunci rapat.',
        location: 'Blok A dan Blok B',
        incidentDate: new Date('2026-07-28T02:00:00'),
        status: MaintenanceStatus.COMPLETED,
        isPublished: true,
        employeeId: secEmployee.id,
      },
      {
        title: 'Laporan Penemuan Kunci Rumah Tercecer',
        description:
          'Ditemukan seikat kunci rumah di dekat area pos sekuriti utama. Pemilik dapat mengambilnya di pos.',
        location: 'Pos Utama',
        incidentDate: new Date('2026-07-29T16:30:00'),
        status: MaintenanceStatus.NEW,
        isPublished: true,
        employeeId: secEmployee.id,
      },
    ],
  });

  console.log(
    '✅ Database Seeding Completed Successfully! (Total 70+ records created across all models)',
  );
}

main()
  .catch((e) => {
    console.error('❌ Seeding Failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
