export const calculateFontSize = (value: string | number, ratio?: number): number => {
    const length = value.toString().length;
    const effectiveRatio = ratio !== undefined ? ratio : 1;
    return Math.max(10, 32 - length * effectiveRatio * 1.5);
};