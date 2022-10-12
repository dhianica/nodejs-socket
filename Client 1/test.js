const axios = require('axios');


(async () => {
    const customId = 'hvbWL1joLk2o9kpHfExWGw'
    console.time("dbsave");
    const result = await axios.post('http://127.0.0.1:5678/', { type: customId })
    console.log(result.data);
    console.timeEnd("dbsave");
})()