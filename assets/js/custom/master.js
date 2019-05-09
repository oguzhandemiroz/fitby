require(["jquery"], function ($) {
    sc.include.headerMenu();
    sc.include.footer();
    sc.changeTitle("Scoutive | Personal Trainer");
    sc.changeText("#ptName", (localStorage.getItem("ptName") + " " + localStorage.getItem("ptSurname")));
    sc.changeText("#ptAvatar", localStorage.getItem("ptName").charAt(0));
    //document.querySelectorAll("#schoolLogo")[0].style.backgroundImage = "url('" + localStorage.getItem("sLogo") + "')";

    /*$('#action-dropdown').on('show.bs.dropdown', function () {
        $(".table-responsive").css("-webkit-overflow-scrolling", "");
    });

    $('#action-dropdown').on('hide.bs.dropdown', function () {
        $(".table-responsive").css("-webkit-overflow-scrolling", "touch");
    });*/
});