var sc = {};
sc.include = {};
sc.request = {};
sc.membership = {};


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

/* ### MAIN FUNCTIONS ### */


/* ### INCLUDE HTML FUNCTIONS ### */

sc.include.headerMenu = function () {
    try {
        sc.xhr(html.HEADER_MENU, "header-menu");
    } catch (e) {console.log(e)}
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