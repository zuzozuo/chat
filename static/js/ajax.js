function Ajax(){

    this.pool = function(send){
        $.ajax({

            url: "http://localhost:3000/pool",
            data: send,
            type: "POST",
            success: function (data) {
                parsedData = JSON.parse(data);                
                ui.appendMsg(parsedData);  
                oldTimestamp = parsedData[parsedData.length-1].timestamp;                  
                
            },
            error: function (xhr, status, error) {
                console.log(xhr);
            },
        })

    }

    this.sendData = function(send){
        $.ajax({

            url: "http://localhost:3000/sendMsg",
            data: send,
            type: "POST",
            success: function (data) {  
                
            },
            error: function (xhr, status, error) {
                console.log(xhr);
            },
        })
    }
}