

app.service('services', function ($http, $q) {
	var serviceUrl = "http://codeplay-dev6.cloud.cms500.com/unionapp/rest/service/";
	//var testUrl = "http://localhost/pradeep/event/";
	//http://localhost/UnionApp/rest/service/createmeeting
	this.login = function (loginData) {
		var deferred = $q.defer();
		$http.post(serviceUrl+"login", loginData,{'Content-Type': 'application/json;charset=UTF-8'})
		.success(function(data) {
			deferred.resolve(data);
		})
		.error(function(){
			deferred.reject();
		});

		return deferred.promise;
    }; 

    	this.newMeetingCreate = function (newMeetingData) {
		var deferred = $q.defer();
		$http.post(	serviceUrl +"createmeeting", newMeetingData,{'Content-Type': 'application/json;charset=UTF-8'})
		.success(function(data) {
			deferred.resolve(data);
		})
		.error(function(){
			deferred.reject();
		});

		return deferred.promise;
    };

     	this.allMeeitngsRequest = function (allMeeitngsRequestData) {
		var deferred = $q.defer();
		$http.post(	serviceUrl +"fetchmeeting", allMeeitngsRequestData,{'Content-Type': 'application/json;charset=UTF-8'})
		.success(function(data) {
			deferred.resolve(data);
		})
		.error(function(){
			deferred.reject();
		});

		return deferred.promise;
    };

    	this.forgotPassword = function (forgotPasswordData) {
		var deferred = $q.defer();
		$http.post(	serviceUrl +"resetpwd",forgotPasswordData,{'Content-Type': 'application/json;charset=UTF-8'})
		.success(function(data) {
			deferred.resolve(data);
		})
		.error(function(){
			deferred.reject();
		});

		return deferred.promise;
    }; 

    this.updateMeeting = function (updateMeetingData) {
		var deferred = $q.defer();
		$http.post(	serviceUrl +"updatemeeting",updateMeetingData,{'Content-Type': 'application/json;charset=UTF-8'})
		.success(function(data) {
			deferred.resolve(data);
		})
		.error(function(){
			deferred.reject();
		});

		return deferred.promise;
    }; 

    	this.newActivitieCreate = function (newActivitieData) {
		var deferred = $q.defer();
		$http.post(	serviceUrl +"createactivity", newActivitieData,{'Content-Type': 'application/json;charset=UTF-8'})
		.success(function(data) {
			deferred.resolve(data);
		})
		.error(function(){
			deferred.reject();
		});

		return deferred.promise;
    };

    this.allActivities = function (activitieListData) {
		var deferred = $q.defer();
		$http.post(	serviceUrl +"fetchactivity", activitieListData,{'Content-Type': 'application/json;charset=UTF-8'})
		.success(function(data) {
			deferred.resolve(data);
		})
		.error(function(){
			deferred.reject();
		});

		return deferred.promise;
    };

      this.updateActivitie = function (updateActiviteData) {
		var deferred = $q.defer();
		$http.post(	serviceUrl +"updateactivity", updateActiviteData,{'Content-Type': 'application/json;charset=UTF-8'})
		.success(function(data) {
			deferred.resolve(data);
		})
		.error(function(){
			deferred.reject();
		});

		return deferred.promise;
    };

       this.createNewsLetters = function (createnewsData) {
		var deferred = $q.defer();
		$http.post(	serviceUrl +"createnewsletter", createnewsData,{'Content-Type': 'application/json;charset=UTF-8'})
		.success(function(data) {
			deferred.resolve(data);
		})
		.error(function(){
			deferred.reject();
		});

		return deferred.promise;
    };

        this.allnewsRequest = function (allnewsData) {
		var deferred = $q.defer();
		$http.post(	serviceUrl +"fetchnewsletter", allnewsData,{'Content-Type': 'application/json;charset=UTF-8'})
		.success(function(data) {
			deferred.resolve(data);
		})
		.error(function(){
			deferred.reject();
		});

		return deferred.promise;
    }; 

     this.updateNewsLetter = function (newsData) {
		var deferred = $q.defer();
		$http.post(	serviceUrl +"updatenewsletter", newsData,{'Content-Type': 'application/json;charset=UTF-8'})
		.success(function(data) {
			deferred.resolve(data);
		})
		.error(function(){
			deferred.reject();
		});

		return deferred.promise;
    }; 

     this.createNewsSummary = function (summaryData) {
		var deferred = $q.defer();
		$http.post(	serviceUrl +"createsummary", summaryData,{'Content-Type': 'application/json;charset=UTF-8'})
		.success(function(data) {
			deferred.resolve(data);
		})
		.error(function(){
			deferred.reject();
		});

		return deferred.promise;
    }; 
     this.updateSummary = function (summaryData) {
		var deferred = $q.defer();
		$http.post(	serviceUrl +"updatesummary", summaryData,{'Content-Type': 'application/json;charset=UTF-8'})
		.success(function(data) {
			deferred.resolve(data);
		})
		.error(function(){
			deferred.reject();
		});

		return deferred.promise;
    }; 
     this.deleteSummary = function (summaryData) {
		var deferred = $q.defer();
		$http.post(	serviceUrl +"updatesummary", summaryData,{'Content-Type': 'application/json;charset=UTF-8'})
		.success(function(data) {
			deferred.resolve(data);
		})
		.error(function(){
			deferred.reject();
		});

		return deferred.promise;
    }; 

        this.getAllSummary = function (getData) {
		var deferred = $q.defer();
		$http.post(	serviceUrl +"fetchsummary", getData,{'Content-Type': 'application/json;charset=UTF-8'})
		.success(function(data) {
			deferred.resolve(data);
		})
		.error(function(){
			deferred.reject();
		});

		return deferred.promise;
    }; 

        this.getAllIdeas = function (getData) {
		var deferred = $q.defer();
		$http.post(	serviceUrl +"fetchsuggestionidea", getData,{'Content-Type': 'application/json;charset=UTF-8'})
		.success(function(data) {
			deferred.resolve(data);
		})
		.error(function(){
			deferred.reject();
		});

		return deferred.promise;
    }; 

        this.updateIdea = function (getData) {
		var deferred = $q.defer();
		$http.post(	serviceUrl +"updatesuggestionidea", getData,{'Content-Type': 'application/json;charset=UTF-8'})
		.success(function(data) {
			deferred.resolve(data);
		})
		.error(function(){
			deferred.reject();
		});

		return deferred.promise;
    }; 

        this.deleteIdea = function (getData) {
		var deferred = $q.defer();
		$http.post(	serviceUrl +"updatesuggestionidea", getData,{'Content-Type': 'application/json;charset=UTF-8'})
		.success(function(data) {
			deferred.resolve(data);
		})
		.error(function(){
			deferred.reject();
		});

		return deferred.promise;
    }; 

        this.createNewsIdea = function (getData) {
		var deferred = $q.defer();
		$http.post(	serviceUrl +"createsuggestionidea", getData,{'Content-Type': 'application/json;charset=UTF-8'})
		.success(function(data) {
			deferred.resolve(data);
		})
		.error(function(){
			deferred.reject();
		});

		return deferred.promise;
    }; 

        this.createNewAgreement = function (getData) {
		var deferred = $q.defer();
		$http.post(	serviceUrl +"createagreement", getData,{'Content-Type': 'application/json;charset=UTF-8'})
		.success(function(data) {
			deferred.resolve(data);
		})
		.error(function(){
			deferred.reject();
		});

		return deferred.promise;
    }; 

           this.getAllAgreements = function (getData) {
		var deferred = $q.defer();
		$http.post(	serviceUrl +"fetchagreement", getData,{'Content-Type': 'application/json;charset=UTF-8'})
		.success(function(data) {
			deferred.resolve(data);
		})
		.error(function(){
			deferred.reject();
		});

		return deferred.promise;
    }; 


           this.AgreementUpdate = function (getData) {
		var deferred = $q.defer();
		$http.post(	serviceUrl +"updateagreement", getData,{'Content-Type': 'application/json;charset=UTF-8'})
		.success(function(data) {
			deferred.resolve(data);
		})
		.error(function(){
			deferred.reject();
		});

		return deferred.promise;
    }; 

     this.createNewsPayRate = function (getData) {
		var deferred = $q.defer();
		$http.post(	serviceUrl +"createpayrate", getData,{'Content-Type': 'application/json;charset=UTF-8'})
		.success(function(data) {
			deferred.resolve(data);
		})
		.error(function(){
			deferred.reject();
		});

		return deferred.promise;
    }; 

     this.getAllpayRates = function (getData) {
		var deferred = $q.defer();
		$http.post(	serviceUrl +"fetchpayrate", getData,{'Content-Type': 'application/json;charset=UTF-8'})
		.success(function(data) {
			deferred.resolve(data);
		})
		.error(function(){
			deferred.reject();
		});

		return deferred.promise;
    }; 

      this.updatePayRate = function (getData) {
		var deferred = $q.defer();
		$http.post(	serviceUrl +"updatepayrate", getData,{'Content-Type': 'application/json;charset=UTF-8'})
		.success(function(data) {
			deferred.resolve(data);
		})
		.error(function(){
			deferred.reject();
		});

		return deferred.promise;
    }; 

    this.fileUpload = function(title,type,id,name,fd,typeOfSelcted){
    	console.log(name,id,title,type,typeOfSelcted);

    	var deferred = $q.defer();

		$http(
				{
					method: 'POST', 
					url: 'http://codeplay-dev6.cloud.cms500.com/unionapp/rest/service/upload', 
					data: fd, 
					headers: {'Content-Type': undefined,
					            'attachmentTitle': title,
							 	'featureType': type,
							 	'featureId':id,
							 	'attachmentName':name,
							 	'attachmentType':typeOfSelcted
							 }, 
								transformRequest: angular.identity
							})
		.success(function(data) {

			deferred.resolve(data);
		})
		.error(function(){
			deferred.reject();
		});

		return deferred.promise;

    };

    
           this.getAllContacts = function (getData) {
		var deferred = $q.defer();
		$http.post(	serviceUrl +"fetchcategory", getData,{'Content-Type': 'application/json;charset=UTF-8'})
		.success(function(data) {
			deferred.resolve(data);
		})
		.error(function(){
			deferred.reject();
		});

		return deferred.promise;
    }; 
    this.getContactsFromCategory = function (getData) {
		var deferred = $q.defer();
		$http.post(	serviceUrl +"fetch", getData,{'Content-Type': 'application/json;charset=UTF-8'})
		.success(function(data) {
			deferred.resolve(data);
		})
		.error(function(){
			deferred.reject();
		});
		return deferred.promise;
    }; 
    
    this.getAllUsers = function (getData) {
		var deferred = $q.defer();
		$http.post(	serviceUrl +"fetchalluser", getData,{'Content-Type': 'application/json;charset=UTF-8'})
		.success(function(data) {
			deferred.resolve(data);
		})
		.error(function(){
			deferred.reject();
		});

	return deferred.promise;
    };

     this.newCategory = function (getData) {
		var deferred = $q.defer();
		$http.post(	serviceUrl +"addcategory", getData,{'Content-Type': 'application/json;charset=UTF-8'})
		.success(function(data) {
			deferred.resolve(data);
		})
		.error(function(){
			deferred.reject();
		});

		return deferred.promise;
    }; 

    this.updateProfile = function (getData) {
		var deferred = $q.defer();
		$http.post(	serviceUrl +"updateuserprofile", getData,{'Content-Type': 'application/json;charset=UTF-8'})
		.success(function(data) {
			deferred.resolve(data);
		})
		.error(function(){
			deferred.reject();
		});

		return deferred.promise;
    }; 
    this.getSpaceInfo = function (getData) {
		var deferred = $q.defer();
		$http.post(	serviceUrl +"fetchspaceinfo", getData,{'Content-Type': 'application/json;charset=UTF-8'})
		.success(function(data) {
			deferred.resolve(data);
		})
		.error(function(){
			deferred.reject();
		});

		return deferred.promise;
    };
    this.getVisitorInfo = function (getData) {
		var deferred = $q.defer();
		$http.post(	serviceUrl +"fetchvisitorinfo", getData, {'Content-Type': 'application/json;charset=UTF-8'})
		.success(function(data) {
			deferred.resolve(data);
		})
		.error(function(){
			deferred.reject();
		});

		return deferred.promise;
    }; 
    this.fetchActionLogs = function (getData) {
		var deferred = $q.defer();
		$http.post(	serviceUrl +"fetchactionlog", getData, {'Content-Type': 'application/json;charset=UTF-8'})
		.success(function(data) {
			deferred.resolve(data);
		})
		.error(function(){
			deferred.reject();
		});

		return deferred.promise;
    }; 

    this.getAllSurvey = function (getData) {
		var deferred = $q.defer();
		$http.post(	serviceUrl +"fetchsurvey", getData, {'Content-Type': 'application/json;charset=UTF-8'})
		.success(function(data) {
			deferred.resolve(data);
		})
		.error(function(){
			deferred.reject();
		});

		return deferred.promise;
    };

    this.createNewSurvey = function (getData) {
		var deferred = $q.defer();
		$http.post(	serviceUrl +"createsurvey", getData, {'Content-Type': 'application/json;charset=UTF-8'})
		.success(function(data) {
			deferred.resolve(data);
		})
		.error(function(){
			deferred.reject();
		});

		return deferred.promise;
    };

    this.updateSurvey = function (getData) {
		var deferred = $q.defer();
		$http.post(	serviceUrl +"updatesurvey", getData, {'Content-Type': 'application/json;charset=UTF-8'})
		.success(function(data) {
			deferred.resolve(data);
		})
		.error(function(){
			deferred.reject();
		});

		return deferred.promise;
    };

    this.updatePassword = function (getData) {
		var deferred = $q.defer();
		$http.post(	serviceUrl +"updatepwd", getData, {'Content-Type': 'application/json;charset=UTF-8'})
		.success(function(data) {
			deferred.resolve(data);
		})
		.error(function(){
			deferred.reject();
		});

		return deferred.promise;
    }; 

    this.deleteFile = function (getData) {
		var deferred = $q.defer();
		$http.post(	serviceUrl +"deletefile", getData, {'Content-Type': 'application/json;charset=UTF-8'})
		.success(function(data) {
			deferred.resolve(data);
		})
		.error(function(){
			deferred.reject();
		});

		return deferred.promise;
    };

    this.updateStatus = function (getData) {
		var deferred = $q.defer();
		$http.post(	serviceUrl +"update", getData, {'Content-Type': 'application/json;charset=UTF-8'})
		.success(function(data) {
			deferred.resolve(data);
		})
		.error(function(){
			deferred.reject();
		});

		return deferred.promise;
    }; 

    }
);

   

app.service('dataSharingService', function() {

  //alert("yes service");
  var editData = [];

  var addEditData = function(newObj) {
    // alert("list is 1"+JSON.stringify(newObj));
    editData =[];
    editData.push(newObj);
   // alert("editData is" + JSON.stringify(editData));
  }

  var getEditData = function() {
    console.log("editData:" + JSON.stringify(editData));
    return editData;
  }

  return {
    addEditData: addEditData,
    getEditData: getEditData
  };

});