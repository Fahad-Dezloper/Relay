
import NextAuth from "next-auth"
import Google from "next-auth/providers/google"
import GitHub from "next-auth/providers/github"
 
export function cn() {
   const role = typeof window !== 'undefined' ? localStorage.getItem("userRole") : null; // Access localStorage only in the client
  console.log(role);
  return role;
}

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID!, // Use the client ID from .env.local
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!, // Use the client secret from .env.local
    }),
    GitHub({
      clientId: process.env.GITHUB_CLIENT_ID!, // Use the client ID from .env.local
      clientSecret: process.env.GITHUB_CLIENT_SECRET!,
    })],
  callbacks: {   
    async session({ session, token, user }) {
       // Call the cn function to get the role
      const role = cn(); // Get the role from localStorage

      if (role) {
        session.user.role = role; // Store the role in the session
      } 
      console.log(session)
      return session; // Return the modified session
    },
  }
})