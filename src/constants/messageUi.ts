import type { MessageThreadSummary } from "@/types";
import { cn } from "@/utils/classNames";

export const messageWineGradientClassName = cn(
  "bg-[linear-gradient(180deg,#fffcf7_0%,#ffffff_100%)]",
);

export const messageListBoxClassName = cn(
  "overflow-hidden rounded-2xl sm:rounded-[28px] lg:rounded-[32px]",
  "border border-[#e8dcc4]",
  "shadow-[0_14px_40px_rgba(184,146,58,0.10)]",
  messageWineGradientClassName,
);

export const messageTableScrollMinWidthClassName = "min-w-[520px] sm:min-w-0";

export const messageTableHeaderClassName =
  "h-14 text-sm font-extrabold text-[#8a7344] sm:h-[78px] sm:text-base";

export const messageTableCellClassName =
  "text-sm h-12 sm:h-[50px] px-1 sm:px-2";

export const messageActionsRowClassName =
  "mt-4 flex w-full flex-row flex-wrap gap-2 sm:mt-5 sm:gap-3";

export const messageActionButtonClassName = cn(
  "inline-flex h-12 min-w-0 flex-1 items-center justify-center gap-2 rounded-[18px]",
  "border border-[#e0d0a8] text-sm font-bold text-[#2c2416]",
  "transition-all duration-350 ease-out sm:h-14 sm:flex-none sm:min-w-[160px] sm:gap-2.5",
  "bg-white",
  "hover:bg-[linear-gradient(135deg,#e6c56a,#c9a24a)] hover:text-[#2c2416]",
  "disabled:pointer-events-none disabled:opacity-45",
);

export const messageTableHeadClassName = messageWineGradientClassName;

export const messageUnreadRowClassName = cn(
  messageWineGradientClassName,
  "[&_td]:border-[#e8dcc4]",
  "[&_td]:bg-[#fffcf7]",
);

export function sortThreadsByDate(
  list: MessageThreadSummary[],
): MessageThreadSummary[] {
  return [...list].sort((a, b) => {
    const ta = new Date(a.lastMessageAt || a.createdAt || 0).getTime();
    const tb = new Date(b.lastMessageAt || b.createdAt || 0).getTime();
    return tb - ta;
  });
}

export function formatMessageListDate(iso?: string): string {
  if (!iso) return "—";
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return iso;
  const yy = String(d.getFullYear()).slice(-2);
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  const h = String(d.getHours()).padStart(2, "0");
  const min = String(d.getMinutes()).padStart(2, "0");
  return `${yy}-${m}-${day} ${h}:${min}`;
}

export function formatMessageDetailDate(iso?: string): string {
  if (!iso) return "—";
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return iso;
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  const h = String(d.getHours()).padStart(2, "0");
  const min = String(d.getMinutes()).padStart(2, "0");
  const s = String(d.getSeconds()).padStart(2, "0");
  return `${y}-${m}-${day} ${h}:${min}:${s}`;
}

export function threadIsUnread(
  row: MessageThreadSummary,
  userName: string,
): boolean {
  if (row.recipientUsername === userName) return row.unreadByRecipient === true;
  if (row.createdBy === userName) return row.unreadBySender === true;
  return false;
}

export function threadSenderLabel(
  row: MessageThreadSummary,
  userName: string,
): string {
  if (row.createdBy && row.createdBy !== userName) {
    return row.createdBy;
  }
  return "운영팀";
}
