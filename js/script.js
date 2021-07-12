var app = angular.module("gre-chrome", [])

app.controller("HelloController", function ($scope) {
    $scope.changeMode = function () {
        $scope.isStudyMode = !$scope.isStudyMode;
        $scope.switchOnStudyModeAfterPressingNext = true;
    }
    $scope.nextWord = function () {
        if ($scope.switchOnStudyModeAfterPressingNext == true)
            $scope.isStudyMode = true;
        $scope.switchOnStudyModeAfterPressingNext = false;
        $scope.word = "NextWord";
        $scope.meaning = "Some even more long and complicated, mind blowing meaning"
    }
    $scope.switchOnStudyModeAfterPressingNext = false;
    $scope.isStudyMode = false;
    $scope.word = "Word";
    $scope.meaning = "A long line here meant to display a really long and complicated meaning";
});