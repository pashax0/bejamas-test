export const adoptPrices = (breakpoints, currency = '$') => {
  const middleIntervals = breakpoints.reduce((acc, value, index) => {
    const current = {
      interval: index === 0 ? [acc[0].interval[0], value - 1] : [acc[index].interval[1] + 1, value - 1],
      condition: index === 0 ? `x < ${value}` : `x >= ${acc[index].interval[1] + 1} && x < ${value}`,
      description: index === 0 ? `Lower than ${currency}${breakpoints[0]}` : `${currency}${acc[index].interval[1] + 1} - ${currency}${value}`,
    };

    return [...acc, current];
  }, [{
    interval: [0],
  }]);

  middleIntervals.shift();
  const lastInterval = {
    interval: [breakpoints[breakpoints.length - 1], breakpoints[breakpoints.length - 1]],
    condition: `x >= ${breakpoints[breakpoints.length - 1]}`,
    description: `More than ${currency}${breakpoints[breakpoints.length - 1]}`,
  };

  return [...middleIntervals, lastInterval];
};
