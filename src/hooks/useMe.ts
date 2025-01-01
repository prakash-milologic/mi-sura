import { createBrowserClient } from "@supabase/ssr";
import { useQuery } from "@tanstack/react-query";

function getMe() {
  // Create a supabase client on the browser with project's credentials
  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  return supabase.auth.getUser();
}

export const useMe = () => {
  return useQuery({
    queryKey: ["me"],
    queryFn: getMe,
    // gcTime: 0, // set the cache time to 0 to prevent caching user session
  });
};
