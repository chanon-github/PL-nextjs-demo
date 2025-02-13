export const TotalKwh = (data: Array<any>) => {
  if (!Array.isArray(data)) {
    return 0;
  }
  const total = data?.reduce((accumulator, currentValue) => accumulator + currentValue.kwh, 0);
  return total;
};

export const filterZeroKwh = (data: Array<any>, threshold: number) => {
  return data?.filter((data: any) => data.kwh > threshold);
};

export const filterZeroDuration = (data: Array<any>, threshold: number) => {
  return data?.filter((data: any) => data.duration / 3600 > threshold);
};

export const findMaxValueKwh = (data: Array<any>) => {
  return Math.max(...(data.map((item: any) => item.kwh) || 0));
};

export const findMaxValueDuration = (data: Array<any>) => {
  return Math.max(...(data.map((item: any) => item.duration) || 0));
};

export const convertBarChartDuration = (data: Array<any>) => {
  return data?.map((item: any) => ({ ...item, duration: parseInt(item.duration) / 60 }));
};

export const convertDuration = (data: Array<any>) => {
  return data?.map((item: any) => {
    return { ...item, duration: parseInt(item.duration) };
  });
};
export const TotalDuration = (data: Array<any>) => {
  if (!Array.isArray(data)) {
    return 0;
  }
  const total = data.reduce((accumulator, currentValue) => accumulator + currentValue.duration, 0);
  return total;
};
