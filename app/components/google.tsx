
import { signIn } from "@/auth"
 
export async function Google() {
  await signIn("google")
} 