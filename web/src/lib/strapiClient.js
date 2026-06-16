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
  console.log('[strapi] fetching:', url);
  const res = await fetch(url, {
    headers: { 'Content-Type': 'application/json' },
    ...options,
  });

  if (!res.ok) {
    const body = await res.text();
    console.error(`[strapi] ${res.status} ${res.statusText}:`, body);
    throw new Error(`Strapi error ${res.status}: ${res.statusText}`);
  }

  return res.json();
}

export function getStrapiMedia(media) {
  if (!media) return null;

  // Strapi v5 format: media is an object with url directly
  if (media.url) {
    return media.url.startsWith('http') ? media.url : `${strapiUrl}${media.url}`;
  }

  // Strapi v4 format: media.data.attributes.url
  if (media?.data?.attributes?.url) {
    const url = media.data.attributes.url;
    return url.startsWith('http') ? url : `${strapiUrl}${url}`;
  }

  return null;
}
