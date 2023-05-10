export const getCountByDay = (data: any) => {
  const countByDay = data.reduce((acc: any, event: any) => {
    const date = new Date(event.timestamp);
    const day = new Date(date.getFullYear(), date.getMonth(), date.getDate())
      .toISOString()
      .slice(0, 10);

    if (acc[day]) {
      acc[day]++;
    } else {
      acc[day] = 1;
    }

    return acc;
  }, {});

  return Object.entries(countByDay).map(([timestamp, count]) => ({
    timestamp,
    count,
  }));
};
