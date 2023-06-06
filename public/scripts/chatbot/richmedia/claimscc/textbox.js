

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






// LAST NAME and CLAIM NUMBER
async function inputClaimLastnameTagParserCC(index, label) {

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
                     <br><center><button id='button-sumbit-${index}' style='width: 200px' class='button-submit cx-submit cx-btn cx-btn-primary i18n'>FIND CLAIM STATUS</button>
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
     // document.querySelector('body .cx-transcript').style.setProperty("overflow-y", "hidden", "important");


      
      // $(`.cx-smokescreen`).show();

    })

    $(`#button-claim-info-${index}`).on("click", function(e){
      $('.claim-info-window').css("display", "block");
      $('.cx-webchat div.cx-input-container').css("z-index", 0);
      if(/iPhone|Mac|iPad|iPod/i.test(navigator.userAgent)){
        $('.claim-info-window').css("right", '4%');

      } else if (/Android/i.test(navigator.userAgent)){
        $('.claim-info-window').css("right", '1%');
      }
     // document.querySelector('body .cx-transcript').style.setProperty("overflow-y", "hidden", "important");


     // $(`.cx-smokescreen`).show();
    })

  }, 40);
  return `#input-text-${index},#button-sumbit-${index},#input-text2-${index},#input-uc-${index},#button-claim-info-agent${index}`;
}

async function inputClaimLastnameSenderCC(data, index) {
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

async function inputDocumentStatusListParserCC(data, index) {

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
  return `#input-text-${index},#button-sumbit-${index},#input-text2-${index}`;
}

async function inputDocumentStatusTableParserCC(data, index) {
  let str = data.trim().substring(0, data.length - 2);
  let splitList = str.split(',');
  let optionBuilder = '';
  var html = '';
  console.log(splitList)
  html += `<h6 class="document-table-header">Please find the current status of your documents here:</h6><table id="document-table">
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

function getLastword(words) {
  var n = words.split(" ");
  return n[n.length - 1];

}

async function inputRequirementChecklistCC(data, index) {

  let split = data.split('#')[0];
  let header = split.includes("reason:") ? split.split("reason:")[0] : split.split("reason.")[0] 
  let itemsList = split.includes("reason:") ? split.split('reason:')[1] : split.split("reason.")[1];
  let items = itemsList.includes("<br><br>") ? itemsList.substr(9) : itemsList.substr(5)
  let splitList = items.split('<br>');
  let filtered = splitList.filter(function(el) {
    return el.length != 0
  })

  let removeEmpty = filtered.filter(function(el) {
    return el != "   "
  })
  // console.log(removeEmpty)
  let optionBuilder = '';
  var html = '';

  // console.log(splitList)
  html += `<h6 class="document-table-header">${header} reason:</h6>
            <div class="frame-box">`
  await _.forEach(removeEmpty, (data) => {
    optionBuilder += `<div class="frame-list">
    <div class="number"><img src="./img/icons/${data.includes("/") ? getLastword(data.trim().substr(3)).split("/").join("") : getLastword(data.trim().substr(3))}.png" height="25px" width="25px"></div>
    <div class="list-details">${items.includes('\n') ? data.substr(3) : data.substr(2).trim()}</div>
  </div>`
  })
  html += optionBuilder;
  html += `</table>`
  setTimeout(() => {
    $("#cx-chat-index-" + index + " .cx-message-text").append(html);

  }, 40);
  return `#input-text-${index},#button-sumbit-${index},#input-text2-${index}`;
}


async function inputRequirementChecklistReSelectCC(data, index) {

  let split = data.split('#')[0];
  let header = split.includes("reason:") ? split.split("reason:")[0] : split.split("reason.")[0] 
  let itemsList = split.includes("reason:") ? split.split('reason:')[1] : split.split("reason.")[1];
  let items = itemsList.includes("<br><br>") ? itemsList.substr(9) : itemsList.substr(4)
  let splitList = items.includes('<br>') ? items.split('<br>') : items.split('\n');
  let filtered = splitList.filter(function(el) {
    return el.length != 0
  })

  let removeEmpty = filtered.filter(function(el) {
    return el != "   "
  })
  let optionBuilder = '';
  var html = '';
  // console.log(splitList)
  html += `<h6 class="document-table-header">${header} reason:</h6>
            <div class="frame-box">`
  await _.forEach(removeEmpty, (data) => {
    optionBuilder += `<div class="frame-list">
    <div class="number"><img src="./img/icons/${data.includes("/") ? getLastword(data.trim().substr(3)).split("/").join("") : getLastword(data.trim().substr(3))}.png" height="25px" width="25px"></div>
    <div class="list-details">${items.includes('\n') ? data.substr(3) : data.substr(2).trim()}</div>
  </div>`
  })
  html += optionBuilder;
  html += `</table> <br><center><button id='button-sumbit-${index}' style='width: 200px' class='button-submit cx-submit cx-btn cx-btn-primary i18n'>CONTINUE</button></center>`
  setTimeout(() => {
    $("#cx-chat-index-" + index + " .cx-message-text").append(html);

  }, 40);
  return `#input-text-${index},#button-sumbit-${index},#input-text2-${index}`;
}


async function inputRequirementChecklistSenderCC(data, index) {
  await $(() => {
    var split = data.split(",");
    //console.log(index)


    function disableButton() {

      for (var i = 0; i < split.length; i++) {
        $(`body ${split[i]}`).prop("disabled", true);
        $(`body ${split[i]}`).css("background", "#1352de");
        $(`body ${split[i]}`).css("color", "#ffffff");
        $(`body ${split[i]}`).css("font-weight", "600");

      }
    }
    for (var j = 0; j < split.length; j++) {
      $(".cx-send").on("keyup click", function (e) {
        disableButton();

      });
    }
    setTimeout(() => {


      $(`body ${split[1]}`).click(() => {
        
        sender($(split[1]).text().toUpperCase().trim());
        disableButton();
        
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

async function inputTextAreaofImprovementParserCC(index) {
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

async function inputTextHidevalueSenderCC(data) {
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


