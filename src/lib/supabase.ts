import { createClient, type SupabaseClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.PUBLIC_SUPABASE_URL || import.meta.env.SUPABASE_URL;
const supabaseAnonKey = import.meta.env.PUBLIC_SUPABASE_KEY || import.meta.env.PUBLIC_SUPABASE_ANON_KEY || import.meta.env.SUPABASE_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn("Supabase credentials not found. Make sure PUBLIC_SUPABASE_URL and PUBLIC_SUPABASE_KEY are set in your environment.");
}

export const supabase: SupabaseClient = supabaseUrl && supabaseAnonKey
  ? createClient(supabaseUrl, supabaseAnonKey)
  : new Proxy({} as any, {
      get() {
        throw new Error("Supabase client is not initialized because SUPABASE_URL or SUPABASE_KEY is missing in your environment.");
      }
    });

// Type definitions
export type Project = {
  id: string;
  name: string;
  description: string;
  long_description?: string;
  image_url?: string;
  live_link?: string;
  github_link?: string;
  status: 'active' | 'completed' | 'planned' | 'archived';
  role?: string;
  category: 'frontend' | 'fullstack' | 'backend' | 'ai' | 'web3';
  tech_stack: string[];
  key_features?: string[];
  metrics?: Record<string, any>;
  featured: boolean;
  order_num: number;
  views: number;
  created_at: string;
  updated_at: string;
  Type?: string;
};

export type Experience = {
  id: number;
  title: string;
  company: string;
  period: string;
  description: string;
  highlights: string[];
  logo_url?: string | null;
  link?: string | null;
};

export type Skill = {
  id: number;
  category: string;
  category_icon?: string;
  name: string;
  logo_url: string;
  order_num?: number;
};

export type ContactSubmission = {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  phone?: string;
  company?: string;
  purpose: 'hiring' | 'collaboration' | 'question' | 'other';
  read: boolean;
  replied: boolean;
  created_at: string;
  updated_at: string;
};

// Force fresh data on each page load
export async function fetchProjects(options = { noCache: false }) {
  try {
    const query = supabase
      .from('projects')
      .select('*')
      .neq('status', 'archived')
      .order('order_num', { ascending: true });
    
    const { data, error } = await query;
    
    if (error) throw error;
    return (data || []) as Project[];
  } catch (error) {
    console.error('Error fetching projects:', error);
    return [];
  }
}
// Fetch featured projects
export async function fetchFeaturedProjects() {
  try {
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .eq('featured', true)
      .eq('status', 'active')
      .order('order_num', { ascending: true })
      .limit(6);
    
    if (error) throw error;
    return (data || []) as Project[];
  } catch (error) {
    console.error('Error fetching featured projects:', error);
    return [];
  }
}

// Submit contact form
export async function submitContact(contact: Omit<ContactSubmission, 'id' | 'created_at' | 'updated_at' | 'read' | 'replied'>) {
  try {
    const { data, error } = await supabase
      .from('contact_submissions')
      .insert([{
        ...contact,
        read: false,
        replied: false,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      }])
      .select()
      .single();

    if (error) throw error;

    console.log('✓ Contact submission saved to Supabase:', data);
    return data as ContactSubmission;
  } catch (error) {
    console.error('Error submitting contact:', error);
    throw error;
  }
}

// Track page view
export async function trackPageView(page: string) {
  try {
    await supabase
      .from('analytics')
      .insert([{
        page,
        user_agent: typeof navigator !== 'undefined' ? navigator.userAgent : 'unknown',
        timestamp: new Date().toISOString(),
      }]);
  } catch (error) {
    console.error('Error tracking page view:', error);
  }
}

// Increment project views
export async function incrementProjectViews(projectId: string) {
  try {
    const { data: project, error: getError } = await supabase
      .from('projects')
      .select('views')
      .eq('id', projectId)
      .single();
    
    if (getError || !project) return;

    await supabase
      .from('projects')
      .update({ views: (project.views || 0) + 1 })
      .eq('id', projectId);
  } catch (error) {
    console.error('Error incrementing views:', error);
  }
}

// Fetch experience timeline from Supabase
export async function fetchExperience() {
  try {
    const { data, error } = await supabase
      .from('experience')
      .select('*')
      .order('id', { ascending: true });

    if (error) {
      console.error('Error fetching experience - Supabase error:', error.message);
      throw error;
    }

    if (!data || data.length === 0) {
      console.warn('No experience data found in Supabase. Please ensure the experience table is populated.');
    } else {
      console.log(`Successfully fetched ${data.length} experience entries from Supabase`);
    }

    return (data || []) as Experience[];
  } catch (error) {
    console.error('Error fetching experience:', error);
    // Return empty array on error, but log it for debugging
    return [];
  }
}

// Fetch skills from Supabase
export async function fetchSkills() {
  try {
    const { data, error } = await supabase
      .from('skills')
      .select('*')
      .order('order_num', { ascending: true });

    if (error) {
      console.warn('Error fetching skills from Supabase:', error.message);
      return [];
    }

    return (data || []) as Skill[];
  } catch (error) {
    console.error('Error fetching skills:', error);
    return [];
  }
}

