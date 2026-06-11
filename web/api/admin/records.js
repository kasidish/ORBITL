import { createClient } from '@supabase/supabase-js';
import { verifyToken } from './login.js';

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseServiceRole = process.env.SUPABASE_SERVICE_ROLE;
const adminSecret = process.env.ADMIN_SECRET;

const supabase = createClient(supabaseUrl, supabaseServiceRole);

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    res.setHeader('Allow', 'GET');
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // Accept either the admin header (for tools) or an HttpOnly cookie set by /api/admin/login
  const providedHeader = req.headers['x-admin-secret'] || req.headers['x_admin_secret'];
  const cookieHeader = req.headers.cookie || '';
  const cookieMatch = cookieHeader.match(/(?:^|; )admin_token=([^;]+)/);
  const cookieToken = cookieMatch ? cookieMatch[1] : null;

  let authorized = false;
  if (adminSecret && providedHeader === adminSecret) authorized = true;
  if (!authorized && adminSecret && cookieToken && verifyToken(adminSecret, cookieToken)) authorized = true;

  if (!authorized) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  try {
    const { data, error } = await supabase
      .from('contact_messages')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;
    return res.status(200).json(data);
  } catch (err) {
    return res.status(500).json({ error: err.message || err });
  }
}
