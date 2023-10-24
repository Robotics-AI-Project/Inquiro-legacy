"use client";
import { Button } from "@/components/ui/button";
import { ROUTES, navSidebar } from "@/constants/nav";
import { ChevronRight } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import React, { Fragment } from "react";

type Props = {};

const generatePathParts = (pathStr: string) => {
  const pathWithoutQuery = pathStr.split("?")[0];
  return pathWithoutQuery.split("/").filter((v) => v.length > 0);
};

const capitalizeFirstLetter = (string: string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

const Header = (props: Props) => {
  const pathname = usePathname();
  const router = useRouter();
  const navItem = navSidebar.find((item) => pathname.includes(item.nav));

  const additionalPath = navItem?.nav
    ? pathname
        .replace(navItem.nav, "")
        .split("/")
        .filter((path) => path.length > 0)
    : null;

  const additionalBreadcrumbs = React.useMemo(() => {
    if (!navItem?.nav) return null;
    const pathnameNestedRoutes = generatePathParts(
      pathname.replace(navItem.nav, "")
    );
    const crumblist = pathnameNestedRoutes.map((subpath, idx) => {
      const href = `${navItem.nav}/${pathnameNestedRoutes
        .slice(0, idx + 1)
        .join("/")}`;
      return {
        href,
        text: capitalizeFirstLetter(subpath),
      };
    });

    return crumblist;
  }, [pathname, navItem?.nav]);
  return (
    <div
      className="flex px-8 pt-7 pb-5 border-b-4 border-gray-100 space-x-1 items-center"
      aria-label="breadcrumb"
    >
      <Link href={navItem?.nav ?? ROUTES.NEW_CHAT}>
        <Button
          className="flex gap-3 items-center font-medium text-base hover:bg-accent"
          variant="ghost"
        >
          {navItem?.icon && <navItem.icon size={26} />}
          {navItem?.label}
        </Button>
      </Link>
      {additionalBreadcrumbs &&
        additionalBreadcrumbs.map((bc) => (
          <Fragment key={bc.href}>
            <ChevronRight size={22} />
            <Link href={bc.href}>
              <Button
                variant="ghost"
                className="py-0 text-base hover:bg-accent"
              >
                <p>{bc.text}</p>
              </Button>
            </Link>
          </Fragment>
        ))}
    </div>
  );
};

export default Header;
