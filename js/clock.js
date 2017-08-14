$(document).ready(function() {
  var started = false,
  session = false,
  sessionTimer, breakTimer;

  $(".progress").on('click', function(event) {
    event.preventDefault();
    var defaultSession = $("#default-session"),
    defaultBreak = $("#default-break"),
    sessionTime = parseInt(defaultSession.val()),
    breakTime = parseInt(defaultBreak.val()),
    secs = parseInt($("#secs").html());

    $("#mins").html(sessionTime);
    $(this).find("#message").html("Click to stop");

    if (!started) {
      started = true;
      session = true;

      sessionTimer = setInterval(cdStart, 1000);
    } else {

      console.log("Session in process: " + session);
      if (session) {
        clearInterval(sessionTimer);
        console.log("Session stopped");
      } else {
        clearInterval(breakTimer);
      }
      $("#seces").html('00');

      $(this).find("#message").html("Cleared");
      $(this).prop("disabled", true);
    }

    function cdStart() {
      secs -= 1;

      if (secs < 0) {
        secs = 59;
        sessionTime -= 1;
      }

      $("#mins").html(sessionTime);

      if (secs < 10) {
        $("#secs").html('0' + secs);
      } else {
        $("#secs").html(secs);
      }

      if (sessionTime <= 0 && secs <= 0) {
        clearInterval(sessionTimer);
        secs = 0;
        console.log("Session finished");
        session = false;

        $("#mins").html(breakTime);
        $("#secs").html('00');
        breakTimer = setInterval(function() {
          secs -= 1;

          if (secs < 0) {
            secs = 59;
            breakTime -= 1;
          }

          $("#mins").html(breakTime);

          if (secs < 10) {
            $("#secs").html('0' + secs);
          } else {
            $("#secs").html(secs);
          }

          if (breakTime <= 0 && secs <= 0) {
            clearInterval(breakTimer);
            console.log("Break finished");
            $(this).find("#message").html("Finished");
            $(this).prop("disabled", true);
          }
        }, 1000);
      }
    }
  });
});
