var app = angular.module("gre-chrome", [])

app.controller("HelloController", function ($scope, $http, focus) {
    var domain = 'http://server.eba-3vcize8p.us-west-2.elasticbeanstalk.com/';
    $scope.word = "";
    $scope.meaning = "";
    function fetchWord(response) {
        var data = response['data'];
        $scope.word = data['word'];
        $scope.meaning = data['meaning'];
    }

    $http.get(domain + '/gre_chrome/fetch_word').then(fetchWord);

    $scope.changeMode = function (is_checkbox) {
        $scope.enteredMeaning = "";
        $scope.isAnswerMode = false;
        console.log('changeMode before', $scope.isAnswerMode);
        if (is_checkbox == false) {
            $scope.switchOnStudyModeAfterPressingNext = true;
            $scope.isStudyMode = false;
        }
        else {
            focus('focusMe');
        }
        // if ($scope.isStudyMode == false)
        //     focus('focusNext');
        console.log('changeMode after', $scope.isAnswerMode);
    }
    $scope.nextWord = function () {
        $scope.enteredMeaning = "";
        $scope.isAnswerMode = false;
        $http.get(domain + '/gre_chrome/fetch_word').then(fetchWord);
        if ($scope.switchOnStudyModeAfterPressingNext == true) {
            $scope.isStudyMode = true;
            focus('focusMe');
        }
        // if ($scope.isStudyMode == false)
        //     focus('focusNext');
        $scope.switchOnStudyModeAfterPressingNext = false;
    }
    $scope.submitMeaning = function () {
        console.log("submitMeaning entered", $scope.enteredMeaning);
        $scope.isAnswerMode = true;
        $scope.isStudyMode = false;
        // focus('focusNext');
        $scope.switchOnStudyModeAfterPressingNext = true;
        $scope.score = 5;
    }
    $scope.score = 0;
    $scope.enteredMeaning = "";
    $scope.isAnswerMode = false;
    $scope.switchOnStudyModeAfterPressingNext = false;
    $scope.isStudyMode = false;
});

app.directive('focusOn', function () {
    return function (scope, elem, attr) {
        scope.$on('focusOn', function (e, name) {
            if (name === attr.focusOn) {
                elem[0].focus();
            }
        });
    };
});

app.factory('focus', function ($rootScope, $timeout) {
    return function (name) {
        $timeout(function () {
            $rootScope.$broadcast('focusOn', name);
        });
    }
});