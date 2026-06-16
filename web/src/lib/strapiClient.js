const strapiUrl = import.meta.env.VITE_STRAPI_URL || '';

export function getStrapiUrl() {
  return strapiUrl;
}

export async function fetchFromStrapi(endpoint, options = {}) {
  if (!strapiUrl) {
    console.warn('[strapi] VITE_STRAPI_URL not set');
    return null;
  }

  const url = `${strapiUrl}/api${endpoint}`;
  const res = await fetch(url, {
    headers: { 'Content-Type': 'application/json' },
    ...options,
  });

  if (!res.ok) {
    throw new Error(`Strapi error ${res.status}: ${res.statusText}`);
  }

  return res.json();
}

export function getStrapiMedia(media) {
  if (!media?.data?.attributes?.url) return null;
  const url = media.data.attributes.url;
  return url.startsWith('http') ? url : `${strapiUrl}${url}`;
}
