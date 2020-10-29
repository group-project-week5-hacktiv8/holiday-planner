let baseUrl = 'http://localhost:3000'

$(document).ready(function () {
    if (localStorage.access_token) {
        landingPage()
    } else {
        loginRegisterPage()
    }
});

function landingPage() {
    $("#landing-Page").show()
    $("#login-Register-Page").hide()
    $('#plan').hide()
}

function home() {
    $("#login-Register-Page").hide()
    $('#plan').hide()
    $('#home').show()
}

function planHoliday() {
    fetchHoliday()
    $("#login-Register-Page").hide()
    $('#plan').show()
    $('#home').hide()
}

function loginRegisterPage() {
    $("#landing-Page").hide()
    $("#login-Register-Page").show()
    $('#plan').hide()
}

function LoginClear() {
    $("#email").val("")
    $("#password").val("")
}

function RegisterClear() {
    $("#reg-email").val("")
    $("#reg-password").val("")
}

function register(event) {
    event.preventDefault()
    let email = $("#reg-email").val()
    let password = $("#reg-password").val()
    $.ajax({
        method: 'POST',
        url: baseUrl + '/register',
        data: { email, password }
    })
        .done((result) => {
            swal("Good job!", result.message, "success");
            RegisterClear()
        })
        .fail(function (error) {
            swal("Too Bad", error.responseJSON[0], "error");
            RegisterClear()
        })
}

function login(event) {
    event.preventDefault()
    let email = $("#email").val()
    let password = $("#password").val()

    $.ajax({
        method: 'POST',
        url: baseUrl + '/login',
        data: { email, password }
    })
        .done(result => {
            localStorage.setItem('email', result.email)
            localStorage.setItem('access_token', result.access_token)
            swal('Sign In Successfully', result.message, 'success')
            landingPage()
        })
        .fail(function (error) {
            swal('Login Failed', error.responseJSON.message, 'error')
            LoginClear()
            // console.log("error", error)
        })
        .always(function () {
            console.log("complete");
        })
}

function signOut() {
    var auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
        console.log('User signed out.');
    });
}

$(".btn-logout").click(function () {
    localStorage.removeItem('access_token')
    localStorage.removeItem('email')
    signOut()
    $("#email").val('')
    $("#password").val('')
    loginRegisterPage()
})

function onSignIn(googleUser) {
    var google_access_token = googleUser.getAuthResponse().id_token;

    $.ajax({
        method: 'POST',
        url: baseUrl + '/googleLogin',
        headers: { google_access_token }
    })
        .done(result => {
            localStorage.setItem('access_token', result.access_token)
            landingPage()
        })
        .fail(error => {

        })
}


function fetchHoliday() {
    $.ajax({
        method: 'GET',
        url: baseUrl + '/holiday',
        headers: {
            access_token: localStorage.access_token
        },
    })
        .done(result => {
            let data = result.slice(29, 40)
            data.forEach(el => {
                if (el.type === "National holiday")
                    $('#holiday').append(`      
                        <div class="card">
                            <h5>${el.date}</h5>
                            <p>${el.name}</p>
                        </div>
                `)
            })
        })
        .fail(function (err) {
            console.log(err)
        })

}