import { NextResponse } from 'next/server';
import { getArticle } from '../../../../lib/supabaseRest';
import { getArticleBySlug } from '../../../blog/articles';

export async function GET(_request, { params }) {
  try {
    const article = await getArticle(params.slug, { publicOnly: true });
    if (article) {
      return NextResponse.json({ article });
    }
  } catch (error) {
    const fallback = getArticleBySlug(params.slug);
    return NextResponse.json({
      article: fallback || null,
      fallback: true,
      message: error.message,
    });
  }

  const fallback = getArticleBySlug(params.slug);
  return NextResponse.json({ article: fallback || null });
}
