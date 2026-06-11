import { createClient } from '@supabase/supabase-js';
import { verifyToken } from './login.js';

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseServiceRole = process.env.SUPABASE_SERVICE_ROLE;
const adminSecret = process.env.ADMIN_SECRET;

const supabase = createClient(supabaseUrl, supabaseServiceRole);

function toCsv(rows) {
  if (!rows || rows.length === 0) return '';
  const keys = Object.keys(rows[0]);
  const escape = (v) => {
    if (v === null || v === undefined) return '';
    const s = String(v);
    if (/[",\n\r]/.test(s)) return '"' + s.replace(/"/g, '""') + '"';
    return s;
  };
  const header = keys.join(',');
  const lines = rows.map(r => keys.map(k => escape(r[k])).join(','));
  return [header, ...lines].join('\n');
}

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    res.setHeader('Allow', 'GET');
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const providedHeader = req.headers['x-admin-secret'] || req.headers['x_admin_secret'];
  const cookieHeader = req.headers.cookie || '';
  const cookieMatch = cookieHeader.match(/(?:^|; )admin_token=([^;]+)/);
  const cookieToken = cookieMatch ? cookieMatch[1] : null;

  let authorized = false;
  if (adminSecret && providedHeader === adminSecret) authorized = true;
  if (!authorized && adminSecret && cookieToken && verifyToken(adminSecret, cookieToken)) authorized = true;
  if (!authorized) return res.status(401).json({ error: 'Unauthorized' });

  try {
    const { data, error } = await supabase.from('contact_messages').select('*').order('created_at', { ascending: false }).limit(1000);
    if (error) throw error;
    const csv = toCsv(data);
    res.setHeader('Content-Type', 'text/csv; charset=utf-8');
    res.setHeader('Content-Disposition', 'attachment; filename="contact_messages.csv"');
    return res.status(200).send(csv);
  } catch (err) {
    return res.status(500).json({ error: err.message || String(err) });
  }
}
