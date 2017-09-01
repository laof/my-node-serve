

module.exports = (req, res) => {

    let city = req.body.city;
    //console.log(req.headers.cookie);
    //console.log(arg.city);CHSC000000

    let promise = new Promise((resolve, reject) => {

        http.get('http://tj.nineton.cn/Heart/index/all?city=' + city, (res) => {
            let data = '';
            let titles = [];
            res.setEncoding('utf-8');
            //监听data事件，每次取一块数据
            res.on('data', (chunk) => {
                data += chunk;
            });
            res.on('end', () => {
                resolve(data);
            });

        }).on('error', (err) => {
            reject(err);
            console.log(err);
        });

    });

    promise.then((promres) => {
        res.send(promres);
    }, (err) => {
        res.send({ sucess: false, code: 404 });
    })
}