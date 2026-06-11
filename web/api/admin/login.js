import crypto from 'crypto';

const adminSecret = process.env.ADMIN_SECRET;

function makeToken(secret, expiresAt) {
  const h = crypto.createHmac('sha256', secret).update(String(expiresAt)).digest('hex');
  return `${expiresAt}.${h}`;
}

function verifyToken(secret, token) {
  if (!token) return false;
  const parts = token.split('.');
  if (parts.length !== 2) return false;
  const [expiresAtStr, mac] = parts;
  const expiresAt = parseInt(expiresAtStr, 10);
  if (Number.isNaN(expiresAt) || Date.now() > expiresAt) return false;
  const expected = crypto.createHmac('sha256', secret).update(String(expiresAt)).digest('hex');
  return crypto.timingSafeEqual(Buffer.from(mac, 'hex'), Buffer.from(expected, 'hex'));
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Method not allowed' });
  }

  if (!adminSecret) {
    return res.status(500).json({ error: 'Server not configured' });
  }

  try {
    const body = await new Promise((resolve) => {
      let data = '';
      req.on('data', (chunk) => (data += chunk));
      req.on('end', () => {
        try {
          resolve(JSON.parse(data || '{}'));
        } catch (e) {
          resolve({});
        }
      });
    });

    const provided = body.secret || '';
    if (provided !== adminSecret) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    // create token valid for 24 hours
    const expiresAt = Date.now() + 24 * 60 * 60 * 1000;
    const token = makeToken(adminSecret, expiresAt);

    // set HttpOnly cookie
    const maxAge = 24 * 60 * 60; // seconds
    res.setHeader('Set-Cookie', `admin_token=${token}; HttpOnly; Path=/; Max-Age=${maxAge}; SameSite=Lax`);
    return res.status(200).json({ ok: true });
  } catch (err) {
    return res.status(500).json({ error: err.message || String(err) });
  }
}

export { verifyToken };
