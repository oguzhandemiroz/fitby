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

sc.redirect = function (path, timeout, href) {
    try {
        path = window.location.origin + path;
        if (!timeout)
            timeout = 0;
        setTimeout(function () {
            if (href)
                window.location.href = path;
            else
                window.location.replace(path);
        }, timeout);
    } catch (e) {}
}

sc.encrypt = function (string) {
    try {
        var encrypted = CryptoJS.AES.encrypt(string, "c2NvdXRpdmU=");
        return encrypted.toString();
    } catch (e) {}
}

sc.decrypt = function (value) {
    try {
        var decrypted = CryptoJS.AES.decrypt(value, "c2NvdXRpdmU=");
        return decrypted.toString(CryptoJS.enc.Utf8);
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

sc.request.register = function (data) {
    try {
        console.log(data);
        sc.fetch(ep.ACCOUNT_REGISTER, "POST", JSON.stringify(data))
            .then(function (response) {
                if (response.status.code !== 1020) {
                    sc.errorSwal(response.status);
                } else {
                    Toast.fire({
                        type: 'success',
                        title: 'Hesabınız oluşturuldu...'
                    });
                    localStorage.setItem("remember-info", data.email);
                    localStorage.setItem("trainer-email", data.email);
                    localStorage.setItem("trainer-name", data.name);
                    localStorage.setItem("trainer-surname", data.surname);
                    localStorage.setItem("UID", response.uid);
                    localStorage.setItem("s:key", sc.encrypt(data.password));
                    sc.redirect("/", 1300, false);
                }
            }).catch(function (err) {
                console.log(err);
                sc.errorSwal({
                    code: 1050,
                    description: "Kritik bir hata ile karşı karşıyayız. Üzerinde çalışıyoruz. Lütfen daha sonra tekrar deneyin..."
                });
            });

        $("#registerButton").removeClass("btn-loading");
        $("#name").attr("disabled", false);
        $("#surname").attr("disabled", false);
        $("#email").attr("disabled", false);
        $("#password").attr("disabled", false);
        $("#terms").attr("disabled", false);
    } catch (e) {
        sc.errorSwal({
            code: 1050,
            description: "Kritik bir hata ile karşı karşıyayız. Üzerinde çalışıyoruz. Lütfen daha sonra tekrar deneyin..."
        });
    }
}

sc.request.login = function (data, remember) {
    try {
        if (remember) {
            localStorage.setItem("remember-info", data.email);
        }
        sc.fetch(ep.ACCOUNT_LOGIN, "POST", JSON.stringify(data))
            .then(function (response) {
                console.log(response);
                const status = response.status;
                if (status.code !== 1020) {
                    sc.errorSwal(status);
                } else {
                    Toast.fire({
                        type: 'success',
                        title: 'Giriş yapılıyor...'
                    });
                    var res = response.data;
                    console.log(res);
                    localStorage.setItem("trainer-email", data.email);
                    localStorage.setItem("trainer-name", res.name);
                    localStorage.setItem("trainer-surname", res.surname);
                    localStorage.setItem("UID", res.uid);
                    localStorage.setItem("s:key", sc.encrypt(data.password));
                    sc.redirect("/", 1300, false);
                }
                $("#loginButton").removeClass("btn-loading");
                $("#username").attr("disabled", false);
                $("#password").attr("disabled", false);
            }).catch(function (err) {
                sc.errorSwal({
                    code: 1050,
                    description: "Kritik bir hata ile karşı karşıyayız. Üzerinde çalışıyoruz. Lütfen daha sonra tekrar deneyin..."
                });
            });
    } catch (e) {
        sc.errorSwal({
            code: 1050,
            description: "Kritik bir hata ile karşı karşıyayız. Üzerinde çalışıyoruz. Lütfen daha sonra tekrar deneyin..."
        });
    }
}

sc.request.logout = function () {
    try {
        localStorage.removeItem("trainer-email");
        localStorage.removeItem("trainer-name");
        localStorage.removeItem("trainer-surname");
        localStorage.removeItem("UID");
        localStorage.removeItem("s:key");
        sc.redirect("/login.html", 0, false);
    } catch (e) {}
}

sc.request.checkAccount = function () {
    try {
        if (localStorage.getItem("UID")) {
            console.log(localStorage.getItem("UID"));
            skey = localStorage.getItem("s:key");
            var data = {
                "email": localStorage.getItem("trainer-email"),
                "password": sc.decrypt(skey),
            }
            sc.fetch(ep.ACCOUNT_LOGIN, "POST", JSON.stringify(data))
                .then(function (response) {
                    if (response.status.code === 1020) {
                        localStorage.setItem("trainer-name", response.data.name);
                        localStorage.setItem("trainer-surname", response.data.surname);
                        localStorage.setItem("UID", response.data.uid);
                        sc.changeText("#trainer-name", (localStorage.getItem("trainer-name") + " " + localStorage.getItem("trainer-surname")));
                        sc.changeText("#trainer-avatar", localStorage.getItem("trainer-name").charAt(0));
                    }
                }).catch(function (e) {
                    sc.errorSwal({
                        code: 1050,
                        description: "Kritik bir hata ile karşı karşıyayız. Üzerinde çalışıyoruz. Lütfen daha sonra tekrar deneyin..."
                    });
                });
        } else {
            $("body").addClass("d-none");
            sc.redirect("/login.html", 0, false);
        }
    } catch (e) {
        sc.errorSwal({
            code: 1050,
            description: "Kritik bir hata ile karşı karşıyayız. Üzerinde çalışıyoruz. Lütfen daha sonra tekrar deneyin..."
        });
    }
}

sc.request.getStudent = function () {
    try {

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