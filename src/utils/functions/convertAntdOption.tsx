export const arrConvertToOptionsAntd = (props: { arr: Array<any>; fieldValue: string; fieldlabel: string }) => {
  if (props.arr) {
    return props.arr.map((item: any, idx: number) => {
      return { value: item[props.fieldValue], label: item[props.fieldlabel] };
    });
  }
  return [{ value: 'ไม่พบข้อมูล', label: 'ไม่พบข้อมูล' }];
};

export const skipConvertToPage = (page: number, pageSize: number) => {
  return (page - 1) * pageSize;
};

export const covertDataToKeyObject = (data: any, field: any) => {
  return data?.reduce((accumulator: any, data: any, index: number) => {
    const key = data[field];
    const customKey = Array.isArray(key) ? (key.length == 2 ? key[0] : key[key.length - 2]) : key;
    accumulator[customKey] = data;
    return accumulator;
  }, {});
};
