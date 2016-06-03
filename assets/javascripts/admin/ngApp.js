/**
 * Created by flyin on 2016/5/24.
 */
var getData = {}, postData = {};
var urls = ['/admin_console/capital/capital_list', ''], status_EQ = globalConfig.capital.available;


/**
 * capitalListApp
 */
angular.module('capitalListApp', ['tm.pagination', 'angucomplete-alt'])
    .controller('capitalListCtrl', ['$scope', 'BusinessService', function ($scope, BusinessService) {
        $scope.error = true;
        //获取列表
        var GetAllItems = function () {

            getData = {
                url: '/admin_console/capital/capital_list',
//                    status_EQ: globalConfig.capital.available,
                page: $scope.paginationConf.currentPage,
                size: $scope.paginationConf.itemsPerPage
            };
            console.log('before GetAllItems' + Object.keys(getData).length);
            BusinessService.list(getData)
                .success(function (response) {
                    $scope.error = response.result;
                    if (response.result) {
                        if (response['extra']['totalCount']) {
                            $scope.paginationConf.totalItems = response['extra']['totalCount'];
                            $scope.page = status_EQ;
                            $scope.records = response['extra']['data'];
                        } else {
                            $scope.errorDetail = "没有对应结果";
                        }
                    } else {
                        $scope.errorDetail = response.message;
                    }
                })
                .error(function (response, state) {
                    globalErrors(state);
                });

        };

        //查询结果
        var QueryResults = function () {
            getData.search_EQ_creditState = $scope.creditState;
            if ($scope.corporationId) {
                getData.search_EQ_corporationId = $scope.corporationId;
            }
            BusinessService.list(getData)
                .success(function (response) {
                    $scope.error = response.result;
                    if (response.result) {
                        if (response['extra']['totalCount']) {
                            $scope.paginationConf.totalItems = response['extra']['totalCount'];
                            $scope.page = status_EQ;
                            $scope.records = response['extra']['data'];
                        } else {
                            $scope.errorDetail = "没有对应结果";
                        }
                    } else {
                        $scope.errorDetail = response.message;
                    }
                })
                .error(function (response, state) {
                    globalErrors(state);
                });
        };


        //配置分页基本参数
        $scope.paginationConf = {
            currentPage: globalConfig.pages.defaultCurrentPage,
            itemsPerPage: globalConfig.pages.defaultPageSize
        };


        /***************************************************************
         当页码和页面记录数发生变化时监控后台查询
         如果把currentPage和itemsPerPage分开监控的话则会触发两次后台事件。
         ***************************************************************/
        $scope.$watch('paginationConf.currentPage + paginationConf.itemsPerPage', GetAllItems);

        //点击tabde的showPage事件
        $scope.showPage = function (event) {
//                console.log(event);
            var targetText = event.target.innerText;
            if (targetText == "可使用") {
                status_EQ = globalConfig.capital.available;
                GetAllItems();
                $(event.currentTarget).find('a').attr('class', '');
                $(event.target).addClass('current');
                $scope.paginationConf.currentPage = 1;
            } else if (targetText == "已冻结") {
                status_EQ = globalConfig.capital.unavailable;
                GetAllItems();
                $(event.currentTarget).find('a').attr('class', '');
                $(event.target).addClass('current');
                $scope.paginationConf.currentPage = 1;
            }
        };

        //查询按钮点击事件
        $scope.showResults = function () {
            QueryResults();
        };

        $scope.selectedProject = function (str, extra) {
            $scope.corporationId = str.originalObject.id;
        };

        $scope.conditions = [
            {id: 100, name: 1, state: "正常"}, {id: 100, name: 0, state: "冻结"}
        ];
        $scope.creditState = $scope.conditions[0].name;//如果想要第一个值

    }])
    .factory('BusinessService', ['$http', function ($http) {
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

        return {
            list: function (getData) {
                return list(getData);
            }
        }
    }]);


/**
 * payflowListApp
 */
angular.module('payflowListApp', ['tm.pagination'])
    .controller('payflowListCtrl', ['$scope', 'BusinessService', function ($scope, BusinessService) {
        $scope.error = true;
        //获取列表
        var GetAllItems = function () {

            getData = {
                url: '/admin_console/capital/payflow_list',
                page: $scope.paginationConf.currentPage,
                size: $scope.paginationConf.itemsPerPage
            };
            console.log('before GetAllItems' + Object.keys(getData).length);
            BusinessService.list(getData)
                .success(function (response) {
                    console.log(response);
                    $scope.error = response.result;
                    if (response.result) {
                        if (response['extra']['totalCount']) {
                            $scope.paginationConf.totalItems = response['extra']['totalCount'];
                            $scope.records = response['extra']['data'];
                        } else {
                            $scope.errorDetail = "没有对应结果";
                        }
                    } else {
                        $scope.errorDetail = response.message;
                    }
                })
                .error(function (response, state) {
                    globalErrors(state);
                });

        };

        //配置分页基本参数
        $scope.paginationConf = {
            currentPage: globalConfig.pages.defaultCurrentPage,
            itemsPerPage: globalConfig.pages.defaultPageSize
        };


        /***************************************************************
         当页码和页面记录数发生变化时监控后台查询
         如果把currentPage和itemsPerPage分开监控的话则会触发两次后台事件。
         ***************************************************************/
        $scope.$watch('paginationConf.currentPage + paginationConf.itemsPerPage', GetAllItems);

    }])
    .factory('BusinessService', ['$http', function ($http) {
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

        return {
            list: function (getData) {
                return list(getData);
            }
        }
    }]);


/**
 * quotaCreateApp
 */
angular.module('quotaCreateApp', ['ui.bootstrap'])
    .controller('quotaCreateCtrl', ['$scope', 'BusinessService', '$http', function ($scope, BusinessService) {
        $scope.error = true;
        var extra = $.ajax({
            type: "GET",
            url: '/admin_console/capital/quota_boss_list',
            dataType: "json",
            async: false
        }).done(function (response) {
            if (response.result) {
                return response;
            } else {
                return response.message;
            }
        }).fail(function (response, state) {
            globalErrors(state);
        });
        $scope.formData = {};
        //查询结果
        $scope.error = extra.result;
        if (extra.result) {
            $scope.conditions = extra;
        } else {
            $scope.errorDetail = extra;
        }

        $scope.SubmitForms = function () {
            var dateCreated = $scope.formData.dateCreated1,
                failureDate = $scope.formData.failureDate1;
            $scope.formData.dateCreated = dateCreated.valueOf();
            $scope.formData.failureDate = failureDate.valueOf();
            postData = {url: '/admin_console/capital/quota_create', data: $scope.formData};
            console.log($scope.formData.dateCreated.valueOf());
            if ($scope.formData.dateCreated < $scope.formData.failureDate) {
                BusinessService.submits(postData)
                    .success(function (response) {
//                            console.log(response);
                        $scope.error = response.result;
                        $scope.conditions = response['extra'];
                        if (response.result) {
                            window.location.href = '/admin_console/capital/quota_show_get';
                        } else {
                            $scope.errorDetail = response.message;
                        }
                    })
                    .error(function (response, state) {
                        if (state == 404) {
                            alert("未找到页面");
                        } else if (state == 500) {
                            alert("服务器内部错误");
                        }
                    });
            } else {
                alert('生效日期要小于失效日期');
            }

        }

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
            list: function (getData) {
                return list(getData);
            },
            submits: function (postData) {
                return submits(postData);
            }
        }
    }])
    .controller('DatepickerDemoCtrl', DatePicker);


/**
 * quotaListApp
 */
angular.module('quotaListApp', ['tm.pagination', 'ui.bootstrap'])
    .controller('quotaListCtrl', ['$scope', 'BusinessService', function ($scope, BusinessService) {
        $scope.error = true;
        //获取列表
        var GetAllItems = function () {

            getData = {
                url: '/admin_console/capital/quota_list',
//                    status_EQ: globalConfig.capital.available,
                page: $scope.paginationConf.currentPage,
                size: $scope.paginationConf.itemsPerPage
            };
            console.log('before GetAllItems' + Object.keys(getData).length);
            BusinessService.list(getData)
                .success(function (response) {
                    $scope.error = response.result;
                    if (response.result) {
                        if (response['extra']['totalCount']) {
                            $scope.paginationConf.totalItems = response['extra']['totalCount'];
                            $scope.records = response['extra']['data'];
                        } else {
                            $scope.errorDetail = "没有对应结果";
                        }
                    } else {
                        $scope.errorDetail = response.message;
                    }
                })
                .error(function (response, state) {
                    globalErrors(state);
                });

        };


        //查询结果
        var QueryResults = function () {
            console.log('before QueryResults' + Object.keys(getData).length);
            if ($scope.selectedCondition) {
                getData.selectedCondition = $scope.selectedCondition;
            }
            if ($scope.condition) {
                getData.condition = $scope.condition;
            }
            BusinessService.list(getData)
                .success(function (response) {
                    $scope.error = response.result;
                    if (response.result) {
                        if (response['extra']['totalCount']) {
                            $scope.paginationConf.totalItems = response['extra']['totalCount'];
                            $scope.records = response['extra']['data'];
                        } else {
                            $scope.errorDetail = "没有对应结果";
                        }
                    } else {
                        $scope.errorDetail = response.message;
                    }
                })
                .error(function (response) {
                    console.log(response);
                });
            console.log('after QueryResults' + Object.keys(getData).length);
        };

        //配置分页基本参数
        $scope.paginationConf = {
            currentPage: globalConfig.pages.defaultCurrentPage,
            itemsPerPage: globalConfig.pages.defaultPageSize
        };


        /***************************************************************
         当页码和页面记录数发生变化时监控后台查询
         如果把currentPage和itemsPerPage分开监控的话则会触发两次后台事件。
         ***************************************************************/
        $scope.$watch('paginationConf.currentPage + paginationConf.itemsPerPage', GetAllItems);

        //点击tabde的showPage事件
        $scope.showPage = function (event) {
//                console.log(event);
            var targetText = event.target.innerText;
            if (targetText == "可使用") {
                status_EQ = globalConfig.capital.available;
                GetAllItems();
                $(event.currentTarget).find('a').attr('class', '');
                $(event.target).addClass('current');
                $scope.paginationConf.currentPage = 1;
            } else if (targetText == "已冻结") {
                status_EQ = globalConfig.capital.unavailable;
                GetAllItems();
                $(event.currentTarget).find('a').attr('class', '');
                $(event.target).addClass('current');
                $scope.paginationConf.currentPage = 1;
            }
        };

        //查询按钮点击事件
        $scope.showResults = function () {
            QueryResults();
        };

    }])
    .factory('BusinessService', ['$http', function ($http) {
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

        return {
            list: function (getData) {
                return list(getData);
            }
        }
    }]);


/**
 * rechargeCreateApp
 */
angular.module('rechargeCreateApp', ['ui.bootstrap'])
    .controller('rechargeCreateCtrl', ['$scope', 'BusinessService', '$http', function ($scope, BusinessService) {

        $scope.formData = {};
        $scope.error = true;
        //查询结果
        $scope.QueryResults = function () {
            getData = {url: '/admin_console/capital/recharge_corporations', fullName: $scope.formData.corporation};
            var corporation = $scope.formData.corporation;
            if (corporation && corporation.length >= 1) {

                BusinessService.list(getData)
                    .success(function (response) {
                        console.log(response);
                        $scope.error = response.result;
                        $scope.conditions = response['extra'];
                        var ulItems = "";
                        if (response.result) {
                            for (var i = 0; i < response['extra'].length; i++) {
                                ulItems += "<li accesskey =" + response['extra'][i]['id'] + ">" + response['extra'][i]['fullName'] + "</li>";
                            }
                            $("#searchResult").empty().append(ulItems);
                            $("#searchResult").parent().show();
                        } else {
                            $scope.errorDetail = response.message;
                            $("#searchResult").parent().hide();
                        }
                    })
                    .error(function (response, state) {
                        if (state == 404) {
                            alert("未找到页面");
                        } else if (state == 500) {
                            alert("服务器内部错误");
                        }
                    });
            } else {
                $("#searchResult").parent().hide();
            }

        };

        $scope.SubmitForms = function () {
            var effectiveDate = $scope.formData.effectiveDate1,
                expireDate = $scope.formData.expireDate1;
            $scope.formData.effectiveDate = effectiveDate.valueOf();
            $scope.formData.expireDate = expireDate.valueOf();
            $scope.formData.corporationId = $("#corporationId").val();
            postData = {url: '/admin_console/capital/recharge_create', data: $scope.formData};
            BusinessService.submits(postData)
                .success(function (response) {
                    $scope.error = response.result;
                    if (response.result) {
                        window.location.href = '/admin_console/capital/recharge_show';
                    } else {
                        $scope.errorDetail = response.message;
                    }
                })
                .error(function (response, state) {
                    globalErrors(state);
                });
        };

        $scope.chooseItem = function (e) {
            $("#corporationId").val(e.target.accessKey);
            $("#corporation").val(e.target.innerText);
            $("#searchResult").parent().hide();
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
            list: function (getData) {
                return list(getData);
            },
            submits: function (postData) {
                return submits(postData);
            }
        }
    }])
    .controller('DatepickerDemoCtrl', DatePicker);


/**
 * rechargeListApp
 */
angular.module('rechargeListApp', ['tm.pagination'])
    .controller('rechargeListCtrl', ['$scope', 'BusinessService', function ($scope, BusinessService) {
        $scope.error = true;
        //获取列表
        var GetAllItems = function () {

            getData = {
                url: urls[0],
//                    status_EQ: globalConfig.capital.available,
                page: $scope.paginationConf.currentPage,
                size: $scope.paginationConf.itemsPerPage
            };
            if (GetQueryString("corporationId")) {
                getData.search_EQ_corporationId = GetQueryString("corporationId");
            }
            console.log('before GetAllItems' + Object.keys(getData).length);
            BusinessService.list(getData)
                .success(function (response) {
                    $scope.error = response.result;
                    if (response.result) {
                        if (response['extra']['totalCount']) {
                            $scope.paginationConf.totalItems = response['extra']['totalCount'];
                            $scope.records = response['extra']['data'];
                        } else {
                            $scope.errorDetail = "没有对应结果";
                        }
                    } else {
                        $scope.errorDetail = response.message;
                    }
                })
                .error(function (response, state) {
                    globalErrors(state);
                });

        };

        //查询结果
        var QueryResults = function () {
            console.log('before QueryResults' + Object.keys(getData).length);
            if ($scope.bankWaterNumber) {
                getData.search_EQ_bankWaterNumber = $scope.bankWaterNumber;
            }
            if ($scope.rechargeUser) {
                getData.search_EQ_rechargeUser = $scope.rechargeUser;
            }
            BusinessService.list(getData)
                .success(function (response) {
                    $scope.error = response.result;
                    if (response.result) {
                        if (response['extra']['totalCount']) {
                            $scope.paginationConf.totalItems = response['extra']['totalCount'];
                            $scope.records = response['extra']['data'];
                        } else {
                            $scope.errorDetail = "没有对应结果";
                        }
                    } else {
                        $scope.errorDetail = response.message;
                    }
                })
                .error(function (response, state) {
                    globalErrors(state);
                });
            console.log('after QueryResults' + Object.keys(getData).length);
        };


        //配置分页基本参数
        $scope.paginationConf = {
            currentPage: globalConfig.pages.defaultCurrentPage,
            itemsPerPage: globalConfig.pages.defaultPageSize
        };


        /***************************************************************
         当页码和页面记录数发生变化时监控后台查询
         如果把currentPage和itemsPerPage分开监控的话则会触发两次后台事件。
         ***************************************************************/
        $scope.$watch('paginationConf.currentPage + paginationConf.itemsPerPage', GetAllItems);

        //查询按钮点击事件
        $scope.showResults = function () {
            QueryResults();
        };

    }])
    .factory('BusinessService', ['$http', function ($http) {
        var list = function (getData) {
            var urlWithParam = getData.url + '?';
            //拼接url参数
            for (var key in getData) {
                if (key != 'url') {
                    urlWithParam += key + '=' + getData[key] + '&';
                }
            }
            console.log(urlWithParam);
            return $http.get(urlWithParam);
        };

        return {
            list: function (getData) {
                return list(getData);
            }
        }
    }]);

function DatePicker($scope) {
    $scope.today = function () {
        $scope.dt = new Date();
    };
    $scope.today();

    $scope.clear = function () {
        $scope.dt = null;
    };

    // Disable weekend selection
    $scope.disabled = function (date, mode) {
        return ( mode === 'day' && ( date.getDay() === 0 || date.getDay() === 6 ) );
    };

    $scope.maxDate = new Date(2020, 5, 22);

    $scope.open = function ($event) {
        $scope.status.opened = true;
    };

    $scope.setDate = function (year, month, day) {
        $scope.dt = new Date(year, month, day);
    };

    $scope.dateOptions = {
        formatYear: 'yy',
        startingDay: 1
    };

    $scope.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
    $scope.format = $scope.formats[0];

    $scope.status = {
        opened: false
    };

    var tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    var afterTomorrow = new Date();
    afterTomorrow.setDate(tomorrow.getDate() + 2);
    $scope.events =
        [
            {
                date: tomorrow,
                status: 'full'
            },
            {
                date: afterTomorrow,
                status: 'partially'
            }
        ];

    $scope.getDayClass = function (date, mode) {
        if (mode === 'day') {
            var dayToCheck = new Date(date).setHours(0, 0, 0, 0);

            for (var i = 0; i < $scope.events.length; i++) {
                var currentDay = new Date($scope.events[i].date).setHours(0, 0, 0, 0);

                if (dayToCheck === currentDay) {
                    return $scope.events[i].status;
                }
            }
        }

        return '';
    };

}

function GetQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if (r != null)
        return unescape(r[2]);
    return null;
}
function globalErrors(state) {
    if (state == 404) {
        alert("未找到页面");
    } else if (state == 500) {
        alert("服务器内部错误");
    }
}

