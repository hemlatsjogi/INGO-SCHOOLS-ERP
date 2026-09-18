-- INGO-SCHOOLS-ERP Seed Data (PostgreSQL)

-- 1. Insert Initial School
INSERT INTO schools (id, code, name, address, contact_email, contact_phone, website_url, is_active)
VALUES (
    'a0000000-0000-0000-0000-000000000001',
    'INGO-MAIN-01',
    'INGO International Academy',
    '45 Innovation Way, Education District, Metro City',
    'contact@ingointernational.edu',
    '+1 (800) 555-0199',
    'https://ingoschools.com',
    TRUE
) ON CONFLICT (code) DO NOTHING;

-- 2. Insert Super Admin & Demo Teacher
INSERT INTO users (id, school_id, email, password_hash, full_name, role, phone_number, is_active)
VALUES 
(
    'b0000000-0000-0000-0000-000000000001',
    'a0000000-0000-0000-0000-000000000001',
    'admin@ingoschools.com',
    '$2a$10$wT8Kz54hPekQkKkY6v7RreS5j5v5N5v5z5j5v5N5v5z5j5v5N5v5z', -- bcrypt hash of Admin@123456
    'Dr. Sarah Jenkins',
    'SUPER_ADMIN',
    '+1 (555) 012-3456',
    TRUE
),
(
    'b0000000-0000-0000-0000-000000000002',
    'a0000000-0000-0000-0000-000000000001',
    'teacher@ingoschools.com',
    '$2a$10$wT8Kz54hPekQkKkY6v7RreS5j5v5N5v5z5j5v5N5v5z5j5v5N5v5z',
    'Prof. Alan Vance',
    'TEACHER',
    '+1 (555) 012-7890',
    TRUE
) ON CONFLICT (email) DO NOTHING;

-- 3. Insert Academic Year
INSERT INTO academic_years (id, school_id, name, start_date, end_date, is_current)
VALUES (
    'c0000000-0000-0000-0000-000000000001',
    'a0000000-0000-0000-0000-000000000001',
    '2026-2027 Academic Session',
    '2026-08-01',
    '2027-05-31',
    TRUE
) ON CONFLICT DO NOTHING;

-- 4. Insert Classes
INSERT INTO classes (id, school_id, academic_year_id, name, section, room_number, capacity, class_teacher_id)
VALUES 
(
    'd0000000-0000-0000-0000-000000000001',
    'a0000000-0000-0000-0000-000000000001',
    'c0000000-0000-0000-0000-000000000001',
    'Grade 4',
    'A',
    'Room 102',
    30,
    'b0000000-0000-0000-0000-000000000002'
),
(
    'd0000000-0000-0000-0000-000000000002',
    'a0000000-0000-0000-0000-000000000001',
    'c0000000-0000-0000-0000-000000000001',
    'Grade 5',
    'B',
    'Room 105',
    30,
    'b0000000-0000-0000-0000-000000000002'
) ON CONFLICT DO NOTHING;

-- 5. Insert Sample Demo Inquiry
INSERT INTO inquiries (name, email, phone, school_name, student_count_range, message, inquiry_type, status)
VALUES (
    'Principal Robert Hayes',
    'robert.hayes@oakridge.edu',
    '+1 (555) 987-6543',
    'Oakridge Preparatory School',
    '500-1000',
    'Interested in cloud attendance, automated grade reporting, and student fee portal.',
    'DEMO_REQUEST',
    'PENDING'
);
