import { auth } from "@/auth";
import { redirect } from 'next/navigation';
import React from 'react';

const CreatorSignUpPage = async () => {
  const session = await auth(); // Get session data

  // If the user is not signed in, redirect to login
  if (!session?.user) {
    redirect('/auth/signin'); // Redirect to sign-in page if not logged in
  }

  // Check if the role is 'creator'
  if (session.user.role === 'creator') {
    return (
      <div className='bg-gray-600 text-white w-full h-screen flex justify-center items-center text-xl'>
        Creator sign up
      </div>
    );
  }
  
  // If not 'creator', redirect to a different page
  redirect('/not-authorized'); // Or some other page for non-creators
};

export default CreatorSignUpPage;
