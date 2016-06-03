/**
 * Created by flyin on 2016/5/26.
 */
/**
 * eduCertificationStatusApp
 */
var GetAllItems = function () {}, getData = {}, postData= {};
angular.module('eduCertificationStatusApp', [])
    .controller('eduCertificationStatusCtrl', ['$scope', 'BusinessService', function ($scope, BusinessService) {

        $scope.formData = {};
        //获取列表
        GetAllItems = function () {
            BusinessService.list()
                .success(function (response) {
                    console.log(response);
                    if (response.result) {
                        $scope.records = response['extra']['data'];
                    } else {
                        X.dialog.tips(response.message);
                    }
                })
                .error(function (response, state) {
//                                globalErrors(state);
                });
        };
        GetAllItems();
        $scope.SubmitForms = function () {
            postData = {url: '/admin_console/capital/quota_create', data: $scope.formData};
            BusinessService.submits(postData)
                .success(function (response) {
//                            console.log(response);
                    if (response.result) {
                        X.dialog.tips(response.message);
                        window.location.href = '/boss/certification/myCertification';
                    } else {
                        X.dialog.tips(response.message);
                    }
                })
                .error(function (response, state) {
                    if (state == 404) {
//                                    X.dialog.tips('未找到页面');
                    } else if (state == 500) {
                        X.dialog.tips('服务器内部错误');
                    }
                });

        };

        $scope.modifyMsg = function () {
            $scope.eduCertificated = '';
        };
    }])
    .factory('BusinessService', ['$http', function ($http) {

        //get
        var list = function () {
            var urlWithParam = '/boss/certification/certification_get';
            return $http.get(urlWithParam);
        };

        //post
        var submits = function (postData) {
            return $http({
                method: 'POST',
                url: postData.url,
                data: postData.data  // pass in data as strings
//                    headers: {'Content-Type': 'application/x-www-form-urlencoded'}  // set the headers so angular passing info as form data (not request payload)
            });
        };

        return {
            list: function () {
                return list();
            },
            submits: function (postData) {
                return submits(postData);
            }
        }
    }]);



/**
 * jobCertificationStatusApp
 */
angular.module('jobCertificationStatusApp', [])
    .controller('jobCertificationStatusCtrl', ['$scope', 'BusinessService', function ($scope, BusinessService) {

        $scope.formData = {};
        //获取列表
        GetAllItems = function () {
            getData = {url: '/boss/certification/certification_get'};
            BusinessService.list(getData)
                .success(function (response) {
                    console.log(response);
                    if (response.result) {
                        $scope.records = response.extra;

                    } else {
                        X.dialog.tips(response.message);
                    }
                })
                .error(function (response, state) {
//                                globalErrors(state);
                });
        };
        GetAllItems();
        $scope.self = $scope;
        $scope.changeInput = function () {
            getData = {url: '/boss/certification/certification_corporations', fullName: $scope.self.fullName};
            if ($.trim(getData.fullName).length>0) {
                BusinessService.list(getData)
                    .success(function (response) {
                        console.log(response);
                        if (response.result) {
                            var ulItems = '';
                            $scope.records = response['extra']['data'];
                            for (var i = 0; i < response['extra'].length; i++) {
                                ulItems += "<li accesskey =" + response['extra'][i]['id'] + ">" + response['extra'][i]['fullName'] + "</li>";
                            }
                            $("#searchResult").empty().append(ulItems);
                            $("#searchResult").parent().show();
                        } else {
                            X.dialog.tips(response.message);
                        }
                    })
                    .error(function (response, state) {
//                                globalErrors(state);
                    });
            } else {
                $("#searchResult").parent().hide();
            }

        };

        $scope.chooseItem = function (e) {
            $("#corporationId").val(e.target.accessKey);
            $("#corporation").val(e.target.innerText);
            $("#searchResult").parent().hide();
        };

        $scope.SubmitForms = function () {
            postData = {url: '/boss/certification/certification_job', data: $scope.formData};
            BusinessService.submits(postData)
                .success(function (response) {
//                            console.log(response);
                    if (response.result) {
                        X.dialog.tips(response.message);
                        window.location.href = '/boss/certification/myCertification';
                    } else {
                        X.dialog.tips(response.message);
                    }
                })
                .error(function (response, state) {
                    if (state == 404) {
//                                    X.dialog.tips('未找到页面');
                    } else if (state == 500) {
                        X.dialog.tips('服务器内部错误');
                    }
                });

        };

        $scope.modifyMsg = function () {
            $scope.jobAuditString = '';
        };
    }])
    .factory('BusinessService', ['$http', function ($http) {

        //get
        var list = function (getData) {
            var urlWithParam = getData.url + '?';
            //拼接url参数
            for (var key in getData) {
                if (key != 'url' && getData.hasOwnProperty(key)) {
                    urlWithParam += key + '=' + getData[key] + '&';
                }
            }
            console.log(urlWithParam);
            return $http.get(urlWithParam);
        };

        //post
        var submits = function (postData) {
            return $http({
                method: 'POST',
                url: postData.url,
                data: postData.data  // pass in data as strings
//                    headers: {'Content-Type': 'application/x-www-form-urlencoded'}  // set the headers so angular passing info as form data (not request payload)
            });
        };

        return {
            list: function () {
                return list(getData);
            },
            submits: function (postData) {
                return submits(postData);
            }
        }
    }]);



/**
 * nameCertificationStatusApp
 */
angular.module('nameCertificationStatusApp', [])
    .controller('nameCertificationStatusCtrl', ['$scope', 'BusinessService','$http', function ($scope, BusinessService,$http) {
        $scope.formData = {};
        //获取列表
        GetAllItems = function () {
            getData = {url: '/boss/certification/certification_get'};
            BusinessService.list(getData)
                .success(function (response) {
                    console.log(response);
                    if (response.result) {
                        response.extra.idCard = response.extra.idCard.replace(idCard.substr(10,6), "******");
                        $scope.records = response.extra;
                    } else {
                        X.dialog.tips(response.message);
                    }
                })
                .error(function (response, state) {
                    globalErrors(state);
                });
        };
        GetAllItems();
        $scope.SubmitForms = function () {
            postData = {url: '/boss/certification/certification_realname', data: $scope.formData};
            BusinessService.submits(postData)
                .success(function (response) {
//                            console.log(response);
                    if (response.result) {
                        X.dialog.tips(response.message);
                        window.location.href = '/boss/certification/myCertification';
                    } else {
                        X.dialog.tips(response.message);
                    }
                })
                .error(function (response, state) {
                    if (state == 404) {
//                                    X.dialog.tips('未找到页面');
                    } else if (state == 500) {
                        X.dialog.tips('服务器内部错误');
                    }
                });

        };

        $scope.modifyMsg = function () {
            $scope.nameCertificated = '';
        };
    }])
    .factory('BusinessService', ['$http', function ($http) {

        //get
        var list = function (getData) {
            var urlWithParam = getData.url;
            return $http.get(urlWithParam);
        };

        //post
        var submits = function (postData) {
            return $http({
                method: 'POST',
                url: postData.url,
                data: postData.data  // pass in data as strings
//                    headers: {'Content-Type': 'application/x-www-form-urlencoded'}  // set the headers so angular passing info as form data (not request payload)
            });
        };

        return {
            list: function () {
                return list();
            },
            submits: function (postData) {
                return submits(postData);
            }
        }
    }]);