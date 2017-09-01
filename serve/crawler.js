let cheerio = require('cheerio');
let server = require('http');

module.exports = (req, res) => {
    let url = req.body.url;
    let promise = new Promise((resolve, reject) => {
        return http.get(url, res => {
            let html = '';

            res.on('data', (chunk) => {
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

        console.log(list);
    }, error => {
        console.log(error);
    })

}
