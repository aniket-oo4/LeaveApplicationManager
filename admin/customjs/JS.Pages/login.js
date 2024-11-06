//login
$("#login").click(() => {
    userName = $("#login-username").val();
    console.log(userName);
    password = $("#login-password").val();
    LeaveApplicationManager.Login(userName, password);
    $('#login').attr('hidden','hidden');
    setTimeout(() => {
        $('#login').removeAttr('hidden')
    }, 1000*3);
})