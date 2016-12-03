
app.controller('ModalInstanceCtrl',['$scope','$modalInstance','item', function ($scope, $modalInstance, item) {

  $scope.item = item;
  $scope.ok = function () {
    $modalInstance.close($scope.item);
  };

  $scope.cancel = function () {
    $modalInstance.dismiss('cancel');
  };
}]);
app.controller('adminUserDashBoardController',['$scope','$location','$modal','services','constant','dataSharingService','$rootScope','$route', function ($scope,$location,$modal,services,constant,dataSharingService,$rootScope,$route) {
  //  alert("newsLetterController");
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
  $scope.add_new_meeting = constant.addNewMeeting;
  $scope.next_meeting = constant.Next_Meeting;
  $scope.currentPage = 1;
  //$scope.activeMenu ="News Letter";

  $scope.activeMenu ="Admin User";

  if ($rootScope.userName == undefined || $rootScope.userName == null) {
    $location.path('/login');
  }
  $scope.open = function (user) {
    var modalInstance = $modal.open({
      templateUrl: 'myModalContent.html',
      controller: 'ModalInstanceCtrl',
      resolve: {
        item: function () {
          return angular.copy(user);
        }
      }
    });

    modalInstance.result.then(function (userData) {
      userData.role = userData.role === 'A' ? 'N' : 'A';
      var requestObject = {
        "bid": "123",
        "userListObj": {
          "ul":[
            userData
          ]
        }
      } 
      services.updateProfile(requestObject).then(function(data){
        var status = data.resStatus;
        if (status.code == "00" &&  status.msg =="SUCCESS") {
          var index = $scope.allAdminUsers.map(function(e) { return e.emId; }).indexOf(userData.emId);
          $scope.allAdminUsers[index] = userData;
        }
        else{
           alert("Service :"+ status.msg);
        }
      })
    }, function () {
      console.log('Modal dismissed');
    });
  };

  function getAllUsers(){
    var requestObject = {
        "bid": constant.bid,
        "criteria":{
          "criteria": "FALSE"
        }
    }
    services.getContactsFromCategory(requestObject).then(function(data){
      var status = data.resStatus;
      if (status.code == "00" &&  status.msg =="SUCCESS") {
        $scope.allAdminUsers = data.userListObj.ul               
      }
      else
      {
        alert("Service :"+ status.msg);
      }
    });
  }
  getAllUsers();

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
  $route.reload();
  $location.path('/adminUser');
};

if ($rootScope.userName == undefined || $rootScope.userName == null) {
  $location.path('/login');
}


$scope.createNewAgreement = function(){
  $location.path('/newAgreement');
};

$scope.editSummary = function(summaryData){
  dataSharingService.addEditData(summaryData);
  $location.path('/editSummary');
};




gettingData = function(){

  var requestObject ={
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

  services.getAllSummary(requestObject).then(function(data) {

    console.log("Data is:" + JSON.stringify(data));
    var status = data.resStatus;
    if (status.code == "00" &&  status.msg =="SUCCESS") {
      $scope.summaryData = data.summaryListObj.summarydtoLs;
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

gettingData();

  
$scope.propertyName = 'fn';
  $scope.reverse = true;
 $scope.sortBy = function(propertyName) {
    $scope.reverse = ($scope.propertyName === propertyName) ? !$scope.reverse : false;
    $scope.propertyName = propertyName;
  };

$scope.pageNumber = function(pageno){

  $scope.currentPage = pageno;
  gettingData();

};


$scope.statusUpdate = function(summaryStatus,summaryData){

  updateMeetingStatus = function(){

    var status;

    if (summaryStatus == "offline") {
      status = "online";
    }else if(summaryStatus =="online"){
      status = "offline";
    }  

    var requestObject =
    {
      "bid": constant.bid,
      "summaryListObj": 
      {
        "summarydtoLs": 
        [
        {
          "subject":summaryData.subject,
          "detail": summaryData.detail,
          "sumdate":summaryData.sumdate,
          "sumtime":"00:00:00",
          "creator":$rootScope.userName,
          "status":status,
          "sumid":summaryData.sumid
        }
        ]
      }
    };



    services.updateSummary(requestObject).then(function(data){

      console.log("Data is:" + JSON.stringify(data));
      var status = data.resStatus;
      if (status.code == "00" &&  status.msg =="SUCCESS") {
        gettingData();                 
      }
      else
      {
        alert("Service :"+ status.msg);
      }
    });

  };



  var date = summaryData.sumdate;


  var datearray = date.split("/");
  var newdate = datearray[1] + '/' + datearray[0] + '/' + datearray[2];
  var d1 = new Date(newdate);
  var d2 = new Date();
  d1.setHours(0,0,0,0);
  d2.setHours(0,0,0,0);
  if ( (d1.getTime() == d2.getTime()) ||  (d1.getTime() > d2.getTime()) ) {
    updateMeetingStatus();
  } else{
    alert("Sorry,You can't Update Past Date for Summary!");
    return;
  }


};





$scope.deleteSummary = function (summaryData) {

  if (confirm('Are you sure you want to delete Summary?')) {


    // alert("Service need to intigreate.");
    console.log("deleteMeetingData:" + JSON.stringify(summaryData));


    var requestObject = {
      "bid": constant.bid,
      "summaryListObj": 
      {
        "summarydtoLs": 
        [
        {
          "subject":summaryData.subject,
          "detail": summaryData.detail,
          "creator":$rootScope.userName,
          "sumdate":summaryData.sumdate,
          "sumtime":"00:00:00",
          "status":"delete",
          "sumid":summaryData.sumid
        }
        ]
      }
    };



      services.deleteSummary(requestObject).then(function(data) {

     console.log("Data is:" + JSON.stringify(data));
     var status = data.resStatus;
     if (status.code == "00" &&  status.msg =="SUCCESS") {
     // alert("SUCCESS");
                   //  $location.path('/MeetingDashboard'); 
                   //allMeeitngsRequest();
                   gettingData();                       
                 }else{
                  alert("Service :"+ status.msg);
                }
              }); 





  } else {
    return;
  }



};





}]);

app.controller('newadminUserController',['$scope','$location','services','constant','dataSharingService','$rootScope','$route', function ($scope,$location,services,constant,dataSharingService,$rootScope,$route) {


 $scope.activeMenu ="Admin User";



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

 if ($rootScope.userName == undefined || $rootScope.userName == null) {
         $location.path('/login');
    }



$scope.save = function(summary){

  $scope.detail = angular.element('#jqte-test3').val();

  var requestObject = {
   "bid": "constant.bid",
   "summaryListObj": {"summarydtoLs": [   {
      "subject": summary.subject,
      "detail":  $scope.detail,
      "sumdate": summary.meetdate,
      "sumtime": "00:00:00",
      "creator": "$rootScope.userName",
      "status": "offline"
   }]}
};

    services.createNewsSummary(requestObject).then(function(data){
                                                    
                console.log("Data is:" + JSON.stringify(data));
                var status = data.resStatus;
                if (status.code == "00" &&  status.msg =="SUCCESS") {
                 //allMeeitngsRequest();  
                 $location.path('/summary');                     
             }
                else
            {
                alert("Service :"+ status.msg);
            }
        });


};

$scope.cancel = function(){
   $location.path('/summary'); 
};




   
}]);
app.controller('editadminUserController',['$scope','$location','services','constant','dataSharingService','$rootScope','$route', function ($scope,$location,services,constant,dataSharingService,$rootScope,$route) {
   

     $scope.activeMenu="Admin User";


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


    
    //$scope.activeMenu ="Summary";

    $scope.summary = dataSharingService.getEditData()[0];
    
    angular.element('#jqte-test2').parent().parent().find(".jqte_editor").html( $scope.summary.detail );


   $scope.saveSummary = function(summaryData){

    updateNewsStatus = function(){

        $scope.detail = angular.element('#jqte-test2').val();
        

        var requestObject =
            {
                "bid": constant.bid,
                "summaryListObj": 
                {
                    "summarydtoLs": 
                    [
                        {
                            "subject":summaryData.subject,
                            "detail": $scope.detail ,
                            "sumdate":summaryData.sumdate,
                            "sumtime":"00:00:00",
                            "creator":$rootScope.userName,
                            "status":summaryData.status,
                            "sumid":summaryData.sumid
                        }
                    ]
                }
            };
           
     
                                
            services.updateSummary(requestObject).then(function(data){
                                                    
                console.log("Data is:" + JSON.stringify(data));
                var status = data.resStatus;
                if (status.code == "00" &&  status.msg =="SUCCESS") {
                $location.path('/summary');            
             }
                else
            {
                alert("Service :"+ status.msg);
            }
        });

                                };
                


        var date = summaryData.sumdate;


         var datearray = date.split("/");
        var newdate = datearray[1] + '/' + datearray[0] + '/' + datearray[2];
        var d1 = new Date(newdate);
        var d2 = new Date();
        d1.setHours(0,0,0,0);
        d2.setHours(0,0,0,0);
        if ( (d1.getTime() == d2.getTime()) ||  (d1.getTime() > d2.getTime()) ) {
           //updateMeetingStatus();
           updateNewsStatus();
        } else{
                alert("Sorry,You can't Update Past Date for Summary!");
                return;
        }


    };

    $scope.cancel = function(){
   $location.path('/summary'); 
};


}]);