const endpoint = "http://localhost:8080/api/Client"
$(document).ready(function() {

    $("#guardar").click(function() {
        guardarClient()
    })
})

function guardarClient() {

    let cliente = {
        email: $("#email").val(),
        password: $("#password").val(),
        name: $("#name").val(),
        age: $("#age").val()
    }
    if (cliente.email.length == 0 || cliente.password.length == 0 ||
        cliente.name.length == 0 || cliente.age.length == 0) {
        alert("Campo(s) Vacio(s)")
    }
    if (cliente.email.length > 45) {
        alert("Campo email no puede ser superior a 45")
    }
    if (cliente.password <= 4) {
        alert("El password tiene que ser Mayor a 4 Caracter")
    }
    if (cliente.email.length <= 45 && cliente.password.length > 4 &&
        cliente.name.length > 0 && cliente.age.length > 0) {
        let dataJson = JSON.stringify(cliente)
        $.ajax({
            url: endpoint + "/save",
            type: "POST",
            data: dataJson,
            contentType: "application/json",
            complete: function(data) {
                if (data.status == "201") {
                    alert("Guardo Registro Cliente con exito!!")
                } else {
                    alert("Problemas al Insertar consulta al Administrador!!")
                }
            }
        })
    }
}
