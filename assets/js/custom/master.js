require(["jquery"], function ($) {
    try {
        sc.include.headerMenu();
        sc.include.footer();
        sc.changeTitle("Scoutive | Personal Trainer");
        sc.request.checkAccount();
        sc.changeText("#trainer-name", (localStorage.getItem("trainer-name") + " " + localStorage.getItem("trainer-surname")));
        sc.changeText("#trainer-avatar", localStorage.getItem("trainer-name").charAt(0));
    } catch (e) {}
    //document.querySelectorAll("#schoolLogo")[0].style.backgroundImage = "url('" + localStorage.getItem("sLogo") + "')";

    /*$('#action-dropdown').on('show.bs.dropdown', function () {
        $(".table-responsive").css("-webkit-overflow-scrolling", "");
    });

    $('#action-dropdown').on('hide.bs.dropdown', function () {
        $(".table-responsive").css("-webkit-overflow-scrolling", "touch");
    });*/
});