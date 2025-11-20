import { NextResponse } from 'next/server';
import { createClient } from '@/utils/supabase/server';

export async function GET() {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) return new NextResponse('Unauthorized', { status: 401 });

    const { data: modes, error } = await supabase
        .from('user_modes')
        .select(`
      *,
      user_mode_blocks (*)
    `)
        .eq('user_id', user.id);

    if (error) {
        return new NextResponse(error.message, { status: 500 });
    }

    return NextResponse.json(modes);
}

export async function POST(req: Request) {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) return new NextResponse('Unauthorized', { status: 401 });

    const body = await req.json();
    const { name, description, base_day_template_id, blocks } = body;

    // 1. Create User Mode
    const { data: mode, error: modeError } = await supabase
        .from('user_modes')
        .insert({
            user_id: user.id,
            name,
            description,
            base_day_template_id,
            is_hybrid: true,
        })
        .select()
        .single();

    if (modeError) return new NextResponse(modeError.message, { status: 500 });

    // 2. Create Blocks
    if (blocks && blocks.length > 0) {
        const formattedBlocks = blocks.map((b: any, index: number) => ({
            user_mode_id: mode.id,
            start_time: b.start_time,
            end_time: b.end_time,
            label: b.label || b.mode_name,
            instructions: b.instructions,
            source_founder_id: b.source_founder_id, // Optional
            order_index: index,
        }));

        const { error: blocksError } = await supabase
            .from('user_mode_blocks')
            .insert(formattedBlocks);

        if (blocksError) return new NextResponse(blocksError.message, { status: 500 });
    }

    return NextResponse.json(mode);
}
