import { OrderStatus } from "../hooks/orders.hooks";

export const toArabicDigits = (num: number | string): string => {
  const arabicDigits: string[] = ['٠', '١', '٢', '٣', '٤', '٥', '٦', '٧', '٨', '٩'];
  return num
    .toString()
    .replace(/\d/g, (d: string): string => arabicDigits[parseInt(d)]);
};


export const isValidEmailOrSaudiPhone = (input: string): boolean => {
  // Email regex (simple)
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  // Saudi phone: starts with 05, 5, or +9665, and 9 digits after
  const saPhoneRegex = /^(?:\+9665|05|5)[0-9]{8}$/;
  return emailRegex.test(input) || saPhoneRegex.test(input);
}


export const getNormalizedPhone = (input: string): string => {
  // Remove common international prefixes
  return input
    .replace(/^(\+966|00966|0966|966)/, '')
    .trim();
}


export const isValidSaudiPhone = (input: string): boolean => {
  // Remove common international prefixes
  const normalized = getNormalizedPhone(input);

  // Valid local format: starts with 5 and has exactly 9 digits
  const saPhoneRegex = /^5[0-9]{8}$/;

  return saPhoneRegex.test(normalized);
};


// ---------- New (grouped) statuses ----------
export type GroupedOrderStatus =
  | 'new'
  | 'processing'
  | 'shipping'
  | 'out_for_delivery'
  | 'delivered'
  | 'cancelled'
  | 'returned';

// ---------- Mapping table ----------
const statusGroupMap: Record<OrderStatus, GroupedOrderStatus> = {
  // 1️⃣ new
  pending: 'new',
  awaiting_payment: 'new',
  payment_failed: 'new',

  // 2️⃣ processing
  processing: 'processing',
  on_hold: 'processing',
  ready_for_pickup: 'processing',

  // 3️⃣ shipping
  shipped: 'shipping',
  partially_shipped: 'shipping',

  // 4️⃣ out_for_delivery
  out_for_delivery: 'out_for_delivery',

  // 5️⃣ delivered
  delivered: 'delivered',
  completed: 'delivered',

  // 6️⃣ cancelled
  cancelled: 'cancelled',
  failed: 'cancelled',

  // 7️⃣ returned
  returned: 'returned',
  refunded: 'returned',
  partially_refunded: 'returned',
} as const;

// ---------- Mapping function ----------
/**
 * Maps any legacy order status to its new grouped status.
 * @param status A value from `LegacyOrderStatus`
 * @returns The corresponding `GroupedOrderStatus`
 */
export function mapOrderStatus(
  status: LegacyOrderStatus,
): GroupedOrderStatus {
  return statusGroupMap[status];
}

// ---------- Example ----------
/*
console.log(mapOrderStatus('shipped'));           // "shipping"
console.log(mapOrderStatus('out_for_delivery'));  // "out_for_delivery"
console.log(mapOrderStatus('refunded'));          // "returned"
*/
