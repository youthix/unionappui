app.controller('ContactListDashBoardController',['$scope','$location','$filter','services','constant','dataSharingService','$rootScope','$route', function ($scope,$location,$filter,services,constant,dataSharingService,$rootScope,$route) {
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
$scope.fotterTitle = constant.footer_title;
$scope.add_new_meeting = constant.addNewMeeting;
$scope.next_meeting = constant.Next_Meeting;
$scope.currentPage = 1;
$rootScope.comingFromDashboard=false;
 //$scope.activeMenu ="News Letter";

 $scope.activeMenu ="Contact List";

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
      $route.reload();
        $location.path('/ContactList');
    };

    $scope.AdminUserDasgBoard = function(){
        $location.path('/adminUser');
    };

 if ($rootScope.userName == undefined || $rootScope.userName == null) {
         $location.path('/login');
    }

    
    $scope.addNewContact = function(){
        $location.path('/newCategory');
    };

    $scope.detailContact = function(ContactData){
        dataSharingService.addEditData(ContactData);
         $location.path('/ContactListData');
    };
  

    $scope.editSummary = function(summaryData){
       dataSharingService.addEditData(summaryData);
      $location.path('/editSummary');
    };



      gettingData = function(){

      /*   var requestObject ={
                                    "bid": constant.bid,
                                    "pageno":$scope.currentPage,
                                    "categoryListObj": 
                                    {
                                        "categorydtoLs": 
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
                                };*/

                                var requestObject = {
                                    "bid":constant.bid,
                                    "criteria": {
                                      "criteria": "FALSE"
                                    }
                                  };

       services.getAllContacts(requestObject).then(function(data) {
                                                    
             console.log("Data is:" + JSON.stringify(data));
             var status = data.resStatus;
             if (status.code == "00" &&  status.msg =="SUCCESS") {
                              $scope.ContactListData = data.categoryListObj.categorydtoLs;
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
                 if(requestObject.summaryListObj.summarydtoLs[0].status=="online"){
                    services.sendNotification();
                  }                  
             }
                else
            {
                alert("Service :"+ status.msg);
            }
        });

                                };
                


        var date = summaryData.sumdate;


         var datearray = date.split("-");
        var newdate = datearray[1] + '-' + datearray[0] + '-' + datearray[2];
        var d1 = new Date(newdate);
        var d2 = new Date();
        d1.setHours(0,0,0,0);
        d2.setHours(0,0,0,0);
        updateMeetingStatus();
      /*  if ( (d1.getTime() == d2.getTime()) ||  (d1.getTime() > d2.getTime()) ) {
           updateMeetingStatus();
        } else{
                alert("Sorry,You can't Update Past Date for Summary!");
                return;
        }*/

             
    };





    $scope.deleteSummary = function (summaryData) {

     if (confirm($filter("i18n")('Are you sure you want to delete')+" "+summaryData.subject+"?")){

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

app.controller('newContactController',['$scope','$location','services','constant','dataSharingService','$rootScope','$route', function ($scope,$location,services,constant,dataSharingService,$rootScope,$route) {


 $scope.activeMenu ="Contact List";



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

$scope.addProfile = function(){
   $location.path('/miniContactProfile');
};

/*$scope.newProfile = function(){
   $location.path('/newContactProfile');
};*/
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



/*$scope.cancel = function(){
   $location.path('/summary'); 
};*/




   
}]);
app.controller('editContactController',['$scope','$location','services','constant','dataSharingService','$rootScope','$route', function ($scope,$location,services,constant,dataSharingService,$rootScope,$route) {
   



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


    
    $scope.activeMenu ="Contact List";

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


         var datearray = date.split("-");
        var newdate = datearray[1] + '-' + datearray[0] + '-' + datearray[2];
        var d1 = new Date(newdate);
        var d2 = new Date();
        d1.setHours(0,0,0,0);
        d2.setHours(0,0,0,0);
        updateNewsStatus();
       /* if ( (d1.getTime() == d2.getTime()) ||  (d1.getTime() > d2.getTime()) ) {
           //updateMeetingStatus();
           updateNewsStatus();
        } else{
                alert("Sorry,You can't Update Past Date for Summary!");
                return;
        }*/


    };

    $scope.cancel = function(){
   $location.path('/summary'); 
};


}]);

app.controller('miniContactController',['$scope','$location','$filter','services','constant','dataSharingService','$rootScope','$route', function ($scope,$location,$filter,services,constant,dataSharingService,$rootScope,$route) {
   

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
//**---------------------------------------------------------*/
var requestObjectcat = {
						"bid":constant.bid,
						"criteria": {
						  "criteria": "FALSE"
						}
					  };
	services.getAllContacts(requestObjectcat).then(function(data) {
			var status = data.resStatus;
			if (status.code == "00" &&  status.msg =="SUCCESS") {
				$scope.ContactListCategory = data.categoryListObj.categorydtoLs;
			}else{
				alert("Service :"+ status.msg);
			}
	});

//**---------------------------------------------------------*/



    /* $scope.defualtImage = true;
      $scope.realImage   = true;*/

      $scope.showButtonFile = false;

    
    $scope.activeMenu ="Contact List";

    $scope.profileData = dataSharingService.getEditData()[0];
    
    if(null != $scope.profileData.imageurl
    		&& undefined !=$scope.profileData.imageurl
    		   && ''!=$scope.profileData.imageurl){    	
    	$("#blah").show();
    	$('#blah').attr('src', $scope.profileData.imageurl);
    }
    else{
    	//$("#blah").attr("style", "visibility: hidden");
    	$("#blah").hide();
    }
/*
    function previewFile() {
  var preview = document.querySelector('img');
  var file    = document.querySelector('input[type=file]').files[0];
  var reader  = new FileReader();

  reader.addEventListener("load", function () {
    preview.src = reader.result;
  }, false);

  if (file) {
    reader.readAsDataURL(file);
  }
};

$scope.clckImage = function(){
  previewFile();
};*/
var uploadImageFlag=false;


$scope.validateExtension=function(oForm) {
	var _validFileExtensions = [".jpg", ".jpeg", ".png"];
    var sFileName = oForm.name;   
    if (sFileName.length > 0) {
      var blnValid = false;
      for (var j = 0; j < _validFileExtensions.length; j++) {
          var sCurExtension = _validFileExtensions[j];
          if (sFileName.substr(sFileName.length - sCurExtension.length, sCurExtension.length).toLowerCase() == sCurExtension.toLowerCase()) {
              blnValid = true;
              return blnValid;
         }
    }
  } 
};  

    $scope.$watch('file', function (newVal) {
        try {
          if (newVal != undefined && newVal != null){
            
        	  if(!$scope.validateExtension(newVal)){
              	alert($filter("i18n")("Invalid file extension! Only images with .png,.jpg,.jpeg extensions/formats are supported !"));
              	return false;
              }  
        	  
                $scope.image = newVal;
                
                $scope.imageName=newVal.name;

                  var reader = new FileReader();
                     reader.onload = function (e) {

                       console.log("File data is:" + e.target.result);
                       
                        $scope.realImage = true;
                         $scope.defualtImage = false;
                         //newVal=

                       $scope.$apply(function() {
                    	      $("#blah").show();
                    	      $scope.uploadImageFlag=true;                    	      
                              $('#blah').attr('src', e.target.result);
                       });
                };
                reader.readAsDataURL(newVal);
          }
      } catch(error){
           console.log("File Error is:" + error);
        }
 });

    if ($scope.profileData.image == undefined || $scope.profileData.image ==  null) {

         $scope.defualtImage = true;
          $scope.realImage = false;

    }else{

         $scope.realImage = true;
          $scope.defualtImage = false;
    }



    $scope.disabled = true;
    

    $scope.showButton = true;
    
   $scope.edit = function(){
     $scope.showButton = false;
     $scope.disabled = false;
     $scope.showButtonFile = true;
  };

if($route.current.params.approveUser){
    $scope.approveUser =true;
    $location.search({approveUser:null})
    $scope.edit();
}

$scope.contactcancel=function(cat){	
	var catData ={"catname":cat};
	dataSharingService.addEditData(catData);
	if($rootScope.comingFromDashboard==true || $scope.approveUser)
	{$location.path('/dashBoard');}
	else if(cat!=null && undefined !=cat && ''!=cat)
	$location.path('/ContactListData');
	else
	{$location.path('/dashBoard');}
}

$scope.saveProfilePic = function(data){

	   $scope.featureType = "profile";
	   $scope.documentName;
	   $scope.featureId = $scope.profileData.emId;

	        var fd = new FormData();
	        
	        fd.append("file",$scope.image);
	        $scope.eachDocName = $scope.imageName;
	        $scope.eachDocTitle = "profile-pic";
	        $scope.eachDocSelectedType = "image";
	        services.fileUpload($scope.eachDocTitle,$scope.featureType,$scope.featureId,$scope.eachDocName,fd,$scope.eachDocSelectedType).then(function(data1){           
	        console.log("Upload Data response:" + JSON.stringify(data1));
	        var status1 = data1.resStatus;
	       if (status1.code == "00" &&  status1.msg =="SUCCESS") {	         
	    	   console.log("Upload Image successful");
	    	   if($rootScope.comingFromDashboard==true)
				{
					$scope.fetchAdminDetails(data.userListObj.ul[0].emId);
					$location.path('/dashBoard');
				}
				else
               $location.path('/ContactList'); 
	        }
	      });
        };



$scope.save = function(){

             var requestObject = {
              "bid": "123",
              "userListObj": {"ul": [   {
                "usNa":  $scope.profileData.usNa,
                "pwd":  $scope.profileData.pwd,
                "fn":  $scope.profileData.fn,
                "ln":  $scope.profileData.ln,
                "joinDt": $scope.profileData.joinDt,
                "age":  $scope.profileData.age,
                "gen":  $scope.profileData.gen,
                "add":  $scope.profileData.add,
                "city":  $scope.profileData.city,
                "zipcode": $scope.profileData.zipcode,
                "conNu": $scope.profileData.conNu,
                "emId":  $scope.profileData.emId,
                "role": $scope.profileData.role,
                "category":$scope.profileData.category,
                "title":$scope.profileData.title,
                "status":"a"
   }]}
};
$scope.fetchAdminDetails=function(email){
	var requestObject = {
            "bid": "123",
            "criteria": {
              "criteria":  "TRUE",
              "fetchUserCriteriaObj": {
            	  "name":"emailid",
                  "value":"super@gmail.com"
              
    }
   }};
	services.getContactsFromCategory(requestObject).then( function(data){
		$rootScope.userName = data.userListObj.ul[0].fn+" "+data.userListObj.ul[0].fn;
        $rootScope.adminDetails=data.userListObj.ul[0];
        var img=data.userListObj.ul[0].imageurl;
        if(null != img && undefined != img && ""!=img)
            $rootScope.userImage=img;
            else
            $rootScope.userImage="images/default-user.jpg";	
    });  
}

var catData ={"catname":$scope.profileData.category};   

     services.updateProfile(requestObject).then( function(data){
                                                    
          console.log("Data is:" + JSON.stringify(data));
          var status = data.resStatus;
          if (status.code == "00" &&  status.msg =="SUCCESS") {
            $scope.dataFromCategory = data.userListObj.ul;                
    				dataSharingService.addEditData(catData);
            
    				 if($scope.uploadImageFlag==true){
    					  console.log("Uploading image");
    					  $scope.saveProfilePic(data);
    				 }
    				 else{
    					 if($rootScope.comingFromDashboard==true)
    						{
    							$scope.fetchAdminDetails(data.userListObj.ul[0].emId);
    							$location.path('/dashBoard');
    						}
    						else if($scope.approveUser){
                  $location.path('/dashBoard');
                }
                else{
    		          $location.path('/ContactList'); 
                }
    				 }
          				                
          }else{
            alert("Service Error:"+ status.msg);
          }
        });

};



}]); 

app.controller('ContactListDataController',['$scope','$location','services','constant','dataSharingService','$rootScope','$route', function ($scope,$location,services,constant,dataSharingService,$rootScope,$route) {
   

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

$scope.addNewContact = function(){
        $location.path('/newCategory');
    };

    
    $scope.activeMenu ="Contact List"; 

    $scope.ContactListDataFromDashBoard = dataSharingService.getEditData()[0];
    $rootScope.category = $scope.ContactListDataFromDashBoard.catname;
    
  //  angular.element('#jqte-test2').parent().parent().find(".jqte_editor").html( $scope.summary.detail );


   $scope.saveSummary = function(){

  

            var requestObject = {
                          "bid": constant.bid,
                          "criteria":    {
                            "criteria": "TRUE",
                            "fetchUserCriteriaObj": {
                              "name":"Category",
                              "value": $scope.ContactListDataFromDashBoard.catname
        }
   }
};
           
     
                                
            services.getContactsFromCategory(requestObject).then( function(data){
                                                    
                console.log("Data is:" + JSON.stringify(data));
                var status = data.resStatus;
                if (status.code == "00" &&  status.msg =="SUCCESS") {
                  $scope.dataFromCategory = data.userListObj.ul;
               // $location.path('/summary');            
             }else
            {
                alert("Service :"+ status.msg);
            }
        });


    };

     $scope.saveSummary();

  $scope.detailContactListData = function(detailData){
     dataSharingService.addEditData(detailData);
      $location.path('/miniContactProfile');
};
$scope.deleteContact = function (email,contactIndex,$event) {
  $ele = $($event.target);
  $parentEle = $($event.target).parent();
  $ele.tooltip("hide");
  $parentEle.tooltip("hide");
  var requestObject = {
    "bid": constant.bid,
    "userListObj": {"ul": [   {
      "usNa": email,
      "status": "delete"
    }]},
    "criteria":{
        "criteria": "TRUE",
        "updateUserCriteriaObj": {
          "name":"status"
        }
    }
  };
  services.updateStatus(requestObject).then(function(data) {
      var status = data.resStatus;
      if (status.code == "00" &&  status.msg =="SUCCESS") {
        $scope.dataFromCategory.splice(contactIndex,1);
      }else{
        alert("Service :"+ status.msg);
      }
  });
}


}]); 

app.controller('newCategoryController',['$scope','$location','services','constant','dataSharingService','$rootScope','$route', function ($scope,$location,services,constant,dataSharingService,$rootScope,$route) {
   

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


    
    $scope.activeMenu ="Contact List";

    $scope.ContactListDataFromDashBoard = dataSharingService.getEditData()[0];
    
  //  angular.element('#jqte-test2').parent().parent().find(".jqte_editor").html( $scope.summary.detail );


   $scope.saveCategory = function(){

  

            var requestObject ={
              "bid": constant.bid,
              "categoryListObj": {"categorydtoLs": [   {
                "catname": $scope.catname
              }]}
          }
           
     
                                
            services.newCategory(requestObject).then( function(data){
                                                    
                console.log("Data is:" + JSON.stringify(data));
                var status = data.resStatus;
                if (status.code == "00" &&  status.msg =="SUCCESS") {
                  //$scope.dataFromCategory = 
                $location.path('/ContactList');            
             }else
            {
                alert("Service :"+ status.msg);
            }
        });


    };

    // $scope.saveSummary();

    $scope.cancel = function(){
   $location.path('/summary'); 
};


}]); 