


let vue = new Vue({
  el: '#app',

  filters: {
    getkey(o) {
      let key = Object.keys(o)[0];
      return key;
    },
    getValue(o) {
      let key = Object.keys(o)[0];
      return o[key];
    }
  },
  data: {
    block: 'block',
    color: '#666',
    request: '',
    sendtype: 'post',
    checked: true,
    // url: 'http://news.baidu.com/widget?id=LocalNews&ajax=json&t=1504067584738',
    url:'/weather/forecast',
    param: [
      { key: 'city', value: 'CHSC000000' }
    ]
  },
  methods: {
    add() {
      this.param.push({ key: null, value: null });
    },
    remove(index) {
      this.param.splice(index, 1);
    },
    http() {

      this.request = '';
      let param = {};

      if (this.sendtype === 'post') {
        this.param.forEach((v, i) => {

          if (v.key && v.value) {
            param[v.key] = v.value;
          }

        });
      }

      let promise = new Promise((resolve, reject) => {
        $.ajax({
          url: this.url,
          type: this.sendtype,
          data: param, success(data) {
            resolve(data);

          }, error(error) {
            reject(error);
          }
        })
      });
      promise.then(res => {
        this.color = 'green';
        this.request = JSON.stringify(res);
      }, error => {
        this.color = 'red';
        this.request = JSON.stringify(error);
      })

    }
  }
})