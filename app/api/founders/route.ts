import { NextResponse } from 'next/server';
import { createClient } from '@/utils/supabase/server';

export async function GET() {
  const supabase = await createClient();

  const { data: founders, error } = await supabase
    .from('founders')
    .select(`
      *,
      day_templates (
        *,
        template_blocks (*)
      )
    `)
    .eq('is_active', true);

  if (error) {
    return new NextResponse(error.message, { status: 500 });
  }

  return NextResponse.json(founders);
}
