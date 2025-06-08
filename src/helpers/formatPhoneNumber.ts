export function formatPhoneNumber(raw: string): string {
  const withoutPrefix = raw.replace(/^(\+34)?/, '');

  const digits = withoutPrefix.replace(/\D/g, '').slice(0, 9);

  const formatted = digits.replace(
    /^(\d{0,3})(\d{0,2})(\d{0,2})(\d{0,2})$/,
    (_, g1, g2, g3, g4) => {
      let result = g1;
      if (g2) result += ' ' + g2;
      if (g3) result += ' ' + g3;
      if (g4) result += ' ' + g4;
      return result;
    }
  );

  return `+34 ${formatted}`.trim();
}
