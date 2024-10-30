import { format } from 'date-fns';

export const getJapaneseEra = (date: Date): { era: string, year: number } => {
  const year = date.getFullYear();
  if (year >= 2019) return { era: '令和', year: year - 2018 };
  if (year >= 1989) return { era: '平成', year: year - 1988 };
  if (year >= 1926) return { era: '昭和', year: year - 1925 };
  return { era: '', year: 0 };
};

export const formatJapaneseEra = (date: Date): string => {
  const { era, year } = getJapaneseEra(date);
  return `${era}${year}年`;
};