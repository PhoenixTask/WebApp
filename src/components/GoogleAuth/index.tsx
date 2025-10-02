"use client";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import { GoogleLoginAPI } from "@/services/user";

export default function GoogleAuth() {
  return (
    <GoogleOAuthProvider clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID!}>
      <GoogleLogin
        onSuccess={async (credentialResponse) => {
          const id_token = credentialResponse.credential as string;
          await GoogleLoginAPI({ tokenId: id_token });
        }}
      />
    </GoogleOAuthProvider>
  );
}
