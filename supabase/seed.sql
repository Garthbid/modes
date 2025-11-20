-- Insert Founders
INSERT INTO public.founders (slug, display_name, bio, is_active) VALUES
('elon', 'Elon Musk', 'Technoking of Tesla. Split your day between multiple billion-dollar companies.', true),
('jensen', 'Jensen Huang', 'CEO of NVIDIA. Run at light speed. The more you buy, the more you save.', true),
('beast', 'MrBeast', 'YouTube Philanthropist. Obsessive focus on content creation and optimization.', true);

-- Insert Day Templates
-- Elon
INSERT INTO public.day_templates (founder_id, name, description, is_default)
SELECT id, 'Elon Mode', 'Manage Tesla, SpaceX, and X in one day.', true
FROM public.founders WHERE slug = 'elon';

-- Jensen
INSERT INTO public.day_templates (founder_id, name, description, is_default)
SELECT id, 'Jensen Mode', 'Relentless execution and meetings.', true
FROM public.founders WHERE slug = 'jensen';

-- Beast
INSERT INTO public.day_templates (founder_id, name, description, is_default)
SELECT id, 'Beast Mode', 'Creative grind and production.', true
FROM public.founders WHERE slug = 'beast';

-- Insert Template Blocks
-- Elon Mode Blocks
WITH template AS (SELECT id FROM public.day_templates WHERE name = 'Elon Mode')
INSERT INTO public.template_blocks (day_template_id, mode_name, start_time, end_time, instructions, order_index) VALUES
((SELECT id FROM template), 'Tesla Mode', '09:00:00', '13:00:00', 'Focus on production hell and design reviews.', 1),
((SELECT id FROM template), 'SpaceX Mode', '13:00:00', '17:00:00', 'Starship development and launch logistics.', 2),
((SELECT id FROM template), 'X Mode', '17:00:00', '21:00:00', 'Algorithm review and posting.', 3),
((SELECT id FROM template), 'Game Mode', '21:00:00', '23:00:00', 'Decompress with Diablo IV.', 4);

-- Jensen Mode Blocks
WITH template AS (SELECT id FROM public.day_templates WHERE name = 'Jensen Mode')
INSERT INTO public.template_blocks (day_template_id, mode_name, start_time, end_time, instructions, order_index) VALUES
((SELECT id FROM template), 'Email Mode', '06:00:00', '08:00:00', 'Clear inbox. Short, direct responses.', 1),
((SELECT id FROM template), 'Meeting Mode', '08:00:00', '18:00:00', 'Back-to-back meetings. No agenda, just execution.', 2),
((SELECT id FROM template), 'Learning Mode', '18:00:00', '20:00:00', 'Study new technologies and research papers.', 3);

-- Beast Mode Blocks
WITH template AS (SELECT id FROM public.day_templates WHERE name = 'Beast Mode')
INSERT INTO public.template_blocks (day_template_id, mode_name, start_time, end_time, instructions, order_index) VALUES
((SELECT id FROM template), 'Brainstorm Mode', '10:00:00', '12:00:00', 'Generate 100 ideas. Pick the best one.', 1),
((SELECT id FROM template), 'Filming Mode', '12:00:00', '20:00:00', 'High energy recording. Perfectionism.', 2),
((SELECT id FROM template), 'Review Mode', '20:00:00', '22:00:00', 'Analyze thumbnails and retention graphs.', 3);
