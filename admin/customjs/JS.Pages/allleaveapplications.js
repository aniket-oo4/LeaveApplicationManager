$(document).ready(function ()
{
 MapAllEmpLeaveApplications(Common.getStoredEmployee().empId);
});
var leaveApplications;
async function MapAllEmpLeaveApplications(empId){

     let applicationsTableBody=$('#tblAllEmpLeaveApp tbody')[0];
     applicationsTableBody.innerHTML=``;
     result=await LeaveApplicationManager.GetAllLeaveApplicationsByManager(empId);
     leaveApplications=result.Data;

    $('#tblAllEmpLeaveApp').DataTable({
       // Directly pass the array here
        columns: [
            { data: 'leaveId' ,className: 'text-center'},
            { data: 'firstName',
              className: 'text-center',
             },
            { data: 'empId' ,className: 'text-center'},
            {
                data: 'applicationDate',
                render: function(data) {
                    return new Date(data).toLocaleDateString('en-GB'); // Format: DD/MM/YYYY
                }
            },
            { data: 'leaveType',
              className: 'text-center',
             },
             {
                data: 'leaveDateFrom',
                render: function(data) {
                    return new Date(data).toLocaleDateString('en-GB'); // Format: DD/MM/YYYY
                }
            },
            {
                data: 'leaveDateTo',
                className: 'text-center',
                render: function(data) {
                    return new Date(data).toLocaleDateString('en-GB'); // Format: DD/MM/YYYY
                }
            },
            { data: 'totalLeaves',className: 'text-center' },
            { data: 'statusName' ,className: 'text-center'},
            {
                data: null,//className: 'text-center',
                orderable: false, // Disables ordering for this column
                render: function(data, type, row) {
                    const viewButton = `
                        <button  id="btnViewModalAdmin" style="margin:1px;" type="button" class="btn btn-primary btn-xs btn-view" data-id="${row.leaveId}" data-toggle="modal" data-target="#modal-ViewLeaveAdmin">
                            <i class="fas fa-eye"></i>
                        </button>`;
                    
                    const approveButton = `
                        <button   id="btnApproveModal" style="margin:1px;" type="button" class="btn btn-success btn-xs btn-approve" data-id="${row.leaveId}"  data-toggle="modal" data-target="#modal-ApproveLeave">
                            <i class="fas fa-check"></i>
                        </button>`;
                       
                    const declineButton = `
                        <button id="btnDeclineModal" style="margin:1px;" type="button" class="btn btn-danger btn-xs btn-decline" data-id="${row.leaveId}"  data-toggle="modal" data-target="#modal-DeclineLeave">
                            <i class="fas fa-times"></i>
                        </button>`;
                    
                    // Conditionally include the approve and decline buttons
                    const actionButtons = row.statusName === 'pending'
                    ? `<div class="btn-group">${viewButton}${approveButton}${declineButton}</div>`
                    : `<div class="btn-group">${viewButton}</div>`;
                    return actionButtons;
                }
            },
            { 
                data: 'remark' ,
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
    let rowData={} 
    rowData.leaveID = row.find('td:eq(0)').text(); // Assuming Leave ID is in the first cell
    rowData.name = row.find('td:eq(1)').text(); // Name in the second cell
    rowData.employeeID = row.find('td:eq(2)').text();
    rowData.ApplicationDate=row.find('td:eq(3)').text();
    rowData.LeaveType=row.find('td:eq(4)').text();
    rowData.StartDate=row.find('td:eq(5)').text();
    rowData.EndDate=row.find('td:eq(6)').text();
    rowData.TotalDays=row.find('td:eq(7)').text();
    rowData.Status=row.find('td:eq(8)').text();
    return rowData;
 }

 //Events 
 //view
 $(document).on('click', '#btnViewModalAdmin', async function() {
    const row = $(this).closest('tr');
    const RowData=getRowData(row);
    // const remark=row.remark;
    $('#modalApplicationDate').val(RowData.ApplicationDate);
    $('#modalEmpName').val(RowData.name);
    $('#modalEmpId').val(RowData.employeeID);
    $('#modalLeaveType').val(RowData.LeaveType);
    $('#modalStartDate').val(RowData.StartDate);
    $('#modalEndDate').val(RowData.EndDate);
    $('#modalTotalLeaves').val(RowData.TotalDays);
    $('#modalStatus').val(RowData.Status);
    var table = $('#tblAllEmpLeaveApp').DataTable();
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
            $('#modal-DeclineLeave').modal('hide');
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
    