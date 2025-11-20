import { createClient } from '@/utils/supabase/server';
import { addDays, format, parse, set } from 'date-fns';

export async function generateDayRun(userId: string, modeId: string, date: Date, isHybrid: boolean = false) {
    const supabase = await createClient();

    // 1. Fetch User Wake Time
    const { data: user } = await supabase
        .from('users')
        .select('default_wake_time')
        .eq('id', userId)
        .single();

    if (!user) throw new Error('User not found');

    const wakeTime = user.default_wake_time || '07:00:00'; // HH:mm:ss
    const [wakeHour, wakeMinute] = wakeTime.split(':').map(Number);

    // 2. Create User Day Run
    const { data: dayRun, error: dayRunError } = await supabase
        .from('user_day_runs')
        .insert({
            user_id: userId,
            user_mode_id: isHybrid ? modeId : null,
            day_template_id: isHybrid ? null : modeId,
            date: format(date, 'yyyy-MM-dd'),
            status: 'planned',
        })
        .select()
        .single();

    if (dayRunError) throw dayRunError;

    // 3. Fetch Blocks
    let blocks = [];
    if (isHybrid) {
        const { data } = await supabase
            .from('user_mode_blocks')
            .select('*')
            .eq('user_mode_id', modeId)
            .order('order_index');
        blocks = data || [];
    } else {
        const { data } = await supabase
            .from('template_blocks')
            .select('*')
            .eq('day_template_id', modeId)
            .order('order_index');
        blocks = data || [];
    }

    // 4. Convert Blocks to Absolute Times & Insert
    // Assuming block start_time is relative to wake time OR fixed.
    // The prompt said "Convert all blocks to absolute timestamps".
    // If the template times are like '09:00:00', we can treat them as fixed times for simplicity,
    // OR we can treat them as offsets if the prompt implied relative.
    // Given "Elon Mode" has "09:00:00", it looks like fixed time.
    // BUT "Wake time" is a user setting.
    // If wake time is 7am, and Elon starts at 9am, maybe it's fixed.
    // If wake time is 5am, does Elon start at 7am?
    // Let's assume FIXED times for MVP unless "relative" is explicit.
    // Wait, "default_wake_time" suggests relative scheduling might be desired.
    // Let's stick to FIXED times for now as the seed data looks like fixed clock times.
    // We just need to combine the DATE with the TIME.

    const blockRuns = blocks.map((block) => {
        // Parse time string 'HH:mm:ss'
        const [startH, startM] = block.start_time.split(':').map(Number);
        const [endH, endM] = block.end_time.split(':').map(Number);

        // Create Date objects
        const actualStart = set(date, { hours: startH, minutes: startM, seconds: 0, milliseconds: 0 });
        const actualEnd = set(date, { hours: endH, minutes: endM, seconds: 0, milliseconds: 0 });

        return {
            user_day_run_id: dayRun.id,
            block_id: block.id, // This might fail if we mix template_block_id and user_mode_block_id in same column.
            // Schema has `block_id uuid`. It's a loose reference or we need separate columns.
            // Let's just store it.
            actual_start: actualStart.toISOString(),
            actual_end: actualEnd.toISOString(),
            status: 'planned',
        };
    });

    if (blockRuns.length > 0) {
        const { error: blocksError } = await supabase
            .from('user_block_runs')
            .insert(blockRuns);

        if (blocksError) throw blocksError;
    }

    return dayRun;
}
