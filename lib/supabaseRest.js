const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_PUBLISHABLE_KEY = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

export function hasSupabaseConfig() {
  return Boolean(SUPABASE_URL && SUPABASE_PUBLISHABLE_KEY);
}

export function hasSupabaseServiceRole() {
  return Boolean(SUPABASE_URL && SUPABASE_SERVICE_ROLE_KEY);
}

function resolveKey({ serviceRole = false } = {}) {
  if (serviceRole) {
    if (!SUPABASE_SERVICE_ROLE_KEY) {
      throw new Error('SUPABASE_SERVICE_ROLE_KEY is required for admin article persistence');
    }
    return SUPABASE_SERVICE_ROLE_KEY;
  }

  if (!SUPABASE_PUBLISHABLE_KEY) {
    throw new Error('NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY is required for Supabase requests');
  }

  return SUPABASE_PUBLISHABLE_KEY;
}

function supabaseHeaders(extra = {}, options = {}) {
  const key = resolveKey(options);

  return {
    apikey: key,
    Authorization: `Bearer ${key}`,
    'Content-Type': 'application/json',
    ...extra,
  };
}

function endpoint(path, query = '') {
  return `${SUPABASE_URL}/rest/v1/${path}${query}`;
}

async function request(path, options = {}, query = '', requestOptions = {}) {
  if (!SUPABASE_URL) {
    throw new Error('NEXT_PUBLIC_SUPABASE_URL is required for Supabase requests');
  }

  const response = await fetch(endpoint(path, query), {
    ...options,
    headers: supabaseHeaders(options.headers, requestOptions),
  });

  if (!response.ok) {
    const detail = await response.text();
    throw new Error(detail || `Supabase request failed with ${response.status}`);
  }

  if (response.status === 204) {
    return null;
  }

  return response.json();
}

function splitBody(body) {
  if (Array.isArray(body)) return body;
  if (!body) return [];
  return String(body)
    .split(/\n{2,}/)
    .map((paragraph) => paragraph.trim())
    .filter(Boolean);
}

export function normalizeArticle(row) {
  return {
    id: row.id,
    slug: row.slug,
    title: row.title,
    category: row.category || 'Editorial',
    time: row.reading_time || row.time || '~5 min',
    status: row.status || 'Draft',
    author: row.author || 'LabSight Editorial',
    summary: row.summary || '',
    tags: row.tags || row.category || '',
    body: splitBody(row.body_blocks || row.body || row.content),
    createdAt: row.created_at,
    updatedAt: row.updated_at,
    publishedAt: row.published_at,
  };
}

export function articleToPayload(article) {
  return {
    slug: article.slug,
    title: article.title,
    category: article.category,
    status: article.status,
    reading_time: article.time,
    author: article.author,
    summary: article.summary,
    tags: article.tags,
    body: Array.isArray(article.body) ? article.body.join('\n\n') : article.body,
    published_at:
      article.status === 'Published'
        ? article.publishedAt || new Date().toISOString()
        : article.publishedAt || null,
  };
}

export async function listArticles({ publicOnly = false } = {}) {
  const statusFilter = publicOnly ? '&status=eq.Published' : '';
  const rows = await request(
    'articles',
    { method: 'GET', next: { revalidate: 60 } },
    `?select=*&order=published_at.desc.nullslast,updated_at.desc.nullslast,created_at.desc${statusFilter}`,
    { serviceRole: !publicOnly }
  );
  return rows.map(normalizeArticle);
}

export async function getArticle(slug, { publicOnly = false } = {}) {
  const statusFilter = publicOnly ? '&status=eq.Published' : '';
  const rows = await request(
    'articles',
    { method: 'GET', next: { revalidate: 60 } },
    `?select=*&slug=eq.${encodeURIComponent(slug)}${statusFilter}&limit=1`,
    { serviceRole: !publicOnly }
  );
  return rows[0] ? normalizeArticle(rows[0]) : null;
}

export async function createArticle(article) {
  const rows = await request('articles', {
    method: 'POST',
    headers: { Prefer: 'return=representation' },
    body: JSON.stringify(articleToPayload(article)),
  }, '', { serviceRole: true });
  return normalizeArticle(rows[0]);
}

export async function updateArticle(slug, article) {
  const rows = await request(
    'articles',
    {
      method: 'PATCH',
      headers: { Prefer: 'return=representation' },
      body: JSON.stringify(articleToPayload(article)),
    },
    `?slug=eq.${encodeURIComponent(slug)}`,
    { serviceRole: true }
  );
  return rows[0] ? normalizeArticle(rows[0]) : null;
}

export async function deleteArticle(slug) {
  await request(
    'articles',
    {
      method: 'DELETE',
      headers: { Prefer: 'return=minimal' },
    },
    `?slug=eq.${encodeURIComponent(slug)}`,
    { serviceRole: true }
  );
}

export async function createWaitlistEntry(entry) {
  const rows = await request('waitlist_entries', {
    method: 'POST',
    headers: { Prefer: 'return=representation' },
    body: JSON.stringify({
      email: entry.email,
      source: entry.source || 'labops_waitlist',
      message: entry.message || null,
      created_at: new Date().toISOString(),
    }),
  });
  return rows[0];
}
