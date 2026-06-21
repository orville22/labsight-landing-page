import { NextResponse } from 'next/server';
import { createArticle, listArticles } from '../../../../lib/supabaseRest';
import { articles } from '../../../blog/articles';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const dbArticles = await listArticles();
    return NextResponse.json({ articles: dbArticles });
  } catch (error) {
    return NextResponse.json({
      articles,
      fallback: true,
      message: error.message,
    });
  }
}

export async function POST(request) {
  try {
    const article = await request.json();
    const created = await createArticle(article);
    return NextResponse.json({ article: created }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
