"use client";

import { cn } from "@/utils/classNames";
import { usePathname } from "next/navigation";
import { AuthLink } from "@/components/ui/AuthLink";
import { useMailboxCounts } from "@/hooks/useMailboxCounts";
import { NAV_ITEMS } from "../../constants/navItem";

export function NavBar() {
  const pathname = usePathname();
  const { totalUnread } = useMailboxCounts();

  return (
    <nav
      className="hidden min-w-0 flex-1 items-center justify-center xl:flex"
      aria-label="Quick navigation"
    >
      <ul className="flex items-center justify-center gap-x-4 gap-y-1 xl:gap-6 2xl:gap-8">
        {NAV_ITEMS.map((item) => {
          const Icon = item.icon;
          const active = pathname === item.href;
          const label = item.showMailboxCount
            ? `쪽지함( ${totalUnread > 99 ? "99+" : totalUnread} )`
            : item.label;

          return (
            <li key={item.href}>
              <AuthLink
                href={item.href}
                requireAuth={item.requireAuth}
                className={cn(
                  "inline-flex items-center gap-2 whitespace-nowrap font-semibold text-[#2c2416] transition-[color,text-shadow] duration-350 hover:text-[#9a7828]",
                  "text-base xl:gap-2 2xl:gap-2.5 2xl:text-lg",
                  active &&
                  "text-[#9a7828] [text-shadow:0_0_10px_rgba(230,197,106,0.45)]",
                )}
              >
                <Icon
                  className={cn("text-[#c9a24a] size-[18px] shrink-0")}
                  aria-hidden
                />
                <span>{label}</span>
              </AuthLink>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
