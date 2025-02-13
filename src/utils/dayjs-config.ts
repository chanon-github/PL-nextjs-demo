import dayjs from 'dayjs';
import weekday from 'dayjs/plugin/weekday';
import localeData from 'dayjs/plugin/localeData';
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter';
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore';

// Extend Day.js with the necessary plugins
dayjs.extend(weekday);
dayjs.extend(localeData);
dayjs.extend(isSameOrAfter);
dayjs.extend(isSameOrBefore);

export default dayjs;