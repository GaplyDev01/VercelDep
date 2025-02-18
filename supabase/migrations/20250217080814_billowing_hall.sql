/*
  # Create tweet engagement tables

  1. New Tables
    - `tweet_engagements`
      - `id` (uuid, primary key)
      - `user_id` (uuid, references users)
      - `tweet_id` (text)
      - `liked` (boolean)
      - `reposted` (boolean)
      - `replied` (boolean)
      - `shared` (boolean)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)
    
    - `tweet_replies`
      - `id` (uuid, primary key)
      - `user_id` (uuid, references users)
      - `tweet_id` (text)
      - `content` (text)
      - `created_at` (timestamp)

  2. Security
    - Enable RLS on both tables
    - Add policies for authenticated users to manage their own engagements
*/

-- Create tweet engagements table
CREATE TABLE IF NOT EXISTS tweet_engagements (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES users(id) NOT NULL,
  tweet_id text NOT NULL,
  liked boolean DEFAULT false,
  reposted boolean DEFAULT false,
  replied boolean DEFAULT false,
  shared boolean DEFAULT false,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  UNIQUE(user_id, tweet_id)
);

-- Create tweet replies table
CREATE TABLE IF NOT EXISTS tweet_replies (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES users(id) NOT NULL,
  tweet_id text NOT NULL,
  content text NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE tweet_engagements ENABLE ROW LEVEL SECURITY;
ALTER TABLE tweet_replies ENABLE ROW LEVEL SECURITY;

-- Policies for tweet_engagements
CREATE POLICY "Users can read own engagements"
  ON tweet_engagements
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create own engagements"
  ON tweet_engagements
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own engagements"
  ON tweet_engagements
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id);

-- Policies for tweet_replies
CREATE POLICY "Users can read all replies"
  ON tweet_replies
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Users can create own replies"
  ON tweet_replies
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Create trigger for updated_at
CREATE TRIGGER update_tweet_engagements_updated_at
  BEFORE UPDATE ON tweet_engagements
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();