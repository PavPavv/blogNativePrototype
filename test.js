let da = [
  {
    id: 1,
    test: 'test1',
  },
  {
    id: 2,
    test: 'test2',
  },
  {
    id: 3,
    test: 'test3',
  },
  {
    id: 4,
    test: 'test4',
  },
  {
    id: 5,
    test: 'test5',
  },
  {
    id: 6,
    test: 'test6',
  },
  {
    id: 7,
    test: 'test7',
  },
  {
    id: 8,
    test: 'test8',
  },
  {
    id: 9,
    test: 'test9',
  },
];
let filtersArray = [1];


const complexFilters = (data, filtersArr) => {
  let lastFiltersElem = filtersArr[filtersArr.length - 1];
  let lastIndex = filtersArr.findIndex(el => el === lastFiltersElem);
  let newData = [];

  for (let i = 0; i < filtersArr.length; i++) {
    if (filtersArr.length > 1) {
      if (i === 0) {
        newData = data.filter(dataItem => dataItem.id !== filtersArr[0]);
      } else if (i === lastIndex) {
        const finalData = newData.filter(dataItem => dataItem.id !== lastFiltersElem);
        return finalData;
      } else {
        let iterData = newData.filter(dataItem => dataItem.id !== filtersArr[i]);
        newData = iterData;
      }
    } else {
      return data.filter(dataItem => dataItem.id !== filtersArr[0]);
    }
  }
};

console.log(complexFilters(da, filtersArray));
