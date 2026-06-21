import { articles, topics } from './articles';
import { listArticles } from '../../lib/supabaseRest';

export const dynamic = 'force-dynamic';

export const metadata = {
  title: 'Education Blog | LabSight',
  description:
    'Practical laboratory QC guides, explainers, and educational resources from LabSight.',
};

async function getVisibleArticles() {
  try {
    const dbArticles = await listArticles({ publicOnly: true });
    return dbArticles.length ? dbArticles : articles;
  } catch {
    return articles;
  }
}

export default async function BlogPage() {
  const visibleArticles = await getVisibleArticles();
  const featuredArticle = visibleArticles[0];
  const otherArticles = visibleArticles.slice(1);

  return (
    <div className="site-shell">
      <header className="site-header">
        <div className="site-nav">
          <a className="brand" href="/">
            <img className="brand-logo" src="/labsight_logo.svg" alt="LabSight logo" />
            <span>LabSight</span>
          </a>
          <nav className="nav-links" aria-label="Blog navigation">
            <a href="/#free-tools">Free Tools</a>
            <a href="/blog">Blog</a>
            <a href="/#labops">LabOps</a>
            <a href="/downloads">Downloads</a>
          </nav>
          <a className="btn btn-small" href="/#waitlist">Join Waitlist</a>
        </div>
      </header>

      <main>
        <section className="blog-hero">
          <p className="eyebrow">Practical education</p>
          <h1>Guides for the laboratory work that rarely gets explained clearly.</h1>
          <p>
            This page will eventually show the latest article published from the
            future admin system. For now, it uses static placeholder drafts so
            each topic has a home before the researched articles are written.
          </p>
        </section>

        <section className="blog-layout">
          <aside className="topic-sidebar">
            <h2>Topics</h2>
            <div className="topic-list">
              {topics.map((topic) => <span key={topic}>{topic}</span>)}
            </div>
            <div className="admin-note">
              <h3>Publishing later</h3>
              <p>
                Default view: latest published article. Future admin fields can
                map to title, slug, category, author, status, publish date,
                excerpt, body, tags, and featured image.
              </p>
            </div>
          </aside>

          <div className="article-list">
            <article className="article-card featured-article">
              <div className="article-meta">
                <span>{featuredArticle.category}</span>
                <span>{featuredArticle.time}</span>
                <span>{featuredArticle.status}</span>
              </div>
              <h2>{featuredArticle.title}</h2>
              <p className="article-summary">{featuredArticle.summary}</p>
              <div className="article-body-preview">
                {featuredArticle.body.slice(0, 5).map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
              </div>
              <a className="text-link" href={`/blog/${featuredArticle.slug}`}>Read full article →</a>
            </article>

            <div className="article-section-heading" id="article-list">
              <h2>All article drafts</h2>
              <p>Placeholder article shells ready to replace as each researched piece is written.</p>
            </div>

            {otherArticles.map((article) => (
              <article className="article-card" key={article.slug}>
                <div className="article-meta">
                  <span>{article.category}</span>
                  <span>{article.time}</span>
                  <span>{article.status}</span>
                </div>
                <h2>{article.title}</h2>
                <p>{article.summary}</p>
                <div className="article-excerpt">
                  {article.body.slice(0, 2).map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
                </div>
                <a className="text-link" href={`/blog/${article.slug}`}>Read more →</a>
              </article>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
