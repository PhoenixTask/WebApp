"use client";

import { GoogleOAuthProvider, useGoogleLogin } from "@react-oauth/google";
import { GoogleLoginAPI } from "@/services/user";
import { localeType } from "@/i18n/locales";
import { Button, Icon } from "../UI";

type Props = {
  locale: localeType;
};

function GoogleButton({ locale }: Props) {
  const login = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      const accessToken = tokenResponse.access_token;
      await GoogleLoginAPI({ tokenId: accessToken });
    },
    onError: (err) => {
      console.error("Google login error", err);
    },
  });

  const buttonText = locale === "fa" ? "ورود با گوگل" : "Sign in with Google";

  return (
    <Button
      dir="ltr"
      variant="base"
      size="full"
      onClick={() => login()}
      className="flex items-center justify-center gap-2"
    >
      <Icon iconName="Google" />
      <span className="mt-0.5">{buttonText}</span>
    </Button>
  );
}

export default function GoogleAuth({ locale }: Props) {
  return (
    <GoogleOAuthProvider clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID!}>
      <GoogleButton locale={locale} />
    </GoogleOAuthProvider>
  );
}
