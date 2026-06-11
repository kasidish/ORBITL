import React, { useState } from 'react';

export default function AdminPage() {
  const [secret, setSecret] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [records, setRecords] = useState(null);
  const [showSecret, setShowSecret] = useState(false);

  const fetchRecords = async () => {
    setLoading(true);
    setError(null);
    setRecords(null);
    try {
      const res = await fetch('/api/admin/records');
      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body.error || `Status ${res.status}`);
      }
      const data = await res.json();
      setRecords(data);
    } catch (err) {
      setError(err.message || String(err));
    } finally {
      setLoading(false);
    }
  };

  const login = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ secret })
      });
      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body.error || `Status ${res.status}`);
      }
      await fetchRecords();
    } catch (err) {
      setError(err.message || String(err));
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    setLoading(true);
    try {
      await fetch('/api/admin/logout', { method: 'POST' });
    } catch (e) {
      // ignore
    } finally {
      setLoading(false);
      setSecret('');
      setRecords(null);
      setError(null);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-4">Admin — Contact Messages</h1>

      <p className="mb-4 text-sm text-muted-foreground">Enter your admin secret to fetch records from Supabase (server-side).</p>

      <div className="flex gap-2 mb-4 items-center">
        <input
          value={secret}
          onChange={(e) => setSecret(e.target.value)}
          placeholder="Admin secret"
          type={showSecret ? 'text' : 'password'}
          className="flex-1 input bg-background"
        />
        <button onClick={() => setShowSecret((s) => !s)} className="btn">
          {showSecret ? 'Hide' : 'Show'}
        </button>
        <button onClick={login} disabled={loading || !secret} className="btn btn-primary">
          {loading ? 'Loading…' : 'Login & Fetch'}
        </button>
        <button onClick={handleLogout} className="btn">
          Logout
        </button>
        <button
          onClick={async () => {
            try {
              setLoading(true);
              const res = await fetch('/api/admin/records.csv');
              if (!res.ok) throw new Error('Failed to export');
              const blob = await res.blob();
              const url = URL.createObjectURL(blob);
              const a = document.createElement('a');
              a.href = url;
              a.download = 'contact_messages.csv';
              document.body.appendChild(a);
              a.click();
              a.remove();
              URL.revokeObjectURL(url);
            } catch (e) {
              setError(e.message || String(e));
            } finally {
              setLoading(false);
            }
          }}
          className="btn"
        >
          Export CSV
        </button>
      </div>

      {error && <div className="mb-4 text-destructive">Error: {error}</div>}

      {records && (
        <div className="overflow-x-auto">
          <table className="table-auto w-full border-collapse">
            <thead>
              <tr className="text-left border-b">
                <th className="py-2">id</th>
                <th className="py-2">created_at</th>
                <th className="py-2">name</th>
                <th className="py-2">email</th>
                <th className="py-2">message</th>
              </tr>
            </thead>
            <tbody>
              {records.map((r) => (
                <tr key={r.id} className="border-b odd:bg-muted/50">
                  <td className="py-2 align-top text-sm break-all">{r.id}</td>
                  <td className="py-2 align-top text-sm">{r.created_at}</td>
                  <td className="py-2 align-top">{r.name}</td>
                  <td className="py-2 align-top">{r.email}</td>
                  <td className="py-2 align-top whitespace-pre-wrap">{r.message}</td>
                  <td className="py-2 align-top">
                    <button
                      className="btn btn-sm btn-danger"
                      onClick={async () => {
                        if (!confirm('Delete this message?')) return;
                        try {
                          setLoading(true);
                          const res = await fetch(`/api/admin/records/${r.id}`, { method: 'DELETE' });
                          if (!res.ok) {
                            const body = await res.json().catch(() => ({}));
                            throw new Error(body.error || 'Delete failed');
                          }
                          await fetchRecords();
                        } catch (e) {
                          setError(e.message || String(e));
                        } finally {
                          setLoading(false);
                        }
                      }}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {!records && !error && (
        <div className="text-sm text-muted-foreground">No records loaded yet.</div>
      )}
    </div>
  );
}
