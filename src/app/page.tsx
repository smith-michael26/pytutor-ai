import { redirect } from "next/navigation";

export default function Home() {
  // Instantly redirects anyone visiting the root URL to the login page
  redirect("/login");
}
