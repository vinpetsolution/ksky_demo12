import { cn } from "@/utils/classNames";

/** Class Tailwind cho header KSKY SOLUTION — không dùng globals.css */

export const headerTopBarClassName = cn(
  "relative z-[100] h-[88px] w-full overflow-hidden backdrop-blur-[14px]",
  "border-b border-[#e0d0a8]",
  "bg-[#fffcf7]",
  "shadow-[0_8px_24px_rgba(184,146,58,0.08)]",
  "before:pointer-events-none before:absolute before:left-1/2 before:top-[-80px] before:h-40 before:w-[420px] before:-translate-x-1/2 before:blur-2xl before:content-['']",
  "before:bg-[radial-gradient(circle,rgba(230,197,106,0.22)_0%,transparent_70%)]",
  "after:pointer-events-none after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-full after:content-['']",
  "after:bg-[linear-gradient(90deg,transparent,#e6c56a,#d4b15a,#e6c56a,transparent)]",
  "after:shadow-[0_0_10px_rgba(212,177,90,0.28)]",
);
