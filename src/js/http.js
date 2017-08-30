let vue = new Vue({
  el: '#app',
  data: {
    block:'block',
    color:'#666',
    request: '',
    url: 'http://192.168.20.154:20010/ias/user/query?lang=zh-cn&token=pacswure3thb4nawtfn3lbva9n4xrqtw&pageIndex=1&pageSize=10',
    param: [
      {fda:1212},
      {fdafa:234}
    ]
  },
  methods: {
    http() {
      let param = {};

      this.param.forEach((v, i) => {
        let key = Object.keys(v)[0];
        param[key] = v[key];
      });

      let promise = new Promise((resolve, reject) => {
        $.ajax({
          url: this.url,
          data: param, success(data) {
            resolve(data);

          }, error(error) {
            reject(error);
          }
        })
      });
      promise.then(res => {
        this.color='green';
        this.request = JSON.stringify(res);
      }, error => {
        this.color='red';
        this.request = JSON.stringify(error);
      })

    }
  }
})