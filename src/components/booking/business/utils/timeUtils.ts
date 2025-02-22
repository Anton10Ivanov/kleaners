
export const orderDaysChronologically = (days: string[], referenceDays: readonly string[]) => {
  return [...days].sort((a, b) => {
    return referenceDays.indexOf(a) - referenceDays.indexOf(b);
  });
};
