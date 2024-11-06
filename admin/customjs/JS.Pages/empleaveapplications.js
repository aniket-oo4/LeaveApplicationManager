$(document).ready(function ()
{
 MapEmpLeaveApplications(Common.getStoredEmployee().empId);
 MapLeaveTypes();
});
var leaveApplications;
async function MapEmpLeaveApplications(empId){

    let applicationsTableBody=$('#tblEmpLeaveApp tbody')[0];
     applicationsTableBody.innerHTML=``;
    result=await LeaveApplicationManager.GetAllLeaveApplicationsByEmp(empId);
  leaveApplications=result.Data;

    $('#tblEmpLeaveApp').DataTable({
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
                        <button id="btnViewModal" style="margin:1px;" type="button" class="btn btn-primary btn-xs btn-view" data-id="${row.leaveId} " data-toggle="modal" data-target="#modal-ViewLeave" >
                            <i class="fas fa-eye"></i>
                        </button>`;

                    const UpdateButton = `
                        <button  id="btnUpdateModal" style="margin:1px;" type="button" class="btn btn-success btn-xs btn-approve" data-id="${row.leaveId} " data-toggle="modal" data-target="#modal-UpdateLeave" >
                            <i class="fas fa-edit"></i>
                        </button>`;

                    const CancelButton = `
                        <button  id="btnCancelModal" style="margin:1px;" type="button"  class="btn btn-warning btn-xs btn-decline" data-id="${row.leaveId}" data-toggle="modal" data-target="#modal-CancelLeave" >
                            <i class="fas fa-times"></i>
                        </button>`;

                    // Conditionally include the approve and decline buttons
                    const actionButtons = row.statusName === 'pending'
                    ? `<div class="btn-group">${viewButton}${UpdateButton}${CancelButton}</div>`
                    : `<div class="btn-group">${viewButton}</div>`;
                    return actionButtons;
                }
            },
            { 
                data: 'remark' ,
                className: 'text-center',
                visible: false
            },
        ],
        data: leaveApplications,
        scrollX: true,
        scrollY: 250 ,
        // dom: 'Bfrtip', // Adds the buttons container
        // buttons: [
        //     {
        //         extend: 'excel',
        //         text: 'Export to Excel'
        //     },
        //     {
        //         extend: 'pdf',
        //         text: 'Export to PDF'
        //     },
        //     {
        //         extend: 'json',
        //         text: 'Export to JSON',
        //         action: function (e, dt, button, config) {
        //             const data = dt.buttons.exportData(); // Get data
        //             const json = JSON.stringify(data);
        //             const blob = new Blob([json], { type: 'application/json' });
        //             const url = URL.createObjectURL(blob);

        //             const a = document.createElement('a');
        //             a.href = url;
        //             a.download = 'data.json';
        //             a.click();
        //             URL.revokeObjectURL(url);
        //         }
        //     }
        // ]
    });
 }
 async function  MapLeaveTypes() {
    let apiResult=await LeaveApplicationManager.GetAllLeaveTypes();
    if(apiResult.ErrorList.length>0 && apiResult.IsSuccess==true){
        ToastHelper.showToast('some errors occurred :'+apiResult.ErrorList[0],'warning','red','bottom-right',1000);
    }
    else{
        Array.from(apiResult.Data).forEach(type => { 
            let option = $('<option></option>')
            .val(`${type.leaveTypeId}`)
            .text(`${type.leaveType}`);
            let optionForupdate=option;
            $('#ddlleaveType').append(option);
            // $('#updateLeaveType').append(optio);
        });
        Array.from(apiResult.Data).forEach(type => { 
            let option = $('<option></option>')
            .val(`${type.leaveTypeId}`)
            .text(`${type.leaveType}`);
             $('#updateLeaveType').append(option);
        });
        
      
    }    
 }

 function clearModalFields() {
    $('#ddlleaveType').val('');  
    $('#startDate').val('');     
    $('#endDate').val('');       
    $('#remark').val('');    
    $('#updateddlLeaveType').val('');  
    $('#updateStartDate').val('');     
    $('#updateEndDate').val('');       
    $('#updateRemark').val('');    
  }

 function getRowData(row){
   
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

// Events
//-------------------------------------------------------------


//Apply Leave 

    function validateForminputs(){
        isValid=true;
            if ($('#ddlleaveType').val() === "") {
                isValid = false;
                alert("Please select a leave type.");
              }
              if ($('#startDate').val() === "") {
                isValid = false;
                alert("Please select a start date.");
              }
              if ($('#endDate').val() === "") {
                isValid = false;
                alert("Please select an end date.");
              }
              if ($('#remark').val().trim() === "") {
                isValid = false;
                alert("Please enter a remark.");
              }
                return isValid;
    }

    async function ApplyLeave(empId) {
        if(validateForminputs()){
            let leaveApplication =new LeaveApplications();
            leaveApplication.empId=empId;
            leaveApplication.leaveTypeId=$('#ddlleaveType').val();
            leaveApplication.leaveDateFrom=$('#startDate').val();
            leaveApplication.leaveDateTo=$('#endDate').val();
            leaveApplication.remark=$('#remark').val();
            console.log(leaveApplication);
            let apiResult=await LeaveApplicationManager.AddLeaveApplication(leaveApplication);
            // console.log(apiResult);
            leaveApplication=null;
    
            if(apiResult.IsSuccess){
                clearModalFields();
                $('#modal-ApplyLeave').modal('hide');
                ToastHelper.showToast("Leave Applied SuccessFully ", 'success', 'green');
            }
            else{
                let msg = "";
                Array.from(apiResult.ErrorList).forEach(error => {
                            msg += "<br/> ‣" + error;
                        });
                        ToastHelper.showToast(msg, 'error', 'red')
            }
    
    
        }
      
    }

    $('#btn-applyLeave').on('click',()=>{
    ApplyLeave(Common.getStoredEmployee().empId);
    });

    //clear after Add close
    $('#modal-ApplyLeave').on('hidden.bs.modal', function () {
    clearModalFields();
    });

//-------------------------------------------------------------

//view
    $(document).on('click', '#btnViewModal', function() {
    // Get the leave ID from the data-id attribute
    const leaveId = $(this).data('id').trim();
    // Find the row based on the leave ID
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
    var table = $('#tblEmpLeaveApp').DataTable();
    var rowData = table.row($(this).closest('tr')).data();
    const remark = rowData.remark;
    $('#modalRemark').val(remark);
    });
// /---------------------------------------------------------

//update
    $(document).on('click', '#btnUpdateModal',async function() {   
    const leaveId = $(this).data('id').trim();
    // Find the row based on the leave ID
    const row = $(this).closest('tr');
    const RowData=getRowData(row);
    $('#updateLeaveId').val(RowData.leaveID);
    $('#updateApplicationDate').val(RowData.ApplicationDate);
    $('#updateEmpName').val(RowData.name);
    $('#updateEmpId').val(RowData.employeeID);
    $('#updateLeaveType').val(Common.getLeaveTypeId(RowData.LeaveType));
    $('#updateStartDate').val(Common.convertDateToISO(RowData.StartDate));
    $('#updateEndDate').val(Common.convertDateToISO(RowData.EndDate));
    $('#updateTotalLeaves').val(RowData.TotalDays);
    $('#updateStatus').val(RowData.Status);
    var table = $('#tblEmpLeaveApp').DataTable();
    var rowData = table.row($(this).closest('tr')).data();
    const remark = rowData.remark;
    $('#updateRemark').val(rowData.remark);

    });
    
    function validateUpdateForminputs(){
        isValid=true;
        if ($('#updateLeaveType').val() === "") {
            isValid = false;
            alert("Please select a leave type.");
          }
          if ($('#updateStartDate').val() === "") {
            isValid = false;
            alert("Please select a start date.");
          }
          if ($('#updateEndDate').val() === "") {
            isValid = false;
            alert("Please select an end date.");
          }
          if ($('#updateRemark').val().trim() === "") {
            isValid = false;
            alert("Please enter a remark.");
          }
            return isValid;
    }
    function setTotalDays(){
        $("#updateTotalLeaves").val( Common.calculateTotalDays(   $('#updateStartDate').val(),$('#updateEndDate').val()));
    }
    $('#updateStartDate').on('change', function() {
        setTotalDays();
    });
    $('#updateEndDate').on('change', function() {
        setTotalDays();
    });//above events are for Dynamic calculation for total days 

    async function UpdateLeave(empId) {
        if(validateUpdateForminputs()){
            let leaveApplication =new LeaveApplications();
            leaveApplication.empId=empId;
            leaveApplication.leaveId=$('#updateLeaveId').val();
            leaveApplication.leaveTypeId=$('#updateLeaveType').val();
            leaveApplication.leaveDateFrom=$('#updateStartDate').val();
            leaveApplication.leaveDateTo=$('#updateEndDate').val();
            leaveApplication.remark=$('#updateRemark').val();
            console.log(leaveApplication);
            let apiResult=await LeaveApplicationManager.UpdateLeaveApplication( leaveApplication.leaveId,leaveApplication);
            leaveApplication=null;
    
            if(apiResult.IsSuccess){
                clearModalFields();
                $('#modal-UpdateLeave').modal('hide');
                ToastHelper.showToast("Application Updated  SuccessFully ", 'success', 'green');
            }
            else{
                let msg = "";
                Array.from(apiResult.ErrorList).forEach(error => {
                            msg += "<br/> ‣" + error;
                        });
                        ToastHelper.showToast(msg, 'error', 'red')
            }
        }
      
    }

    $('#btn-UpdateLeave').on('click',()=>{
        UpdateLeave(Common.getStoredEmployee().empId);
        });

   //clear after update modal close
    $('#modal-UpdateLeave').on('hidden.bs.modal', function () {
    clearModalFields();
    });

//--------------------------------------------------

// Cancell LeaveApplication 
$(document).on('click', '#btnCancelModal',async function() {
     const row = $(this).closest('tr');
     const leaveId =row.find('td:eq(0)').text();
    $('#modalCancelLeaveId').val(leaveId);
    });

 async function  CancelLeave(){
    let leaveId=$("#modalCancelLeaveId").val();
    let apiResult=await LeaveApplicationManager.UpdateLeaveApplicationStatus(leaveId,2);
    leaveApplication=null;

    if(apiResult.IsSuccess){
        $('#modal-CancelLeave').modal('hide');
        ToastHelper.showToast("Application Cancelled  SuccessFully ", 'success', 'green');
    }
    else{
        let msg = "";
        Array.from(apiResult.ErrorList).forEach(error => {
                    msg += "<br/> ‣" + error;
                });
                ToastHelper.showToast(msg, 'error', 'red')
    }
}   
$('#btn-CancelLeave').on('click',()=>{
    CancelLeave();    
});









