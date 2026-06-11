import { createClient } from '@supabase/supabase-js';

const url = process.env.VITE_SUPABASE_URL;
const serviceRole = process.env.SUPABASE_SERVICE_ROLE;

if (!url || !serviceRole) {
  console.error('Missing VITE_SUPABASE_URL or SUPABASE_SERVICE_ROLE in env');
  process.exit(1);
}

const supabase = createClient(url, serviceRole);

async function run() {
  try {
    const payload = {
      full_name: 'Node Test Member',
      email: 'node-test@example.com',
      major: 'Test Major',
      year_of_study: '3',
      area_of_interest: 'Payload'
    };
    const { data, error } = await supabase.from('members').insert([payload]).select();
    if (error) throw error;
    console.log('Inserted:', data);
  } catch (err) {
    console.error('Insert error:', err.message || err);
    process.exit(1);
  }
}

run();
