
app.controller('mainController',['$scope','localize','$location', function ($scope,localize,$location) {
	//alert("login loginController");
   
   $scope.headerVisable = true;
   $scope.loading = false;
   
   $scope.AmrDashBoard = function () {
       $location.path('/amr');
    };
   
    localize.setLanguage("da-DK");
}]);
app.controller('restrictUserController',['$scope','$location','$modalInstance', function ($scope,$location,$modalInstance) {
  $scope.ok = function(){
    $modalInstance.close();
  }

}]);
app.controller('resetPasswordController',['$scope','$modalInstance','services','constant', function ($scope, $modalInstance,services,constant) {
  $scope.resetSuccessfull = false;
  $scope.resetFailed = false;
  $scope.showForm = true;
  $scope.resetPassword ={
      userName:"",
      oldPassword:"",
      newPassword:"",
      confirmPassword:""
    }
  var emptyPassword = /^$|\s+/;
  var emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
  $scope.ok = function () {
    if(!emailPattern.test($scope.resetPassword.userName) || $scope.resetPassword.userName === undefined){
      $scope.invalidUserName = true;
    }
    if(emptyPassword.test($scope.resetPassword.oldPassword) || $scope.resetPassword.oldPassword === undefined){
      $scope.invalidOldPassword = true;
    }
    if(emptyPassword.test($scope.resetPassword.newPassword)  || $scope.resetPassword.newPassword === undefined){
      $scope.invalidNewPassword = true;
    }
    if(emptyPassword.test($scope.resetPassword.confirmPassword)  || $scope.resetPassword.confirmPassword === undefined){
      $scope.invalidConfirmPassword = true;
    }
    else if($scope.resetPassword.newPassword !== $scope.resetPassword.confirmPassword){
      $scope.invalidConfirmPassword = false;
      $scope.passwordNotMatching = true;
    }
    if($scope.invalidUserName || $scope.invalidOldPassword || $scope.invalidNewPassword || $scope.invalidConfirmPassword || $scope.invalidConfirmPassword || $scope.passwordNotMatching){
      console.log("Form error")
    }
    else{
      var requestObject = {
        "bid": constant.bid,
        "userListObj": {
          "ul": [{
            "usNa": $scope.resetPassword.userName,
            "pwd": $scope.resetPassword.oldPassword,
            "newpwd": $scope.resetPassword.newPassword
          }]
        },
        "criteria":{
          "criteria": "TRUE",
          "updateUserCriteriaObj": {
            "name":"pwd"
          }
        }
      };
      services.updatePassword(requestObject).then(function(data){
        var status = data.resStatus;
        $scope.showForm = false;
        if (status.code == "00" &&  status.msg =="SUCCESS") {
          $scope.resetSuccessfull = true
        }
        else{
          console.log("reset failed")
          $scope.resetFailed = true
        }
      })
    }

    
  };

  $scope.cancel = function () {
    $modalInstance.dismiss('cancel');
  };
}]);

app.controller('loginController',['$scope','localize','$location','services','constant','$rootScope','$modal', function ($scope,localize,$location,services,constant,$rootScope,$modal) {
	//alert("login loginController");
    
    $scope.title = constant.title;

    $scope.email = constant.email_placeHolder;
    $scope.password = constant.password_placeHolder;
    $scope.forget_password = constant.forget_password;
    $scope.reset_password = constant.reset_password;
    $scope.login_button = constant.login_button;
    $scope.fotterTitle = constant.footer_title;

    // when click on logn button it will re direct to Dashboard.

    $scope.login = function (userData) {
         $scope.loading = true;
        
        var loginUserData = {
            "bid": constant.bid,
            "channel":"admin",
            "userListObj": {
                "ul": [
                    {
                        "pwd": userData.Password,
                        "usNa":userData.Username
                    }
                ]
            }
        };

        console.log("userData:" + JSON.stringify(userData));
        services.login(loginUserData).then(function(data) {
                                                    
             console.log("Data is:" + JSON.stringify(data));
             var status = data.resStatus;
             if (status.code == "00" &&  status.msg =="SUCCESS") {    
            	 var img=data.userListObj.ul[0].imageurl;
                   $rootScope.userName = data.userListObj.ul[0].fn+" "+data.userListObj.ul[0].ln;
                   $rootScope.adminDetails=data.userListObj.ul[0];
                   if(null != img && undefined != img && ""!=img)
                   $rootScope.userImage=data.userListObj.ul[0].imageurl;
                   else
                   $rootScope.userImage="images/default-user.jpg";
                  
                               $location.path('/dashBoard');  
                                $scope.loading = false;                      
                            }else{
                                alert("Service :"+ status.msg);
                            }
        });

    	
    };

    $scope.forgotPassword = function () {
       $location.path('/forgotPassword');
    };
    
    $scope.openResetPasswordModal = function () {
      
      var modalInstance = $modal.open({
        templateUrl: 'resetPassword.html',
        controller: 'resetPasswordController'
      });

      /*modalInstance.result.then(function (resetPasswordObj) {
        console.log("Password Reset s")  
      }, function () {
        console.log('Modal dismissed');
      });*/
    };

}]);

app.controller('dashBoardController',['$scope','$location','$rootScope','dataSharingService','constant','services','$modal', function ($scope,$location,$rootScope,dataSharingService,constant,services,$modal) {
      
	$scope.fotterTitle = constant.footer_title;
	$scope.dashboard =constant.dashboard;
	$scope.voting =constant.voting;
	$scope.meeting =constant.meeting;
	$scope.newsletter =constant.newsletter;
	$scope.activities =constant.activities;
	$scope.contactlist =constant.contactlist;
	$scope.suggestionidea =constant.suggestionidea;
	$scope.summary =constant.summary;
	$scope.agreements =constant.agreements;
	$scope.payrate =constant.payrate;
	$scope.adminuser =constant.adminuser;
	
      if ($rootScope.userName == undefined || $rootScope.userName == null) {
         $location.path('/login');
      }

    $scope.activeMenu ="Dashboard";

    $scope.MeetingDashboard = function(){
        
         $location.path('/MeetingDashboard'); //MeetingDashboardController
    };

    $scope.ActivitiesDashboard = function(){
     
         $location.path('/activitiesList');   // it will redirect to activities Page Activities
    };

    $scope.NewsLetterDashboard = function(){
        
         $location.path('/newsLetterList');
    };

    $scope.summaryDashBoard = function(){
        $location.path('/summary');
    };

    $scope.IdeaDashBoard = function(){
        $location.path('/ideas');
    };
    $scope.LAGDashBoard = function(){
        $location.path('/localAgreements');
    };

    $scope.PayRateDashBoard = function(){
        $location.path('/payRate');
    };

    $scope.ContactList = function(){
        $location.path('/ContactList');
    };

    $scope.AdminUserDasgBoard = function(){
        $location.path('/adminUser');
    };


    var moduleList = {
      "møde":'/MeetingDashboard',
      "aktivitet":'/activitiesList',
      "nyhedsbrev":'/newsLetterList',
      "referat":'/summary',
      "forslag og ideer":'/ideas',
      "aftaler":'/localAgreements',
      "lønsats":'/payRate',
      "amr":'/amr',
      "afstemning":"/voting",
    }

    $scope.goto = function(module){
      var module = module.toLowerCase();
      $location.path(moduleList[module]);
    }
    
    
    $rootScope.detailAdmin = function(){
        dataSharingService.addEditData($rootScope.adminDetails);
        $rootScope.comingFromDashboard=true;
        $location.path('/miniContactProfile');
	  };

    $scope.aprroveUser = function(userData){
       userData.status = "approved";
        dataSharingService.addEditData(userData);
        $location.path('/miniContactProfile').search({approveUser:true});
    };

    $scope.donotApproveUser = function(userData){
      var requestObject = {
       "bid": constant.bid,
       "channel":"admin",
       "userListObj": {"ul": [   {
        "usNa": userData.emId,
        "pwd": "xxx",
        "status": "notapproved"
      }]},
      "criteria":    {
        "criteria": "TRUE",
        "updateUserCriteriaObj": {
          "name":"status"
        }
      }
    }
     
        services.updateStatus(requestObject).then( function(data){
                                                      
            console.log("Data is:" + JSON.stringify(data));
            var status = data.resStatus;
            if (status.code == "00" &&  status.msg =="SUCCESS") {
              getAllPendingUsers();
              $scope.showWaitingUsers = true;
                                    
            }else{
              alert("Service Error:"+ status.msg);
            }
          });
    };
    
    function drawGraph(){
      services.getVisitorInfo({}).then(function(data){
        var status = data.resStatus;
        var visitorCountArray = []
        var visitorDateArray = []
        if (status.code == "00" &&  status.msg =="SUCCESS") {
          data.visitorInfoListObj.visitorinfodtoLs.forEach(function(visitor){
            visitorCountArray.push(visitor.count);
            visitorDateArray.push(visitor.date.toUpperCase())
          }) 
          drawVisitorInfoGraph(visitorDateArray,visitorCountArray);
        }
        else
        {
          alert("Service :"+ status.msg);
        }
      });

      services.getSpaceInfo({}).then(function(data){
        var status = data.resStatus;
        if (status.code == "00" &&  status.msg =="SUCCESS") {
          drawSpaceInfoGraph(data.spaceInfoDTOObj);
        }
        else
        {
          alert("Service :"+ status.msg);
        }
      });
    }
    drawGraph();
    drawSpaceInfoGraph = function(spaceInfo){
      $scope.spaceInfo = angular.extend({},spaceInfo);
      $scope.spaceInfo.usedSpacePercent = +((spaceInfo.usedspace/spaceInfo.totalspace)*100).toFixed(2)+"%";
      $scope.spaceInfo.unit = spaceInfo.unit.toUpperCase();
      $scope.remSpace = spaceInfo.remspace+spaceInfo
      var data = {
        datasets: [
        {
          data: [spaceInfo.usedspace, spaceInfo.remspace],
          backgroundColor: [
          "#7CDAC7",
          "#EEEEEE",
          ]
        }]
      };

      var usedSpace = new Chart(document.getElementById('usedSpace'), {
        type: 'doughnut',
        data: data,
        options: {
          cutoutPercentage: 80,
          responsive: true,
          legend: {
            display: false
          },
          tooltips:{
            mode:"disbaled"
          }
        }
      });
      if(spaceInfo.remspace === 0){
        
        var modalInstance = $modal.open({
          templateUrl: 'restrictUser.html',
          controller: 'restrictUserController'
        });
        modalInstance.result.then(function () {
          $location.path('/login'); 
        }, function () {
          $location.path('/login');
        });
      }
    }
    drawVisitorInfoGraph = function(vDateArr,vCountArr) {
      var barChartData = {
        labels: vDateArr,
        datasets: [{
          type:'line',
          data: vCountArr,
          fill: false,
          borderColor: '#4EAFD5',
          backgroundColor: '#4EAFD5',
          pointBorderColor: '#4EAFD5',
          pointHoverBackgroundColor: '#4EAFD5',
          pointHoverBorderColor: '#4EAFD5',
          yAxisID: 'y-axis-1',
          borderDash: [5,5],
          pointStyle: 'circle'
        },{
          type: 'bar',
          data: vCountArr,
          fill: false,
          backgroundColor: '#ABF2E2',
          borderColor: '#A1E7E1',
          yAxisID: 'y-axis-1'
        } ]
      };
      var ctx = document.getElementById("appUsers").getContext("2d");
      var showTextOnBars = function () {
        var chartInstance = this.chart;
        var ctx = chartInstance.ctx;
        var height = chartInstance.controller.boxes[0].bottom;
        ctx.textAlign = "center";
        ctx.font = "30px Arial";
        ctx.fillStyle="#DDF9F3";
        Chart.helpers.each(this.data.datasets.forEach(function (dataset, i) {
          var meta = chartInstance.controller.getDatasetMeta(i);
          Chart.helpers.each(meta.data.forEach(function (bar, index) {
            ctx.fillText(dataset.data[index], bar._model.x, ctx.canvas.height - 40 );
          }),this)
        }),this);
      }   
      var myBar = new Chart(ctx, {
        type: 'bar',
        data: barChartData,
        options: {
          animation: {
            onComplete: showTextOnBars,
            onProgress: showTextOnBars
          },
          legend: { display: false },
          responsive: true,
          tooltips: {
            mode: 'disbaled'
          },
          elements: {
            line: {
              fill: false
            }
          },
          scales: {
            xAxes: [{
              display: true,
              gridLines: {
                display: true
              },
              labels: {
                show: true,
              }
            }],
            yAxes: [{
              type: "linear",
              display: true,
              position: "left",
              id: "y-axis-1",
              gridLines:{
                display: true
              },
              labels: {
                show:true,
              },
              ticks: {
                suggestedMin: 0,
                beginAtZero: true
              }
            }]
          }
        }
      });
    }
    
    function getAllPendingUsers(){
      var requestObject = {
        "bid": constant.bid,
        "criteria":{
          "criteria": "FALSE"
        }
      }
      services.getAllUsers(requestObject).then(function(data){
        var status = data.resStatus;
        if (status.code == "00" &&  status.msg =="SUCCESS") {
          $scope.allPendingUsers = data.userListObj.ul.filter(function(user){
            return user.status === 'P';
          })  
          $scope.currUserIndex = 0;     
        }
        else
        {
          $scope.allPendingUsers = [];
          alert("Service :"+ status.msg);
        }
      });
    }
    $scope.allPendingUsers = [];
    getAllPendingUsers();
    $scope.currUserIndex = 0; 
    $scope.showWaitingUsers = false;
    $scope.showPendingUsers = function(){
      if($scope.allPendingUsers !== undefined && $scope.allPendingUsers.length > 0 ){
        $scope.showWaitingUsers = $scope.showWaitingUsers? false:true;
      }
      else{
        $scope.showWaitingUsers = false;
      }
    }
    $scope.nextUser = function(){
      $scope.currUserIndex+=1;
    }
    $scope.prevUser = function(){
      $scope.currUserIndex-=1;
    }
    function getAllActionLogs(){
      $scope.allActionLogs = [];
      var requestObject = {}
      services.fetchActionLogs(requestObject).then(function(data){
        var status = data.resStatus;
        if (status.code == "00" &&  status.msg =="SUCCESS") {
          $scope.allActionLogs = data.actionLogListObj.actionlogdtoLs
        }
        else
        {
          $scope.allActionLogs = [];
          alert("Service :"+ status.msg);
        }
      });
    }
    getAllActionLogs()

}]);


app.controller('MeetingDashboardController',['$scope','$location','$filter','services','constant','dataSharingService','$rootScope','$route', function ($scope,$location,$filter,services,constant,dataSharingService,$rootScope,$route) {
   //alert("MeetingDashboardController");

$scope.date = constant.Date;
$scope.time = constant.Time;
$scope.place = constant.Place;
$scope.comming = constant.Comming;
$scope.not_coming = constant.NotComming;
$scope.did_not_answer = constant.did_not_answer;
$scope.actions = constant.Actions;
$scope.edit = constant.Edit;
$scope.live = constant.Live;
$scope.offline = constant.Offline;
$scope.delete = constant.Delete;
$scope.fotterTitle = constant.footer_title;
$scope.add_new_meeting = constant.addNewMeeting;
$scope.next_meeting = constant.Next_Meeting;
$scope.currentPage = 1;
 $scope.activeMenu ="Meetings";

 if ($rootScope.userName == undefined || $rootScope.userName == null) {
         $location.path('/login');
      }

       $scope.MeetingDashboard = function(){
        // $scope.activeMenu ="Meetings";
        $route.reload();
         $location.path('/MeetingDashboard'); //MeetingDashboardController
    };

    $scope.ActivitiesDashboard = function(){
      // $scope.activeMenu ="Activities";
         $location.path('/activitiesList');   // it will redirect to activities Page Activities
    };

    $scope.NewsLetterDashboard = function(){
        //  $scope.activeMenu ="News Letter";
         $location.path('/newsLetterList');
    };

    $scope.summaryDashBoard = function(){
       //  $scope.activeMenu = "Summary";
        $location.path('/summary');
    };
     $scope.IdeaDashBoard = function(){
        $location.path('/ideas')
    };

      $scope.LAGDashBoard = function(){
        $location.path('/localAgreements');
    };

    $scope.PayRateDashBoard = function(){
        $location.path('/payRate');
    };

    $scope.ContactList = function(){
        $location.path('/ContactList');
    };

    $scope.AdminUserDasgBoard = function(){
        $location.path('/adminUser');
    };





      allMeeitngsRequest = function(){

         var fetchAllMeetingRequest ={
                                    "bid": constant.bid,
                                    "pageno":$scope.currentPage,
                                    "userListObj": 
                                    {
                                        "ul": 
                                            [   
                                                {
                                                    "usNa":$rootScope.userName
                                                }
                                            ]
                                    },
                                    "criteria":
                                        {
                                            "criteria": "FALSE"
                                        }
                                };

       services.allMeeitngsRequest(fetchAllMeetingRequest).then(function(data) {
                                                    
             console.log("Data is:" + JSON.stringify(data));
             var status = data.resStatus;
             if (status.code == "00" &&  status.msg =="SUCCESS") {
                              $scope.meetingsListData = data.meetingListObj.meetingdtoLs;
                              $scope.totalPagesCount = data.totalPage;
                              $scope.totalPages=[];
                              for(i =1; i<=$scope.totalPagesCount ; i ++){
                                    console.log(i);
                                  $scope.totalPages.push(i);
                                }

                            }else{
                                alert("Service :"+ status.msg);
                            }
        });
   };
    
    allMeeitngsRequest();


    $scope.newMeeting = function(){
         $location.path('/newMeeting');
    };

    $scope.editMeeting = function (editMeetingData) {

          try{
            dataSharingService.addEditData(editMeetingData);
          }catch(error){
            console.log("error is :" + error);
          };
         $location.path('/editMeeting');
    };

    $scope.pageNumber = function(pageno){

     $scope.currentPage = pageno;
     allMeeitngsRequest();
    }

    $scope.deleteMeeting = function (meetingData) {

     if (confirm($filter("i18n")('Are you sure you want to delete')+" "+meetingData.subject+"?")){


               // alert("Service need to intigreate.");
        console.log("deleteMeetingData:" + JSON.stringify(meetingData));


              var requestObject = {
                                    "bid": constant.bid,
                                    "meetingListObj": 
                                        {
                                            "meetingdtoLs": 
                                                [
                                                    {
                                                    "subject":meetingData.subject,
                                                    "detail": meetingData.detail,
                                                    "creator":$rootScope.userName,
                                                    "venue": meetingData.venue,
                                                    "status":"delete",
                                                    "meetingid":meetingData.meetingid
                                                        }
                                                ]
                                        }
                                };

     
                                
            services.updateMeeting(requestObject).then(function(data) {
                                                    
             console.log("Data is:" + JSON.stringify(data));
             var status = data.resStatus;
             if (status.code == "00" &&  status.msg =="SUCCESS") {
               // alert("SUCCESS");
                             //  $location.path('/MeetingDashboard'); 
                             allMeeitngsRequest();                       
                            }else{
                                alert("Service :"+ status.msg);
                            }
        });




    
} else {
     return;
}

       

    };


    



    $scope.statusUpdate = function(meetingStatus,meetingData){

updateMeetingStatus = function(){
          
        var status;

        if (meetingStatus == "offline") {
            status = "online";
        }else if(meetingStatus =="online"){
              status = "offline";
        }  

        var requestObject =
            {
                "bid": constant.bid,
                "meetingListObj": 
                {
                    "meetingdtoLs": 
                    [
                        {
                            "subject":meetingData.subject,
                            "detail": meetingData.detail,
                            "creator":$rootScope.userName,
                            "venue": meetingData.venue,
                            "meetdate":meetingData.meetdate,
                            "meettime":meetingData.meettime,
                            "status":status,
                            "meetingid":meetingData.meetingid
                        }
                    ]
                }
            };

     
                                
            services.updateMeeting(requestObject).then(function(data){
                                                    
                console.log("Data is:" + JSON.stringify(data));
                var status = data.resStatus;
                if (status.code == "00" &&  status.msg =="SUCCESS") {
                 if(requestObject.meetingListObj.meetingdtoLs[0].status=="online"){
                   services.sendNotification();
                  }
                 allMeeitngsRequest();                       
             }
                else
            {
                alert("Service :"+ status.msg);
            }
        });

                                };
                


        var date = meetingData.meetdate;


         var datearray = date.split("-");
        var newdate = datearray[1] + '-' + datearray[0] + '-' + datearray[2];
        var d1 = new Date(newdate);
        var d2 = new Date();
        d1.setHours(0,0,0,0);
        d2.setHours(0,0,0,0);
        if ( (d1.getTime() == d2.getTime()) ||  (d1.getTime() > d2.getTime()) ) {
           updateMeetingStatus();
        } else{
                alert($filter("i18n")("Sorry,You can't Create Past Date Meetings!"));
                return;
        }

             
    };


   
}]);

app.controller('newMeetingController',['$scope','$location','$filter','services','constant','$rootScope', function ($scope,$location,$filter,services,constant,$rootScope) {
  // alert("newMeetingController");
  
    $scope.date = constant.Date;
    $scope.time = constant.Time;
    $scope.place = constant.Place;
    //$scope.comming = constant.Comming;
    //$scope.not_coming = constant.NotComming;
    //$scope.did_not_answer = constant.did_not_answer;
    //$scope.actions = constant.Actions;
    $scope.edit = constant.Edit;
    $scope.live = constant.Live;
    $scope.offline = constant.Offline;
    $scope.fotterTitle = constant.footer_title;
    $scope.delete = constant.Delete;
    //$scope.add_new_button = constant.addNewButton;
    $scope.next_meeting = constant.Next_Meeting;
    $scope.subject = constant.Subject;
    $scope.details = constant.Details;
    $scope.activeMenu ="Meetings";


     $scope.MeetingDashboard = function(){
        // $scope.activeMenu ="Meetings";
         $location.path('/MeetingDashboard'); //MeetingDashboardController
    };

    $scope.ActivitiesDashboard = function(){
      // $scope.activeMenu ="Activities";
         $location.path('/activitiesList');   // it will redirect to activities Page Activities
    };

    $scope.NewsLetterDashboard = function(){
         // $scope.activeMenu ="News Letter";
         $location.path('/newsLetterList');
    };

    $scope.summaryDashBoard = function(){
         //$scope.activeMenu = "Summary";
        $location.path('/summary');
    };
     $scope.IdeaDashBoard = function(){
        $location.path('/ideas');
    };
      $scope.LAGDashBoard = function(){
        $location.path('/localAgreements');
    };

    $scope.PayRateDashBoard = function(){
        $location.path('/payRate');
    };

    $scope.ContactList = function(){
        $location.path('/ContactList');
    };

    $scope.AdminUserDasgBoard = function(){
        $location.path('/adminUser');
    };



   // $scope.todayData = new Date();
 if ($rootScope.userName == undefined || $rootScope.userName == null) {
         $location.path('/login');
      }

    $scope.saveMeeting = function(meeting){

      console.log( angular.element('#timepickerId').val() );

   $scope.timeIs = angular.element('#timepickerId').val();

    saveMeetingCall = function(){


         var requestObject = {
                                "bid": constant.bid,
                                "meetingListObj": 
                                    {
                                        "meetingdtoLs": 
                                            [
                                                {
                                                    "subject": meeting.subject,
                                                    "detail": meeting.detail,
                                                    "venue": meeting.venue,
                                                    "meetdate": meeting.meetdate,
                                                    "meettime": $scope.timeIs,
                                                    "creator": $rootScope.userName,
                                                    "status": "offline"
                                                }
                                            ]
                                    }
                                };

                                console.log("meeting requestObject is:" + JSON.stringify(requestObject));

            services.newMeetingCreate(requestObject).then(function(data) {
                                                    
             console.log("Data is:" + JSON.stringify(data));
             var status = data.resStatus;
             if (status.code == "00" &&  status.msg =="SUCCESS") {
               // alert("SUCCESS");
                               $location.path('/MeetingDashboard');                        
                            }else{
                                alert("Service :"+ status.msg);
                            }
        });


    };

      var date = meeting.meetdate;

      //d1.getTime() > d2.getTime()

        var datearray = date.split("-");
        var newdate = datearray[1] + '-' + datearray[0] + '-' + datearray[2];
        var d1 = new Date(newdate);
        d1.setHours(0,0,0,0);

        var d2 = new Date();
        d2.setHours(0,0,0,0);
       
        if ( (d1.getTime() == d2.getTime()) ||  (d1.getTime() > d2.getTime()) ) {
           saveMeetingCall();
        } else{
                alert($filter("i18n")("Sorry,You can't Create Past Date Meetings!"));
                return;
        }
         
    };

    $scope.cancelMeeting = function(){
       $location.path('/MeetingDashboard');
    };

   
}]);

app.controller('forgotPasswordController',['$scope','$location','services','constant', function ($scope,$location,services,constant) {

 
    $scope.submit = function(user){
            var requestObject = {
                                    "bid": constant.bid,
                                    "userListObj": 
                                        {
                                            "ul":
                                                 [   
                                                    {
                                                        "usNa": user.email
                                                    }
                                                ]
                                        }
                                };

                                console.log("meeting requestObject is:" + JSON.stringify(requestObject));

            services.forgotPassword(requestObject).then(function(data) {
                                                    
             console.log("Data is:" + JSON.stringify(data));
             var status = data.resStatus;
             if (status.code == "00" &&  status.msg =="SUCCESS") {
               // alert("SUCCESS");
                               $location.path('/login');                        
                            }else{
                                alert("Service :"+ status.msg);
                            }
        });

    };

   
}]); 

app.controller('editMeetingController',['$scope','$location','$filter','services','constant','$rootScope','dataSharingService', function ($scope,$location,$filter,services,constant,$rootScope,dataSharingService) {
  // alert("newMeetingController");
  $scope.fotterTitle = constant.footer_title;
   if ($rootScope.userName == undefined || $rootScope.userName == null) {
         $location.path('/login');
      }

  $scope.activeMenu ="Meetings";

   $scope.MeetingDashboard = function(){
       
         $location.path('/MeetingDashboard'); //MeetingDashboardController
    };

    $scope.ActivitiesDashboard = function(){
     
         $location.path('/activitiesList');   // it will redirect to activities Page Activities
    };

    $scope.NewsLetterDashboard = function(){
        
         $location.path('/newsLetterList');
    };

    $scope.summaryDashBoard = function(){
       
        $location.path('/summary');
    };

     $scope.IdeaDashBoard = function(){
        $location.path('/ideas');
    };

      $scope.LAGDashBoard = function(){
        $location.path('/localAgreements');
    };

    $scope.PayRateDashBoard = function(){
        $location.path('/payRate');
    };

    $scope.ContactList = function(){
        $location.path('/ContactList');
    };

    $scope.AdminUserDasgBoard = function(){
        $location.path('/adminUser');
    };


  
    $scope.date = constant.Date;
    $scope.time = constant.Time;
    $scope.place = constant.Place;
    //$scope.comming = constant.Comming;
    //$scope.not_coming = constant.NotComming;
    //$scope.did_not_answer = constant.did_not_answer;
    //$scope.actions = constant.Actions;
    $scope.edit = constant.Edit;
    $scope.live = constant.Live;
    $scope.offline = constant.Offline;
    $scope.delete = constant.Delete;
    //$scope.add_new_button = constant.addNewButton;
    $scope.next_meeting = constant.Next_Meeting;
    $scope.subject = constant.Subject;
    $scope.details = constant.Details;


    $scope.meeting = dataSharingService.getEditData()[0];
    $scope.meeting_id = $scope.meeting.meetingid;
    $scope.meeting_status = $scope.meeting.status;

    $scope.saveMeeting = function(meeting){


     


        editDataSaveCall = function(){
            var requestObject = {
                                    "bid": constant.bid,
                                    "meetingListObj": 
                                        {
                                            "meetingdtoLs": 
                                                [
                                                    {
                                                    "subject":meeting.subject,
                                                    "detail": meeting.detail,
                                                    "meetdate":meeting.meetdate,
                                                    "meettime":meeting.meettime,
                                                    "creator":$rootScope.userName,
                                                    "venue": meeting.venue,
                                                    "status": $scope.meeting_status,
                                                    "meetingid":$scope.meeting_id
                                                        }
                                                ]
                                        }
                                };


                                console.log("meeting requestObject is:" + JSON.stringify(requestObject));

            services.updateMeeting(requestObject).then(function(data) {
                                                    
             console.log("Data is:" + JSON.stringify(data));
             var status = data.resStatus;
             if (status.code == "00" &&  status.msg =="SUCCESS") {
               // alert("SUCCESS");
                               $location.path('/MeetingDashboard');                        
                            }else{
                                alert("Service :"+ status.msg);
                            }
        });



        };

           var date = meeting.meetdate;

        var datearray = date.split("-");
        var newdate = datearray[1] + '-' + datearray[0] + '-' + datearray[2];
        var d1 = new Date(newdate);
        var d2 = new Date();
        d1.setHours(0,0,0,0);
        d2.setHours(0,0,0,0);
        if ( (d1.getTime() == d2.getTime()) ||  (d1.getTime() > d2.getTime()) ) {
           editDataSaveCall();
        } else{
                alert($filter("i18n")("Sorry,You can't Update Past Date for")+" "+$filter("i18n")("Meetings"));
                return;
        }
    };

    $scope.cancelMeeting = function(){
           $location.path('/MeetingDashboard'); 
    };

   
}]);
app.controller('newActivitieController',['$scope','$location','$filter','services','constant','$rootScope','dataSharingService', function ($scope,$location,$filter,services,constant,$rootScope,dataSharingService) {
  // alert("newMeetingController");
	$scope.fotterTitle = constant.footer_title;
   if ($rootScope.userName == undefined || $rootScope.userName == null) {
         $location.path('/login');
      }


    $scope.date = constant.Date;
    $scope.time = constant.Time;
    $scope.place = constant.Place;
    
    //$scope.comming = constant.Comming;
    //$scope.not_coming = constant.NotComming;
    //$scope.did_not_answer = constant.did_not_answer;
    //$scope.actions = constant.Actions;
    $scope.edit = constant.Edit;
    $scope.live = constant.Live;
    $scope.offline = constant.Offline;
    $scope.delete = constant.Delete;
    //$scope.add_new_button = constant.addNewButton;
    $scope.next_meeting = constant.Next_Meeting;
    $scope.subject = constant.Subject;
    $scope.details = constant.Details;
    $scope.new_activity = constant.newActivity;
    $scope.save_activity = constant.saveActivity;

     $scope.activeMenu ="Activities";


        $scope.MeetingDashboard = function(){
       
         $location.path('/MeetingDashboard'); //MeetingDashboardController
    };

    $scope.ActivitiesDashboard = function(){
     
         $location.path('/activitiesList');   // it will redirect to activities Page Activities
    };

    $scope.NewsLetterDashboard = function(){
        
         $location.path('/newsLetterList');
    };

    $scope.summaryDashBoard = function(){
       
        $location.path('/summary');
    };


  $scope.IdeaDashBoard = function(){
        $location.path('/ideas');
    };
   
     $scope.LAGDashBoard = function(){
        $location.path('/localAgreements');
    };

    $scope.PayRateDashBoard = function(){
        $location.path('/payRate');
    };

    $scope.ContactList = function(){
        $location.path('/ContactList');
    };

    $scope.AdminUserDasgBoard = function(){
        $location.path('/adminUser');
    };


    $scope.change = function(contents) {
    console.log('contents are changed:', contents, $scope.editable);
  };


    //$scope.meeting = dataSharingService.getEditData()[0];

    $scope.saveActivitie = function(activitie){
    
  // alert( $scope.text);

      saveActivitieCall = function(){

              console.log( angular.element('#timepickerId1').val() );

             $scope.timeIs = angular.element('#timepickerId1').val();


            


             var requestObject = {
                                "bid": "123",
                                "activityListObj": {"activitydtoLs": [   {
                                "subject": activitie.subject,
                                "detail": activitie.detail,
                                "venue": activitie.venue,
                                "actdate": activitie.meetdate,
                                "acttime":  $scope.timeIs,
                                "creator": $rootScope.userName,
                                "status": "offline"
                                 }]}
                             };

             console.log("activitie requestObject is:" + JSON.stringify(requestObject));

            services.newActivitieCreate(requestObject).then(function(data) {
                                                    
             console.log("Data is:" + JSON.stringify(data));
             var status = data.resStatus;
             if (status.code == "00" &&  status.msg =="SUCCESS") {
               // alert("SUCCESS");
                               $location.path('/activitiesList');                      
                            }else{
                                alert("Service :"+ status.msg);
                            }
        });
          };


              var date = activitie.meetdate;

         var datearray = date.split("-");
        var newdate = datearray[1] + '-' + datearray[0] + '-' + datearray[2];
        var d1 = new Date(newdate);
        var d2 = new Date();
        d1.setHours(0,0,0,0);
        d2.setHours(0,0,0,0);
        if ( (d1.getTime() == d2.getTime()) ||  (d1.getTime() > d2.getTime()) ) {
           saveActivitieCall();
        } else{
                alert($filter("i18n")("Sorry,You can't Update Past Date for")+" "+$filter("i18n")("Activities"));
                return;
        }
       
    };

    $scope.cancel = function(){
       $location.path('/activitiesList');
    };

   
}]);
app.controller('activitiesDashboardController',['$scope','$location','$filter','services','constant','$rootScope','dataSharingService','$route', function ($scope,$location,$filter,services,constant,$rootScope,dataSharingService,$route) {
  // alert("newMeetingController");
  $scope.date = constant.Date;
  
  $scope.fotterTitle = constant.footer_title;
$scope.time = constant.Time;
$scope.place = constant.Place;
$scope.comming = constant.Comming;
$scope.not_coming = constant.NotComming;
$scope.did_not_answer = constant.did_not_answer;
$scope.actions = constant.Actions;
$scope.edit = constant.Edit;
$scope.live = constant.Live;
$scope.offline = constant.Offline;
$scope.delete = constant.Delete;
$scope.add_new_activity = constant.addNewActivity;
$scope.new_activity = constant.newActivity;
 if ($rootScope.userName == undefined || $rootScope.userName == null) {
         $location.path('/login');
      }

 $scope.activeMenu ="Activities";
 
    $scope.MeetingDashboard = function(){
       
         $location.path('/MeetingDashboard'); //MeetingDashboardController
    };

    $scope.ActivitiesDashboard = function(){
     $route.reload();
         $location.path('/activitiesList');   // it will redirect to activities Page Activities
    };

    $scope.NewsLetterDashboard = function(){
        
         $location.path('/newsLetterList');
    };

    $scope.summaryDashBoard = function(){
       
        $location.path('/summary');
    };
 $scope.IdeaDashBoard = function(){
        $location.path('/ideas');
    };
  $scope.LAGDashBoard = function(){
        $location.path('/localAgreements');
    };

    $scope.PayRateDashBoard = function(){
        $location.path('/payRate');
    };

    $scope.ContactList = function(){
        $location.path('/ContactList');
    };

    $scope.AdminUserDasgBoard = function(){
        $location.path('/adminUser');
    };

   // getting all meeting service request:

   allActivitiesCall = function(){

      if ($scope.pageNumberIs == null || $scope.pageNumberIs == undefined) {
        $scope.pageNumberIs = 1;
      }else{
        $scope.pageNumberIs = $scope.pageNumberIs;
      }

   var fetchAllActivitiesRequest ={
                                    "bid": constant.bid,
                                    "pageno":$scope.pageNumberIs,
                                    "userListObj": {"ul": [   {
                                    "usNa":$rootScope.userName
                                  }]},
                                  "criteria":    {
                                  "criteria": "FALSE"
                                  }
                              };


       services.allActivities(fetchAllActivitiesRequest).then(function(data) {
                                                    
             console.log("Data is:" + JSON.stringify(data));
             var status = data.resStatus;
             if (status.code == "00" &&  status.msg =="SUCCESS") {
               // alert("SUCCESS");
                              
                              $scope.allActivitiesListData = data.activityListObj.activitydtoLs;
                              $scope.totalPagesCount = data.totalPage;
                              $scope.totalPages=[];
                              for(i =1; i<=$scope.totalPagesCount ; i ++){
                                    console.log(i);
                                  $scope.totalPages.push(i);
                                }

                            }else{
                                alert("Service :"+ status.msg);
                            }
        });
     };
     
      allActivitiesCall();


    $scope.newActivitie = function(){
         $location.path('/newActivitie');
    };

    $scope.pageNumber = function(pageno){
      $scope.pageNumberIs = pageno;
      allActivitiesCall();
    };

    $scope.editActivitie = function (editActivitieData) {

          try{
            dataSharingService.addEditData(editActivitieData);
          }catch(error){
            console.log("error is :" + error);
          };
         $location.path('/editActivitie');
    };

    $scope.deleteActivitie = function (deleteActivitieData) {
       // alert("Service need to intigreate.");
        console.log("deleteActivitieData:" + JSON.stringify(deleteActivitieData));

        if (confirm($filter("i18n")('Are you sure you want to delete')+" "+deleteActivitieData.subject+"?")){


              var requestObject = {
                                    "bid": constant.bid,
                                    "activityListObj": 
                                        {
                                            "activitydtoLs": 
                                                [
                                                    {
                                                    "subject":deleteActivitieData.subject,
                                                    "detail": deleteActivitieData.detail,
                                                    "creator":$rootScope.userName,
                                                    "venue": deleteActivitieData.venue,
                                                    "status":"Delete",
                                                    "activityid":deleteActivitieData.activityid
                                                        }
                                                ]
                                        }
                                };

     
                                
            services.updateActivitie(requestObject).then(function(data) {
                                                    
             console.log("Data is:" + JSON.stringify(data));
             var status = data.resStatus;
             if (status.code == "00" &&  status.msg =="SUCCESS") {
               // alert("SUCCESS");
                             //  $location.path('/MeetingDashboard'); 
                             allActivitiesCall();                      
                            }else{
                                alert("Service :"+ status.msg);
                            }
        });

          }else{
            return;
          }
    };


    $scope.statusUpdate = function(activityStatus,activityData){

              updateActivityStatus = function(){
          
                  var status;

        if (activityStatus == "offline") {
            status = "online";
        }else if(activityStatus =="online"){
              status = "offline";
        }  




var requestObject   = {
   "bid":constant.bid,
   "activityListObj": {"activitydtoLs": [   {
    "subject":activityData.subject,
    "detail": activityData.detail,
    "creator":$rootScope.userName,
    "venue": activityData.venue,
    "status":status,
    "actdate":activityData.actdate,
    "acttime":activityData.acttime,
    "activityid":activityData.activityid
   }]}
};

                                
            services.updateActivitie(requestObject).then(function(data){
                                                    
                console.log("Data is:" + JSON.stringify(data));
                var status = data.resStatus;
                if (status.code == "00" &&  status.msg =="SUCCESS") {
                 if(requestObject.activityListObj.activitydtoLs[0].status=="online"){
                    services.sendNotification();
                  }
                 allActivitiesCall();                       
             }
                else
            {
                alert("Service :"+ status.msg);
            }
        });

                                };
                


        var date = activityData.actdate;
         var datearray = date.split("-");
        var newdate = datearray[1] + '-' + datearray[0] + '-' + datearray[2];
        var d1 = new Date(newdate);
        var d2 = new Date();
        d1.setHours(0,0,0,0);
        d2.setHours(0,0,0,0);
        if ( (d1.getTime() == d2.getTime()) ||  (d1.getTime() > d2.getTime()) ) {
           updateActivityStatus();
        } else{
                alert($filter("i18n")("Sorry,You can't Update Past Date for")+" "+$filter("i18n")("Activities"));
                return;
        }

             
    };


   
}]);
app.controller('editActivitieController',['$scope','$location','$filter','services','constant','$rootScope','dataSharingService', function ($scope,$location,$filter,services,constant,$rootScope,dataSharingService) {
  // alert("newMeetingController");
  
    $scope.date = constant.Date;
    $scope.time = constant.Time;
    $scope.place = constant.Place;
    $scope.fotterTitle = constant.footer_title;
    //$scope.comming = constant.Comming;
    //$scope.not_coming = constant.NotComming;
    //$scope.did_not_answer = constant.did_not_answer;
    //$scope.actions = constant.Actions;
    $scope.edit = constant.Edit;
    $scope.live = constant.Live;
    $scope.offline = constant.Offline;
    $scope.delete = constant.Delete;
    //$scope.add_new_button = constant.addNewButton;
    $scope.next_meeting = constant.Next_Meeting;
    $scope.subject = constant.Subject;
    $scope.details = constant.Details;
    $scope.edit_activitiy = constant.editActivity;
    $scope.save_activity = constant.saveActivity;
     if ($rootScope.userName == undefined || $rootScope.userName == null) {
         $location.path('/login');
      }

    $scope.activeMenu ="Activities";

       $scope.MeetingDashboard = function(){
       
         $location.path('/MeetingDashboard'); //MeetingDashboardController
    };

    $scope.ActivitiesDashboard = function(){
     
         $location.path('/activitiesList');   // it will redirect to activities Page Activities
    };

    $scope.NewsLetterDashboard = function(){
        
         $location.path('/newsLetterList');
    };

    $scope.summaryDashBoard = function(){
       
        $location.path('/summary');
    };

     $scope.IdeaDashBoard = function(){
        $location.path('/ideas');
    };

  $scope.LAGDashBoard = function(){
        $location.path('/localAgreements');
    };

    $scope.PayRateDashBoard = function(){
        $location.path('/payRate');
    };

    $scope.ContactList = function(){
        $location.path('/ContactList');
    };

    $scope.AdminUserDasgBoard = function(){
        $location.path('/adminUser');
    };



    $scope.activitie = dataSharingService.getEditData()[0];

    $scope.saveActivitie = function(activitie){


      updateActivitieCall = function(){
            var requestObject = {
                                    "bid": constant.bid,
                                    "activityListObj": 
                                        {
                                            "activitydtoLs": 
                                                [
                                                    {
                                                    "subject":activitie.subject,
                                                    "detail": activitie.detail,
                                                    "creator":$rootScope.userName,
                                                    "actdate":activitie.actdate,
                                                    "acttime":activitie.acttime,
                                                    "venue": activitie.venue,
                                                    "status":activitie.status,
                                                    "activityid":activitie.activityid
                                                        }
                                                ]
                                        }
                                };

                                   services.updateActivitie(requestObject).then(function(data) {
                                                    
             console.log("Data is:" + JSON.stringify(data));
             var status = data.resStatus;
             if (status.code == "00" &&  status.msg =="SUCCESS") {
               // alert("SUCCESS");
                               $location.path('/activitiesList'); 
                                                
                            }else{
                                alert("Service :"+ status.msg);
                            }
        });

      };

          var date = activitie.actdate;
         var datearray = date.split("-");
        var newdate = datearray[1] + '-' + datearray[0] + '-' + datearray[2];
        var d1 = new Date(newdate);
        var d2 = new Date();
        d1.setHours(0,0,0,0);
        d2.setHours(0,0,0,0);
        if ( (d1.getTime() == d2.getTime()) ||  (d1.getTime() > d2.getTime()) ) {
           updateActivitieCall();
        } else{
                alert($filter("i18n")("Sorry,You can't Update Past Date for")+" "+$filter("i18n")("Activities"));
                return;
        }
    };


    $scope.cancel = function(){
      $location.path('/activitiesList'); 
    };

   
}]);