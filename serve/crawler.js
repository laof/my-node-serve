const cheerio = require('cheerio');
const http = require('http');
const request = require('request');
const fs = require('fs');
const path = require('path');

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

        const url = req.body.url;
        const promise = new Promise((resolve, reject) => {
            const options = {
                url: url,
                method: 'get',
                headers: {
                    key: {
                        encSecKey: '161be30e7dc344819d03cf6775beaa2e26eb74e9f97d1ea75a8c89b0aaa4ea2fe36db2abe671a3e460c435bbc2e5ed1d1ced784fada2e6ee703286dc8e6abbb181a921eee5e733e9e19792f409f59b86999a641d7a59f1dfb55a8b4897dea584b2938f3c4dc312b8c73a87de1f070c13a142cb35a026cc518b732ee22d406f41',
                        params: 'params:4SYaa23E3XGJpXQwa+Uyvrl8a0861//sSMd5O8IYGtGUpq+UKzkosTjvbcNp3BgdZjCTO6ShtsjpTyrG2AEMQztS9sCdjaExNQRdCGFgrSk='
                    },
                    agent: 'Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/60.0.3112.101 Safari/537.36',
                    Accept: '*/*',
                    'Accept-Encoding': 'gzip, deflate, br',
                    'Accept-Language': 'zh-CN,zh;q=0.8',
                    Connection: 'keep-alive',
                    'Content-Length': 414,
                    len: 10,
                    Host: 'music.163.com',
                    Origin: 'https://music.163.com',
                    Referer: 'https://music.163.com/',
                    'Content-Type': 'application/x-www-form-urlencoded',
                    Cookie: "usertrack=c+5+hljmdpW0PS/aBgLIAg==; _ntes_nnid=3414b58ddbe0f9d0b5cf0eb6390f584b,1491498634691; _ntes_nuid=3414b58ddbe0f9d0b5cf0eb6390f584b; UM_distinctid=15b48d91f3a5f9-02d2cada2bdc9e-1e1c7459-384000-15b48d91f3bc74; vjuids=2a13eccdf.15b48d9214b.0.097d9d7b82e38; vjlast=1491575841.1491575841.30; vinfo_n_f_l_n3=de0aea4e2e9d98bb.1.0.1491575841152.0.1491576080153; _ga=GA1.2.2092217868.1491498635; mail_psc_fingerprint=2552ba3bf0b382a85b4d08a1202a3360; P_INFO=m18030893186@163.com|1503705970|0|other|10&14|null&null&null#sic&511600#10#0#0|180186&1|urs|18030893186@163.com; JSESSIONID-WYYY=KBcHs0xYHqCVc%5CE03d1KqmaH%5CbhWf29Zf1s6c0496jxOgzgO31qFxrppr3ryiGZGuQ%5CeCioYKr7xqhMy%2FijyW8WTUC%2FQOvotmyNpGIw9vz%2FuxR9NDPCxpq4KqfCoQuW3bNQU7EFPnX3VV5%2FIufIx9Madvvyzn13Zxrki0diPNg%2F7Yoeh%3A1504283738457; _iuqxldmzr_=32; __utma=94650624.2092217868.1491498635.1504278459.1504281205.3; __utmb=94650624.7.10.1504281205; __utmc=94650624; __utmz=94650624.1504278459.2.2.utmcsr=baidu|utmccn=(organic)|utmcmd=organic; playerid=41871104",
                    encSecKey: '161be30e7dc344819d03cf6775beaa2e26eb74e9f97d1ea75a8c89b0aaa4ea2fe36db2abe671a3e460c435bbc2e5ed1d1ced784fada2e6ee703286dc8e6abbb181a921eee5e733e9e19792f409f59b86999a641d7a59f1dfb55a8b4897dea584b2938f3c4dc312b8c73a87de1f070c13a142cb35a026cc518b732ee22d406f41',
                    params: '4SYaa23E3XGJpXQwa+Uyvrl8a0861//sSMd5O8IYGtGUpq+UKzkosTjvbcNp3BgdZjCTO6ShtsjpTyrG2AEMQztS9sCdjaExNQRdCGFgrSk=',
                    'User-Agent': 'Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/60.0.3112.101 Safari/537.36'
                },
                encoding: 'utf-8'
            }
            request.cookie(options.headers.Cookie);
            return request(options, (err, res, body) => {
                console.log(res);
                this.saveData('d:file/ddd.json', JSON.stringify(res));
                if (err) {
                    reject(err);
                } else if (res.statusCode == 200) {
                    resolve(body);
                }

            });
        })

        promise.then(data => {
            const list = [];
            const $ = cheerio.load(data);

            console.log(data);

            // $('#common-packages img').each((i, v) => {
            //     list.push({
            //         name: $(v).find('.package-name').html(),
            //         text: $(v).find('.package-description').html()
            //     });
            // })

            //fs.writeFileSync(path.join(__dirname, '../file/res.html'), data);


            // $('img').each((i, v) => {
            //     const url = $(v).attr('src');
            //     if (url && url !== 'undefined' && url.length > 2) {
            //         const filename = new Date().getTime() + Math.random() * 10000 + '.png';
            //         this.downLoadFile('https:' + url, 'd:/file/' + filename);
            //     }
            // })

            // const tempImg='https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1504283956010&di=5087633160d163e2119f1ab1d75042e9&imgtype=jpg&src=http%3A%2F%2Fb.hiphotos.baidu.com%2Fimage%2Fpic%2Fitem%2Ffcfaaf51f3deb48f856b141ef91f3a292cf578eb.jpg';
            // const filename = new Date().getTime() + Math.random() * 10000 + '.jpg';

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

// new Http().downLoadFile(
//     'http://m10.music.126.net/20170901232042/d212b4450b4295cf5c66ad092835ac9d/ymusic/caba/9528/be37/98904c87e82ec0c92599d8c0a7ffad2d.mp3',
//     'd:file/test.mp3'
// )

// new Http().http({
//     body: {
//         url: 'http://image.baidu.com/search/index?tn=baiduimage&ps=1&ct=201326592&lm=-1&cl=2&nc=1&ie=utf-8&word=%E9%A3%8E%E6%99%AF'
//     }
// })
// new Http().http({
//     body: {
//         url: 'http://tj.nineton.cn/Heart/index/all?city=CHSC000000'
//     }
// })

module.exports = new Http().http;