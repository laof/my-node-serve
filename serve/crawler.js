let cheerio = require('cheerio');
let http = require('http');

class Http {

    http(req, res) {

        let url = req.body.url; console.log('url++++++' + url);
        let promise = new Promise((resolve, reject) => {
            return http.get(url, res => {
                let html = '';
                console.log('start p ..'.info);
                res.on('data', (chunk) => {
                    console.log('p++ .....'.info);
                    html += chunk;
                })
                res.on('end', res => {
                    console.log('wanc'.error);
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

            console.log(list.data);
        }, error => {
            console.log(error.error);
        })

    }
}


new Http().http({
    body: {
        url: 'http://www.bootcdn.cn/all'
    }
})

module.exports = new Http().http;