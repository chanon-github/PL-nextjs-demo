import dayjs from 'dayjs';
import minMax from 'dayjs/plugin/minMax';
import utc from 'dayjs/plugin/utc';

dayjs.extend(utc);
dayjs.extend(minMax);

export const groupbyTimeRange = (data: Array<any>) => {
  if (typeof data !== 'undefined') {
    if (data.length > 0) {
      const input = data;
      const param = 'hour';
      const interval = 1;
      const times = input.map((x) => dayjs(x.time).utc());
      const min = dayjs.min(times)!.utc();
      const max = dayjs.max(times)!.utc();
      const start = min;
      const size = max.diff(min, param, true);

      const ranges = new Array(Math.ceil(size + 1)).fill(0).map((_, i) => {
        return start
          .add(i, param)
          .set('minutes', i * interval)
          .utc();
      });
      const toString = (x: any) => dayjs(x).utc().startOf(param).format('YYYY MM DD : HH:mm:ss');
      const dict = ranges.reduce((acc: any, x: any) => {
        const stringFormat = toString(x);
        acc[stringFormat] = [];
        return acc;
      }, {});

      const grouped = input.reduce((acc, x) => {
        const stringFormat = toString(x.time);
        if (typeof dict[stringFormat] !== 'undefined') {
          dict[stringFormat].push(x);
        }
        return acc;
      }, dict);

      const sumTotal = (array: any) =>
        array.reduce((acc: any, x: any) => {
          // Set initial values if they are undefined
          acc['time'] = dayjs.utc(x.time).set('minute', 0).toISOString();
          acc['kwh'] = acc['kwh'] === undefined ? 0 : acc['kwh'];
          acc['duration'] = acc['duration'] === undefined ? 0 : acc['duration'];
          // Update the values
          acc['kwh'] = acc['kwh'] + x.kwh;
          acc['duration'] = acc['duration'] + parseInt(x.duration);
          return acc;
        }, {});

      const result = Object.fromEntries(Object.entries(grouped).map(([key, value]) => [key, sumTotal(value)]));

      return Object.values(result).filter((item: any) => Object.keys(item).length !== 0 && item.constructor === Object);
    }
  }
  return [];
};

export const HourTickData = (data: Array<any>) => {
  const hourlyDataInOneDay = [];
  let currentHour: any = null;
  let duration = 0;
  let kwh = 0;
  if (typeof data === 'undefined') {
    return [];
  }

  data.forEach((item) => {
    const currentTime = dayjs(item.time).utc();
    const currentHourStart = currentTime.startOf('hour');

    if (currentHour === null) {
      currentHour = currentHourStart;
    }

    if (currentHour.isSame(currentHourStart, 'hour')) {
      duration += parseInt(item.duration);
      kwh += item.kwh;
    } else {
      hourlyDataInOneDay.push({
        time: currentHour.toISOString(),
        end: currentHour.endOf('hour').format('HH:mm'),
        duration: duration,
        kwh: kwh,
      });
      currentHour = currentHourStart;
      duration = parseInt(item.duration);
      kwh = item.kwh;
    }
  });

  if (currentHour !== null) {
    hourlyDataInOneDay.push({
      time: currentHour.toISOString(),
      end: currentHour.endOf('hour').format('HH:mm'),
      duration: duration,
      kwh: kwh,
    });
  }
  return hourlyDataInOneDay;
};

export const convertSecondsToHMS = (seconds: number) => {
  let hours = Math.floor(seconds / 3600);
  let minutes = Math.floor((seconds % 3600) / 60);
  let remainingSeconds = seconds % 60;

  let result = {
    hours: hours,
    minutes: minutes,
    seconds: remainingSeconds,
  };

  return result;
};
