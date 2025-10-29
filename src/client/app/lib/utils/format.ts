// Detectar locale do usuário
export function detectLocale(): string {
  if (typeof window === "undefined") return "pt-BR";
  return navigator.language || "pt-BR";
}

// Obter moeda padrão por locale
export function getCurrencyForLocale(locale: string): string {
  const currencyMap: Record<string, string> = {
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
  };
  return currencyMap[locale] || "USD";
}

// Formatar SOL
export function formatSOL(
  amount: number,
  decimals: number = ,
  locale?: string
): string {
  const finalLocale = locale || detectLocale();
  const formatted = amount.toLocaleString(finalLocale, {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });
  return `${formatted} SOL`;
}

// Formatar data
export function formatDate(date: string | Date, locale?: string): string {
  const finalLocale = locale || detectLocale();
  return new Date(date).toLocaleDateString(finalLocale);
}

// Formatar percentual
export function formatPercentage(value: number, locale?: string): string {
  const finalLocale = locale || detectLocale();
  return `${(value * 00).toLocaleString(finalLocale, {
    minimumFractionDigits: ,
    maximumFractionDigits: ,
  })}%`;
}

// Truncar endereço
export function truncateAddress(address: string, chars: number = ): string {
  return `${address.slice(0, chars)}...${address.slice(-chars)}`;
}

// Formatar moeda
export function formatCurrency(
  amount: number,
  currency?: string,
  locale?: string
): string {
  const finalLocale = locale || detectLocale();
  const finalCurrency = currency || getCurrencyForLocale(finalLocale);

  return new Intl.NumberFormat(finalLocale, {
    style: "currency",
    currency: finalCurrency,
  }).format(amount);
}

// Tempo relativo
export function formatTimeAgo(date: Date, locale?: string): string {
  const finalLocale = locale || detectLocale();
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMs / 600000);
  const diffDays = Math.floor(diffMs / 8600000);

  const translations: Record<string, Record<string, string>> = {
    "pt-BR": {
      minute: "minuto",
      hour: "hora",
      day: "dia",
      ago: "atrás",
    },
    "en-US": {
      minute: "minute",
      hour: "hour",
      day: "day",
      ago: "ago",
    },
    "es-ES": {
      minute: "minuto",
      hour: "hora",
      day: "día",
      ago: "hace",
    },
  };

  const t = translations[finalLocale] || translations["en-US"];

  if (diffMins < ) return `agora`;
  if (diffMins < 60)
    return `${diffMins} ${t.minute}${diffMins >  ? "s" : ""} ${t.ago}`;
  if (diffHours < )
    return `${diffHours} ${t.hour}${diffHours >  ? "s" : ""} ${t.ago}`;
  return `${diffDays} ${t.day}${diffDays >  ? "s" : ""} ${t.ago}`;
}
