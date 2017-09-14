const cheerio = require('cheerio');
const http = require('http');
const request = require('request');
const fs = require('fs');
const path = require('path');
const phantom = require('phantom');

const successURL = 'http://www.la5.com/';
class Http {

    async download() {
        console.log('async');
        const instance = await phantom.create();
        const page = await instance.createPage();
        const status =await page.open('https://music.163.com/#/song?id=169185');
    
        await page.includeJs('https://cdn.bootcss.com/jquery/1.10.0/jquery.min.js');
    
        await page.evaluate( function(){
            var resData = 'defulat';
            $.ajax({
                url: 'https://music.163.com/weapi/song/enhance/player/url?csrf_token=',
                type: 'post',
                async: false,
                data: {
                    params: '3LJFZrU5yL5sd3FVTgckLjELOIU0VlfpL4B6d8ZlBOiLSXEn53732/fh20g/+FiirrEoHPzdpq8n192oCDfZfG5gndzCxLibT8WZ4DbtpkAbsXUqroLzXG0X6q5UozL/',
                    encSecKey: '106aa1a4391542d1768aa40bc971b768bf081586b694897dbe43cd16f5f2c3b44ba924a70370008e3a0453ba9a76000c77de757d4fae286d35f687f906d0e3b76accd5616f4201a0ead815ca9bb4ddec24e011b59965064100d2e321e1816e2fcda7a6d21f959422cf97d61f497e755a8f627cc2028658d46a9cfe1981828918'
                },
                success:function(data) {
    
                    resData = JSON.parse(data);
    
                }, error:function() {
                    resData = 'error!!';
                }
            })
    
            return resData;
        }).then(function(res){
            console.log(res.data[0].url);
            
        })
        
        await instance.exit();    
    }

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