app.controller('amrController',['$scope','$location','$filter','services','constant','dataSharingService','$rootScope','$route','$http', function ($scope,$location,$filter,services,constant,dataSharingService,$rootScope,$route,$http) {
 //  alert("newsLetterController");



$scope.currentPage = 1;
$scope.activeMenu ="AMR";
$scope.date = constant.Date;
$scope.actions = constant.Actions;
$scope.edit = constant.Edit;
$scope.live = constant.Live;
$scope.offline = constant.Offline;
$scope.delete = constant.Delete;
$scope.fotterTitle = constant.footer_title;


 if ($rootScope.userName == undefined || $rootScope.userName == null) {
         $location.path('/login');
    }
   $scope.MeetingDashboard = function(){
       
         $location.path('/MeetingDashboard'); //MeetingDashboardController
    };

    $scope.ActivitiesDashboard = function(){
     
         $location.path('/activitiesList');   // it will redirect to activities Page Activities
    };

    $scope.NewsLetterDashboard = function(){
        $route.reload();
         $location.path('/newsLetterList');
    };

    $scope.summaryDashBoard = function(){
       
        $location.path('/summary');
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
    $scope.IdeaDashBoard = function(){
        $location.path('/ideas')
    };

var serviceUrl = "http://ec2-35-154-221-255.ap-south-1.compute.amazonaws.com:8080/UnionApp-Services/service";


      amrListCall = function(){

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
		
		var request={
				  method:'POST',
				  data:requestObject,
				  headers:{'Content-Type':'application/json;charset=UTF-8'},
				  url:serviceUrl+'fetchamr'
			}
       $http(request).then(function(data) {
               var data = JSON.parse(JSON.stringify(data.data));                           
             console.log("Data is:" + JSON.stringify(data.resStatus));
			
             var status = data.resStatus;
             if (status.code == "00" &&  status.msg =="SUCCESS") {
				  $scope.amrList = data.amrListObj.amrdtoLs;
				  
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
    
  //  allMeeitngsRequest();
  amrListCall();


    $scope.createAmr = function(){
         $location.path('/createAmr');
    };

    $scope.editAmr = function (editAmrData) {

          try{
            dataSharingService.addEditData(editAmrData);
          }catch(error){
            console.log("error is :" + error);
          };
         $location.path('/editAmr');
    };

    $scope.pageNumber = function(pageno){

     $scope.currentPage = pageno;
      amrListCall();

    }

    $scope.deleteAmr = function (amrData) {

  if (confirm($filter("i18n")('Are you sure you want to delete')+" "+amrData.subject+"?")){
  console.log("delete amr Data:" + JSON.stringify(amrData));
	var requestObject =
				{
					"bid": constant.bid,
					"amrListObj": 
					{
						"amrdtoLs": 
						[
							{
								"subject":amrData.subject,
								
								"detail": amrData.detail,
								"creator":$rootScope.userName,
								"status":"delete",
								"amrid":amrData.amrid
							}
						]
					}
				};
									
    var serviceUrl = "http://185.134.30.228:8080/UnionApps/rest/service";
	var updaterequest={
			  method:'POST',
			  data:requestObject,
			  headers:{'Content-Type':'application/json;charset=UTF-8'},
			  url:serviceUrl+'updateamr'
			}
                                
            $http(updaterequest).then(function(data){
                 var data = JSON.parse(JSON.stringify(data.data));                                   
                console.log("Data is:" + JSON.stringify(data));
                var status = data.resStatus;
                if (status.code == "00" &&  status.msg =="SUCCESS") {
                      amrListCall();
             	}else{
                alert("Service :"+ status.msg);
            }
        });
    
	} else {
		 return;
	}
};


    



    $scope.statusUpdate = function(amrStatus,amrData){
       

      var requestObject =
            {
                "bid": constant.bid,
                "amrListObj": 
                {
                    "amrdtoLs": 
                    [
                        {
                            "subject":amrData.subject,
                            "amrdate":amrData.amrdate,
                             "amrtime":"12:12:12",
                            "detail": amrData.detail,
                            "creator":$rootScope.userName,
                            "status":amrStatus,
                            "amrid":amrData.amrid
                        }
                    ]
                }
            };
                                
    var serviceUrl = "http://185.134.30.228:8080/UnionApps/rest/service";
	var updaterequest={
			  method:'POST',
			  data:requestObject,
			  headers:{'Content-Type':'application/json;charset=UTF-8'},
			  url:serviceUrl+'updateamr'
			}

     
                                
            $http(updaterequest).then(function(data){
                 var data = JSON.parse(JSON.stringify(data.data));                                   
                console.log("Data is:" + JSON.stringify(data));
                var status = data.resStatus;
                if (status.code == "00" &&  status.msg =="SUCCESS") {
                  if(requestObject.amrListObj.amrdtoLs[0].status=="online"){
                   services.sendNotification();
                  }
                      amrListCall();
             	}else{
                alert("Service :"+ status.msg);
            }
        });

                               
                

/*
        var date = newsData.nldate;


         var datearray = date.split("/");
        var newdate = datearray[1] + '/' + datearray[0] + '/' + datearray[2];
        var d1 = new Date(newdate);
        var d2 = new Date();
        d1.setHours(0,0,0,0);
        d2.setHours(0,0,0,0);
        if ( (d1.getTime() == d2.getTime()) ||  (d1.getTime() > d2.getTime()) ) {
           //updateMeetingStatus();
           updateAmrStatus();
        } else{
                alert("Sorry,You can't Update Past Date for Meetings!");
                return;
        }

             */
    };


   
}]);
app.controller('createAmrController',['$scope','$location','services','constant','dataSharingService','$rootScope','$route','$http', function ($scope,$location,services,constant,dataSharingService,$rootScope,$route,$http) {

	$scope.fotterTitle = constant.footer_title;
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
    $scope.IdeaDashBoard = function(){
        $location.path('/ideas')
    };
   //var attachmentObject ={};




 if ($rootScope.userName == undefined || $rootScope.userName == null) {
         $location.path('/login');
    }
	

//alert("createNewsLetterController");
$scope.date = constant.Date;

$scope.saveAmr = function(newAmr){


    $scope.detail = angular.element('#jqte-test').val();

    var requestObject = {
   "bid":constant.bid,
   "amrListObj": {"amrdtoLs": [   {
      "subject": newAmr.subject,
      "detail": $scope.detail,
      "amrdate":newAmr.meetdate,
      "amrtime":"12:00:00",
      "creator":$rootScope.userName,
      "status": "offline"
   }]}
};
var serviceUrl = "http://185.134.30.228:8080/UnionApps/rest/service";
var request={
		  method:'POST',
		  data:requestObject,
		  headers:{'Content-Type':'application/json;charset=UTF-8'},
		  url:serviceUrl+'createamr'
		}

 $scope.featureId ;

     $http(request).then(function(data){
        
		var data = JSON.parse(JSON.stringify(data.data));                                          
		console.log("Data is:" + JSON.stringify(data));
		var status = data.resStatus;
		if (status.code == "00" &&  status.msg =="SUCCESS") {
			$location.path('/amr');  
		}else{
			alert("Service :"+ status.msg);
		}
    });
		



};

 $scope.cancel = function(){
   $location.path('/amr'); 
 }; 
   
}]);
app.controller('amrEditController',['$scope','$location','services','constant','dataSharingService','$rootScope','$route','$http', function ($scope,$location,services,constant,dataSharingService,$rootScope,$route,$http) {
	$scope.fotterTitle = constant.footer_title;
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
    $scope.IdeaDashBoard = function(){
        $location.path('/ideas')
    };



 if ($rootScope.userName == undefined || $rootScope.userName == null) {
         $location.path('/login');
    }
   
    $scope.amr = dataSharingService.getEditData()[0];
//alert(dataSharingService);


  $scope.cancel = function(){
   $location.path('/amr'); 
 };
 

   angular.element('#jqte-test1').parent().parent().find(".jqte_editor").html( $scope.amr.detail );
   $scope.featureId ;
   $scope.saveAmr = function(amr){

   

        $scope.detail = angular.element('#jqte-test1').val();
          
        var requestObject =
            {
                "bid": constant.bid,
                "amrListObj": 
                {
                    "amrdtoLs": 
                    [
                        {
                            "subject":amr.subject,
                            "amrdate":amr.amrdate,
                            "amrtime":"00:00:00",
                            "detail": $scope.detail,
                            "creator":$rootScope.userName,
                            "status":amr.status,
                            "amrid":amr.amrid
                        }
                    ]
                }
            };
var serviceUrl = "http://185.134.30.228:8080/UnionApps/rest/service";
var request={
		  method:'POST',
		  data:requestObject,
		  headers:{'Content-Type':'application/json;charset=UTF-8'},
		  url:serviceUrl+'updateamr'
		}

     
                                
            $http(request).then(function(data){
                 var data = JSON.parse(JSON.stringify(data.data));                                   
                console.log("Data is:" + JSON.stringify(data));
                var status = data.resStatus;
                if (status.code == "00" &&  status.msg =="SUCCESS") {
                      $location.path('/amr'); 
             	}else{
                alert("Service :"+ status.msg);
            }
        });

     
                

/*
        var date = amr.amrdate;


         var datearray = date.split("-");
        var newdate = datearray[1] + '-' + datearray[0] + '-' + datearray[2];
        var d1 = new Date(newdate);
        var d2 = new Date();
        d1.setHours(0,0,0,0);
        d2.setHours(0,0,0,0);
        if ( (d1.getTime() == d2.getTime()) ||  (d1.getTime() > d2.getTime()) ) {
           //updateMeetingStatus();
          // updateAmrStatus();
        } else{
			alert("Sorry,You can't Update Past Date for News!");
			return;
        }*/


    };

     

}]);
