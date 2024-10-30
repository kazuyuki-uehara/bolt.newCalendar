const rokuyoList = ['大安', '赤口', '先勝', '友引', '先負', '仏滅'];

export const getRokuyo = (date: Date): string => {
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  
  // Simple calculation (this is a basic implementation)
  const index = (month + day) % 6;
  return rokuyoList[index];
};