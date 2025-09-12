import { createNavigation } from "next-intl/navigation";
import { defineRouting } from "next-intl/routing";
import { locales } from "./locales";

const routes = {
  root: "/",
  login: "/login",
  register: "/register",
  list: "/list",
  column: "/column",
  calendar: "/calendar",
  "personal-info": "/personal-info",
} as const;

type routeType = (typeof routes)[keyof typeof routes];

function sameForAllLocales(path: string) {
  return { en: path, fa: path };
}

export const routing = defineRouting({
  locales,
  defaultLocale: "en",
  localeDetection: true,
  localePrefix: "always",
  pathnames: {
    [routes.root]: sameForAllLocales(routes.root),
    [routes.login]: sameForAllLocales(routes.login),
    [routes.register]: sameForAllLocales(routes.register),
    [routes.list]: sameForAllLocales(routes.list),
    [routes.column]: sameForAllLocales(routes.column),
    [routes.calendar]: sameForAllLocales(routes.calendar),
    [routes["personal-info"]]: sameForAllLocales(routes["personal-info"]),
  },
});

export const { Link, redirect, usePathname, useRouter, getPathname } =
  createNavigation(routing);

export { routes, type routeType };
