let _currentDate = new Date();
_currentDate.setHours(0, 0, 0, 0);

function getDateRange(selection) {
  let currentDate = new Date();
  currentDate.setHours(0, 0, 0, 0);

  if (selection == 'Overdue') {
    return _getOverdueDateRange();
  } else if (selection == 'Today') {
    return _getTodayDateRange();
  } else if (selection == 'Tomorrow') {
    return _getTomorrowDateRange();
  } else if (selection == 'Next 7 Days') {
    return _getNextSevenDaysDateRange();
  }
}

function dateWithoutTimezoneOffset(dateString) {
  const date = new Date(dateString);
  const timezoneOffset = date.getTimezoneOffset();
  date.setMinutes(date.getMinutes() + timezoneOffset);

  return date;
}

function _getOverdueDateRange() {
  let date1 = new Date(1);
  let date2 = _currentDate;

  return [date1, date2];
}

function _getTodayDateRange() {
  let date1 = _currentDate;
  let date2 = _addDays(1);

  return [date1, date2];
}
function _getTomorrowDateRange() {
  let date1 = _addDays(1);
  let date2 = _addDays(2);

  return [date1, date2];
}

function _getNextSevenDaysDateRange() {
  let date1 = _currentDate;
  let date2 = _addDays(6);

  return [date1, date2];
}

function _addDays(days, date = _currentDate) {
  const dateCopy = new Date(date);
  dateCopy.setDate(dateCopy.getDate() + days);

  return dateCopy;
}

export { getDateRange, dateWithoutTimezoneOffset };
