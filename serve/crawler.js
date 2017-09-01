let cheerio = require('cheerio');
let http =  require('http');

module.exports = (req, res) => {

    let url = req.body.url;
    let promise = new Promise((resolve, reject) => {
        return http.get(url, res => {
            let html = '';
            console.log('start p ..'.info);
            res.on('data', (chunk) => {
                console.log(' p++ .....'.info);
                html += chunk;
            })
            res.on('end', res => {
                resolve(html);
            })

        }).on('error', res => {
            reject(res);
        });
    })

    promise.then(data => {
        let list = [];
        let $ = cheerio.load(data);
        $('#common-packages .list-group-item').each((i, v) => {
            list.push({
                name: $(v).find('package-name').html(),
                text: $(v).find('.package-description').html()
            });
        })

        console.log(list.info);
    }, error => {
        console.log(error);
    })

}
