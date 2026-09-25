import { cn } from "@/utils/classNames";
import type { FooterServiceBoxItem } from "@/constants/footer";

interface FooterServiceBoxProps {
  item: FooterServiceBoxItem;
}

export function FooterServiceBox({ item }: FooterServiceBoxProps) {
  const Icon = item.icon;

  return (
    <div
      className={cn(
        "footer-info-box relative flex items-center gap-4 overflow-hidden rounded-2xl p-3 backdrop-blur-[10px] sm:rounded-[24px] sm:p-4 md:gap-6 md:p-5 xl:rounded-[28px] xl:p-[34px]",
        "border border-[#e8dcc4]",
        "bg-white",
        "shadow-[0_12px_30px_rgba(184,146,58,0.10)]",
        "transition-[transform,border-color,box-shadow] duration-350 ease-out",
        "after:pointer-events-none after:absolute after:right-[-40px] after:top-[-60px] after:z-0 after:h-[180px] after:w-[180px] after:rounded-full after:blur-lg after:content-['']",
        "after:bg-[radial-gradient(circle,rgba(230,197,106,0.18)_0%,transparent_72%)]",
      )}
    >
      <div
        className={cn(
          "footer-info-icon relative z-10 flex size-14 shrink-0 items-center justify-center overflow-hidden rounded-2xl backdrop-blur-[10px] sm:size-16 md:size-[72px]",
          "border border-[#e0d0a8] text-xl text-[#9a7828] sm:text-2xl md:text-[28px] md:rounded-3xl",
          "bg-[linear-gradient(135deg,#e6c56a_0%,#d4b15a_55%,#c9a24a_100%)]",
          "shadow-[0_8px_20px_rgba(184,146,58,0.16)]",
          "before:pointer-events-none before:absolute before:inset-[10px] before:rounded-[18px] before:content-['']",
          "before:bg-[linear-gradient(135deg,rgba(255,252,247,0.35),rgba(201,162,74,0.08))]",
          "after:pointer-events-none after:absolute after:left-[-40%] after:top-[-30%] after:h-[180%] after:w-[70%] after:rotate-25 after:opacity-60 after:content-['']",
          "after:bg-[linear-gradient(180deg,rgba(255,255,255,0.18),transparent)]",
        )}
      >
        <Icon
          aria-hidden
          className="relative z-10 text-[#2c2416] [text-shadow:0_0_10px_rgba(255,252,247,0.45)]"
        />
      </div>
      <div className="relative z-10 min-w-0 text-left">
        <p className="mb-3 text-[11px] font-extrabold tracking-[2px] text-[#8a7344] xl:mb-[18px] sm:text-[13px] sm:tracking-[3px]">
          {item.title}
        </p>
        <p className="text-sm leading-relaxed text-[#2c2416] sm:text-[15px] sm:leading-loose">
          {item.descriptionLines[0]}
          <br />
          {item.descriptionLines[1]}
        </p>
      </div>
    </div>
  );
}
