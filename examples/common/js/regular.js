function padLeftZero(str) {
    return ('00' + str).substr(str.length);
}

export default {
    // 获取页面url中的参数
    getUrlParam(param) {

      // 获取页面value
      var value = '';
      var reg = new RegExp(param + '=([^!&#/]*)');
      var params = reg.exec(location.href);
      if (params) {
          value = params[1];
      }
      return value;
      
    },
    // 标准时间解析
    formatDate(date, fmt){
        if (/(y+)/.test(fmt)) {
            fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
        }
        let o = {
            'M+': date.getMonth() + 1,
            'd+': date.getDate(),
            'h+': date.getHours(),
            'm+': date.getMinutes(),
            's+': date.getSeconds()
        };
        for (let k in o) {
            if (new RegExp(`(${k})`).test(fmt)) { //`(${k})` => M+、d+、h+
                let str = o[k] + '';
                fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? str : padLeftZero(str)); //fmt=2016-07-dd hh:mm; RegExp.$1= MM; 
            }
        }
        return fmt;
    },
    // 姓名校验
    nameCheck(data){
        let reg = /^[\u4E00-\u9FA5\uf900-\ufa2d·s]{2,20}$/;
        if (reg.test(data)) {
            return true;
        }
        return false;
    },
    charCheck(data){
        let reg  = new RegExp("[`~·\\-\\+《》 \"_%!@#$^&*()=|{}':;',\\[\\].<>/?~！@#￥……&*（）——|{}【】‘；：”“'。，、？\\\\]");
        if (reg .test(data)) {
            return true;
        }
        return false;
    },
    // 数字校验
    whetherNumber(data) {
        let reg = /^[0-9]+.?[0-9]*$/;
        if (reg.test(data)) {
            return true;
        }
        return false;
    },
    // 车牌号校验
    plateNoCheck(plateNo) {
        var regular = /^[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领A-Z]{1}[A-Z]{1}[A-Z0-9]{4,5}[A-Z0-9挂学警港澳]{1}$/
        var regularTwo = /(^[\u4E00-\u9FA5]{1}[A-Z0-9]{6,7}$)|(^[A-Z]{2}[A-Z0-9]{2}[A-Z0-9\u4E00-\u9FA5]{1}[A-Z0-9]{2,4}$)|(^[A-Z]{2}[A-Z0-9\u4E00-\u9FA5]{1}[A-Z0-9]{4,6}$)|(^[\u4E00-\u9FA5]{1}[A-Z0-9]{5}[挂学警军港澳]{1}$)|(^(08|38){1}[A-Z0-9]{4}[A-Z0-9挂学警军港澳]{1}$)|(^[\u4E00-\u9FA5]{1}[0-9]{2}[A-Z0-9]{5}$)/
        var result = regular.test(plateNo);
        var resultTwo = regularTwo.test(plateNo);
        return result || resultTwo;
    },
    // 车架号校验
    vinCheck(vin){
      if (!vin) {
        return false
      }
  
      // vin码中字符到数字的映射
      var alphaMapNumber = {
        A: 1,
        B: 2,
        C: 3,
        D: 4,
        E: 5,
        F: 6,
        G: 7,
        H: 8,
        J: 1,
        K: 2,
        L: 3,
        M: 4,
        N: 5,
        P: 7,
        R: 9,
        S: 2,
        T: 3,
        U: 4,
        V: 5,
        W: 6,
        X: 7,
        Y: 8,
        Z: 9
      }
      // vin码中每一位的权重
      var weight = [8, 7, 6, 5, 4, 3, 2, 10, 0, 9, 8, 7, 6, 5, 4, 3, 2]
      // 必须是字符串
      if (typeof vin !== 'string') {
        return false
      }
      vin = vin.trim().toUpperCase()
      // 判断位数，vin码17位
      if (vin.length !== 17) {
        return false
      }
      // 计算校验码
      var sum = 0
      for (var i = 0; i < vin.length; i++) {
        var codeInt = parseInt(vin[i])
        if (isNaN(codeInt)) {
          if (alphaMapNumber[vin[i]]) {
            sum += alphaMapNumber[vin[i]] * weight[i]
          } else {
            return false
          }
        } else {
          sum += codeInt * weight[i]
        }
        return (vin[8] === 'X' ? 10 : Number(vin[8])) === (sum % 11)
      }
    },
    // 身份证校验
    driverIdCardCheck(driverIdCard){
      var vcity = {
        11: '北京',
        12: '天津',
        13: '河北',
        14: '山西',
        15: '内蒙古',
        21: '辽宁',
        22: '吉林',
        23: '黑龙江',
        31: '上海',
        32: '江苏',
        33: '浙江',
        34: '安徽',
        35: '福建',
        36: '江西',
        37: '山东',
        41: '河南',
        42: '湖北',
        43: '湖南',
        44: '广东',
        45: '广西',
        46: '海南',
        50: '重庆',
        51: '四川',
        52: '贵州',
        53: '云南',
        54: '西藏',
        61: '陕西',
        62: '甘肃',
        63: '青海',
        64: '宁夏',
        65: '新疆',
        71: '台湾',
        81: '香港',
        82: '澳门',
        91: '国外'
      }
  
      // 检查号码是否符合规范，包括长度，类型
      var isCardNo = function (obj) {
        // 身份证号码为15位或者18位，15位时全为数字，18位前17位为数字，最后一位是校验位，可能为数字或字符X
        var reg = /(^\d{15}$)|(^\d{17}(\d|X)$)/
        if (reg.test(obj) === false) {
          return false
        }
        return true
      }
      // 取身份证前两位,校验省份
      var checkProvince = function (obj) {
        var province = obj.substr(0, 2)
        if (vcity[province] === undefined) {
          return false
        }
        return true
      }
      // 检查生日是否正确
      var checkBirthday = function (obj) {
        var len = obj.length
        // 身份证15位时，次序为省（3位）市（3位）年（2位）月（2位）日（2位）校验位（3位），皆为数字
        if (len === 15) {
          var reFifteen = /^(\d{6})(\d{2})(\d{2})(\d{2})(\d{3})$/
          var arrData = obj.match(reFifteen)
          var year = arrData[2]
          var month = arrData[3]
          var day = arrData[4]
          var birthday = new Date('19' + year + '/' + month + '/' + day)
          return verifyBirthday('19' + year, month, day, birthday)
        }
        // 身份证18位时，次序为省（3位）市（3位）年（4位）月（2位）日（2位）校验位（4位），校验位末尾可能为X
        if (len === 18) {
          var reEighteen = /^(\d{6})(\d{4})(\d{2})(\d{2})(\d{3})([0-9]|X)$/
          var arrDatae = obj.match(reEighteen)
          var yearE = arrDatae[2]
          var monthE = arrDatae[3]
          var dayE = arrDatae[4]
          var birthdayE = new Date(yearE + '/' + monthE + '/' + dayE)
          return verifyBirthday(yearE, monthE, dayE, birthdayE)
        }
        return false
      }
      // 校验日期
      var verifyBirthday = function (year, month, day, birthday) {
        var now = new Date()
        var nowYear = now.getFullYear()
        // 年月日是否合理
        if (birthday.getFullYear() === Number(year) && (birthday.getMonth() + 1) === Number(month) && birthday.getDate() === Number(day)) {
          // 判断年份的范围（3岁到100岁之间)
          var time = nowYear - year
          if (time >= 0 && time <= 130) {
            return true
          }
          return false
        }
        return false
      }
      // 校验位的检测
      var checkParity = function (obj) {
        // 15位转18位
        obj = changeFivteenToEighteen(obj)
        var len = obj.length
        if (len === 18) {
          var arrInt = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2]
          var arrCh = ['1', '0', 'X', '9', '8', '7', '6', '5', '4', '3', '2']
          var cardTemp = 0
          var i
          var valnum
          for (i = 0; i < 17; i++) {
            cardTemp += obj.substr(i, 1) * arrInt[i]
          }
          valnum = arrCh[cardTemp % 11]
          if (valnum === obj.substr(17, 1)) {
            return true
          }
          return false
        }
        return false
      }
      // 15位转18位身份证号
      var changeFivteenToEighteen = function (obj) {
        if (obj.length === 15) {
          var arrInt = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2]
          var arrCh = ['1', '0', 'X', '9', '8', '7', '6', '5', '4', '3', '2']
          var cardTemp = 0
          var i
          obj = obj.substr(0, 6) + '19' + obj.substr(6, obj.length - 6)
          for (i = 0; i < 17; i++) {
            cardTemp += obj.substr(i, 1) * arrInt[i]
          }
          obj += arrCh[cardTemp % 11]
          return obj
        }
        return obj
      }
  
      // 终极校验
      var regularIDcard = function (driverIdCard) {
        // 校验长度，类型
        if (isCardNo(driverIdCard) === false) {
          return false
        }
        // 检查省份
        if (checkProvince(driverIdCard) === false) {
          return false
        }
        // 校验生日
        if (checkBirthday(driverIdCard) === false) {
          return false
        }
        // 检验位的检测
        if (checkParity(driverIdCard) === false) {
          return false
        }
        return true
      }
      return regularIDcard(driverIdCard)
    },
    // 电话号码校验
    driverMobileCheck(driverMobile){
      var regular = /^[1][358769][0-9]{9}$/
      var regularTwo = /^(13[0123456789][0-9]{8}|14[579][0-9]{8}|15[012356789][0-9]{8}|17[135678][0-9]{8}|18[0123456789][0-9]{8})$/
      var result = regular.test(driverMobile)
      var resultTwo = regularTwo.test(driverMobile)
      return result || resultTwo
    },
    // 过滤表情及去左右空格
    filteremoji(content){
      let ranges = [  
        '\ud83c[\udf00-\udfff]',  
        '\ud83d[\udc00-\ude4f]',  
        '\ud83d[\ude80-\udeff]'  
      ];
      let val = content.replace(new RegExp(ranges.join('|'), 'g'), '');
      val = val.replace(/(^\s*)|(\s*$)/g, "");
      return val;
    }
}
  