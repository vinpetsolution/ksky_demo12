'use client';

import { useState, useMemo } from 'react';
import { AuthGuard } from '@/components/providers/AuthGuard';

type BetTab = 'casino' | 'slot';

function isoDate(d: Date): string {
  return d.toISOString().split('T')[0];
}

function BetHistoryContent() {
  const [activeTab, setActiveTab] = useState<BetTab>('casino');
  const [filterResult, setFilterResult] = useState('');

  const now = useMemo(() => new Date(), []);
  const week = useMemo(() => { const d = new Date(); d.setDate(d.getDate() - 7); return d; }, []);
  const [startDate, setStartDate] = useState(isoDate(week));
  const [endDate, setEndDate] = useState(isoDate(now));

  const handleTabChange = (tab: BetTab) => {
    setActiveTab(tab);
    setFilterResult('');
  };

  return (
    <div className="mx-auto max-w-5xl px-4 py-8">
      <h1 className="mb-6 text-2xl font-bold text-[#2c2416]">베팅 내역</h1>

      <div className="mb-6 flex gap-2">
        {(['casino', 'slot'] as BetTab[]).map((tab) => (
          <button
            key={tab}
            onClick={() => handleTabChange(tab)}
            className={`rounded-lg px-5 py-2.5 text-sm font-semibold transition-colors ${
              activeTab === tab
                ? 'bg-[#c9a24a] text-[#2c2416]'
                : 'bg-white text-[#8a7344] hover:text-[#2c2416]'
            }`}
          >
            {tab === 'casino' ? '카지노 베팅내역' : '슬롯 베팅내역'}
          </button>
        ))}
      </div>

      <div className="mb-4 flex flex-wrap items-center gap-3 rounded-lg bg-white p-4">
        <input
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          className="rounded border border-[#e0d0a8] bg-[#fffcf7] px-3 py-2 text-sm text-[#2c2416]"
        />
        <span className="text-gray-500">~</span>
        <input
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          className="rounded border border-[#e0d0a8] bg-[#fffcf7] px-3 py-2 text-sm text-[#2c2416]"
        />
        <select
          value={filterResult}
          onChange={(e) => setFilterResult(e.target.value)}
          className="rounded border border-[#e0d0a8] bg-[#fffcf7] px-3 py-2 text-sm text-[#2c2416]"
        >
          <option value="">전체</option>
          <option value="Win">당첨</option>
          <option value="Lose">미당첨</option>
          <option value="Bet">진행중</option>
        </select>
        <span className="ml-auto text-sm text-[#8a7344]">총 0건</span>
      </div>

      <p className="mb-3 text-center text-xs text-[#8a7344]">
        ※ 사이트 및 회원님의 보안을 위해 7일이 지난 베팅 내역은 자동 삭제 처리됩니다.
      </p>

      <div className="overflow-x-auto rounded-lg border border-[#e0d0a8]">
        <table className="w-full border-collapse text-sm">
          <thead>
            <tr className="bg-white">
              <th className="whitespace-nowrap px-4 py-3 text-center font-semibold text-[#8a7344]">게임</th>
              <th className="whitespace-nowrap px-4 py-3 text-center font-semibold text-[#8a7344]">카테고리</th>
              <th className="whitespace-nowrap px-4 py-3 text-center font-semibold text-[#8a7344]">베팅금</th>
              <th className="whitespace-nowrap px-4 py-3 text-center font-semibold text-[#8a7344]">당첨금</th>
              <th className="whitespace-nowrap px-4 py-3 text-center font-semibold text-[#8a7344]">결과</th>
              <th className="whitespace-nowrap px-4 py-3 text-center font-semibold text-[#8a7344]">일시</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td colSpan={6} className="py-10 text-center text-[#8a7344]">
                표시할 내용이 없습니다.
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default function BetHistoryPage() {
  return (
    <AuthGuard>
      <BetHistoryContent />
    </AuthGuard>
  );
}
