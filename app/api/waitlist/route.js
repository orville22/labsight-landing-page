import { redirect } from 'next/navigation';
import { NextResponse } from 'next/server';
import { createWaitlistEntry } from '../../../lib/supabaseRest';

export async function POST(request) {
  const contentType = request.headers.get('content-type') || '';
  const formData = contentType.includes('application/json')
    ? null
    : await request.formData();
  const payload = formData
    ? {
        email: String(formData.get('work-email') || formData.get('email') || ''),
        source: String(formData.get('source') || 'labops_waitlist'),
        message: String(formData.get('message') || ''),
      }
    : await request.json();

  if (!payload.email) {
    return NextResponse.json({ message: 'Email is required' }, { status: 400 });
  }

  try {
    await createWaitlistEntry(payload);
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }

  if (formData) {
    redirect('/?waitlist=joined#waitlist');
  }

  return NextResponse.json({ ok: true });
}
