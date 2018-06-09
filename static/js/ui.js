function Ui(){
    this.appendMsg = function(recivedData){
        var messageBox = $("#chatWindow");

        for(var i = 0; i < recivedData.length; i++){

            var r = recivedData[i].r,
                g = recivedData[i].g,
                b = recivedData[i].b;

            var text = $('<p class="mesageField">');
            var hour = $('<span class="hour">[' + recivedData[i].date + ']&nbsp;</span>');
            var nick =$('<<span style="color: rgb(' + r + ',' + g + ',' + b + ');">@' + recivedData[i].username + '</span>><span>:&nbsp;</span>');
            var messageText = $('<span class="message">' + recivedData[i].message + '</span>');

            text.append(hour);
            text.append(nick);
            text.append(messageText);

            messageBox.append(text);
        }
    }
}