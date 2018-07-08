//
export const pipe = (...fns) => x => fns.reduce((y, f) => f(y), x);
//
const getEntriesFromObj = (entries) => Object.entries(entries);
//
const pushDataIntoProp = v => p => o => { o[p].push(v); return o; };
//
const pushLabel = v => o => pushDataIntoProp(v)('labels')(o);
//
const pushTotal = v => o => pushDataIntoProp(v)('data')(o);
//
const addAllLabels = data => newData => newData.reduce((acc, cur) => pushLabel(cur[0])(acc), data);
//
const addAllSales = data => newData => newData.reduce((acc, cur) => pushTotal(cur[1].sales)(acc), data);
//
export const prepareChartData = (resp) => {
    const { totals } = resp[0];
    const data = {
        labels: [],
        data:   []
    };

    pipe(getEntriesFromObj, addAllLabels(data))(totals);
    pipe(getEntriesFromObj, addAllSales(data))(totals);

    return data;
};