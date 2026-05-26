CREATE TABLE letters (
  id SERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  filename TEXT NOT NULL,
  file_url TEXT NOT NULL,
  subject TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);