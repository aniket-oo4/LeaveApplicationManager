
$(document).ready(function () {
    if (Common.getToken() == null && !window.location.href.endsWith("login.html")) {
        window.location.href = '../../login.html';
    }
    let user = Common.getStoredUser();
    // console.log(user);
    if (user != null) {
        $('#user-name')[0].innerHTML = user.userName;
        $('#user-role')[0].innerHTML = user.roleName;
        setPermissions(user);
        setEmployeeData(user);

    } 
    $('#btn-logout').attr('style','cursor:pointer')
    
});

async function setEmployeeData(user){
  let employee=await LeaveApplicationManager.GetEmployeeByUserId(user.userId);
      if(employee!=undefined){
        employee=employee.Data;
        Common.storeEmployee(employee);
        $('#emp-modal-empname')[0].innerText=employee.firstName+" "+employee.lastName;
        $('#emp-modal-role')[0].innerText=employee.roleName;
        debugger;
      }

}
function setPermissions(user){  
  if(user.roleName=='manager'||user.roleName=='admin')
    {
        // MapAllLeaveApplications();
        // MapPublicHolidays();
        if(user.roleName=='admin')
        {
          $('#menu-admin').show(); 
          $('#Home')[0].href='../admin/admin.html';
        }
        else{
          $('#menu-admin').hide(); 
          $('#menu-admin').attr('disabled','disabled'); 
        }
        $('#btnApprover').show();
    }
    else{
      $('#menu-admin').hide(); 
      $('#menu-admin').attr('disabled','disabled'); 
      $('#btnApprover').hide();
    }
}


  
async function MapPublicHolidays(orgId){
let holidayTable=$('#tblPublicHolidays tbody')[0];
const result=await LeaveApplicationManager.GetAllPublicHolidays(1);
holidayTable.innerHTML='';
let count=1;
result.Data.forEach(holiday => {
    const row=document.createElement('tr');
    row.innerHTML=`
                            <th scope="row">${count}</th>
                            <td id="holidayDate">${Common.formatDateString( holiday.holidayDate)}</td>
                            <td></td>
                            <td id="holidayDescription">${holiday.holidayInfo}</td>
    
    `;
    holidayTable.appendChild(row);

    count+=1;
});
}


// async function FetchOnScroll(page,size){
//   const result =await LeaveApplicationManager.fetchDataOnScroll(page,size)
//   console.log(result);

// }

// FetchOnScroll(0,20);

