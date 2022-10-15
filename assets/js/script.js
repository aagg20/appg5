const endpoint = "localhost:8080/api/Client"  //"http://132.145.209.209:8080/api/Client"

$(document).ready(function () {
    getClient()
    $("#actualizar").click(function() {
        actualizar()
    })
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
                        "<td>****************</td>" +
                        "<td>" + client.name + "</td>" +
                        "<td>" + client.age + "</td>" +
                        "<td><button data-bs-toggle='modal'data-bs-target='#modalactualizar' class='btn btn-warning'" +
                        "onclick=\"enviar('" + client.idClient + "','" +
                        client.email + "','" + client.password +
                        "','" + client.name + "','" + client.age + "')\"" +
                        ">Editar</button>&nbsp" +
                        "<button class='btn btn-danger'onclick=\"eliminar(\'" +
                        client.idClient +
                        "\')\">Eliminar</button></td>"
                    "</tr>"
                })
                console.log(registro)
                $("#tbody").html(registro)
            }
        }
    })
}

function enviar(idClient, email, password, name, age) {

    $("#idclient").val(idClient)
    $("#email").val(email)
    $("#password").val(password)
    $("#name").val(name)
    $("#age").val(age)

}

function actualizar() {


    if (confirm("Desea Actualizar el Registro con id cliente ?")) {

        let cliente = {
            idClient: $("#idclient").val(),
            email: $("#email").val(),
            password: $("#password").val(),
            name: $("#name").val(),
            age: $("#age").val()
        }
        let dataJson = JSON.stringify(cliente)

        $.ajax({
            url: endpoint + "/update",
            type: 'PUT',
            data: dataJson,
            dataType: 'json',
            contentType: 'application/json',
            complete: function(data) {
                if (data.status = '201') {
                    alert("Actualizó Registro con Exito!!")
                } else {
                    alert("Problemas en Actualizar consulte al Administrador")
                }
                getClient()
            }
        })


    }


}

function eliminar(idClient) {
    if (confirm("Desea Eliminar el Registro con id client " + idClient + "?")) {

        $.ajax({
            url: endpoint + "/" + idClient,
            type: 'DELETE',
            dataType: 'json',
            contentType: 'application/json',
            complete: function() {
                getClient()
            }
        })

    }
}