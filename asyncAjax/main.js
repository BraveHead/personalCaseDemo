(function () {

    //Promise   就是一个容器   里面保存着某个未来才会结束的事件的结果。
    //ajax  Promise异步处理方式获取数据

    //源生写法（未兼容）
    function getUrl(url) {    //get请求
       return new Promise(function (resolve, reject) {
           let req = new XMLHttpRequest();   //创建
           req.responseType = 'text';   //请求数据格式
           req.open('GET',url, true);    //连接
           req.onload = function () {    //请求
               if(req.status === 200){
                   console.log(req.readyState);
                   resolve(req.responseText);
               }else{
                   reject(new Error(req.statusText));
               }
           };
           req.onerror = function () {    //请求失败
               reject(new Error(req.statusText));
           };
           req.send();   //发送
       })
    }

    getUrl('data.json').then(function (value) {
        console.log(JSON.parse(value).name);
    }).then(function () {
        console.log('>>>>');
    }).catch(function (error) {
        console.log(error);
    });

    //jquery的Deferred方法实现了Promise规范

    //用Deferred对象实现Promise
    function runAsyncOne() {
        let def = $.Deferred();
        setTimeout(function () {
            def.resolve('输出runAsyncOne');
        }, 2000);
        return def;     //返回的是带有resolve,reject的方法
    }
    let d = runAsyncOne();
    d.then(function (data) {
        console.log(data);
    });
    d.resolve('shuchu >>'); //可以在外部执行resolve,打破了def的异步resolve的步骤，提前意外关闭resolve,这种风险是不可控的不推荐这种方法

    // 返回带有限制的Deferred方法
    function runAsyncTwo() {
        let def = $.Deferred();
        setTimeout(function () {
            def.resolve('输出runAsyncOne');
        }, 2000);
        return def.promise();    //返回的def方法不包括resolve,reject，外部调用不到该方法，避免在外部可以关闭的风险
    }
    let i =0;
    runAsyncTwo().then(function (data) {
        console.log(i,data);
        return ++i;
    }).then(function (data) {
        console.log(i,data);
        return ++i;
    }).then(function (data) {
        console.log(i,data);
        return ++i;
    });

    //ajax
    function ajaxDeferred() {
        return $.ajax({
            dataType:'json',
            method:'GET',
            url:'./data.json',
            data: {}
        });
    }

    ajaxDeferred().then(function (value) {
        console.log(value.name);
        return value.name;
    }).then(function (value) {
        console.log(value + '1');
    })
})();