"use client";

import { type ButtonHTMLAttributes, type Ref } from "react";
import { cn } from "@/utils/classNames";
import { ButtonShine } from "@/components/ui/ButtonShine";

const buttonVariants = {
  variant: {
    darkBlue: "bg-white text-[#2c2416] border border-[#e0d0a8] hover:text-[#2c2416] hover:bg-[linear-gradient(135deg,#e6c56a,#c9a24a)]",
    pink: cn(
      "bg-[linear-gradient(135deg,#e6c56a_0%,#d4b15a_45%,#c9a24a_100%)] text-[#2c2416]",
      "border border-[#e0d0a8]",
      "shadow-[0_0_18px_rgba(230,197,106,0.28)] backdrop-blur-[10px]",
    ),
    darkPink: cn(
      "bg-white text-[#2c2416]",
      "border border-[#e8dcc4]",
      "shadow-[0_10px_24px_rgba(184,146,58,0.10)] backdrop-blur-[10px]",
    ),
    darkBlueGlow: cn(
      "bg-white text-[#2c2416] border border-[#e0d0a8]",
      "hover:text-[#2c2416] hover:bg-[linear-gradient(135deg,#e6c56a,#c9a24a)]",
      "shadow-[0_0_16px_rgba(230,197,106,0.22)]",
    ),
    red: "text-white bg-[#dc2626] hover:bg-[#b91c1c] border border-[#ef444444]",
    success: "text-white bg-[#198754] hover:bg-[#157347]",
    transparent:
      "bg-transparent text-gray hover:text-black disabled:text-gray",
  },
  size: {
    sm: "h-8 px-3 text-sm rounded-md gap-1.5",
    md: "h-10 px-4 text-sm rounded-lg gap-2",
    lg: "h-12 px-6 text-base rounded-lg gap-2.5",
  },
} as const;

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: keyof typeof buttonVariants.variant;
  size?: keyof typeof buttonVariants.size;
  loading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  fullWidth?: boolean;
  contentClassName?: string;
  /** Vệt shine motion (parent cần `relative overflow-hidden`) */
  shine?: boolean;
  ref?: Ref<HTMLButtonElement>;
}

const Button = ({
  className,
  variant = "darkBlue",
  size = "md",
  loading = false,
  leftIcon,
  rightIcon,
  fullWidth,
  contentClassName,
  shine = false,
  disabled,
  children,
  type = "button",
  ref,
  ...props
}: ButtonProps) => {
  const isDisabled = disabled || loading;

  return (
    <button
      ref={ref}
      type={type}
      disabled={isDisabled}
      className={cn(
        "inline-flex font-bold items-center justify-center transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 disabled:pointer-events-none",
        "cursor-pointer",
        (isDisabled || loading) && "cursor-not-allowed opacity-50",
        buttonVariants.variant[variant],
        buttonVariants.size[size],
        fullWidth && "w-full",
        shine && !loading && !isDisabled && "relative overflow-hidden",
        className
      )}
      {...props}
    >
      {shine && !loading && !isDisabled ? <ButtonShine /> : null}
      {loading ? (
        <span
          className="relative z-2 size-5 shrink-0 animate-spin rounded-full border-2 border-current border-t-transparent"
          aria-hidden
        />
      ) : leftIcon ? (
        <span className="relative z-2 inline-flex shrink-0">{leftIcon}</span>
      ) : null}
      {children ? (
        <span className={cn("relative z-2", contentClassName)}>{children}</span>
      ) : null}
      {!loading && rightIcon ? (
        <span className="relative z-2 inline-flex shrink-0">{rightIcon}</span>
      ) : null}
    </button>
  );
};

Button.displayName = "Button";

export { Button };
