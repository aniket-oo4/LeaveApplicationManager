$(document).ready(function () {

    // let user = Common.getStoredUser();
    // // console.log(user);
    // // console.log($('#user-details .h4')[0].innerHTML);
    // if (user != null) {
    //     $('#user-name')[0].innerHTML = user.userName;
    //     $('#user-role')[0].innerHTML = user.roleName;

    // }

    //TokenGenerator
    // let User = new Users();
    // User = JSON.parse(`{
    // "userName":"chetan",
    // "roleName":"admin"
    // }`);
    // LeaveApplicationManager.GenerateToken(user);

    //Users
    // LeaveApplicationManager.GetUserByUserId(1);
    // LeaveApplicationManager.GetUserByUserName('arjun');

    //Put
    // LeaveApplicationManager.UpdateUserPassword(111,'pass@123');
    //POST
    //  let newUser=new Users();
    //  newUser=JSON.parse(`{
    //     "userName": "Ganesh",
    //     "password": "pass@123"
    // }`);
    // LeaveApplicationManager.AddUser(61,newUser);
    //Update PUT
    //  let updatedUser=new Users();
    //  updatedUser=JSON.parse(`{
    //     "userName": "GaneshT",
    //     "isActive": true,
    //     "updatedBy": 61
    // }`);
    // LeaveApplicationManager.UpdateUser(8,updatedUser);




    //-------------------------------------------

    //Employees
    //GET
    // LeaveApplicationManager.GetEmployeeByEmpId(61);
    // LeaveApplicationManager.GetAllEmployees(61);
    // LeaveApplicationManager.GetEmployeesByManagerId(62);
    // LeaveApplicationManager.GetEmployeeByUserId(1);

    //PUT
    // let employee=new Employees();
    //  employee=JSON.parse(`{
    //     "firstName": "Arjun",
    //     "lastName": "Singhania",
    //     "emailAddress": "arjun@example.com",
    //     "birthDate": "1990-03-03T00:00:00",
    //     "city": "Pune",
    //     "userId": 3,
    //     "dptId": 3,
    //     "costCenterId": 3,
    //     "roleId": 2,
    //     "managerId": 62,
    //     "orgId": 1

    // }`)
    // LeaveApplicationManager.UpdateEmployee(63,employee);

    //POST
    //  let employee=new Employees();
    //  employee=JSON.parse(`{
    //     "firstName": "Ganesh",
    //     "lastName": "takale",
    //     "emailAddress": "ganesh@example.com",
    //     "birthDate": "2001-03-04T00:00:00",
    //     "city": "pune",
    //     "userId": 8,
    //     "dptId": 3,
    //     "costCenterId": 3,
    //     "roleId": 2,
    //     "managerId": 62,
    //     "orgId": 1
    // }`);
    // LeaveApplicationManager.AddEmployee(employee);


    //Leave Applications
    //  LeaveApplicationManager.GetAllLeaveApplications();
    // LeaveApplicationManager.GetLeaveApplicationById(135)
    // LeaveApplicationManager.GetAllLeaveApplicationsByEmp(63);
    // LeaveApplicationManager.GetAllLeaveApplicationsByManager(62);
    //POST
    //      let leaveApplication=new LeaveApplications();
    //      leaveApplication=JSON.parse(`{
    //     "leaveTypeId": 1,
    //     "leaveDateFrom": "2024-10-17T00:00:00",
    //     "leaveDateTo": "2024-10-17T00:00:00",
    //     "remark": "Family function",
    //     "statusId": 1,
    //     "applicationDate": "2024-01-02T00:00:00",
    //     "updatedDate": "2024-01-01T00:00:00",
    //     "totalLeaves": null,
    //     "empId": 64
    // }`);
    //  LeaveApplicationManager.AddLeaveApplication(leaveApplication);

    //PUT Update
    // let leaveApplication=new LeaveApplications();
    //  leaveApplication=JSON.parse(` {        
    //     "leaveTypeId": 2,
    //     "leaveDateFrom": "2024-12-25T00:00:00",
    //     "leaveDateTo": "2024-12-27T00:00:00",
    //     "remark": "Vacation to dubai",
    //     "statusId": 3,
    //     "empId": 61
    // }`);
    // LeaveApplicationManager.UpdateLeaveApplication(135,leaveApplication);

    // LeaveApplicationManager.GetLeaveBalanceByEmpId(61);
    //LeaveApplicationManager.GetAllLeaveTypes();

    //POST
    //      let leaveType=new LeaveTypes();
    //  leaveType=JSON.parse(`{

    //         "leaveType": "Sick Leave",
    //         "createdAt": "2024-09-28T00:17:09.94",
    //         "updatedAt": "2024-09-28T00:17:09.94",
    //         "createdBy": 1,
    //         "updatedBy": 1
    //     }`);
    // let adminId=61;
    // LeaveApplicationManager.AddLeaveType(adminId,leaveType);


    //Organisations 
    // LeaveApplicationManager.GetAllPublicHolidays(1);
    // LeaveApplicationManager.GetAllDepartments(1);
    // LeaveApplicationManager.GetAllCostCenters(1);

    //Menus
    // LeaveApplicationManager.GetAllMenus();
    //LeaveApplicationManager.GetAllMenusByRole(2);

    //AddMenu
    //  let menu=new Menus();
    //  menu=JSON.parse(`{
    //         "menuName": "WorkFlow Dashboard",
    //         "url": "/workflowDashboard"
    //     }`);
    //LeaveApplicationManager.AddMenu(Menu);
    //AssignMenu
    //  let menu=new Menus();
    // menu = JSON.parse(`{ 
    //         "roleId":1111,
    //         "menuId":1
    //         }`);
    //LeaveApplicationManager.AssignMenu(Menu);


    //Actions
    // LeaveApplicationManager.GetAllActionsByRole(3);


}); //Document Ready ()