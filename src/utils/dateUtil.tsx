import { Dayjs } from 'dayjs';

type ModeUnit = 'day' | 'week' | 'quarter' | 'month' | 'year' | 'hour' | 'minute' | 'second' | 'millisecond';

const disabledDateUtil = (
  startDate: Dayjs | null,
  endDate: Dayjs | null,
  currentDate: Dayjs,
  period = 60,
  mode: ModeUnit = 'day'
) => {
  const isBeforeSelectDate = startDate && currentDate.diff(startDate, mode) >= period;
  const isAfterSelectDate = endDate && endDate.diff(currentDate, mode) >= period;
  return !!isAfterSelectDate || !!isBeforeSelectDate;
};


export const dateUtil={
  disabledDateUtil
}