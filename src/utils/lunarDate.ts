import { format } from 'date-fns';

// 2024年の旧暦データ（実際のアプリケーションでは、より広い期間のデータと
// 正確な計算ロジックまたはAPIを使用することを推奨します）
const lunarDates2024: { [key: string]: string } = {
  '2024-01-01': '11/19',
  '2024-01-10': '11/28',
  '2024-01-11': '11/29',
  '2024-02-09': '12/30',
  '2024-02-10': '1/1',
  '2024-03-10': '2/1',
  '2024-04-08': '3/1',
  '2024-05-07': '4/1',
  '2024-06-05': '5/1',
  '2024-07-04': '6/1',
  '2024-08-02': '7/1',
  '2024-09-01': '8/1',
  '2024-09-30': '9/1',
  '2024-10-30': '9/28',
  '2024-10-31': '9/29',
  '2024-11-29': '10/28',
  '2024-12-28': '11/27'
};

export const getLunarDate = (date: Date): string => {
  const dateStr = format(date, 'yyyy-MM-dd');
  
  let closestDate = Object.keys(lunarDates2024)
    .sort((a, b) => {
      const diffA = Math.abs(new Date(a).getTime() - date.getTime());
      const diffB = Math.abs(new Date(b).getTime() - date.getTime());
      return diffA - diffB;
    })[0];

  const [lunarMonth, lunarDay] = lunarDates2024[closestDate].split('/').map(Number);
  
  const daysDiff = Math.floor((date.getTime() - new Date(closestDate).getTime()) / (1000 * 60 * 60 * 24));
  const adjustedLunarDay = lunarDay + daysDiff;
  
  const daysInMonth = 30;
  if (adjustedLunarDay > daysInMonth) {
    return `${(lunarMonth % 12) + 1}/${adjustedLunarDay - daysInMonth}`;
  }
  if (adjustedLunarDay < 1) {
    return `${lunarMonth}/${daysInMonth + adjustedLunarDay}`;
  }
  
  return `${lunarMonth}/${adjustedLunarDay}`;
};

export const formatLunarDate = (lunarDate: string): string => {
  return lunarDate;
};