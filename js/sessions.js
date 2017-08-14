var clock = angular.module('clock', []);

clock.controller('session-ctrl', function($scope) {
  angular.element(document).ready(function() {
    $scope.sessions = [];
    $scope.setSessions = setSessions($scope.sessions)
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
