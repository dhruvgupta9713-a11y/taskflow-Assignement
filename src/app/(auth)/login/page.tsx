import { LoginForm } from "@/components/auth/LoginForm";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sign In — TaskFlow",
  description: "Sign in to your TaskFlow workspace to manage tasks and collaborate with your team.",
};

export default function LoginPage() {
  return <LoginForm />;
}
