export const toArabicNumerals = (num: number): string => {
  return String(num).replace(/\d/g, (d) => '٠١٢٣٤٥٦٧٨٩'[d]);
};

export const formatArabic = (q: number, t: (key: string) => string): string => {
  const juz = Math.floor(q / 8);
  const hizb = Math.floor((q % 8) / 4);
  const quarter = q % 4;
  return [
    juz &&
    (juz === 1 ? t("juzOne") : `${toArabicNumerals(juz)} ${t("juz")}`),
    hizb &&
    (hizb === 1 ? t("hizbOne") : `${toArabicNumerals(hizb)} ${t("hizb")}`),
    quarter &&
    (quarter === 1
      ? t("quarterOne")
      : `${toArabicNumerals(quarter)} ${t("quarter")}`),
  ]
    .filter(Boolean)
    .join(" و ");
};

