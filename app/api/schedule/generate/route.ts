import { NextResponse } from 'next/server';
import { createClient } from '@/utils/supabase/server';
import { generateDayRun } from '@/lib/scheduling';

export async function POST(req: Request) {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) return new NextResponse('Unauthorized', { status: 401 });

    const body = await req.json();
    const { modeId, date, isHybrid } = body;

    const targetDate = date ? new Date(date) : new Date();

    try {
        const dayRun = await generateDayRun(user.id, modeId, targetDate, isHybrid);
        return NextResponse.json(dayRun);
    } catch (error: any) {
        return new NextResponse(error.message, { status: 500 });
    }
}
