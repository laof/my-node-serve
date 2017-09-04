const cheerio = require('cheerio');
const http = require('http');
const request = require('request');
const fs = require('fs');
const path = require('path');

const successURL = 'http://www.la5.com/';
class Http {

    getNameByPath(pathname) {
        const str = (pathname + '').replace(/\//g, '-').split('.');
        const endName = str[str.length - 1];
        const __ = '.';
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
        const stream = fs.createWriteStream(savePath);
        request(url, (err, res, body) => {

            //  const  filepath = res.request.uri.href;
            //  this.saveData('d:file/'+this.getNameByPath(filepath), JSON.stringify(res.request.uri.href));

        }).pipe(stream).on('close', callback);
    }


    http(req, res) {

        const url = req.url;
        const promise = new Promise((resolve, reject) => {
            const options = {
                url: url,
                method: 'post',
                encoding: 'utf-8'
            }
            request(options, (err, res, body) => {
                if (err) {
                    reject(err);
                } else if (res.statusCode == 200) {
                    resolve(body);
                }
            });
        })

        promise.then(data => {
            const list = [];
            const resources = [];
            const $ = cheerio.load(data);

            $('#ajaxtable .subject').each((i, v) => {
                list.push($(v).attr('href'));
            })

            //第一页列表
            if (list.length) {
                list.forEach((v, i) => {
                    this.http({ url: successURL + v })
                })
            } else {
                //第二页资源
                const href = $('div[style="margin:0 10px 10px 15px;"] a').attr('href');
                if (href) {
                    const url = successURL + href;
                    console.log('下载：' + url);
                    const filename = new Date().getTime() + Math.random() * 10000 + '.torrent';
                    this.downLoadFile(url, 'd:/file/' + filename);
                }
            }


        }, error => {
            console.log(error.error);
        })

    }
}


new Http().http({
    url: successURL + 'thread-htm-fid-5-page-2.html'
})

module.exports = new Http().http;