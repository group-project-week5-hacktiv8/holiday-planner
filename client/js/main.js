let baseUrl = 'http://localhost:3000'

$(document).ready(function () {
    if (localStorage.access_token) {
        landingPage()
    } else {
        loginRegisterPage()
    }
});

function landingPage() {
    fetchHoliday()
    $("#landing-Page").show()
    $("#login-Register-Page").hide()
    $('#holiday').hide()
}

function loginRegisterPage() {
    $("#landing-Page").hide()
    $("#login-Register-Page").show()
    $('#holiday').hide()
}

function fetchHolidayBtn() {
    $("#landing-Page").hide()
    $("#login-Register-Page").hide()
    $('#holiday').show()
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
    // signOut()
    $("#email").val('')
    $("#password").val('')
    loginRegisterPage()
})

$(".rec-holiday").click(function() {
    fetchHoliday()
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
        }
    })
        .done(result => {
            result.response.holidays.forEach(el => {
                if (el.type[0] === "National holiday")
                    console.log(el.date.iso);
                    $('#holiday').append(`
                    // <div class="card">
                    //     <div class="sliderText">
                    //         <h3>${el.date.iso}</h3>
                    //     </div>
                    //     <div class="card-content">
                    //         <h4>${el.name}</h4>
                    //     </div>
                    // </div>
                `)
            })
        })
        .fail(function (err) {
            console.log(err)
        })
}
