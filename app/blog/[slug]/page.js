import { notFound } from 'next/navigation';
import { articles, getArticleBySlug } from '../articles';
import { getArticle, listArticles } from '../../../lib/supabaseRest';

export const dynamic = 'force-dynamic';

async function getVisibleArticle(slug) {
  try {
    return (await getArticle(slug, { publicOnly: false })) || getArticleBySlug(slug);
  } catch {
    return getArticleBySlug(slug);
  }
}

async function getVisibleArticles() {
  try {
    const dbArticles = await listArticles({ publicOnly: false });
    return dbArticles.length ? dbArticles : articles;
  } catch {
    return articles;
  }
}

export async function generateMetadata({ params }) {
  const article = await getVisibleArticle(params.slug);

  if (!article) {
    return {
      title: 'Article Not Found | LabSight',
    };
  }

  return {
    title: `${article.title} | LabSight`,
    description: article.summary,
  };
}

export default async function ArticlePage({ params }) {
  const article = await getVisibleArticle(params.slug);

  if (!article) {
    notFound();
  }

  const visibleArticles = await getVisibleArticles();
  const otherArticles = visibleArticles.filter((item) => item.slug !== article.slug);

  return (
    <div className="site-shell">
      <header className="site-header">
        <div className="site-nav">
          <a className="brand" href="/">
            <img className="brand-logo" src="/labsight_logo.svg" alt="LabSight logo" />
            <span>LabSight</span>
          </a>
          <nav className="nav-links" aria-label="Article navigation">
            <a href="/#free-tools">Free Tools</a>
            <a href="/blog">Blog</a>
            <a href="/#labops">LabOps</a>
            <a href="/downloads">Downloads</a>
          </nav>
          <a className="btn btn-small" href="/#waitlist">Join Waitlist</a>
        </div>
      </header>

      <main>
        <a className="text-link back-link" href="/blog">← Back to all articles</a>

        <section className="article-view-layout">
          <article className="article-card article-full-card">
            <div className="article-meta">
              <span>{article.category}</span>
              <span>{article.time}</span>
              <span>{article.status}</span>
            </div>
            <h1>{article.title}</h1>
            <p className="article-summary">{article.summary}</p>
            <div className="article-body">
              {article.body.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
            </div>
          </article>

          <aside className="related-sidebar" aria-label="Other articles">
            <div className="related-sidebar-inner">
              <h2>Other article drafts</h2>
              <div className="related-article-list">
                {otherArticles.map((item) => (
                  <a className="related-article-card" href={`/blog/${item.slug}`} key={item.slug}>
                    <span>{item.category}</span>
                    <strong>{item.title}</strong>
                    <small>{item.time}</small>
                  </a>
                ))}
              </div>
            </div>
          </aside>
        </section>
      </main>
    </div>
  );
}
