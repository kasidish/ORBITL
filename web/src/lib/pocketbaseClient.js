// Environment-aware PocketBase client.
// If `VITE_POCKETBASE_URL` is set, use the real PocketBase client.
// Otherwise fall back to an in-memory stub for local development.
import PocketBase from 'pocketbase';

const pbUrl = import.meta.env.VITE_POCKETBASE_URL || '';

let pb;
if (pbUrl) {
  pb = new PocketBase(pbUrl);
} else {
  // Harmless stub for local development
  pb = {
    collection: (name) => ({
      create: async (data, opts) => {
        console.log('[pocketbase stub] create', name, data, opts);
        return { id: 'stub-' + Date.now(), ...data };
      }
    })
  };
}

export default pb;
