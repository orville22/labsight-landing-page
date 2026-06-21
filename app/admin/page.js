'use client';

import { useEffect, useMemo, useState } from 'react';
import { articles } from '../blog/articles';

const moduleLinks = [
  ['Blog publishing', 'Active'],
  ['Tool library', 'Later'],
  ['Downloads', 'Later'],
  ['Waitlist', 'Later'],
  ['Site settings', 'Later'],
];

function articleToDraft(article) {
  return {
    id: article.id,
    title: article.title,
    slug: article.slug,
    originalSlug: article.slug,
    category: article.category,
    status: article.status,
    time: article.time,
    author: article.author || 'LabSight Editorial',
    summary: article.summary,
    tags: article.tags || article.category,
    body: Array.isArray(article.body) ? article.body.join('\n\n') : article.body,
    persisted: Boolean(article.id),
  };
}

function confirmAdminAction(message) {
  return window.confirm(message);
}

export default function AdminPage() {
  const starterDrafts = useMemo(() => articles.map(articleToDraft), []);
  const [drafts, setDrafts] = useState(starterDrafts);
  const [selectedSlug, setSelectedSlug] = useState(starterDrafts[0].slug);
  const [message, setMessage] = useState('Loading article database...');
  const [isSaving, setIsSaving] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const selectedDraft = drafts.find((draft) => draft.slug === selectedSlug) || drafts[0] || null;
  const bodyParagraphs = (selectedDraft?.body || '')
    .split(/\n{2,}/)
    .map((paragraph) => paragraph.trim())
    .filter(Boolean);

  useEffect(() => {
    let isMounted = true;

    async function loadArticles() {
      try {
        const response = await fetch('/api/admin/articles', { cache: 'no-store' });
        const data = await response.json();
        if (!response.ok) {
          throw new Error(data.message || 'Unable to load articles');
        }
        const loadedDrafts = (data.articles || []).map(articleToDraft);
        if (!isMounted) return;
        setDrafts(loadedDrafts);
        setSelectedSlug(loadedDrafts[0]?.slug || '');
        setMessage(data.fallback ? 'Using local placeholder articles; Supabase is not ready yet' : loadedDrafts.length ? 'Loaded from Supabase' : 'No articles in Supabase yet');
      } catch (error) {
        if (!isMounted) return;
        setMessage(`Using local placeholder articles: ${error.message}`);
      }
    }

    loadArticles();

    return () => {
      isMounted = false;
    };
  }, []);

  function updateDraft(field, value) {
    if (!selectedDraft) return;

    const previousSlug = selectedDraft.slug;

    setDrafts((currentDrafts) =>
      currentDrafts.map((draft) =>
        draft.slug === previousSlug ? { ...draft, [field]: value } : draft
      )
    );
    if (field === 'slug') {
      setSelectedSlug(value);
    }
    setMessage('Unsaved changes');
  }

  async function persistDraft(draftToSave, successMessage) {
    setIsSaving(true);
    const method = draftToSave.persisted ? 'PATCH' : 'POST';
    const url = draftToSave.persisted
      ? `/api/admin/articles/${encodeURIComponent(draftToSave.originalSlug || draftToSave.slug)}`
      : '/api/admin/articles';

    try {
      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(draftToSave),
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || 'Unable to save article');
      }

      const savedDraft = articleToDraft(data.article);
      setDrafts((currentDrafts) => {
        const exists = currentDrafts.some((draft) => draft.slug === draftToSave.slug || draft.originalSlug === draftToSave.originalSlug);
        if (!exists) return [savedDraft, ...currentDrafts];
        return currentDrafts.map((draft) =>
          draft.slug === draftToSave.slug || draft.originalSlug === draftToSave.originalSlug ? savedDraft : draft
        );
      });
      setSelectedSlug(savedDraft.slug);
      setMessage(successMessage);
      return savedDraft;
    } catch (error) {
      setMessage(`Save failed: ${error.message}`);
      return null;
    } finally {
      setIsSaving(false);
    }
  }

  async function saveDraft(event) {
    event.preventDefault();
    if (!selectedDraft) return;

    const action = selectedDraft.persisted ? 'Update' : 'Create';
    const confirmed = confirmAdminAction(`${action} "${selectedDraft.title}" in Supabase?`);
    if (!confirmed) return;

    await persistDraft(selectedDraft, 'Saved to Supabase');
  }

  async function publishArticle() {
    if (!selectedDraft) return;

    const confirmed = confirmAdminAction(`Publish "${selectedDraft.title}" to the website?`);
    if (!confirmed) return;

    const publishedDraft = { ...selectedDraft, status: 'Published' };
    setDrafts((currentDrafts) =>
      currentDrafts.map((draft) =>
        draft.slug === selectedDraft.slug ? publishedDraft : draft
      )
    );
    await persistDraft(publishedDraft, 'Published to website');
  }

  function createDraft() {
    const confirmed = confirmAdminAction('Create a new local article draft in the admin queue?');
    if (!confirmed) return;

    const nextNumber = drafts.length + 1;
    const newDraft = {
      title: `Untitled LabSight Article ${nextNumber}`,
      slug: `untitled-labsight-article-${nextNumber}`,
      category: 'Editorial',
      status: 'Draft',
      time: '~5 min',
      author: 'LabSight Editorial',
      summary: 'Short working summary for the article.',
      tags: 'Editorial',
      body: 'This is not a real article yet; this placeholder marks a new admin-created draft.\n\nLorem ipsum dolor sit amet, consectetur adipiscing elit. Integer vitae nibh id mauris facilisis volutpat.',
      persisted: false,
    };

    setDrafts((currentDrafts) => [newDraft, ...currentDrafts]);
    setSelectedSlug(newDraft.slug);
    setMessage('New draft created');
  }

  async function deleteDraft() {
    if (!selectedDraft) {
      setMessage('No article selected');
      return;
    }

    const confirmed = confirmAdminAction(`Delete "${selectedDraft.title}"? This cannot be undone.`);
    if (!confirmed) {
      return;
    }

    setIsDeleting(true);
    try {
      if (selectedDraft.persisted) {
        const response = await fetch(`/api/admin/articles/${encodeURIComponent(selectedDraft.originalSlug || selectedDraft.slug)}`, {
          method: 'DELETE',
        });
        const data = await response.json();
        if (!response.ok) {
          throw new Error(data.message || 'Unable to delete article');
        }
      }

      const remainingDrafts = drafts.filter((draft) =>
        draft.slug !== selectedDraft.slug &&
        (!selectedDraft.originalSlug || draft.originalSlug !== selectedDraft.originalSlug)
      );
      setDrafts(remainingDrafts);
      setSelectedSlug(remainingDrafts[0]?.slug || '');
      setMessage('Article deleted');
    } catch (error) {
      setMessage(`Delete failed: ${error.message}`);
    } finally {
      setIsDeleting(false);
    }
  }

  return (
    <div className="site-shell admin-shell">
      <header className="site-header">
        <div className="site-nav">
          <a className="brand" href="/">
            <img className="brand-logo" src="/labsight_logo.svg" alt="LabSight logo" />
            <span>LabSight Admin</span>
          </a>
          <nav className="nav-links" aria-label="Admin navigation">
            <a href="/admin">Admin</a>
            <a href="/blog">Blog</a>
            <a href="/downloads">Downloads</a>
            <a href="/">Public Site</a>
          </nav>
          <a className="btn btn-small secondary" href="/blog">View Blog</a>
        </div>
      </header>

      <main>
        <section className="admin-hero">
          <div>
            <p className="eyebrow">Admin workspace</p>
            <h1>Publishing control room for LabSight.</h1>
            <p>
              A general admin shell with the first working area focused on blog
              drafting, review, and publishing preparation.
            </p>
          </div>
          <div className="admin-status-card">
            <span>Current focus</span>
            <strong>Blog publishing</strong>
            <p>{drafts.length} article drafts loaded</p>
          </div>
        </section>

        <section className="admin-layout">
          <nav className="admin-module-bar" aria-label="Admin modules">
            <span>Modules</span>
            <div className="admin-module-list">
              {moduleLinks.map(([label, status]) => (
                <button className={status === 'Active' ? 'active' : ''} type="button" key={label}>
                  <span>{label}</span>
                  <small>{status}</small>
                </button>
              ))}
            </div>
          </nav>

          <section className="admin-panel">
            <div className="admin-panel-header">
              <div>
                <p className="panel-label">Blog publishing</p>
                <h2>Article editor</h2>
              </div>
              <div className="admin-actions">
                <span className="admin-message">{message}</span>
                <button className="btn secondary" type="button" onClick={createDraft}>New Draft</button>
              </div>
            </div>

            <div className="admin-workspace">
              <aside className="admin-draft-list" aria-label="Article drafts">
                <h3>Article queue</h3>
                <p>Read/select a draft to edit it. Saved records persist in Supabase.</p>
                {drafts.map((draft) => (
                  <button
                    className={draft.slug === selectedDraft?.slug ? 'selected' : ''}
                    type="button"
                    key={draft.slug}
                    onClick={() => {
                      setSelectedSlug(draft.slug);
                      setMessage('Draft loaded');
                    }}
                  >
                    <strong>{draft.title}</strong>
                    <span>{draft.category} · {draft.status}</span>
                  </button>
                ))}
              </aside>

              <div className="admin-editor-column">
                {!selectedDraft ? (
                  <div className="admin-empty-state">
                    <p className="panel-label">No article selected</p>
                    <h3>Create your first article</h3>
                    <p>
                      Supabase has no saved articles yet. Create a new draft to start publishing.
                    </p>
                    <button className="btn" type="button" onClick={createDraft}>New Draft</button>
                  </div>
                ) : (
                <>
                <form className="admin-editor-form" onSubmit={saveDraft}>
                  <div className="field-grid two-column">
                    <label>
                      Title
                      <input
                        value={selectedDraft.title}
                        onChange={(event) => updateDraft('title', event.target.value)}
                      />
                    </label>
                    <label>
                      Slug
                      <input
                        value={selectedDraft.slug}
                        onChange={(event) => updateDraft('slug', event.target.value)}
                      />
                    </label>
                    <label>
                      Category
                      <input
                        value={selectedDraft.category}
                        onChange={(event) => updateDraft('category', event.target.value)}
                      />
                    </label>
                    <label>
                      Status
                      <select
                        value={selectedDraft.status}
                        onChange={(event) => updateDraft('status', event.target.value)}
                      >
                        <option>Draft</option>
                        <option>In review</option>
                        <option>Ready to publish</option>
                        <option>Published</option>
                        <option>Placeholder</option>
                        <option>Featured draft</option>
                      </select>
                    </label>
                    <label>
                      Reading time
                      <input
                        value={selectedDraft.time}
                        onChange={(event) => updateDraft('time', event.target.value)}
                      />
                    </label>
                    <label>
                      Author
                      <input
                        value={selectedDraft.author}
                        onChange={(event) => updateDraft('author', event.target.value)}
                      />
                    </label>
                  </div>

                  <label>
                    Summary
                    <textarea
                      rows="3"
                      value={selectedDraft.summary}
                      onChange={(event) => updateDraft('summary', event.target.value)}
                    />
                  </label>

                  <label>
                    Tags
                    <input
                      value={selectedDraft.tags}
                      onChange={(event) => updateDraft('tags', event.target.value)}
                    />
                  </label>

                  <label>
                    Body
                    <textarea
                      className="body-editor"
                      rows="18"
                      value={selectedDraft.body}
                      onChange={(event) => updateDraft('body', event.target.value)}
                    />
                  </label>

                  <div className="admin-form-actions">
                    <button className="btn" type="submit" disabled={isSaving || isDeleting}>
                      {isSaving ? 'Saving...' : 'Update Draft'}
                    </button>
                    <button className="btn secondary" type="button" onClick={publishArticle} disabled={isSaving || isDeleting}>
                      Publish to Website
                    </button>
                    <button className="btn danger" type="button" onClick={deleteDraft} disabled={isSaving || isDeleting}>
                      {isDeleting ? 'Deleting...' : 'Delete Article'}
                    </button>
                    <a className="text-link" href={`/blog/${selectedDraft.slug}`}>Open public article →</a>
                  </div>
                </form>

                <aside className="admin-preview" aria-label="Article preview">
                  <h3>Preview</h3>
                  <article className="article-card">
                    <div className="article-meta">
                      <span>{selectedDraft.category}</span>
                      <span>{selectedDraft.time}</span>
                      <span>{selectedDraft.status}</span>
                    </div>
                    <h2>{selectedDraft.title}</h2>
                    <p className="article-summary">{selectedDraft.summary}</p>
                    <div className="article-body-preview">
                      {bodyParagraphs.slice(0, 4).map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
                    </div>
                  </article>
                </aside>
                </>
                )}
              </div>
            </div>
          </section>
        </section>
      </main>
    </div>
  );
}
