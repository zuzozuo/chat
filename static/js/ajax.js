$.ajax({

    url: "http://localhost:3000",
    data: data,
    type: "POST",
    success: function (data) {
        var obj = JSON.parse(data)
    },
    error: function (xhr, status, error) {
        console.log(xhr);
    },
})