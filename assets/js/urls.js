var host = "https://scoutive.online/";
var api_version = "api/v1/";

var html = {
    "HEADER_MENU": "../../includes/header-menu.html",
    "MENU": "../../includes/menu.html",
    "FOOTER": "../../includes/footer.html",
    "MODAL": "../../includes/modal.html",
    "PAY_SALARY": "../../includes/action/employee/pay-salary.html",
    "ADVANCE_PAYMENT": "../../includes/action/employee/advance-payment.html",
    "SALARY_RAISE": "../../includes/action/employee/salary-raise.html",
    "DAY_OFF": "../../includes/action/employee/day-off.html",
    "SEND_MESSAGE": "../../includes/action/employee/send-message.html",
    "WARNING": "../../includes/action/employee/warning.html",
    "CHANGE_PASSWORD": "../../includes/action/employee/change-password.html",
    "PERMISSION": "../../includes/action/employee/permission.html",
    "LIST_EMPLOYEE": "../../includes/lists/employee.html",
    "LIST_PLAYER": "../../includes/lists/player.html",
}

var ep = {
    "BLOOD_TYPE": host + api_version + "get/bloods",
    "PLAYER_POSITION_TYPE": host + api_version + "get/position/player",
    "EMPLOYEE_POSITION_TYPE": host + api_version + "get/position/employee",
    "GROUP": host + api_version + "get/groups",
    "BRANCH": host + api_version + "get/branchs",
    "CLUB": host + api_version + "get/all/clubs",
    "SCHOOL_INFO": host + api_version + "get/school",
    "SCHOOL_UPDATE": host + api_version + "update/school",
    "ACCOUNT_CREATE": host + api_version + "create/school",
    "ACCOUNT_LOGIN": host + api_version + "login",
    "ACCOUNT_ACTIVATION": host + api_version + "activation",
    "LIST_EMPLOYEE": host + api_version + "list/employee",
    "GET_EMPLOYEE": host + api_version + "get/employee",
    "CHECK_PERMISSION": host + api_version + "check/permission",
}