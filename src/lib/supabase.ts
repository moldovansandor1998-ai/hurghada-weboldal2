import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://manmcuikrskjstcaqobj.supabase.co'
const supabaseAnonKey = 'sb_publishable_kvbfTNEvGdi8wOwqe9qcMw_EoDo3YMy'

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storageKey: 'hurghada-admin-session',
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true,
  },
})
