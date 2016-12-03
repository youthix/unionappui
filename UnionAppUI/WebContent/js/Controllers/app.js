var app = angular.module('unionApp', ['ngRoute','ngTouch','ngResource','ngSanitize','ngLoadingSpinner','720kb.datepicker','file-model'
,'ui.bootstrap']);


app.config(['$routeProvider','$locationProvider','$httpProvider',function($routeProvider, $locationProvider, $httpProvider) {

                      $routeProvider.when('/login',
                                      {

                                        controller: 'loginController',
                                        templateUrl: 'templates/login.html',
                                      })
                                    .when('/dashBoard',
                                      {

                                        controller: 'dashBoardController',
                                        templateUrl: 'templates/dashBoard.html',
                                      })
                                     .when('/MeetingDashboard',
                                      {

                                        controller: 'MeetingDashboardController',
                                        templateUrl: 'templates/meeting.html',
                                      })
                                     .when('/newMeeting',
                                      {

                                        controller: 'newMeetingController',
                                        templateUrl: 'templates/new_meeting.html',
                                      })
                                      .when('/forgotPassword',
                                      {

                                        controller: 'forgotPasswordController',
                                        templateUrl: 'templates/forgotPassword.html', 
                                      })
                                      .when('/editMeeting',
                                      {

                                        controller: 'editMeetingController',
                                        templateUrl: 'templates/editMeeting.html',
                                      })
                                      .when('/newActivitie',
                                      {

                                        controller: 'newActivitieController',
                                        templateUrl: 'templates/new_activitie.html',
                                      })
                                      .when('/activitiesList',
                                      {

                                        controller: 'activitiesDashboardController',
                                        templateUrl: 'templates/activities.html',
                                      })
                                      .when('/editActivitie',
                                      {

                                        controller: 'editActivitieController',
                                        templateUrl: 'templates/editActivitie.html',
                                      })
                                      .when('/newsLetterList',
                                      {
                                        controller:'newsLetterController',
                                        templateUrl:'templates/newsLetterList.html'

                                      })
                                        .when('/createNewsLetter',
                                      {
                                        controller:'createNewsLetterController',
                                        templateUrl:'templates/new_newsLetter.html'

                                      })
                                          .when('/editNewsLetter',
                                      {
                                        controller:'newsLetterEditController',
                                        templateUrl:'templates/newsLetteredit.html'

                                      })
                                        .when('/summary',
                                      {
                                        controller:'summaryDashBoardController',
                                        templateUrl:'templates/summaryDashBoard.html'

                                      })
                                        .when('/newSummary',
                                      {
                                        controller:'newSummaryController',
                                        templateUrl:'templates/newSummary.html'

                                      })
                                        .when('/editSummary',
                                      {
                                        controller:'editSummaryController',
                                        templateUrl:'templates/editSummary.html'

                                      })
                                            .when('/ideas',
                                      {
                                        controller:'ideaDashBoardController',
                                        templateUrl:'templates/ideaDashBoard.html'

                                      })
                                        .when('/newIdea',
                                      {
                                        controller:'newIdeaController',
                                        templateUrl:'templates/newIdea.html'

                                      })
                                        .when('/editIdea',
                                      {
                                        controller:'editIdeaController',
                                        templateUrl:'templates/editIdea.html'

                                      })
                                         .when('/localAgreements',
                                      {
                                        controller:'localAgreementsDashBoardController',
                                        templateUrl:'templates/localAgreementDashBoard.html'

                                      })
                                        .when('/newAgreement',
                                      {
                                        controller:'newlocalAgreementController',
                                        templateUrl:'templates/newlocalAgreement.html'

                                      })
                                        .when('/editAgreement',
                                      {
                                        controller:'editlocalAgreementController',
                                        templateUrl:'templates/editlocalAgreement.html'

                                      })
                                             .when('/payRate',
                                      {
                                        controller:'payRateDashBoardController',
                                        templateUrl:'templates/payRateDashBoard.html'

                                      })
                                        .when('/newpayRate',
                                      {
                                        controller:'newpayRateController',
                                        templateUrl:'templates/newpayRate.html'

                                      })
                                        .when('/editpayRate',
                                      {
                                        controller:'editpayRateController',
                                        templateUrl:'templates/editpayRate.html'

                                      })
                                             .when('/ContactList',
                                      {
                                        controller:'ContactListDashBoardController',
                                        templateUrl:'templates/ContactListDashBoard.html'

                                      })
                                        .when('/ContactListData',
                                      {
                                        controller:'ContactListDataController',
                                        templateUrl:'templates/newContact.html'

                                      })
                                        .when('/editContact',
                                      {
                                        controller:'editContactController',
                                        templateUrl:'templates/editContact.html'

                                      })
                                         .when('/newCategory',
                                      {
                                        controller:'newCategoryController',
                                        templateUrl:'templates/newCategory.html'

                                      })
                                           .when('/miniContactProfile',
                                      {
                                        controller:'miniContactController',
                                        templateUrl:'templates/contactMiniProfile.html'

                                      })
                                             .when('/adminUser',
                                      {
                                        controller:'adminUserDashBoardController',
                                        templateUrl:'templates/adminUserDashBoard.html'

                                      })
                                        .when('/newadminUser',
                                      {
                                        controller:'newadminUserController',
                                        templateUrl:'templates/newadminUser.html'

                                      })
                                        .when('/editadminUser',
                                      {
                                        controller:'editadminUserController',
                                        templateUrl:'templates/editadminUser.html'

                                      })
									    .when('/amr',
                                      {
                                        controller:'amrController',
                                        templateUrl:'templates/amrList.html'

                                      })
									  .when('/createAmr',
                                      {
                                        controller:'createAmrController',
                                        templateUrl:'templates/new_amr.html'

                                      })
									  .when('/editAmr',
                                      {
                                        controller:'amrEditController',
                                        templateUrl:'templates/amredit.html'

                                      }).when('/voting',
                                      {
                                        controller:'votingController',
                                        templateUrl:'templates/votingDashBoard.html'

                                      }).when('/surveyQuestions',
                                      {
                                        controller:'questionController',
                                        templateUrl:'templates/surveyQuestions.html'

                                      })
                                    .otherwise({
                                      	redirectTo: '/login'
                                      });
                                  }]);



   app.directive('loading',   ['$http' ,function ($http)
    {
        return {
            restrict: 'A',
            link: function (scope, elm, attrs)
            {
                scope.isLoading = function () {
                    return $http.pendingRequests.length > 0;
                };

                scope.$watch(scope.isLoading, function (v)
                {
                    if(v){
                        elm.show();
                    }else{
                        elm.hide();
                    }
                });
            }
        };

    }]);


app.directive('ngFiles',['$parse', function ($parse) {

            function fn_link(scope, element, attrs) {
                var onChange = $parse(attrs.ngFiles);
                element.on('change', function (event) {
                    onChange(scope, { $files: event.target.files });
                });
            };

            return {
                link: fn_link
            }
        } ]);



    app.directive('myImgUpload', function () {
    return {
        templateUrl: 'templates/imageUpload.html',
        require: ['^form'],
        restrict: 'E',
        replace: false,
        scope: {
            customModel: '=ngModel',
            fieldName: '&name'
        },
        link: function(scope, elem, attr, controllers) {
            scope.form = controllers[0];
            scope.onFileSelected = function($files, $file, $newFiles, $duplicateFiles, $invalidFiles, $event) {
        console.log('onFileSelected');
            }
            scope.remove = function(){
              delete scope.customModel;
            }
        }
    };
});