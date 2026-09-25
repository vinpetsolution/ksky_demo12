"use client";

import { cn } from "@/utils/classNames";
import Image from "next/image";
import { BsPlayFill } from "react-icons/bs";
import { motion } from "@/lib/motion";
import { AuthLink } from "@/components/ui/AuthLink";

interface CardItemProps {
    title: string;
    logoImage: string;
    bgImage: string;
    link?: string;
    className?: string;
}

const SHINE_DURATION = 4.5;

/** Vệt rộng 70% card → translateX % tương đương left -120% … 160% trên card */
const SHINE_X = ["-171%", "229%"] as const;

const SHINE_GRADIENT =
    "linear-gradient(90deg, transparent, rgb(255 252 247 / 0.2), rgb(230 197 106 / 0.45), rgb(255 252 247 / 0.2), transparent)";

const PLAY_CIRCLE_PX = 86;
const PLAY_SHINE_GRADIENT =
    "linear-gradient(90deg, transparent, rgb(255 255 255 / 0.22), transparent)";

/** playWineShine: left -80px → 140% (của nút 86px) */
function PlayCircleShine() {
    return (
        <motion.span
            aria-hidden
            className="pointer-events-none absolute top-0 left-0 z-0 h-full w-12.5"
            initial={{ x: -80 }}
            animate={{ x: [-80, PLAY_CIRCLE_PX * 1.4] }}
            transition={{
                duration: 2.8,
                ease: "linear",
                repeat: Infinity,
                repeatType: "loop",
            }}
        >
            <span
                className="block h-full w-full skew-x-[-25deg]"
                style={{ background: PLAY_SHINE_GRADIENT }}
            />
        </motion.span>
    );
}

function CardItemShine() {
    return (
        <div
            className="pointer-events-none absolute inset-0 z-20 overflow-hidden"
            aria-hidden
        >
            <motion.div
                className="absolute top-[-40%] left-0 h-[220%] w-[70%] will-change-transform mix-blend-screen"
                initial={{ x: SHINE_X[0] }}
                animate={{ x: [...SHINE_X] }}
                transition={{
                    duration: SHINE_DURATION,
                    ease: "linear",
                    repeat: Infinity,
                    repeatType: "loop",
                }}
            >
                <div
                    className="h-full w-full rotate-24"
                    style={{ background: SHINE_GRADIENT }}
                />
            </motion.div>
        </div>
    );
}

const CardItem = ({ title, logoImage, bgImage, link, className }: CardItemProps) => {
    return (
        <AuthLink
            href={link || '#'}
            requireAuth
            className={cn('relative block overflow-hidden rounded-3xl',
                "bg-white isolate",
                "border border-[#e8dcc4] backdrop-blur-[10px]",
                "shadow-[0_14px_34px_rgba(184,146,58,0.10)]",
                "hover:scale-[1.04] hover:shadow-[0_18px_40px_rgba(184,146,58,0.18)]",
                "group hover:border-[#d4b15a] hover:-translate-y-3 transition-all duration-300",
                className)}
        >
            {/* Shine */}
            <CardItemShine />

            {/* Image */}
            <div
                className='relative overflow-hidden aspect-square'
            >
                <Image
                    src={bgImage}
                    alt={title}
                    fill
                    sizes="(max-width: 768px) 50vw, (max-width: 1280px) 25vw, 16vw"
                    className='w-full h-full object-cover'
                />
                {/* Overlay */}
                <div
                    className={cn(
                        "absolute inset-0 z-10 flex flex-col items-center justify-center gap-4",
                        "bg-[linear-gradient(180deg,rgb(251_246_238/0.15),rgb(251_246_238/0.88))]",
                        "backdrop-blur-xs",
                        "invisible opacity-0",
                        "transition-all duration-300",
                        "group-hover:visible group-hover:opacity-100",
                    )}
                >
                    <div
                        className={cn(
                            "relative flex size-21.5 scale-70 items-center justify-center overflow-hidden rounded-full",
                            "border border-[#e0d0a8] text-[40px] text-[#2c2416]",
                            "bg-[linear-gradient(135deg,#e6c56a_0%,#d4b15a_45%,#c9a24a_100%)]",
                            "shadow-[0_0_18px_rgba(230,197,106,0.35)]",
                            "transition-all duration-300",
                            "group-hover:scale-100 group-hover:border-[#d4b15a]",
                            "group-hover:shadow-[0_0_24px_rgba(230,197,106,0.45)]",
                        )}
                        aria-hidden
                    >
                        <PlayCircleShine />
                        <BsPlayFill className="relative z-10" />
                    </div>

                    <span
                        className={cn(
                            "relative translate-y-2.5 text-[15px] font-extrabold uppercase tracking-[2px] text-[#2c2416] opacity-0",
                            "[text-shadow:0_0_12px_rgba(230,197,106,0.35)]",
                            "transition-all duration-300",
                            "group-hover:translate-y-0 group-hover:opacity-100",
                        )}
                    >
                        PLAY NOW
                    </span>
                </div>
            </div>

            {/* Logo */}
            <div
                className={cn(" h-16 md:h-20 xl:h-28 flex items-center border-t border-[#e8dcc4]",
                    "bg-[#fffcf7]",
                    "text-[#2c2416] gap-4 px-3 md:px-4 xl:px-5",
                    "shadow-none",
                )}
            >
                <div className='relative size-8 md:size-10 shrink-0'>
                    <Image
                        src={logoImage}
                        alt={title}
                        fill
                        sizes="40px"
                        className='w-full h-full object-cover'
                    />
                </div>
                <p className='text-sm md:text-base'>
                    {title}
                </p>
            </div>
        </AuthLink>
    )
}
export default CardItem
