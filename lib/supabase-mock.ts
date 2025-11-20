
export const createMockClient = () => ({
    auth: {
        getUser: async () => ({
            data: {
                user: {
                    id: 'mock-user-123',
                    email: 'demo@modes.app',
                    app_metadata: {},
                    user_metadata: {},
                    aud: 'authenticated',
                    created_at: new Date().toISOString()
                }
            },
            error: null
        }),
        getSession: async () => ({
            data: {
                session: {
                    access_token: 'mock-token',
                    refresh_token: 'mock-refresh',
                    expires_in: 3600,
                    token_type: 'bearer',
                    user: {
                        id: 'mock-user-123',
                        email: 'demo@modes.app',
                        app_metadata: {},
                        user_metadata: {},
                        aud: 'authenticated',
                        created_at: new Date().toISOString()
                    }
                }
            },
            error: null
        }),
        signInWithOtp: async () => ({ error: null }),
        signOut: async () => ({ error: null }),
        onAuthStateChange: () => ({ data: { subscription: { unsubscribe: () => { } } } }),
    },
    from: () => ({
        select: () => ({
            data: [],
            error: null,
            eq: function () { return this; },
            single: function () { return { data: null, error: null }; },
            order: function () { return this; },
            limit: function () { return this; }
        }),
        insert: () => ({ data: [], error: null, select: function () { return { data: [], error: null }; } }),
        update: () => ({ data: [], error: null, eq: function () { return this; }, select: function () { return { data: [], error: null }; } }),
        delete: () => ({ data: [], error: null, eq: function () { return this; } }),
    }),
});
