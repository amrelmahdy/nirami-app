export const toArabicDigits = (num: number | string): string => {
    const arabicDigits: string[] = ['٠', '١', '٢', '٣', '٤', '٥', '٦', '٧', '٨', '٩'];
    return num
        .toString()
        .replace(/\d/g, (d: string): string => arabicDigits[parseInt(d)]);
};


export const isValidEmailOrSaudiPhone = (input: string): boolean  => {
    // Email regex (simple)
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    // Saudi phone: starts with 05, 5, or +9665, and 9 digits after
    const saPhoneRegex = /^(?:\+9665|05|5)[0-9]{8}$/;
    return emailRegex.test(input) || saPhoneRegex.test(input);
}


