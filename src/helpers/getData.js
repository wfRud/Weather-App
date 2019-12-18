const getDays = (arr = [], chunks = 0) =>
  arr.reduce((resultArray, item, index) => {
    const chunkIndex = Math.floor(index / chunks);
    if (!resultArray[chunkIndex]) {
      resultArray[chunkIndex] = [];
    }

    resultArray[chunkIndex].push(item);
    return resultArray;
  }, []);

const getEachDayDetails = (days = [], key = null, value = null) =>
  days.map(day =>
    day.map(item => {
      if (Array.isArray(item[key])) {
        return item[key][0][value];
      } else {
        return item[key][value];
      }
    })
  );

const getAverages = (arr = []) => {
  return arr.map(item => {
    const averages =
      item.reduce(
        (previousValue, currentValue) => previousValue + currentValue
      ) / item.length;
    return Number(averages.toFixed());
  });
};

const getMostUsedDesc = (arr = []) => {
  return arr.map(item => {
    const average = item.reduce(
      (prev, current, i, arr) =>
        arr.filter(filterItem => filterItem === prev).length >=
        arr.filter(filterItem => filterItem === current)
          ? prev
          : current,
      null
    );
    return average;
  });
};

const getEachDay = obj => {
  let result = [];
  for (let key in obj) {
    obj[key].reduce((acc, element, index) => {
      if (acc.length < obj[key].length) {
        const day = {
          [key]: element
        };
        acc.push(day);
      } else {
        acc[index][key] = element;
      }
      return acc;
    }, result);
  }
  return result;
};

export { getDays, getEachDayDetails, getAverages, getMostUsedDesc, getEachDay };
