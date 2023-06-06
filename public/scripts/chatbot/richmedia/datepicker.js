var hasData = false;

$(window).on('resize orientationchange', function(){
  $("#ui-datepicker-div").hide();

});
if(!iOS()) {
  $(window).scroll(function () {
    $("#ui-datepicker-div").hide();
  });

}


async function datePickerSpecificParser(message, index) {
  var template = `<br><center><input id='date-picker-${index}' style='width: 100%; position: relative; top: 7px!important;'' type='text' placeholder='MM/DD/YYYY' class='dates-picker' />
      &nbsp<button id='button-sumbit-${index}' style='position: relative; height: 23px; padding-top: 1px;' class='button-submit cx-submit cx-btn cx-btn-primary i18n'>SUBMIT</button></center>`;

  var dateToday = new Date();
  function isAvailable(date) {
    var dt = date.getFullYear();
    dt += "-" + (date.getMonth() + 1);
    dt += date.getDate() < 10 ? "-0" + date.getDate() : "-" + date.getDate();

    if (enabledDates.indexOf(dt) != -1) {
      return [true, "", ""];
    } else {
      return [false, "", ""];
    }
  }
  await setTimeout(() => {
    $("#cx-chat-index-" + index + " .cx-message-text").append(template);
    console.log(index);
    $("#date-picker-" + index).datepicker({
      changeMonth: true,
      changeYear: true,
      beforeShowDay: isAvailable,
    });
  }, 40);
  return `#date-picker-${index},#button-sumbit-${index}`;
}

async function datePickerDisableParser(message, index) {
  var template = ``;

  template = `<style='position: relative top: 5px!important;'>${message}</style>
              &nbsp;&nbsp;<center><input id='date-picker-${index}' style='width: 100%; position: relative; top: 0px!important;' type='text' placeholder='MM/DD/YYYY' oninput="this.value=this.value.replace(/([a-zA-Z0-9]+)/gi, '');" class='dates-picker' />
              &nbsp;<button id='button-sumbit-${index}' style='position: relative; top: -2px!important; height: 23px; padding-top: 1px;' class='button-submit cx-submit cx-btn cx-btn-primary i18n'>SUBMIT</button></center>
              

    `;

  var dateToday = new Date();

  await setTimeout(() => {
    $("#cx-chat-index-" + index + " .cx-message-text").html(null);
    $("#cx-chat-index-" + index + " .cx-message-text").html(template);
    $("#date-picker-" + index).datepicker({
      changeMonth: true,
      changeYear: true,
      minDate: dateToday,
      maxDate: new Date(2024, 11, 30),
    });
  }, 40);
  return `#date-picker-${index},#button-sumbit-${index}`;
}

async function datePickerParser(index, enabled) {
  var template = `<br><br><center><input id='date-picker-${index}' style='width: 100%; position: relative; text-align: center!important; top: 0px!important;' type='text' placeholder='MM/DD/YYYY'  class='dates-picker' /></center>
  <label class='form-label-dateError-${index}'' style='font-size: 10px; top: 0px; margin-bottom: 0; position: relative; color:red!important'>Please select a date</label>
  <center><button id='button-sumbit-${index}' style='position: relative; width: 200px;' class='button-submit cx-submit cx-btn cx-btn-primary i18n'>SUBMIT</button></center>`;

  function isAvailable(date) {
    var dt = date.getFullYear();
    dt += "-" + date.getMonth();
    dt += date.getDate() < 10 ? "-0" + date.getDate() : "-" + date.getDate();

    if (enabledDates.indexOf(dt) != -1) {
      return [true, "", ""];
    } else {
      return [false, "", ""];
    }
  }
  futureDates = enabledDates == null ? true : false;
  var dateToday = new Date();

  await setTimeout(() => {
    $("#cx-chat-index-" + index + " .cx-message-text").append(template);
    console.log(index);
    if (enabled) {
      if (futureDates) {
        $("#date-picker-" + index).datepicker({
          changeMonth: true,
          changeYear: true,
          minDate: new Date(),
          maxDate: "+14d",
        });

        $("#date-picker-" + index).inputmask({
          alias: "datetime",
          inputFormat: "mm/dd/yyyy",
          placeholder: "MM/DD/YYYY",
          // min: moment().format("MM/DD/YYYY"),
          // max: moment().add(14, "days").format("MM/DD/YYYY"),
        });
      } else {
        $("#date-picker-" + index).datepicker({
          changeMonth: true,
          changeYear: true,
          // beforeShowDay: isAvailable,
          minDate: new Date(),
          maxDate: "+14d",
        });

        $("#date-picker-" + index).inputmask({
          alias: "datetime",
          inputFormat: "mm/dd/yyyy",
          placeholder: "MM/DD/YYYY",
          // min: moment().format("MM/DD/YYYY"),
          // max: moment().add(14, "days").format("MM/DD/YYYY"),
        });
      }
    } else {
      $("#date-picker-" + index).datepicker({
        changeMonth: true,
        changeYear: true,
        maxDate: dateToday,
      });

      $("#date-picker-" + index).inputmask({
        alias: "datetime",
        inputFormat: "mm/dd/yyyy",
        placeholder: "MM/DD/YYYY",
        max: moment().format("MM/DD/YYYY"),
      });
    }

    $(`.form-label-dateError-${index}`).hide();
  }, 40);
  return `#date-picker-${index},#button-sumbit-${index}`;
}

async function datePickerProductParser(index) {
  var template = `<br><br><center><input id='date-picker-${index}' style='width: 100%; position: relative; text-align: center!important; top: 0px!important;'' type='text' placeholder='MM/DD/YYYY'  class='dates-picker' /></center>
  <label class='form-label-dateError-${index}' style='font-size: 10px; top: 0px; margin-bottom: 0; position: relative; color:red!important'>Please select a date</label>
  <br><center><button id='button-sumbit-${index}' style='position: relative; width: 200px;' class='button-submit cx-submit cx-btn cx-btn-primary i18n'>SUBMIT</button>
  <button id='button-skip-${index}' style='position: relative; width: 200px; margin-top: 8px;' class='button-skip cx-submit cx-btn cx-btn-primary i18n'>I'M NOT SURE</button></center>`;

  var dateToday = new Date();

  await setTimeout(() => {
    $("#cx-chat-index-" + index + " .cx-message-text").append(template);
    console.log(index);

    $("#date-picker-" + index).datepicker({
      changeMonth: true,
      changeYear: true,
      maxDate: dateToday,
      
    });

    $("#date-picker-" + index).inputmask({
      alias: "datetime",
      inputFormat: "mm/dd/yyyy",
      placeholder: "MM/DD/YYYY",
      max: moment().format("MM/DD/YYYY"),
    });

    $(`.form-label-dateError-${index}`).hide();
  }, 40);
  return `#date-picker-${index},#button-sumbit-${index},#button-skip-${index}`;
}


function formatDate(date) {
  var d = new Date(date),
    month = "" + (d.getMonth() + 1),
    day = "" + d.getDate(),
    year = d.getFullYear();

  if (month.length < 2) month = "0" + month;
  if (day.length < 2) day = "0" + day;

  return [month, day, year].join("/");
}

function changeFormat(date) {
  var dt = date.split("/");
  let month = dt[0];
  let day = dt[1];
  let year = dt[2];
  //dt += "-" + (date.getMonth());
  //dt += date.getDate() < 10 ? "-0" + date.getDate() : "-" + date.getDate();

  return year + "-" + month + "-" + day;
}
async function dateSender(value, index) {
  let val = $(`body ${value}`).val();

  if (formatDate(val) == "NaN/NaN/NaN") {
    hasData = false;
    $(`.form-label-dateError-${index}`).show();

    return;
  }
  $(`.form-label-dateError-${index}`).hide();
  //camTyping();
  hasData = true;

  console.log(formatDate(val));
  console.log("date sent");
  await setTimeout(() => {
    $(`#cx_input`).focus();
    $(`#cx_input`).val(formatDate(val));
    $(".cx-send").trigger("click");
  }, 50);
}

async function dateBookingSender(value, index) {
  let val = $(`body ${value}`).val();

  
  //camTyping();
  hasData = true;
  console.log(formatDate(val) + ":" + enabledDatesObj[changeFormat(val)]);

  
  await setTimeout(() => {
    $(`#cx_input`).focus();
    $(`#cx_input`).val(
      formatDate(val) + ":" + enabledDatesObj[changeFormat(val)]
    );
    $(".cx-send").trigger("click");
  }, 50);
}

async function dateTextsender(data, index) {
  await $(() => {
    var split = data.split(",");
    setTimeout(() => {
        for (var j = 0; j < split.length; j++) {
          $(".cx-send").on("keyup click", function (e) {
            $(`.form-label-dateError-${index}`).hide();
            $(`body .dates-picker`).prop("disabled", true);
            $(`body ${split[j]}`).prop("disabled", true);
          });
        }

      $(`body ${split[1]}`).click(() => {
        dateSender(split[0], index);
        if (hasData == true) {
          $(`body .dates-picker`).prop("disabled", true);
          $(`body ${split[1]}`).prop("disabled", true);
          $(`body ${split[1]}`).css("background", "#001871");
          $(`body ${split[1]}`).css("color", "#ffffff");
          $(`body ${split[1]}`).css("font-weight", "300");
          $(`body ${split[1]}`).css("pointer-events", "none");
        }
      });
    }, 40);
  });
  return await true;
}

async function dateTextBookingsender(data, index) {
  await $(() => {
    var split = data.split(",");
    setTimeout(() => {
      $(`body ${split[1]}`).click(() => {
        hideAdaptivecard = true;
        if (formatDate($(`body ${split[0]}`).val()) == "NaN/NaN/NaN") {
          hasData = false;
          $(`.form-label-dateError-${index}`).show();
          $(`.form-label-dateError-${index}`).html("Please select a date");
          return;
        }
        $(`.form-label-dateError-${index}`).hide();
        if(!futureDates && !enabledDates.includes(changeFormat($(`body ${split[0]}`).val()))){
          $(`.form-label-dateError-${index}`).show();
          $(`.form-label-dateError-${index}`).html('Sorry, provided date is not available. Please select the date available in calendar')
          return;
        }
        $(`.form-label-dateError-${index}`).hide();
        dateBookingSender(split[0], index);
        if (hasData == true) {
          $(`body .dates-picker`).prop("disabled", true);
          $(`body ${split[1]}`).prop("disabled", true);
          $(`body ${split[1]}`).css("background", "#001871");
          $(`body ${split[1]}`).css("color", "#ffffff");
          $(`body ${split[1]}`).css("font-weight", "300");
          $(`body ${split[1]}`).css("pointer-events", "none");
        }
      });
    }, 40);
  });

  return await true;
}

async function dateTextProductsender(data, index) {
  await $(() => {
    var split = data.split(",");
    setTimeout(() => {
      for (var j = 0; j < split.length; j++) {
        $(".cx-send").on("keyup click", function (e) {
          $(`.form-label-dateError-${index}`).hide();
          $(`body .dates-picker`).prop("disabled", true);
          $(`body ${split[j]}`).prop("disabled", true);
        });
      }

      $(`body ${split[1]}`).click(() => {
        dateSender(split[0], index);
        if (hasData == true) {
          $(`body .dates-picker`).prop("disabled", true);
          $(`body ${split[1]}`).prop("disabled", true);
          $(`body ${split[1]}`).css("background", "#001871");
          $(`body ${split[1]}`).css("color", "#ffffff");
          $(`body ${split[1]}`).css("font-weight", "300");
          $(`body ${split[1]}`).css("pointer-events", "none");

          $(`body ${split[2]}`).prop("disabled", true);

          $(`body ${split[2]}`).css("pointer-events", "none");
          $(`.form-label-dateError-${index}`).hide();

        }
      });

      $(`body ${split[2]}`).click(() => {
        $(`#cx_input`).focus();
        $(`#cx_input`).val("01/01/1900");
        $(".cx-send").trigger("click");
        $(`.form-label-dateError-${index}`).hide();
        $(`body .dates-picker`).prop("disabled", true);
        $(`body ${split[1]}`).prop("disabled", true);

        $(`body ${split[1]}`).css("pointer-events", "none");

        $(`body ${split[2]}`).prop("disabled", true);
        $(`body ${split[2]}`).css("background", "#001871");
        $(`body ${split[2]}`).css("color", "#ffffff");
        $(`body ${split[2]}`).css("font-weight", "300");
        $(`body ${split[2]}`).css("pointer-events", "none");
        hideAdaptivecard = true;
      });
    }, 40);
  });

  return await true;
}

function iOS() {
  return [
    'iPad Simulator',
    'iPhone Simulator',
    'iPod Simulator',
    'iPad',
    'iPhone',
    'iPod'
  ].includes(navigator.platform)
  // iPad on iOS 13 detection
  || (navigator.userAgent.includes("Mac") && "ontouchend" in document)
}

async function datePickerChangeDateParser(index) {
  var template = `
  <center><label style="font-size: 12px">Contact Details</label></center>
  <div class="row-change-date">
    <div>
      
      <input type='text' id='input-text1-${index}' style="width: 100%; height: 24px !important; font-weight: 400; font-size: 10px"  placeholder='John Doe' pattern="03\d{2}-\d{7}" class='input-text-name' value=${policyName}></input><br>
      <center><label class='form-label' style='font-size: 10px;margin-bottom: 5px;position: relative'>Name</label></center>
    </div>
    <div>
      <input type='email' id='input-text2-${index}' style="width: 100%; height: 24px !important; font-weight: 400; font-size: 10px"  placeholder='johndoe@gmail.com' pattern="03\d{2}-\d{7}"  class='input-text-email'></input><br>
      <center><label class='form-label' style='font-size: 10px;margin-bottom: 5px;position: relative'>Email</label></center>
    </div>
  </div>
  <center><label style="font-size: 12px">Policy Details</label></center>
  <div class="row-change-date" style="margin-top: -10px">
      <div class="radio-btn-row">
        <div class="radio-btn-wrapper">
          <button id='input-radio1-${index}' class="radio-btn" type="button" value="Travel Protection">Travel Protection</button>
        </div>
        <div class="radio-btn-wrapper">
          <button id="input-radio2-${index}" class="radio-btn" type="button" value=""Flight Guard>Flight <br>Guard</button>
        </div>
    </div>
    <br>
    <center><label class='form-label' style='font-size: 10px;margin-bottom: 1px;position: relative'>&nbsp;</label><center>
    <div>
      <input type='text' id='input-text3-${index}' style="width: 100%; height: 24px !important; font-weight: 400; font-size: 10px" placeholder='123456789' pattern="03\d{2}-\d{7}" class='input-text-email' value="${policyNumber}"></input><br>
      <center><label class='form-label' style='font-size: 10px;margin-bottom: 5px;position: relative'>Policy #</label><center>
    </div>
  </div>

  <div class="row-change-date">
    <div>
      <input type='text' id='input-text4-${index}' style="width: 100%; height: 24px !important; font-weight: 400; font-size: 10px" placeholder="No" pattern="03\d{2}-\d{7}"  class='input-text-name'></input><br>
      <center><label class='form-label' style='font-size: 10px;margin-bottom: 5px;position: relative'>Any Claim Raised?</label></center>
    </div>
    <div>
      <input id='date-picker1-${index}' style='margin-left: 16px;font-size: 10px; width: 90%; height: 24px !important; position: relative; text-align: center!important; top: 0px!important;'' type='text' placeholder='MM/DD/YYYY'  class='dates-picker' /><br>
      <center><label class='form-label' style='font-size: 10px;margin-bottom: 5px;position: relative'>Policy Effective Date</label></center>
    </div>
  
  
  </div>

  <div class="row-change-date">
    <div>
      <input id='date-picker2-${index}' style='margin-left: 2px;font-size: 10px;width: 90%; height: 24px !important; position: relative; text-align: center!important; top: 0px!important;'' type='text' placeholder='MM/DD/YYYY'  class='dates-picker' /><br>
      <center><label class='form-label' style='font-size: 10px;margin-bottom: 5px;position: relative'>Departure Date</label></center>
    </div>
    <div>
      <input type='text' id='input-text5-${index}' style="width: 100%; height: 24px !important; font-weight: 400; font-size: 10px"   pattern="03\d{2}-\d{7}"  class='input-text-name'></input><br>
      <center><label class='form-label' style='font-size: 10px;margin-bottom: 5px;position: relative'>Refund Reason</label></center>
    </div>
  </div>

  <br><center><button id='button-sumbit-${index}' style='position: relative; width: 200px;' class='button-submit cx-submit cx-btn cx-btn-primary i18n'>SUBMIT</button>
  </center>`;

  var dateToday = new Date();

  await setTimeout(() => {
    $("#cx-chat-index-" + index + " .cx-message-text").append(template);
    console.log(index);

    $("#date-picker1-" + index).datepicker({
      changeMonth: true,
      changeYear: true,
      maxDate: dateToday,
      
    });

    $("#date-picker2-" + index).datepicker({
      changeMonth: true,
      changeYear: true,
      maxDate: dateToday,
      
    });

    // $("#date-picker-" + index).inputmask({
    //   alias: "datetime",
    //   inputFormat: "mm/dd/yyyy",
    //   placeholder: "MM/DD/YYYY",
    // });

    $(`.form-label-dateError-${index}`).hide();

    $.each($('.radio-btn'), function(key, value) {
      $(this).click(function(e) {
        $('.radio-btn-selected')
          .removeClass('radio-btn-selected')
          .addClass('radio-btn');
    
        $(this)
          .removeClass('radio-btn')
          .addClass('radio-btn-selected');
    
        //do whatever you want on click
      });
    });
  }, 40);
  return `#input-text1-${index},#input-text2-${index},#input-text3-${index},#input-text4-${index},#input-text5-${index},#date-picker1-${index},#date-picker2-${index},#input-radio1-${index},#input-radio2-${index},#button-sumbit-${index}`;
}

async function datePickerChangeDateSender(data, index) {
  await $(() => {
    var split = data.split(",");
    setTimeout(() => {
      for (var j = 0; j < split.length; j++) {
        $(".cx-send").on("keyup click", function (e) {
          $(`.form-label-dateError-${index}`).hide();
          $(`body .dates-picker`).prop("disabled", true);
          $(`body ${split[j]}`).prop("disabled", true);
        });
      }

      $(`body ${split[1]}`).click(() => {
        dateSender(split[0], index);
        if (hasData == true) {
          $(`body .dates-picker`).prop("disabled", true);
          $(`body ${split[1]}`).prop("disabled", true);
          $(`body ${split[1]}`).css("background", "#001871");
          $(`body ${split[1]}`).css("color", "#ffffff");
          $(`body ${split[1]}`).css("font-weight", "300");
          $(`body ${split[1]}`).css("pointer-events", "none");

          $(`body ${split[2]}`).prop("disabled", true);

          $(`body ${split[2]}`).css("pointer-events", "none");
          $(`.form-label-dateError-${index}`).hide();

        }
      });

      $(`body ${split[9]}`).click(() => {
        let allValues =
          $(`body ${split[0]}`).val() +
          "|" +
          $(`body ${split[1]}`).val() +
          "|" +
          $(`.radio-btn-selected`).val() +
          "|" +
          $(`body ${split[2]}`).val() +
          "|" +
          $(`body ${split[3]}`).val() +
          "|" +
          $(`body ${split[4]}`).val() +
          "|" +
          $(`body ${split[5]}`).val() +
          "|" +
          $(`body ${split[6]}`).val() +
          "|" +
          "SUBMIT"; 
        $(`#cx_input`).focus();
        $(`#cx_input`).val(allValues);
        
        console.log(allValues)
        $(".cx-send").trigger("click");
        $(`.form-label-dateError-${index}`).hide();
        $(`body .dates-picker`).prop("disabled", true);
        $(`body ${split[1]}`).prop("disabled", true);

        $(`body ${split[1]}`).css("pointer-events", "none");

        $(`body ${split[9]}`).prop("disabled", true);
        $(`body ${split[9]}`).css("background", "#001871");
        $(`body ${split[9]}`).css("color", "#ffffff");
        $(`body ${split[9]}`).css("font-weight", "300");
        $(`body ${split[9]}`).css("pointer-events", "none");
        hideAdaptivecard = true;
      });
    }, 40);
  });

  return await true;
}
