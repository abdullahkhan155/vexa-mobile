'use server';

import { getServiceSupabase } from '@/lib/supabase';

export async function submitDemo(formData: FormData) {
    const name = formData.get('name') as string;
    const email = formData.get('email') as string;

    if (!name || !email) {
        return { error: 'Name and email are required' };
    }

    try {
        const supabase = getServiceSupabase();

        // Check if table exists/insert data
        const { error } = await supabase
            .from('demo_requests')
            .insert([
                {
                    full_name: name,
                    email,
                    created_at: new Date().toISOString()
                }
            ]);

        if (error) {
            console.error('Supabase error:', error);
            // Helpful error message if table is missing
            if (error.code === '42P01') { // undefined_table
                return { error: 'Configuration Error: Table "demo_requests" does not exist.' };
            }
            return { error: 'Failed to submit request. Please try again.' };
        }

        return { success: true };
    } catch (err) {
        console.error('Submission error:', err);
        return { error: 'An unexpected error occurred.' };
    }
}
