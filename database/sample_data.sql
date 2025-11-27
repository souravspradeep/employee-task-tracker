INSERT INTO employees (name, email, department, position) VALUES
('John Doe', 'john@company.com', 'Engineering', 'Software Developer'),
('Jane Smith', 'jane@company.com', 'Marketing', 'Marketing Manager'),
('Bob Johnson', 'bob@company.com', 'Engineering', 'Senior Developer'),
('Alice Williams', 'alice@company.com', 'HR', 'HR Specialist');

INSERT INTO tasks (title, description, status, priority, employee_id, due_date) VALUES
('Fix login bug', 'Users cannot log in with special characters', 'in_progress', 'high', 1, '2025-12-05'),
('Create marketing campaign', 'Q4 social media campaign', 'pending', 'medium', 2, '2025-12-15'),
('Code review', 'Review pull request #234', 'completed', 'low', 3, '2025-11-25'),
('Update employee handbook', 'Add remote work policy', 'pending', 'medium', 4, '2025-12-10');