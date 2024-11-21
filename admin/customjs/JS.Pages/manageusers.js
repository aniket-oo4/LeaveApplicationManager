$(document).ready(function ()
{
 MapAllEmployees(Common.getStoredEmployee().orgId);
});
var leaveApplications;
async function MapAllEmployees(orgId){
debugger
     let applicationsTableBody=$('#tblAllEmployees tbody')[0];
     applicationsTableBody.innerHTML=``;
     result=await LeaveApplicationManager.GetAllEmployees(orgId);
     leaveApplications=result.Data;

    $('#tblAllEmployees').DataTable({
        columns: [
            { data: 'userId' ,className: 'text-center'},
            { data: 'firstName',
                className: 'text-center',
            },
            { data: 'empId' ,className: 'text-center'},
            { data: 'roleName' ,className: 'text-center'},
            { data: 'emailAddress' ,className: 'text-center'},
            {
                data: 'birthDate',
                render: function(data) {
                    return new Date(data).toLocaleDateString('en-GB'); // Format: DD/MM/YYYY
                }
            },
            { data: 'city' ,className: 'text-center'},
            { data: 'dptName' ,className: 'text-center'},
            { data: 'location' ,className: 'text-center'},
            {
                data: 'createdAt',
                className: 'text-center',
                render: function(data) {
                    return new Date(data).toLocaleDateString('en-GB'); // Format: DD/MM/YYYY
                }
            },
            {
                data: null,//className: 'text-center',
                orderable: false, // Disables ordering for this column
                render: function(data, type, row) {
                    const viewButton = `
                        <button  id="btnViewModalAdmin" style="margin:1px;" type="button" class="btn btn-primary btn-xs btn-view" data-id="${row.empId}" data-toggle="modal" data-target="#modal-ViewEmployeesAdmin">
                            <i class="fas fa-eye"></i>
                        </button>`;
                    
                        const UpdateButton = `
                        <button  id="btnUpdateModal" style="margin:1px;" type="button" class="btn btn-success btn-xs btn-approve" data-id="${row.empId} " data-toggle="modal" data-target="#modal-UpdateLeave" >
                            <i class="fas fa-edit"></i>
                        </button>`;

                        const changeStatusButton = `
                        <button  id="btnCancelModal" style="margin:1px;" type="button"  class="btn btn-warning btn-xs btn-changeStatus" data-id="${row.userId}" data-toggle="modal" data-target="#modal-DeactivateUser" >
                            <i class="fas fa-times"></i>
                        </button>`;
                    
                    const actionButtons=`<div class="btn-group">${viewButton}${UpdateButton}${changeStatusButton  }</div>`;
                    return actionButtons;
                }
            },
            { data: 'costCenterName' ,className: 'text-center',
                visible: false
            },
            { 
                data: 'lastName' ,
                visible: false
            },
            { 
                data: 'roleId' ,
                visible: false
            },
            { 
                data: 'updatedAt' ,
                visible: false
            },
            { 
                data: 'dptId' ,
                visible: false
            },
            { 
                data: 'costCenterId' ,
                visible: false
            },
            { 
                data: 'orgId' ,
                visible: false
            },
            { 
                data: 'orgName' ,
                visible: false
            },
            { 
                data: 'managerId' ,
                visible: false
            },
            { 
                data: 'managerName' ,
                visible: false
            }
        ],
        data: leaveApplications,
        scrollX: true,
        scrollY: 250 
    });
 }

 function getRowData(row){
   debugger;
    let rowData=new Employees();
    rowData.userId=row.find('td:eq(0)').text();
    // rowData.UserID = row.find('td:eq(0)').text(); // Assuming Leave ID is in the first cell
    rowData.name = row.find('td:eq(1)').text(); // Name in the second cell
    rowData.empId = row.find('td:eq(2)').text();
    rowData.ApplicationDate=row.find('td:eq(3)').text();
    rowData.LeaveType=row.find('td:eq(4)').text();
    rowData.StartDate=row.find('td:eq(5)').text();
    rowData.EndDate=row.find('td:eq(6)').text();
    rowData.TotalDays=row.find('td:eq(7)').text();
    rowData.Status=row.find('td:eq(8)').text();
    return rowData;
 }

 //Events for Modal Buttons  
 //view Employee 
 $(document).on('click', '#btnViewModalAdmin', async function() {
    const row = $(this).closest('tr');
    debugger
    const RowData=getRowData(row);
    // const remark=row.remark;
    $('#modalUserId').val(RowData.userId);
    $('#modalEmpName').val(RowData.name);
    $('#modalEmpId').val(RowData.empId);
    $('#modalLeaveType').val(RowData.LeaveType);
    $('#modalStartDate').val(RowData.StartDate);
    $('#modalEndDate').val(RowData.EndDate);
    $('#modalTotalLeaves').val(RowData.TotalDays);
    $('#modalStatus').val(RowData.Status);
    var table = $('#tblAllEmployees').DataTable();
    var rowData = table.row($(this).closest('tr')).data();
    const remark = rowData.remark;
    $('#modalRemark').val(remark);
    $('#btnViewModalAdmin').fadeIn();
    });
    

    //Aprove
    $(document).on('click', '#btnApproveModal',async function() {
        const row = $(this).closest('tr');
        const leaveId =row.find('td:eq(0)').text();
    $('#hdnApproveLeaveId').val(leaveId);
    });

    async function  ApproveLeave(){
        let leaveId=$("#hdnApproveLeaveId").val();
        let apiResult=await LeaveApplicationManager.UpdateLeaveApplicationStatus(leaveId,3);
        leaveApplication=null;
        if(apiResult.IsSuccess){
            $('#modal-ApproveLeave').modal('hide');
            ToastHelper.showToast("Application Approved  SuccessFully ", 'success', 'green');
        }
        else{
            let msg = "";
            Array.from(apiResult.ErrorList).forEach(error => {
                        msg += "<br/> ‣" + error;
                    });
                    ToastHelper.showToast(msg, 'error', 'red')
        }
    }   
    $('#btn-ApproveLeave').on('click',()=>{
        ApproveLeave();    
    });


    //Decline
    $(document).on('click', '#btnDeclineModal',async function() {
        const row = $(this).closest('tr');
        const leaveId =row.find('td:eq(0)').text();
    $('#hdnDeclineLeaveId').val(leaveId);
    });
    async function  DeclineLeave(){
        let leaveId=$("#hdnDeclineLeaveId").val();
        let apiResult=await LeaveApplicationManager.UpdateLeaveApplicationStatus(leaveId,4);
        leaveApplication=null;
        if(apiResult.IsSuccess){
            $('#modal-DeactivateUser').modal('hide');
            ToastHelper.showToast("Application Declined  SuccessFully ", 'success', 'orange');
        }
        else{
            let msg = "";
            Array.from(apiResult.ErrorList).forEach(error => {
                        msg += "<br/> ‣" + error;
                    });
                    ToastHelper.showToast(msg, 'error', 'red')
        }
    }   
    $('#btn-DeclineLeave').on('click',()=>{
        DeclineLeave();    
    });
    