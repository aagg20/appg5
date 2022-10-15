const endpoint = "localhost:8080/api/Client"  //"http://132.145.209.209:8080/api/Client"

$(document).ready(function () {
    getClient()
    $("#actualizar").click(function())
})

function getClient() {
    let tam = 0;
    $.ajax({
        url: endpoint + "/all",
        type: "GET",
        dataType: "json",
        success: function (data) {
            let tam = data.length
            if (tam == 0) {
                $("#contenedor").hide()
                $("#mensaje").show()
            } else {
                $("#contenedor").show()
                $("#mensaje").hide()
                $("#numregistro").html("Numero de Registros: " + tam)
                console.log(data)
                let registro = ""
                $.each(data, function (index, client) {
                    registro += "<tr>" +
                        "<td>" + client.idClient + "</td>" +
                        "<td>" + client.email + "</td>" +
                        "<td>" + client.password + "</td>" +
                        "<td>" + client.name + "</td>" +
                        "<td>" + client.age + "</td>" +
                        "<td><button class='btn btn-warning'" +
                        "onclick=\"enviar('" + client.idClient + "','" + 
                        client.email  + "','" + client.password  + "','" + 
                        client.name  + "','" + client.age + "')\"" +
                        ">Editar</button> &nbsp" +
                        "<td><button class='btn btn-danger' onclick=\"eliminar(\'" +
                        client.idClient +
                        "\')\" >Eliminar</button></td>"
                    "</tr>"
                })
                console.log(registro)
                $("#tbody").html(registro)
            }
        }
    })

}

function enviar(idClient, email, password, name, age) {
    console.log(idClient)
    console.log(password)
    console.log(email)

    $("#idclient").val(idClient)
    $("#email").val(email)
    $("#password").val(password)
    
    if (confirm("Desea actualizar el registro con el " +idClient + "?")) {
        let cliente = {
            idClient: $("#idclient").val(),
            email: $("#email").val(),
            password: $("#password").val(),

            let dataJson = JSON.stringify(cliente)

           
    $.ajax({
        url: endpoint + "/update",
        type: 'PUT',
        data: dataJson
        dataType: "JSON",
        contentType: "application/json",
        complete: function () {
            getClient();
        }
    })
        }
    }
}

function eliminar(idClient) {
    if (confirm("Desea eliminar el cliente" + idClient + "?"))
        console.log(idClient)

    $.ajax({
        url: endpoint + "/" + idClient,
        type: 'DELETE',
        dataType: "JSON",
        contentType: "application/json",
        complete: function () {
            getClient();
        }
    })
}