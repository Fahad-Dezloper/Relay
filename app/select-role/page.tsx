"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

const RoleSelectionPage = () => {
  const router = useRouter();
  const [role, setRole] = useState<string | null>(null);

  const handleRoleSelect = (selectedRole: string) => {
    setRole(selectedRole);
  };

  const handleContinue = () => {
    // Store role in localStorage
    localStorage.setItem("userRole", role ?? "");
    sessionStorage.setItem("userRole", role ?? "");
    // Redirect to the page where the role message will be shown
    router.push("/signup");
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-gray-600">
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-6">Select Your Role</h2>
        <div className="space-x-4 mb-6">
          <button
            className={`px-6 py-2 rounded-md ${
              role === "creator" ? "bg-blue-500 text-white" : "bg-gray-200"
            }`}
            onClick={() => handleRoleSelect("creator")}
          >
            Creator
          </button>
          <button
            className={`px-6 py-2 rounded-md ${
              role === "editor" ? "bg-blue-500 text-white" : "bg-gray-200"
            }`}
            onClick={() => handleRoleSelect("editor")}
          >
            Editor
          </button>
        </div>
        <button
          className="px-6 py-2 bg-green-500 text-white rounded-md"
          disabled={!role}
          onClick={handleContinue}
        >
          Continue
        </button>
      </div>
    </main>
  );
};

export default RoleSelectionPage;
