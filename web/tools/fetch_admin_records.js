#!/usr/bin/env node
// Usage: create web/.env.local with SUPABASE_SERVICE_ROLE and VITE_SUPABASE_URL
// Then run: node -r dotenv/config web/tools/fetch_admin_records.js

import 'dotenv/config';
import { createClient } from '@supabase/supabase-js';

const url = process.env.VITE_SUPABASE_URL;
const serviceRole = process.env.SUPABASE_SERVICE_ROLE;

if (!url || !serviceRole) {
  console.error('Missing VITE_SUPABASE_URL or SUPABASE_SERVICE_ROLE in environment.');
  process.exit(1);
}

const supabase = createClient(url, serviceRole);

async function main() {
  try {
    const { data, error } = await supabase
      .from('contact_messages')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(50);

    if (error) throw error;
    console.log('Fetched', data.length, 'records');
    console.dir(data, { depth: 2, colors: true });
  } catch (err) {
    console.error('Error fetching records:', err.message || err);
    process.exitCode = 2;
  }
}

main();
