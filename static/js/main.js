var ajax, ui;
var oldTimestamp = new Date().getTime();
$(document).ready(function(){
    ajax = new Ajax();
    ui = new Ui();
    var sendBtn = $("#send");
    var messageField = $("#message");
    var userName = null;
    var r = Math.floor(Math.random() * 255),
        g = Math.floor(Math.random() * 255),
        b = Math.floor(Math.random() * 255)


    getUserName();
    ajaxPooling();

    $(sendBtn).click(function(){
        var msg = messageField.val();
        var obj = {
            message: msg,
            username: userName,
            r: r,
            g: g,
            b: b
        }
        ajax.sendData(obj)    
        
        messageField.val("");
        
     })   




    function getUserName(){
        var initName= prompt("Podaj swój nick", "");
            if(initName != null && initName.length > 0){
                userName = initName;
            }        
    }

    function ajaxPooling(){
        var obj = {
            info: userName,
            oldTimestamp: oldTimestamp
        }
        ajax.pool(obj);
        setTimeout(ajaxPooling, 500)

    }   
})