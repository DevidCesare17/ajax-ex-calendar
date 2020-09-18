$(document).ready(function(){

  dateJanuary();

  var endpoint = "https://flynn.boolean.careers/exercises/api/holidays?year=2018&month=0";
  $.ajax(
    {
      "url" : endpoint,
      "data" : {
        "year" : 2018,
        "month" : 0
      },
      "method" : "GET",
      "success" : function(data, response) {
        checkHoliday(data.response);
      },
      "error" : function(error) {
        alert("Errore!");
      }
    }
  );
});

function dateJanuary() {
  var date = "2018-01-01";
  var formatDate = moment(date);

  var source = $("#day_template").html();
  var template = Handlebars.compile(source);

  for (var i = 1; i <= formatDate.daysInMonth(); i++) {
    var day = zeroPlus(i);
    var  fullDate = formatDate.format("YYYY") + "-" + formatDate.format("MM") + "-" + day;
    var context = {
      "day" : i,
      "month" : formatDate.format("MMMM"),
      "fullDate" : fullDate
    };

    var html = template(context);
    $("#day_list").append(html);
  }
}
function zeroPlus(day) {
  if (day < 10) {
    return "0" + day;
  } else {
    return day;
  }
}


function checkHoliday(festa) {
  if(festa.length > 0) {
    for (var i = 0; i < festa.length; i++) {
      var holidayDate = festa[i].date;
      var holidayName = festa[i].name;
      $(".day_wrtn[data-yyyymmdd='"+holidayDate+"']").addClass("holiday");
      $(".day_wrtn[data-yyyymmdd='"+holidayDate+"'] .holiday_wrtn").text(" - " + holidayName);
    }
  }
}
