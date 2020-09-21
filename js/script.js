$(document).ready(function(){

  var day = 1;
  var month = 0;
  var date = "2018" + month + day;
  var formatDate = moment(date);
  allCalendar(formatDate, month);
  tempCalendar(formatDate);

  var nextMonth = $("div.next");
  nextMonth.click(
    function() {
      month += 1;
      allCalendar(formatDate, month);
      tempCalendar(formatDate);
      console.log(month);
    }
  );

});

function allCalendar(fd, month) {
  var endpoint = "https://flynn.boolean.careers/exercises/api/holidays?year=2018&month='"+month+"'";
  $.ajax(
    {
      "url" : endpoint,
      "data" : {
        "year" : 2018,
        "month" : month
      },
      "method" : "GET",
      "success" : function(data, response) {
        var dataResponse = data.response;
        console.log(dataResponse);
        if(dataResponse.length > 0) {
          for (var i = 0; i < dataResponse.length; i++) {
            var holidayDate = dataResponse[i].date;
            var holidayName = dataResponse[i].name;
            var templateSubscribe = $(".day_wrtn[data-yyyymmdd='"+holidayDate+"']");
            templateSubscribe.addClass("holiday");
            templateSubscribe.children(".holiday_wrtn").text(" - " + holidayName);
          }
        }
      },
      "error" : function(error) {
        alert("Errore!");
      }
    }
  );
}

function tempCalendar(fd) {
  $("h1").html("");
  $("h1").text(fd.format("MMMM YYYY"));
  $("#day_list").html("");

  var source = $("#day_template").html();
  var template = Handlebars.compile(source);

  for (var i = 1; i <= fd.daysInMonth(); i++) {
    var day = zeroPlus(i);
    var  fullDate = fd.format("YYYY") + "-" + fd.format("MM") + "-" + day;
    var context = {
      "day" : i,
      "month" : fd.format("MMMM"),
      "fullDate" : fullDate
    };
    var html = template(context);
    $("#day_list").append(html);
  }
}

function zeroPlus(number) {
  if (number < 10) {
    return "0" + number;
  } else {
    return number;
  }
}
