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
