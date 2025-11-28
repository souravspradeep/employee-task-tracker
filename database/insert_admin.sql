-- Insert admin user with hashed password
-- Email: admin@gmail.com
-- Password: admin@123 (hashed with bcrypt)
INSERT INTO users (email, password, role) 
VALUES ('admin@gmail.com', '$2a$10$rVQ87TeEiAZT9/3ng1L4NO9Vj3MaNV9rxUNV93ea5ed8urUqoQDJG', 'admin')
ON CONFLICT (email) DO UPDATE 
SET password = '$2a$10$rVQ87TeEiAZT9/3ng1L4NO9Vj3MaNV9rxUNV93ea5ed8urUqoQDJG', role = 'admin';

-- Create admin employee profile
INSERT INTO employees (user_id, name, email, department, position)
SELECT id, 'System Administrator', 'admin@gmail.com', 'Administration', 'Admin'
FROM users WHERE email = 'admin@gmail.com'
ON CONFLICT (email) DO NOTHING;
