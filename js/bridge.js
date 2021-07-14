var app = angular.module("gre-chrome", [])

app.controller("HelloController", function ($scope, $http) {
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
        console.log('changeMode after', $scope.isAnswerMode);
    }
    $scope.nextWord = function () {
        $scope.enteredMeaning = "";
        $scope.isAnswerMode = false;
        $http.get(domain + '/gre_chrome/fetch_word').then(fetchWord);
        if ($scope.switchOnStudyModeAfterPressingNext == true)
            $scope.isStudyMode = true;
        $scope.switchOnStudyModeAfterPressingNext = false;
    }
    $scope.submitMeaning = function () {
        console.log("submitMeaning entered", $scope.enteredMeaning);
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