export const toArabicDigits = (num: number | string): string => {
    const arabicDigits: string[] = ['٠', '١', '٢', '٣', '٤', '٥', '٦', '٧', '٨', '٩'];
    return num
        .toString()
        .replace(/\d/g, (d: string): string => arabicDigits[parseInt(d)]);
};