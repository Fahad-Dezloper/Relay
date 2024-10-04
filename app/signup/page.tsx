"use client";
import React, { useEffect, useState } from "react";
import { signIn, useSession } from "next-auth/react"; // Import useSession
import { useRouter } from "next/navigation";

const WelcomePage = () => {
  const [role, setRole] = useState<string | null>(null);
  const { status } = useSession(); // Get session status (loading, authenticated, etc.)
    const router = useRouter();
    // const route = localStorage.getItem("userRole"); 
    // console.log("this is the role: ", route)

  // Redirect after successful login
  useEffect(() => {
    if (status === "authenticated") {
      router.push("/"); // Redirect to home when authenticated
    }
  }, [status, router]);

    const handleGithubSignIn = async () => {
    const role = localStorage.getItem("userRole"); // Get the role from localStorage
  console.log("Fetched role from localStorage:", role);
     const result = await signIn("github", { 
      redirect: false,
    callbackUrl: `/?role=${role}`, // You can specify where to redirect after sign-in
    });

    if (result?.ok) {
        console.log("Signed in successfully");
        router.push("/");
        // Optionally, log success
    } else {
      console.error(result?.error); // Handle the error case
    }
  };

    const handleGoogleSignIn = async () => {
      const role = localStorage.getItem("userRole"); // Get the role from localStorage
    const result = await signIn("google", { 
      redirect: false,
    callbackUrl: '/', // You can specify where to redirect after sign-in
    role: role // Pass the role here
    });

    if (result?.ok) {
        console.log("Signed in successfully");
         router.push("/");
    } else {
      console.error(result?.error);
    }
  };

  useEffect(() => {
    // Retrieve the role from localStorage
    const storedRole = localStorage.getItem("userRole");
    if (storedRole) {
      setRole(storedRole);
    }
  }, []); // This effect runs once when the component mounts

  return (
    <main className="flex flex-col gap-4 min-h-screen items-center justify-center bg-gray-600">
      <div className="text-center text-white">
        {role ? (
          <div className="flex flex-col gap-4">
            <h2 className="text-2xl font-bold flex flex-col gap-3">
              Welcome, {role === "creator" ? "Creator" : "Editor"} User!
            </h2>
            <button
              className="px-6 py-2 bg-black text-white rounded-md"
              onClick={handleGithubSignIn}
            >
              Sign in with GitHub
            </button>
            <button
              className="px-6 py-2 bg-green-300 text-white rounded-md"
              onClick={handleGoogleSignIn}
            >
              Sign in with Google
            </button>
          </div>
        ) : (
          <p className="text-2xl font-bold">Role not found. Please sign up again.</p>
        )}
      </div>
    </main>
  );
};

export default WelcomePage;
