'use client';

import { useMemo, useState } from 'react';
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
    title: article.title,
    slug: article.slug,
    category: article.category,
    status: article.status,
    time: article.time,
    author: 'LabSight Editorial',
    summary: article.summary,
    tags: article.category,
    body: article.body.join('\n\n'),
  };
}

export default function AdminPage() {
  const starterDrafts = useMemo(() => articles.map(articleToDraft), []);
  const [drafts, setDrafts] = useState(starterDrafts);
  const [selectedSlug, setSelectedSlug] = useState(starterDrafts[0].slug);
  const [message, setMessage] = useState('Draft loaded');

  const selectedDraft = drafts.find((draft) => draft.slug === selectedSlug) || drafts[0];
  const bodyParagraphs = selectedDraft.body
    .split(/\n{2,}/)
    .map((paragraph) => paragraph.trim())
    .filter(Boolean);

  function updateDraft(field, value) {
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

  function saveDraft(event) {
    event.preventDefault();
    setMessage('Draft saved in this admin preview');
  }

  function publishPreview() {
    setDrafts((currentDrafts) =>
      currentDrafts.map((draft) =>
        draft.slug === selectedDraft.slug ? { ...draft, status: 'Ready to publish' } : draft
      )
    );
    setMessage('Marked ready to publish');
  }

  function createDraft() {
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
    };

    setDrafts((currentDrafts) => [newDraft, ...currentDrafts]);
    setSelectedSlug(newDraft.slug);
    setMessage('New draft created');
  }

  function deleteDraft() {
    if (drafts.length === 1) {
      setMessage('Keep at least one draft in the preview');
      return;
    }

    const remainingDrafts = drafts.filter((draft) => draft.slug !== selectedDraft.slug);
    setDrafts(remainingDrafts);
    setSelectedSlug(remainingDrafts[0].slug);
    setMessage('Draft deleted');
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
                <p>Read/select a draft to edit it.</p>
                {drafts.map((draft) => (
                  <button
                    className={draft.slug === selectedDraft.slug ? 'selected' : ''}
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
                    <button className="btn" type="submit">Update Draft</button>
                    <button className="btn secondary" type="button" onClick={publishPreview}>
                      Mark Ready
                    </button>
                    <button className="btn danger" type="button" onClick={deleteDraft}>
                      Delete Draft
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
              </div>
            </div>
          </section>
        </section>
      </main>
    </div>
  );
}
