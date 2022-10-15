const endpoint = "http://132.145.209.209/api/Client"


$(document).ready(function () {

    $("#guardar").click(function () {
        guardarCliente();
    })


    function guardarCliente() {
        let cliente = {
            email: $("#email").val(),
            password: $("#password").val(),
            name: $("#name").val(),
            age: $("#age").val()
        }
        if (cliente.email.length == 0 || cliente.password.length == 0
            || cliente.name.length == 0 || cliente.age.length == 0) {
            alert("Campos Vacios!!")
        }
        if (cliente.email.length > 45) {
            alert("Email no puede ser mas de 45 caracteres")
        }
        if (cliente.password <= 8) {
            alert("Password tine que tener minimo 8 caracteres")
        }
        if (cliente.email.length <= 45 && cliente.password.length > 8
            && cliente.name.length <= 45 || cliente.age.length <= 2) {
            alert("Campos exceden la longitud indicada")

            let dataJson = JSON.stringify(cliente)
            console.log(dataJson)
            $.ajax({
                url: endpoint + "/save",
                type: "POST",
                data: dataJson,
                contentType: "application/json",
                complete: function (data) {
                    if (data.status == "201") {
                        alert("El registro se ha guardado")
                    } else {
                        alert("Problemas al insertar")
                    }
                }
            });
        }

        // function validarCampos(email, password, name, age) {

        //     if (email.length == 0 || name.length == 0 || age.length == 0) {
        //         alert("Campos Vacios!!")
        //     }
