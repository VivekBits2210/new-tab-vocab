var app = angular.module("gre-chrome", [])

app.controller("HelloController", function ($scope, $http, focus) {
    var domain = 'http://server.eba-3vcize8p.us-west-2.elasticbeanstalk.com/';
    $scope.word = "";
    $scope.meaning = "";
    $scope.isThereAPrevious = false;
    $scope.previousWord = null;
    $scope.previousMeaning = null;
    $scope.nextWord = null;
    $scope.nextMeaning = null;

    function fetchWord(response) {
        var data = response['data'];
        $scope.word = data['word'];
        $scope.meaning = data['meaning'];
    }

    $http.get(domain + '/gre_chrome/fetch_word').then(fetchWord);

    $scope.changeMode = function (is_checkbox) {
        $scope.enteredMeaning = "";
        $scope.isAnswerMode = false;
        if (is_checkbox == false) {
            $scope.switchOnStudyModeAfterPressingNext = true;
            $scope.isStudyMode = false;
        }
        else {
            focus('focusMe');
        }
        // if ($scope.isStudyMode == false)
        //     focus('focusNext');
    }
    $scope.loadPreviousWord = function () {
        $scope.enteredMeaning = "";
        $scope.isAnswerMode = false;
        $scope.nextWord = $scope.word;
        $scope.nextMeaning = $scope.meaning;
        $scope.word = $scope.previousWord;
        $scope.meaning = $scope.previousMeaning;
        $scope.previousWord = null;
        $scope.previousMeaning = null;
        $scope.isThereAPrevious = false;
    }
    $scope.loadNextWord = function () {
        $scope.enteredMeaning = "";
        $scope.isAnswerMode = false;
        $scope.previousWord = $scope.word;
        $scope.previousMeaning = $scope.meaning;
        $scope.isThereAPrevious = true;
        if ($scope.nextWord != null) {
            $scope.word = $scope.nextWord;
            $scope.meaning = $scope.nextMeaning;
            $scope.nextWord = null;
            $scope.nextMeaning = null;
        }
        else {
            $http.get(domain + '/gre_chrome/fetch_word').then(fetchWord);
        }
        if ($scope.switchOnStudyModeAfterPressingNext == true) {
            $scope.isStudyMode = true;
            focus('focusMe');
        }
        $scope.switchOnStudyModeAfterPressingNext = false;
    }
    $scope.submitMeaning = function () {
        $scope.enteredMeaning = $scope.enteredMeaning.toLowerCase().replace(/[^a-z ,']/g, " ");
        $scope.isAnswerMode = true;
        $scope.isStudyMode = false;
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