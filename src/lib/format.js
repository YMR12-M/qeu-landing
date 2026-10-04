/**
 * Formats a number for the page: digits 0–9 in both languages, with a comma between thousands
 * and a point before decimals (1,252 · 4.7), as Qeu's app writes its prices and the stores
 * their figures. Callers may pass their `locale`: only the words around a figure differ.
 */
export function formatNumber(value, { decimals = 0, grouping = true } = {}) {
  return new Intl.NumberFormat('en-US', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
    useGrouping: grouping,
  }).format(value);
}

/**
 * A price in riyals, in the locale's `template` ("{n} ر.س" / "SAR {n}"): 9.8 → "9.80 ر.س",
 * "SAR 9.80". Whole riyals are written without halalas: 16 → "16".
 */
export function formatPrice(value, { locale, template = '{n}' }) {
  const n = formatNumber(value, { locale, decimals: Number.isInteger(value) ? 0 : 2 });
  return interpolate(template, { n });
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

/** A count in the locale's short form (`numbers.thousand` / `numbers.million`): "100 ألف", "1.3K". */
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
 * An ISO date (YYYY-MM-DD) with the locale's own month names: "20 سبتمبر 2026".
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
