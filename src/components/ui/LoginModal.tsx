"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { BsLockFill, BsPersonFill } from "react-icons/bs";
import { cn } from "@/utils/classNames";
import { Button } from "@/components/ui/Button";
import Modal from "@/components/ui/Modal";
import { saveStorageKey } from "@/utils/storage";
import { getStorageKey as getStorageKeyName } from "@/constants/store-key";
import { useUser } from "@/components/providers/UserProvider";
import { toast } from "sonner";
import { demoLogin } from "@/app/actions/demo-auth";

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenSignUp?: () => void;
}

const loginInputClassName = cn(
  "h-[64px] w-full appearance-none rounded-[18px] border border-[#e8dcc4] outline-none",
  "bg-[#fffcf7]",
  "py-0 pl-[58px] pr-5 text-[15px] text-[#2c2416] placeholder:text-[#8a7344]/70",
  "shadow-none",
  "transition-[border-color,box-shadow,transform] duration-350 ease-out",
  "focus:border-[#d4b15a]",
  "focus:shadow-[0_0_0_3px_rgba(201,162,74,0.18)]",
);

export function LoginModal({ isOpen, onClose }: LoginModalProps) {
  const { setCurrentUser } = useUser();
  const router = useRouter();
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!userName || !password) {
      toast.error("아이디와 비밀번호를 입력하세요.");
      return;
    }

    setIsLoading(true);

    try {
      const response = await demoLogin(userName.trim(), password);

      if (response.success && response.result?.token) {
        saveStorageKey({
          key: getStorageKeyName(),
          data: JSON.stringify(response),
        });
        setCurrentUser(response);
        toast.success("로그인 성공!");
        onClose();
        setUserName("");
        setPassword("");
        router.push("/game_casino");
      } else {
        toast.error("로그인에 실패했습니다.");
      }
    } catch (error) {
      console.error("Login error:", error);
      toast.error("로그인에 실패했습니다.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Modal
      open={isOpen}
      onClose={onClose}
      disabled={isLoading}
      closeOnOverlayClick={!isLoading}
      className="w-full lg:max-w-lg"
      aria-labelledby="login-modal-title"
      showCloseButton
    >
      <>
        <div className="mb-8">
          <p className="text-xs mb-3.5 spacing-4 font-extrabold uppercase tracking-[0.2em] text-[#8a7344]">
            MEMBER LOGIN
          </p>
          <h2
            id="login-modal-title"
            className="mb-4 text-4xl font-extrabold leading-tight text-[#2c2416]"
          >
            로그인
          </h2>
          <p className="text-[15px] text-[#8a7344] leading-[1.8]">
            KSKY SOLUTION 플랫폼에 로그인하세요.
          </p>
        </div>

        <form
          id="login-form"
          className="flex flex-col gap-5"
          onSubmit={handleLogin}
        >
          <div className="flex flex-col gap-3">
            <label
              htmlFor="login-id"
              className="text-sm font-bold text-[#2c2416]"
            >
              아이디
            </label>
            <div className="relative">
              <BsPersonFill
                className="pointer-events-none absolute left-5 top-1/2 size-4.5 -translate-y-1/2 text-[#8a7344]"
                aria-hidden
              />
              <input
                id="login-id"
                type="text"
                placeholder="아이디 입력"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                className={loginInputClassName}
                autoComplete="username"
                disabled={isLoading}
              />
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <label
              htmlFor="login-password"
              className="text-[15px] font-bold text-[#2c2416]"
            >
              비밀번호
            </label>
            <div className="relative">
              <BsLockFill
                className="pointer-events-none absolute left-5 top-1/2 size-4.5 -translate-y-1/2 text-[#8a7344]"
                aria-hidden
              />
              <input
                id="login-password"
                type="password"
                placeholder="비밀번호 입력"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={loginInputClassName}
                autoComplete="current-password"
                disabled={isLoading}
              />
            </div>
          </div>

          <Button
            type="submit"
            variant="pink"
            fullWidth
            shine
            disabled={isLoading}
            contentClassName="relative z-[2]"
            className={cn(
              "relative overflow-hidden h-18 rounded-3xl text-base font-extrabold transition-all duration-300",
              "hover:-translate-y-1 hover:shadow-[0_18px_42px_rgba(184,146,58,0.22)]",
            )}
          >
            {isLoading ? "로그인 중...." : "로그인"}
          </Button>
        </form>

        {/* {onOpenSignUp ? (
          <p className="mt-6 text-center text-sm text-[#8a7344]">
            아직 회원이 아니신가요?{" "}
            <button
              type="button"
              className="font-bold text-[#c9a24a] underline-offset-2 transition-colors hover:text-[#9a7828] hover:underline"
              onClick={() => {
                onClose();
                onOpenSignUp();
              }}
              disabled={isLoading}
            >
              회원가입
            </button>
          </p>
        ) : null} */}
      </>
    </Modal>
  );
}
