import { signOut } from "@/lib/supabase/auth";
import { useAppDispatch } from "../hooks";
import { useRouter } from "next/navigation";
import { clearUser } from "../slices/auth-slice";

export function useLogout() {
  const router = useRouter();

  const dispatch = useAppDispatch();
  const logout = async () => {
    await signOut();

    dispatch(clearUser());

    router.push("/login");
  };

  return { logout };
}
