import { NextResponse } from 'next/server';
import { createClient } from '@/utils/supabase/server';
import { format } from 'date-fns';

export async function GET() {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) return new NextResponse('Unauthorized', { status: 401 });

    const today = format(new Date(), 'yyyy-MM-dd');

    const { data: dayRun, error } = await supabase
        .from('user_day_runs')
        .select(`
      *,
      user_block_runs (*)
    `)
        .eq('user_id', user.id)
        .eq('date', today)
        .single();

    if (error && error.code !== 'PGRST116') { // PGRST116 is "Row not found"
        return new NextResponse(error.message, { status: 500 });
    }

    if (!dayRun) {
        return NextResponse.json(null);
    }

    // Sort blocks by actual_start
    if (dayRun.user_block_runs) {
        dayRun.user_block_runs.sort((a: any, b: any) =>
            new Date(a.actual_start).getTime() - new Date(b.actual_start).getTime()
        );
    }

    return NextResponse.json(dayRun);
}
