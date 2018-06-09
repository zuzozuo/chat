function Ui(){
    this.appendMsg = function(recivedData){
        var messageBox = $("#chatWindow");

        for(var i = 0; i < recivedData.length; i++){
            var text = $('<div class="mesageField">');
            var hour = $('<span class="hour">' + recivedData[i].date + '</span>');
            var nick =$('<span class="nick">' + recivedData[i].username + '</span>');
            var messageText = $('<span class="message">' + recivedData[i].message + '</span>');

            text.append(hour);
            text.append(nick);
            text.append(messageText);

            messageBox.append(text);
        }
    }
}