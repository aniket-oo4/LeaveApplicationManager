//Common Methods 
let Common = {


    initializeObject: function (targetObject, dataObject) {
        for (let key in dataObject) {
            if (dataObject.hasOwnProperty(key) && targetObject.hasOwnProperty(key)) {
                targetObject[key] = dataObject[key];
            }
        }
        return targetObject;
    },


/**
 * Common API caller method using jQuery
 * @param {string} url - The endpoint URL
 * @param {string} method - The HTTP method ('GET', 'POST', 'PUT', 'DELETE')
 * @param {Object} [payload] - The payload for POST and PUT requests
 * @param {string} [token] - Optional authorization token
 * @returns {Promise<Object>} - A promise that resolves to the response data
 */
apiCall:function (url, method = 'GET', payload = null, token = null) {
    return new Promise((resolve, reject) => {
        //Common options for AJAX request
        const options = {
            url: url,
            type: method,
            contentType: 'application/json',
            dataType: 'json',
            headers: {}
        };

        // Iif provided token for authorization  
        if (token) {
            options.headers['Authorization'] = `Bearer ${token}`;
        }

        //if  payload provided for POST and PUT requests
        if (payload) {
            options.data = JSON.stringify(payload);
        }

        //  AJAX request
        $.ajax(options)
            .done((data) => {
                resolve(data);
            })
            .fail((jqXHR, textStatus, errorThrown) => {
                // console.error('API call error:', textStatus, errorThrown);
                Common.destroySession();
                ToastHelper.showToast(" Session Was Expired ,please login again! ",'info','darkred','top-right',500);
                setTimeout(() => {
                    window.location.replace('../../../admin/login.html')
                }, 500);
                reject(new Error(`HTTP error! status: ${jqXHR.status}`),);
            });
    });
},
// Session Management 
 storeToken:function(token) {
    sessionStorage.setItem('authToken', token);
},
 getToken:function() {
    return sessionStorage.getItem('authToken');
},
storeUser:function(user){
    sessionStorage.setItem('user', JSON.stringify(user));
},
getStoredUser:function(){
    let storedUser = JSON.parse(sessionStorage.getItem('user'));
    return storedUser;
},
storeEmployee:function(employee){
    sessionStorage.setItem('employee', JSON.stringify(employee));
},
getStoredEmployee:function(){
    let storedUser = JSON.parse(sessionStorage.getItem('employee'));
    return storedUser;
},
destroySession:function(){
    sessionStorage.removeItem('authToken'); 
    sessionStorage.removeItem('user'); 
    sessionStorage.removeItem('employee'); 
},

//sesion management Closed 


 formatDateString:function(dateString) {
    // Create a new Date object from the input string
    let date = new Date(dateString);

    // Extract the day, month, and year
    let day = date.getDate();
    let month = date.toLocaleString('default', { month: 'short' }); // Short month name
    let year = date.getFullYear();

    // Return the formatted string
    return `${day} ${month}-${year}`;
},
 convertDateToISO :function(dateString)  // converts to YYYY/MM/DD
 {
    var parts = dateString.split('/');
    var day = parts[0];
    var month = parts[1];
    var year = parts[2];
    return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
 },
 calculateTotalDays:function(startDate, endDate) {
    var start = new Date(startDate);
    var end = new Date(endDate);
    var timeDiff = end - start;
    var dayDiff = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));
    return dayDiff+1;
},

getLeaveTypeId:function (typeName){
    if(typeName=="Earned Leave"){
        return 1;
    }
    else  if(typeName=="Casual Leave"){
        return 2;
    }
    else  if(typeName=="Sick Leave"){
        return 3;
    }   

}

}

let ToastHelper={

    showToast: function (message, iconType = 'info', bgColor = '#3498db', position = 'top-right', duration = 3000) {
        $.toast({
            text: message,
            showHideTransition: 'slide',  // Animation type: fade, slide, plain
            position: position,           // Position: top-right, bottom-left, etc.
            icon: iconType,               // Icon type: success, info, warning, error
            bgColor: bgColor,             // Custom background color
            loader: true,                 // Enable/disable loader
            loaderBg: '#fff',             // Loader background color
            hideAfter: duration ,          // Duration to hide the toast (in ms)
            class: 'custom-toast'
        });
    }

    
}






// uncomment it for testing 
// module.exports = {
//    Common   ,ToastHelper
// };



