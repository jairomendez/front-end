Vue.component('login', {
    data: function() {
        return {
            usuario: '',
            contrasena: '',
            logged: false,
            register: false,
            loggedUser: {
                nombres: '',
                apellidos: '',
                usuario: '',
                contrasena: '',
                fecha: ''
            },
            registered: [],
            rnombres: '',
            rapellidos: '',
            rusuario: '',
            rcontrasena: ''
        }
    },
    template: '<div> <div class="user-show" v-on:click="openmodal"> <p v-if="logged">{{loggedUser.nombres}} {{loggedUser.apellidos}}</p> <p v-if="!logged">Inicie sesion</p> </div> <div id="login-modal" class="modal modal-fixed-footer"> <div class="modal-content center" v-if="logged"> <h3 class="main-blue-text">Mi Pefil</h3> <div class="row"> <div class="input-field col s12 m6  offset-m3"> <p>Nombres: {{loggedUser.nombres}}</p> <p>Apellidos: {{loggedUser.apellidos}}</p> <p>Usuario: {{loggedUser.usuario}}</p> <p>Fecha de creacion: {{loggedUser.fecha}}</p> </div> </div> </div> <div class="modal-content center" v-if="register"> <h5 class="main-blue-text">Registrarse</h5> <div class="row"> <div class="input-field col s12 m6"> <input id="rnombres" v-model="rnombres" type="text"> <label for="rnombres">Nombres</label> </div> <div class="input-field col s12 m6"> <input id="rapellidos" v-model="rapellidos" type="text"> <label for="rapellidos">Apellidos</label> </div> </div> <div class="row"> <div class="input-field col s12 m6"> <input id="rusuario" v-model="rusuario" type="text"> <label for="rusuario">Usuario</label> </div> <div class="input-field col s12 m6"> <input id="rcontrasena" v-model="rcontrasena" type="password"> <label for="rcontrasena">Contraseña</label> </div> </div> <div class="row"> <div class="input-field col s12 m6 offset-m3"> <p>¿Ya tiene cuenta?&nbsp&nbsp<a v-on:click="register=false" href="#login">Iniciar Sesion</a> </p> </div> </div> </div> <div class="modal-content center" v-if="!logged && !register"> <h6 class="main-blue-text">Iniciar Sesion</h6> <p>Inicie sesion para acceder a todos los contenidos</p> <div class="row"> <div class="input-field col s12 m6 offset-m3"> <input id="usuario" v-model="usuario" type="text"> <label for="usuario">Usuario</label> </div> </div> <div class="row"> <div class="input-field col s12 m6 offset-m3"> <input id="password" v-model="contrasena" type="password"> <label for="password">Contraseña</label> </div> </div> <div class="row"> <div class="input-field col s12 m6 offset-m3"> <p>¿No tiene cuenta?&nbsp&nbsp<a v-on:click="register=true" href="#register">Registrarme</a> </p> </div> </div> </div> <div class="modal-footer"> <a href="#!" v-if="logged" class="modal-action modal-close waves-effect waves-blue btn-flat">Cerrar</a> <a href="#!" v-on:click="logout()" v-if="logged" class="waves-effect waves-red btn-flat">Cerrar Sesion</a> <a href="#!" v-on:click="registerUs()" v-if="register" class="waves-effect waves-green btn-flat">Registrarse</a> <a href="#!" v-on:click="loginUs()" v-if="!logged && !register" class="waves-effect waves-green btn-flat">Iniciar sesion</a> </div> </div> </div>',
    methods: {
        loginUs: function() {
            if (this.usuario == "") {
                Materialize.toast('Ingrese el usuario', 2000)
                $('#usuario').focus()
            } else {
                if (this.contrasena == "") {
                    Materialize.toast('Ingrese la contraseña', 2000)
                    $('#password').focus()
                } else if (this.userexist(this.usuario) == false) {
                    Materialize.toast('Este usuario no existe', 2000)
                    $('#usuario').focus()
                } else {
                    if (this.userexist(this.usuario).contrasena == this.contrasena) {
                        this.loggedUser = this.userexist(this.usuario)
                        this.logged = true
                        this.usuario = ""
                        this.contrasena = ""
                        setTimeout(function() {
                            $('#main').removeClass('disable-main')
                            $('#login-modal').modal('close')
                        }, 500)
                    } else {
                        Materialize.toast('Contraseña incorrecta', 2000)
                        $('#password').focus()
                    }
                }
            }
        },
        userexist: function(user) {
            for (i = 0; i < this.registered.length; i++) {
                if (this.registered[i].usuario == user) {
                    return this.registered[i]
                }
            }
            return false
        },
        logout: function() {
            this.logged = false
            $('#main').addClass('disable-main')
        },
        openmodal: function() {
            setTimeout(function() {
                $('#login-modal').modal('open')
            }, 100)
        },
        registerUs: function() {
            if (this.rnombres == "") {
                Materialize.toast('Ingrese el nombre', 2000)
                $('#rnombres').focus()
            } else if (this.rapellidos == "") {
                Materialize.toast('Ingrese el apellido', 2000)
                $('#rapellidos').focus()
            } else if (this.rusuario == "") {
                Materialize.toast('Ingrese el usuario', 2000)
                $('#rusuario').focus()
            } else {
                if (this.rcontrasena == "") {
                    Materialize.toast('Ingrese la contraseña', 2000)
                    $('#rcontrasena').focus()
                } else {

                    this.registered.push({
                        nombres: this.rnombres,
                        apellidos: this.rapellidos,
                        usuario: this.rusuario,
                        contrasena: this.rcontrasena,
                        fecha: new Date().toLocaleString()
                    })
                    this.loggedUser = this.userexist(this.rusuario)
                    localStorage.registered = JSON.stringify(this.registered)
                    this.usuario = ""
                    this.contrasena = ""
                    this.rnombres = ""
                    this.rapellidos = ""
                    this.register = false
                    this.logged = true
                    setTimeout(function() {
                        $('#main').removeClass('disable-main')
                        $('#login-modal').modal('close')
                    }, 500)
                }
            }
        }
    },
    mounted() {
        var vm = this
        if (localStorage.registered != undefined) {
            this.registered = JSON.parse(localStorage.registered)
        }
        $('.modal').modal({
            complete: function() {
                if (vm.logged == false) {
                    Materialize.toast('Usted no ha iniciado sesion, ingrese sus datos para continuar', 2000)
                    setTimeout(function() {
                        $('#login-modal').modal('open')
                    }, 500)
                }
            }
        });
        setTimeout(function() {
            $('#login-modal').modal('open')
        }, 1000)
    }
})

var app = new Vue({
    el: '#app',
    data: {
        lol: 'asd'
    },
    mounted() {}
})
$('.main-button').click(function() {
    $('.activez').removeClass('activez')
    $(this).addClass('activez')
    $('.activated').addClass('trans-hidded')
    var data = $(this).attr('data')
    setTimeout(function() {
        $('.activated').removeClass('trans-hidded')
        $('.activated').addClass('hidded')
        $('.activated').addClass('activated')
        $('.main-container.button-' + data).addClass('trans-hidded')
        $('.main-container.button-' + data).removeClass('hidded')
        setTimeout(function() {
            $('.main-container.button-' + data).removeClass('trans-hidded')
            $('.main-container.button-' + data).addClass('activated')
        }, 500)
    }, 500)
})
var dist = 20
console.log($('.main-button'))
$(".main-button").each(function() {
    dist += 80
    $(this).css('right', dist + 'px')
})
var counter = 0;

function rounded() {
    $('.back-color').css('background-image', "linear-gradient(" + counter + "deg,#00BCD4,#3b52c5)");
    setTimeout(function() {
            counter++;
        rounded();
    }, 50);
}
rounded();
