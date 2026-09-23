const ARABIC_INDIC_DIGITS = '٠١٢٣٤٥٦٧٨٩';

/**
 * Formats a number for the page's locale. Arabic uses Arabic-Indic digits with the Arabic
 * thousands (٬) and decimal (٫) separators, as the v3 design does; English uses 1,234.5.
 */
export function formatNumber(value, { locale = 'en', decimals = 0, grouping = true } = {}) {
  const western = new Intl.NumberFormat('en-US', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
    useGrouping: grouping,
  }).format(value);

  if (locale !== 'ar') return western;
  return western
    .replace(/\d/g, (digit) => ARABIC_INDIC_DIGITS[digit])
    .replace(/,/g, '٬')
    .replace(/\./g, '٫');
}

/** Fills `{name}` placeholders in a copy string: interpolate('{n} stars', { n: 5 }). */
export function interpolate(template, values) {
  return template.replace(/\{(\w+)\}/g, (match, key) =>
    Object.hasOwn(values, key) ? String(values[key]) : match,
  );
}

/**
 * Splits a count into the value and scale it is quoted in:
 * 100_000 → { value: 100, scale: 'thousand', decimals: 0 }; 1_300 → { value: 1.3, …, decimals: 1 }.
 */
export function toCompact(count) {
  const [value, scale] =
    count >= 1e6
      ? [count / 1e6, 'million']
      : count >= 1e3
        ? [count / 1e3, 'thousand']
        : [count, null];
  return { value, scale, decimals: Number.isInteger(value) ? 0 : 1 };
}

/** A count in the locale's short form (`numbers.thousand` / `numbers.million`): "١٠٠ ألف", "1.3K". */
export function formatCompact(count, { locale, numbers }) {
  const { value, scale, decimals } = toCompact(count);
  const n = formatNumber(value, { locale, decimals });
  return scale ? interpolate(numbers[scale], { n }) : n;
}

/** A count with its noun in the plural form the locale needs ({ one, two, few, many, other }). */
export function formatPlural(count, forms, { locale }) {
  const form = forms[new Intl.PluralRules(locale).select(count)] ?? forms.other;
  return interpolate(form, { n: formatNumber(count, { locale }) });
}

/**
 * An ISO date (YYYY-MM-DD) with the locale's own month names: "٢٠ سبتمبر ٢٠٢٦".
 * Deliberately not Intl.DateTimeFormat: pre-rendered and hydrated text must match exactly,
 * and its locale data (digits, month names) varies between engines and ICU versions.
 */
export function formatDate(iso, { locale, dates }) {
  const [year, month, day] = iso.split('-').map(Number);
  return interpolate(dates.format, {
    day: formatNumber(day, { locale }),
    month: dates.months[month - 1],
    year: formatNumber(year, { locale, grouping: false }),
  });
}
