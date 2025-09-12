import createMiddleware from "next-intl/middleware";
import { routing } from "./src/i18n/routing";

export default createMiddleware({
  ...routing,
});

export const config = {
  matcher:
    "/((?!api|_next|_vercel|favicon\\.ico|sitemap\\.xml|robots\\.txt|manifest\\.webmanifest|.*\\.[a-zA-Z0-9]+$).*)",
};
