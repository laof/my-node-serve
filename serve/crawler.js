let cheerio = require('cheerio');
let http = require('http');

class Http {

    http(req, res) {

        let url = req.body.url; console.log('url++++++' + url);
        let promise = new Promise((resolve, reject) => {

            return http.get(url, res => {
                let html = '';
                res.on('data', (chunk) => {
                    html += chunk;
                    console.log('................'.data);
                })
                res.on('end', res => {
                    console.log('完成..'.error);
                    resolve(html);
                })

            }).on('error', res => {
                reject(res);
            });
        })

        promise.then(data => {
            let list = [];
            let $ = cheerio.load(data);console.log(data.warn);

            $('#common-packages .list-group-item').each((i, v) => {
                list.push({
                    name: $(v).find('package-name').html(),
                    text: $(v).find('.package-description').html()
                });
            })

        }, error => {
            console.log(error.error);
        })

    }
}


new Http().http({
    body: {
        url: 'http://www.jd.com'
    }
})

module.exports = new Http().http;