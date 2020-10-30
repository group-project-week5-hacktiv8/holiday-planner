let baseUrl = 'http://localhost:3000'

$(document).ready(function () {
    if (localStorage.access_token) {
        landingPage()
    } else {
        loginRegisterPage()
    }
    $("#covid-data-table").hide()
});

function landingPage() {
    $("#covid").hide()
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
    $("#covid").hide()
    $("#landing-Page").hide()
    $("#login-Register-Page").show()
    $('#plan').hide()
}

function fetchCorona() {
    $("#covid").show()
    $("#landing-Page").hide()
    $("#login-Register-Page").hide()
    fetchCoronxa()
}

function covidTable() {
    $("#covid-data-table").show()
    $("#covid").hide()
    $("#landing-Page").hide()
    $("#login-Register-Page").hide()
}

function backHome() {
    $("#covid-data-table").hide()
    $("#covid").hide()
    $("#landing-Page").show()
    $("#login-Register-Page").hide()
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

$(".plan-btn").click(function () {
    fetchCorona()
    $("#covid").show()
    $("#landing-Page").hide()
    $("#login-Register-Page").hide()
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
            // let data = result.slice(29, 40)
            let dateNow = (new Date()).toISOString().substr(0, 10)
            // console.log(dateNow)
            let data = result.filter(el => {
                if (el.date >= dateNow) {
                    return el
                }
            })
            $('#holiday').empty()
            $('#holiday').append(`
            <div>
                <h3>Date Recommendation : </h3>
            </div>`)
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

function fetchCorona() {
    $.ajax({
        method: 'GET',
        url: baseUrl + '/corona',
        headers: {
            access_token: localStorage.access_token
        },
    })
        .done(result => {
            result.forEach(el => {
                    $('#covid-data').append(`
                    <tr>
                        <td>${el.Provinsi}</td>
                        <td>${el.Positif}</td>
                        <td>${el.Meninggal}</td>
                        <td>${el.Sembuh}</td>
                    </tr> 
                `)
                //     $('#covid').append(`      
                //     <div class="box">
                //         <h3>${el.Provinsi}</h3>
                //         <h5>Provinsi</h5>
                //     </div>
                //     <div class="box">
                //         <h3>${el.Positif}</h3>
                //         <h5>Positif</h5>
                //     </div>
                //     <div class="box">
                //         <h3>${el.Meninggal}</h3>
                //         <h5>Meninggal</h5>
                //     </div>
                //     <div class="box">
                //         <h3>${el.Sembuh}</h3>
                //         <h5>Sembuh</h5>
                //     </div>
                // `)
            })
            $('#covid-table').DataTable()
        })
        .fail(function (err) {
            console.log(err)
        })

}