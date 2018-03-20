(function (global, factory) {
    module.exports = factory();
}(this, (function () { 
    "use strict";

    // 定义快捷省份的关联关系
    // Author: 陈哈哈 yoojiachen@gmail.com

    function Province(name, shortname){
        this.name = name;
        this.shortname = shortname;
        this.periphery = new Array();

        this.lnk = function(item){
            if(!this.contains(item)) { // 互相关联
                this.periphery.push(item);
                item.lnk(this);
            }
            return this;
        };

        this.contains = function(item){
            return this.periphery.filter(function(i){ return i === item; }).length != 0;
        };

        this.peripheryShortnames = function(){
            var peripheries = this.periphery.map(function(i){ return i.shortname; });
            peripheries.unshift(this.shortname);
            return peripheries;
        };

    };

    var beijing = new Province("北京市", "京");
    var tianjin = new Province("天津市", "津");
    var shanxi = new Province("山西省", "晋");
    var hebei = new Province("河北省", "冀");
    var neimeng = new Province("内蒙古自治区", "蒙");
    var liaoning = new Province("辽宁省", "辽");
    var jilin = new Province("吉林省", "吉");
    var heilongjiang = new Province("黑龙江省", "黑");
    var shanghai = new Province("上海市", "沪");
    var jiangsu = new Province("江苏省", "苏");
    var zhejiang = new Province("浙江省", "浙");
    var anhui = new Province("安徽省", "皖");
    var fujian = new Province("福建省", "闽");
    var jiangxi = new Province("江西省", "赣");
    var shandong = new Province("山东省", "鲁");
    var henan = new Province("河南省", "豫");
    var hubei = new Province("湖北省", "鄂");
    var hunan = new Province("湖南省", "湘");
    var guangdong = new Province("广东省", "粤");
    var guangxi = new Province("广西壮族自治区", "桂");
    var hainan = new Province("海南省", "琼");
    var chongqing = new Province("重庆市", "渝");
    var sichuan = new Province("四川省", "川");
    var guizhou = new Province("贵州省", "贵");
    var yunnan = new Province("云南省", "云");
    var xizang = new Province("西藏自治区", "藏");
    var shannxi = new Province("陕西省", "陕");
    var gansu = new Province("甘肃省", "甘");
    var qinghai = new Province("青海省", "青");
    var ningxia = new Province("宁夏回族自治区", "宁");
    var xinjiang = new Province("新疆维吾尔自治区", "新");

    xinjiang.lnk(xizang)
        .lnk(qinghai)
        .lnk(gansu)
        .lnk(neimeng);

    xizang.lnk(qinghai)
        .lnk(sichuan)
        .lnk(yunnan);

    qinghai.lnk(gansu)
        .lnk(sichuan)
        .lnk(shanxi);

    gansu.lnk(neimeng)
        .lnk(shannxi)
        .lnk(sichuan)
        .lnk(chongqing)
        .lnk(ningxia);

    ningxia.lnk(shannxi)
        .lnk(gansu);

    neimeng.lnk(heilongjiang)
        .lnk(jilin)
        .lnk(liaoning)
        .lnk(hebei)
        .lnk(beijing)
        .lnk(tianjin)
        .lnk(shanxi)
        .lnk(shannxi)
        .lnk(ningxia);

    shannxi.lnk(shanxi)
        .lnk(henan)
        .lnk(hubei)
        .lnk(chongqing)
        .lnk(sichuan);

    sichuan.lnk(yunnan)
        .lnk(guizhou)
        .lnk(chongqing);

    yunnan.lnk(guizhou)
        .lnk(guangxi);

    guizhou.lnk(hunan)
        .lnk(guangxi)
        .lnk(chongqing)
        .lnk(hubei);

    chongqing.lnk(hubei)
        .lnk(hunan);

    hubei.lnk(hunan)
        .lnk(henan)
        .lnk(anhui)
        .lnk(jiangxi);

    hunan.lnk(jiangxi)
        .lnk(guangxi)
        .lnk(guangdong);

    guangxi.lnk(guangdong)
        .lnk(hainan);

    guangdong.lnk(hainan)
        .lnk(fujian)
        .lnk(jiangxi);

    jiangxi.lnk(fujian)
        .lnk(anhui)
        .lnk(zhejiang);

    fujian.lnk(zhejiang);

    zhejiang.lnk(shanghai)
        .lnk(anhui)
        .lnk(jiangsu);

    anhui.lnk(jiangsu)
        .lnk(shanghai)
        .lnk(shandong);

    jiangsu.lnk(shandong)
        .lnk(shanghai);

    shandong.lnk(hebei)
        .lnk(beijing)
        .lnk(tianjin);

    shanxi.lnk(hebei)
        .lnk(henan);

    hebei.lnk(beijing)
        .lnk(tianjin)
        .lnk(shandong)
        .lnk(liaoning);

    beijing.lnk(tianjin)
        .lnk(liaoning)
        .lnk(shandong);

    liaoning.lnk(jilin);

    jilin.lnk(liaoning)
        .lnk(heilongjiang);

    var _binding = function(){
        this._provinces = [beijing, tianjin, shanxi, hebei, neimeng, liaoning, jilin, heilongjiang, shanghai, jiangsu, zhejiang, anhui, fujian, jiangxi, 
        shandong, henan, hubei, hunan, guangdong, guangxi, hainan, chongqing, sichuan, guizhou, yunnan, xizang, shannxi, gansu, qinghai, ningxia, xinjiang]
    };

    _binding.prototype.locationOf = function(name) {
        var found = this._provinces.filter(function(i){
            return i.name.indexOf(name) >= 0; 
        });
        if(found.length >= 1){
            return found[0];
        }else{
            return new Province();
        }
    }

    return _binding;

})));