export function formatSOL(
  amount: number,
  decimals: number = 2,
  locale: string = "en-US"
): string {
  const formatted = amount.toLocaleString(locale, {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });
  return `${formatted} SOL`;
}

export function formatDate(
  date: string | Date,
  locale: string = "en-US"
): string {
  return new Date(date).toLocaleDateString(locale);
}

export function formatPercentage(
  value: number,
  decimals: number = 1,
  locale: string = "en-US"
): string {
  const percentage = (value * 100).toLocaleString(locale, {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });
  return `${percentage}%`;
}

export function truncateAddress(address: string, chars: number = 4): string {
  return `${address.slice(0, chars)}...${address.slice(-chars)}`;
}

export function formatCurrency(
  amount: number,
  currency: string = "USD",
  locale: string = "en-US"
): string {
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency: currency,
  }).format(amount);
}

export function formatNumber(
  value: number,
  decimals: number = 0,
  locale: string = "en-US"
): string {
  return value.toLocaleString(locale, {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });
}

export function formatTimeAgo(
  date: Date | string,
  locale: string = "en-US"
): string {
  const now = new Date();
  const past = new Date(date);
  const diffMs = now.getTime() - past.getTime();
  const diffSecs = Math.floor(diffMs / 1000);
  const diffMins = Math.floor(diffSecs / 60);
  const diffHours = Math.floor(diffMins / 60);
  const diffDays = Math.floor(diffHours / 24);
  const diffWeeks = Math.floor(diffDays / 7);
  const diffMonths = Math.floor(diffDays / 30);
  const diffYears = Math.floor(diffDays / 365);

  const translations: Record<string, Record<string, string>> = {
    "en-US": {
      second: "second",
      seconds: "seconds",
      minute: "minute",
      minutes: "minutes",
      hour: "hour",
      hours: "hours",
      day: "day",
      days: "days",
      week: "week",
      weeks: "weeks",
      month: "month",
      months: "months",
      year: "year",
      years: "years",
      ago: "ago",
    },
    "pt-BR": {
      second: "segundo",
      seconds: "segundos",
      minute: "minuto",
      minutes: "minutos",
      hour: "hora",
      hours: "horas",
      day: "dia",
      days: "dias",
      week: "semana",
      weeks: "semanas",
      month: "mês",
      months: "meses",
      year: "ano",
      years: "anos",
      ago: "atrás",
    },
    "es-ES": {
      second: "segundo",
      seconds: "segundos",
      minute: "minuto",
      minutes: "minutos",
      hour: "hora",
      hours: "horas",
      day: "día",
      days: "días",
      week: "semana",
      weeks: "semanas",
      month: "mes",
      months: "meses",
      year: "año",
      years: "años",
      ago: "hace",
    },
    "de-DE": {
      second: "Sekunde",
      seconds: "Sekunden",
      minute: "Minute",
      minutes: "Minuten",
      hour: "Stunde",
      hours: "Stunden",
      day: "Tag",
      days: "Tage",
      week: "Woche",
      weeks: "Wochen",
      month: "Monat",
      months: "Monate",
      year: "Jahr",
      years: "Jahre",
      ago: "vor",
    },
    "fr-FR": {
      second: "seconde",
      seconds: "secondes",
      minute: "minute",
      minutes: "minutes",
      hour: "heure",
      hours: "heures",
      day: "jour",
      days: "jours",
      week: "semaine",
      weeks: "semaines",
      month: "mois",
      months: "mois",
      year: "an",
      years: "ans",
      ago: "il y a",
    },
    "ja-JP": {
      second: "秒",
      seconds: "秒",
      minute: "分",
      minutes: "分",
      hour: "時間",
      hours: "時間",
      day: "日",
      days: "日",
      week: "週",
      weeks: "週",
      month: "ヶ月",
      months: "ヶ月",
      year: "年",
      years: "年",
      ago: "前",
    },
    "zh-CN": {
      second: "秒",
      seconds: "秒",
      minute: "分钟",
      minutes: "分钟",
      hour: "小时",
      hours: "小时",
      day: "天",
      days: "天",
      week: "周",
      weeks: "周",
      month: "月",
      months: "月",
      year: "年",
      years: "年",
      ago: "前",
    },
  };

  const t = translations[locale] || translations["en-US"];

  if (diffYears > 0) {
    return `${diffYears} ${diffYears === 1 ? t.year : t.years} ${t.ago}`;
  }
  if (diffMonths > 0) {
    return `${diffMonths} ${diffMonths === 1 ? t.month : t.months} ${t.ago}`;
  }
  if (diffWeeks > 0) {
    return `${diffWeeks} ${diffWeeks === 1 ? t.week : t.weeks} ${t.ago}`;
  }
  if (diffDays > 0) {
    return `${diffDays} ${diffDays === 1 ? t.day : t.days} ${t.ago}`;
  }
  if (diffHours > 0) {
    return `${diffHours} ${diffHours === 1 ? t.hour : t.hours} ${t.ago}`;
  }
  if (diffMins > 0) {
    return `${diffMins} ${diffMins === 1 ? t.minute : t.minutes} ${t.ago}`;
  }
  if (diffSecs > 0) {
    return `${diffSecs} ${diffSecs === 1 ? t.second : t.seconds} ${t.ago}`;
  }

  return t.ago;
}

export type SupportedLocale =
  | "en-US" // English (United States)
  | "en-GB" // English (United Kingdom)
  | "pt-BR" // Português (Brasil)
  | "es-ES" // Español (España)
  | "de-DE" // Deutsch (Deutschland)
  | "fr-FR" // Français (France)
  | "it-IT" // Italiano (Italia)
  | "ja-JP" // 日本語 (日本)
  | "zh-CN" // 中文 (中国)
  | "ko-KR" // 한국어 (한국)
  | "ru-RU" // Русский (Россия)
  | "ar-SA"; // العربية (السعودية)

export type SupportedCurrency =
  | "USD" // US Dollar
  | "EUR" // Euro
  | "GBP" // British Pound
  | "JPY" // Japanese Yen
  | "CNY" // Chinese Yuan
  | "BRL" // Brazilian Real
  | "MXN" // Mexican Peso
  | "INR" // Indian Rupee
  | "AUD" // Australian Dollar
  | "CAD" // Canadian Dollar
  | "CHF" // Swiss Franc
  | "SEK" // Swedish Krona
  | "NZD" // New Zealand Dollar
  | "SGD" // Singapore Dollar
  | "HKD" // Hong Kong Dollar
  | "NOK" // Norwegian Krone
  | "KRW" // South Korean Won
  | "TRY" // Turkish Lira
  | "RUB" // Russian Ruble
  | "SAR" // Saudi Riyal
  | "AED"; // UAE Dirham


export function detectLocale(): SupportedLocale {
  if (typeof window === "undefined") {
    return "en-US";
  }

  const browserLocale = navigator.language || "en-US";

  const localeMap: Record<string, SupportedLocale> = {
    pt: "pt-BR",
    "pt-BR": "pt-BR",
    "pt-PT": "pt-BR",
    es: "es-ES",
    "es-ES": "es-ES",
    de: "de-DE",
    "de-DE": "de-DE",
    fr: "fr-FR",
    "fr-FR": "fr-FR",
    it: "it-IT",
    "it-IT": "it-IT",
    ja: "ja-JP",
    "ja-JP": "ja-JP",
    zh: "zh-CN",
    "zh-CN": "zh-CN",
    ko: "ko-KR",
    "ko-KR": "ko-KR",
    ru: "ru-RU",
    "ru-RU": "ru-RU",
    ar: "ar-SA",
    "ar-SA": "ar-SA",
    en: "en-US",
    "en-US": "en-US",
    "en-GB": "en-GB",
  };

  return localeMap[browserLocale] || "en-US";
}

export function getCurrencyForLocale(
  locale: SupportedLocale
): SupportedCurrency {
  const currencyMap: Record<SupportedLocale, SupportedCurrency> = {
    "en-US": "USD",
    "en-GB": "GBP",
    "pt-BR": "BRL",
    "es-ES": "EUR",
    "de-DE": "EUR",
    "fr-FR": "EUR",
    "it-IT": "EUR",
    "ja-JP": "JPY",
    "zh-CN": "CNY",
    "ko-KR": "KRW",
    "ru-RU": "RUB",
    "ar-SA": "SAR",
  };

  return currencyMap[locale] || "USD";
}
