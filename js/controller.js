var clock = angular.module('clock', []), 
sessTimer, breakTimer, 
sessionStarted = false, 
sessionStopped = false;

clock.controller('session-ctrl', function($scope) {
  var sessionLength = $("#session-length").val(),
  breakLength = $("#break-length").val(),
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

    if ($(event.currentTarget).hasClass('fa-check')) {
      var numOfSess = $("#num-of-sessions").val();

      $scope.sessions =[];

      for (var i = 0; i < numOfSess; i++) {
        var sessNum = i + 1;
        $scope.sessions.push({
          'sessionLabel': 'Session ' + sessNum,
          'breakLable': 'Break ' + sessNum,
          'sessionLength': sessionLength,
          'breakLength': breakLength, 
          'sessId': 'sess-' + (i + 1)
        });
      }
    } else {
      clearInterval(sessTimer);
      clearInterval(breakTimer);
    }

  };

  $scope.cancelSettings = function() {
    ("#session-length").val(("#session-length").attr('placeholder'));
    ("#break-length").val(("#break-length").attr('placeholder'));
  }

  $scope.displayMessage = function() {
    var current = $(event.currentTarget);
    current.children('#message').css('visibility', 'visible');
  };

  $scope.hideMessage = function() {
    var current = $(event.currentTarget);
    current.children('#message').css('visibility', 'hidden');
  };

  $scope.displayButtons = function() {
    var current = $(event.currentTarget);
    current.children('.col-xs-2').css('visibility', 'visible');
  };

  $scope.hideButtons = function() {
    var current = $(event.currentTarget);
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
    };

    var setClockDisplay = function() {
      minsSpan.html(mins);
      if (secs < 10) {
        secsSpan.html('0' + secs);
      } else {
        secsSpan.html(secs);
      }
    };
    
    var sessCD = function() {
      secs -= 1;

        if (secs < 0 ) {
          secs = 59;
          mins -= 1;
        }

        if (mins <= 0 && secs <= 0) {
          setClockDisplay();
          mins = parseInt(minsSpan.closest('.pom-sess').find('.brk').val()); 
          secs = 0;
          clearInterval(sessTimer);
          breakTimer = setInterval(breakCD, 1000);
        }

        setClockDisplay();
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

        if (sessNum < $scope.sessions.length) {
          setClockDisplay();
          clock = $("div#sess-" + (sessNum + 1));
          msgSpan = clock.children('span.msg');
          msgSpan.html('Click to stop');
          setClock();
          console.log(sessCD);
          sessTimer = setInterval(sessCD, 1000);
        }
      }

      setClockDisplay();
    };

    if (!sessionStarted) {
      setClock();
      sessionStarted = true;
      msgSpan.html('Click to stop');
      sessTimer = setInterval(sessCD, 1000);
    } else {
      sessionStarted = false;
      clearInterval(sessTimer);
      msgSpan.html('Session skipped');
    }
  }

});
