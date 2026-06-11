import React, { useState } from 'react';

export default function AdminPage() {
  const [tab, setTab] = useState('messages'); // 'messages' | 'members'
  const [secret, setSecret] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [records, setRecords] = useState(null);
  const [showSecret, setShowSecret] = useState(false);

  const endpointFor = (t) => (t === 'members' ? '/api/admin/members' : '/api/admin/records');
  const csvFor = (t) => (t === 'members' ? '/api/admin/members.csv' : '/api/admin/records.csv');

  const fetchRecords = async (t = tab) => {
    setLoading(true);
    setError(null);
    setRecords(null);
    try {
      const res = await fetch(endpointFor(t));
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
    <div className="max-w-6xl mx-auto px-4 py-12">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">Admin</h1>
        <div className="flex gap-2">
          <button onClick={() => setTab('messages')} className={`btn ${tab==='messages' ? 'btn-primary' : ''}`}>Contact Messages</button>
          <button onClick={() => setTab('members')} className={`btn ${tab==='members' ? 'btn-primary' : ''}`}>Members</button>
        </div>
      </div>

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
        <button onClick={handleLogout} className="btn">Logout</button>
        <button
          onClick={async () => {
            try {
              setLoading(true);
              const res = await fetch(csvFor(tab));
              if (!res.ok) throw new Error('Failed to export');
              const blob = await res.blob();
              const url = URL.createObjectURL(blob);
              const a = document.createElement('a');
              a.href = url;
              a.download = `${tab}.csv`;
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
                {tab === 'messages' ? (
                  <>
                    <th className="py-2">name</th>
                    <th className="py-2">email</th>
                    <th className="py-2">message</th>
                  </>
                ) : (
                  <>
                    <th className="py-2">full_name</th>
                    <th className="py-2">email</th>
                    <th className="py-2">major</th>
                    <th className="py-2">year_of_study</th>
                    <th className="py-2">area_of_interest</th>
                  </>
                )}
                <th className="py-2">actions</th>
              </tr>
            </thead>
            <tbody>
              {records.map((r) => (
                <tr key={r.id} className="border-b odd:bg-muted/50">
                  <td className="py-2 align-top text-sm break-all">{r.id}</td>
                  <td className="py-2 align-top text-sm">{r.created_at}</td>
                  {tab === 'messages' ? (
                    <>
                      <td className="py-2 align-top">{r.name}</td>
                      <td className="py-2 align-top">{r.email}</td>
                      <td className="py-2 align-top whitespace-pre-wrap">{r.message}</td>
                    </>
                  ) : (
                    <>
                      <td className="py-2 align-top">{r.full_name}</td>
                      <td className="py-2 align-top">{r.email}</td>
                      <td className="py-2 align-top">{r.major}</td>
                      <td className="py-2 align-top">{r.year_of_study}</td>
                      <td className="py-2 align-top">{r.area_of_interest}</td>
                    </>
                  )}
                  <td className="py-2 align-top">
                    <button
                      className="btn btn-sm btn-danger"
                      onClick={async () => {
                        const confirmText = tab === 'messages' ? 'Delete this message?' : 'Delete this member?';
                        if (!confirm(confirmText)) return;
                        try {
                          setLoading(true);
                          const base = tab === 'messages' ? '/api/admin/records' : '/api/admin/members';
                          const res = await fetch(`${base}/${r.id}`, { method: 'DELETE' });
                          if (!res.ok) {
                            const body = await res.json().catch(() => ({}));
                            throw new Error(body.error || 'Delete failed');
                          }
                          await fetchRecords(tab);
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
