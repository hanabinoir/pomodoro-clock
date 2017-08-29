var clock = angular.module('clock', []), 
sessTimer, breakTimer, 
sessionStarted = false, 
sessionStopped = false;

clock.controller('session-ctrl', function($scope, $interval) {
  var sessionLength = angular.element("#session-length").val(),
  breakLength = angular.element("#break-length").val(),
  defaultSession = {
    'sessionLabel': 'Session 1',
    'breakLable': 'Break 1',
    'sessionLength': sessionLength,
    'breakLength': breakLength, 
    'sessId': 'sess-' + 1
  };
  $scope.sessions = [defaultSession];
  $scope.msgLog = "";
  $scope.btnLog = "";

  $scope.setSessions = function() {
    var numOfSess = angular.element("#num-of-sessions").val();

    for (var i = 1; i < numOfSess; i++) {
      var sessNum = i + 1;
      $scope.sessions.push({
        'sessionLabel': 'Session ' + sessNum,
        'breakLable': 'Break ' + sessNum,
        'sessionLength': sessionLength,
        'breakLength': breakLength, 
        'sessId': 'sess-' + (i + 1)
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

  $scope.countDown = function() {
    var clock = $(event.currentTarget), 
    sessNum = parseInt(clock.attr('id').split('-')[1]), 
    msgSpan = clock.children('span.msg');

    var setClock = function() {
      sessNum = parseInt(clock.attr('id').split('-')[1]); 
      minsSpan = clock.children('span.mins');
      secsSpan = clock.children('span.secs'); 
      mins = parseInt(minsSpan.closest('.pom-sess').find('.sess').val()); 
      secs = 0;
    } 
    
    var sessCD = function() {
      secs -= 1;

        if (secs < 0 ) {
          secs = 59;
          mins -= 1;
        }

        if (mins <= 0 && secs <= 0) {
          mins = parseInt(minsSpan.closest('.pom-sess').find('.brk').val()); 
          secs = 0;
          $interval.cancel(sessTimer);
          console.log(breakCD);
          breakTimer = setInterval(breakCD, 1000);
        }

        minsSpan.html(mins);
        if (secs < 10) {
          secsSpan.html('0' + secs);
        } else {
          secsSpan.html(secs);
        }
        
    };

    var breakCD = function() {
      secs -= 1;

        if (secs < 0 ) {
          secs = 59;
          mins -= 1;
        }

        if (mins <= 0 && secs <= 0) {
          clearInterval(breakTimer);
          msgSpan.html('Session finished');
          minsSpan.html(mins);
          if (secs < 10) {
            secsSpan.html('0' + secs);
          } else {
            secsSpan.html(secs);
          }

          if (sessNum < $scope.sessions.length) {
            clock = $("div#sess-" + (sessNum + 1));
            msgSpan = clock.children('span.msg');
            msgSpan.html('Click to stop');
            setClock();
            console.log(sessCD);
            sessTimer = setInterval(sessCD, 1000);
          }
        }
    };

    if (!sessionStarted) {
      setClock();
      sessionStarted = true;
      msgSpan.html('Click to stop');
      sessTimer = $interval(sessCD, 1000);
    } else {
      sessionStarted = false;
      clearInterval(sessTimer);
      msgSpan.html('Session skipped');
    }
  }

});
