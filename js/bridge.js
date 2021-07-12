var app = angular.module("gre-chrome", [])

app.controller("HelloController", function ($scope) {
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
        $scope.word = "NextWord";
        $scope.meaning = "Some even more long and complicated, mind blowing meaning"
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
    $scope.word = "Word";
    $scope.meaning = "A long line here meant to display a really long and complicated meaning";
});