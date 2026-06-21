import { NextResponse } from 'next/server';
import { listArticles } from '../../../lib/supabaseRest';
import { articles } from '../../blog/articles';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const dbArticles = await listArticles({ publicOnly: false });
    return NextResponse.json({ articles: dbArticles.length ? dbArticles : articles });
  } catch (error) {
    return NextResponse.json({
      articles,
      fallback: true,
      message: error.message,
    });
  }
}
