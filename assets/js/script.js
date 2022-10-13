const endpoint = "http://localhost:8080/api/Client"

$(document).ready(function() {
    getClient()
})

function getClient() {
    let tam = 0;
    $.ajax({
        url: endpoint + "/all",
        type: "GET",
        dataType: "json",
        success: function(data) {
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
                $.each(data, function(index, client) {
                    registro += "<tr>" +
                        "<td>" + client.idClient + "</td>" +
                        "<td>" + client.email + "</td>" +
                        "<td>" + client.password + "</td>" +
                        "<td>" + client.name + "</td>" +
                        "<td>" + client.age + "</td>" +
                        "<td><button class='btn btn-danger'onclick=\"eliminar(\'" +
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

function eliminar(idClient) {
    if (confirm("Desea Eliminar el Registro con id client " + idClient + "?"))
        console.log(idClient)
}