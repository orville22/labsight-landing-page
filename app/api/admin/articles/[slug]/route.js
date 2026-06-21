import { NextResponse } from 'next/server';
import { deleteArticle, updateArticle } from '../../../../../lib/supabaseRest';

export const dynamic = 'force-dynamic';

export async function PATCH(request, { params }) {
  try {
    const article = await request.json();
    const updated = await updateArticle(params.slug, article);
    if (!updated) {
      return NextResponse.json({ message: 'Article not found' }, { status: 404 });
    }
    return NextResponse.json({ article: updated });
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}

export async function DELETE(_request, { params }) {
  try {
    await deleteArticle(params.slug);
    return NextResponse.json({ ok: true });
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
