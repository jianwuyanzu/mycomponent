let el = document.documentElement;

// 设置rem
let remSetting = function(){
    if(el.clientWidth){
        if(el.clientWidth>=750){
            el.style.fontSize = '50px';
        }else{
            el.style.fontSize = 100 * (el.clientWidth / 750) + 'px';
        }
    }else{
        return false;
    }
}

let basicSetting = function(){
    remSetting();
}();

export default basicSetting;