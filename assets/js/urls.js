var host = "http://scoutive.online/";
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
    "ACCOUNT_REGISTER": host + api_version + "create/trainer",
    "ACCOUNT_LOGIN": host + api_version + "login/trainer",
    "LIST_STUDENT": host + api_version + "list/user",
}