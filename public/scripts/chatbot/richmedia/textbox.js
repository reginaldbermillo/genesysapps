// PHONE NUMBER

async function inputTextNumberTagParser(index, label) {

  var template = `<br><br><label class='form-label' style='font-size: 12px;margin-bottom: 5px;position: relative'>Phone Number</label>
                    <br><input type='text' style="width: 100%; font-weight: 400; font-size: 14px" id='input-text-${index}' placeholder='123-456-7890' pattern="03\d{2}-\d{7}" maxlength="12" class='input-text-number'></input>
                     <br><label class='form-label-phoneNumber-${index}' style='font-size: 10px;margin-bottom: 5px;position: relative; color:red!important'>Please enter your phone number.</label>
                     <br><center><button id='button-sumbit-${index}' style='width: 200px' class='button-submit cx-submit cx-btn cx-btn-primary i18n'>SUBMIT</button></center>
                    <center><button id='button-dontknow-${index}' style='width: 200px; margin-top: 6px;' class='button-dontknow cx-dontknow cx-btn cx-btn-primary i18n'>I'M NOT SURE</button></center>`;

  setTimeout(() => {
    $("#cx-chat-index-" + index + " .cx-message-text").append(template);
    $(`.form-label-phoneNumber-${index}`).hide();
    $(`#input-text-${index}`).on("input", function (e) {
      let pattern = /([^-+0-9]+)/gi;

      if (pattern.test($(this).val())) {
        $(this).val(
          $(this)
            .val()
            .replace(/([^-+0-9]+)/gi, "")
        );
        $(`.form-label-phoneNumber-${index}`).show();
        $(".form-label-phoneNumber").html("Please input numbers only");
      } else {
        $(`.form-label-phoneNumber-${index}`).hide();
      }
    });
    $(`#input-text-${index}`).bind("paste", function (e) {
      var data = e.originalEvent.clipboardData.getData("Text");
      let pattern = /^\d{3}-\d{3}-\d{4}$/gm;
      let pattern2 = /([^-+0-9]+)/gi;
      let split1 = data.substr(0, 3);
      let split2 = data.substr(3, 3);
      let split3 = data.substr(6, 4);
      setTimeout(function () {
        $(`#input-text-${index}`).val(split1 + "-" + split2 + "-" + split3);
        if (pattern.test($(`#input-text-${index}`).val())) {
          $(`.form-label-phoneNumber-${index}`).hide();
        } else if (!pattern2.test($(`#input-text-${index}`).val())) {
          $(`#input-text-${index}`).val(data);
          console.log("1");
        } else {
          $(`#input-text-${index}`).val("");
          $(`.form-label-phoneNumber-${index}`).show();
          $(`.form-label-phoneNumber-${index}`).html("Please input numbers only");
          console.log("2");
        }
      }, 100);
    });
  }, 40);
  return `#input-text-${index},#button-sumbit-${index},#button-dontknow-${index}`;
}

async function inputTextNumberSender(data, index) {
  await $(() => {
    var split = data.split(",");
    function addHyphen() {
      if ($(`body ${split[0]}`).val().length < 10) {
        let val = $(`body ${split[0]}`).val().split("-").join(""); //s Remove dash (-) if mistakenly entered.
        let finalVal = val.match(/.{1,3}/g).join("-"); // Add (-) after 3rd every char.
        $(`body ${split[0]}`).val(finalVal); // Update the input box.
      }
    }

    function disableButton() {
      $(`body .input-text-number`).prop("disabled", true);

      for (var i = 0; i < split.length; i++) {
        $(`body ${split[i]}`).prop("disabled", true);
        $(`body .button-submit`).css("pointer-events", "none");
        $(`body .button-dontknow`).css("pointer-events", "none");
      }
    }
    for (var j = 0; j < split.length; j++) {
      $(".cx-send").on("keyup click", function (e) {
        disableButton();
        $(`.form-label-phoneNumber-${index}`).hide();

      });
    }
    setTimeout(() => {


      $(`body ${split[0]}`).on("keyup", (e) => {
        if (e.keyCode === 13) {
          inputNumberSender(split[0], index);
          $(`.form-label-phoneNumber-${index}`).hide();

        }
      });

      $(`body ${split[1]}`).click(() => {
        submitBtn1 = split[1];
        inputNumberSender(split[0], index);
   
      });

      $(`body ${split[2]}`).click(() => {
        setTimeout(() => {
          $(`#cx_input`).focus();
          $(`#cx_input`).val("I'M NOT SURE");
          $(".cx-send").trigger("click");
          $(`.form-label-phoneNumber-${index}`).hide();

        }, 50);
        $(`body ${split[2]}`).css("background", "#1352de");
        $(`body ${split[2]}`).css("color", "#ffffff");
        $(`body ${split[2]}`).css("font-weight", "600");
      });
    }, 80);
  });

  return await true;
}

async function inputNumberSender(value, index) {
  let val = $(`body ${value}`).val();

  if (val == "" || val.length < 12) {
    $(`.form-label-phoneNumber-${index}`).html("Please enter your phone number.");
    $(`.form-label-phoneNumber-${index}`).show();
  } else {
    camTyping();
    $(`.form-label-phoneNumber-${index}`).hide();
    await setTimeout(() => {
      $(`body ${submitBtn1}`).css("background", "#1352de");
      $(`body ${submitBtn1}`).css("color", "#ffffff");
      $(`body ${submitBtn1}`).css("font-weight", "600");
      $(`#cx_input`).focus();
      $(`#cx_input`).val(val);
      $(".cx-send").trigger("click");
    }, 50);
  }
}


async function inputAuthenticationBookingParser(index, label) {

  var template = `  <br><br>
                    <label class='form-label' style='font-size: 12px;margin-bottom: 5px;position: relative'>Policy Number</label>
                    
                    <br>
                    <input type='text' id='input-text-${index}' style="width: 86%; font-weight: 400; font-size: 14px"  placeholder='Input Policy Number' pattern="03\d{2}-\d{7}"  class='input-text-address'></input>
                    <br><label class='form-label-address-${index}' style='font-size: 10px;margin-bottom: 5px;position: relative; color:red!important'>Please enter your policy number.</label>
                    <br><label class='form-label' style='font-size: 12px;margin-bottom: 5px;position: relative'>Booking Number</label>
                    <br><input type='text' id='input-text2-${index}' style="width: 100%; font-weight: 400; font-size: 14px" placeholder='Input Booking Number' class='input-text-zip'></input>
                    <br><label class='form-label-zip-${index}' style='font-size: 10px;margin-bottom: 5px;position: relative; color:red!important'>Please enter your booking number.</label>
                    
                    <br><label class='form-label' style='font-size: 12px;margin-bottom: 5px;position: relative'>Traveler's Last Name</label>
                    <br><input type='text' id='input-text2-${index}' style="width: 100%; font-weight: 400; font-size: 14px" placeholder='Input Last Name' class='input-text-zip'></input>
                    <br><label class='form-label-zip-${index}' style='font-size: 10px;margin-bottom: 5px;position: relative; color:red!important'>Please enter your last name.</label>
                    <br><center><button id='button-sumbit-${index}' style='width: 200px' class='button-submit cx-submit cx-btn cx-btn-primary i18n'>SUBMIT</button>
                    <button id='button-claim-info-${index}' style='width: 200px' class='button-submit cx-submit cx-btn cx-btn-primary i18n'>I DON'T HAVE IT</button>
                    </center>`;
  setTimeout(() => {
    $("#cx-chat-index-" + index + " .cx-message-text").append(template);
    $(`.form-label-address-${index}`).hide();
    $(`.form-label-zip-${index}`).hide();

    $(`#input-uc-${index}`).keydown(function(e) {
      var oldvalue=$(this).val();
      var field=this;
      setTimeout(function () {
          if(field.value.indexOf('UC') !== 0) {
              $(field).val(oldvalue);
          } 
      }, 1);

      var key = e.which;
      if ( key > 57) {
          e.preventDefault();
      } else if (key < 48) {
          if (key != 8 && key != 9 && key != 37 && key != 39 ) {
              e.preventDefault();
          }
      }
  });
  

  $(`#input-text2-${index}`).on('input', function(e) {
    var key = e.which;

    var c = this.selectionStart,
        r = /[^a-z0-9\b ]/gi,
        v = $(this).val();
    if(r.test(v)) {
      $(this).val(v.replace(r, ''));
      c--;
    }
    this.setSelectionRange(c, c);

    if($(this).val().length >= 50) {
      $(this).val($(this).val().slice(0, 50));
      return false;
  }
  });
    $(`#input-text-${index}`).on("input", function (e) {
      let pattern = /([^0-9]+)/gi;

      if (pattern.test($(this).val())) {
        $(this).val(
          $(this)
            .val()
            .replace(/([^0-9]+)/gi, "")
        );
        $(`.form-label-address-${index}`).show();
        $(`.form-label-address-${index}`).html("Please input numbers only.");
      } else {
        $(`.form-label-address-${index}`).hide();
      }

      if($(this).val().length >= 10) {
        $(this).val($(this).val().slice(0, 10));
        return false;
    }

    });

    $(`#tooltip-claim-${index}`).on("click", function(e){
      $('.claim-info-window').css("display", "block");
      $('.cx-webchat div.cx-input-container').css("z-index", 0);
      if(/iPhone|Mac|iPad|iPod/i.test(navigator.userAgent)){
        $('.claim-info-window').css("right", '4%');
      } else if (/Android/i.test(navigator.userAgent)){
        $('.claim-info-window').css("right", '1%');
      }
    })

    $(`#button-claim-info-${index}`).on("click", function(e){
      $('.claim-info-window').css("display", "block");
      $('.cx-webchat div.cx-input-container').css("z-index", 0);
      if(/iPhone|Mac|iPad|iPod/i.test(navigator.userAgent)){
        $('.claim-info-window').css("right", '4%');

      } else if (/Android/i.test(navigator.userAgent)){
        $('.claim-info-window').css("right", '1%');
      }
    })

  }, 40);
  return `#input-text-${index},#button-sumbit-${index},#input-text2-${index},#input-uc-${index},#button-claim-info-agent${index}`;
}

// LAST NAME and CLAIM NUMBER
async function inputClaimLastnameTagParser(index, label) {

  var template = `  <br><br>
                    <label class='form-label' style='font-size: 12px;margin-bottom: 5px;position: relative'>Claim Number</label>
                    <span data-text="Please enter your 10 digits claim number" id="tooltip-claim-${index}" class="tooltip-claim">How do I find my claim number?<i class="fa-solid fa-circle-info"></i></span>
                    <br>
                    <input type='text' id='input-uc-${index}' style="pointer-events: none; width: 12%; text-align: center; font-weight: 800; font-size: 12px"  value='UC' class='input-text-uc'></input>
                    <input type='text' id='input-text-${index}' style="width: 86%; font-weight: 400; font-size: 14px"  placeholder='Input Claim Number' pattern="03\d{2}-\d{7}"  class='input-text-address'></input>
                    <br><label class='form-label-address-${index}' style='font-size: 10px;margin-bottom: 5px;position: relative; color:red!important'>Please enter your claim number.</label>
                    <br><label class='form-label' style='font-size: 12px;margin-bottom: 5px;position: relative'>Last Name</label>
                    <br><input type='text' id='input-text2-${index}' style="width: 100%; font-weight: 400; font-size: 14px" placeholder='Input Last Name' class='input-text-zip'></input>
                    <br><label class='form-label-zip-${index}' style='font-size: 10px;margin-bottom: 5px;position: relative; color:red!important'>Please enter your last name.</label>
                    <br><center><button id='button-sumbit-${index}' style='width: 200px' class='button-submit cx-submit cx-btn cx-btn-primary i18n'>FIND CLAIM</button>
                    <button id='button-claim-info-${index}' style='width: 200px' class='button-submit cx-submit cx-btn cx-btn-primary i18n'>CAN'T FIND CLAIM NUMBER</button>
                    <button id='button-claim-info-agent${index}' style='width: 200px' class='button-submit cx-submit cx-btn cx-btn-primary i18n'>NEED MORE HELP</button></center>
    `;


  setTimeout(() => {
    $("#cx-chat-index-" + index + " .cx-message-text").append(template);
    $(`.form-label-address-${index}`).hide();
    $(`.form-label-zip-${index}`).hide();

    $(`#input-uc-${index}`).keydown(function(e) {
      var oldvalue=$(this).val();
      var field=this;
      setTimeout(function () {
          if(field.value.indexOf('UC') !== 0) {
              $(field).val(oldvalue);
          } 
      }, 1);

      var key = e.which;
      if ( key > 57) {
          e.preventDefault();
      } else if (key < 48) {
          if (key != 8 && key != 9 && key != 37 && key != 39 ) {
              e.preventDefault();
          }
      }
  });
  

  $(`#input-text2-${index}`).on('input', function(e) {
    var key = e.which;

    var c = this.selectionStart,
        r = /[^a-z0-9\b ]/gi,
        v = $(this).val();
    if(r.test(v)) {
      $(this).val(v.replace(r, ''));
      c--;
    }
    this.setSelectionRange(c, c);

    if($(this).val().length >= 50) {
      $(this).val($(this).val().slice(0, 50));
      return false;
  }
  });
    $(`#input-text-${index}`).on("input", function (e) {
      let pattern = /([^0-9]+)/gi;

      if (pattern.test($(this).val())) {
        $(this).val(
          $(this)
            .val()
            .replace(/([^0-9]+)/gi, "")
        );
        $(`.form-label-address-${index}`).show();
        $(`.form-label-address-${index}`).html("Please input numbers only.");
      } else {
        $(`.form-label-address-${index}`).hide();
      }

      if($(this).val().length >= 10) {
        $(this).val($(this).val().slice(0, 10));
        return false;
    }

    });

    $(`#tooltip-claim-${index}`).on("click", function(e){
      $('.claim-info-window').css("display", "block");
      $('.cx-webchat div.cx-input-container').css("z-index", 0);
      if(/iPhone|Mac|iPad|iPod/i.test(navigator.userAgent)){
        $('.claim-info-window').css("right", '4%');
      } else if (/Android/i.test(navigator.userAgent)){
        $('.claim-info-window').css("right", '1%');
      }
    })

    $(`#button-claim-info-${index}`).on("click", function(e){
      $('.claim-info-window').css("display", "block");
      $('.cx-webchat div.cx-input-container').css("z-index", 0);
      if(/iPhone|Mac|iPad|iPod/i.test(navigator.userAgent)){
        $('.claim-info-window').css("right", '4%');

      } else if (/Android/i.test(navigator.userAgent)){
        $('.claim-info-window').css("right", '1%');
      }
    })

  }, 40);
  return `#input-text-${index},#button-sumbit-${index},#input-text2-${index},#input-uc-${index},#button-claim-info-agent${index}`;
}

async function inputDocumentStatusListParser(data, index) {

  let splitList = data.split('\n');
  let optionBuilder = '';
  var html = '';
  console.log(splitList)
  html += `<ul id="document-list" class='list-${index}'><h6 class="list-title">Required Documents</h6>`
  await _.forEach(splitList, (data) => {
    let title = data.trim().split('--')[0];
    let name = data.trim().split('--')[1];
    let status = data.trim().split('--')[2];
    optionBuilder += `<li><h6>${title}</h6><div><p>${name}</p><p>${status}</p></div></li>`
  })
  html += optionBuilder;
  html += `</ul>`
  setTimeout(() => {
    $("#cx-chat-index-" + index + " .cx-message-text").append(html);

  }, 40);
  return `#input-text-${index},#button-sumbit-${index},#input-text2-${index},#button-claim-info-agent${index}`;
}

async function inputDocumentStatusTableParser(data, index) {
  let str = data.trim().substring(0, data.length - 2);
  let splitList = str.split(',');
  let optionBuilder = '';
  var html = '';
  console.log(splitList)
  html += `<h6 class="document-table-header">Let me help you with that. <br/>Please find the current status of your documents here:</h6><table id="document-table">
              <tr>
                <th>No</th>
                <th>Name</th>
                <th>Status</th>
              </tr>
            <tbody>`
  await _.forEach(splitList, (data) => {
    let title = data.trim().split('|')[0];
    let name = data.trim().split('|')[1];
    let status = data.trim().split('|')[2];
    optionBuilder += `<tr><td style="text-align: center;">${title}</td><td>${name}</td><td style="text-align: center;">${status}</td></tr>`
  })
  html += optionBuilder;
  html += `</table>`
  setTimeout(() => {
    $("#cx-chat-index-" + index + " .cx-message-text").append(html);

  }, 40);
  return `#input-text-${index},#button-sumbit-${index},#input-text2-${index}`;
}

async function inputClaimLastnameSender(data, index) {
  await $(() => {
    var split = data.split(",");
    //console.log(index)
    function addHyphen() {
      if ($(`body ${split[0]}`).val().length < 10) {
        let val = $(`body ${split[0]}`).val().split("-").join(""); //s Remove dash (-) if mistakenly entered.
        let finalVal = val.match(/.{1,3}/g).join("-"); // Add (-) after 3rd every char.
        $(`body ${split[0]}`).val(finalVal); // Update the input box.
      }
    }

    function disableButton() {
      $(`body .input-text-address`).prop("disabled", true);

      for (var i = 0; i < split.length; i++) {
        $(`body ${split[i]}`).prop("disabled", true);
        $(`body .button-submit`).css("pointer-events", "none");
        $(`body .button-dontknow2`).css("pointer-events", "none");
      }
    }
    for (var j = 0; j < split.length; j++) {
      $(".cx-send").on("keyup click", function (e) {
        disableButton();
        $(`.form-label-zip-${index}`).hide();
        $(`.form-label-address-${index}`).hide();
      });
    }
    setTimeout(() => {


      $(`body ${split[0]}`).on("keyup", (e) => {
        if (e.keyCode === 13) {
          inputClaimLastname(split[0], index);
        }
      });


      $(`body ${split[1]}`).click(() => {
        
        submitBtn2 = split[1];
        inputClaimLastname(split[0], split[2], index);
        findClaimResponse = true;
        
      });
      
      $(`body ${split[4]}`).click(() => {
        $(`body ${split[4]}`).css("background", "#1352de");
        $(`body ${split[4]}`).css("color", "#ffffff");
        $(`body ${split[4]}`).css("font-weight", "600");
        sender("NEED MORE HELP");
        disableButton();
        claimStatusAgentResponse = true;
      });

      $(`body ${split[2]}`).on("keyup", (e) => {
        if (e.keyCode === 13) {

        $(`body ${split[1]}`).click();
      }
      });


    }, 80);
  });

  return await true;
}

async function inputClaimLastname(value1, value2, index) {
  let val1 = $(`body ${value1}`).val();
  let val2 = $(`body ${value2}`).val();
  console.log(index)
  if (val1 == "" && val2 == "") {
    $(`.form-label-address-${index}`).show();
    $(`.form-label-address-${index}`).html("Please enter your claim number.");
    $(`.form-label-zip-${index}`).html("Please enter your last name.");
    $(`.form-label-zip-${index}`).show();
  } else if (val1 == "") {
    $(`.form-label-address-${index}`).show();
    $(`.form-label-address-${index}`).html("Please enter your claim number.");
  }else if (val1.length < 9) {
    $(`.form-label-address-${index}`).show();
    $(`.form-label-address-${index}`).html("Claim number entered is invalid.");
  }  else if (val2 == "") {
    $(`.form-label-zip-${index}`).html("Please enter your last name.");
    $(`.form-label-zip-${index}`).show();
  } else {
    camTyping();
    $(`.form-label-address-${index}`).hide();
    $(`.form-label-zip-${index}`).hide();
    await setTimeout(() => {
      $(`body ${submitBtn2}`).css("background", "#1352de");
      $(`body ${submitBtn2}`).css("color", "#ffffff");
      $(`body ${submitBtn2}`).css("font-weight", "600");
      $(`#cx_input`).focus();
      $(`#cx_input`).val(`UC${val1}|${val2}`);
      $(".cx-send").trigger("click");
    }, 50);
  }
}



async function inputAddressSender(value1, value2, index) {
  let val1 = $(`body ${value1}`).val();
  let val2 = $(`body ${value2}`).val();
  console.log(index)
  if (val1 == "" && val2 == "") {
    $(`.form-label-address-${index}`).show();
    $(`.form-label-address-${index}`).html("Please enter your street number.");
    $(`.form-label-zip-${index}`).html("Please enter your zip code.");
    $(`.form-label-zip-${index}`).show();
  } else if (val1 == "") {
    $(`.form-label-address-${index}`).show();
    $(`.form-label-address-${index}`).html("Please enter your street number.");
  } else if (val2 == "") {
    $(`.form-label-zip-${index}`).html("Please enter your zip code.");
    $(`.form-label-zip-${index}`).show();
  } else {
    camTyping();
    $(`.form-label-address-${index}`).hide();
    $(`.form-label-zip-${index}`).hide();
    await setTimeout(() => {
      $(`body ${submitBtn2}`).css("background", "#1352de");
      $(`body ${submitBtn2}`).css("color", "#ffffff");
      $(`body ${submitBtn2}`).css("font-weight", "600");
      $(`#cx_input`).focus();
      $(`#cx_input`).val(`${val1}|${val2}`);
      $(".cx-send").trigger("click");
    }, 50);
  }
}

async function inputTextZipTagParser(index, label) {
  var html = ``;

  var template = `  <style='font-size: 12px;margin-bottom: 5px;position: relative'>${label}</label>
                    <br><br><input type='text' id='input-text-${index}' placeholder='71601' pattern="03\d{2}-\d{7}" maxlength="12" oninput="this.value=this.value.replace(/([^-+0-9]+)/gi, '');" class='input-text-zip'></input>
                     <br><label class='form-label-zip' style='font-size: 10px;margin-bottom: 5px;position: relative; color:red!important'>Please enter your zip code.</label>
                     <br><center><button id='button-sumbit-${index}' style='width: 200px' class='button-submit cx-submit cx-btn cx-btn-primary i18n'>SUBMIT</button></center>
    `;

  setTimeout(() => {
    $("#cx-chat-index-" + index + " .cx-message-text").html(null);
    $("#cx-chat-index-" + index + " .cx-message-text").html(html);
    $("#cx-chat-index-" + index + " .cx-message-text").append(template);
    $(".form-label-zip").hide();
  }, 40);
  return `#input-text-${index},#button-sumbit-${index}`;
}

async function inputTextZipSender(data) {
  await $(() => {
    var split = data.split(",");
    function addHyphen() {
      if ($(`body ${split[0]}`).val().length < 10) {
        let val = $(`body ${split[0]}`).val().split("-").join(""); //s Remove dash (-) if mistakenly entered.
        let finalVal = val.match(/.{1,3}/g).join("-"); // Add (-) after 3rd every char.
        $(`body ${split[0]}`).val(finalVal); // Update the input box.
      }
    }

    function disableButton() {
      $(`body .input-text-zip`).prop("disabled", true);

      for (var i = 0; i < split.length; i++) {
        $(`body ${split[i]}`).prop("disabled", true);
        $(`body .button-submit`).css("pointer-events", "none");
        $(`body .button-submit`).css("background", "#1352de");
        $(`body .button-submit`).css("color", "#ffffff");
        $(`body .button-submit`).css("font-weight", "600");
      }
    }
    for (var j = 0; j < split.length; j++) {
      $(".cx-send").on("keyup click", function (e) {
        disableButton();
      });
    }
    setTimeout(() => {


      $(`body ${split[0]}`).on("keyup", (e) => {
        if (e.keyCode === 13) {
          inputZipSender(split[0]);
        }
      });

      $(`body ${split[1]}`).click(() => {
        inputZipSender(split[0]);
      });
    }, 80);
  });

  return await true;
}

async function inputZipSender(value) {
  let val = $(`body ${value}`).val();

  if (val == "") {
    $(".form-label-zip").show();
  } else {
    camTyping();
    $(".form-label-zip").hide();
    await setTimeout(() => {
      $(`#cx_input`).focus();
      $(`#cx_input`).val(val);
      $(".cx-send").trigger("click");
    }, 50);
  }
}

// CONTRACT AND CLAIM NUMBER

async function inputTextClaimandContractTagParser(index, label) {
  var html = ``;

  var template = `<label class='form-label' style='font-size: 12px;margin-bottom: 5px;position: relative'>${label}</label>
                    <br><input type='text' id='input-text-${index}' placeholder='12345'  maxlength="5" oninput="this.value=this.value.replace(/[^0-9]/g,'');" class='input-text'></input>
                    <br><label class='form-label-claimandContract' style='font-size: 10px;margin-bottom: 5px;position: relative; color:red!important'>Please enter 5-digit number</label>
                    <br><button id='button-sumbit-${index}' class='button-submit cx-submit cx-btn cx-btn-primary i18n'>SUBMIT</button>
    `;

  setTimeout(() => {
    $("#cx-chat-index-" + index + " .cx-message-text").html(null);
    $("#cx-chat-index-" + index + " .cx-message-text").html(html);
    $("#cx-chat-index-" + index + " .cx-message-text").append(template);
    $(".form-label-claimandContract").hide();
  }, 40);
  return `#input-text-${index},#button-sumbit-${index}`;
}

async function inputTextclaimandContractsender(data) {
  await $(() => {
    var split = data.split(",");
    function disableButton() {
      for (var i = 0; i < split.length; i++) {
        $(`body ${split[i]}`).prop("disabled", true);
        $(`body .button-submit`).css("pointer-events", "none");
        $(`body .button-submit`).css("background", "#1352de");
        $(`body .button-submit`).css("color", "#ffffff");
        $(`body .button-submit`).css("font-weight", "600");
      }
    }
    for (var j = 0; j < split.length; j++) {
      $(".cx-send").on("keyup click", function (e) {
        disableButton();
      });
    }
    setTimeout(() => {
      $(`body ${split[0]}`).on("keyup", (e) => {
        if (e.keyCode === 13) {
          inputClaimandContractSender(split[0]);
          disableButton();
        }
      });

      $(`body ${split[1]}`).click(() => {
        inputClaimandContractSender(split[0]);
        // disableButton()
      });
    }, 80);
  });

  return await true;
}

async function inputClaimandContractSender(value, index) {
  let val = $(`body ${value}`).val();

  if (val == "" || val.length < 5) {
    $(".form-label-claimandContract").show();
  } else {
    camTyping();

    await setTimeout(() => {
      $(`#cx_input`).focus();
      $(`#cx_input`).val(val);
      $(".cx-send").trigger("click");
      $(".form-label-claimandContract").hide();
    }, 50);
  }
}

//// EMAIL ADDRESS

async function inputTextEmailTagParser(index, label) {
  var html = ``;

  var template = `<label style='font-size: 12px;margin-bottom: 5px;position: relative;'>${label}</label>
                  <br><br><center><input type='email' id='input-text-${index}' class='input-text' placeholder='abc@email.com' style='width: 100%'></center>
                  <label class='form-label-email' style='font-size: 10px;margin-bottom: 5px;position: relative;color:red!important'>Please enter the correct email address</label>
                  <br><center><button id='button-sumbit-${index}' style='position: relative;top: 0px; width: 200px' class='button-submit cx-submit cx-btn cx-btn-primary i18n'>SUBMIT</button></center>
    `;

  setTimeout(() => {
    $("#cx-chat-index-" + index + " .cx-message-text").html(null);
    $("#cx-chat-index-" + index + " .cx-message-text").html(html);
    $("#cx-chat-index-" + index + " .cx-message-text").append(template);
    $(".form-label-email").hide();
  }, 40);
  return `#input-text-${index},#button-sumbit-${index}`;
}

async function inputEmailSender(value, index) {
  let val = $(`body ${value}`).val();
  var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

  if (val == "" || !val.match(mailformat)) {
    $(".form-label-email").show();
    return;
  } else {
    camTyping();

    await setTimeout(() => {
      $(`#cx_input`).focus();
      $(`#cx_input`).val(val);
      $(".cx-send").trigger("click");
      $(".form-label-email").hide();
    }, 50);
  }
}

async function inputTextEmailSender(data) {
  await $(() => {
    var split = data.split(",");
    function disableButton() {
      for (var i = 0; i < split.length; i++) {
        $(`body ${split[i]}`).prop("disabled", true);
        $(`body .button-submit`).css("pointer-events", "none");
        $(`body .button-submit`).css("background", "#1352de");
        $(`body .button-submit`).css("color", "#ffffff");
        $(`body .button-submit`).css("font-weight", "600");
      }
    }
    for (var j = 0; j < split.length; j++) {
      $(".cx-send").on("keyup click", function (e) {
        disableButton();
      });
    }
    setTimeout(() => {
      $(`body ${split[0]}`).on("keyup", (e) => {
        if (e.keyCode === 13) {
          inputEmailSender(split[0]);
          disableButton();
        }
      });

      $(`body ${split[1]}`).click(() => {
        inputEmailSender(split[0]);
        // disableButton()
      });
    }, 80);
  });

  return await true;
}

// NORMAL INPUT TEXT BOX WITH SUBMIT BUTTON ONLY

async function inputTextClientContractNumberParser(index) {
  var template = `
                    <label class='form-label' style='font-size: 12px;margin-bottom: 5px;position: relative; left: -3px; color: #1352de!important'>*</label>
                    <br><br><center><input id='input-text-${index}' placeholder='il03-SA01234567' autocomplete="off" class='input-text' style='width:100%;' /></center>
                    <label class='form-label-intro-name' style='display: none; font-size: 10px;margin-bottom: 5px;position: relative; color:red!important'>Please enter client contract number.</label>
                    <br><label class='form-label' style='font-size: 12px;margin-bottom: 5px;position: relative; color: #1352de!important'>* Mandatory Field</label>
                    <center><button id='button-sumbit-${index}' style='position: relative;  width: 200px;' class='button-submit cx-submit cx-btn cx-btn-primary i18n'>SUBMIT</button></center>`;

  setTimeout(() => {
    $("#cx-chat-index-" + index + " .cx-message-text").append(template);
    $(".form-label-intro-name").hide();
  }, 40);
  return `#input-text-${index},#button-sumbit-${index}`;
}

async function inputTextNameParser(index) {
  var template = `
                    <label class='form-label' style='font-size: 12px;margin-bottom: 5px;position: relative; left: -3px; color: #1352de!important'>*</label>
                    <br><br><center><input id='input-text-${index}' onkeypress="return (event.charCode > 64 && 
                      event.charCode < 91) || (event.charCode > 96 && event.charCode < 123)" autocomplete="off" class='input-text' style='width:100%;' /></center>
                    <label class='form-label-intro-name' style='display: none; font-size: 10px;margin-bottom: 5px;position: relative; color:red!important'>Please enter your name.</label>
                    <br><label class='form-label' style='font-size: 12px;margin-bottom: 5px;position: relative; color: #1352de!important'>* Mandatory Field</label>
                    <center><button id='button-sumbit-${index}' style='position: relative;  width: 200px;' class='button-submit cx-submit cx-btn cx-btn-primary i18n'>SUBMIT</button></center>`;

  setTimeout(() => {
    $("#cx-chat-index-" + index + " .cx-message-text").append(template);
    $(".form-label-intro-name").hide();
  }, 40);
  return `#input-text-${index},#button-sumbit-${index}`;
}

async function inputTextTagParser(index) {
  var template = `<br><br><input type='text' id='input-text-${index}' class='input-text'></input>
                   <br><button id='button-sumbit-${index}' class='button-submit cx-submit cx-btn cx-btn-primary i18n'>SUBMIT</button>
    `;

  setTimeout(() => {
    $("#cx-chat-index-" + index + " .cx-message-text").append(template);
  }, 40);
  return `#input-text-${index},#button-sumbit-${index}`;
}

async function inputTextBigTagParser(index) {
  var template = `<br><br><input type='text' id='input-text-${index}' class='input-text' style='width:250px;height: 30px;'></input>
                   <br><button id='button-sumbit-${index}' class='button-submit cx-submit cx-btn cx-btn-primary i18n'>SUBMIT</button>
    `;

  setTimeout(() => {
    $("#cx-chat-index-" + index + " .cx-message-text").append(template);
  }, 40);
  return `#input-text-${index},#button-sumbit-${index}`;
}

async function inputTextsender(data) {
  await $(() => {
    var split = data.split(",");
    var submitSkip = false;
    function disableButton() {
      for (var i = 0; i < split.length; i++) {
        $(`body ${split[i]}`).prop("disabled", true);
        $(`body .button-submit`).css("pointer-events", "none");
        $(`body .button-skip`).css("pointer-events", "none");
      }
    }
    for (var j = 0; j < split.length; j++) {
      $(".cx-send").on("keyup click", function (e) {
        disableButton();
      });
    }
    setTimeout(() => {
      $(`body ${split[0]}`).on("keyup", (e) => {
        if (e.keyCode === 13) {
          inputSender(split[0]);
          disableButton();
        }
      });

      $(`body ${split[1]}`).click(() => {
        inputSender(split[0]);
        if (submitSkip) {
          $(`body .button-submit`).css("background", "#1352de");
          $(`body .button-submit`).css("color", "#ffffff");
          $(`body .button-submit`).css("font-weight", "600");
        }

        // disableButton()
      });
      $(`body ${split[2]}`).click(() => {
        setTimeout(() => {
          $(`#cx_input`).focus();
          $(`#cx_input`).val("SKIP");
          $(".cx-send").trigger("click");
        }, 50);
        $(`body .button-skip`).css("background", "#1352de");
        $(`body .button-skip`).css("color", "#ffffff");
        $(`body .button-skip`).css("font-weight", "600");

        // disableButton()
      });
    }, 80);
  });

  return await true;
}

async function inputTextNamesender(data) {
  await $(() => {
    var split = data.split(",");
    var submitSkip = false;
    function disableButton() {
      for (var i = 0; i < split.length; i++) {
        $(`body ${split[i]}`).prop("disabled", true);
        $(`body .button-submit`).css("pointer-events", "none");
        $(`body .button-skip`).css("pointer-events", "none");
      }
    }
    for (var j = 0; j < split.length; j++) {
      $(".cx-send").on("keyup click", function (e) {
        disableButton();
      });
    }
    setTimeout(() => {
      $(`body ${split[0]}`).on("keyup", (e) => {
        if (e.keyCode === 13) {
          inputSender(split[0]);
          
          disableButton();
        }
      });

      $(`body ${split[1]}`).click(() => {
        inputNameSender(split[0]);
        if (submitSkip) {
          $(`body .button-submit`).css("background", "#1352de");
          $(`body .button-submit`).css("color", "#ffffff");
          $(`body .button-submit`).css("font-weight", "600");
        }

        // disableButton()
      });
      $(`body ${split[2]}`).click(() => {
        setTimeout(() => {
          $(`#cx_input`).focus();
          $(`#cx_input`).val("SKIP");
          $(".cx-send").trigger("click");
        }, 50);
        $(`body .button-skip`).css("background", "#1352de");
        $(`body .button-skip`).css("color", "#ffffff");
        $(`body .button-skip`).css("font-weight", "600");

        // disableButton()
      });
    }, 80);
  });

  return await true;
}

async function inputTextClientContractNumbersender(data) {
  await $(() => {
    var split = data.split(",");
    var submitSkip = false;
    function disableButton() {
      for (var i = 0; i < split.length; i++) {
        $(`body ${split[i]}`).prop("disabled", true);
        $(`body .button-submit`).css("pointer-events", "none");
        $(`body .button-skip`).css("pointer-events", "none");
      }
    }
    for (var j = 0; j < split.length; j++) {
      $(".cx-send").on("keyup click", function (e) {
        disableButton();
      });
    }
    setTimeout(() => {
      $(`body ${split[0]}`).on("keyup", (e) => {
        if (e.keyCode === 13) {
          inputSender(split[0]);
          disableButton();
        }
      });

      $(`body ${split[1]}`).click(() => {
        inputNameSender(split[0]);
        if (submitSkip) {
          $(`body .button-submit`).css("background", "#1352de");
          $(`body .button-submit`).css("color", "#ffffff");
          $(`body .button-submit`).css("font-weight", "600");
        }

        // disableButton()
      });
      $(`body ${split[2]}`).click(() => {
        setTimeout(() => {
          $(`#cx_input`).focus();
          $(`#cx_input`).val("SKIP");
          $(".cx-send").trigger("click");
        }, 50);
        $(`body .button-skip`).css("background", "#1352de");
        $(`body .button-skip`).css("color", "#ffffff");
        $(`body .button-skip`).css("font-weight", "600");

        // disableButton()
      });
    }, 80);
  });

  return await true;
}

async function inputTextAreaSubmitParser(index, center) {
  var template = `<br><br><textarea id='input-text-${index}' class='input-text' style='width:100%; height: 20px;'></textarea>
                  <label class='form-label-textBig' style='font-size: 10px; color:red!important'>Please tell us about the issue.</label>
                   <center><button id='button-sumbit-${index}' style='position: relative;  width: 200px;' class='button-submit cx-submit cx-btn cx-btn-primary i18n'>SUBMIT</button></center>`;

  setTimeout(() => {
    $("#cx-chat-index-" + index + " .cx-message-text").append(template);
    $(".form-label-textBig").hide();
  }, 40);
  return `#input-text-${index},#button-sumbit-${index}`;
}

async function inputTextAreaParser(index, center) {
  var template = `<br><br><textarea id='input-text-${index}' class='input-text' style='width:100%; height: 20px;'></textarea>
                  <br><label class='form-label-textBig' style='font-size: 10px; top: -15px; margin-bottom: 0; position: relative; color:red!important'>Please tell us about the issue.</label>
                   <br><center><button id='button-sumbit-${index}' style='position: relative;  top: -15px; width:200px;' class='button-submit cx-submit cx-btn cx-btn-primary i18n'>SUBMIT</button>
                   <button id='button-skip-${index}' style='position: relative;  top: -15px; width:200px;' class='button-skip cx-skip cx-btn cx-btn-primary i18n'>SKIP</button></center>`;
  var template2 = `<br><br><textarea id='input-text-${index}' class='input-text' style='width:100%; height: 20px;'></textarea>
  <br><label class='form-label-textBig' style='font-size: 10px; top: -15px; margin-bottom: 0; position: relative; color:red!important'>Please tell us about the issue.</label>
   <br><button id='button-sumbit-${index}' style='position: relative; left: 74px; top: -25px; width:200px;' class='button-submit cx-submit cx-btn cx-btn-primary i18n'>SUBMIT</button>
`;
  setTimeout(() => {
    center
      ? $("#cx-chat-index-" + index + " .cx-message-text").append(template)
      : $("#cx-chat-index-" + index + " .cx-message-text").append(template2);
    $(".form-label-textBig").hide();
  }, 40);
  return `#input-text-${index},#button-sumbit-${index},#button-skip-${index}`;
}

async function inputTextAreasender(data) {
  await $(() => {
    var split = data.split(",");
    var submitSkip = false;

    function disableButton() {
      for (var i = 0; i < split.length; i++) {
        $(`body ${split[i]}`).prop("disabled", true);
        $(`body .button-submit`).css("pointer-events", "none");
        $(`body .button-skip`).css("pointer-events", "none");
      }
    }
    for (var j = 0; j < split.length; j++) {
      $(".cx-send").on("keyup click", function (e) {
        disableButton();
      });
    }
    setTimeout(() => {
      $(`body ${split[0]}`).on("keyup", (e) => {
        if (e.keyCode === 13) {
          inputAreaSender(split[0]);
          disableButton();
        }
      });

      $(`body ${split[1]}`).click(() => {
        inputAreaSender(split[0]);

        if (submitSkip) {
          $(`body .button-submit`).css("background", "#1352de");
          $(`body .button-submit`).css("color", "#ffffff");
          $(`body .button-submit`).css("font-weight", "600");
        }

        // disableButton()
      });
      $(`body ${split[2]}`).click(() => {
        setTimeout(() => {
          $(`#cx_input`).focus();
          $(`#cx_input`).val("SKIP");
          $(".cx-send").trigger("click");
        }, 50);
        $(`body .button-skip`).css("pointer-events", "none");

        $(`body .button-skip`).css("background", "#1352de");
        $(`body .button-skip`).css("color", "#ffffff");
        $(`body .button-skip`).css("font-weight", "600");
        // disableButton()
      });
    }, 80);
  });

  return await true;
}

async function inputTextAreaofImprovementParser(index) {
  var template = `<br><br><textarea placeholder="Enter your feedback" id='input-text-${index}' class='input-text' style='width:100%; height: 20px;'></textarea>
                  <label class='form-label-textBig' style='font-size: 10px; color:red!important'>Please tell us about the issue.</label>
                   <br><center><button id='button-submitArea-${index}' style=' width:200px;' class='button-submitArea cx-submitArea cx-btn cx-btn-primary i18n'>SUBMIT</button>
                   <button id='button-skipArea-${index}' style='width:200px;' class='button-skipArea cx-skipArea cx-btn cx-btn-primary i18n'>SKIP</button></center>`;

  setTimeout(() => {
    $("#cx-chat-index-" + index + " .cx-message-text").append(template);
    $(".form-label-textBig").hide();

    $(`#input-text-${index}`).on('input', function(e) {
  
      if($(this).val().length >= 300) {
        $(this).val($(this).val().slice(0, -1));
        return false;
    }
  })
  }, 40);
  return `#input-text-${index},#button-submitArea-${index},#button-skipArea-${index}`;
}

async function inputTextHidevalueSender(data) {
  await $(() => {
    var split = data.split(",");
    var submitSkip = false;

    function disableButton() {
      for (var i = 0; i < split.length; i++) {
        $(`body ${split[i]}`).prop("disabled", true);
        $(`body .button-submitArea`).css("pointer-events", "none");
        $(`body .button-skipArea`).css("pointer-events", "none");
      }
    }
    for (var j = 0; j < split.length; j++) {
      $(".cx-send").on("keyup click", function (e) {
        disableButton();
      });
    }
    setTimeout(() => {
      $(`body ${split[0]}`).on("keyup", (e) => {
        if (e.keyCode === 13) {
          inputAreaofImprovementSender(split[0]);
          disableButton();
        }
      });

      $(".cx-message-input").keyup(function (e) {
        if (e.which == 13) {
          disableButton();
          resetTimer();
        }
      });

      $(`body ${split[1]}`).click(() => {
        inputAreaofImprovementSender(split[0]);
        hideAdaptivecard = true;
      });
      $(`body ${split[2]}`).click(() => {
        setTimeout(() => {
          $(`#cx_input`).focus();
          $(`#cx_input`).val("SKIP");
          $(".cx-send").trigger("click");
        }, 50);
        $(`body .button-skipArea`).css("pointer-events", "none");
        $(`body .button-skipArea`).css("background", "#1352de");
        $(`body .button-skipArea`).css("color", "#ffffff");
        $(`body .button-skipArea`).css("font-weight", "600");
        $(".form-label-textBig").hide();

        hideAdaptivecard = true;

        // disableButton()
      });
    }, 80);
  });

  return await true;
}

async function inputAreaofImprovementSender(value) {
  let val = $(`body ${value}`).val().trim();

  if (val == "") {
    $(".form-label-textBig").show();
  } else {
    $(".form-label-textBig").hide();
    camTyping();
    await setTimeout(() => {
      $(`#cx_input`).focus();
      $(`#cx_input`).val(`${val}|SUBMIT`);
      $(".cx-send").trigger("click");
      $(`body .button-submitArea`).css("background", "#1352de");
      $(`body .button-submitArea`).css("color", "#ffffff");
      $(`body .button-submitArea`).css("font-weight", "600");
    }, 50);
  }
}
async function inputAreaSender(value) {
  let val = $(`body ${value}`).val().trim();

  if (val == "") {
    $(".form-label-textBig").show();
  } else {
    $(".form-label-textBig").hide();
    camTyping();
    await setTimeout(() => {
      $(`#cx_input`).focus();
      $(`#cx_input`).val("SUBMIT");
      $(".cx-send").trigger("click");
      $(`body .button-submit`).css("background", "#1352de");
      $(`body .button-submit`).css("color", "#ffffff");
      $(`body .button-submit`).css("font-weight", "600");
    }, 50);
  }
}
async function inputSender(value) {
  let val = $(`body ${value}`).val().trim();

  if (val == "") {
    // $(".form-label-textBig").show();
  } else {
    //$(".form-label-textBig").hide();
    camTyping();

    await setTimeout(() => {
      $(`#cx_input`).focus();
      $(`#cx_input`).val(val);
      $(".cx-send").trigger("click");
      $(`body .button-submit`).css("background", "#1352de");
      $(`body .button-submit`).css("color", "#ffffff");
      $(`body .button-submit`).css("font-weight", "600");
    }, 50);
  }
}

async function inputNameSender(value) {
  let val = $(`body ${value}`).val().trim();

  if (val == "") {
    $(".form-label-intro-name").show();
    return;
  } else {
    $(".form-label-intro-name").hide();
    camTyping();

    await setTimeout(() => {
      $(`#cx_input`).focus();
      $(`#cx_input`).val(val);
      $(".cx-send").trigger("click");
      $(`body .button-submit`).css("background", "#1352de");
      $(`body .button-submit`).css("color", "#ffffff");
      $(`body .button-submit`).css("font-weight", "600");
    }, 50);
  }
}

async function inputBookingAuthenticationParser(index, label) {

  var template = `  <label class='form-label' style='font-size: 12px;margin-bottom: 5px;position: relative'>Policy Number:</label>
                    <br>
                    <input type='text' id='input-text-${index}' style="width: 100%; font-weight: 400; font-size: 14px"  placeholder='Input Policy Number' pattern="03\d{2}-\d{7}"  class='input-text-policy'></input>
                     <br><label class='form-label-policy-${index}' style='font-size: 10px;margin-bottom: 5px;position: relative; color:red!important'>Please enter the policy number.</label>

                     <br><label class='form-label' style='font-size: 12px;margin-bottom: 5px;position: relative'>Primary Insured's Last Name:</label>
                     <br><input type='text' id='input-text3-${index}' style="width: 100%; font-weight: 400; font-size: 14px" placeholder='Input Last Name' maxlength='30' class='input-text-lastname'></input>
                     <br><label class='form-label-lastname-${index}' style='font-size: 10px;margin-bottom: 5px;position: relative; color:red!important'>Please enter the primary insured's last name.</label>

                     <br><center><button id='button-sumbit-${index}' style='width: 200px' class='button-submit cx-submit cx-btn cx-btn-primary i18n'>SUBMIT</button>
                     <button id='button-dont-have-it-${index}' style='width: 200px' class='button-submit cx-submit cx-btn cx-btn-primary i18n'>I DON'T HAVE MY POLICY NUMBER</button>
                     </center>
    `;

  setTimeout(() => {
    $("#cx-chat-index-" + index + " .cx-message-text").append(template);
    $(`.form-label-policy-${index}`).hide();
    $(`.form-label-lastname-${index}`).hide();

  
    // lastname
  $(`#input-text3-${index}`).on('input', function(e) {
    var key = e.which;

    var c = this.selectionStart,
        r = /[^a-z0-9\b ]/gi,
        v = $(this).val();
    if(r.test(v)) {
      $(this).val(v.replace(r, ''));
      c--;
    }
    this.setSelectionRange(c, c);

    if($(this).val().length >= 50) {
      $(this).val($(this).val().slice(0, 50));
      return false;
    }
  });
    $(`#input-text-${index}`).on("input", function (e) {
      let pattern = /([^0-9]+)/gi;

      if (pattern.test($(this).val())) {
        $(this).val(
          $(this)
            .val()
            .replace(/([^0-9]+)/gi, "")
        );
        $(`.form-label-policy-${index}`).show();
        $(`.form-label-policy-${index}`).html("Please input numbers only.");
      } else {
        $(`.form-label-policy-${index}`).hide();
      }

      if($(this).val().length >= 10) {
        $(this).val($(this).val().slice(0, 10));
        return false;
    }

    });

    $(`#input-text4-${index}`).on("input", function (e) {
      let pattern = /([^0-9]+)/gi;

      if (pattern.test($(this).val())) {
        $(this).val(
          $(this)
            .val()
            .replace(/([^0-9]+)/gi, "")
        );
        $(`.form-label-booking-${index}`).show();
        $(`.form-label-booking-${index}`).html("Please input numbers only.");
      } else {
        $(`.form-label-booking-${index}`).hide();
      }

      if($(this).val().length >= 10) {
        $(this).val($(this).val().slice(0, 10));
        return false;
    }

    });

  }, 40);
  return `#input-text-${index},#input-text3-${index},#button-sumbit-${index},#button-dont-have-it-${index}`;
}

async function inputBookingAuthenticationSender(data, index) {
  await $(() => {
    var split = data.split(",");
    //console.log(index)
    function addHyphen() {
      if ($(`body ${split[0]}`).val().length < 10) {
        let val = $(`body ${split[0]}`).val().split("-").join(""); //s Remove dash (-) if mistakenly entered.
        let finalVal = val.match(/.{1,3}/g).join("-"); // Add (-) after 3rd every char.
        $(`body ${split[0]}`).val(finalVal); // Update the input box.
      }
    }

    function disableButton() {
      $(`body .input-text-address`).prop("disabled", true);
      for (var i = 0; i < split.length; i++) {
        $(`body ${split[i]}`).prop("disabled", true);
        $(`body ${split[i]}`).css("pointer-events", "none");
        // $(`body .button-dont-have-it`).css("pointer-events", "none");
      }
    }
    for (var j = 0; j < split.length; j++) {
      $(".cx-send").on("keyup click", function (e) {
        disableButton();
        $(`.form-label-policy-${index}`).hide();
        $(`.form-label-lastname-${index}`).hide();
      });
    }
    setTimeout(() => {
      // fifteenseconds = setTimeout(() => {
      //   sender('AGENT');
      //   hideAdaptivecard = true;
      //   if(!noGetStartedMessage){
      //     $(".cx-send").unbind('click');
      //     $(".cx-message-input").unbind('keyup');
      //   }
      //   noGetStartedMessage = true;

      //   setTimeout(() => {

      //     $(`body ${split[2]}`).prop("disabled", false);
      //     $(`body ${split[2]}`).css("pointer-events", "auto");
      //     $(`body ${split[3]}`).prop("disabled", false);
      //     $(`body ${split[3]}`).css("pointer-events", "auto");
      //      }, 800);
      // }, 60000);
      $(`body ${split[0]}`).on("keyup", (e) => {
        if (e.keyCode === 13) {
          inputClaimLastname(split[0], index);
        }
      });
      $(`body ${split[2]}`).click(() => {
        clearTimeout(fifteenseconds)
        submitBtn2 = split[1];
        inputBookingAuthentication(split[0], split[1], index);
        // findClaimResponse = true;
        resetTimer();
      });

      $(`body ${split[3]}`).click(() => {
        clearTimeout(fifteenseconds)
        $(`body ${split[3]}`).css("background", "#1352de");
        $(`body ${split[3]}`).css("color", "#ffffff");
        $(`body ${split[3]}`).css("font-weight", "600");
        sender($(`body ${split[3]}`).text());
        disableButton();
        resetTimer();
        // claimStatusAgentResponse = true;
      });
      

      $(`body ${split[2]}`).on("keyup", (e) => {
        if (e.keyCode === 13) {

        $(`body ${split[1]}`).click();
      }
      });
    }, 80);
  });

  return await true;
}

async function inputBookingAuthentication(value1, value2, index) {
  let val1 = $(`body ${value1}`).val();
  let val2 = $(`body ${value2}`).val();
  console.log(index)
  if (val1 == "" && val2 == "") {
    $(`.form-label-policy-${index}`).show();
    $(`.form-label-policy-${index}`).html("Please enter the policy number.");
    $(`.form-label-lastname-${index}`).html("Please enter the primary insured's last name.");
    $(`.form-label-lastname-${index}`).show();
  } else if (val1 == "") {
    $(`.form-label-policy-${index}`).show();
    $(`.form-label-policy-${index}`).html("Please enter the policy number.");
  } else if (val1.length < 10) {
    $(`.form-label-policy-${index}`).show();
    $(`.form-label-policy-${index}`).html("Please enter 10 digit policy number.");
  } else if (val2 == "") {
    $(`.form-label-lastname-${index}`).html("Please enter the primary insured's last name.");
    $(`.form-label-lastname-${index}`).show();
  } else {
    camTyping();
    $(`.form-label-policy-${index}`).hide();
    $(`.form-label-lastname-${index}`).hide();
    await setTimeout(() => {
      $(`body #button-sumbit-${index}`).css("background", "#1352de");
      $(`body #button-sumbit-${index}`).css("color", "#ffffff");
      $(`body #button-sumbit-${index}`).css("font-weight", "600");
      $(`#cx_input`).focus();
      $(`#cx_input`).val(`${val1}|${val2}|SUBMIT`);
      $(".cx-send").trigger("click");
      findClaimResponse = true;
    }, 50);
  }
}


async function inputCallbackDetailsParser(index, label) {

  var template = `<label class='form-label' style='font-size: 12px;margin-bottom: 5px;position: relative'>Name:</label>
                  <br>
                  <input type='text' id='input-text1-${index}' style="width: 100%; font-weight: 400; font-size: 14px"  placeholder='Input your name' pattern="03\d{2}-\d{7}"  class='input-text-policy'></input>
                    <br><label class='form-label-text1-${index}' style='font-size: 10px;margin-bottom: 5px;position: relative; color:red!important'>Please enter your name.</label>

                    <br><label class='form-label' style='font-size: 12px;margin-bottom: 5px;position: relative'>Contact Number:</label>
                    <br><input type='text' id='input-text2-${index}' style="width: 100%; font-weight: 400; font-size: 14px" placeholder='Input your contact number' class='input-text-booking'></input>
                    <br><label class='form-label-text2-${index}' style='font-size: 10px;margin-bottom: 5px;position: relative; color:red!important'>Please enter your contact number.</label>

                    <br><label class='form-label' style='font-size: 12px;margin-bottom: 5px;position: relative'>Preferred date/time to contact:</label>
                    <br><input type='text' id='input-text3-${index}' style="width: 100%; font-weight: 400; font-size: 14px" placeholder='Input your preferred date/time to contact' class='input-text-lastname'></input>
                    <br><label class='form-label-text3-${index}' style='font-size: 10px;margin-bottom: 5px;position: relative; color:red!important'>Please enter preferred date/time to contact.</label>

                    <br><center><button id='button-sumbit-${index}' style='width: 200px' class='button-submit cx-submit cx-btn cx-btn-primary i18n'>SUBMIT</button>
                    </center>`;

  setTimeout(() => {
    $("#cx-chat-index-" + index + " .cx-message-text").append(template);
    $(`.form-label-text1-${index}`).hide();
    $(`.form-label-text2-${index}`).hide();
    $(`.form-label-text3-${index}`).hide();

  
    // lastname
  $(`#input-text3-${index}`).on('input', function(e) {
    var key = e.which;

    var c = this.selectionStart,
        r = /[^a-z0-9\b ]/gi,
        v = $(this).val();
    if(r.test(v)) {
      $(this).val(v.replace(r, ''));
      c--;
    }
    this.setSelectionRange(c, c);

    if($(this).val().length >= 50) {
      $(this).val($(this).val().slice(0, 50));
      return false;
  }
  });
    $(`#input-text2-${index}`).on("input", function (e) {
      let pattern = /([^0-9]+)/gi;

      if (pattern.test($(this).val())) {
        $(this).val(
          $(this)
            .val()
            .replace(/([^0-9]+)/gi, "")
        );
        $(`.form-label-text2-${index}`).show();
        $(`.form-label-text2-${index}`).html("Please input numbers only.");
      } else {
        $(`.form-label-text2-${index}`).hide();
      }

    //   if($(this).val().length >= 10) {
    //     $(this).val($(this).val().slice(0, 10));
    //     return false;
    // }

    });

    $(`#input-text4-${index}`).on("input", function (e) {
      let pattern = /([^0-9]+)/gi;

      if (pattern.test($(this).val())) {
        $(this).val(
          $(this)
            .val()
            .replace(/([^0-9]+)/gi, "")
        );
        $(`.form-label-booking-${index}`).show();
        $(`.form-label-booking-${index}`).html("Please input numbers only.");
      } else {
        $(`.form-label-booking-${index}`).hide();
      }

      if($(this).val().length >= 10) {
        $(this).val($(this).val().slice(0, 10));
        return false;
    }

    });

  }, 40);
  return `#input-text1-${index},#input-text2-${index},#input-text3-${index},#button-sumbit-${index}`;
}

async function inputCallbackDetailsSender(data, index) {
  await $(() => {
    var split = data.split(",");
    //console.log(index)
    function addHyphen() {
      if ($(`body ${split[0]}`).val().length < 10) {
        let val = $(`body ${split[0]}`).val().split("-").join(""); //s Remove dash (-) if mistakenly entered.
        let finalVal = val.match(/.{1,3}/g).join("-"); // Add (-) after 3rd every char.
        $(`body ${split[0]}`).val(finalVal); // Update the input box.
      }
    }

    function disableButton() {
      $(`body .input-text-address`).prop("disabled", true);

      for (var i = 0; i < split.length; i++) {
        $(`body ${split[i]}`).prop("disabled", true);
        $(`body .button-submit`).css("pointer-events", "none");
        $(`body .button-dont-have-it`).css("pointer-events", "none");
      }
    }
    for (var j = 0; j < split.length; j++) {
      $(".cx-send").on("keyup click", function (e) {
        disableButton();
        $(`.form-label-text1-${index}`).hide();
        $(`.form-label-text2-${index}`).hide();
        $(`.form-label-text3-${index}`).hide();
      });
    }
    setTimeout(() => {


      $(`body ${split[3]}`).click(() => {
        
        submitBtn2 = split[1];
        inputCallbackDetails(split[0], split[1], split[2], index);
        findClaimResponse = true;
        
      });

      // $(`body ${split[4]}`).click(() => {
        
        
      //   $(`body ${split[4]}`).css("background", "#1352de");
      //   $(`body ${split[4]}`).css("color", "#ffffff");
      //   $(`body ${split[4]}`).css("font-weight", "600");
      //   sender("I DON'T HAVE IT");
      //   disableButton();
      //   claimStatusAgentResponse = true;
      // });
      

      $(`body ${split[2]}`).on("keyup", (e) => {
        if (e.keyCode === 13) {

        $(`body ${split[1]}`).click();
      }
      });
    }, 80);
  });

  return await true;
}

async function inputCallbackDetails(value1, value2, value3, index) {
  let val1 = $(`body ${value1}`).val();
  let val2 = $(`body ${value2}`).val();
  let val3 = $(`body ${value3}`).val();
  console.log(index)
  if (val1 == "" && val2 == "" && val3 == "") {
    $(`.form-label-text1-${index}`).show();
    $(`.form-label-text1-${index}`).html("Please enter your name.");
    $(`.form-label-text2-${index}`).html("Please enter your contact number.");
    $(`.form-label-text2-${index}`).show();
    $(`.form-label-text3-${index}`).html("Please enter your preferred date/time to contact.");
    $(`.form-label-text3-${index}`).show();
  } else if (val1 == "") {
    $(`.form-label-text1-${index}`).show();
    $(`.form-label-text1-${index}`).html("Please enter your name.");
  } else if (val2 == "") {
    $(`.form-label-text2-${index}`).html("Please enter your contact number.");
    $(`.form-label-text2-${index}`).show();
  } else if (val3 == "") {
    $(`.form-label-text3-${index}`).html("Please enter your preferred date/time to contact.");
    $(`.form-label-text3-${index}`).show();
  } else {
    camTyping();
    $(`.form-label-text1-${index}`).hide();
    $(`.form-label-text2-${index}`).hide();
    $(`.form-label-text3-${index}`).hide();
    await setTimeout(() => {
      $(`body #button-sumbit-${index}`).css("background", "#1352de");
      $(`body #button-sumbit-${index}`).css("color", "#ffffff");
      $(`body #button-sumbit-${index}`).css("font-weight", "600");
      $(`#cx_input`).focus();
      $(`#cx_input`).val(`${val1}|${val2}|${val3}|SUBMIT`);
      $(".cx-send").trigger("click");
    }, 50);
  }
}

async function inputLastnameSpelling(value1, value2, index) {
  let val1 = $(`body ${value1}`).val();
  let val2 = $(`body ${value2}`).val();
  console.log(index)
  if (val1 == "" && val2 == "") {
    $(`.form-label-current-spelling-${index}`).show();
    $(`.form-label-current-spelling-${index}`).html("Please enter current spelling of your lastname.");
    $(`.form-label-new-spelling-${index}`).html("Please enter new spelling of your lastname.");
    $(`.form-label-new-spelling-${index}`).show();
  } else if (val1 == "") {
    $(`.form-label-current-spelling-${index}`).show();
    $(`.form-label-current-spelling-${index}`).html("Please enter current spelling of your lastname.");
  } else if (val2 == "") {
    $(`.form-label-new-spelling-${index}`).html("Please enter new spelling of your lastname.");
    $(`.form-label-new-spelling-${index}`).show();
  } else {
    camTyping();
    $(`.form-label-current-spelling-${index}`).hide();
    $(`.form-label-new-spelling-${index}`).hide();
    await setTimeout(() => {
      $(`body #button-sumbit-${index}`).css("background", "#1352de");
      $(`body #button-sumbit-${index}`).css("color", "#ffffff");
      $(`body #button-sumbit-${index}`).css("font-weight", "600");
      $(`#cx_input`).focus();
      $(`#cx_input`).val(`${val1}|${val2}|SUBMIT`);
      $(".cx-send").trigger("click");
    }, 50);
  }
}

async function inputChangeLastnameParser(index, label) {

  var template = `<label class='form-label' style='font-size: 12px;margin-bottom: 5px;position: relative'>Current Spelling:</label>
                    <br>
                    <input type='text' id='input-text-${index}' style="width: 100%; font-weight: 400; font-size: 14px"  placeholder='Input Current Spelling' pattern="03\d{2}-\d{7}"  class='input-text-policy'></input>
                     <br><label class='form-label-current-spelling-${index}' style='font-size: 10px;margin-bottom: 5px;position: relative; color:red!important'>Please enter your last name.</label>

                     <br><label class='form-label' style='font-size: 12px;margin-bottom: 5px;position: relative'>New Spelling:</label>
                     <br><input type='text' id='input-text4-${index}' style="width: 100%; font-weight: 400; font-size: 14px" placeholder='Input New Spelling' class='input-text-booking'></input>
                     <br><label class='form-label-new-spelling-${index}' style='font-size: 10px;margin-bottom: 5px;position: relative; color:red!important'>Please enter your last name.</label>

                     <br><center><button id='button-sumbit-${index}' style='width: 200px' class='button-submit cx-submit cx-btn cx-btn-primary i18n'>SUBMIT</button>
                     <button id='button-dont-have-it-${index}' style='width: 200px' class='button-submit cx-submit cx-btn cx-btn-primary i18n'>I DON'T HAVE IT</button>
                     </center>`;
  setTimeout(() => {
    $("#cx-chat-index-" + index + " .cx-message-text").append(template);
    $(`.form-label-current-spelling-${index}`).hide();
    $(`.form-label-new-spelling-${index}`).hide();
  
    // lastname
  $(`#input-text3-${index}`).on('input', function(e) {
    var key = e.which;

    var c = this.selectionStart,
        r = /[^a-z0-9\b ]/gi,
        v = $(this).val();
    if(r.test(v)) {
      $(this).val(v.replace(r, ''));
      c--;
    }
    this.setSelectionRange(c, c);

    if($(this).val().length >= 50) {
      $(this).val($(this).val().slice(0, 50));
      return false;
  }
  });

  }, 40);
  return `#input-text-${index},#input-text4-${index},#button-sumbit-${index}`;
}

async function inputChangeLastnameSender(data, index) {
  await $(() => {
    var split = data.split(",");
    //console.log(index)
    function addHyphen() {
      if ($(`body ${split[0]}`).val().length < 10) {
        let val = $(`body ${split[0]}`).val().split("-").join(""); //s Remove dash (-) if mistakenly entered.
        let finalVal = val.match(/.{1,3}/g).join("-"); // Add (-) after 3rd every char.
        $(`body ${split[0]}`).val(finalVal); // Update the input box.
      }
    }

    function disableButton() {
      $(`body .input-text-address`).prop("disabled", true);

      for (var i = 0; i < split.length; i++) {
        $(`body ${split[i]}`).prop("disabled", true);
        $(`body .button-submit`).css("pointer-events", "none");
      }
    }
    for (var j = 0; j < split.length; j++) {
      $(".cx-send").on("keyup click", function (e) {
        disableButton();
        $(`.form-label-current-spelling-${index}`).hide();
        $(`.form-label-new-spelling-${index}`).hide();
      });
    }
    setTimeout(() => {


      $(`body ${split[0]}`).on("keyup", (e) => {
        if (e.keyCode === 13) {
          inputLastnameSpelling(split[0], index);
        }
      });


      $(`body ${split[2]}`).click(() => {
        
        submitBtn2 = split[1];
        inputLastnameSpelling(split[0], split[1], index);
        findClaimResponse = true;
        $(`body ${split[2]}`).css("background", "#1352de");
        $(`body ${split[2]}`).css("color", "#ffffff");
        $(`body ${split[2]}`).css("font-weight", "600");
      });

      $(`body ${split[4]}`).click(() => {
        $(`body ${split[4]}`).css("background", "#1352de");
        $(`body ${split[4]}`).css("color", "#ffffff");
        $(`body ${split[4]}`).css("font-weight", "600");
        sender("I DON'T HAVE IT");
        disableButton();
        claimStatusAgentResponse = true;
      });
      
      $(`body ${split[2]}`).on("keyup", (e) => {
        if (e.keyCode === 13) {

        $(`body ${split[1]}`).click();
      }
      });
    }, 80);
  });

  return await true;
}

async function inputPolicyContactDetailsParser(index) {
  // var template = `
  // <center><label style="font-size: 12px">Policy Holder Details</label></center>
  // <div class="row-change-date">
  //   <div>
  //     <input type='text' id='input-text0-${index}' style="width: 100%; height: 24px !important; font-weight: 400; font-size: 10px"  placeholder='1234567' pattern="03\d{2}-\d{7}" class='input-text-name' value=${policyNumber} disabled></input><br>
  //     <center><label class='form-label' style='font-size: 10px;margin-bottom: 5px;position: relative'>Policy #</label></center>
  //   </div>
  //   <div>
  //     <input type='text' id='input-text1-${index}' style="width: 100%; height: 24px !important; font-weight: 400; font-size: 10px"  placeholder='John Doe' pattern="03\d{2}-\d{7}"  class='input-text-policy-number' value="${policyName}" disabled></input><br>
  //     <center><label class='form-label' style='font-size: 10px;margin-bottom: 5px;position: relative'>Name</label></center>
  //   </div>
  // </div>
  // <div class="row-change-date">
  //   <div>
  //     <input type='email' id='input-text2-${index}' style="width: 100%; height: 24px !important; font-weight: 400; font-size: 10px"  placeholder='johndoe@gmail.com' pattern="03\d{2}-\d{7}" class='input-text-email' value="${policyEmail}" ></input><br>
  //     <center><label class='form-label' style='font-size: 10px;margin-bottom: 5px;position: relative'>Email</label></center>
  //   </div>
  //   <div>
  //     <input type='text' id='input-text3-${index}' style="width: 100%; height: 24px !important; font-weight: 400; font-size: 10px"  placeholder='Contact Number' pattern="03\d{2}-\d{7}"  class='input-text-contact'></input><br>
  //     <center><label class='form-label' style='font-size: 10px;margin-bottom: 5px;position: relative'>Contact Number</label></center>
  //   </div>
  // </div>

  // <div class="row-change-date">
    
  //   <div>
  //     <input id='date-picker1-${index}' style='font-size: 10px; width: 95%; height: 24px !important; position: relative; text-align: center!important; top: 0px!important;'' type='text' placeholder='MM/DD/YYYY'  class='dates-picker' value="${policyDeparture}" /><br>
  //     <center><label class='form-label' style='font-size: 10px;margin-bottom: 5px;position: relative'>Departure Date</label></center>
  //   </div>
  //   <div>
  //     <input type='text' id='input-text4-${index}' style="width: 100%; height: 24px !important; font-weight: 400; font-size: 10px" pattern="03\d{2}-\d{7}"  class='input-text-reason'></input><br>
  //     <center><label class='form-label' style='font-size: 10px;margin-bottom: 5px;position: relative'>Refund Reason</label></center>
  //   </div>
  // </div>
  // <select class="select dropdown-half" name="requestor" id="input-text5-${index}" onchange="changeRequestor(this,${index})">
  //   <option value="agent">Agent</option>
  //   <option value="customer">Customer</option>
  // </select>
  // <label class='form-label' style='font-size: 10px;margin-bottom: 5px;position: relative;right: 90px;top:21px;'>Requestor</label>
  // <br>
  // <div class="agent-container">
  //   <label class='form-label' style='font-size: 10px;margin-bottom: 5px;position: relative'>Agent Name: </label>
  //   <input type='text' id='input-text6-${index}' style="height: 24px !important; font-size: 10px; font-weight: 400;"  placeholder='Name' pattern="03\d{2}-\d{7}"  class='input-text-policy-number'></input><br>
  //   <div class="agent-disclaimer">
  //     <input type="checkbox" name="agentTerms" id="input-text7-${index}" value="true"/>
  //     <p>I confirm that (1) I am an agent acting at the request of the insured under the travel insurance plan, (2) the insured has requested that this travel insurance plan be cancelled, and (3) I have provided and discussed the information in this voucher and Refund Form with the insured.</p>
  //   </div>
    
  // </div>
  // <center><label class='form-label-text-${index}' style='top: 18px;font-size: 10px;margin-bottom: 5px;position: relative; color:red!important'>Please complete all the details</label></center>
  // <br><center><button id='button-sumbit-${index}' style='position: relative; width: 200px;' class='button-submit cx-submit cx-btn cx-btn-primary i18n'>SUBMIT</button>
  // </center>`;
  var template = `
  <center><label style="font-size: 12px; font-weight: bold;">Policy Holder Details</label></center><br>
  <div class="row-change-date">
    <div>
    <center><label class='form-label' style='font-size: 10px;margin-bottom: 5px;position: relative'>Policy #</label></center>
      <input type='text' id='input-text0-${index}' style="width: 100%; height: 24px !important; font-weight: 400; font-size: 10px; text-align: center;"  placeholder='1234567' pattern="03\d{2}-\d{7}" class='input-text-name' value=${policyNumber} disabled></input><br>
      
    </div>
    <div>
    <center><label class='form-label' style='font-size: 10px;margin-bottom: 5px;position: relative'>Last Name</label></center>
      <input type='text' id='input-text1-${index}' style="width: 100%; height: 24px !important; font-weight: 400; font-size: 10px; text-align: center;"  placeholder='John Doe' pattern="03\d{2}-\d{7}"  class='input-text-policy-number' value="${policyName}" disabled></input><br>
      
    </div>
  </div>
  <div class="row-change-date">
    <div>
      <center><label class='form-label' style='font-size: 10px;margin-bottom: 5px;position: relative'>Email</label></center>
      <input type='email' id='input-text2-${index}' style="width: 100%; height: 24px !important; font-weight: 400; font-size: 10px; text-align: center;"  placeholder='johndoe@gmail.com' pattern="03\d{2}-\d{7}" class='input-text-email' value="${policyEmail}" ></input><br>
      
    </div>
    <div>
      <center><label class='form-label' style='font-size: 10px;margin-bottom: 5px;position: relative'>Contact Number</label></center>
      <input type='text' id='input-text3-${index}' style="width: 100%; height: 24px !important; font-weight: 400; font-size: 10px; text-align: center;"  placeholder='Contact Number' pattern="03\d{2}-\d{7}"  class='input-text-contact' maxlength='10'></input><br>
      
    </div>
  </div>
  <center><label class='form-label' style='font-size: 10px;margin-bottom: 5px;position: relative'>Departure Date</label></center>
  <input id='date-picker1-${index}' style='font-size: 10px; width: 100%; height: 24px !important; position: relative; text-align: center!important; top: 0px!important;'' type='text' placeholder='MM/DD/YYYY'  class='dates-picker' value="${policyDeparture}" /><br><br>

  <center><label class='form-label' style='font-size: 10px;margin-bottom: 5px;position: relative'>Refund Reason</label></center>
  <textarea id='input-text4-${index}' style="width: 100%; height: 48px !important; font-weight: 400; font-size: 10px; text-align: center;" pattern="03\d{2}-\d{7}"  class='input-text-reason'></textarea>
  
  <center><label class='form-label-text-${index}' style='top: 18px;font-size: 10px;margin-bottom: 5px;color:red!important'>Please complete all the details</label></center>
  <center><button id='button-sumbit-${index}' style='position: relative; width: 200px;' class='button-submit cx-submit cx-btn cx-btn-primary i18n'>SUBMIT</button>
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
    if(policyEmail != '') $(`#input-text2-${index}`).attr('disabled', true)

    if(policyDeparture != '') $("#date-picker1-" + index).attr('readonly', 'readonly')

    $(`#input-text3-${index}`).on("input", function (e) {
      let pattern = /([^0-9]+)/gi;
      if (pattern.test($(this).val())) {
        $(this).val($(this).val().replace(/([^0-9]+)/gi, ""));
        $(`.form-label-text-${index}`).show();
        $(`.form-label-text-${index}`).html('Kindly input correct format');
      } else {
        $(`.form-label-text-${index}`).hide();
        $(`.form-label-text-${index}`).html('Please complete all the details');
      }
    });

    $(`#input-text2-${index}`).on("blur", function (e) {
      let pattern = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
      if ($(this).val().match(pattern)) {
        $(`.form-label-text-${index}`).hide();
        $(`.form-label-text-${index}`).html('Please complete all the details');
      } else {
        $(`.form-label-text-${index}`).show();
        $(`.form-label-text-${index}`).html('Kindly input correct format');
      }
    });

    $(`.form-label-text-${index}`).hide();

    // $.each($('.radio-btn'), function(key, value) {
    //   $(this).click(function(e) {
    //     $('.radio-btn-selected')
    //       .removeClass('radio-btn-selected')
    //       .addClass('radio-btn');
    
    //     $(this)
    //       .removeClass('radio-btn')
    //       .addClass('radio-btn-selected');
    
    //     //do whatever you want on click
    //   });
    // });
  }, 40);
  return `#input-text0-${index},#input-text1-${index},#input-text2-${index},#input-text3-${index},#input-text4-${index},#date-picker1-${index},#input-text5-${index},#input-text6-${index},#input-text7-${index},#button-sumbit-${index}`;
}

async function inputPolicyContactDetailsSender(data, index) {
  await $(() => {
    var split = data.split(",");
    let pattern = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    setTimeout(() => {
      for (var j = 0; j < split.length; j++) {
        $(".cx-send").on("keyup click", function (e) {
          $(`.form-label-dateError-${index}`).hide();
          $(`body .dates-picker`).prop("disabled", true);
          $(`body ${split[j]}`).prop("disabled", true);
        });
      }

      $(`body ${split[9]}`).click(() => {
        let isTermsChecked = false;
        $('input[name="agentTerms"]:checked').each(function() {
          isTermsChecked = this.value;
        });
        if (
          $(`body ${split[0]}`).val() == "" ||
          $(`body ${split[1]}`).val() == "" ||
          $(`body ${split[2]}`).val() == "" ||
          $(`body ${split[3]}`).val() == "" ||
          $(`body ${split[4]}`).val() == "" ||
          $(`body ${split[5]}`).val() == ""
          // $(`body ${split[6]}`).val() == ""
        ) {
          $(`.form-label-text-${index}`).show();
          $(`.form-label-text-${index}`).html('Please complete all the details');
        } else if (!$(`body ${split[2]}`).val().match(pattern)) {
          $(`.form-label-text-${index}`).show();
          $(`.form-label-text-${index}`).html('Kindly input correct format');
        }
        // else if ($(`body ${split[6]}`).val() == 'agent' && $(`body ${split[7]}`).val() == "") {
        //   $(`.form-label-text-${index}`).show();
        //   $(`.form-label-text-${index}`).html('Please complete all the details');
        // } 
        // else if ($(`body ${split[6]}`).val() == 'agent' && !isTermsChecked) {
        //   $(`.form-label-text-${index}`).show();
        //   $(`.form-label-text-${index}`).html('Please tick the checkbox');
        // } 
        else if ($(`body ${split[4]}`).val().length < 10) {
          $(`.form-label-text-${index}`).show();
          $(`.form-label-text-${index}`).html('Refund reason must be at least 10 characters');
        } else {
          $(`.form-label-text-${index}`).hide();
        let allValues =
          $(`body ${split[0]}`).val() +
          "|" +
          $(`body ${split[1]}`).val() +
          "|" +
          $(`body ${split[2]}`).val() +
          "|" +
          $(`body ${split[3]}`).val() +
          "|" +
          $(`body ${split[4]}`).val() +
          "|" +
          $(`body ${split[5]}`).val() +
          "|" +
          // $(`body ${split[6]}`).val() +
          // "|" +
          // $(`body ${split[7]}`).val() +
          // "|" +
          "SUBMIT"; 
        $(`#cx_input`).focus();
        $(`#cx_input`).val(allValues);
        resetTimer();
        console.log(allValues)
        $(".cx-send").trigger("click");
        $(`.form-label-dateError-${index}`).hide();
        $(`body .dates-picker`).prop("disabled", true);
        $(`body ${split[1]}`).prop("disabled", true);

        $(`body ${split[1]}`).css("pointer-events", "none");

        $(`body ${split[9]}`).prop("disabled", true);
        $(`body ${split[9]}`).css("background", "#001871");
        $(`body ${split[9]}`).css("color", "#ffffff");
        $(`body ${split[9]}`).css("font-weight", "600");
        $(`body ${split[9]}`).css("pointer-events", "none");
        findClaimResponse = true;
        }
      });
    }, 40);
  });

  return await true;
}


// Name
async function inputPolicyModificationNameParser(index) {
  var template = `
  <center><label style="font-size: 12px; font-weight: bold;">Policy Holder Details</label></center><br>
  <div class="row-change-date">
    <div>
      <center><label class='form-label' style='font-size: 10px;margin-bottom: 5px;position: relative'>Policy #</label></center>
      <input type='text' id='input-text0-${index}' style="width: 100%; height: 24px !important; font-weight: 400; font-size: 10px; text-align: center;"  placeholder='1234567' pattern="03\d{2}-\d{7}" class='input-text-name' value=${policyNumber} disabled></input><br>
    </div>
    <div>
      <center><label class='form-label' style='font-size: 10px;margin-bottom: 5px;position: relative'>Insured's Last Name</label></center>
      <input type='text' id='input-text1-${index}' style="width: 100%; height: 24px !important; font-weight: 400; font-size: 10px; text-align: center;" placeholder='John Doe' pattern="03\d{2}-\d{7}"  class='input-text-policy-number' value="${policyName}" disabled></input><br>
      
    </div>
  </div>
  <div class="row-change-date">
    <div>
      <center><label class='form-label' style='font-size: 10px;margin-bottom: 5px;position: relative'>Email</label></center>
      <input type='email' id='input-text2-${index}' style="width: 100%; height: 24px !important; font-weight: 400; font-size: 10px; text-align: center;"  placeholder='johndoe@gmail.com' pattern="03\d{2}-\d{7}" class='input-text-email' value="${policyEmail}" maxlength='30'></input><br>
      
    </div>
    <div>
      <center><label class='form-label' style='font-size: 10px;margin-bottom: 5px;position: relative'>Contact Number</label></center>
      <input type='text' id='input-text3-${index}' style="width: 100%; height: 24px !important; font-weight: 400; font-size: 10px; text-align: center;"  placeholder='Contact Number' pattern="03\d{2}-\d{7}"  class='input-text-contact' maxlength='10'></input><br>
      
    </div>
  </div>
  <center><label class='form-label' style='font-size: 10px;margin-bottom: 5px;position: relative'>Person Requesting Change</label></center>
  <input type='text' id='input-text4-${index}' style="text-align: center; width: 100%; font-weight: 400; height: 24px !important; font-size: 10px;"  placeholder='Requestor' pattern="03\d{2}-\d{7}"  class='input-text-policy' maxlength='30'></input>
  
  <br>
  <br>
  <center><label class='form-label' style='font-size: 10px;margin-bottom: 5px;position: relative'>Modification for Primary / Additional Insured?</label></center>
  <select class="select" name="insured" id="input-text5-${index}">
    <option value="primary insured">Primary Insured</option>
    <option value="additional insured">Additional Insured</option>
  </select>
  <br>
  <br>
  <center><label class='form-label' style='font-size: 10px;margin-bottom: 5px;position: relative'>What name appears today</label></center>
  <input type='text' id='input-text6-${index}' style="text-align: center; width: 100%; font-weight: 400; height: 24px !important; font-size: 10px;" pattern="03\d{2}-\d{7}"  class='input-text-policy' maxlength='30'></input>
  <br>
  <br>
  <center><label class='form-label' style='font-size: 10px;margin-bottom: 5px;position: relative'>Correct Spelling of the name?</label></center>
  <input type='text' id='input-text7-${index}' style="text-align: center; width: 100%; font-weight: 400; height: 24px !important; font-size: 10px;" pattern="03\d{2}-\d{7}"  class='input-text-policy' maxlength='30'></input>
  

  <center><label class='form-label-text-${index}' style='font-size: 10px;margin-bottom: 5px;color:red!important'>Please complete all the details</label></center>
  <center><button id='button-sumbit-${index}' style='position: relative; width: 200px;' class='button-submit cx-submit cx-btn cx-btn-primary i18n'>SUBMIT</button>
  </center>`;


  await setTimeout(() => {
    $("#cx-chat-index-" + index + " .cx-message-text").append(template);
    console.log(index);
    $(`.form-label-text-${index}`).hide();

    $(`#input-text3-${index}`).on("input", function (e) {
      let pattern = /([^0-9]+)/gi;
      if (pattern.test($(this).val())) {
        $(this).val($(this).val().replace(/([^0-9]+)/gi, ""));
        $(`.form-label-text-${index}`).show();
        $(`.form-label-text-${index}`).html('Kindly input correct format');
      } else {
        $(`.form-label-text-${index}`).hide();
        $(`.form-label-text-${index}`).html('Please complete all the details');
      }
    });

    $(`#input-text2-${index}`).on("blur", function (e) {
      let pattern = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
      if ($(this).val().match(pattern)) {
        $(`.form-label-text-${index}`).hide();
        $(`.form-label-text-${index}`).html('Please complete all the details');
      } else {
        $(`.form-label-text-${index}`).show();
        $(`.form-label-text-${index}`).html('Kindly input correct format');
      }
    });

    if(policyEmail != '') $(`#input-text2-${index}`).attr('disabled', true)

  }, 40);
  return `#input-text0-${index},#input-text1-${index},#input-text2-${index},#input-text3-${index},#input-text4-${index},#input-text5-${index},#input-text6-${index},#input-text7-${index},#button-sumbit-${index}`;
}

async function inputPolicyModificationNameSender(data, index) {
  await $(() => {
    var split = data.split(",");
    let pattern = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    setTimeout(() => {
      for (var j = 0; j < split.length; j++) {
        $(".cx-send").on("keyup click", function (e) {
          $(`.form-label-dateError-${index}`).hide();
          $(`body .dates-picker`).prop("disabled", true);
          $(`body ${split[j]}`).prop("disabled", true);
        });
      }

      // $(`body ${split[1]}`).click(() => {
      //   if (hasData == true) {
      //     $(`body .dates-picker`).prop("disabled", true);
      //     $(`body ${split[1]}`).prop("disabled", true);
      //     $(`body ${split[1]}`).css("background", "#001871");
      //     $(`body ${split[1]}`).css("color", "#ffffff");
      //     $(`body ${split[1]}`).css("font-weight", "600");
      //     $(`body ${split[1]}`).css("pointer-events", "none");

      //     $(`body ${split[2]}`).prop("disabled", true);

      //     $(`body ${split[2]}`).css("pointer-events", "none");
      //     $(`.form-label-dateError-${index}`).hide();

      //   }
      // });

      $(`body ${split[8]}`).click(() => {
        if (
          $(`body ${split[0]}`).val() == "" ||
          $(`body ${split[1]}`).val() == "" ||
          $(`body ${split[2]}`).val() == "" ||
          $(`body ${split[3]}`).val() == "" ||
          $(`body ${split[4]}`).val() == "" ||
          $(`body ${split[5]}`).val() == "" ||
          $(`body ${split[6]}`).val() == "" ||
          $(`body ${split[7]}`).val() == ""
        ) {
          $(`.form-label-text-${index}`).show();
          $(`.form-label-text-${index}`).html('Please complete all the details');
        } else if (!$(`body ${split[2]}`).val().match(pattern)) {
          $(`.form-label-text-${index}`).show();
          $(`.form-label-text-${index}`).html('Kindly input correct format');
        } else {
          $(`.form-label-text-${index}`).hide();
          let allValues =
            $(`body ${split[0]}`).val() +
            "|" +
            $(`body ${split[1]}`).val() +
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
            $(`body ${split[7]}`).val() +
            "|" +
            "SUBMIT";
          $(`#cx_input`).focus();
          $(`#cx_input`).val(allValues);
          console.log(allValues);
          resetTimer();
          $(".cx-send").trigger("click");
          $(`body ${split[1]}`).prop("disabled", true);

          $(`body ${split[1]}`).css("pointer-events", "none");

          $(`body ${split[8]}`).prop("disabled", true);
          $(`body ${split[8]}`).css("background", "#001871");
          $(`body ${split[8]}`).css("color", "#ffffff");
          $(`body ${split[8]}`).css("font-weight", "600");
          $(`body ${split[8]}`).css("pointer-events", "none");
          findClaimResponse = true;
        }
      });
    }, 40);
  });

  return await true;
}

// Date of birth
async function inputPolicyModificationDateBirthParser(index) {
  var template = `
  <center><label style="font-size: 12px; font-weight: bold;">Policy Holder Details</label></center><br>
  <div class="row-change-date">
    <div>
     <center><label class='form-label' style='font-size: 10px;margin-bottom: 5px;position: relative'>Policy #</label></center>
      <input type='text' id='input-text0-${index}' style="width: 100%; height: 24px !important; font-weight: 400; font-size: 10px; text-align: center;"  placeholder='1234567' pattern="03\d{2}-\d{7}" class='input-text-name' value=${policyNumber} disabled></input><br>
    </div>
    <div>
      <center><label class='form-label' style='font-size: 10px;margin-bottom: 5px;position: relative'>Insured's Last Name</label></center>
      <input type='text' id='input-text1-${index}' style="width: 100%; height: 24px !important; font-weight: 400; font-size: 10px; text-align: center;"  placeholder='John Doe' pattern="03\d{2}-\d{7}"  class='input-text-policy-number' value="${policyName}" disabled></input><br>
    </div>
  </div>
  <div class="row-change-date">
    <div>
      <center><label class='form-label' style='font-size: 10px;margin-bottom: 5px;position: relative'>Email</label></center>
      <input type='email' id='input-text2-${index}' style="width: 100%; height: 24px !important; font-weight: 400; font-size: 10px; text-align: center;"  placeholder='johndoe@gmail.com' pattern="03\d{2}-\d{7}" class='input-text-email' value="${policyEmail}" maxlength='30'></input><br>
    </div>
    <div>
      <center><label class='form-label' style='font-size: 10px;margin-bottom: 5px;position: relative'>Contact Number</label></center>
      <input type='text' id='input-text3-${index}' style="width: 100%; height: 24px !important; font-weight: 400; font-size: 10px; text-align: center;"  placeholder='Contact Number' pattern="03\d{2}-\d{7}"  class='input-text-contact' maxlength='10'></input><br>
    </div>
  </div>
  <center><label class='form-label' style='font-size: 10px;margin-bottom: 5px;position: relative'>Person Requesting Change</label></center>
  <input type='text' id='input-text4-${index}' style="text-align: center; width: 100%; font-weight: 400; font-size: 10px; height: 24px !important;" placeholder='Requestor' pattern="03\d{2}-\d{7}"  class='input-text-policy' maxlength='30'></input>
  <br>
  <br>
  <center><label class='form-label' style='font-size: 10px;margin-bottom: 5px;position: relative'>Modification for Primary / Additional Insured?</label></center>
  <select class="select" name="insured" id="input-text5-${index}">
    <option value="primary insured">Primary Insured</option>
    <option value="additional insured">Additional Insured</option>
  </select>
  
  <br>
  <br>
  <center><label class='form-label' style='font-size: 10px;margin-bottom: 5px;position: relative'>What DoB appears today</label></center>
  <input id='date-picker1-${index}' style='text-align: center; font-size: 10px; width: 100%; height: 24px !important; position: relative;' type='text' placeholder='MM/DD/YYYY'  class='dates-picker' readonly="readonly" /><br>

  <br>
  <center><label class='form-label' style='font-size: 10px;margin-bottom: 5px;position: relative'>Correct DoB?</label></center>
  <input id='date-picker2-${index}' style='text-align: center; font-size: 10px; width: 100%; height: 24px !important; position: relative;' type='text' placeholder='MM/DD/YYYY'  class='dates-picker' readonly="readonly" /><br>

  <center><label class='form-label-text-${index}' style='font-size: 10px;margin-bottom: 5px; color:red!important'>Please complete all the details</label></center>
  <center><button id='button-sumbit-${index}' style='position: relative; width: 200px;' class='button-submit cx-submit cx-btn cx-btn-primary i18n'>SUBMIT</button>
  </center>`;


  await setTimeout(() => {
    $("#cx-chat-index-" + index + " .cx-message-text").append(template);
    console.log(index);
    $(`.form-label-text-${index}`).hide();

    $(`#input-text3-${index}`).on("input", function (e) {
      let pattern = /([^0-9]+)/gi;
      if (pattern.test($(this).val())) {
        $(this).val($(this).val().replace(/([^0-9]+)/gi, ""));
        $(`.form-label-text-${index}`).show();
        $(`.form-label-text-${index}`).html('Kindly input correct format');
      } else {
        $(`.form-label-text-${index}`).hide();
        $(`.form-label-text-${index}`).html('Please complete all the details');
      }
    });

    $(`#input-text2-${index}`).on("blur", function (e) {
      let pattern = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
      if ($(this).val().match(pattern)) {
        $(`.form-label-text-${index}`).hide();
        $(`.form-label-text-${index}`).html('Please complete all the details');
      } else {
        $(`.form-label-text-${index}`).show();
        $(`.form-label-text-${index}`).html('Kindly input correct format');
      }
    });

    var dateToday = new Date();
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

    if(policyEmail != '') $(`#input-text2-${index}`).attr('disabled', true)

  }, 40);
  return `#input-text0-${index},#input-text1-${index},#input-text2-${index},#input-text3-${index},#input-text4-${index},#input-text5-${index},#date-picker1-${index},#date-picker2-${index},#button-sumbit-${index}`;
}

async function inputPolicyModificationDateBirthSender(data, index) {
  await $(() => {
    var split = data.split(",");
    let pattern = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    setTimeout(() => {
      for (var j = 0; j < split.length; j++) {
        $(".cx-send").on("keyup click", function (e) {
          $(`.form-label-dateError-${index}`).hide();
          $(`body .dates-picker`).prop("disabled", true);
          $(`body ${split[j]}`).prop("disabled", true);
        });
      }

      // $(`body ${split[1]}`).click(() => {
      //   if (hasData == true) {
      //     $(`body .dates-picker`).prop("disabled", true);
      //     $(`body ${split[1]}`).prop("disabled", true);
      //     $(`body ${split[1]}`).css("background", "#001871");
      //     $(`body ${split[1]}`).css("color", "#ffffff");
      //     $(`body ${split[1]}`).css("font-weight", "600");
      //     $(`body ${split[1]}`).css("pointer-events", "none");

      //     $(`body ${split[2]}`).prop("disabled", true);

      //     $(`body ${split[2]}`).css("pointer-events", "none");
      //     $(`.form-label-dateError-${index}`).hide();

      //   }
      // });

      $(`body ${split[8]}`).click(() => {
        if (
          $(`body ${split[0]}`).val() == "" ||
          $(`body ${split[1]}`).val() == "" ||
          $(`body ${split[2]}`).val() == "" ||
          $(`body ${split[3]}`).val() == "" ||
          $(`body ${split[4]}`).val() == "" ||
          $(`body ${split[5]}`).val() == "" ||
          $(`body ${split[6]}`).val() == "" ||
          $(`body ${split[7]}`).val() == ""
        ) {
          $(`.form-label-text-${index}`).show();
          $(`.form-label-text-${index}`).html('Please complete all the details');
        } else if (!$(`body ${split[2]}`).val().match(pattern)) {
          $(`.form-label-text-${index}`).show();
          $(`.form-label-text-${index}`).html('Kindly input correct format');
        } else {
          $(`.form-label-text-${index}`).hide();
          let allValues =
            $(`body ${split[0]}`).val() +
            "|" +
            $(`body ${split[1]}`).val() +
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
            $(`body ${split[7]}`).val() +
            "|" +
            "SUBMIT";
          $(`#cx_input`).focus();
          $(`#cx_input`).val(allValues);
          resetTimer();
          $(".cx-send").trigger("click");
          $(`body ${split[1]}`).prop("disabled", true);

          $(`body ${split[1]}`).css("pointer-events", "none");

          $(`body ${split[8]}`).prop("disabled", true);
          $(`body ${split[8]}`).css("background", "#001871");
          $(`body ${split[8]}`).css("color", "#ffffff");
          $(`body ${split[8]}`).css("font-weight", "600");
          $(`body ${split[8]}`).css("pointer-events", "none");
          findClaimResponse = true;
        }
      });
    }, 40);
  });

  return await true;
}


// Address
async function inputPolicyModificationAddressParser(index) {
  var template = `
  <center><label style="font-size: 12px; font-weight: bold;">Policy Holder Details</label></center><br>
  <div class="row-change-date">
    <div>
      <center><label class='form-label' style='font-size: 10px;margin-bottom: 5px;position: relative'>Policy #</label></center>
      <input type='text' id='input-text0-${index}' style="width: 100%; height: 24px !important; font-weight: 400; font-size: 10px; text-align: center;"  placeholder='1234567' pattern="03\d{2}-\d{7}" class='input-text-name' value="${policyNumber}" disabled></input><br>
    </div>
    <div>
     <center><label class='form-label' style='font-size: 10px;margin-bottom: 5px;position: relative'>Insured's Last Name</label></center>
      <input type='text' id='input-text1-${index}' style="width: 100%; height: 24px !important; font-weight: 400; font-size: 10px; text-align: center;"  placeholder='John Doe' pattern="03\d{2}-\d{7}"  class='input-text-policy-number' value="${policyName}" disabled></input><br>
    </div>
  </div>
  <div class="row-change-date">
    <div>
      <center><label class='form-label' style='font-size: 10px;margin-bottom: 5px;position: relative'>Email</label></center>
      <input type='email' id='input-text2-${index}' style="width: 100%; height: 24px !important; font-weight: 400; font-size: 10px; text-align: center;"  placeholder='johndoe@gmail.com' pattern="03\d{2}-\d{7}" class='input-text-email' value="${policyEmail}" maxlength='30'></input><br>
    </div>
    <div>
      <center><label class='form-label' style='font-size: 10px;margin-bottom: 5px;position: relative'>Contact Number</label></center>
      <input type='text' id='input-text3-${index}' style="width: 100%; height: 24px !important; font-weight: 400; font-size: 10px; text-align: center;"  placeholder='Contact Number' pattern="03\d{2}-\d{7}"  class='input-text-contact' maxlength='10'></input><br>
    </div>
  </div>
  <center><label class='form-label' style='font-size: 10px;margin-bottom: 5px;position: relative'>Person Requesting Change</label></center>
  <input type='text' id='input-text4-${index}' style="text-align: center; width: 100%; font-weight: 400; height: 24px !important; font-size: 10px;"  placeholder='Requestor' pattern="03\d{2}-\d{7}"  class='input-text-policy' maxlength='30'></input>
  
  <br>
  <br>
  <center><label class='form-label' style='font-size: 10px;margin-bottom: 5px;position: relative'>How Address appears today</label></center>
  <textarea id='input-text6-${index}' style="text-align: center; width: 100%; font-weight: 400; height: 48px !important; font-size: 10px;" pattern="03\d{2}-\d{7}"  class='input-text-policy' maxlength='255'></textarea>

  <br>
  <center><label class='form-label' style='font-size: 10px;margin-bottom: 5px;position: relative'>Correct Address?</label></center>
  <textarea id='input-text7-${index}' style="text-align: center; width: 100%; font-weight: 400; height: 48px !important; font-size: 10px;" pattern="03\d{2}-\d{7}"  class='input-text-policy' maxlength='255'></textarea>

  <center><label class='form-label-text-${index}' style='font-size: 10px;margin-bottom: 5px; color:red!important'>Please complete all the details</label></center>
  <center><button id='button-sumbit-${index}' style='position: relative; width: 200px;' class='button-submit cx-submit cx-btn cx-btn-primary i18n'>SUBMIT</button>
  </center>`;


  await setTimeout(() => {
    $("#cx-chat-index-" + index + " .cx-message-text").append(template);
    console.log(index);
    $(`.form-label-text-${index}`).hide();

    $(`#input-text3-${index}`).on("input", function (e) {
      let pattern = /([^0-9]+)/gi;
      if (pattern.test($(this).val())) {
        $(this).val($(this).val().replace(/([^0-9]+)/gi, ""));
        $(`.form-label-text-${index}`).show();
        $(`.form-label-text-${index}`).html('Kindly input correct format');
      } else {
        $(`.form-label-text-${index}`).hide();
        $(`.form-label-text-${index}`).html('Please complete all the details');
      }
    });

    $(`#input-text2-${index}`).on("blur", function (e) {
      let pattern = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
      if ($(this).val().match(pattern)) {
        $(`.form-label-text-${index}`).hide();
        $(`.form-label-text-${index}`).html('Please complete all the details');
      } else {
        $(`.form-label-text-${index}`).show();
        $(`.form-label-text-${index}`).html('Kindly input correct format');
      }
    });

    if(policyEmail != '') $(`#input-text2-${index}`).attr('disabled', true)

    $(`#input-text6-${index}`).on("input", function (e) {
      if($(this).val().length >= 255) {
        $(this).val($(this).val().slice(0, 255));
        return false;
      }
    });

    $(`#input-text7-${index}`).on("input", function (e) {
      if($(this).val().length >= 255) {
        $(this).val($(this).val().slice(0, 255));
        return false;
      }
    });
    

  }, 40);
  return `#input-text0-${index},#input-text1-${index},#input-text2-${index},#input-text3-${index},#input-text4-${index},#input-text5-${index},#input-text6-${index},#input-text7-${index},#button-sumbit-${index}`;
}

async function inputPolicyModificationAddressSender(data, index) {
  await $(() => {
    var split = data.split(",");
    let pattern = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

    function disableButton() {
      $(`body .input-text-address`).prop("disabled", true);
      for (var i = 0; i < split.length; i++) {
        $(`body ${split[i]}`).prop("disabled", true);
        $(`body ${split[i]}`).css("pointer-events", "none");
        // $(`body .button-dont-have-it`).css("pointer-events", "none");
      }
    }
    
    $(".cx-send").on("keyup click", function (e) {
      $(`.form-label-dateError-${index}`).hide();
      $(`body .dates-picker`).prop("disabled", true);
      disableButton()
    });
    

    setTimeout(() => {
      $(`body ${split[8]}`).click(() => {
        if (
          $(`body ${split[0]}`).val() == "" ||
          $(`body ${split[1]}`).val() == "" ||
          $(`body ${split[2]}`).val() == "" ||
          $(`body ${split[3]}`).val() == "" ||
          $(`body ${split[4]}`).val() == "" ||
          // $(`body ${split[5]}`).val() == "" ||
          $(`body ${split[6]}`).val() == "" ||
          $(`body ${split[7]}`).val() == ""
        ) {
          $(`.form-label-text-${index}`).show();
          $(`.form-label-text-${index}`).html('Please complete all the details');
        } else if (!$(`body ${split[2]}`).val().match(pattern)) {
          $(`.form-label-text-${index}`).show();
          $(`.form-label-text-${index}`).html('Kindly input correct format');
        } else {
          $(`.form-label-text-${index}`).hide();
          let allValues =
            $(`body ${split[0]}`).val() +
            "|" +
            $(`body ${split[1]}`).val() +
            "|" +
            $(`body ${split[2]}`).val() +
            "|" +
            $(`body ${split[3]}`).val() +
            "|" +
            $(`body ${split[4]}`).val() +
            // "|" +
            // $(`body ${split[5]}`).val() +
            "|" +
            $(`body ${split[6]}`).val() +
            "|" +
            $(`body ${split[7]}`).val() +
            "|" +
            "SUBMIT";
          $(`#cx_input`).focus();
          $(`#cx_input`).val(allValues);
          resetTimer();
          $(".cx-send").trigger("click");
          $(`body ${split[1]}`).prop("disabled", true);

          $(`body ${split[1]}`).css("pointer-events", "none");

          $(`body ${split[8]}`).prop("disabled", true);
          $(`body ${split[8]}`).css("background", "#001871");
          $(`body ${split[8]}`).css("color", "#ffffff");
          $(`body ${split[8]}`).css("font-weight", "600");
          $(`body ${split[8]}`).css("pointer-events", "none");
          findClaimResponse = true;
        }
      });
    }, 40);
  });

  return await true;
}

// Beneficiary
async function inputPolicyModificationBeneficiaryParser(index) {
  var template = `
  <center><label style="font-size: 12px; font-weight: bold;">Policy Holder Details</label></center><br>
  <div class="row-change-date">
    <div>
      <center><label class='form-label' style='font-size: 10px;margin-bottom: 5px;position: relative'>Policy #</label></center>
      <input type='text' id='input-text0-${index}' style="width: 100%; height: 24px !important; font-weight: 400; font-size: 10px; text-align: center;"  placeholder='1234567' pattern="03\d{2}-\d{7}" class='input-text-name' value="${policyNumber}" disabled></input><br>
      
    </div>
    <div>
      <center><label class='form-label' style='font-size: 10px;margin-bottom: 5px;position: relative'>Insured's Last Name</label></center>
      <input type='text' id='input-text1-${index}' style="width: 100%; height: 24px !important; font-weight: 400; font-size: 10px; text-align: center;"  placeholder='John Doe' pattern="03\d{2}-\d{7}"  class='input-text-policy-number' value="${policyName}" disabled></input><br>
    </div>
  </div>
  <div class="row-change-date">
    <div>
      <center><label class='form-label' style='font-size: 10px;margin-bottom: 5px;position: relative'>Email</label></center>
      <input type='email' id='input-text2-${index}' style="width: 100%; height: 24px !important; font-weight: 400; font-size: 10px; text-align: center;"  placeholder='johndoe@gmail.com' pattern="03\d{2}-\d{7}" class='input-text-email' value="${policyEmail}" maxlength='30'></input><br>
    </div>
    <div>
    <center><label class='form-label' style='font-size: 10px;margin-bottom: 5px;position: relative'>Contact Number</label></center>
      <input type='text' id='input-text3-${index}' style="width: 100%; height: 24px !important; font-weight: 400; font-size: 10px; text-align: center;"  placeholder='Contact Number' pattern="03\d{2}-\d{7}"  class='input-text-contact' maxlength='10'></input><br>
    </div>
  </div>
  <center><label class='form-label' style='font-size: 10px;margin-bottom: 5px;position: relative'>Person Requesting Change</label></center>
  <input type='text' id='input-text4-${index}' style="text-align: center; width: 100%; font-weight: 400; height: 24px !important; font-size: 10px;"  placeholder='Requestor' pattern="03\d{2}-\d{7}"  class='input-text-policy' maxlength='30'></input>
  
  <br>
  <br>
  <center><label class='form-label' style='font-size: 10px;margin-bottom: 5px;position: relative'>Beneficiary names to be added</label></center>
  <input type='text' id='input-text6-${index}' style="text-align: center; width: 100%; font-weight: 400; height: 24px !important; font-size: 10px;" placeholder="Beneficiary 1 (mandatory)" pattern="03\d{2}-\d{7}"  class='input-text-policy' maxlength='30'></input>
  
  <br>
  <br>
  <input type='text' id='input-text7-${index}' style="text-align: center; width: 100%; font-weight: 400; height: 24px !important; font-size: 10px;" placeholder="Beneficiary 2" pattern="03\d{2}-\d{7}"  class='input-text-policy' maxlength='30'></input>
 
  <br><br>
  <input type='text' id='input-text8-${index}' style="text-align: center; width: 100%; font-weight: 400; height: 24px !important; font-size: 10px;" placeholder="Beneficiary 3" pattern="03\d{2}-\d{7}"  class='input-text-policy' maxlength='30'></input>
  <center>
  <label class='form-label-text-${index}' style='top: 4px; font-size: 10px; color:red!important'>Please complete all the details</label>
  <button id='button-sumbit-${index}' style='position: relative; width: 200px;' class='button-submit cx-submit cx-btn cx-btn-primary i18n'>SUBMIT</button>
  </center>`;


  await setTimeout(() => {
    $("#cx-chat-index-" + index + " .cx-message-text").append(template);
    console.log(index);
    $(`.form-label-text-${index}`).hide();

    $(`#input-text3-${index}`).on("input", function (e) {
      let pattern = /([^0-9]+)/gi;
      if (pattern.test($(this).val())) {
        $(this).val($(this).val().replace(/([^0-9]+)/gi, ""));
        $(`.form-label-text-${index}`).show();
        $(`.form-label-text-${index}`).html('Kindly input correct format');
      } else {
        $(`.form-label-text-${index}`).hide();
        $(`.form-label-text-${index}`).html('Please complete all the details');
      }
    });

    $(`#input-text2-${index}`).on("blur", function (e) {
      let pattern = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
      if ($(this).val().match(pattern)) {
        $(`.form-label-text-${index}`).hide();
        $(`.form-label-text-${index}`).html('Please complete all the details');
      } else {
        $(`.form-label-text-${index}`).show();
        $(`.form-label-text-${index}`).html('Kindly input correct format');
      }
    });

    if(policyEmail != '') $(`#input-text2-${index}`).attr('disabled', true)

  }, 40);
  return `#input-text0-${index},#input-text1-${index},#input-text2-${index},#input-text3-${index},#input-text4-${index},#input-text5-${index},#input-text6-${index},#input-text7-${index},#input-text8-${index},#button-sumbit-${index}`;
}

async function inputPolicyModificationBeneficiarySender(data, index) {
  await $(() => {
    var split = data.split(",");
    let pattern = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    setTimeout(() => {
      for (var j = 0; j < split.length; j++) {
        $(".cx-send").on("keyup click", function (e) {
          $(`.form-label-dateError-${index}`).hide();
          $(`body .dates-picker`).prop("disabled", true);
          $(`body ${split[j]}`).prop("disabled", true);
        });
      }

      $(`body ${split[9]}`).click(() => {
        if (
          $(`body ${split[0]}`).val() == "" ||
          $(`body ${split[1]}`).val() == "" ||
          $(`body ${split[2]}`).val() == "" ||
          $(`body ${split[3]}`).val() == "" ||
          $(`body ${split[4]}`).val() == "" ||
          // $(`body ${split[5]}`).val() == "" ||
          $(`body ${split[6]}`).val() == ""
          // $(`body ${split[7]}`).val() == "" ||
          // $(`body ${split[8]}`).val() == ""
        ) {
          $(`.form-label-text-${index}`).show();
          $(`.form-label-text-${index}`).html('Please complete all the details');
        } else if (!$(`body ${split[2]}`).val().match(pattern)) {
          $(`.form-label-text-${index}`).show();
          $(`.form-label-text-${index}`).html('Kindly input correct format');
        } else {
          $(`.form-label-text-${index}`).hide();
          let allValues =
            $(`body ${split[0]}`).val() +
            "|" +
            $(`body ${split[1]}`).val() +
            "|" +
            $(`body ${split[2]}`).val() +
            "|" +
            $(`body ${split[3]}`).val() +
            "|" +
            $(`body ${split[4]}`).val() +
            "|" +
            // $(`body ${split[5]}`).val() +
            // "|" +
            $(`body ${split[6]}`).val() +
            "|" +
            $(`body ${split[7]}`).val() +
            "|" +
            $(`body ${split[8]}`).val() +
            "|" +
            "SUBMIT";
          $(`#cx_input`).focus();
          $(`#cx_input`).val(allValues);
          resetTimer();
          console.log(allValues);
          $(".cx-send").trigger("click");
          $(`body ${split[1]}`).prop("disabled", true);

          $(`body ${split[1]}`).css("pointer-events", "none");

          $(`body ${split[9]}`).prop("disabled", true);
          $(`body ${split[9]}`).css("background", "#001871");
          $(`body ${split[9]}`).css("color", "#ffffff");
          $(`body ${split[9]}`).css("font-weight", "600");
          $(`body ${split[9]}`).css("pointer-events", "none");
          findClaimResponse = true;
        }
      });
    }, 40);
  });

  return await true;
}


async function inputPolicyModificationTripDateParser(index) {
  var template = `
  <center><label style="font-size: 12px; font-weight: bold;">Policy Holder Details</label></center><br>
  <div class="row-change-date">
    <div>
      <center><label class='form-label' style='font-size: 10px;margin-bottom: 5px;position: relative'>Policy #</label></center>
      <input type='text' id='input-text0-${index}' style="width: 100%; height: 24px !important; font-weight: 400; font-size: 10px; text-align: center;"  placeholder='1234567' pattern="03\d{2}-\d{7}" class='input-text-name' value=${policyNumber} disabled></input><br>
    </div>
    <div>
      <center><label class='form-label' style='font-size: 10px;margin-bottom: 5px;position: relative'>Insured's Last Name</label></center>
      <input type='text' id='input-text1-${index}' style="width: 100%; height: 24px !important; font-weight: 400; font-size: 10px; text-align: center;"  placeholder='John Doe' pattern="03\d{2}-\d{7}"  class='input-text-policy-number' value="${policyName}" disabled></input><br>
    </div>
  </div>
  <div class="row-change-date">
    <div>
      <center><label class='form-label' style='font-size: 10px;margin-bottom: 5px;position: relative'>Email</label></center>
      <input type='email' id='input-text2-${index}' style="width: 100%; height: 24px !important; font-weight: 400; font-size: 10px; text-align: center;"  placeholder='johndoe@gmail.com' pattern="03\d{2}-\d{7}" class='input-text-email' value="${policyEmail}" ></input><br>
    </div>
    <div>
      <center><label class='form-label' style='font-size: 10px;margin-bottom: 5px;position: relative'>Contact Number</label></center>
      <input type='text' id='input-text3-${index}' style="width: 100%; height: 24px !important; font-weight: 400; font-size: 10px; text-align: center;"  placeholder='Contact Number' pattern="03\d{2}-\d{7}"  class='input-text-contact' maxlength='10'></input><br>
    </div>
  </div>
  <center><label class='form-label' style='font-size: 10px;margin-bottom: 5px;position: relative'>Person Requesting Change</label></center>
  <input type='text' id='input-text4-${index}' style="text-align: center; width: 100%; font-weight: 400; height: 24px !important; font-size: 10px;"  placeholder='Requestor' pattern="03\d{2}-\d{7}"  class='input-text-policy' maxlength='30'></input>
  <br>
  <br>
  <center><label class='form-label' style='font-size: 10px; position:relative;'>Original Dates (MM/DD/YYYY)</label></center>
  <div class="row-change-date">
    <input id='input-text5-${index}' style='font-size: 10px; width: 95%; height: 24px !important; position: relative; text-align: center!important; top: 0px!important;'' type='text' placeholder='MM/DD/YYYY'  class='dates-picker' readonly="readonly" />
    <label class='form-label' style='font-size: 10px;'>&nbsp;&nbsp;&nbsp;to&nbsp;&nbsp;&nbsp;</label>
    <input id='input-text6-${index}' style='font-size: 10px; width: 95%; height: 24px !important; position: relative; text-align: center!important; top: 0px!important;'' type='text' placeholder='MM/DD/YYYY'  class='dates-picker' readonly="readonly" />
  </div>
  
  <center><label class='form-label' style='font-size: 10px; position:relative;'>New Dates (MM/DD/YYYY)</label></center>
  <div class="row-change-date">

    <input id='input-text7-${index}' style='font-size: 10px; width: 95%; height: 24px !important; position: relative; text-align: center!important; top: 0px!important;'' type='text' placeholder='MM/DD/YYYY'  class='dates-picker' readonly="readonly" />
    <label class='form-label' style='font-size: 10px;'>&nbsp;&nbsp;&nbsp;to&nbsp;&nbsp;&nbsp;</label>
    <input id='input-text8-${index}' style='font-size: 10px; width: 95%; height: 24px !important; position: relative; text-align: center!important; top: 0px!important;'' type='text' placeholder='MM/DD/YYYY'  class='dates-picker' readonly="readonly" />
  </div>
  
  <center><label class='form-label-text-${index}' style='font-size: 10px;margin-bottom: 5px; color:red!important'>Please complete all the details</label>
  <button id='button-sumbit-${index}' style='position: relative; width: 200px;' class='button-submit cx-submit cx-btn cx-btn-primary i18n'>SUBMIT</button>
  </center>`;

  var dateToday = new Date();
  
  await setTimeout(() => {
    $("#cx-chat-index-" + index + " .cx-message-text").append(template);
    console.log(index);

    if(policyEmail != '') $(`#input-text2-${index}`).attr('disabled', true)

    $("#input-text5-" + index).datepicker({
      changeMonth: true,
      changeYear: true,
      maxDate: dateToday,
    });
    $("#input-text6-" + index).datepicker({
      changeMonth: true,
      changeYear: true,
      maxDate: dateToday,
    });
    $("#input-text7-" + index).datepicker({
      changeMonth: true,
      changeYear: true,
      maxDate: dateToday,
    });
    $("#input-text8-" + index).datepicker({
      changeMonth: true,
      changeYear: true,
      maxDate: dateToday,
    });

    $(`#input-text3-${index}`).on("input", function (e) {
      let pattern = /([^0-9]+)/gi;
      if (pattern.test($(this).val())) {
        $(this).val($(this).val().replace(/([^0-9]+)/gi, ""));
        $(`.form-label-text-${index}`).show();
        $(`.form-label-text-${index}`).html('Kindly input correct format');
      } else {
        $(`.form-label-text-${index}`).hide();
        $(`.form-label-text-${index}`).html('Please complete all the details');
      }
    });

    $(`#input-text2-${index}`).on("blur", function (e) {
      let pattern = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
      if ($(this).val().match(pattern)) {
        $(`.form-label-text-${index}`).hide();
        $(`.form-label-text-${index}`).html('Please complete all the details');
      } else {
        $(`.form-label-text-${index}`).show();
        $(`.form-label-text-${index}`).html('Kindly input correct format');
      }
    });

    $(`.form-label-text-${index}`).hide();
  }, 40);
  return `#input-text0-${index},#input-text1-${index},#input-text2-${index},#input-text3-${index},#input-text4-${index},#input-text5-${index},#input-text6-${index},#input-text7-${index},#input-text8-${index},#button-sumbit-${index}`;
}

async function inputPolicyModificationTripDateSender(data, index) {
  await $(() => {
    var split = data.split(",");
    let pattern = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    setTimeout(() => {
      for (var j = 0; j < split.length; j++) {
        $(".cx-send").on("keyup click", function (e) {
          $(`.form-label-dateError-${index}`).hide();
          $(`body .dates-picker`).prop("disabled", true);
          $(`body ${split[j]}`).prop("disabled", true);
        });
      }

      $(`body ${split[9]}`).click(() => {
        let isTermsChecked = false;
        $('input[name="agentTerms"]:checked').each(function() {
          isTermsChecked = this.value;
        });
        if (
          $(`body ${split[0]}`).val() == "" ||
          $(`body ${split[1]}`).val() == "" ||
          $(`body ${split[2]}`).val() == "" ||
          $(`body ${split[3]}`).val() == "" ||
          $(`body ${split[4]}`).val() == "" ||
          $(`body ${split[5]}`).val() == "" ||
          $(`body ${split[6]}`).val() == "" ||
          $(`body ${split[7]}`).val() == "" ||
          $(`body ${split[8]}`).val() == "" 
        ) {
          $(`.form-label-text-${index}`).show();
          $(`.form-label-text-${index}`).html('Please complete all the details');
        } else if (!$(`body ${split[2]}`).val().match(pattern)) {
          $(`.form-label-text-${index}`).show();
          $(`.form-label-text-${index}`).html('Kindly input correct format');
        } else {
          $(`.form-label-text-${index}`).hide();
        let allValues =
          $(`body ${split[0]}`).val() +
          "|" +
          $(`body ${split[1]}`).val() +
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
          $(`body ${split[7]}`).val() +
          "|" +
          $(`body ${split[8]}`).val() +
          "|" +
          "SUBMIT"; 
        $(`#cx_input`).focus();
        $(`#cx_input`).val(allValues);
        resetTimer();
        console.log(allValues)
        $(".cx-send").trigger("click");
        $(`.form-label-dateError-${index}`).hide();
        $(`body .dates-picker`).prop("disabled", true);
        $(`body ${split[1]}`).prop("disabled", true);

        $(`body ${split[1]}`).css("pointer-events", "none");

        $(`body ${split[9]}`).prop("disabled", true);
        $(`body ${split[9]}`).css("background", "#001871");
        $(`body ${split[9]}`).css("color", "#ffffff");
        $(`body ${split[9]}`).css("font-weight", "600");
        $(`body ${split[9]}`).css("pointer-events", "none");
        findClaimResponse = true;
        }
      });
    }, 40);
  });
  return await true;
}

async function inputPolicyModificationTripCostParser(index) {
  var template = `
  <center><label style="font-size: 12px; font-weight: bold;">Policy Holder Details</label></center><br>
  <div class="row-change-date">
    <div>
      <center><label class='form-label' style='font-size: 10px;margin-bottom: 5px;position: relative'>Policy #</label></center>
      <input type='text' id='input-text0-${index}' style="width: 100%; height: 24px !important; font-weight: 400; font-size: 10px; text-align: center;"  placeholder='1234567' pattern="03\d{2}-\d{7}" class='input-text-name' value=${policyNumber} disabled></input><br>
    </div>
    <div>
      <center><label class='form-label' style='font-size: 10px;margin-bottom: 5px;position: relative'>Insured's Last Name</label></center>
      <input type='text' id='input-text1-${index}' style="width: 100%; height: 24px !important; font-weight: 400; font-size: 10px; text-align: center;"  placeholder='John Doe' pattern="03\d{2}-\d{7}"  class='input-text-policy-number' value="${policyName}" disabled></input><br>
    </div>
  </div>
  <div class="row-change-date">
    <div>
      <center><label class='form-label' style='font-size: 10px;margin-bottom: 5px;position: relative'>Email</label></center>
      <input type='email' id='input-text2-${index}' style="width: 100%; height: 24px !important; font-weight: 400; font-size: 10px; text-align: center;"  placeholder='johndoe@gmail.com' pattern="03\d{2}-\d{7}" class='input-text-email' value="${policyEmail}" ></input><br>
    </div>
    <div>
      <center><label class='form-label' style='font-size: 10px;margin-bottom: 5px;position: relative'>Contact Number</label></center>
      <input type='text' id='input-text3-${index}' style="width: 100%; height: 24px !important; font-weight: 400; font-size: 10px; text-align: center;"  placeholder='Contact Number' pattern="03\d{2}-\d{7}"  class='input-text-contact' maxlength='10'></input><br>
    </div>
  </div>
  <center><label class='form-label' style='font-size: 10px;margin-bottom: 5px;position: relative'>Person Requesting Change</label></center>
  <input type='text' id='input-text4-${index}' style="text-align: center; width: 100%; font-weight: 400; height: 24px !important; font-size: 10px;"  placeholder='Requestor' pattern="03\d{2}-\d{7}"  class='input-text-policy' maxlength='30'></input>
  <br>
  <br>
  <div class="row-change-date">
    <div>
      <center><label class='form-label' style='font-size: 10px;margin-bottom: 5px;position: relative'>Original Trip Cost ($)</label></center>
      <input type='text' id='input-text5-${index}' style="width: 100%; height: 24px !important; font-weight: 400; font-size: 10px; text-align: center;"  placeholder='$' pattern="03\d{2}-\d{7}" class='input-text-email' ></input>
    </div>
    <div>
      <center><label class='form-label' style='font-size: 10px;margin-bottom: 5px;position: relative'>New Trip Cost ($)</label></center>
      <input type='text' id='input-text6-${index}' style="width: 100%; height: 24px !important; font-weight: 400; font-size: 10px; text-align: center;"  placeholder='$' pattern="03\d{2}-\d{7}"  class='input-text-contact'></input>
    </div>
  </div>
  <center><label class='form-label' style='font-size: 10px; position:relative; top: -10px;'>Primary Insured</label></center>
  <div class="row-change-date">

    <div>
      <center><label class='form-label' style='font-size: 10px;margin-bottom: 5px;position: relative'>Original Trip Cost ($)</label></center>
      <input type='text' id='input-text7-${index}' style="width: 100%; height: 24px !important; font-weight: 400; font-size: 10px; text-align: center;"  placeholder='$' pattern="03\d{2}-\d{7}" class='input-text-email' ></input>
    </div>
    <div>
      <center><label class='form-label' style='font-size: 10px;margin-bottom: 5px;position: relative'>New Trip Cost ($)</label></center>
      <input type='text' id='input-text8-${index}' style="width: 100%; height: 24px !important; font-weight: 400; font-size: 10px; text-align: center;"  placeholder='$' pattern="03\d{2}-\d{7}"  class='input-text-contact'></input>
    </div>
  </div>
  <center><label class='form-label' style='font-size: 10px; position:relative; top: -10px;'>Additional Insured</label></center>
  <center><label class='form-label-text-${index}' style='font-size: 10px;margin-bottom: 5px; color:red!important'>Please complete all the details</label>
  <button id='button-sumbit-${index}' style='position: relative; width: 200px;' class='button-submit cx-submit cx-btn cx-btn-primary i18n'>SUBMIT</button>
  </center>`;

  var dateToday = new Date();
  
  await setTimeout(() => {
    $("#cx-chat-index-" + index + " .cx-message-text").append(template);
    console.log(index);

    if(policyEmail != '') $(`#input-text2-${index}`).attr('disabled', true)
    
    $(`#input-text3-${index}`).on("input", function (e) {
      let pattern = /([^0-9]+)/gi;
      if (pattern.test($(this).val())) {
        $(this).val($(this).val().replace(/([^0-9]+)/gi, ""));
        $(`.form-label-text-${index}`).show();
        $(`.form-label-text-${index}`).html('Kindly input correct format');
      } else {
        $(`.form-label-text-${index}`).hide();
        $(`.form-label-text-${index}`).html('Please complete all the details');
      }
    });

    $(`#input-text2-${index}`).on("blur", function (e) {
      let pattern = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
      if ($(this).val().match(pattern)) {
        $(`.form-label-text-${index}`).hide();
        $(`.form-label-text-${index}`).html('Please complete all the details');
      } else {
        $(`.form-label-text-${index}`).show();
        $(`.form-label-text-${index}`).html('Kindly input correct format');
      }
    });

    $(`#input-text5-${index}`).on("input", function (e) {
      let pattern = /([^0-9.]+)/gi;
      if (pattern.test($(this).val())) {
        $(this).val($(this).val().replace(/([^0-9.]+)/gi, ""));
        $(`.form-label-text-${index}`).show();
        $(`.form-label-text-${index}`).html('Kindly input correct format');
      } else {
        $(`.form-label-text-${index}`).hide();
        $(`.form-label-text-${index}`).html('Please complete all the details');
      }
    });

    $(`#input-text6-${index}`).on("input", function (e) {
      let pattern = /([^0-9.]+)/gi;
      if (pattern.test($(this).val())) {
        $(this).val($(this).val().replace(/([^0-9.]+)/gi, ""));
        $(`.form-label-text-${index}`).show();
        $(`.form-label-text-${index}`).html('Kindly input correct format');
      } else {
        $(`.form-label-text-${index}`).hide();
        $(`.form-label-text-${index}`).html('Please complete all the details');
      }
    });

    $(`#input-text7-${index}`).on("input", function (e) {
      let pattern = /([^0-9.]+)/gi;
      if (pattern.test($(this).val())) {
        $(this).val($(this).val().replace(/([^0-9.]+)/gi, ""));
        $(`.form-label-text-${index}`).show();
        $(`.form-label-text-${index}`).html('Kindly input correct format');
      } else {
        $(`.form-label-text-${index}`).hide();
        $(`.form-label-text-${index}`).html('Please complete all the details');
      }
    });

    $(`#input-text8-${index}`).on("input", function (e) {
      let pattern = /([^0-9.]+)/gi;
      if (pattern.test($(this).val())) {
        $(this).val($(this).val().replace(/([^0-9.]+)/gi, ""));
        $(`.form-label-text-${index}`).show();
        $(`.form-label-text-${index}`).html('Kindly input correct format');
      } else {
        $(`.form-label-text-${index}`).hide();
        $(`.form-label-text-${index}`).html('Please complete all the details');
      }
    });

    $(`.form-label-text-${index}`).hide();
  }, 40);
  return `#input-text0-${index},#input-text1-${index},#input-text2-${index},#input-text3-${index},#input-text4-${index},#input-text5-${index},#input-text6-${index},#input-text7-${index},#input-text8-${index},#button-sumbit-${index}`;
}

async function inputPolicyModificationTripCostSender(data, index) {
  await $(() => {
    var split = data.split(",");
    let pattern = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    setTimeout(() => {
      for (var j = 0; j < split.length; j++) {
        $(".cx-send").on("keyup click", function (e) {
          $(`.form-label-dateError-${index}`).hide();
          $(`body .dates-picker`).prop("disabled", true);
          $(`body ${split[j]}`).prop("disabled", true);
        });
      }

      $(`body ${split[9]}`).click(() => {
        let isTermsChecked = false;
        
        $('input[name="agentTerms"]:checked').each(function() {
          isTermsChecked = this.value;
        });
        if (
          $(`body ${split[0]}`).val() == "" ||
          $(`body ${split[1]}`).val() == "" ||
          $(`body ${split[2]}`).val() == "" ||
          $(`body ${split[3]}`).val() == "" ||
          $(`body ${split[4]}`).val() == ""
          // $(`body ${split[5]}`).val() == "" ||
          // $(`body ${split[6]}`).val() == "" ||
          // $(`body ${split[7]}`).val() == "" ||
          // $(`body ${split[8]}`).val() == "" 
        ) {
          $(`.form-label-text-${index}`).show();
          $(`.form-label-text-${index}`).html('Please complete all the details');
        } else if (!$(`body ${split[2]}`).val().match(pattern)) {
          $(`.form-label-text-${index}`).show();
          $(`.form-label-text-${index}`).html('Kindly input correct format');
        } else {
          $(`.form-label-text-${index}`).hide();
        let allValues =
          $(`body ${split[0]}`).val() +
          "|" +
          $(`body ${split[1]}`).val() +
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
          $(`body ${split[7]}`).val() +
          "|" +
          $(`body ${split[8]}`).val() +
          "|" +
          "SUBMIT"; 
        $(`#cx_input`).focus();
        $(`#cx_input`).val(allValues);
        resetTimer();
        console.log(allValues)
        $(".cx-send").trigger("click");
        $(`.form-label-dateError-${index}`).hide();
        $(`body .dates-picker`).prop("disabled", true);
        $(`body ${split[1]}`).prop("disabled", true);

        $(`body ${split[1]}`).css("pointer-events", "none");

        $(`body ${split[9]}`).prop("disabled", true);
        $(`body ${split[9]}`).css("background", "#001871");
        $(`body ${split[9]}`).css("color", "#ffffff");
        $(`body ${split[9]}`).css("font-weight", "600");
        $(`body ${split[9]}`).css("pointer-events", "none");
        findClaimResponse = true;
        }
      });
    }, 40);
  });
  return await true;
}

function changeRequestor(option,index){
  if(option.value == 'agent'){
    $('.agent-container').show()
  } else {
    $('.agent-container').hide();
  }
  $(`.form-label-text-${index}`).hide();
}