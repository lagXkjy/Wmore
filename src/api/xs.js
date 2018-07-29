//拍照或从手机相册中选图接口
export function wxChooseImage() {
    wx.chooseImage({
        count: 1,
        needResult: 1,
        sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
        sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
        success: function(data) {
            localIds = data.localIds[0].toString(); // 返回选定照片的本地ID列表，localId可以作为img标签的src属性显示图片
            if (rh.tostr(localIds)) {
                wxuploadImage(localIds);
            }
        },
        fail: function(res) {
            alterShowMessage("操作提示", JSON.stringify(res), "1", "确定", "", "", "");
        }

    });
}

//上传图片接口
function wxuploadImage(e) {
    wx.uploadImage({
        localId: e, // 需要上传的图片的本地ID，由chooseImage接口获得
        isShowProgressTips: 1, // 默认为1，显示进度提示
        success: function(res) {
            mediaId = res.serverId; // 返回图片的服务器端ID
            if (rh.tostr(mediaId)) {
                $(".myimg").attr("src", localIds);
            }
        },
        fail: function(error) {
            picPath = '';
            localIds = '';
            alert(Json.stringify(error));

        }
    });
}