class ActionMaster {
    actionMasterId;
    roleId;
    actionId;
    updatedStatusId;
    actionName;
}

class Actions {
    actionId;
    actionName;
}

class ApplicationStatus {
    statusId;
    statusName;
}

class CostCenters {
    costCenterId;
    costCenterName;
    orgId;
}


  class Departments {
    dptId;
    dptName;
    location;
    orgId;
}



class Employees {
    empId;
    firstName;
    lastName;
    emailAddress;
    birthDate;
    city;
    createdAt;
    updatedAt;
    userId;
    dptId;
    costCenterId;
    roleId;
    managerId;
    orgId;

    // Additional fields
    dptName;
    location;
    costCenterName;
    roleName;
    managerName;
    orgName;
}


class LeaveApplications {
    leaveId;
    leaveTypeId;
    leaveDateFrom;
    leaveDateTo;
    remark;
    statusId;
    applicationDate;
    updatedDate;
    totalLeaves;
    empId;

    // Additional fields
    firstName;
    lastName;
    statusName;
    leaveType;
}

class LeaveBalances {
    leaveBalanceId;
    empId;
    leaveTypeId;
    openingBalance;
    currentBalance;

    // Additional field
    leaveType;
}

class LeaveTypes {
    leaveTypeId;
    leaveType;
    createdAt;
    updatedAt;
    createdBy;
    updatedBy;
}

class LoginDto {
    UserName;
    Password;
}

class MenuAccessMaster {
    accessMasterId;
    roleId;
    menuId;
}

class Menus {
    menuId;
    menuName;
    url;
}

class Organisations {
    orgId;
    name;
}

class Process {
    processId;
    processName;
    createdAt;
    updatedAt;
    CreatedBy;
    UpdatedBy;
}

class ProcessMaster {
    processMasterId;
    applicationType;
    processId;
}

class ProcessStages {
    nextStageId;
    stageId;
    stageName;
    stageStatus;
    performedByRoleId;
    processId;
}

class PublicHolidays {
    holidayId;
    holidayDate;
    holidayInfo;
    orgId;
}

class UserRoles {
    roleId;
    roleName;
    createdAt;
    updatedAt;
    createdBy;
    updatedBy;

    // Additional fields
    createdByName;
    updatedByName;
}

class Users {
    userId;
    userName;
    password;
    isActive;
    createdAt;
    updatedAt;
    createdBy;
    updatedBy;

    // Additional field
    roleName;
}



// Export all classes
/*
//uncomment for testing
module.exports = {
    ActionMaster,
    Actions,
    ApplicationStatus,
    CostCenters,
    Departments,
    Employees,
    LeaveApplications,
    LeaveBalances,
    LeaveTypes,
    LoginDto,
    MenuAccessMaster,
    Menus,
    Organisations,
    Process,
    ProcessMaster,
    ProcessStages,
    PublicHolidays,
    UserRoles,
    Users
};

*/