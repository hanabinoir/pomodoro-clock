var clock = angular.module('clock', []);

clock.controller('session-ctrl', function($scope) {
  angular.element(document).ready(function() {
    $scope.sessions = [];
    $scope.setSessions = setSessions($scope.sessions);
    $scope.resetSessions = resetSessions($scope.sessions);
    $scope.displayMessage = displayMessage;
    $scope.hideMessage = hideMessage;
    $scope.displayButtons = displayButtons;
    $scope.hideButtons = hideButtons;
  });
});

function setSessions(sessions) {
  var numOfSess = angular.element("#num-of-sessions").val(),
  sessionLength = angular.element("#session-length").val(),
  breakLength = angular.element("#break-length").val();

  for (var i = 0; i < numOfSess; i++) {
    sessions.push({
      'sessionId': 'session-' + i,
      'breakId': 'break-' + i,
      'sessionLabel': 'Session ' + i,
      'breakLable': 'Break ' + i,
      'sessionLength': sessionLength,
      'breakLength': breakLength
    });
  }
}

function resetSessions(sessions) {
    sessions = [];
}

function displayMessage(event) {
    var current = angular.element(event.target);
    current.find('#message').css('visibility', 'visible');;

}

function hideMessage(event) {
    var current = angular.element(event.target);
    current.find('#message').css('visibility', 'hidden');;

}

function displayButtons(event) {
    var current = angular.element(event.target);
    current.find('.col-xs-2').css('visibility', 'visible');;
}

function hideButtons(event) {
    var current = angular.element(event.target);
    current.find('.col-xs-2').css('visibility', 'hidden');;
}
