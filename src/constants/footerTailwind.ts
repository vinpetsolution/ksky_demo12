import { cn } from "@/utils/classNames";

/** Shell `.main-footer` — Tailwind only, không dùng globals.css */
export const mainFooterClassName = cn(
  "relative z-10 mt-12 w-full overflow-hidden backdrop-blur-[10px] md:mt-16 lg:mt-[100px]",
  "border-t border-[#e8dcc4]",
  "bg-[#f7f1e6]",
  "shadow-[0_-10px_32px_rgba(184,146,58,0.08)]",
  "before:pointer-events-none before:absolute before:left-1/2 before:top-[-120px] before:h-[240px] before:w-[90vw] before:-translate-x-1/2 before:blur-[30px] before:content-[''] sm:before:w-[420px] lg:before:w-[520px]",
  "before:bg-[radial-gradient(circle,rgba(230,197,106,0.16)_0%,transparent_72%)]",
  "after:pointer-events-none after:absolute after:left-0 after:top-0 after:h-[2px] after:w-full after:content-['']",
  "after:bg-[linear-gradient(90deg,transparent,rgba(230,197,106,0.7),#d4b15a,rgba(230,197,106,0.7),transparent)]",
  "after:shadow-[0_0_10px_rgba(212,177,90,0.22)]",
);

/** Link menu footer — hover line trái → phải */
export const footerNavLinkClassName = cn(
  "relative inline-block pb-1 text-sm font-bold text-[#8a7344] sm:text-[15px]",
  "after:absolute after:bottom-[-8px] after:left-0 after:h-0.5 after:w-0 after:content-['']",
  "after:bg-[linear-gradient(to_right,#c9a24a,#e6c56a)]",
  "after:transition-all after:duration-300",
  "hover:after:w-full",
);

export const footerNavLinkActiveClassName = "after:w-full";
