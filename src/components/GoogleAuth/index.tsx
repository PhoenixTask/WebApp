"use client";
import { useEffect } from "react";
import { GoogleLoginAPI } from "@/services/user";

declare global {
  interface Window {
    google: any;
  }
}

export default function GoogleAuth() {
  const handleGoogleLogin = async () => {
    try {
      if (!window.google) {
        throw new Error("Google script not loaded");
      }

      window.google.accounts.id.initialize({
        client_id: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
        callback: handleCredentialResponse,
      });

      // Trigger the One Tap UI or redirect to Google login
      window.google.accounts.id.renderButton(
        document.getElementById("google-button-container"),
        {
          type: "standard",
        }
      );
    } catch (err) {
      console.error("Google login error:", err);
    }
  };

  const handleCredentialResponse = async (response: any) => {
    try {
      const jwt = response.credential;
      await GoogleLoginAPI({ tokenId: jwt });
    } catch (err) {
      console.error("Google login error:", err);
    }
  };

  useEffect(() => {
    // Load Google Script
    const script = document.createElement("script");
    script.src = "https://accounts.google.com/gsi/client";
    script.async = true;
    script.defer = true;
    script.onload = () => {
      handleGoogleLogin();
    };
    document.head.appendChild(script);

    return () => {
      const existingScript = document.querySelector(
        'script[src="https://accounts.google.com/gsi/client"]'
      );
      if (existingScript) {
        existingScript.remove();
      }
    };
  }, []);

  return (
    <div className="w-full flex justify-center">
      <button id="google-button-container" />
    </div>
  );
}
