export function calculateDailyTotals(dayData) {
  const totals = {};

  Object.values(dayData || {}).forEach((category) => {
    if (!category) return;
    totals[category] = (totals[category] || 0) + 1;
  });

  return totals;
}

export function calculateWeeklyTotals(weekData) {
  const totals = {};

  Object.values(weekData || {}).forEach((day) => {
    Object.values(day || {}).forEach((category) => {
      if (!category) return;
      totals[category] = (totals[category] || 0) + 1;
    });
  });

  return totals;
}

export function calculateMonthlyTotals(monthWeeks) {
  const totals = {};

  monthWeeks.forEach((week) => {
    Object.values(week).forEach((day) => {
      Object.values(day || {}).forEach((category) => {
        if (!category) return;
        totals[category] = (totals[category] || 0) + 1;
      });
    });
  });

  return totals;
}
