"use server"
import { signIn } from "@/auth"
 
export async function Github() {
  await signIn("github");
} 