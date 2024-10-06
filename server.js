import express from 'express';
import cors from 'cors';
import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const port = 3001;

const supabase = createClient(
  process.env.VITE_SUPABASE_URL,
  process.env.VITE_SUPABASE_ANON_KEY
);

app.use(cors());
app.use(express.json());

app.post('/api/stories', async (req, res) => {
  const { title, content, country, description, coverImage } = req.body;

  const { data, error } = await supabase
    .from('stories')
    .insert([{ title, content, country, description, cover_image: coverImage }])
    .select();

  if (error) {
    return res.status(500).json({ error: error.message });
  }

  res.status(201).json(data[0]);
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});