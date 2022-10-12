let notes = [
  {
      "cuid": "TCR_CASSETTE_1",
      "currency": "IDR",
      "denom": 100000,
      "count": 2,
      "capacity": 2700,
      "fill": "CULOW",
      "rev": 5,
      "type": "CIM_TYPERECYCLING",
      "stat": "CUOK",
      "status_denom": "0000",
      "cassete_info_datetime": "2022-04-21 14:37:53"
  },
  {
      "cuid": "TCR_CASSETTE_2",
      "currency": "IDR",
      "denom": 100000,
      "count": 0,
      "capacity": 2700,
      "fill": "CUEMPTY",
      "rev": 5,
      "type": "CIM_TYPERECYCLING",
      "stat": "CUOK",
      "status_denom": "0005",
      "cassete_info_datetime": "2022-04-21 14:37:53"
  },
  {
      "cuid": "TCR_CASSETTE_3",
      "currency": "IDR",
      "denom": 50000,
      "count": 2,
      "capacity": 2700,
      "fill": "CULOW",
      "rev": 5,
      "type": "CIM_TYPERECYCLING",
      "stat": "CUOK",
      "status_denom": "0000",
      "cassete_info_datetime": "2022-04-21 14:37:53"
  },
  {
      "cuid": "TCR_CASSETTE_4_UPPER",
      "currency": "IDR",
      "denom": 20000,
      "count": 1,
      "capacity": 1050,
      "fill": "CULOW",
      "rev": 5,
      "type": "CIM_TYPERECYCLING",
      "stat": "CUOK",
      "status_denom": "0000",
      "cassete_info_datetime": "2022-04-21 14:37:53"
  },
  {
      "cuid": "TCR_CASSETTE_4_LOWER",
      "currency": "IDR",
      "denom": 10000,
      "count": 2,
      "capacity": 750,
      "fill": "CULOW",
      "rev": 5,
      "type": "CIM_TYPERECYCLING",
      "stat": "CUOK",
      "status_denom": "0000",
      "cassete_info_datetime": "2022-04-21 14:37:53"
  },
  {
      "cuid": "TCR_CASSETTE_5",
      "currency": "IDR",
      "denom": 1000,
      "count": 2,
      "capacity": 2700,
      "fill": "CULOW",
      "rev": 1,
      "type": "CIM_TYPECASHIN",
      "stat": "CUOK",
      "status_denom": "0005",
      "cassete_info_datetime": "2022-04-21 14:37:53"
  },
  {
      "cuid": "TCR_CASSETTE_5",
      "currency": "IDR",
      "denom": 1000,
      "count": 0,
      "capacity": 2700,
      "fill": "CULOW",
      "rev": 5,
      "type": "CIM_TYPECASHIN",
      "stat": "CUOK",
      "status_denom": "0005",
      "cassete_info_datetime": "2022-04-21 14:37:53"
  },
  {
      "cuid": "TCR_CASSETTE_5",
      "currency": "IDR",
      "denom": 2000,
      "count": 2,
      "capacity": 2700,
      "fill": "CULOW",
      "rev": 5,
      "type": "CIM_TYPECASHIN",
      "stat": "CUOK",
      "status_denom": "0005",
      "cassete_info_datetime": "2022-04-21 14:37:53"
  },
  {
      "cuid": "TCR_CASSETTE_5",
      "currency": "IDR",
      "denom": 5000,
      "count": 1,
      "capacity": 2700,
      "fill": "CULOW",
      "rev": 1,
      "type": "CIM_TYPECASHIN",
      "stat": "CUOK",
      "status_denom": "0005",
      "cassete_info_datetime": "2022-04-21 14:37:53"
  },
  {
      "cuid": "TCR_CASSETTE_5",
      "currency": "IDR",
      "denom": 5000,
      "count": 1,
      "capacity": 2700,
      "fill": "CULOW",
      "rev": 5,
      "type": "CIM_TYPECASHIN",
      "stat": "CUOK",
      "status_denom": "0005",
      "cassete_info_datetime": "2022-04-21 14:37:53"
  },
  {
      "cuid": "TCR_CASSETTE_5",
      "currency": "IDR",
      "denom": 10000,
      "count": 0,
      "capacity": 2700,
      "fill": "CULOW",
      "rev": 5,
      "type": "CIM_TYPECASHIN",
      "stat": "CUOK",
      "status_denom": "0005",
      "cassete_info_datetime": "2022-04-21 14:37:53"
  },
  {
      "cuid": "TCR_CASSETTE_5",
      "currency": "IDR",
      "denom": 20000,
      "count": 1,
      "capacity": 2700,
      "fill": "CULOW",
      "rev": 5,
      "type": "CIM_TYPECASHIN",
      "stat": "CUOK",
      "status_denom": "0005",
      "cassete_info_datetime": "2022-04-21 14:37:53"
  },
  {
      "cuid": "TCR_CASSETTE_5",
      "currency": "IDR",
      "denom": 50000,
      "count": 0,
      "capacity": 2700,
      "fill": "CULOW",
      "rev": 5,
      "type": "CIM_TYPECASHIN",
      "stat": "CUOK",
      "status_denom": "0005",
      "cassete_info_datetime": "2022-04-21 14:37:53"
  },
  {
      "cuid": "TCR_CASSETTE_5",
      "currency": "IDR",
      "denom": 100000,
      "count": 0,
      "capacity": 2700,
      "fill": "CULOW",
      "rev": 5,
      "type": "CIM_TYPECASHIN",
      "stat": "CUOK",
      "status_denom": "0005",
      "cassete_info_datetime": "2022-04-21 14:37:53"
  }
]
const result = [...notes.reduce((r, o) => {
  const key = o.cuid + '-' + o.denom;
  
  const item = r.get(key) || Object.assign({}, o, {
    count: 0,
  });
  
  item.count += o.count;

  return r.set(key, item);
}, new Map).values()];

console.log(JSON.stringify(result));