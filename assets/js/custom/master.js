require(["jquery"], function ($) {
    sc.include.headerMenu();
    sc.include.footer();
    sc.changeTitle("fitby - Personel Trainer");
    //sc.changeText("#schoolName", localStorage.getItem("sName"));
    //document.querySelectorAll("#schoolLogo")[0].style.backgroundImage = "url('" + localStorage.getItem("sLogo") + "')";

    /*$('#action-dropdown').on('show.bs.dropdown', function () {
        $(".table-responsive").css("-webkit-overflow-scrolling", "");
    });

    $('#action-dropdown').on('hide.bs.dropdown', function () {
        $(".table-responsive").css("-webkit-overflow-scrolling", "touch");
    });*/
});