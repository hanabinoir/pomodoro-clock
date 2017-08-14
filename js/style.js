$(document).ready(function() {
  var sessionLength = $("#session-length"),
  breakLength = $("#break-length");

  console.log(navigator.appCodeName);
  $(".clock-settings > col-xs-1 > .fa-remove").css('visibility', 'hidden');

  if (navigator.appCodeName.indexOf("Mozilla") != -1) {
      $("#bootstrapjs")
      .attr(
          'integrity',
          'sha384-Tc5IQib027qvyjxsfHjOMaLkfuWVxZxUPnCJA7l2mCWNIpG9mGCD8wGNIcPD7Txa'
      );
  }

  $(".sessions-set").on('click', function(event) {
      InitSettings(
        $("#session-length"),
        $("#break-length")
      );
      if ($(this).hasClass('fa-check')) {
        $(this).removeClass('fa-check');
        $(this).addClass('fa-refresh');
        $(this).parent().find('.fa-remove').css('visibility', 'hidden');
      } else {
        $(this).removeClass('fa-refresh');
        $(this).addClass('fa-check');
        $(this).parent().find('.fa-remove').css('visibility', 'visible');
      }
    });

  $(".pom-sess").hover(function() {
      $(this).find('.col-xs-2').css('visibility', 'visible');
  }, function() {
      $(this).find('.col-xs-2').css('visibility', 'hidden');
  });

  $(".session-set").on('click', function(event) {
      event.preventDefault();
      if ($(this).hasClass('fa-check')) {
        InitDefault(
            $("#default-session"),
            $("#default-break")
        );
        $(this).removeClass('fa-check');
        $(this).addClass('fa-refresh');
        $(this).parent().find('.fa-plus').css('visibility', 'inherit');
      } else {
          $(this).removeClass('fa-refresh');
          $(this).addClass('fa-check');
          $(this).parent().find('.fa-plus').css('visibility', 'hidden');
      }
  });

  $(".progress").hover(function() {
    $(this).find('#message').css('visibility', 'visible');
  }, function() {
    $(this).find('#message').css('visibility', 'hidden');
  });
});

function InitSettings(val1, val2) {
    val1.val("25");
    val2.val("5");
}

function InitDefault(val1, val2) {
    val1.val("3");
    val2.val("1");
}
