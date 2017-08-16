var clock = angular.module('clock', []);

clock.controller('session-ctrl', function($scope) {
  var sessionLength = angular.element("#session-length").val(),
  breakLength = angular.element("#break-length").val(),
  defaultSession = {
    'sessionId': 'session-0',
    'breakId': 'break-0',
    'sessionLabel': 'Session 1',
    'breakLable': 'Break 1',
    'sessionLength': sessionLength,
    'breakLength': breakLength
  };
  $scope.sessions = [defaultSession];
  $scope.msgLog = "";
  $scope.btnLog = "";

  $scope.setSessions = function() {
    var numOfSess = angular.element("#num-of-sessions").val();

    for (var i = 1; i < numOfSess; i++) {
      var sessNum = i + 1;
      $scope.sessions.push({
        'sessionId': 'session-' + i,
        'breakId': 'break-' + i,
        'sessionLabel': 'Session ' + sessNum,
        'breakLable': 'Break ' + sessNum,
        'sessionLength': sessionLength,
        'breakLength': breakLength
      });
    }

  };

  $scope.resetSessions = function() {
    $scope.sessions = [];
  }

  $scope.displayMessage = function() {
    var current = angular.element(event.currentTarget);
    current.children('#message').css('visibility', 'visible');
  };

  $scope.hideMessage = function() {
    var current = angular.element(event.currentTarget);
    current.children('#message').css('visibility', 'hidden');
  };

  $scope.displayButtons = function() {
    var current = angular.element(event.currentTarget);
    current.children('.col-xs-2').css('visibility', 'visible');
  };

  $scope.hideButtons = function() {
    var current = angular.element(event.currentTarget);
    current.children('.col-xs-2').css('visibility', 'hidden');
  };

});
