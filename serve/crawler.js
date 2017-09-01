let cheerio = require('cheerio');
let http = require('http');
let request = require('request');
let fs = require('fs');
let path = require('path');

class Http {

    getNameByPath(pathname) {
        let str = (pathname + '').replace(/\//g, '-').split('.');
        let endName = str[str.length - 1];
        let __ = '.';
        if (str.length > 30) {
            __ += str.substring(0, 30);
        } else {
            __ += endName;
        }
        return __;
    }

    saveData(url, data) {
        fs.writeFileSync(url, data);
    }

    downLoadFile(url, savePath, callback = () => { }) {
        let stream = fs.createWriteStream(savePath);
        request(url, (err, res, body) => {

            //  let  filepath = res.request.uri.href;
            //  this.saveData('d:file/'+this.getNameByPath(filepath), JSON.stringify(res.request.uri.href));

        }).pipe(stream).on('close', callback);
    }

    http(req, res) {

        let url = req.body.url;
        let promise = new Promise((resolve, reject) => {
            let options = {
                url: url,
                'User-Agent': 'Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/60.0.3112.101 Safari/537.36',
                encoding: 'utf-8'
            }
            return request(options, (err, res, body) => {
                if (err) {
                    reject(err);
                } else if (res.statusCode == 200) {
                    resolve(body);
                }

            });
        })

        promise.then(data => {
            let list = [];
            let $ = cheerio.load(data);

            // $('#common-packages img').each((i, v) => {
            //     list.push({
            //         name: $(v).find('.package-name').html(),
            //         text: $(v).find('.package-description').html()
            //     });
            // })

            //fs.writeFileSync(path.join(__dirname, '../file/res.html'), data);


            $('img').each((i, v) => {
                let url = $(v).attr('src');
                if (url && url !== 'undefined' && url.length > 2) {
                    let filename = new Date().getTime() + Math.random() * 10000 + '.png';
                    this.downLoadFile('https:' + url, 'd:/file/' + filename);
                }
            })

            // let tempImg='https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1504283956010&di=5087633160d163e2119f1ab1d75042e9&imgtype=jpg&src=http%3A%2F%2Fb.hiphotos.baidu.com%2Fimage%2Fpic%2Fitem%2Ffcfaaf51f3deb48f856b141ef91f3a292cf578eb.jpg';
            // let filename = new Date().getTime() + Math.random() * 10000 + '.jpg';

            // this.downLoadFile(tempImg, 'd:/file/' + filename);



        }, error => {
            console.log(error.error);
        })

    }
}


// new Http().downLoadFile(
//     'http://image.baidu.com/search/index?tn=baiduimage&ps=1&ct=201326592&lm=-1&cl=2&nc=1&ie=utf-8&word=%E9%A3%8E%E6%99%AF',
//     'fdfd',
//     ()=>{
//         console.log('下载');
//     }
// )

new Http().http({
    body: {
        url: 'http://image.baidu.com/search/index?tn=baiduimage&ps=1&ct=201326592&lm=-1&cl=2&nc=1&ie=utf-8&word=%E9%A3%8E%E6%99%AF'
    }
})

module.exports = new Http().http;