// Mock data for testing without Supabase

export const MOCK_USER = {
    id: 'mock-user-123',
    email: 'demo@modes.app',
    default_wake_time: '07:00:00',
    onboarding_complete: true,
};

export const MOCK_FOUNDERS = [
    {
        id: 'elon-123',
        slug: 'elon',
        display_name: 'Elon Musk',
        bio: 'Technoking of Tesla, SpaceX CEO. 80-100 hour weeks split across multiple companies. Gaming late at night.',
        is_active: true,
        day_templates: [
            {
                id: 'elon-mon',
                name: 'Monday - Tesla & SpaceX',
                description: 'Factory updates, Starship reviews, deep engineering',
                days: ['Monday'],
                is_default: false,
                template_blocks: [
                    { id: 'elon-mon-1', mode_name: 'TeslaMode', start_time: '07:00:00', end_time: '09:00:00', instructions: 'Factory updates, engineering reviews, supply chain issues, design tweaks.', order_index: 1 },
                    { id: 'elon-mon-2', mode_name: 'SpaceXMode', start_time: '09:00:00', end_time: '12:00:00', instructions: 'Falcon, Starship, engine reviews, rapid iteration decisions.', order_index: 2 },
                    { id: 'elon-mon-3', mode_name: 'QuickFuelMode', start_time: '12:00:00', end_time: '13:00:00', instructions: 'Fast lunch (5-10 minutes). Emails while eating.', order_index: 3 },
                    { id: 'elon-mon-4', mode_name: 'TeslaMode (Deep Engineering)', start_time: '13:00:00', end_time: '17:00:00', instructions: 'Manufacturing bottlenecks, efficiency, constraints.', order_index: 4 },
                    { id: 'elon-mon-5', mode_name: 'DadMode', start_time: '17:00:00', end_time: '19:00:00', instructions: 'Kids + dinner.', order_index: 5 },
                    { id: 'elon-mon-6', mode_name: 'GameMode', start_time: '19:00:00', end_time: '22:00:00', instructions: 'Valorant, PUBG, Elden Ring.', order_index: 6 },
                    { id: 'elon-mon-7', mode_name: 'xAIMode', start_time: '22:00:00', end_time: '01:00:00', instructions: 'AI architecture, model direction, strategy.', order_index: 7 },
                ],
            },
            {
                id: 'elon-tue',
                name: 'Tuesday - SpaceX & Autopilot',
                description: 'Starship ROA, FSD reviews, Twitter war room',
                days: ['Tuesday'],
                is_default: false,
                template_blocks: [
                    { id: 'elon-tue-1', mode_name: 'SpaceXMode', start_time: '07:00:00', end_time: '12:00:00', instructions: 'Starship ROA, Raptor issues, launch cadence.', order_index: 1 },
                    { id: 'elon-tue-2', mode_name: 'WalkingMeetingsMode', start_time: '12:00:00', end_time: '13:00:00', instructions: 'Walking meetings.', order_index: 2 },
                    { id: 'elon-tue-3', mode_name: 'TeslaAutopilotMode', start_time: '13:00:00', end_time: '17:00:00', instructions: 'Autonomy, robotics, FSD revision reviews.', order_index: 3 },
                    { id: 'elon-tue-4', mode_name: 'DadMode', start_time: '17:00:00', end_time: '19:00:00', instructions: 'Kids + dinner.', order_index: 4 },
                    { id: 'elon-tue-5', mode_name: 'TwitterWarRoomMode', start_time: '19:00:00', end_time: '01:00:00', instructions: 'X policy, updates, algorithm discussions.', order_index: 5 },
                ],
            },
            {
                id: 'elon-wed',
                name: 'Wednesday - Neuralink & Tesla',
                description: 'Brain-machine interface, Cybertruck, late gaming',
                days: ['Wednesday'],
                is_default: false,
                template_blocks: [
                    { id: 'elon-wed-1', mode_name: 'NeuralinkMode', start_time: '07:00:00', end_time: '11:00:00', instructions: 'Brain-machine interface updates, surgery readiness, regulatory.', order_index: 1 },
                    { id: 'elon-wed-2', mode_name: 'TeslaMode', start_time: '11:00:00', end_time: '17:00:00', instructions: 'Vehicle engineering, Cybertruck issues, design + ramp.', order_index: 2 },
                    { id: 'elon-wed-3', mode_name: 'DadMode', start_time: '18:00:00', end_time: '20:00:00', instructions: 'Kids + family time.', order_index: 3 },
                    { id: 'elon-wed-4', mode_name: 'GameMode', start_time: '20:00:00', end_time: '01:00:00', instructions: 'Late-night gaming, decompressing.', order_index: 4 },
                ],
            },
            {
                id: 'elon-thu',
                name: 'Thursday - SpaceX & xAI',
                description: 'Rocket engineering, AI breakthroughs, X operations',
                days: ['Thursday'],
                is_default: false,
                template_blocks: [
                    { id: 'elon-thu-1', mode_name: 'SpaceXMode', start_time: '07:00:00', end_time: '12:00:00', instructions: 'Rocket engineering, launch prep.', order_index: 1 },
                    { id: 'elon-thu-2', mode_name: 'xAIMode', start_time: '13:00:00', end_time: '18:00:00', instructions: 'AI breakthroughs, compute scaling, infrastructure.', order_index: 2 },
                    { id: 'elon-thu-3', mode_name: 'Twitter/XMode', start_time: '19:00:00', end_time: '01:00:00', instructions: 'Operational fixes, product decisions.', order_index: 3 },
                ],
            },
            {
                id: 'elon-fri',
                name: 'Friday - Tesla, Media & Gaming',
                description: 'Manufacturing, interviews, SpaceX, gaming',
                days: ['Friday'],
                is_default: false,
                template_blocks: [
                    { id: 'elon-fri-1', mode_name: 'TeslaMode', start_time: '07:00:00', end_time: '12:00:00', instructions: 'Manufacturing and production.', order_index: 1 },
                    { id: 'elon-fri-2', mode_name: 'MediaMode', start_time: '12:00:00', end_time: '15:00:00', instructions: 'Interviews, public statements, investor calls.', order_index: 2 },
                    { id: 'elon-fri-3', mode_name: 'SpaceXMode', start_time: '15:00:00', end_time: '18:00:00', instructions: 'End of week reviews.', order_index: 3 },
                    { id: 'elon-fri-4', mode_name: 'GameMode', start_time: '19:00:00', end_time: '01:00:00', instructions: 'Gaming and decompression.', order_index: 4 },
                ],
            },
            {
                id: 'elon-sat',
                name: 'Saturday - Family & Engineering',
                description: 'Kids, deep engineering work, gaming',
                days: ['Saturday'],
                is_default: false,
                template_blocks: [
                    { id: 'elon-sat-1', mode_name: 'DadMode', start_time: '10:00:00', end_time: '14:00:00', instructions: 'Kids, activities, relaxed.', order_index: 1 },
                    { id: 'elon-sat-2', mode_name: 'EngineeringSandboxMode', start_time: '14:00:00', end_time: '19:00:00', instructions: 'Deep solitary engineering work (what he enjoys most).', order_index: 2 },
                    { id: 'elon-sat-3', mode_name: 'GameMode', start_time: '19:00:00', end_time: '01:00:00', instructions: 'Gaming.', order_index: 3 },
                ],
            },
            {
                id: 'elon-sun',
                name: 'Sunday - Strategy & Family',
                description: 'High-level thinking, family time, gaming',
                days: ['Sunday'],
                is_default: true,
                template_blocks: [
                    { id: 'elon-sun-1', mode_name: 'StrategyMode', start_time: '10:00:00', end_time: '16:00:00', instructions: 'High-level thinking, planning, notebooks, reflection.', order_index: 1 },
                    { id: 'elon-sun-2', mode_name: 'FamilyMode', start_time: '16:00:00', end_time: '20:00:00', instructions: 'Family time.', order_index: 2 },
                    { id: 'elon-sun-3', mode_name: 'GameMode', start_time: '20:00:00', end_time: '01:00:00', instructions: 'Gaming.', order_index: 3 },
                ],
            },
        ],
    },
    {
        id: 'ellison-123',
        slug: 'ellison',
        display_name: 'Larry Ellison',
        bio: 'Oracle founder. Late riser, jiu-jitsu, sailing, running Oracle from Hawaii estate.',
        is_active: true,
        day_templates: [
            {
                id: 'ellison-mon',
                name: 'Monday - Oracle & Training',
                description: 'Remote exec meetings, jiu-jitsu, cloud strategy',
                days: ['Monday'],
                is_default: false,
                template_blocks: [
                    { id: 'ellison-mon-1', mode_name: 'OracleMode', start_time: '09:00:00', end_time: '11:00:00', instructions: 'Remote exec meetings, product strategy, top-level decisions.', order_index: 1 },
                    { id: 'ellison-mon-2', mode_name: 'TrainingMode', start_time: '11:00:00', end_time: '13:00:00', instructions: 'Jiu-jitsu, tennis, gym.', order_index: 2 },
                    { id: 'ellison-mon-3', mode_name: 'IslandLunchMode', start_time: '13:00:00', end_time: '14:00:00', instructions: 'Mediterranean diet lunch.', order_index: 3 },
                    { id: 'ellison-mon-4', mode_name: 'CloudStrategyMode', start_time: '14:00:00', end_time: '18:00:00', instructions: 'OCI, database innovation, competitive analysis.', order_index: 4 },
                ],
            },
            {
                id: 'ellison-tue',
                name: 'Tuesday - Oracle & M&A',
                description: 'Exec meetings, recovery, AI acquisitions',
                days: ['Tuesday'],
                is_default: false,
                template_blocks: [
                    { id: 'ellison-tue-1', mode_name: 'OracleMode', start_time: '09:00:00', end_time: '12:00:00', instructions: 'Executive meetings and strategy.', order_index: 1 },
                    { id: 'ellison-tue-2', mode_name: 'RecoveryMode', start_time: '12:00:00', end_time: '13:00:00', instructions: 'Rest and recovery.', order_index: 2 },
                    { id: 'ellison-tue-3', mode_name: 'AIAcquisitionMode', start_time: '13:00:00', end_time: '18:00:00', instructions: 'Evaluating companies, reading briefs, strategic M&A.', order_index: 3 },
                ],
            },
            {
                id: 'ellison-wed',
                name: 'Wednesday - Oracle & Tech',
                description: 'Exec meetings, meditation, CTO deep dive',
                days: ['Wednesday'],
                is_default: false,
                template_blocks: [
                    { id: 'ellison-wed-1', mode_name: 'OracleMode', start_time: '09:00:00', end_time: '12:00:00', instructions: 'Executive oversight.', order_index: 1 },
                    { id: 'ellison-wed-2', mode_name: 'MeditationMode', start_time: '12:00:00', end_time: '13:00:00', instructions: 'Mindfulness and meditation.', order_index: 2 },
                    { id: 'ellison-wed-3', mode_name: 'CTODeepDiveMode', start_time: '13:00:00', end_time: '18:00:00', instructions: 'Hands-on tech review, engineering sessions, architecture.', order_index: 3 },
                ],
            },
            {
                id: 'ellison-thu',
                name: 'Thursday - Sailing & Product',
                description: 'Oracle meetings, sailing, product review',
                days: ['Thursday'],
                is_default: false,
                template_blocks: [
                    { id: 'ellison-thu-1', mode_name: 'OracleMode', start_time: '09:00:00', end_time: '11:00:00', instructions: 'Morning executive sync.', order_index: 1 },
                    { id: 'ellison-thu-2', mode_name: 'SailMode', start_time: '11:00:00', end_time: '15:00:00', instructions: 'His favorite pastime - sailing.', order_index: 2 },
                    { id: 'ellison-thu-3', mode_name: 'ProductReviewMode', start_time: '15:00:00', end_time: '18:00:00', instructions: 'Product reviews and feedback.', order_index: 3 },
                ],
            },
            {
                id: 'ellison-fri',
                name: 'Friday - Oracle & Future Tech',
                description: 'Exec meetings, training, future tech exploration',
                days: ['Friday'],
                is_default: false,
                template_blocks: [
                    { id: 'ellison-fri-1', mode_name: 'OracleMode', start_time: '09:00:00', end_time: '12:00:00', instructions: 'End of week executive sync.', order_index: 1 },
                    { id: 'ellison-fri-2', mode_name: 'TrainingMode', start_time: '12:00:00', end_time: '14:00:00', instructions: 'Physical training.', order_index: 2 },
                    { id: 'ellison-fri-3', mode_name: 'FutureTechMode', start_time: '14:00:00', end_time: '18:00:00', instructions: 'AI, biotech, horizon tech.', order_index: 3 },
                ],
            },
            {
                id: 'ellison-sat',
                name: 'Saturday - Sailing & Social',
                description: 'All day on the water, evening socializing',
                days: ['Saturday'],
                is_default: false,
                template_blocks: [
                    { id: 'ellison-sat-1', mode_name: 'SailMode', start_time: '10:00:00', end_time: '18:00:00', instructions: 'All day on the water.', order_index: 1 },
                    { id: 'ellison-sat-2', mode_name: 'SocialMode', start_time: '19:00:00', end_time: '23:00:00', instructions: 'Dinner, friends, high-status socializing.', order_index: 2 },
                ],
            },
            {
                id: 'ellison-sun',
                name: 'Sunday - Family, Tennis & Planning',
                description: 'Family time, tennis, strategic planning',
                days: ['Sunday'],
                is_default: true,
                template_blocks: [
                    { id: 'ellison-sun-1', mode_name: 'FamilyMode', start_time: '10:00:00', end_time: '14:00:00', instructions: 'Family time.', order_index: 1 },
                    { id: 'ellison-sun-2', mode_name: 'TennisMode', start_time: '14:00:00', end_time: '18:00:00', instructions: 'Tennis and recreation.', order_index: 2 },
                    { id: 'ellison-sun-3', mode_name: 'PlanningMode', start_time: '18:00:00', end_time: '22:00:00', instructions: 'Strategic planning for the week.', order_index: 3 },
                ],
            },
        ],
    },
    {
        id: 'jensen-123',
        slug: 'jensen',
        display_name: 'Jensen Huang',
        bio: 'NVIDIA CEO. 4am wake-ups, relentless work ethic, black leather jacket, Sunday thinking walks.',
        is_active: true,
        day_templates: [
            {
                id: 'jensen-mon',
                name: 'Monday - Deep Work & Engineering',
                description: '4am start, architecture thinking, GPU roadmap',
                days: ['Monday'],
                is_default: false,
                template_blocks: [
                    { id: 'jensen-mon-1', mode_name: 'DeepWorkMode', start_time: '04:00:00', end_time: '08:00:00', instructions: 'Architecture thinking before world wakes up.', order_index: 1 },
                    { id: 'jensen-mon-2', mode_name: 'NVidiaMode', start_time: '08:00:00', end_time: '12:00:00', instructions: 'Meetings, roadmap, GPU/runtime/AI/lab work.', order_index: 2 },
                    { id: 'jensen-mon-3', mode_name: 'ProteinLunchMode', start_time: '12:00:00', end_time: '13:00:00', instructions: 'Quick protein-focused lunch.', order_index: 3 },
                    { id: 'jensen-mon-4', mode_name: 'EngineeringSyncMode', start_time: '13:00:00', end_time: '19:00:00', instructions: 'CUDA, H100/H200 direction, model acceleration.', order_index: 4 },
                ],
            },
            {
                id: 'jensen-tue',
                name: 'Tuesday - Research & Enterprise',
                description: 'Early research, hyperscaler deals, lab floor work',
                days: ['Tuesday'],
                is_default: false,
                template_blocks: [
                    { id: 'jensen-tue-1', mode_name: 'ResearchMode', start_time: '04:00:00', end_time: '08:00:00', instructions: 'Deep research and reading.', order_index: 1 },
                    { id: 'jensen-tue-2', mode_name: 'EnterpriseMode', start_time: '08:00:00', end_time: '12:00:00', instructions: 'Partners, cloud vendors, hyperscaler deals.', order_index: 2 },
                    { id: 'jensen-tue-3', mode_name: 'LabFloorMode', start_time: '13:00:00', end_time: '19:00:00', instructions: 'Real work: chips, benches, engineers.', order_index: 3 },
                ],
            },
            {
                id: 'jensen-wed',
                name: 'Wednesday - AI Infrastructure',
                description: 'Notebook time, Blackwell, GPU clusters',
                days: ['Wednesday'],
                is_default: false,
                template_blocks: [
                    { id: 'jensen-wed-1', mode_name: 'NotebookMode', start_time: '04:00:00', end_time: '08:00:00', instructions: 'Writing and strategic thinking.', order_index: 1 },
                    { id: 'jensen-wed-2', mode_name: 'AIInfrastructureMode', start_time: '08:00:00', end_time: '18:00:00', instructions: 'Blackwell, GPU clusters, architecture.', order_index: 2 },
                ],
            },
            {
                id: 'jensen-thu',
                name: 'Thursday - Developer Ecosystem',
                description: 'Silent reflection, software stack, PyTorch/CUDA',
                days: ['Thursday'],
                is_default: false,
                template_blocks: [
                    { id: 'jensen-thu-1', mode_name: 'SilenceMode', start_time: '04:00:00', end_time: '08:00:00', instructions: 'Silent contemplation and focus.', order_index: 1 },
                    { id: 'jensen-thu-2', mode_name: 'DeveloperMode', start_time: '08:00:00', end_time: '18:00:00', instructions: 'Ecosystem, software stack, PyTorch/CUDA unification.', order_index: 2 },
                ],
            },
            {
                id: 'jensen-fri',
                name: 'Friday - All Hands',
                description: 'Founder walk, internal alignment',
                days: ['Friday'],
                is_default: false,
                template_blocks: [
                    { id: 'jensen-fri-1', mode_name: 'FounderWalkMode', start_time: '04:00:00', end_time: '08:00:00', instructions: 'Morning walk and reflection.', order_index: 1 },
                    { id: 'jensen-fri-2', mode_name: 'AllHandsMode', start_time: '08:00:00', end_time: '18:00:00', instructions: 'Internal meetings, org alignment.', order_index: 2 },
                ],
            },
            {
                id: 'jensen-sat',
                name: 'Saturday - Craft',
                description: 'Still working - design, strategy, papers',
                days: ['Saturday'],
                is_default: false,
                template_blocks: [
                    { id: 'jensen-sat-1', mode_name: 'CraftMode', start_time: '08:00:00', end_time: '18:00:00', instructions: 'Still working — design, strategy, reading papers.', order_index: 1 },
                ],
            },
            {
                id: 'jensen-sun',
                name: 'Sunday - Reflection Walk',
                description: 'Famous long walk for planning, family time',
                days: ['Sunday'],
                is_default: true,
                template_blocks: [
                    { id: 'jensen-sun-1', mode_name: 'ReflectionWalkMode', start_time: '10:00:00', end_time: '15:00:00', instructions: 'His famous long walk, where he plans everything.', order_index: 1 },
                    { id: 'jensen-sun-2', mode_name: 'FamilyMode', start_time: '15:00:00', end_time: '19:00:00', instructions: 'Family time.', order_index: 2 },
                ],
            },
        ],
    },
    {
        id: 'zuck-123',
        slug: 'zuck',
        display_name: 'Mark Zuckerberg',
        bio: 'Meta CEO. Early workouts, Meta AI/AR, BJJ + MMA, hunting, disciplined tech building.',
        is_active: true,
        day_templates: [
            {
                id: 'zuck-mon',
                name: 'Monday - AI/AR & Jiu-Jitsu',
                description: 'Extreme fitness, Meta AI, product deep dive, BJJ',
                days: ['Monday'],
                is_default: false,
                template_blocks: [
                    { id: 'zuck-mon-1', mode_name: 'ExtremeFitnessMode', start_time: '06:00:00', end_time: '07:00:00', instructions: 'Weights + conditioning.', order_index: 1 },
                    { id: 'zuck-mon-2', mode_name: 'FamilyBreakfastMode', start_time: '07:00:00', end_time: '09:00:00', instructions: 'Family breakfast time.', order_index: 2 },
                    { id: 'zuck-mon-3', mode_name: 'MetaAI/ARMode', start_time: '09:00:00', end_time: '12:00:00', instructions: 'LLMs, Llama, Meta Ray-Ban, VR/AR.', order_index: 3 },
                    { id: 'zuck-mon-4', mode_name: 'ProteinBowlMode', start_time: '12:00:00', end_time: '13:00:00', instructions: 'Healthy lunch.', order_index: 4 },
                    { id: 'zuck-mon-5', mode_name: 'ProductDeepDiveMode', start_time: '13:00:00', end_time: '17:00:00', instructions: 'Building with teams.', order_index: 5 },
                    { id: 'zuck-mon-6', mode_name: 'JiuJitsuMode', start_time: '17:00:00', end_time: '19:00:00', instructions: 'BJJ training.', order_index: 6 },
                    { id: 'zuck-mon-7', mode_name: 'ReadingMode', start_time: '19:00:00', end_time: '22:00:00', instructions: 'Papers, geopolitics, strategy.', order_index: 7 },
                ],
            },
            {
                id: 'zuck-tue',
                name: 'Tuesday - Meta Platform',
                description: 'Running, Facebook/Instagram/Threads work',
                days: ['Tuesday'],
                is_default: false,
                template_blocks: [
                    { id: 'zuck-tue-1', mode_name: 'RunMode', start_time: '06:00:00', end_time: '07:00:00', instructions: 'Morning run.', order_index: 1 },
                    { id: 'zuck-tue-2', mode_name: 'MetaPlatformMode', start_time: '09:00:00', end_time: '17:00:00', instructions: 'Facebook, Instagram, Threads.', order_index: 2 },
                ],
            },
            {
                id: 'zuck-wed',
                name: 'Wednesday - Metaverse & BJJ',
                description: 'Strength training, VR work, jiu-jitsu',
                days: ['Wednesday'],
                is_default: false,
                template_blocks: [
                    { id: 'zuck-wed-1', mode_name: 'StrengthMode', start_time: '06:00:00', end_time: '07:00:00', instructions: 'Strength training.', order_index: 1 },
                    { id: 'zuck-wed-2', mode_name: 'MetaverseMode', start_time: '09:00:00', end_time: '17:00:00', instructions: 'Horizon, VR interactions, avatars.', order_index: 2 },
                    { id: 'zuck-wed-3', mode_name: 'JiuJitsuMode', start_time: '17:00:00', end_time: '19:00:00', instructions: 'BJJ training.', order_index: 3 },
                ],
            },
            {
                id: 'zuck-thu',
                name: 'Thursday - AI Growth & Family',
                description: 'MMA sparring, enterprise AI, family time',
                days: ['Thursday'],
                is_default: false,
                template_blocks: [
                    { id: 'zuck-thu-1', mode_name: 'CombatMode', start_time: '06:00:00', end_time: '07:00:00', instructions: 'MMA sparring.', order_index: 1 },
                    { id: 'zuck-thu-2', mode_name: 'AIGrowthMode', start_time: '09:00:00', end_time: '17:00:00', instructions: 'Enterprise AI, infra.', order_index: 2 },
                    { id: 'zuck-thu-3', mode_name: 'FamilyMode', start_time: '17:00:00', end_time: '21:00:00', instructions: 'Family time.', order_index: 3 },
                ],
            },
            {
                id: 'zuck-fri',
                name: 'Friday - Founder Review',
                description: 'Weights, all-hands, long run',
                days: ['Friday'],
                is_default: false,
                template_blocks: [
                    { id: 'zuck-fri-1', mode_name: 'WeightsMode', start_time: '06:00:00', end_time: '07:00:00', instructions: 'Weight training.', order_index: 1 },
                    { id: 'zuck-fri-2', mode_name: 'FounderReviewMode', start_time: '09:00:00', end_time: '15:00:00', instructions: 'All-hands, KPI reviews.', order_index: 2 },
                    { id: 'zuck-fri-3', mode_name: 'LongRunMode', start_time: '15:00:00', end_time: '19:00:00', instructions: 'Extended running session.', order_index: 3 },
                ],
            },
            {
                id: 'zuck-sat',
                name: 'Saturday - Hunt & Family',
                description: 'Bow hunting, family time, relaxation',
                days: ['Saturday'],
                is_default: false,
                template_blocks: [
                    { id: 'zuck-sat-1', mode_name: 'HuntMode', start_time: '08:00:00', end_time: '14:00:00', instructions: 'A real thing Zuck does: bow hunting.', order_index: 1 },
                    { id: 'zuck-sat-2', mode_name: 'FamilyMode', start_time: '14:00:00', end_time: '18:00:00', instructions: 'Family time.', order_index: 2 },
                    { id: 'zuck-sat-3', mode_name: 'ChillMode', start_time: '18:00:00', end_time: '23:00:00', instructions: 'Relaxation and downtime.', order_index: 3 },
                ],
            },
            {
                id: 'zuck-sun',
                name: 'Sunday - Strategy & Surf',
                description: 'Strategic thinking, foil surfing, quiet evening',
                days: ['Sunday'],
                is_default: true,
                template_blocks: [
                    { id: 'zuck-sun-1', mode_name: 'StrategyMode', start_time: '09:00:00', end_time: '13:00:00', instructions: 'Strategic planning and thinking.', order_index: 1 },
                    { id: 'zuck-sun-2', mode_name: 'SurfMode', start_time: '13:00:00', end_time: '18:00:00', instructions: 'Foil surfing + ocean time.', order_index: 2 },
                    { id: 'zuck-sun-3', mode_name: 'QuietEveningMode', start_time: '18:00:00', end_time: '22:00:00', instructions: 'Quiet family evening.', order_index: 3 },
                ],
            },
        ],
    },
    {
        id: 'bezos-123',
        slug: 'bezos',
        display_name: 'Jeff Bezos',
        bio: 'Amazon founder, Blue Origin. Slow mornings, high-IQ meetings, long-term thinking, disciplined decisions.',
        is_active: true,
        day_templates: [
            {
                id: 'bezos-mon',
                name: 'Monday - Amazon Strategy',
                description: 'Slow morning, high-IQ meetings, Amazon CX focus',
                days: ['Monday'],
                is_default: false,
                template_blocks: [
                    { id: 'bezos-mon-1', mode_name: 'PutterMode', start_time: '07:00:00', end_time: '09:00:00', instructions: 'Slow morning. Read, breakfast, no rushing.', order_index: 1 },
                    { id: 'bezos-mon-2', mode_name: 'HighIQMeetingsMode', start_time: '09:00:00', end_time: '12:00:00', instructions: 'He only schedules big decisions in the morning.', order_index: 2 },
                    { id: 'bezos-mon-3', mode_name: 'PowerLunchMode', start_time: '12:00:00', end_time: '13:00:00', instructions: 'Strategic lunch.', order_index: 3 },
                    { id: 'bezos-mon-4', mode_name: 'AmazonStrategyMode', start_time: '13:00:00', end_time: '17:00:00', instructions: 'CX, supply chain, logistics.', order_index: 4 },
                ],
            },
            {
                id: 'bezos-tue',
                name: 'Tuesday - Blue Origin',
                description: 'Workout, high-IQ meetings, space focus',
                days: ['Tuesday'],
                is_default: false,
                template_blocks: [
                    { id: 'bezos-tue-1', mode_name: 'WorkoutMode', start_time: '07:00:00', end_time: '09:00:00', instructions: 'Morning workout routine.', order_index: 1 },
                    { id: 'bezos-tue-2', mode_name: 'HighIQMeetingsMode', start_time: '09:00:00', end_time: '12:00:00', instructions: 'Strategic decision-making.', order_index: 2 },
                    { id: 'bezos-tue-3', mode_name: 'BlueOriginMode', start_time: '13:00:00', end_time: '17:00:00', instructions: 'Space, rockets, long-term thinking.', order_index: 3 },
                ],
            },
            {
                id: 'bezos-wed',
                name: 'Wednesday - Innovation',
                description: 'Family start, Amazon future, innovation, gym',
                days: ['Wednesday'],
                is_default: false,
                template_blocks: [
                    { id: 'bezos-wed-1', mode_name: 'FamilyStartMode', start_time: '07:00:00', end_time: '09:00:00', instructions: 'Family breakfast time.', order_index: 1 },
                    { id: 'bezos-wed-2', mode_name: 'AmazonFutureMode', start_time: '09:00:00', end_time: '12:00:00', instructions: 'Future planning and innovation.', order_index: 2 },
                    { id: 'bezos-wed-3', mode_name: 'InnovationMode', start_time: '13:00:00', end_time: '16:00:00', instructions: 'New ideas and experimentation.', order_index: 3 },
                    { id: 'bezos-wed-4', mode_name: 'GymMode', start_time: '16:00:00', end_time: '19:00:00', instructions: 'Extended workout session.', order_index: 4 },
                ],
            },
            {
                id: 'bezos-thu',
                name: 'Thursday - Blue Origin Deep Dive',
                description: 'Reading, high-IQ meetings, Blue Origin focus',
                days: ['Thursday'],
                is_default: false,
                template_blocks: [
                    { id: 'bezos-thu-1', mode_name: 'ReadingMode', start_time: '07:00:00', end_time: '09:00:00', instructions: 'Morning reading and learning.', order_index: 1 },
                    { id: 'bezos-thu-2', mode_name: 'HighIQMeetingsMode', start_time: '09:00:00', end_time: '12:00:00', instructions: 'Critical decision meetings.', order_index: 2 },
                    { id: 'bezos-thu-3', mode_name: 'BlueOriginMode', start_time: '12:00:00', end_time: '17:00:00', instructions: 'Deep space work.', order_index: 3 },
                ],
            },
            {
                id: 'bezos-fri',
                name: 'Friday - Health & Investment',
                description: 'Longevity focus, Amazon work, investments',
                days: ['Friday'],
                is_default: false,
                template_blocks: [
                    { id: 'bezos-fri-1', mode_name: 'HealthMode', start_time: '07:00:00', end_time: '10:00:00', instructions: 'Weights + longevity.', order_index: 1 },
                    { id: 'bezos-fri-2', mode_name: 'AmazonMode', start_time: '10:00:00', end_time: '14:00:00', instructions: 'Amazon oversight.', order_index: 2 },
                    { id: 'bezos-fri-3', mode_name: 'InvestmentMode', start_time: '14:00:00', end_time: '18:00:00', instructions: 'Climate fund, startups, philanthropy.', order_index: 3 },
                ],
            },
            {
                id: 'bezos-sat',
                name: 'Saturday - Leisure & Social',
                description: 'Family time, leisure activities, socializing',
                days: ['Saturday'],
                is_default: false,
                template_blocks: [
                    { id: 'bezos-sat-1', mode_name: 'FamilyMode', start_time: '09:00:00', end_time: '14:00:00', instructions: 'Family activities.', order_index: 1 },
                    { id: 'bezos-sat-2', mode_name: 'LeisureMode', start_time: '14:00:00', end_time: '18:00:00', instructions: 'Personal leisure time.', order_index: 2 },
                    { id: 'bezos-sat-3', mode_name: 'SocialMode', start_time: '18:00:00', end_time: '23:00:00', instructions: 'Social events and networking.', order_index: 3 },
                ],
            },
            {
                id: 'bezos-sun',
                name: 'Sunday - Strategy & Partner',
                description: 'Long-term planning, partner time',
                days: ['Sunday'],
                is_default: true,
                template_blocks: [
                    { id: 'bezos-sun-1', mode_name: 'StrategyMode', start_time: '09:00:00', end_time: '15:00:00', instructions: 'Notebook, annual planning, long-term work.', order_index: 1 },
                    { id: 'bezos-sun-2', mode_name: 'PartnerMode', start_time: '15:00:00', end_time: '21:00:00', instructions: 'Quality time with partner.', order_index: 2 },
                ],
            },
        ],
    },
];

// Helper function to get day name from date
function getDayName(date: Date): string {
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    return days[date.getDay()];
}

// Helper function to generate schedule for a specific date
export function generateMockScheduleForDate(date: Date, founderId: string = 'elon-123') {
    const founder = MOCK_FOUNDERS.find(f => f.id === founderId);
    if (!founder) return null;

    const dayName = getDayName(date);

    // Find the template for this day
    const template = founder.day_templates.find(t => t.days.includes(dayName));
    if (!template) return null;

    // Convert template blocks to user_block_runs with actual timestamps
    const user_block_runs = template.template_blocks.map(block => {
        const [startHour, startMin] = block.start_time.split(':').map(Number);
        const [endHour, endMin] = block.end_time.split(':').map(Number);

        const actualStart = new Date(date);
        actualStart.setHours(startHour, startMin, 0, 0);

        const actualEnd = new Date(date);
        actualEnd.setHours(endHour, endMin, 0, 0);

        return {
            id: block.id,
            label: block.mode_name,
            actual_start: actualStart.toISOString(),
            actual_end: actualEnd.toISOString(),
            status: 'planned',
            instructions: block.instructions,
        };
    });

    return {
        id: `day-run-${date.toISOString().split('T')[0]}`,
        user_id: 'mock-user-123',
        date: date.toISOString().split('T')[0],
        status: 'in_progress',
        activeTemplate: {
            name: template.name,
            description: template.description,
        },
        user_block_runs,
    };
}

// Generate today's schedule
export const MOCK_SCHEDULE = generateMockScheduleForDate(new Date(), 'elon-123');

export const USE_MOCK_DATA = true; // process.env.NEXT_PUBLIC_USE_MOCK === 'true';

