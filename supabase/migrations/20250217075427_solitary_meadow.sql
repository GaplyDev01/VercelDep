/*
  # Initial Schema Setup for TradesXBT

  1. New Tables
    - `users`
      - `id` (uuid, primary key)
      - `email` (text, unique)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)
    - `trades`
      - `id` (uuid, primary key)
      - `user_id` (uuid, foreign key)
      - `symbol` (text)
      - `entry_price` (numeric)
      - `exit_price` (numeric)
      - `position_size` (numeric)
      - `direction` (text)
      - `status` (text)
      - `pnl` (numeric)
      - `created_at` (timestamp)
      - `closed_at` (timestamp)
    - `chat_messages`
      - `id` (uuid, primary key)
      - `user_id` (uuid, foreign key)
      - `content` (text)
      - `created_at` (timestamp)

  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users to access their own data
*/

-- Create users table
CREATE TABLE IF NOT EXISTS users (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text UNIQUE NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create trades table
CREATE TABLE IF NOT EXISTS trades (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES users(id) NOT NULL,
  symbol text NOT NULL,
  entry_price numeric NOT NULL,
  exit_price numeric,
  position_size numeric NOT NULL,
  direction text NOT NULL CHECK (direction IN ('long', 'short')),
  status text NOT NULL CHECK (status IN ('open', 'closed')) DEFAULT 'open',
  pnl numeric,
  created_at timestamptz DEFAULT now(),
  closed_at timestamptz
);

-- Create chat messages table
CREATE TABLE IF NOT EXISTS chat_messages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES users(id) NOT NULL,
  content text NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE trades ENABLE ROW LEVEL SECURITY;
ALTER TABLE chat_messages ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Users can read own data"
  ON users
  FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Users can read own trades"
  ON trades
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create own trades"
  ON trades
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own trades"
  ON trades
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can read own messages"
  ON chat_messages
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create own messages"
  ON chat_messages
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);