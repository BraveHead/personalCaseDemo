function clickWxfx() {
    if ($('#title').val() && $('#text').val()) {
        wxfx({
            title: $('#title').val(),
            desc: $('#text').val(),
            link: 'https://test.qtz360.com/h5/html/wxfxtest/index.html',
            imgUrl: 'https://www.qtz360.com/h5/fx.png'
        })
    } else {
        $('#rmg').html('请输入需要分享的内容');
    }
}

function valueChange() {
    $('#rmg').html('未提交');
}

function wxfx(e) {
    var i = e || {};
    $('#rmg').html('提交中。。。');
    $.ajax({
        type: "post",
        url: window.commonRequestPrefix + "getApiTicket",
        dataType: "json",
        data: {currentURL: location.href.split("#")[0]},
        success: function (e) {
            if ("R0001" === e.rcd) {
                var i = e.ticket;
                wx.config({
                    appId: "wx1d126874098162c8",
                    timestamp: i.timestamp,
                    nonceStr: i.nonceStr,
                    signature: i.signature,
                    jsApiList: ["onMenuShareTimeline", "onMenuShareAppMessage"]
                });
                $('#rmg').html('提交成功,可以分享');
            } else {
                $('#rmg').html('请求失败：' + e.rmg);
            }
        }
    });
    wx.ready(function () {
        wx.onMenuShareAppMessage({
            title: i.title,
            desc: i.desc,
            link: i.link,
            imgUrl: i.imgUrl,
            type: "",
            dataUrl: ""
        });
        wx.onMenuShareTimeline({
            title: i.title,
            link: i.link,
            imgUrl: i.imgUrl
        });
        wx.onMenuShareQQ({
            title: i.title,
            desc: i.desc,
            link: i.link,
            imgUrl: i.imgUrl
        });
        wx.onMenuShareWeibo({
            title: i.title,
            desc: i.desc,
            link: i.link,
            imgUrl: i.imgUrl
        });
        wx.onMenuShareQZone({
            title: i.title,
            desc: i.desc,
            link: i.link,
            imgUrl: i.imgUrl
        })
    })
}