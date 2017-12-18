//接口路径配置
var services = {
    // 版本检测
    versionUpdate: {
        android: versionUpdateHost+'update/getLatestApk'
    },
    // 广告抽奖
    draw: {
        isDraw: newCashLoanApiHost+'zwlapi/adv/v2/screen_award_customer',
        goDraw: drawHost+'lottery/receivelottery'
    }

};
exports.services = services;