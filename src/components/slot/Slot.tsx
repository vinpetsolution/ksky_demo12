'use client';

import { useMemo, useState } from 'react';
import Image from 'next/image';
import { toast } from 'sonner';
import { motion } from '@/lib/motion';
import { DEMO_SLOT_VENDORS } from '@/mocks/gameVendors';

const SHINE_DURATION = 4.5;
const SHINE_X = ["-171%", "229%"] as const;
const SHINE_GRADIENT =
  "linear-gradient(90deg, transparent, rgb(255 252 247 / 0.2), rgb(230 197 106 / 0.45), rgb(255 252 247 / 0.2), transparent)";

function CardShine() {
  return (
    <div className="pointer-events-none absolute inset-0 z-20 overflow-hidden" aria-hidden>
      <motion.div
        className="absolute top-[-40%] left-0 h-[220%] w-[70%] will-change-transform mix-blend-screen"
        initial={{ x: SHINE_X[0] }}
        animate={{ x: [...SHINE_X] }}
        transition={{ duration: SHINE_DURATION, ease: "linear", repeat: Infinity, repeatType: "loop" }}
      >
        <div className="h-full w-full rotate-24" style={{ background: SHINE_GRADIENT }} />
      </motion.div>
    </div>
  );
}

export default function Slot() {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredVendors = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) return DEMO_SLOT_VENDORS;
    return DEMO_SLOT_VENDORS.filter((vendor) =>
      vendor.name.toLowerCase().includes(q),
    );
  }, [searchQuery]);

  const handleVendorClick = () => {
    toast.info("데모 환경에서는 게임을 실행할 수 없습니다.");
  };

  return (
    <div className="container mx-auto px-4">
      <div className="mx-auto max-w-md py-6">
        <div className="relative">
          <input
            type="text"
            placeholder="게임 검색..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full rounded-lg border border-[#e0d0a8] bg-white px-4 py-3 pr-10 text-[#2c2416] shadow-sm transition-colors focus:border-[#c9a24a] focus:outline-none focus:ring-2 focus:ring-[#c9a24a]"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 px-4 py-5 md:grid-cols-3 md:px-5 lg:grid-cols-4 xl:grid-cols-5">
        {filteredVendors.map((vendor) => {
          const slotImage = `/images/casino/slot_${vendor.slotIndex}.png`;
          const mainIcon = `/images/casino/main_slot_${vendor.slug}.png`;

          return (
            <div
              key={vendor.name}
              className="group relative cursor-pointer overflow-hidden rounded-2xl border border-[#e0d0a8] transition-colors hover:border-[#c9a24a]"
              onClick={handleVendorClick}
            >
              <CardShine />
              <div className="relative h-30 bg-[#f7f1e6]">
                <div className="absolute right-0 -bottom-0.5 h-30.5 transition-all duration-300 group-hover:scale-110">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={slotImage}
                    alt=""
                    className="h-full w-auto object-contain brightness-[0.7] grayscale-[0.6] transition-all duration-300 group-hover:brightness-100 group-hover:grayscale-0"
                  />
                </div>
                <div className="absolute left-4 top-1/2 h-12 w-28 -translate-y-1/2 md:left-7.5 md:h-14 md:w-32">
                  <Image
                    src={mainIcon}
                    alt={vendor.name}
                    fill
                    className="object-contain object-left brightness-90 transition-all duration-300 group-hover:brightness-100"
                    sizes="(max-width: 768px) 112px, 128px"
                  />
                </div>
              </div>
              <div className="h-12 bg-[#fffcf7] transition-all duration-300 group-hover:bg-linear-to-r group-hover:from-[#fffcf7] group-hover:to-[#f7f1e6]">
                <div className="flex h-full items-center px-4 md:px-7.5">
                  <span className="truncate text-[13px] font-semibold text-[#2c2416] transition-all duration-300 group-hover:text-[#9a7828] group-hover:drop-shadow-[0_0_5px_rgba(201,162,74,0.45)] md:text-[17px]">
                    {vendor.name}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {searchQuery && filteredVendors.length === 0 && (
        <div className="py-20 text-center">
          <h3 className="mt-4 text-lg font-medium text-[#2c2416]">검색 결과가 없습니다</h3>
          <p className="mt-2 text-[#8a7344]">다른 검색어를 시도해 보세요.</p>
        </div>
      )}
    </div>
  );
}
