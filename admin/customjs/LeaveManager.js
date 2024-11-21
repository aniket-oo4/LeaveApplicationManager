// // import
// const { Common } = require('./commonUtils');
// const {
//     ActionMaster,
//     Actions,
//     ApplicationStatus,
//     CostCenters,
//     Departments,
//     Employees,
//     LeaveApplications,
//     LeaveBalances,
//     LeaveTypes,
//     LoginDto,
//     MenuAccessMaster,
//     Menus,
//     Organisations,
//     Process,
//     ProcessMaster,
//     ProcessStages,
//     PublicHolidays,
//     UserRoles,
//     Users
// } = require('./dto.js');


var LeaveApplicationManager = {
    baseUrl: "http://localhost:57686/api",
    result: null,

    Login: function (userName, Password) {

        let url = this.baseUrl + "/users/login";
        let payload = new LoginDto();
        payload.UserName = userName;
        payload.Password = Password;
        Common.apiCall(url, 'POST', payload, null)
            .then((data) => {
                if (data.IsSuccess) {
                    ToastHelper.showToast(data.Message, 'success', 'green', 'top-right', 1000)
                    console.log(data);
                    Common.storeUser(data.Data);
                    let payload = data.Data;
                    this.GenerateToken(payload);  
                    // Common.apiCall("http://localhost:57686/api/tokenGenerator", 'POST', payload, null)
                    //     .then(token => Common.storeToken(token))
                    //     .catch(error => ToastHelper.showToast(error, 'error', 'red'));
                    setTimeout(function () {                    
                        if (data.Data.roleName == 'admin') {
                            window.location.href = "./Pages/admin/admin.html";
                        }
                        else {
                            window.location.href = "./Pages/user/index.html";
                        }
                    }, 1000);
                    setTimeout(this.Logout,1000*60*3);
                    
                }
                else {
                    let msg = "";
                    data.ErrorList.forEach(error => {
                        msg += "<br/> ‣" + error;
                    });
                    ToastHelper.showToast(msg, 'error', 'red')
                }
            })
            .catch((error) => {
                ToastHelper.showToast('Something Went Wrong  .', 'warning', 'darkred');
            });


    },

    Logout: function () {
        Common.destroySession();
        // sessionStorage.removeItem('authToken'); 
        ToastHelper.showToast('Logged Out Succesfully  .', 'info', 'orange', 'top-right', 1000);
        setTimeout(function () {
            window.location.href = "../../login.html";
        }, 1000);
    },
    GenerateToken:function(user){
        let payload=user;
        Common.apiCall("http://localhost:57686/api/tokenGenerator", 'POST', payload, null)
                        .then((token) =>{ 
                            Common.storeToken(token);
                        })
                        .catch(error => ToastHelper.showToast(error, 'error', 'red'));
    },
    //Users
    GetUserByUserId: function (userId) {
        let url = this.baseUrl + "/users/GetById/" + userId;
        let token = Common.getToken();
        console.log(token);
        Common.apiCall(url, 'GET', null, token)
            .then(data => { console.log('GetUsers By userId Response:', data); return data; })
            .catch(error => console.error('GetUsers By userId Error:', error));
    },
    GetUserByUserName: function (userName) {
        let url = this.baseUrl + "/users/GetByUserName/" + userName;
        let token = Common.getToken();
        console.log(token);
        Common.apiCall(url, 'GET', null, token)
            .then(data => { console.log('GetUsers By UserName Response:', data); return data; })
            .catch(error => console.error('GetUsers By UserName  Error:', error));
    },
    UpdateUserPassword: function (userId, newPassword) {
        let url = this.baseUrl + "/users/updatePassword/" + userId;
        let token = Common.getToken();
        let payload = newPassword;
        // console.log(token);
        Common.apiCall(url, 'PUT', payload, token)
            .then(data => { console.log('Update UserPassword:', data); return data; })
            .catch(error => console.error('Update UserPassword error:', error));
    },
    AddUser: function (adminId,user) {
        let url = this.baseUrl + "/users/AddUser/"+adminId;
        let token = Common.getToken();
        let payload = user;
        // console.log(token);
        Common.apiCall(url, 'POST', payload, token)
            .then(data => { console.log('Add User:', data); return data; })
            .catch(error => console.error('Add User error:', error));
    },
    UpdateUser: function (userId, user) {
        let url = this.baseUrl + "/users/Update/" + userId;
        let token = Common.getToken();
        let payload = user;
        // console.log(token);
        Common.apiCall(url, 'PUT', payload, token)
            .then(data => { console.log('Update Employee:', data); return data; })
            .catch(error => console.error('Update Employee error:', error));
    },

    //Employee
    GetEmployeeByEmpId:async function (empId) {
        let url = this.baseUrl + "/Employees/GetByEmpId/" + empId;
        let token = Common.getToken();
        console.log(token);
        try{
        let data=await Common.apiCall(url,'GET',null,token);
        console.log('GET Response:', data); 
        return data;
        }
        catch(error){
            ToastHelper.showToast('Error Occurs :'+error,'warning','red','bottom-right',1000);
            console.error('GET All Employees error:', error);
            throw error;  // Throw the error to be handled by the caller
        }
        
    },
    GetEmployeeByUserId: async function (userId) {
        let url = this.baseUrl + "/Employees/GetByUserId/" + userId;
        let token = Common.getToken();
        // console.log(token);
        try{
            let data=await Common.apiCall(url,'GET',null,token);
            // console.log('GET By UserID:', data); 
            return data;
            }
            catch(error){
                ToastHelper.showToast('Error Occurs :'+error,'warning','red','bottom-right',1000);
                console.error('GET By UserID Errorerror:', error);
                throw error;  // Throw the error to be handled by the caller
            }
    },
    GetAllEmployees: async function (orgId) {
        debugger
        let url = this.baseUrl + "/Employees/GetAll/" + orgId;
        let token = Common.getToken();
        try {
            let data = await Common.apiCall(url, 'GET', null, token);
            // console.log('GetAll Employees :', data);
            return data;  // Return the data
        } catch (error) {
            console.error('GET All Employees error:', error);
            throw error;  // Throw the error to be handled by the caller
        }
        
    },
    GetEmployeesByManagerId:async function (managerId) {
        let url = this.baseUrl + "/Employees/GetByManagerId/" + managerId;
        let token = Common.getToken();
        // console.log(token);
        try {
            let data = await Common.apiCall(url, 'GET', null, token);
            // console.log('GetEmp by ManagerID:', data);
            return data;  // Return the data
        } catch (error) {
            console.error('GETEmp by ManagerID error:', error)
            throw error;  // Throw the error to be handled by the caller
        }

    },
    UpdateEmployee: function (empId, employee) {
        let url = this.baseUrl + "/Employees/Update/" + empId;
        let token = Common.getToken();
        let payload = employee;
        // console.log(token);
        Common.apiCall(url, 'PUT', payload, token)
            .then(data => { console.log('Update Employee:', data); return data; })
            .catch(error => console.error('Update Employee error:', error));
    },
    AddEmployee: function (employee) {
        let url = this.baseUrl + "/Employees/AddEmployee";
        let token = Common.getToken();
        let payload = employee;
        // console.log(token);
        Common.apiCall(url, 'POST', payload, token)
            .then(data => { console.log('Add Employee:', data); return data; })
            .catch(error => console.error('Add Employee error:', error));
    },


    //LeaveApplications 
    GetAllLeaveApplications:async  function () {
        let url = this.baseUrl + "/LeaveApplicationsApi/GetAll";
        let token = Common.getToken();
            try {
                let data = await Common.apiCall(url, 'GET', null, token);
                // console.log('GetAll Leave Applications:', data);
                return data;  // Return the data
            } catch (error) {
                console.error('GET All Leave Applications error:', error);
                throw error;  // Throw the error to be handled by the caller
            }
    },
    GetLeaveApplicationById: function (leaveId) {
        let url = this.baseUrl + "/LeaveApplicationsApi/GetById/    "+leaveId;
        let token = Common.getToken();
        // console.log(token);
             Common.apiCall(url, 'GET', null, token)
            .then(data => { console.log('GetById Leave Application  :', data); return data; })
            .catch(error => console.error('GET GetById  Leave Application error:', error));
    },
    GetAllLeaveApplicationsByEmp:async function (empId) {
        let url = this.baseUrl + "/LeaveApplicationsApi/GetByEmp/"+empId;
        let token = Common.getToken();
        try {
            let data = await Common.apiCall(url, 'GET', null, token);
            console.log('GetAll Leave Applications By EmpId :', data);
            return data;  // Return the data
        } catch (error) {
            console.error('GET All  Leave Applications  By EmpId  error:', error);
            throw error;  // Throw the error to be handled by the caller
        }
    },
    GetAllLeaveApplicationsByManager: async function (managerId) {
        let url = this.baseUrl + "/LeaveApplicationsApi/GetByManagerId/"+managerId;
        let token = Common.getToken();
        // console.log(token);
        try {
            let data = await Common.apiCall(url, 'GET', null, token);
            // console.log('GetAll Leave Applications By GetByManagerId :', data);
            return data;  // Return the data
        } catch (error) {
            console.error('GET All  Leave Applications  By GetByManagerId  error:', error);
            throw error;  // Throw the error to be handled by the caller
        }
/*
        Common.apiCall(url, 'GET', null, token)
            .then(data => { console.log('GetAll Leave Applications By GetByManagerId :', data); return data; })
            .catch(error => console.error('GET All  Leave Applications  By GetByManagerId  error:', error));
   */ },
    AddLeaveApplication: async function (leaveApplication) {
        let url = this.baseUrl + "/LeaveApplicationsApi/AddLeave";
        let token = Common.getToken();
        let payload = leaveApplication;
        try {
            let data = await Common.apiCall(url, 'POST', payload, token);
            console.log('Add Leave Application:', data); 
            return data;  // Return the data
        } catch (error) {
            console.error('Add Leave Application', error)
            throw error;  // Throw the error to be handled by the caller
        }
        // console.log(token);
        
    },
    UpdateLeaveApplication: async function (leaveId, leaveApplication) {
        let url = this.baseUrl + "/LeaveApplicationsApi/UpdateApplication/" + leaveId;
        let token = Common.getToken();
        let payload = leaveApplication;
        // console.log(token);
        try{
            let data=await Common.apiCall(url,'PUT',payload,token);
            console.log('Update UpdateLeaveApplication:', data);
            return data ;
        }
        catch(error){
            ToastHelper.showToast('Error Occurs a tUpdateLeaveApplication :'+error,'warning','red','bottom-right',1000);
            console.error('Update UpdateLeaveApplication error:',error);
        }
        // Common.apiCall(url, 'PUT', payload, token)
        //     .then(data => { console.log('Update UpdateLeaveApplication:', data); return data; })
        //     .catch(error => console.error('Update UpdateLeaveApplication error:', error));
    },
    UpdateLeaveApplicationStatus: async function (leaveId, updatedStatusId) {
        let url = this.baseUrl + `/LeaveApplicationsApi/UpdateApplicationStatus/${leaveId}/status/${updatedStatusId}`;
        let token = Common.getToken();
        // console.log(token);
        try{
            let data=await Common.apiCall(url,'PUT',null,token);
            console.log('Update UpdateLeaveApplication Status :', data);
            return data ;
        }
        catch(error){
            ToastHelper.showToast('Error Occurs a tUpdateLeaveApplication Status :'+error,'warning','red','bottom-right',1000);
            console.error('Error at UpdateLeaveApplication Status  error:',error);
        }
    },
    GetLeaveBalanceByEmpId: function (empId) {
        let url = this.baseUrl + "/LeaveApplicationsApi/GetLeaveBalance/"+empId;
        let token = Common.getToken();
        // console.log(token);
        Common.apiCall(url, 'GET', null, token)
            .then(data => { console.log('GetLeaveBalanceByEmpId  :', data); return data; })
            .catch(error => console.error('GetLeaveBalanceByEmpId error:', error));
    },
    GetAllLeaveTypes:async function () {
        let url = this.baseUrl + "/LeaveApplicationsApi/GetLeaveTypes";
        let token = Common.getToken();
                // console.log(token);
        try{
                let data=await Common.apiCall(url,'GET',null,token);
                // console.log('GetAll Leave Types :', data);
                return data;
        }
        catch(error){
            ToastHelper.showToast('Error Occurs :'+error,'warning','red','bottom-right',1000);
            console.error('GET All  Leave Types error:', error);
            // throw error;  
        }        
    },
    AddLeaveType: function (adminId,leaveType) {
        let url = this.baseUrl + "/LeaveApplicationsApi/AddLeaveType/"+adminId;
        let token = Common.getToken();
        let payload = leaveType;
        // console.log(token);
        Common.apiCall(url, 'POST', payload, token)
            .then(data => { console.log('Add Leave Type:', data); return data; })
            .catch(error => console.error('Add Leave Type', error));
    },
    GetAllPublicHolidays:async function(orgId){
        let url = this.baseUrl + "/organisation/GetPublicHolidays/"+orgId;
        let token = Common.getToken();
        // console.log(token);
        try {
            let publicHolidays = await Common.apiCall(url, 'GET', null, token);
            console.log('GetAll PublicHolidays:', publicHolidays);
            return publicHolidays;
        } catch (error) {
            console.error('Error fetching public holidays:', error);
            throw error;
        }
        // Common.apiCall(url, 'GET', null, token)
        //     .then(data => { console.log('GetAll PublicHolidays :', data); return data; })
        //     .catch(error => console.error('GET All  PublicHolidays error:', error));
    },
    GetAllDepartments:function(orgId){
        let url = this.baseUrl + "/organisation/GetDepartments/"+orgId;
        let token = Common.getToken();
        // console.log(token);
        Common.apiCall(url, 'GET', null, token)
            .then(data => { console.log('GetAll GetDepartments :', data); return data; })
            .catch(error => console.error('GET All  GetDepartments error:', error));
    },
    // try {
        //     let data = await Common.apiCall(url, 'GET', null, token);
        //     console.log('GetAll PublicHolidays :', data);
        //      return data; 
        // }
        // catch(error){
        //     console.error('GET All  PublicHolidays error:', error)
        //     throw error;
        // }
    GetAllCostCenters:  function(orgId){
        let url = this.baseUrl + "/organisation/GetCostCenters/"+orgId;
        let token = Common.getToken();
        // console.log(token);

        Common.apiCall(url, 'GET', null, token)
            .then(data => { console.log('GetAll GetCostCenters :', data);  })
            .catch(error => console.error('GET All  GetCostCenters error:', error));
           
    },
   
    //Menus
    GetAllMenus: function () {
        let url = this.baseUrl + "/menus/GetAll";
        let token = Common.getToken();
        // console.log(token);
        Common.apiCall(url, 'GET', null, token)
            .then(data => { console.log('GetAll  menus :', data);  })
            .catch(error => console.error('GET All   menus error:', error));
    },
    GetAllMenusByRole: function (roleId) {
        let url = this.baseUrl + "/menus/GetByRole/"+roleId;
        let token = Common.getToken();
        // console.log(token);
        Common.apiCall(url, 'GET', null, token)
            .then(data => { console.log('GetAll  menus By Role :', data);  })
            .catch(error => console.error('GET All   menus  By  Role error:', error));
    },
    AddMenu: function (menu) {
        let url = this.baseUrl + "/menus/AddMenu";
        let token = Common.getToken();
        let payload = menu;
        // console.log(token);
        Common.apiCall(url, 'POST', payload, token)
            .then(data => { console.log('Add AddMenu:', data); return data; })
            .catch(error => console.error('Add AddMenu error:', error));
    },
    AssignMenu: function (menu) {
        let url = this.baseUrl + "/menus/AssignMenu";
        let token = Common.getToken();
        let payload = menu;
        // console.log(token);
        Common.apiCall(url, 'POST', payload, token)
            .then(data => { console.log('Add AssignMenu:', data); return data; })
            .catch(error => console.error('Add AssignMenu error:', error));
    },

    //Action
    GetAllActionsByRole: function (roleId) {
        let url = this.baseUrl + "/actions/GetByRole//"+roleId;
        let token = Common.getToken();
        // console.log(token);
        Common.apiCall(url, 'GET', null, token)
            .then(data => { console.log('GetAll  actions By Role :', data);  })
            .catch(error => console.error('GET All   actions  By  Role error:', error));
    },


    fetchDataOnScroll: async function (page, pageSize) 
    {
        let url = this.baseUrl + `/LeaveApplicationsApi/FetchOnScroll?start=${page}&size=${pageSize}`;
        let token = Common.getToken();
            try {
                let data = await Common.apiCall(url, 'GET', null, token);
                // console.log('Applications:', data);
                return data;  // Return the data
            } catch (error) {
                console.error('GET All Leave Applications error:', error);
                throw error;  // Throw the error to be handled by the caller
            }
      }



  }

 













