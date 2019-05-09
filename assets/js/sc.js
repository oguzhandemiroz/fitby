var sc = {};
sc.include = {};
sc.request = {};
sc.membership = {};

const Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 1500
});

/* ### MAIN FUNCTIONS ### */

sc.xhr = function (url, target) {
    try {
        if (!target) {
            target = ""
        };
        var xhr = new XMLHttpRequest();
        if (xhr != null) {
            xhr.open("GET", url, false);
            xhr.followsRedirect = false;
            xhr.useDefaultXhrHeader = false;
            xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
            xhr.onreadystatechange = function () {
                if (xhr.readyState == 4 && xhr.status == 200) {
                    var r = xhr.responseText;
                    if (!!target) {
                        if (target == 'body') {
                            //append to end of body
                            document.body.insertAdjacentHTML('beforeend', r);
                        } else {
                            try {
                                document.getElementById(target).innerHTML = r
                            } catch (err) {}
                        }
                    } else {
                        return r;
                    }
                }
            }
            xhr.send();
            return xhr.onreadystatechange();
        }
    } catch (e) {}
}

sc.fetch = function (url, method, body, headers) {
    try {
        if (!method)
            method = "GET";
        if (!headers && method !== "GET")
            headers = new Headers({
                "Content-Type": "application/json"
            });
        return fetch(url, method !== "GET" ? {
            method: method,
            body: body,
            headers: headers
        } : {}).then(function (res) {
            return res.json();
        }).then(function (response) {
            return response;
        }).catch(function (err) {
            return err;
        });
    } catch (e) {}
}

sc.changeTitle = function (title) {
    try {
        document.querySelectorAll("head title")[0].text = title;
    } catch (e) {}
}


sc.changeText = function (elem, text) {
    try {
        document.querySelectorAll(elem)[0].innerHTML = text;
    } catch (e) {}
}

sc.errorSwal = function (data, options) {
    try {
        return Swal.fire({
            allowOutsideClick: false,
            type: 'error',
            title: 'Hata Kodu: ' + data.code,
            text: data.description,
            heightAuto: false,
            confirmButtonText: 'Tamam',
            ...options,
        });
    } catch (e) {}
}

/* ### MAIN FUNCTIONS ### */


/* ### INCLUDE HTML FUNCTIONS ### */

sc.include.headerMenu = function () {
    try {
        sc.xhr(html.HEADER_MENU, "header-menu");
    } catch (e) {
        console.log(e)
    }
}

sc.include.menu = function (active) {
    try {
        if (!active)
            active = 0;
        sc.xhr(html.MENU, "menu");
        document.querySelectorAll("#menu .nav-link")[active].classList.add("active");
    } catch (e) {}
}

sc.include.footer = function () {
    try {
        sc.xhr(html.FOOTER, "footer");
    } catch (e) {}
}

/* ### INCLUDE HTML FUNCTIONS ### */


/* ### SERVER SIDE REQUEST FUNCTIONS ### */


sc.request.login = function (data, remember) {
    try {
        if (remember) {
            localStorage.setItem("remember-info", data.email);
        }
        sc.fetch(ep.ACCOUNT_LOGIN, "POST", JSON.stringify(data)).then(function (response) {
            console.log(response);
            const status = response.status;
            if (response.status || response.data) {
                if (status !== 0) {
                    //if (status.code !== 1020) {
                    sc.errorSwal(status);
                } else {
                    Toast.fire({
                        type: 'success',
                        title: 'Giriş yapılıyor...'
                    });
                    var data = response.data;
                    console.log(data);
                    localStorage.setItem("ptName", data.name);
                    localStorage.setItem("ptSurname", data.surname);
                    localStorage.setItem("UID", data.uid);
                    window.location.replace("/");
                }
            } else {
                sc.errorSwal({
                    code: 1050,
                    description: "Kritik bir hata ile karşı karşıyayız. Üzerinde çalışıyoruz. Lütfen daha sonra tekrar deneyin..."
                });
            }
            $("#loginButton").removeClass("btn-loading");
            $("#username").attr("disabled", false);
            $("#password").attr("disabled", false);
        });
    } catch (e) {}
}

sc.request.logout = function () {
    try {
        window.location.replace("../../../login.html");
    } catch (e) {}
}

/* ### SERVER SIDE REQUEST FUNCTIONS ### */


/* ### MEMBERSHIP FUNCTIONS ### */

sc.membership.remember = function (elem) {
    try {
        var su = localStorage.getItem("remember-info");
        $(elem).val(su);
    } catch (e) {}
}

/* ### MEMBERSHIP FUNCTIONS ### */