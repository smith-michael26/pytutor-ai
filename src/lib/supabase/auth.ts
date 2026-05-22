import { createClient } from "./client";

export async function signIn(email: string, password: string) {
  const supabase = createClient();

  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  return { data, error };
}

export async function signUp(
  fullname: string,
  email: string,
  password: string,
) {
  const supabase = createClient();

  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        full_name: fullname,
      },
    },
  });

  return { data, error };
}

export async function signOut() {
  const supabase = createClient();

  const error = await supabase.auth.signOut();

  return { error };
}

export async function resetPassword(email: string) {
  const supabase = createClient();

  const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${window.location.origin}/auth/callback?next=/reset-password`,
  });

  return { data, error };
}

export async function updatePassword(newPassword: string) {
  const supabase = createClient();

  const { data, error } = await supabase.auth.updateUser({
    password: newPassword,
  });

  return { data, error };
}

export async function checkEmailExists(email: string) {
  const supabase = createClient();

  const { data, error } = await supabase.rpc("check_user_email_exists", {
    lookup_email: email,
  });

  if (error) {
    console.error("Error checking email:", error);
    return false;
  }

  return data;
}
