// BUTTONS


async function sender(value) {
  $(`#cx_input`).focus();
  $(".cx-send").trigger('click', $(`#cx_input`).val(value));

  
}



async function yesFirsLoadButtonSender(data, radio) {
  $(`body .buttonHeader-yes`).css("background", "#1352de");
  $(`body .buttonHeader-yes`).css("color", "#ffffff");
  $(`body .buttonHeader-yes`).css("font-weight", "300");
  $(`body .buttonHeader-yes`).css("pointer-events", "none");
  $(`body .buttonHeader-no`).css("pointer-events", "none");

  setTimeout(() => {
    $(`#cx_input`).focus();
    $(`#cx_input`).val("YES");
    $(".cx-send").trigger("click");
  }, 50);
}

async function noFirsLoadButtonSender(data, radio) {
  $(`body .buttonHeader-no`).css("background", "#1352de");
  $(`body .buttonHeader-no`).css("color", "#ffffff");
  $(`body .buttonHeader-no`).css("font-weight", "300");
  $(`body .buttonHeader-no`).css("pointer-events", "none");
  $(`body .buttonHeader-yes`).css("pointer-events", "none");
  setTimeout(() => {
    $(`#cx_input`).focus();
    $(`#cx_input`).val("NO");
    $(".cx-send").trigger("click");
  }, 50);
}

async function yesNoFirstLoadButtonParser(toArray, index) {
  var html = toArray;

  html += `<br><br><center>
<button id='button-yes-${index}' class='button-yes cx-yes cx-btn cx-btn-primary i18n' style="width: 200px; position: relative;">YES</button>
<button id='button-no-${index}' class='button-no cx-no cx-btn cx-btn-primary i18n' style="width: 200px; position: relative;">NO</button></center>
</div>`;
  await setTimeout(() => {
    //    document.getElementById("cx-chat-index-"+e.data.messages[i].index).append(json2html.render(data,template))
    $("#cx-chat-index-" + index + " .cx-message-text").html(null);
    $("#cx-chat-index-" + index + " .cx-message-text").html(html);
  }, 40);

  return `#button-yes-${index},#button-no-${index}`;
}

async function yesNoFirstLoadButtonSender(data, radio) {
  await $(() => {
    var split = data.split(",");
    function disableButton() {
      for (var i = 0; i < split.length; i++) {
        $(`body ${split[i]}`).prop("disabled", true);
        $(`body ${split[i]}`).css("pointer-events", "none");
      }
    }
      $(".cx-send").on("keyup click", function (e) {
        disableButton();
        resetTimer();
      });
      $(".cx-message-input").keyup(function (e) {
        if (e.which == 13) {
          disableButton();
          resetTimer();
        }
      });

    
    setTimeout(() => {
      for (let k = 0; k <= split.length - 1; k++) {
        $(`body ${split[k]}`).on("click", (e) => {
          $(`body ${split[k]}`).css("background", "#1352de");
          $(`body ${split[k]}`).css("color", "#ffffff");
          $(`body ${split[k]}`).css("font-weight", "300");
          disableButton();
          sender($(split[k]).text().toUpperCase().trim());
        });
      }
    }, 50);
  });
  return await true;
}

async function likeButtonParser(toArray, index) {
  var html = ``;

  // html += `<button id='button-sumbit-${index}' class="btnLike"><img src="img/thumbsUp.png" width="25" height="25"/></button>
  // <button id='button-none-${index}' class="btnDislike"><img src="img/thumbsDown.png" width="25" height="25"/></button></div>`
  html += `<button id='button-sumbit-${index}' class="btnLike"><i class="far fa-thumbs-up fa-2x"></i></button>
  <button id='button-none-${index}' class="btnDislike"><i class="far fa-thumbs-down fa-2x"></i></button></div>`;
  await setTimeout(() => {
    //    document.getElementById("cx-chat-index-"+e.data.messages[i].index).append(json2html.render(data,template))

    $("#cx-chat-index-" + index + " .cx-message-text").html(null);
    $("#cx-chat-index-" + index + " .cx-message-text").html(html);
  }, 40);

  return `#button-sumbit-${index},input[type='radio'][name='optradio${index}']:checked,#button-none-${index}`;
}

async function likeButtonReParser(toArray, index) {
  var html = ``;

  // html += `<button id='button-sumbit-${index}' class="btnLike"><img src="img/thumbsUp.png" width="25" height="25"/></button>
  // <button id='button-none-${index}' class="btnDislike"><img src="img/thumbsDown.png" width="25" height="25"/></button></div>`
  html += `<style='font-size: 14px;'>${toArray}</label><br><br>
  <button id='button-sumbit-${index}' class="btnLike" style='position: relative; top: 0px;'><i class="far fa-thumbs-up fa-2x"></i></button>
  <button id='button-none-${index}' class="btnDislike" style='position: relative; top: 9px;  right: 2px;'><i class="far fa-thumbs-down fa-2x"></i></button></div>`;
  await setTimeout(() => {
    //    document.getElementById("cx-chat-index-"+e.data.messages[i].index).append(json2html.render(data,template))

    $("#cx-chat-index-" + index + " .cx-message-text").html(null);
    $("#cx-chat-index-" + index + " .cx-message-text").html(html);
  }, 40);

  return `#button-sumbit-${index},input[type='radio'][name='optradio${index}']:checked,#button-none-${index}`;
}



async function likeButtonSender(data, radio) {
  await $(() => {
    var split = data.split(",");
    function disableButton() {
      for (var i = 0; i < split.length; i++) {
        $(`body ${split[i]}`).prop("disabled", true);
        $(`body ${split[i]}`).css("pointer-events", "none");
      }
    }
      $(".cx-send").on("keyup click", function (e) {
        disableButton();
        resetTimer();
      });
      $(".cx-message-input").keyup(function (e) {
        if (e.which == 13) {
          resetTimer();
          disableButton();

        }
      });

    
    setTimeout(() => {
      $(`body ${split[0]}`).click(() => {
        sender("LIKE");
       // $(`body ${split[0]}`).addClass("fa fa-thumbs-up fa-2x");
        $(`body ${split[0]}`).css("color", "#1352de");
        disableButton();
      });
      $(`body ${split[2]}`).click(() => {
        sender("DISLIKE");
     //   $(`body ${split[2]}`).addClass("fa fa-thumbs-down fa-2x");
        $(`body ${split[2]}`).css("color", "#1352de");
        disableButton();
      });
    }, 40);
  });
  return await true;
}





async function AppliancesButtonParser(toArray, index) {
  var html = ``;

  html += `<center>
  <button id='button-app-${index}' class='button-app cx-app cx-btn cx-btn-primary i18n' style='width: 165px'>APPLIANCES</button>
  <button id='button-elec-${index}' class='button-elec cx-elec cx-btn cx-btn-primary i18n' style='width: 165px'>ELECTRICAL</button>
  <button id='button-heat-${index}' class='button-heat cx-heat cx-btn cx-btn-primary i18n' style='width: 165px'>HEATING & AIR</button>
  <button id='button-plumb-${index}' class='button-plumb cx-plumb cx-btn cx-btn-primary i18n' style='width: 165px'>PLUMBING</button>
  <button id='button-indoor-${index}' class='button-indoor cx-indoor cx-btn cx-btn-primary i18n' style='width: 165px'>INDOOR/OUTDOOR</button>
  <button id='button-noneof-${index}' class='button-noneof cx-noneof cx-btn cx-btn-primary i18n' style='width: 165px'>NONE OF THESE</button>
  </center>
  </div>`;
  await setTimeout(() => {
    //    document.getElementById("cx-chat-index-"+e.data.messages[i].index).append(json2html.render(data,template))
    $("#cx-chat-index-" + index + " .cx-message-text").html(null);
    $("#cx-chat-index-" + index + " .cx-message-text").html(html);
  }, 40);

  return `#button-app-${index},#button-elec-${index},#button-heat-${index},#button-plumb-${index},#button-indoor-${index},#button-noneof-${index}`;
}

async function AppliancesButtonSender(data, radio) {
  await $(() => {
    var split = data.split(",");
    function disableButton() {
      for (var i = 0; i < split.length; i++) {
        $(`body ${split[i]}`).prop("disabled", true);
        $(`body ${split[i]}`).css("pointer-events", "none");
      }
    }
      $(".cx-send").on("keyup click", function (e) {
        disableButton();
        resetTimer();
      });
      $(".cx-message-input").keyup(function (e) {
        if (e.which == 13) {
          resetTimer();      
          disableButton();
        }
      });

    
    setTimeout(() => {
      for (let k = 0; k <= split.length - 1; k++) {
        $(`body ${split[k]}`).click(() => {
          $(`body ${split[k]}`).css("background", "#1352de");
          $(`body ${split[k]}`).css("color", "#ffffff");
          $(`body ${split[k]}`).css("font-weight", "300");
          disableButton();
          sender($(split[k]).text().toUpperCase().trim());
        });
      }
    }, 50);
  });
  return await true;
}

async function InfoButtonParser(toArray, index) {
  var html = ``;

  html += `<center>
  <button id='button-phone-${index}' class='button-phone cx-phone cx-btn cx-btn-primary i18n' style='width: 150px'>PHONE NUMBER</button>
  <button id='button-email-${index}' class='button-email cx-email cx-btn cx-btn-primary i18n' style='width: 150px'>EMAIL ADDRESS</button>
  <button id='button-contract-${index}' class='button-contract cx-contract cx-btn cx-btn-primary i18n' style='width: 150px'>CONTRACT NUMBER</button>
  </center>
  </div>`;
  await setTimeout(() => {
    //    document.getElementById("cx-chat-index-"+e.data.messages[i].index).append(json2html.render(data,template))
    $("#cx-chat-index-" + index + " .cx-message-text").html(null);
    $("#cx-chat-index-" + index + " .cx-message-text").html(html);
  }, 40);

  return `#button-phone-${index},#button-email-${index},#button-contract-${index}`;
}

async function InfoButtonSender(data, radio) {
  await $(() => {
    var split = data.split(",");
    function disableButton() {
      for (var i = 0; i < split.length; i++) {
        $(`body ${split[i]}`).prop("disabled", true);
        $(`body ${split[i]}`).css("pointer-events", "none");
      }
    }
      $(".cx-send").on("keyup click", function (e) {
        disableButton();
        resetTimer();
      });
      $(".cx-message-input").keyup(function (e) {
        if (e.which == 13) {
          resetTimer();
          disableButton();
        }
      });

    
    setTimeout(() => {
      for (let k = 0; k <= split.length - 1; k++) {
        $(`body ${split[k]}`).click(() => {
          $(`body ${split[k]}`).css("background", "#1352de");
          $(`body ${split[k]}`).css("color", "#ffffff");
          $(`body ${split[k]}`).css("font-weight", "300");
          disableButton();
          sender($(split[k]).text().toUpperCase().trim());
        });
      }
    }, 50);
  });
  return await true;
}
async function InfoClaimButtonParser(toArray, index) {
  var html = ``;

  html += `<center>
  <button id='button-phone-${index}' class='button-phone cx-phone cx-btn cx-btn-primary i18n' style='width: 150px'>PHONE NUMBER</button>
  <button id='button-claim-${index}' class='button-claim cx-claim cx-btn cx-btn-primary i18n' style='width: 150px'>CLAIM NUMBER</button>
  </center>
  </div>`;
  await setTimeout(() => {
    //    document.getElementById("cx-chat-index-"+e.data.messages[i].index).append(json2html.render(data,template))
    $("#cx-chat-index-" + index + " .cx-message-text").html(null);
    $("#cx-chat-index-" + index + " .cx-message-text").html(html);
  }, 40);

  return `#button-phone-${index},#button-claim-${index},#button-email-${index},#button-contract-${index}`;
}

async function InfoClaimButtonSender(data, radio) {
  await $(() => {
    var split = data.split(",");
    function disableButton() {
      for (var i = 0; i < split.length; i++) {
        $(`body ${split[i]}`).prop("disabled", true);
        $(`body ${split[i]}`).css("pointer-events", "none");
      }
    }
      $(".cx-send").on("keyup click", function (e) {
        disableButton();
        resetTimer();

      });
      $(".cx-message-input").keyup(function (e) {
        if (e.which == 13) {
          resetTimer();
          disableButton();
        }
      });

    
    setTimeout(() => {
      for (let k = 0; k <= split.length - 1; k++) {
        $(`body ${split[k]}`).click(() => {
          $(`body ${split[k]}`).css("background", "#1352de");
          $(`body ${split[k]}`).css("color", "#ffffff");
          $(`body ${split[k]}`).css("font-weight", "300");
          disableButton();
          sender($(split[k]).text().toUpperCase().trim());
        });
      }
    }, 50);
  });
  return await true;
}

async function confirmButtonParser(toArray, index) {
  var html = ``;

  html += `<center>
  <button id='button-confirm-${index}' class='button-confirm cx-confirm cx-btn cx-btn-primary i18n' style='width: 105px'>CONFIRM</button>
  <button id='button-modify-${index}' class='button-modify cx-modify cx-btn cx-btn-primary i18n' style='width: 105px'>BACK</button>
  </center>
  </div>`;
  await setTimeout(() => {
    //    document.getElementById("cx-chat-index-"+e.data.messages[i].index).append(json2html.render(data,template))
    $("#cx-chat-index-" + index + " .cx-message-text").html(null);
    $("#cx-chat-index-" + index + " .cx-message-text").html(html);
  }, 40);

  return `#button-confirm-${index},#button-modify-${index}`;
}

async function confirmButtonSender(data, radio) {
  await $(() => {
    var split = data.split(",");
    function disableButton() {
      for (var i = 0; i < split.length; i++) {
        $(`body ${split[i]}`).prop("disabled", true);
        $(`body ${split[i]}`).css("pointer-events", "none");
      }
    }
      $(".cx-send").on("keyup click", function (e) {
        disableButton();
        resetTimer();
      });
    
      $(".cx-message-input").keyup(function (e) {
        if (e.which == 13) {
          resetTimer();
          disableButton();
        }
      });

    setTimeout(() => {
      for (let k = 0; k <= split.length - 1; k++) {
        $(`body ${split[k]}`).click(() => {
          $(`body ${split[k]}`).css("background", "#1352de");
          $(`body ${split[k]}`).css("color", "#ffffff");
          $(`body ${split[k]}`).css("font-weight", "300");
          disableButton();
          sender($(split[k]).text().toUpperCase().trim());
        });
      }
    }, 50);
  });
  return await true;
}

async function confirmCancelClaimButtonParser(toArray, index) {
  var html = ``;

  html += `<center>
  <button id='button-confirmClaim-${index}' class='button-confirmClaim cx-confirmClaim cx-btn cx-btn-primary i18n' style='width: 200px'>CONFIRM</button>
  <button id='button-cancelClaim-${index}' class='button-cancelClaim cx-cancelClaim cx-btn cx-btn-primary i18n' style='width: 200px'>CANCEL CLAIM</button>
  </center>
  </div>`;
  await setTimeout(() => {
    //    document.getElementById("cx-chat-index-"+e.data.messages[i].index).append(json2html.render(data,template))
    $("#cx-chat-index-" + index + " .cx-message-text").html(null);
    $("#cx-chat-index-" + index + " .cx-message-text").html(html);
  }, 40);

  return `#button-confirmClaim-${index},#button-cancelClaim-${index}`;
}

async function confirmCancelClaim2ButtonParser(toArray, index) {
  var html = toArray;

  html += `<br><br><center>
  <button id='button-confirmClaim-${index}' class='button-confirmClaim cx-confirmClaim cx-btn cx-btn-primary i18n' style='width: 200px'>CONFIRM</button>
  <button id='button-cancelClaim-${index}' class='button-cancelClaim cx-cancelClaim cx-btn cx-btn-primary i18n' style='width: 200px'>CANCEL CLAIM</button>
  </center>
  </div>`;
  await setTimeout(() => {
    //    document.getElementById("cx-chat-index-"+e.data.messages[i].index).append(json2html.render(data,template))
    $("#cx-chat-index-" + index + " .cx-message-text").html(null);
    $("#cx-chat-index-" + index + " .cx-message-text").html(html);
  }, 40);

  return `#button-confirmClaim-${index},#button-cancelClaim-${index}`;
}

async function confirmCancelClaimButtonSender(data, radio) {
  await $(() => {
    var split = data.split(",");
    function disableButton() {
      for (var i = 0; i < split.length; i++) {
        $(`body ${split[i]}`).prop("disabled", true);
        $(`body ${split[i]}`).css("pointer-events", "none");
      }
    }
      $(".cx-send").on("keyup click", function (e) {
        disableButton();
        resetTimer();
      });
      $(".cx-message-input").keyup(function (e) {
        if (e.which == 13) {
          resetTimer();
          disableButton();
        }
      });

    
    setTimeout(() => {
      for (let k = 0; k <= split.length - 1; k++) {
        $(`body ${split[k]}`).click(() => {
          $(`body ${split[k]}`).css("background", "#1352de");
          $(`body ${split[k]}`).css("color", "#ffffff");
          $(`body ${split[k]}`).css("font-weight", "300");
          disableButton();
          sender($(split[k]).text().toUpperCase().trim());
        });
      }
    }, 50);
  });
  return await true;
}

async function yesButtonParser(toArray, index, thanks = false) {
  var html = toArray;

  html += thanks
    ? `<center><br>
  <button id='button-yes-${index}' class='button-yes cx-yes cx-btn cx-btn-primary i18n' style='width: 200px'>YES</button>
  <button id='button-no-${index}' class='button-no cx-no cx-btn cx-btn-primary i18n' style='width: 200px'>NO THANKS</button>
  </center>
  </div>`
    : `<center><br>
  <button id='button-yes-${index}' class='button-yes cx-yes cx-btn cx-btn-primary i18n' style='width: 200px'>YES</button>
  <button id='button-no-${index}' class='button-no cx-no cx-btn cx-btn-primary i18n' style='width: 200px'>NO</button>
  </center>
  </div>`;
  await setTimeout(() => {
    //    document.getElementById("cx-chat-index-"+e.data.messages[i].index).append(json2html.render(data,template))
    $("#cx-chat-index-" + index + " .cx-message-text").html(null);
    $("#cx-chat-index-" + index + " .cx-message-text").html(html);
  }, 40);

  return `#button-yes-${index},#button-no-${index}`;
}

async function yesButtonSender(data, radio) {
  await $(() => {
    var split = data.split(",");

    $(`.button-getStarted1`).prop("disabled", false);
    $(`.button-getStarted1`).css("pointer-events", "auto");
    $(`.button-getStarted`).prop("disabled", false);
    $(`.button-getStarted`).css("pointer-events", "auto");
    noGetStartedMessage = true;


    function disableButton() {
      for (var i = 0; i < split.length; i++) {
        $(`body ${split[i]}`).prop("disabled", true);
        $(`body ${split[i]}`).css("pointer-events", "none");
      }
    }
      $(".cx-send").on("keyup click", function (e) {
        disableButton();
        resetTimer();
      });
      $(".cx-message-input").keyup(function (e) {
        if (e.which == 13) {
          resetTimer();
          disableButton();
        }
      });

    
    setTimeout(() => {
      for (let k = 0; k <= split.length - 1; k++) {
        $(`body ${split[k]}`).click(() => {
          $(`body ${split[k]}`).css("background", "#1352de");
          $(`body ${split[k]}`).css("color", "#ffffff");
          $(`body ${split[k]}`).css("font-weight", "300");
          disableButton();

          sender($(split[k]).text().toUpperCase().trim());
        });
      }
    }, 50);
  });
  return await true;
}

async function yesNoThanksButtonSender(data, radio) {
  await $(() => {
    var split = data.split(",");

    function disableButton() {
      for (var i = 0; i < split.length; i++) {
        $(`body ${split[i]}`).prop("disabled", true);
        $(`body ${split[i]}`).css("pointer-events", "none");
      }
    }
      $(".cx-send").on("keyup click", function (e) {
        disableButton();
        resetTimer();
      });
      $(".cx-message-input").keyup(function (e) {
        if (e.which == 13) {
          resetTimer();
          disableButton();
        }
      });

    
    setTimeout(() => {
      for (let k = 0; k <= split.length - 1; k++) {
        $(`body ${split[k]}`).click(() => {
          $(`body ${split[k]}`).css("background", "#1352de");
          $(`body ${split[k]}`).css("color", "#ffffff");
          $(`body ${split[k]}`).css("font-weight", "300");
          disableButton();
          if ($(split[k]).text().toUpperCase().trim().includes("THANKS")) {
            sender("NO THANKS");
          } else {
            sender($(split[k]).text().toUpperCase().trim());
          }
        });
      }
    }, 50);
  });
  return await true;
}

async function yesModifyButtonParser(toArray, index) {
  var html = "";

  html += `<center>
  <button id='button-yesMod-${index}' class='button-yesMod cx-yesMod cx-btn cx-btn-primary i18n' style='width: 70px'>YES</button>
  <button id='button-noMod-${index}' class='button-noMod cx-noMod cx-btn cx-btn-primary i18n' style='width: 90px'>MODIFY</button>
  </center>
  </div>`;
  await setTimeout(() => {
    //    document.getElementById("cx-chat-index-"+e.data.messages[i].index).append(json2html.render(data,template))
    $("#cx-chat-index-" + index + " .cx-message-text").html(null);
    $("#cx-chat-index-" + index + " .cx-message-text").html(html);
  }, 40);

  return `#button-yesMod-${index},#button-noMod-${index}`;
}

async function yesModifyButtonSender(data, radio) {
  await $(() => {
    var split = data.split(",");
    function disableButton() {
      for (var i = 0; i < split.length; i++) {
        $(`body ${split[i]}`).prop("disabled", true);
        $(`body ${split[i]}`).css("pointer-events", "none");
      }
    }
      $(".cx-send").on("keyup click", function (e) {
        disableButton();
        resetTimer();
      });
      $(".cx-message-input").keyup(function (e) {
        if (e.which == 13) {
          resetTimer();
          disableButton();
        }
      });

    
    setTimeout(() => {
      for (let k = 0; k <= split.length - 1; k++) {
        $(`body ${split[k]}`).click(() => {
          $(`body ${split[k]}`).css("background", "#1352de");
          $(`body ${split[k]}`).css("color", "#ffffff");
          $(`body ${split[k]}`).css("font-weight", "300");
          disableButton();
          sender($(split[k]).text().toUpperCase().trim());
        });
      }
    }, 50);
  });
  return await true;
}

async function yesEmailButtonParser(toArray, index) {
  var html = "";

  html += `<center>
  <button id='button-yesEmail-${index}' class='button-yesEmail cx-yesEmail cx-btn cx-btn-primary i18n' style='width: 200px'>YES</button>
  <button id='button-updateEmail-${index}' class='button-updateEmail cx-updateEmail cx-btn cx-btn-primary i18n' style='width: 200px'>UPDATE EMAIL</button>
  </center>
  </div>`;
  await setTimeout(() => {
    //    document.getElementById("cx-chat-index-"+e.data.messages[i].index).append(json2html.render(data,template))
    $("#cx-chat-index-" + index + " .cx-message-text").html(null);
    $("#cx-chat-index-" + index + " .cx-message-text").html(html);
  }, 40);

  return `#button-yesEmail-${index},#button-updateEmail-${index}`;
}

async function yesEmailButtonSender(data, radio) {
  await $(() => {
    var split = data.split(",");
    function disableButton() {
      for (var i = 0; i < split.length; i++) {
        $(`body ${split[i]}`).prop("disabled", true);
        $(`body ${split[i]}`).css("pointer-events", "none");
      }
    }
      $(".cx-send").on("keyup click", function (e) {
        disableButton();
        resetTimer();
      });
      $(".cx-message-input").keyup(function (e) {
        if (e.which == 13) {
          resetTimer();
          disableButton();
        }
      });

    
    setTimeout(() => {
      for (let k = 0; k <= split.length - 1; k++) {
        $(`body ${split[k]}`).click(() => {
          $(`body ${split[k]}`).css("background", "#1352de");
          $(`body ${split[k]}`).css("color", "#ffffff");
          $(`body ${split[k]}`).css("font-weight", "300");
          disableButton();
          sender($(split[k]).text().toUpperCase().trim());
        });
      }
    }, 50);
  });
  return await true;
}

async function yesNoButtonParser(toArray, index) {
  var html = ``;

  html += `<center>
  <button id='button-yes-${index}' class='button-yes cx-yes cx-btn cx-btn-primary i18n' style='width: 200px'>YES</button>
  <button id='button-no-${index}' class='button-no cx-no cx-btn cx-btn-primary i18n' style='width: 200px'>NO</button>
  </center>
  </div>`;
  await setTimeout(() => {
    //    document.getElementById("cx-chat-index-"+e.data.messages[i].index).append(json2html.render(data,template))
    $("#cx-chat-index-" + index + " .cx-message-text").html(null);
    $("#cx-chat-index-" + index + " .cx-message-text").html(html);
  }, 40);

  return `#button-yes-${index},#button-no-${index}`;
}



async function yesNoButtonSender(data, radio) {
  await $(() => {
    var split = data.split(",");
    function disableButton() {
      for (var i = 0; i < split.length; i++) {
        $(`body ${split[i]}`).prop("disabled", true);
        $(`body ${split[i]}`).css("pointer-events", "none");
      }
    }
      $(".cx-send").on("keyup click", function (e) {
        disableButton();
        resetTimer();
      });
      $(".cx-message-input").keyup(function (e) {
        if (e.which == 13) {
          resetTimer();
          disableButton();
        }
      });

    
    setTimeout(() => {
      for (let k = 0; k <= split.length - 1; k++) {
        $(`body ${split[k]}`).click(() => {
          $(`body ${split[k]}`).css("background", "#1352de");
          $(`body ${split[k]}`).css("color", "#ffffff");
          $(`body ${split[k]}`).css("font-weight", "300");
          disableButton();
          sender($(split[k]).text().toUpperCase().trim());
        });
      }
    }, 50);
  });
  return await true;
}

async function yesNoSureButtonParser(toArray, index) {
  var html = toArray;

  html += `<br><br><center>
  <button id='button-yesSure-${index}' class='button-yesSure cx-yesSure cx-btn cx-btn-primary i18n' style='width: 200px;'>YES</button>
  <button id='button-noSure-${index}' class='button-noSure cx-noSure cx-btn cx-btn-primary i18n' style='width: 200px; '>NO</button>
   <button id='button-notsure-${index}' class='button-notsure cx-notsure cx-btn cx-btn-primary i18n' style='width: 200px'> I'M NOT SURE</button>

  </center>
  </div>`;
  await setTimeout(() => {
    //    document.getElementById("cx-chat-index-"+e.data.messages[i].index).append(json2html.render(data,template))
    $("#cx-chat-index-" + index + " .cx-message-text").html(null);
    $("#cx-chat-index-" + index + " .cx-message-text").html(html);
  }, 40);

  return `#button-yesSure-${index},#button-noSure-${index},#button-notsure-${index}`;
}

async function yesNoSureButtonSender(data, radio) {
  await $(() => {
    var split = data.split(",");
    function disableButton() {
      for (var i = 0; i < split.length; i++) {
        $(`body ${split[i]}`).prop("disabled", true);
        $(`body ${split[i]}`).css("pointer-events", "none");
      }
    }
      $(".cx-send").on("keyup click", function (e) {
        disableButton();
        resetTimer();
      });
      $(".cx-message-input").keyup(function (e) {
        if (e.which == 13) {
          resetTimer();
          disableButton();
        }
      });

    
    setTimeout(() => {
      for (let k = 0; k <= split.length - 1; k++) {
        $(`body ${split[k]}`).click(() => {
          $(`body ${split[k]}`).css("background", "#1352de");
          $(`body ${split[k]}`).css("color", "#ffffff");
          $(`body ${split[k]}`).css("font-weight", "300");
          disableButton();
          sender($(split[k]).text().toUpperCase().trim());
        });
      }
    }, 50);
  });
  return await true;
}

async function onlyYesNoButtonParser(toArray, index) {
  var html = toArray;

  html += `<br><br><center>
  <button id='button-yesSure-${index}' class='button-yesSure cx-yesSure cx-btn cx-btn-primary i18n' style='width: 200px; '>YES</button>
  <button id='button-noSure-${index}' class='button-noSure cx-noSure cx-btn cx-btn-primary i18n' style='width: 200px;'>NO</button>

  </center>
  </div>`;
  await setTimeout(() => {
    //    document.getElementById("cx-chat-index-"+e.data.messages[i].index).append(json2html.render(data,template))
    $("#cx-chat-index-" + index + " .cx-message-text").html(null);
    $("#cx-chat-index-" + index + " .cx-message-text").html(html);
  }, 40);

  return `#button-yesSure-${index},#button-noSure-${index},#button-notsure-${index}`;
}

async function yesNoSureButtonSender(data, radio) {
  await $(() => {
    var split = data.split(",");
    function disableButton() {
      for (var i = 0; i < split.length; i++) {
        $(`body ${split[i]}`).prop("disabled", true);
        $(`body ${split[i]}`).css("pointer-events", "none");
      }
    }
      $(".cx-send").on("keyup click", function (e) {
        disableButton();
        resetTimer();
      });
      $(".cx-message-input").keyup(function (e) {
        if (e.which == 13) {
          resetTimer();
          disableButton();
        }
      });

    
    setTimeout(() => {
      for (let k = 0; k <= split.length - 1; k++) {
        $(`body ${split[k]}`).click(() => {
          $(`body ${split[k]}`).css("background", "#1352de");
          $(`body ${split[k]}`).css("color", "#ffffff");
          $(`body ${split[k]}`).css("font-weight", "300");
          disableButton();
          sender($(split[k]).text().toUpperCase().trim());
        });
      }
    }, 50);
  });
  return await true;
}

async function submitButtonParser(toArray, index) {
  var html = ``;

  html += `<center><br>
  <button id='button-sub-${index}' class='button-sub cx-sub cx-btn cx-btn-primary i18n' style='width: 88px'>SUBMIT</button>
  <button id='button-modifySub-${index}' class='button-modifySub cx-modifySub cx-btn cx-btn-primary i18n' style='width: 88px'>BACK</button>
  </center>
  </div>`;
  await setTimeout(() => {
    //    document.getElementById("cx-chat-index-"+e.data.messages[i].index).append(json2html.render(data,template))
    $("#cx-chat-index-" + index + " .cx-message-text").html(null);
    $("#cx-chat-index-" + index + " .cx-message-text").html(html);
  }, 40);

  return `#button-sub-${index},#button-modifySub-${index}`;
}

async function submitButtonSender(data, radio) {
  await $(() => {
    var split = data.split(",");
    function disableButton() {
      for (var i = 0; i < split.length; i++) {
        $(`body ${split[i]}`).prop("disabled", true);
        $(`body ${split[i]}`).css("pointer-events", "none");
      }
    }
      $(".cx-send").on("keyup click", function (e) {
        disableButton();
        resetTimer();
      });
      $(".cx-message-input").keyup(function (e) {
        if (e.which == 13) {
          resetTimer();
          disableButton();
        }
      });

    
    setTimeout(() => {
      for (let k = 0; k <= split.length - 1; k++) {
        $(`body ${split[k]}`).click(() => {
          $(`body ${split[k]}`).css("background", "#1352de");
          $(`body ${split[k]}`).css("color", "#ffffff");
          $(`body ${split[k]}`).css("font-weight", "300");
          disableButton();
          sender($(split[k]).text().toUpperCase().trim());
        });
      }
    }, 50);
  });
  return await true;
}
async function submitSkipButtonParser(toArray, index) {
  var html = ``;

  html += `<center>
  <button id='button-subSkip-${index}' class='button-subSkip cx-subSkip cx-btn cx-btn-primary i18n' style='width: 88px'>SUBMIT</button>
  <button id='button-skip-${index}' class='button-skip cx-skip cx-btn cx-btn-primary i18n' style='width: 88px'>SKIP</button>
  </center>
  </div>`;
  await setTimeout(() => {
    //    document.getElementById("cx-chat-index-"+e.data.messages[i].index).append(json2html.render(data,template))
    $("#cx-chat-index-" + index + " .cx-message-text").html(null);
    $("#cx-chat-index-" + index + " .cx-message-text").html(html);
  }, 40);

  return `#button-subSkip-${index},#button-skip-${index}`;
}

async function submitSKipButtonSender(data, radio) {
  await $(() => {
    var split = data.split(",");
    function disableButton() {
      for (var i = 0; i < split.length; i++) {
        $(`body ${split[i]}`).prop("disabled", true);
        $(`body ${split[i]}`).css("pointer-events", "none");
      }
    }
      $(".cx-send").on("keyup click", function (e) {
        disableButton();
        resetTimer();
      });
      $(".cx-message-input").keyup(function (e) {
        if (e.which == 13) {
          resetTimer();
          disableButton();
        }
      });

    
    setTimeout(() => {
      for (let k = 0; k <= split.length - 1; k++) {
        $(`body ${split[k]}`).click(() => {
          $(`body ${split[k]}`).css("background", "#1352de");
          $(`body ${split[k]}`).css("color", "#ffffff");
          $(`body ${split[k]}`).css("font-weight", "300");
          disableButton();
          sender($(split[k]).text().toUpperCase().trim());
        });
      }
    }, 50);
  });
  return await true;
}

async function proceedButtonParser(toArray, index) {
  var html = ``;

  html += `<center>
  <button id='button-proceed-${index}' class='button-proceed cx-proceed cx-btn cx-btn-primary i18n' style='width: 200px'>PROCEED</button>
  <button id='button-tcf-${index}' class='button-tcf cx-tcf cx-btn cx-btn-primary i18n' style='width: 200px'>WHAT IS TCF?</button>
  </center>
  </div>`;
  await setTimeout(() => {
    //    document.getElementById("cx-chat-index-"+e.data.messages[i].index).append(json2html.render(data,template))
    $("#cx-chat-index-" + index + " .cx-message-text").html(null);
    $("#cx-chat-index-" + index + " .cx-message-text").html(html);
  }, 40);

  return `#button-proceed-${index},#button-tcf-${index}`;
}

async function proceed2ButtonParser(toArray, index) {
  var html = toArray;

  html += `<br><br><center>
  <button id='button-proceed-${index}' class='button-proceed cx-proceed cx-btn cx-btn-primary i18n' style='width: 200px'>PROCEED</button>
  <button id='button-tcf-${index}' class='button-tcf cx-tcf cx-btn cx-btn-primary i18n' style='width: 200px'>WHAT IS TCF?</button>
  </center>
  </div>`;
  await setTimeout(() => {
    //    document.getElementById("cx-chat-index-"+e.data.messages[i].index).append(json2html.render(data,template))
    $("#cx-chat-index-" + index + " .cx-message-text").html(null);
    $("#cx-chat-index-" + index + " .cx-message-text").html(html);
  }, 40);

  return `#button-proceed-${index},#button-tcf-${index}`;
}

async function proceedButtonSender(data, radio) {
  await $(() => {
    var split = data.split(",");
    function disableButton() {
      for (var i = 0; i < split.length; i++) {
        $(`body ${split[i]}`).prop("disabled", true);
        $(`body ${split[i]}`).css("pointer-events", "none");
      }
    }
      $(".cx-send").on("keyup click", function (e) {
        disableButton();
        resetTimer();
      });
      $(".cx-message-input").keyup(function (e) {
        if (e.which == 13) {
          resetTimer();
          disableButton();
        }
      });

    
    setTimeout(() => {
      for (let k = 0; k <= split.length - 1; k++) {
        $(`body ${split[k]}`).click(() => {
          $(`body ${split[k]}`).css("background", "#1352de");
          $(`body ${split[k]}`).css("color", "#ffffff");
          $(`body ${split[k]}`).css("font-weight", "300");
          disableButton();
          sender($(split[k]).text().toUpperCase().trim());
        });
      }
    }, 50);
  });
  return await true;
}

async function paymentButtonParser(toArray, index) {
  var html = ``;

  html += `<center>
  <button id='button-payment-${index}' class='button-payment cx-payment cx-btn cx-btn-primary i18n' style='width: 160px'>PAYMENT SUCCESS</button>
  <button id='button-fail-${index}' class='button-fail cx-fail cx-btn cx-btn-primary i18n' style='width: 160px'>PAYMENT FAILURE</button>
  </center>
  </div>`;
  await setTimeout(() => {
    //    document.getElementById("cx-chat-index-"+e.data.messages[i].index).append(json2html.render(data,template))
    $("#cx-chat-index-" + index + " .cx-message-text").html(null);
    $("#cx-chat-index-" + index + " .cx-message-text").html(html);
  }, 40);

  return `#button-payment-${index},#button-fail-${index}`;
}

async function paymentButtonSender(data, radio) {
  await $(() => {
    var split = data.split(",");
    function disableButton() {
      for (var i = 0; i < split.length; i++) {
        $(`body ${split[i]}`).prop("disabled", true);
        $(`body ${split[i]}`).css("pointer-events", "none");
      }
    }
      $(".cx-send").on("keyup click", function (e) {
        disableButton();
        resetTimer();
      });
      $(".cx-message-input").keyup(function (e) {
        if (e.which == 13) {
          resetTimer();
          disableButton();
        }
      });

    
    setTimeout(() => {
      for (let k = 0; k <= split.length - 1; k++) {
        $(`body ${split[k]}`).click(() => {
          $(`body ${split[k]}`).css("background", "#1352de");
          $(`body ${split[k]}`).css("color", "#ffffff");
          $(`body ${split[k]}`).css("font-weight", "300");
          disableButton();
          sender($(split[k]).text().toUpperCase().trim());
        });
      }
    }, 50);
  });
  return await true;
}

async function successOneButtonParser(toArray, index) {
  var html = ``;

  html += `<center><br>
  <button id='button-successBtn-${index}' class='button-successBtn cx-successBtn cx-btn cx-btn-primary i18n' style='width: 150px'>SUCCESS</button>
  <button id='button-successOne-${index}' class='button-successOne cx-successOne cx-btn cx-btn-primary i18n' style='width: 150px'>SUCCESSONE</button>
   <button id='failureBtn-${index}' class='button-failureBtn cx-failureBtn cx-btn cx-btn-primary i18n' style='width: 150px'>FAILURE</button>
  </center>
  </div>`;
  await setTimeout(() => {
    //    document.getElementById("cx-chat-index-"+e.data.messages[i].index).append(json2html.render(data,template))
    $("#cx-chat-index-" + index + " .cx-message-text").html(null);
    $("#cx-chat-index-" + index + " .cx-message-text").html(html);
  }, 40);

  return `#button-successBtn-${index},#button-successOne-${index},#button-failureBtn-${index}`;
}

async function successOneButtonSender(data, radio) {
  await $(() => {
    var split = data.split(",");
    function disableButton() {
      for (var i = 0; i < split.length; i++) {
        $(`body ${split[i]}`).prop("disabled", true);
        $(`body ${split[i]}`).css("pointer-events", "none");
      }
    }
      $(".cx-send").on("keyup click", function (e) {
        disableButton();
        resetTimer();
      });
      $(".cx-message-input").keyup(function (e) {
        if (e.which == 13) {
          resetTimer();
          disableButton();
        }
      });

    
    setTimeout(() => {
      for (let k = 0; k <= split.length - 1; k++) {
        $(`body ${split[k]}`).click(() => {
          $(`body ${split[k]}`).css("background", "#1352de");
          $(`body ${split[k]}`).css("color", "#ffffff");
          $(`body ${split[k]}`).css("font-weight", "300");
          disableButton();
          sender($(split[k]).text().toUpperCase().trim());
        });
      }
    }, 50);
  });
  return await true;
}

async function proceedOnlyimageButtonParser(toArray, index) {
  var html = `<img src="img/image1.jpg" alt="aigImage" width="250" height="180" class="img-responsive"><br><br>Please keep your card details handy.`;

  html += `<center><br>

  <button id='button-proceedOnlyimage-${index}' class='button-proceedOnlyimage cx-proceedOnlyimage cx-btn cx-btn-primary i18n' style='width: 200px'>GOT IT</button>
  </center>
  </div>`;
  await setTimeout(() => {
    //    document.getElementById("cx-chat-index-"+e.data.messages[i].index).append(json2html.render(data,template))
    $("#cx-chat-index-" + index + " .cx-message-text").html(null);
    $("#cx-chat-index-" + index + " .cx-message-text").html(html);
  }, 40);

  return `#button-proceedOnlyimage-${index}`;
}

async function gotItOnlyButtonSender(data, radio) {
  await $(() => {
    var split = data.split(",");
    function disableButton() {
      for (var i = 0; i < split.length; i++) {
        $(`body ${split[i]}`).prop("disabled", true);
        $(`body ${split[i]}`).css("pointer-events", "none");
      }
    }
      $(".cx-send").on("keyup click", function (e) {
        disableButton();
        resetTimer();
      });
      $(".cx-message-input").keyup(function (e) {
        if (e.which == 13) {
          resetTimer();
          disableButton();
        }
      });

    
    setTimeout(() => {
      for (let k = 0; k <= split.length - 1; k++) {
        $(`body ${split[k]}`).click(() => {
          $(`body ${split[k]}`).css("background", "#1352de");
          $(`body ${split[k]}`).css("color", "#ffffff");
          $(`body ${split[k]}`).css("font-weight", "300");
          disableButton();
          sender($(split[k]).text().toUpperCase().trim());
        });
      }
    }, 50);
  });
  return await true;
}

async function proceedOnlyButtonParser(toArray, index) {
  var html = toArray;

  html += `<center>

  <br><button id='button-proceedOnly-${index}' class='button-proceedOnly cx-proceedOnly cx-btn cx-btn-primary i18n' style='width: 200px'>PROCEED</button>
  </center>
  </div>`;
  await setTimeout(() => {
    //    document.getElementById("cx-chat-index-"+e.data.messages[i].index).append(json2html.render(data,template))
    $("#cx-chat-index-" + index + " .cx-message-text").html(null);
    $("#cx-chat-index-" + index + " .cx-message-text").html(html);
  }, 40);

  return `#button-proceedOnly-${index}`;
}
async function proceedOnlyButtonSender(data, radio) {
  await $(() => {
    var split = data.split(",");
    function disableButton() {
      for (var i = 0; i < split.length; i++) {
        $(`body ${split[i]}`).prop("disabled", true);
        $(`body ${split[i]}`).css("pointer-events", "none");
      }
    }
      $(".cx-send").on("keyup click", function (e) {
        disableButton();
        resetTimer();
      });
      $(".cx-message-input").keyup(function (e) {
        if (e.which == 13) {
          resetTimer();
          disableButton();
        }
      });

    
    setTimeout(() => {
      for (let k = 0; k <= split.length - 1; k++) {
        $(`body ${split[k]}`).click(() => {
          $(`body ${split[k]}`).css("background", "#1352de");
          $(`body ${split[k]}`).css("color", "#ffffff");
          $(`body ${split[k]}`).css("font-weight", "300");
          disableButton();
          sender($(split[k]).text().toUpperCase().trim());
        });
      }
    }, 50);
  });
  return await true;
}

async function proceedEndChatButtonParser(toArray, index) {
  var html = toArray;

  html += `<center>

  <br><button id='button-proceedEnd-${index}' class='button-proceedEnd cx-proceedEnd cx-btn cx-btn-primary i18n' style='width: 200px'>PROCEED</button>
    <button id='button-endChat-${index}' class='button-endChat cx-endChat cx-btn cx-btn-primary i18n' style='width: 200px'>END CHAT</button>

  </center>
  </div>`;
  await setTimeout(() => {
    //    document.getElementById("cx-chat-index-"+e.data.messages[i].index).append(json2html.render(data,template))
    $("#cx-chat-index-" + index + " .cx-message-text").html(null);
    $("#cx-chat-index-" + index + " .cx-message-text").html(html);
  }, 40);

  return `#button-proceedEnd-${index},#button-endChat-${index}`;
}
async function proceedEndChatButtonSender(data, radio) {
  await $(() => {
    var split = data.split(",");
    function disableButton() {
      for (var i = 0; i < split.length; i++) {
        $(`body ${split[i]}`).prop("disabled", true);
        $(`body ${split[i]}`).css("pointer-events", "none");
      }
    }
      $(".cx-send").on("keyup click", function (e) {
        disableButton();
        resetTimer();
      });
      $(".cx-message-input").keyup(function (e) {
        if (e.which == 13) {
          resetTimer();
          disableButton();
        }
      });

    
    setTimeout(() => {
      for (let k = 0; k <= split.length - 1; k++) {
        $(`body ${split[k]}`).click(() => {
          $(`body ${split[k]}`).css("background", "#1352de");
          $(`body ${split[k]}`).css("color", "#ffffff");
          $(`body ${split[k]}`).css("font-weight", "300");
          disableButton();
          sender($(split[k]).text().toUpperCase().trim());
        });
      }
    }, 50);
  });
  return await true;
}

async function proCanButtonParser(toArray, index) {
  var html = `<img src="img/image1.jpg" alt="aigImage" width="250" height="180"><br>You are being redirected to HWA's payment web page. Please keep your card details handy`;

  html += `<center><br>
  <button id='button-procan-${index}' class='button-procan cx-procan cx-btn cx-btn-primary i18n' style='width: 200px'>PROCEED</button>
  <button id='button-canpro-${index}' class='button-canpro cx-canpro cx-btn cx-btn-primary i18n' style='width: 200px'>CANCEL</button>
  </center>
  </div>`;
  await setTimeout(() => {
    //    document.getElementById("cx-chat-index-"+e.data.messages[i].index).append(json2html.render(data,template))
    $("#cx-chat-index-" + index + " .cx-message-text").html(null);
    $("#cx-chat-index-" + index + " .cx-message-text").html(html);
  }, 40);

  return `#button-procan-${index},#button-canpro-${index}`;
}

async function proCanButtonSender(data, radio) {
  await $(() => {
    var split = data.split(",");
    function disableButton() {
      for (var i = 0; i < split.length; i++) {
        $(`body ${split[i]}`).prop("disabled", true);
        $(`body ${split[i]}`).css("pointer-events", "none");
      }
    }
      $(".cx-send").on("keyup click", function (e) {
        disableButton();
        resetTimer();
      });
      $(".cx-message-input").keyup(function (e) {
        if (e.which == 13) {
          resetTimer();
          disableButton();
        }
      });

    
    setTimeout(() => {
      for (let k = 0; k <= split.length - 1; k++) {
        $(`body ${split[k]}`).click(() => {
          $(`body ${split[k]}`).css("background", "#1352de");
          $(`body ${split[k]}`).css("color", "#ffffff");
          $(`body ${split[k]}`).css("font-weight", "300");
          disableButton();
          sender($(split[k]).text().toUpperCase().trim());
        });
      }
    }, 50);
  });
  return await true;
}

async function gotItButtonParser(toArray, index) {
  var html = ``;
  html += `<center>
  <button id='button-gotit-${index}' class='button-gotit cx-gotit cx-btn cx-btn-primary i18n' style='width: 200px'>I GOT IT</button>
  </center>
  </div>`;
  await setTimeout(() => {
    //    document.getElementById("cx-chat-index-"+e.data.messages[i].index).append(json2html.render(data,template))
    $("#cx-chat-index-" + index + " .cx-message-text").html(null);
    $("#cx-chat-index-" + index + " .cx-message-text").html(html);
  }, 40);

  return `#button-gotit-${index}`;
}
async function gotItButtonOnlyParser(toArray, index) {
  var html = ``;
  html += `<center>
 <button id='button-gotit-${index}' class='button-gotit cx-gotit cx-btn cx-btn-primary i18n' style='width: 200px'>GOT IT</button>
 </center>
 </div>`;
  await setTimeout(() => {
    //    document.getElementById("cx-chat-index-"+e.data.messages[i].index).append(json2html.render(data,template))
    $("#cx-chat-index-" + index + " .cx-message-text").html(null);
    $("#cx-chat-index-" + index + " .cx-message-text").html(html);
  }, 40);

  return `#button-gotit-${index}`;
}


async function gotItButtonSender(data, radio) {
  await $(() => {
    var split = data.split(",");
    function disableButton() {
      for (var i = 0; i < split.length; i++) {
        $(`body ${split[i]}`).prop("disabled", true);
        $(`body ${split[i]}`).css("pointer-events", "none");
      }
    }
      $(".cx-send").on("keyup click", function (e) {
        disableButton();
        resetTimer();
      });
      $(".cx-message-input").keyup(function (e) {
        if (e.which == 13) {
          resetTimer();
          disableButton();
        }
      });

    
    setTimeout(() => {
      for (let k = 0; k <= split.length - 1; k++) {
        $(`body ${split[k]}`).click(() => {
          $(`body ${split[k]}`).css("background", "#1352de");
          $(`body ${split[k]}`).css("color", "#ffffff");
          $(`body ${split[k]}`).css("font-weight", "300");
          disableButton();
          sender($(split[k]).text().toUpperCase().trim());
        });
      }
    }, 50);
  });
  return await true;
}

async function gotIt24hoursButtonParser(toArray, index) {
  var html = toArray;
  html += `<center>
 <button id='button-gotit-${index}' class='button-gotit cx-gotit cx-btn cx-btn-primary i18n' style='width: 150px'>GOT IT</button>
 </center>
 </div>`;
  await setTimeout(() => {
    //    document.getElementById("cx-chat-index-"+e.data.messages[i].index).append(json2html.render(data,template))
    $("#cx-chat-index-" + index + " .cx-message-text").html(null);
    $("#cx-chat-index-" + index + " .cx-message-text").html(html);
  }, 40);

  return `#button-gotit-${index}`;
}

async function gotIt24hoursButtonSender(data, radio) {
  await $(() => {
    var split = data.split(",");
    function disableButton() {
      for (var i = 0; i < split.length; i++) {
        $(`body ${split[i]}`).prop("disabled", true);
        $(`body ${split[i]}`).css("pointer-events", "none");
      }
    }
      $(".cx-send").on("keyup click", function (e) {
        disableButton();
        resetTimer();
      });
    
      $(".cx-message-input").keyup(function (e) {
        if (e.which == 13) {
          resetTimer();
          disableButton();
        }
      });

    setTimeout(() => {
      for (let k = 0; k <= split.length - 1; k++) {
        $(`body ${split[k]}`).click(() => {
          $(`body ${split[k]}`).css("background", "#1352de");
          $(`body ${split[k]}`).css("color", "#ffffff");
          $(`body ${split[k]}`).css("font-weight", "300");
          disableButton();
          sender($(split[k]).text().toUpperCase().trim());
        });
      }
    }, 50);
  });
  return await true;
}

async function claimButtonParser(toArray, index) {
  var html = ``;

  html += `<center>
  <button id='button-file-${index}' class='button-file cx-file cx-btn cx-btn-primary i18n' style='width: 200px; letter-spacing: 0.5px;'>FILE A NEW CLAIM</button>
  <button id='button-status-${index}' class='button-status cx-status cx-btn cx-btn-primary i18n' style='width: 200px'>VIEW CLAIM STATUS</button><br>
  <button id='button-another-${index}' class='button-another cx-another cx-btn cx-btn-primary i18n' style='width: 200px'>ANOTHER REQUEST</button><br>
  </center>
  </div>`;
  await setTimeout(() => {
    //    document.getElementById("cx-chat-index-"+e.data.messages[i].index).append(json2html.render(data,template))
    $("#cx-chat-index-" + index + " .cx-message-text").html(null);
    $("#cx-chat-index-" + index + " .cx-message-text").html(html);
  }, 40);

  return `#button-file-${index},#button-status-${index},#button-another-${index}`;
}

async function claimButtonParser2(toArray, index) {
  var html = ``;

  html += `<style='font-size: 14px;margin-bottom: 5px;position: relative'>${toArray}</label><br><br><center>
  <button id='button-file-${index}' class='button-file cx-file cx-btn cx-btn-primary i18n' style='width: 200px; letter-spacing: 0.5px;'>FILE A CLAIM</button>
  <button id='button-status-${index}' class='button-status cx-status cx-btn cx-btn-primary i18n' style='width: 200px'>CLAIM STATUS</button><br>
  <button id='button-another-${index}' class='button-another cx-another cx-btn cx-btn-primary i18n' style='width: 200px'>ANOTHER REQUEST</button><br>
  </center>
  </div>`;
  await setTimeout(() => {
    //    document.getElementById("cx-chat-index-"+e.data.messages[i].index).append(json2html.render(data,template))
    $("#cx-chat-index-" + index + " .cx-message-text").html(null);
    $("#cx-chat-index-" + index + " .cx-message-text").html(html);
  }, 40);

  return `#button-file-${index},#button-status-${index},#button-another-${index}`;
}

async function claimButtonSender(data, radio) {
  await $(() => {
    var split = data.split(",");
    function disableButton() {
      for (var i = 0; i < split.length; i++) {
        $(`body ${split[i]}`).prop("disabled", true);
        $(`body ${split[i]}`).css("pointer-events", "none");
      }
    }
      $(".cx-send").on("keyup click", function (e) {
        disableButton();
        resetTimer();
      });
      $(".cx-message-input").keyup(function (e) {
        if (e.which == 13) {
          resetTimer();
          disableButton();
        }

      });

    
    setTimeout(() => {
      for (let k = 0; k <= split.length - 1; k++) {
        $(`body ${split[k]}`).click(() => {
          $(`body ${split[k]}`).css("background", "#1352de");
          $(`body ${split[k]}`).css("color", "#ffffff");
          $(`body ${split[k]}`).css("font-weight", "300");

          disableButton();
          sender($(split[k]).text().toUpperCase().trim());
          letDisableButton = false;

        });
      }
    }, 40);
  });
  return await true;
}

async function refButtonParser(toArray, index) {
  var html = ``;

  html += `<center>
  <button id='button-ref-${index}' class='button-ref cx-ref cx-btn cx-btn-primary i18n' style='width: 175px'>REFRIGERATOR</button>
  <button id='button-wash-${index}' class='button-wash cx-wash cx-btn cx-btn-primary i18n' style='width: 175px'>WASHER</button>
  <button id='button-dry-${index}' class='button-dry cx-dry cx-btn cx-btn-primary i18n' style='width: 175px'>DRYER</button>
  <button id='button-garb-${index}' class='button-garb cx-garb cx-btn cx-btn-primary i18n' style='width: 175px'>GARBAGE DISPOSAL</button>
  <button id='button-range-${index}' class='button-range cx-range cx-btn cx-btn-primary i18n' style='width: 175px'>RANGE, OVEN OR STOVE</button>
  <button id='button-oth-${index}' class='button-oth cx-oth cx-btn cx-btn-primary i18n' style='width: 175px'>VIEW MORE</button>
  <button id='button-mod-${index}' class='button-mod cx-mod cx-btn cx-btn-primary i18n' style='width: 175px'>BACK</button>
  </center>
  </div>`;
  await setTimeout(() => {
    $("#cx-chat-index-" + index + " .cx-message-text").html(null);
    $("#cx-chat-index-" + index + " .cx-message-text").html(html);
  }, 50);

  return `#button-ref-${index},#button-wash-${index},#button-dry-${index},#button-garb-${index},#button-range-${index},#button-oth-${index},#button-mod-${index}`;
}

async function refButtonSender(data, radio) {
  await $(() => {
    var split = data.split(",");
    function disableButton() {
      for (var i = 0; i < split.length; i++) {
        $(`body ${split[i]}`).prop("disabled", true);
        $(`body ${split[i]}`).css("pointer-events", "none");
      }
    }
      $(".cx-send").on("keyup click", function (e) {
        disableButton();
        resetTimer();
      });
      $(".cx-message-input").keyup(function (e) {
        if (e.which == 13) {
          resetTimer();
          disableButton();
        }
      });

    
    setTimeout(() => {
      for (let k = 0; k <= split.length - 1; k++) {
        $(`body ${split[0]}`).click(() => {
          refrigerator = true;
        });

        $(`body ${split[k]}`).click(() => {
          $(`body ${split[k]}`).css("background", "#1352de");
          $(`body ${split[k]}`).css("color", "#ffffff");
          $(`body ${split[k]}`).css("font-weight", "300");
          disableButton();
          sender($(split[k]).text().toUpperCase().trim());
        });
      }
    }, 50);
  });
  return await true;
}

async function garageButtonParser(toArray, index) {
  var html = ``;

  html += `<center>
  <button id='button-gar-${index}' class='button-gar cx-gar cx-btn cx-btn-primary i18n' style='width: 205px'>GARAGE DOOR OPENER</button>
  <button id='button-int-${index}' class='button-int cx-int cx-btn cx-btn-primary i18n' style='width: 205px'>ELECTRICAL SYSTEM</button>
  <button id='button-door-${index}' class='button-door cx-door cx-btn cx-btn-primary i18n' style='width: 205px'>DOORBELL</button>
  <button id='button-tel-${index}' class='button-tel cx-tel cx-btn cx-btn-primary i18n' style='width: 205px'>PHONE LINE</button>
  <button id='button-ceil-${index}' class='button-ceil cx-ceil cx-btn cx-btn-primary i18n' style='width: 205px'>CEILING OR EXHAUST FAN</button>
  <button id='button-garageNone-${index}' class='button-garageNone cx-garageNone cx-btn cx-btn-primary i18n' style='width: 205px'>NONE OF THESE</button>
  <button id='button-modi-${index}' class='button-modi cx-modi cx-btn cx-btn-primary i18n' style='width: 205px'>BACK</button>
  </center>
  </div>`;
  await setTimeout(() => {
    //    document.getElementById("cx-chat-index-"+e.data.messages[i].index).append(json2html.render(data,template))
    $("#cx-chat-index-" + index + " .cx-message-text").html(null);
    $("#cx-chat-index-" + index + " .cx-message-text").html(html);
  }, 40);

  return `#button-gar-${index},#button-int-${index},#button-door-${index},#button-tel-${index},#button-ceil-${index},#button-garageNone-${index},#button-modi-${index}`;
}

async function garageButtonSender(data, radio) {
  await $(() => {
    var split = data.split(",");
    function disableButton() {
      for (var i = 0; i < split.length; i++) {
        $(`body ${split[i]}`).prop("disabled", true);
        $(`body ${split[i]}`).css("pointer-events", "none");
      }
    }
      $(".cx-send").on("keyup click", function (e) {
        disableButton();
        resetTimer();
      });
      $(".cx-message-input").keyup(function (e) {
        if (e.which == 13) {
          resetTimer();
          disableButton();
        }
      });

    
    setTimeout(() => {
      for (let k = 0; k <= split.length - 1; k++) {
        $(`body ${split[k]}`).click(() => {
          $(`body ${split[k]}`).css("background", "#1352de");
          $(`body ${split[k]}`).css("color", "#ffffff");
          $(`body ${split[k]}`).css("font-weight", "300");
          disableButton();
          sender($(split[k]).text().toUpperCase().trim());
        });
      }
    }, 50);
  });
  return await true;
}

async function dishButtonParser(toArray, index) {
  var html = ``;

  html += `<center>
  <button id='button-dish-${index}' class='button-dish cx-gdishar cx-btn cx-btn-primary i18n' style='width: 170px'>DISHWASHER</button>
  <button id='button-micro-${index}' class='button-micro cx-micro cx-btn cx-btn-primary i18n' style='width: 170px'>MICROWAVE</button>
  <button id='button-central-${index}' class='button-central cx-central cx-btn cx-btn-primary i18n' style='width: 170px'>CENTRAL VACUUM</button>
  <button id='button-waterdis-${index}' class='button-waterdis cx-waterdis cx-btn cx-btn-primary i18n' style='width: 170px'>HOT WATER DISPENSER</button>
  <button id='button-trash-${index}' class='button-trash cx-trash cx-btn cx-btn-primary i18n' style='width: 170px'>TRASH COMPACTOR</button>
  <button id='button-foodcenter-${index}' class='button-foodcenter cx-foodcenter cx-btn cx-btn-primary i18n' style='width: 170px'>FOOD CENTER</button>
  <button id='button-freezer-${index}' class='button-freezer cx-freezer cx-btn cx-btn-primary i18n' style='width: 170px'>FREEZER</button>
  <button id='button-wahsdry-${index}' class='button-wahsdry cx-wahsdry cx-btn cx-btn-primary i18n' style='width: 170px'>WASHER/DRYER</button>
  <button id='button-changecat-${index}' class='button-changecat cx-changecat cx-btn cx-btn-primary i18n' style='width: 170px'>CHANGE CATEGORY</button>
  <button id='button-dishNone-${index}' class='button-dishNone cx-dishNone cx-btn cx-btn-primary i18n' style='width: 170px'>NONE OF THESE</button>
  <button id='button-dishModify-${index}' class='button-dishModify cx-dishModify cx-btn cx-btn-primary i18n' style='width: 170px'>BACK</button>
  </center>
  </div>`;
  await setTimeout(() => {
    //    document.getElementById("cx-chat-index-"+e.data.messages[i].index).append(json2html.render(data,template))
    $("#cx-chat-index-" + index + " .cx-message-text").html(null);
    $("#cx-chat-index-" + index + " .cx-message-text").html(html);
  }, 40);

  return `#button-dish-${index},#button-micro-${index},#button-central-${index},#button-waterdis-${index},#button-trash-${index},#button-foodcenter-${index},#button-freezer-${index},#button-wahsdry-${index},#button-changecat-${index},#button-dishNone-${index},#button-dishModify-${index}`;
}

async function dishButtonSender(data, radio) {
  await $(() => {
    var split = data.split(",");
    function disableButton() {
      for (var i = 0; i < split.length; i++) {
        $(`body ${split[i]}`).prop("disabled", true);
        $(`body ${split[i]}`).css("pointer-events", "none");
      }
    }
      $(".cx-send").on("keyup click", function (e) {
        disableButton();
        resetTimer();
      });
      $(".cx-message-input").keyup(function (e) {
        if (e.which == 13) {
          resetTimer();
          disableButton();
        }
      });

    
    setTimeout(() => {
      for (let k = 0; k <= split.length - 1; k++) {
        $(`body ${split[k]}`).click(() => {
          $(`body ${split[k]}`).css("background", "#1352de");
          $(`body ${split[k]}`).css("color", "#ffffff");
          $(`body ${split[k]}`).css("font-weight", "300");
          disableButton();
          sender($(split[k]).text().toUpperCase().trim());
        });
      }
    }, 50);
  });
  return await true;
}

async function centralButtonParser(toArray, index) {
  var html = ``;

  html += `<center>
  <button id='button-central-${index}' class='button-central cx-central cx-btn cx-btn-primary i18n' style='width: 210px'>CENTRAL HEATING SYSTEM</button>
  <button id='button-cntrl-${index}' class='button-cntrl cx-cntrl cx-btn cx-btn-primary i18n' style='width: 210px'>AC SYSTEM</button>
  <button id='button-heatduct-${index}' class='button-heatduct cx-heatduct cx-btn cx-btn-primary i18n' style='width: 210px'>DUCTWORK</button>
   <button id='button-noneCentral-${index}' class='button-noneCentral cx-noneCentral cx-btn cx-btn-primary i18n' style='width: 210px'>NONE OF THESE</button>
  <button id='button-modifyCentral-${index}' class='button-modifyCentral cx-modifyCentral cx-btn cx-btn-primary i18n' style='width: 210px'>BACK</button>
  </center>
  </div>`;
  await setTimeout(() => {
    $("#cx-chat-index-" + index + " .cx-message-text").html(null);
    $("#cx-chat-index-" + index + " .cx-message-text").html(html);
  }, 40);

  return `#button-central-${index},#button-cntrl-${index},#button-heatduct-${index},#button-noneCentral-${index},#button-modifyCentral-${index}`;
}

async function centralButtonSender(data, radio) {
  await $(() => {
    var split = data.split(",");
    function disableButton() {
      for (var i = 0; i < split.length; i++) {
        $(`body ${split[i]}`).prop("disabled", true);
        $(`body ${split[i]}`).css("pointer-events", "none");
      }
    }
      $(".cx-send").on("keyup click", function (e) {
        disableButton();
        resetTimer();
      });
      $(".cx-message-input").keyup(function (e) {
        if (e.which == 13) {
          resetTimer();
          disableButton();
        }
      });

    
    setTimeout(() => {
      for (let k = 0; k <= split.length - 1; k++) {
        $(`body ${split[0]}`).click(() => {
          centralHeat = true;
        });

        $(`body ${split[k]}`).click(() => {
          $(`body ${split[k]}`).css("background", "#1352de");
          $(`body ${split[k]}`).css("color", "#ffffff");
          $(`body ${split[k]}`).css("font-weight", "300");
          disableButton();
          sender($(split[k]).text().toUpperCase().trim());
        });
      }
    }, 50);
  });
  return await true;
}

async function burglerButtonParser(toArray, index) {
  var html = ``;

  html += `<center>
  <button id='button-burgler-${index}' class='button-burgler cx-burgler cx-btn cx-btn-primary i18n' style='width: 220px'>SECURITY AND FIRE SYSTEM</button>
  <button id='button-rekey-${index}' class='button-rekey cx-rekey cx-btn cx-btn-primary i18n' style='width: 220px'>RE-KEY</button>
  <button id='button-pest-${index}' class='button-rekey cx-rekey cx-btn cx-btn-primary i18n' style='width: 220px'>PEST CONTROL</button>
  <button id='button-roof-${index}' class='button-rekey cx-rekey cx-btn cx-btn-primary i18n' style='width: 220px'>ROOF</button>
  <button id='button-spa-${index}' class='button-rekey cx-rekey cx-btn cx-btn-primary i18n' style='width: 220px'>SWIMMING POOL & SPA</button>
  <button id='button-termite-${index}' class='button-rekey cx-rekey cx-btn cx-btn-primary i18n' style='width: 220px'>TERMITE TREATMENT</button>
  <button id='button-noneBurgler-${index}' class='button-noneBurgler cx-noneBurgler cx-btn cx-btn-primary i18n' style='width: 220px'>NONE OF THESE</button>
  <button id='button-modifyBurgler-${index}' class='button-modifyBurgler cx-modifyBurgler cx-btn cx-btn-primary i18n' style='width: 220px'>BACK</button>
  </center>
  </div>`;
  await setTimeout(() => {
    //    document.getElementById("cx-chat-index-"+e.data.messages[i].index).append(json2html.render(data,template))
    $("#cx-chat-index-" + index + " .cx-message-text").html(null);
    $("#cx-chat-index-" + index + " .cx-message-text").html(html);
  }, 40);

  return `#button-burgler-${index},#button-rekey-${index},#button-pest-${index},#button-roof-${index},#button-spa-${index},#button-termite-${index},#button-noneBurgler-${index},#button-modifyBurgler-${index}`;
}

async function burglerButtonSender(data, radio) {
  await $(() => {
    var split = data.split(",");
    function disableButton() {
      for (var i = 0; i < split.length; i++) {
        $(`body ${split[i]}`).prop("disabled", true);
        $(`body ${split[i]}`).css("pointer-events", "none");
      }
    }
      $(".cx-send").on("keyup click", function (e) {
        disableButton();
        resetTimer();
      });
      $(".cx-message-input").keyup(function (e) {
        if (e.which == 13) {
          resetTimer();
          disableButton();
        }
      });

    
    setTimeout(() => {
      for (let k = 0; k <= split.length - 1; k++) {
        $(`body ${split[4]}`).click(() => {
          poolAndSpa = true;
        });

        $(`body ${split[k]}`).click(() => {
          $(`body ${split[k]}`).css("background", "#1352de");
          $(`body ${split[k]}`).css("color", "#ffffff");
          $(`body ${split[k]}`).css("font-weight", "300");
          disableButton();
          sender($(split[k]).text().toUpperCase().trim());
        });
      }
    }, 50);
  });
  return await true;
}

async function waterButtonParser(toArray, index) {
  var html = ``;

  html += `<center>
  <button id='button-water-${index}' class='button-water cx-water cx-btn cx-btn-primary i18n' style='width: 200px'>WATER HEATER</button>
  <button id='button-plumbSys-${index}' class='button-plumbSys cx-plumbSys cx-btn cx-btn-primary i18n' style='width: 200px'>PLUMBING SYSTEM</button>
  <button id='button-externalwater-${index}' class='button-externalwater cx-externalwater cx-btn cx-btn-primary i18n' style='width: 200px'>EXTERNAL WATER LINE</button>
  <button id='button-sewer-${index}' class='button-sewer cx-sewer cx-btn cx-btn-primary i18n' style='width: 200px'>SEWAGE EJECTOR PUMP</button>
  <button id='button-septic-${index}' class='button-septic cx-septic cx-btn cx-btn-primary i18n' style='width: 200px'>SEPTIC SYSTEM</button>
  <button id='button-wellpump-${index}' class='button-wellpump cx-wellpump cx-btn cx-btn-primary i18n' style='width: 200px'>WELL PUMP</button>
  <button id='button-noneWater-${index}' class='button-noneWater cx-noneWater cx-btn cx-btn-primary i18n' style='width: 200px'>NONE OF THESE</button>
  <button id='button-modifyWater-${index}' class='button-modifyWater cx-modifyWater cx-btn cx-btn-primary i18n' style='width: 200px'>BACK</button>
  </center>
  </div>`;
  await setTimeout(() => {
    //    document.getElementById("cx-chat-index-"+e.data.messages[i].index).append(json2html.render(data,template))
    $("#cx-chat-index-" + index + " .cx-message-text").html(null);
    $("#cx-chat-index-" + index + " .cx-message-text").html(html);
  }, 40);

  return `#button-water-${index},#button-plumbSys-${index},#button-externalwater-${index},#button-sewer-${index},#button-septic-${index},#button-wellpump-${index},#button-noneWater-${index},#button-modifyWater-${index}`;
}

async function waterButtonSender(data, radio) {
  await $(() => {
    var split = data.split(",");
    function disableButton() {
      for (var i = 0; i < split.length; i++) {
        $(`body ${split[i]}`).prop("disabled", true);
        $(`body ${split[i]}`).css("pointer-events", "none");
      }
    }
      $(".cx-send").on("keyup click", function (e) {
        disableButton();
        resetTimer();
      });
      $(".cx-message-input").keyup(function (e) {
        if (e.which == 13) {
          resetTimer();
          disableButton();
        }
      });

    
    setTimeout(() => {
      for (let k = 0; k <= split.length - 1; k++) {
        $(`body ${split[1]}`).click(() => {
          plumbingSystem = true;
        });

        $(`body ${split[k]}`).click(() => {
          $(`body ${split[k]}`).css("background", "#1352de");
          $(`body ${split[k]}`).css("color", "#ffffff");
          $(`body ${split[k]}`).css("font-weight", "300");
          disableButton();
          sender($(split[k]).text().toUpperCase().trim());
        });
      }
    }, 50);
  });
  return await true;
}

async function InfoProceedButtonParser(toArray, index) {
  var html = ``;

  html += `<center>
  <button id='button-proupdate-${index}' class='button-proupdate cx-proupdate cx-btn cx-btn-primary i18n' style='width: 200px'>PROCEED</button>
  <button id='button-phoneupdate-${index}' class='button-phoneupdate cx-phoneupdate cx-btn cx-btn-primary i18n' style='width: 200px'>UPDATE PHONE</button>
  <button id='button-emailupdate-${index}' class='button-emailupdate cx-emailupdate cx-btn cx-btn-primary i18n' style='width: 200px'>UPDATE EMAIL</button>
  <button id='button-incorrect-${index}' class='button-incorrect cx-incorrect cx-btn cx-btn-primary i18n' style='width: 200px'>INCORRECT ADDRESS</button>
  </center>
  </div>`;
  await setTimeout(() => {
    //    document.getElementById("cx-chat-index-"+e.data.messages[i].index).append(json2html.render(data,template))
    $("#cx-chat-index-" + index + " .cx-message-text").html(null);
    $("#cx-chat-index-" + index + " .cx-message-text").html(html);
  }, 40);

  return `#button-proupdate-${index},#button-phoneupdate-${index},#button-emailupdate-${index},#button-incorrect-${index}`;
}

async function InfoProceedButtonSender(data, radio) {
  await $(() => {
    var split = data.split(",");
    function disableButton() {
      for (var i = 0; i < split.length; i++) {
        $(`body ${split[i]}`).prop("disabled", true);
        $(`body ${split[i]}`).css("pointer-events", "none");
      }
    }
      $(".cx-send").on("keyup click", function (e) {
        disableButton();
        resetTimer();
      });
      $(".cx-message-input").keyup(function (e) {
        if (e.which == 13) {
          resetTimer();
          disableButton();
        }
      });

    
    setTimeout(() => {
      for (let k = 0; k <= split.length - 1; k++) {
        $(`body ${split[k]}`).click(() => {
          $(`body ${split[k]}`).css("background", "#1352de");
          $(`body ${split[k]}`).css("color", "#ffffff");
          $(`body ${split[k]}`).css("font-weight", "300");
          disableButton();
          sender($(split[k]).text().toUpperCase().trim());
        });
      }
    }, 50);
  });
  return await true;
}

async function claimLastButtonParser(toArray, index) {
  var html = toArray;

  html += `<center>
  <br><button id='button-phoneupdate-${index}' class='button-phoneupdate cx-phoneupdate cx-btn cx-btn-primary i18n' style='width: 200px'>VIEW CLAIM STATUS</button>
  <button id='button-emailupdate-${index}' class='button-emailupdate cx-emailupdate cx-btn cx-btn-primary i18n' style='width: 200px'>NO THANKS</button>
  </center>
  </div>`;
  await setTimeout(() => {
    //    document.getElementById("cx-chat-index-"+e.data.messages[i].index).append(json2html.render(data,template))
    $("#cx-chat-index-" + index + " .cx-message-text").html(null);
    $("#cx-chat-index-" + index + " .cx-message-text").html(html);
  }, 40);

  return `#button-phoneupdate-${index},#button-emailupdate-${index}`;
}

async function claimLastButtonSender(data, radio) {
  await $(() => {
    var split = data.split(",");
    function disableButton() {
      for (var i = 0; i < split.length; i++) {
        $(`body ${split[i]}`).prop("disabled", true);
        $(`body ${split[i]}`).css("pointer-events", "none");
      }
    }
      $(".cx-send").on("keyup click", function (e) {
        disableButton();
        resetTimer();
      });
      $(".cx-message-input").keyup(function (e) {
        if (e.which == 13) {
          resetTimer();
          disableButton();
        }
      });

    
    setTimeout(() => {
      for (let k = 0; k <= split.length - 1; k++) {
        $(`body ${split[k]}`).click(() => {
          $(`body ${split[k]}`).css("background", "#1352de");
          $(`body ${split[k]}`).css("color", "#ffffff");
          $(`body ${split[k]}`).css("font-weight", "300");
          disableButton();
          sender($(split[k]).text().toUpperCase().trim());
        });
      }
    }, 50);
  });
  return await true;
}

async function gotItAppointmentButtonParser(toArray, index) {
  var appointDetails = toArray[2].split(",");
  console.log(appointDetails);

  var html = `${toArray[0]}.${toArray[1]}.<br><br>`;

  for (var i = 0; i <= appointDetails.length - 1; i++) {
    html += `${appointDetails[i]}<br>`;
  }

  html += `<br><center>
 <button id='button-gotit-${index}' class='button-gotit cx-gotit cx-btn cx-btn-primary i18n' style='width: 150px'>GOT IT</button>
 </center>
 </div>`;
  await setTimeout(() => {
    //    document.getElementById("cx-chat-index-"+e.data.messages[i].index).append(json2html.render(data,template))
    $("#cx-chat-index-" + index + " .cx-message-text").html(null);
    $("#cx-chat-index-" + index + " .cx-message-text").html(html);
  }, 40);

  return `#button-gotit-${index}`;
}

async function gotItAppointmentButtonSender(data, radio) {
  await $(() => {
    var split = data.split(",");
    function disableButton() {
      for (var i = 0; i < split.length; i++) {
        $(`body ${split[i]}`).prop("disabled", true);
        $(`body ${split[i]}`).css("pointer-events", "none");
      }
    }
      $(".cx-send").on("keyup click", function (e) {
        disableButton();
        resetTimer();
      });
      $(".cx-message-input").keyup(function (e) {
        if (e.which == 13) {
          resetTimer();
          disableButton();
        }
      });

    
    setTimeout(() => {
      for (let k = 0; k <= split.length - 1; k++) {
        $(`body ${split[k]}`).click(() => {
          $(`body ${split[k]}`).css("background", "#1352de");
          $(`body ${split[k]}`).css("color", "#ffffff");
          $(`body ${split[k]}`).css("font-weight", "300");
          disableButton();
          sender($(split[k]).text().toUpperCase().trim());
        });
      }
    }, 50);
  });
  return await true;
}




async function dynamicCategoryButtonParser(toArray, index) {
  var html = ``;
  var split = toArray.split(",");
  var buttonBuilder = "";
  var appIndex = 0;

  await _.forEach(split, (data) => {
    let value = data.trim();
    //     var width = value.offsetWidth;

    //     maxWidth = width;
    //     for (var i = 1; i < value.length; i++) {
    //       console.log(Math.max(maxWidth))
    // };

    buttonBuilder += `<button id='btn-${index}' class='btn-${index} cx-${index} btn-${index}-${appIndex} cx-btn cx-btn-primary i18n'  value='${value}' style='width: 230px'>${value.toUpperCase()}</button>`;
    appIndex++;
  });

  html += `<center>${buttonBuilder}</center></div>`;

  await setTimeout(() => {
    //    document.getElementById("cx-chat-index-"+e.data.messages[i].index).append(json2html.render(data,template))
    $("#cx-chat-index-" + index + " .cx-message-text").html(null);
    $("#cx-chat-index-" + index + " .cx-message-text").html(html);
  }, 40);

  return `#btn-${index}`;
}

async function dynamicCategoryButtonParser2(toArray, index) {
  let header = toArray.split(":")[0]
  var html = `<style='font-size: 14px;margin-bottom: 5px;position: relative'>${header}</label><br><br>`;
  let items = toArray.split(":")[1]
  var split = items.split(",");
  var buttonBuilder = "";
  var appIndex = 0;

  await _.forEach(split, (data) => {
    let value = data.trim();
    //     var width = value.offsetWidth;

    //     maxWidth = width;
    //     for (var i = 1; i < value.length; i++) {
    //       console.log(Math.max(maxWidth))
    // };

    buttonBuilder += `<button id='btn-${index}' class='btn-${index} cx-${index} btn-${index}-${appIndex} cx-btn cx-btn-primary i18n'  value='${value}' style='width: 230px'>${value.toUpperCase()}</button>`;
    appIndex++;
  });

  html += `<center>${buttonBuilder}</center></div>`;

  await setTimeout(() => {
    //    document.getElementById("cx-chat-index-"+e.data.messages[i].index).append(json2html.render(data,template))
    $("#cx-chat-index-" + index + " .cx-message-text").html(null);
    $("#cx-chat-index-" + index + " .cx-message-text").html(html);
  }, 40);

  return `#btn-${index}`;
}

// SUB Category

async function dynamicAppliancesButtonParser(toArray, index) {
  var html = ``;
  var split = toArray.split(",");
  var buttonBuilder = "";
  var appIndex = 0;

  await _.forEach(split, (data) => {
    let value = data.trim();

    buttonBuilder += `<button id='btn-${index}' class='button-${index} cx-${index} btn-${index}-${appIndex} cx-btn cx-btn-primary i18n'  value='${value}' style='width: 230px'>${value.toUpperCase()}</button>`;
    appIndex++;
  });

  html += `<center>${buttonBuilder}</center></div>`;

  await setTimeout(() => {
    //    document.getElementById("cx-chat-index-"+e.data.messages[i].index).append(json2html.render(data,template))
    $("#cx-chat-index-" + index + " .cx-message-text").html(null);
    $("#cx-chat-index-" + index + " .cx-message-text").html(html);
  }, 40);

  return `#btn-${index}`;
}

async function dynamicElectricalButtonParser(toArray, index) {
  var html = ``;
  var split = toArray.split(",");
  var buttonBuilder = "";
  var appIndex = 0;

  await _.forEach(split, (data) => {
    let value = data.trim();

    buttonBuilder += `<button id='btn-${index}' class='button-${index} cx-${index} btn-${index}-${appIndex} cx-btn cx-btn-primary i18n'  value='${value}' style='width: 230px'>${value.toUpperCase()}</button>`;
    appIndex++;
  });

  html += `<center>${buttonBuilder}</center></div>`;

  await setTimeout(() => {
    //    document.getElementById("cx-chat-index-"+e.data.messages[i].index).append(json2html.render(data,template))
    $("#cx-chat-index-" + index + " .cx-message-text").html(null);
    $("#cx-chat-index-" + index + " .cx-message-text").html(html);
  }, 40);

  return `#btn-${index}`;
}

async function dynamicPlumbingButtonParser(toArray, index) {
  var html = ``;
  var split = toArray.split(",");
  var buttonBuilder = "";
  var appIndex = 0;

  await _.forEach(split, (data) => {
    let value = data.trim();

    buttonBuilder += `<button id='btn-${index}' class='button-${index} cx-${index} btn-${index}-${appIndex} cx-btn cx-btn-primary i18n'  value='${value}' style='width: 230px'>${value.toUpperCase()}</button>`;
    appIndex++;
  });

  html += `<center>${buttonBuilder}</center></div>`;

  await setTimeout(() => {
    //    document.getElementById("cx-chat-index-"+e.data.messages[i].index).append(json2html.render(data,template))
    $("#cx-chat-index-" + index + " .cx-message-text").html(null);
    $("#cx-chat-index-" + index + " .cx-message-text").html(html);
  }, 40);

  return `#btn-${index}`;
}

async function dynamicSubCategoryButtonParser(toArray, index) {
  let header = toArray.split(":")[0];
  var html = `<style='font-size: 14px;margin-bottom: 5px;position: relative'>${header}</label><br><br>`;
  let items = toArray.split(":")[1]
  var split = items.split(",");
  var buttonBuilder = "";
  var appIndex = 0;

  await _.forEach(split, (data) => {
    let value = data.trim();

    buttonBuilder += `<button id='btn-${index}' class='button-${index} cx-${index} btn-${index}-${appIndex} cx-btn cx-btn-primary i18n'  value='${value}' style='width: 230px'>${value.toUpperCase()}</button>`;
    appIndex++;
  });

  html += `<center>${buttonBuilder}</center></div>`;

  await setTimeout(() => {
    $("#cx-chat-index-" + index + " .cx-message-text").html(null);
    $("#cx-chat-index-" + index + " .cx-message-text").html(html);
  }, 40);

  return `#btn-${index}`;
}

async function dynamicCategoryButtonSender(messages, data, index) {
  await $(() => {
 
    var split = data.split(",");
    var message = messages.split(",");

    function disableButton() {
      for (var i = 0; i < message.length; i++) {
        $(`.btn-${index}-${i}`).prop("disabled", true);
        $(`.btn-${index}-${i}`).css("pointer-events", "none");
      }
    }
      $(".cx-send").on("keyup click", function (e) {
        disableButton();
        resetTimer();
      });
      $(".cx-message-input").keyup(function (e) {
        if (e.which == 13) {
          resetTimer();
          disableButton();
        }
      });

    

    setTimeout(() => {
      for (let k = 0; k <= message.length - 1; k++) {

        $(`.btn-${index}-${k}`).on("click touchstart", function (e) {
          e.preventDefault()

          $(`.btn-${index}-${k}`).css("background", "#1352de");
          $(`.btn-${index}-${k}`).css("color", "#ffffff");
          $(`.btn-${index}-${k}`).css("font-weight", "300");
         sender($(`body ${split}`)[k].value.toUpperCase());

          disableButton();
        });
      }
    }, 40);
  });
  return await true;
}



async function uploadUrlReParser(toArray, index) {
  var html = toArray;

  html += `<center>

  <br><button id='button-reupload-${index}' class='button-reupload cx-reupload cx-btn cx-btn-primary i18n' style='width: 200px'>UPLOAD</button>
  </center>
  </div>`;
  await setTimeout(() => {
    $("#cx-chat-index-" + index + " .cx-message-text").html(null);
    $("#cx-chat-index-" + index + " .cx-message-text").html(html);
  }, 40);

  return `#button-reupload-${index}`;
}

async function uploadUrlReSender(data, radio) {
  await $(() => {
    var split = data.split(",");
    var uploadShow = true;
    function disableButton() {
      for (var i = 0; i < split.length; i++) {
        $(`body ${split[i]}`).prop("disabled", true);
        $(`body ${split[i]}`).css("pointer-events", "none");
      }
    }
      $(".cx-send").on("keyup click", function (e) {
        disableButton();
        resetTimer();
      });
      $(".cx-message-input").keyup(function (e) {
        if (e.which == 13) {
          resetTimer();
          disableButton();
        }
      });

    

    setTimeout(() => {
      for (let k = 0; k <= split.length - 1; k++) {
        $(`body ${split[k]}`).on("click", function (e) {
          $(`body ${split[k]}`).css("background", "#1352de");
          $(`body ${split[k]}`).css("color", "#ffffff");
          $(`body ${split[k]}`).css("font-weight", "300");
          disableButton();
         //e.preventDefault()

         isUrlUpload = false;
         $(".cx-send").unbind('click');
         $(".cx-message-input").unbind('keyup');
         
          sender("YES");
        if($(split[k]).text().toUpperCase().trim() == "UPLOAD") window.open(dynamicUrl);resetTimer();

          hideAdaptivecard = true;

        });
      }
    }, 50);
  });
  return await true;
}




async function uploadUrlSender(messages, data, index) {
  await $(() => {

    var split = data.split(",");
    var message = messages.split(",");


    isUrlUpload = true;

    if(isUrlUpload) {
      $(".cx-message-input").keyup(function() {
        if($(this).val() == 'upload' || 
           $(this).val() == 'UPLOAD' || 
           $(this).val() == "Upload" || 
           $(this).val() == 'yes' || 
           $(this).val() == 'Yes' || 
           $(this).val() == "YES" || 
           $(this).val() == 'okay' || 
           $(this).val() == 'OKAY' || 
           $(this).val() == "Okay" || 
           $(this).val() == 'yeah' || 
           $(this).val() == 'YEAH' || 
           $(this).val() == "Yeah" || 
           $(this).val() == "UpLoad" || 
           $(this).val() == 'ok' || 
           $(this).val() == "OK" || 
           $(this).val() == 'Ok' || 
           $(this).val() == 'Proceed' || 
           $(this).val() == "proceed" || 
           $(this).val() == 'PROCEED' || 
           $(this).val() == 'fine' || 
           $(this).val() == "Fine" || 
           $(this).val() == 'FINE' || 
           $(this).val() == 'accept' || 
           $(this).val() == "ACCEPT" || 
           $(this).val() == "Accept" && isUrlUpload){
    
       $(".cx-send").on("click", function (e) {
        window.open(dynamicUrl);
        isUrlUpload = false;
        $(".cx-send").unbind('click');
        $(".cx-message-input").unbind('keyup');

        });
  
        }
      });
    }


    function disableButton() {
      for (var i = 0; i < message.length; i++) {
        $(`.btn-${index}-${i}`).prop("disabled", true);
        $(`.btn-${index}-${i}`).css("pointer-events", "none");
      }
    }
      $(".cx-send").on("keyup click", function (e) {
        disableButton();
        resetTimer();

      });
      $(".cx-message-input").keyup(function (e) {
        if (e.which == 13) {
          resetTimer();
          disableButton();
        }
      });

    

    setTimeout(() => {
      for (let k = 0; k <= message.length - 1; k++) {
        $(`.btn-${index}-${k}`).on("click", function (e) {
          $(`body ${split[k]}`).css("background", "#1352de");
          $(`body ${split[k]}`).css("color", "#ffffff");
          $(`body ${split[k]}`).css("font-weight", "300");
          disableButton();
         
          isUrlUpload = false;
          $(".cx-send").unbind('click');
          $(".cx-message-input").unbind('keyup');
  

        // e.preventDefault()
          sender("YES");
        if($(split[k]).text().toUpperCase().trim() == "UPLOAD") window.open(dynamicUrl);

          hideAdaptivecard = true;
        });
      }
    }, 80);
  });
  return await true;
}

////////// DYNAMIC BUTTON ////////////////////

async function dynamicButtonParser(toArray, index) {
  var html = ``;
  var split = toArray.split(",");
  var buttonBuilder = "";
  var appIndex = 0;

  await _.forEach(split, (data) => {
    let value = data.trim();

    buttonBuilder += `<button id='btn-${index}' class='button-${index} cx-${index} btn-${index}-${appIndex} cx-btn cx-btn-primary i18n'  value="${value}" style='width: 200px; white-space: normal;'>${value.toUpperCase()}</button>`;
    appIndex++;
  });

  html += `<center>${buttonBuilder}</center></div>`;

  await setTimeout(() => {
    $("#cx-chat-index-" + index + " .cx-message-text").html(null);
    $("#cx-chat-index-" + index + " .cx-message-text").html(html);
  }, 40);

  return `#btn-${index}`;
}


async function dynamicButtonSender(messages, data, index) {
  await $(() => {

    var split = data.split(",");
    var message = messages.split(",");

    function disableButton() {
      for (var i = 0; i < message.length; i++) {
        $(`.btn-${index}-${i}`).prop("disabled", true);
        $(`.btn-${index}-${i}`).css("pointer-events", "none");
      }
    }
      $(".cx-send").on("keyup click", function (e) {
        disableButton();
        resetTimer();
      });
      $(".cx-message-input").keyup(function (e) {
        if (e.which == 13) {
          resetTimer();
          disableButton();
        }
      });


    setTimeout(() => {
      for (let k = 0; k <= message.length - 1; k++) {
        $(`.btn-${index}-${k}`).on("click", function (e) {
         // e.preventDefault()
          $(`.btn-${index}-${k}`).css("background", "#1352de");
          $(`.btn-${index}-${k}`).css("color", "#ffffff");
          $(`.btn-${index}-${k}`).css("font-weight", "300");
          sender($(`body ${split}`)[k].value.toUpperCase());

          disableButton();
        });
      }
    }, 80);
  });
  return await true;
}


async function dynamicButtonPipeParser(toArray, index) {
  var html = ``;
  var split = toArray.split("|");
  var buttonBuilder = "";
  var appIndex = 0;

  await _.forEach(split, (data) => {
    let value = data.trim();

    buttonBuilder += `<button id='btn-${index}' class='button-${index} cx-${index} btn-${index}-${appIndex} cx-btn cx-btn-primary i18n'  value="${value}" style='width: 200px;'>${value.toUpperCase()}</button>`;
    appIndex++;
  });

  html += `<center>${buttonBuilder}</center></div>`;

  await setTimeout(() => {
    $("#cx-chat-index-" + index + " .cx-message-text").html(null);
    $("#cx-chat-index-" + index + " .cx-message-text").html(html);
  }, 40);

  return `#btn-${index}`;
}


async function dynamicButtonPipeSender(messages, data, index) {
  await $(() => {
    // var split = data.split(/\r\n|\n|\r/);
    // var message = messages.split(/\r\n|\n|\r/);
    var split = data.split(",");
    var message = messages.split("|");
    clearTimeout(fifteenseconds)

    function disableButton() {
      for (var i = 0; i < message.length; i++) {
        $(`.btn-${index}-${i}`).prop("disabled", true);
        $(`.btn-${index}-${i}`).css("pointer-events", "none");
      }
    }
      $(".cx-send").on("keyup click", function (e) {
        disableButton();
        resetTimer();
      });
      $(".cx-message-input").keyup(function (e) {
        if (e.which == 13) {
          resetTimer();
          disableButton();
        }
      });


    setTimeout(() => {
      for (let k = 0; k <= message.length - 1; k++) {
        $(`.btn-${index}-${k}`).on("click", function (e) {
         // e.preventDefault()
          $(`.btn-${index}-${k}`).css("background", "#1352de");
          $(`.btn-${index}-${k}`).css("color", "#ffffff");
          $(`.btn-${index}-${k}`).css("font-weight", "300");
          sender($(`body ${split}`)[k].value.toUpperCase());

          disableButton();
        });
      }
    }, 80);
  });
  return await true;
}



////////// ERROR BUTTON ////////////////////

async function yesnobackReselectP(toArray, index) {
  var html = toArray;

  html += `<br><br><center>
  <button id='button-yesRe-${index}' class='button-yesRe cx-yesRe cx-btn cx-btn-primary i18n' style='width: 200px'>YES</button>
  <button id='button-noRe-${index}' class='button-noRe cx-noRe cx-btn cx-btn-primary i18n' style='width: 200px'>NO</button>
  <button id='button-backRe-${index}' class='button-backRe cx-backRe cx-btn cx-btn-primary i18n' style='width: 200px'>BACK</button>

  </center>
  </div>`;
  await setTimeout(() => {
    //    document.getElementById("cx-chat-index-"+e.data.messages[i].index).append(json2html.render(data,template))
    $("#cx-chat-index-" + index + " .cx-message-text").html(null);
    $("#cx-chat-index-" + index + " .cx-message-text").html(html);
  }, 40);

  return `#button-yesRe-${index},#button-noRe-${index},#button-backRe-${index}`;
}

async function yesnobackReselectS(data, radio) {
  await $(() => {
    var split = data.split(",");
    function disableButton() {
      for (var i = 0; i < split.length; i++) {
        $(`body ${split[i]}`).prop("disabled", true);
        $(`body ${split[i]}`).css("pointer-events", "none");
      }
    }
      $(".cx-send").on("keyup click", function (e) {
        disableButton();
        resetTimer();
      });
      $(".cx-message-input").keyup(function (e) {
        if (e.which == 13) {
          resetTimer();
          disableButton();
        }
      });


    setTimeout(() => {
      for (let k = 0; k <= split.length - 1; k++) {
        $(`body ${split[k]}`).click(() => {
          $(`body ${split[k]}`).css("background", "#1352de");
          $(`body ${split[k]}`).css("color", "#ffffff");
          $(`body ${split[k]}`).css("font-weight", "300");
          disableButton();
          sender($(split[k]).text().toUpperCase().trim());
        });
      }
    }, 50);
  });
  return await true;
}

async function yesnoReselectP(toArray, index) {
  var html = toArray;

  html += `<br><br><center>
  <button id='button-yesRe-${index}' class='button-yesRe cx-yesRe cx-btn cx-btn-primary i18n' style='width: 200px'>YES</button>
  <button id='button-noRe-${index}' class='button-noRe cx-noRe cx-btn cx-btn-primary i18n' style='width: 200px'>NO</button>

  </center>
  </div>`;
  await setTimeout(() => {
    //    document.getElementById("cx-chat-index-"+e.data.messages[i].index).append(json2html.render(data,template))
    $("#cx-chat-index-" + index + " .cx-message-text").html(null);
    $("#cx-chat-index-" + index + " .cx-message-text").html(html);
  }, 40);

  return `#button-yesRe-${index},#button-noRe-${index}`;
}

async function yesnoReselectS(data, radio) {
  await $(() => {
    var split = data.split(",");

    $(`.button-getStarted1`).prop("disabled", false);
    $(`.button-getStarted1`).css("pointer-events", "auto");
    $(`.button-getStarted`).prop("disabled", false);
    $(`.button-getStarted`).css("pointer-events", "auto");
    noGetStartedMessage = true;


    function disableButton() {
      for (var i = 0; i < split.length; i++) {
        $(`body ${split[i]}`).prop("disabled", true);
        $(`body ${split[i]}`).css("pointer-events", "none");
      }
    }
      $(".cx-send").on("keyup click", function (e) {
        disableButton();
        resetTimer();
      });
      $(".cx-message-input").keyup(function (e) {
        if (e.which == 13) {
          resetTimer();
          disableButton();
        }
      });


    setTimeout(() => {
      for (let k = 0; k <= split.length - 1; k++) {
        $(`body ${split[k]}`).click(() => {
          $(`body ${split[k]}`).css("background", "#1352de");
          $(`body ${split[k]}`).css("color", "#ffffff");
          $(`body ${split[k]}`).css("font-weight", "300");
          disableButton();
          sender($(split[k]).text().toUpperCase().trim());
        });
      }
    }, 50);
  });
  return await true;
}

async function furtherAssistanceReselectP(toArray, index) {
  var html = toArray;

  html += `<br><br><center>
  <button id='button-yesRe-${index}' class='button-yesRe cx-yesRe cx-btn cx-btn-primary i18n' style='width: 200px;'>NEED FURTHER ASSISTANCE</button>
  <button id='button-noRe-${index}' class='button-noRe cx-noRe cx-btn cx-btn-primary i18n' style='width: 200px'>NOTHING ELSE TODAY</button>

  </center>
  </div>`;
  await setTimeout(() => {
    //    document.getElementById("cx-chat-index-"+e.data.messages[i].index).append(json2html.render(data,template))
    $("#cx-chat-index-" + index + " .cx-message-text").html(null);
    $("#cx-chat-index-" + index + " .cx-message-text").html(html);
  }, 40);

  return `#button-yesRe-${index},#button-noRe-${index}`;
}

async function furtherAssistanceReselectS(data, radio) {
  await $(() => {
    var split = data.split(",");
    function disableButton() {
      for (var i = 0; i < split.length; i++) {
        $(`body ${split[i]}`).prop("disabled", true);
        $(`body ${split[i]}`).css("pointer-events", "none");
      }
    }
      $(".cx-send").on("keyup click", function (e) {
        disableButton();
        resetTimer();
      });
      $(".cx-message-input").keyup(function (e) {
        if (e.which == 13) {
          resetTimer();
          disableButton();
        }
      });

    
    setTimeout(() => {
      for (let k = 0; k <= split.length - 1; k++) {
        $(`body ${split[k]}`).click(() => {
          $(`body ${split[k]}`).css("background", "#1352de");
          $(`body ${split[k]}`).css("color", "#ffffff");
          $(`body ${split[k]}`).css("font-weight", "300");
          disableButton();
          sender($(split[k]).text().toUpperCase().trim());
        });
      }
    }, 50);
  });
  return await true;
}

async function learnmorereselectP(toArray, index) {
  var html = toArray;

  html += `<br><br><center>
  <button id='button-learn-${index}' class='button-learn cx-learn cx-btn cx-btn-primary i18n' style='width: 200px;'>LEARN MORE</button>
  <button id='button-noRe-${index}' class='button-noRe cx-noRe cx-btn cx-btn-primary i18n' style='width: 200px'>NOTHING ELSE TODAY</button>
  <button id='button-yesRe-${index}' class='button-yesRe cx-yesRe cx-btn cx-btn-primary i18n' style='width: 200px;'>NEED FURTHER ASSISTANCE</button>

  </center>
  </div>`;
  await setTimeout(() => {
    $("#cx-chat-index-" + index + " .cx-message-text").html(null);
    $("#cx-chat-index-" + index + " .cx-message-text").html(html);
  }, 40);

  return `#button-learn-${index},#button-noRe-${index},#button-yesRe-${index}`;
}

async function learnmorereselectS(data, radio) {
  await $(() => {
    var split = data.split(",");
    function disableButton() {
      for (var i = 0; i < split.length; i++) {
        $(`body ${split[i]}`).prop("disabled", true);
        $(`body ${split[i]}`).css("pointer-events", "none");
      }
    }
      $(".cx-send").on("keyup click", function (e) {
        disableButton();
        resetTimer();
      });
      $(".cx-message-input").keyup(function (e) {
        if (e.which == 13) {
          resetTimer();
          disableButton();
        }
      });

    
    setTimeout(() => {
      for (let k = 0; k <= split.length - 1; k++) {
        $(`body ${split[k]}`).click(() => {
          $(`body ${split[k]}`).css("background", "#1352de");
          $(`body ${split[k]}`).css("color", "#ffffff");
          $(`body ${split[k]}`).css("font-weight", "300");
          disableButton();
          sender($(split[k]).text().toUpperCase().trim());
        });
      }
    }, 50);
  });
  return await true;
}



async function tryAgainReselectP(toArray, index) {
  var html = toArray;

  html += `<br><br><center>
  <button id='button-yesRe-${index}' class='button-yesRe cx-yesRe cx-btn cx-btn-primary i18n' style='width: 200px;'>TRY AGAIN LATER</button>
  <button id='button-noRe-${index}' class='button-noRe cx-noRe cx-btn cx-btn-primary i18n' style='width: 200px'>LIVE AGENT</button>

  </center>
  </div>`;
  await setTimeout(() => {
    $("#cx-chat-index-" + index + " .cx-message-text").html(null);
    $("#cx-chat-index-" + index + " .cx-message-text").html(html);
  }, 40);

  return `#button-yesRe-${index},#button-noRe-${index}`;
}

async function tryAgainReselectS(data, radio) {
  await $(() => {
    var split = data.split(",");
    function disableButton() {
      for (var i = 0; i < split.length; i++) {
        $(`body ${split[i]}`).prop("disabled", true);
        $(`body ${split[i]}`).css("pointer-events", "none");
      }
    }
      $(".cx-send").on("keyup click", function (e) {
        disableButton();
        resetTimer();
      });
      $(".cx-message-input").keyup(function (e) {
        if (e.which == 13) {
          resetTimer();
          disableButton();
        }
      });

    
    setTimeout(() => {
      for (let k = 0; k <= split.length - 1; k++) {
        $(`body ${split[k]}`).click(() => {
          $(`body ${split[k]}`).css("background", "#1352de");
          $(`body ${split[k]}`).css("color", "#ffffff");
          $(`body ${split[k]}`).css("font-weight", "300");
          disableButton();
          sender($(split[k]).text().toUpperCase().trim());
        });
      }
    }, 50);
  });
  return await true;
}

async function yesnothanksReselectP(toArray, index) {
  var html = toArray;

  html += `<br><br><center>
  <button id='button-yesRe-${index}' class='button-yesRe cx-yesRe cx-btn cx-btn-primary i18n' style='width: 200px'>YES</button>
  <button id='button-noRe-${index}' class='button-noRe cx-noRe cx-btn cx-btn-primary i18n' style='width: 200px'>NO THANKS</button>

  </center>
  </div>`;
  await setTimeout(() => {
    //    document.getElementById("cx-chat-index-"+e.data.messages[i].index).append(json2html.render(data,template))
    $("#cx-chat-index-" + index + " .cx-message-text").html(null);
    $("#cx-chat-index-" + index + " .cx-message-text").html(html);
  }, 40);

  return `#button-yesRe-${index},#button-noRe-${index}`;
}

async function yesnothanksReselectS(data, radio) {
  await $(() => {
    var split = data.split(",");
    function disableButton() {
      for (var i = 0; i < split.length; i++) {
        $(`body ${split[i]}`).prop("disabled", true);
        $(`body ${split[i]}`).css("pointer-events", "none");
      }
    }
      $(".cx-send").on("keyup click", function (e) {
        disableButton();
        resetTimer();
      });
      $(".cx-message-input").keyup(function (e) {
        if (e.which == 13) {
          resetTimer();
          disableButton();
        }
      });

    
    setTimeout(() => {
      for (let k = 0; k <= split.length - 1; k++) {
        $(`body ${split[k]}`).click(() => {
          $(`body ${split[k]}`).css("background", "#1352de");
          $(`body ${split[k]}`).css("color", "#ffffff");
          $(`body ${split[k]}`).css("font-weight", "300");
          disableButton();
          sender($(split[k]).text().toUpperCase().trim());
        });
      }
    }, 50);
  });
  return await true;
}

async function somethingelsereselectP(toArray, index) {
  var html = toArray;

  html += `<br><br><center>
  <button id='button-elseyes-${index}' class='button-elseyes cx-elseyes cx-btn cx-btn-primary i18n' style='width: 200px;'>YES</button>
  <button id='button-elseno-${index}' class='button-elseno cx-elseno cx-btn cx-btn-primary i18n' style='width: 200px'>NO</button>
  <button id='button-somethingelse-${index}' class='button-somethingelse cx-somethingelse cx-btn cx-btn-primary i18n' style='width: 200px;'>SOMETHING ELSE</button>

  </center>
  </div>`;
  await setTimeout(() => {
    //    document.getElementById("cx-chat-index-"+e.data.messages[i].index).append(json2html.render(data,template))
    $("#cx-chat-index-" + index + " .cx-message-text").html(null);
    $("#cx-chat-index-" + index + " .cx-message-text").html(html);
  }, 40);

  return `#button-elseyes-${index},#button-elseno-${index},#button-somethingelse-${index}`;
}

async function somethingelsereselectS(data, radio) {
  await $(() => {
    var split = data.split(",");
    function disableButton() {
      for (var i = 0; i < split.length; i++) {
        $(`body ${split[i]}`).prop("disabled", true);
        $(`body ${split[i]}`).css("pointer-events", "none");
      }
    }
      $(".cx-send").on("keyup click", function (e) {
        disableButton();
        resetTimer();
      });
      $(".cx-message-input").keyup(function (e) {
        if (e.which == 13) {
          resetTimer();
          disableButton();
        }
      });

    setTimeout(() => {
      for (let k = 0; k <= split.length - 1; k++) {
        $(`body ${split[k]}`).click(() => {
          $(`body ${split[k]}`).css("background", "#1352de");
          $(`body ${split[k]}`).css("color", "#ffffff");
          $(`body ${split[k]}`).css("font-weight", "300");
          disableButton();
          sender($(split[k]).text().toUpperCase().trim());
        });
      }
    }, 50);
  });
  return await true;
}

async function tripcancelreselectP(toArray, index) {
  var html = toArray;

  html += `<br><br><center>
  <button id='button-tripcancel-${index}' class='button-tripcancel cx-tripcancel cx-btn cx-btn-primary i18n' style='width: 200px;'>TRIP CANCELLATION</button>
  <button id='button-tripinterrupt-${index}' class='button-tripinterrupt cx-tripinterrupt cx-btn cx-btn-primary i18n' style='width: 200px'>TRIP INTERRUPTION</button>
  <button id='button-tripnone-${index}' class='button-tripnone cx-tripnone cx-btn cx-btn-primary i18n' style='width: 200px;'>NONE OF THESE</button>

  </center>
  </div>`;
  await setTimeout(() => {
    //    document.getElementById("cx-chat-index-"+e.data.messages[i].index).append(json2html.render(data,template))
    $("#cx-chat-index-" + index + " .cx-message-text").html(null);
    $("#cx-chat-index-" + index + " .cx-message-text").html(html);
  }, 40);

  return `#button-tripcancel-${index},#button-tripinterrupt-${index},#button-tripnone-${index}`;
}

async function tripcancelreselectS(data, radio) {
  await $(() => {
    var split = data.split(",");
    function disableButton() {
      for (var i = 0; i < split.length; i++) {
        $(`body ${split[i]}`).prop("disabled", true);
        $(`body ${split[i]}`).css("pointer-events", "none");
      }
    }
      $(".cx-send").on("keyup click", function (e) {
        disableButton();
        resetTimer();
      });
      $(".cx-message-input").keyup(function (e) {
        if (e.which == 13) {
          resetTimer();
          disableButton();
        }
      });

    
    setTimeout(() => {
      for (let k = 0; k <= split.length - 1; k++) {
        $(`body ${split[k]}`).click(() => {
          $(`body ${split[k]}`).css("background", "#1352de");
          $(`body ${split[k]}`).css("color", "#ffffff");
          $(`body ${split[k]}`).css("font-weight", "300");
          disableButton();
          sender($(split[k]).text().toUpperCase().trim());
        });
      }
    }, 50);
  });
  return await true;
}

async function reasoncancelreselectP(toArray, index) {
  var html = toArray;

  html += `<br><br><center>
  <button id='button-cancel1-${index}' class='button-cancel1 cx-cancel1 cx-btn cx-btn-primary i18n' style='width: 200px;'>ILLNESS</button>
  <button id='button-cancel2-${index}' class='button-cancel2 cx-cancel2 cx-btn cx-btn-primary i18n' style='width: 200px'>INJURY</button>
  <button id='button-cancel3-${index}' class='button-cancel3 cx-cancel3 cx-btn cx-btn-primary i18n' style='width: 200px;'>PREGNANCY RELATED</button>
  <button id='button-cancel4-${index}' class='button-cancel4 cx-cancel4 cx-btn cx-btn-primary i18n' style='width: 200px;'>INCLEMENT WEATHER</button>
  <button id='button-cancel5-${index}' class='button-cancel5 cx-cancel5 cx-btn cx-btn-primary i18n' style='width: 200px; white-space: normal'>WORK/EMPLOYMENT RELATED</button>
  <button id='button-cancel6-${index}' class='button-cancel6 cx-cancel6 cx-btn cx-btn-primary i18n' style='width: 200px;'>MILITARY ORDER</button>
  <button id='button-cancel7-${index}' class='button-cancel7 cx-cancel7 cx-btn cx-btn-primary i18n' style='width: 200px;'>MORE REASONS</button>

  </center>
  </div>`;
  await setTimeout(() => {
    //    document.getElementById("cx-chat-index-"+e.data.messages[i].index).append(json2html.render(data,template))
    $("#cx-chat-index-" + index + " .cx-message-text").html(null);
    $("#cx-chat-index-" + index + " .cx-message-text").html(html);
  }, 40);

  return `#button-cancel1-${index},#button-cancel2-${index},#button-cancel3-${index},#button-cancel4-${index},#button-cancel5-${index},#button-cancel6-${index},#button-cancel7-${index}`;
}

async function reasoncancelreselectS(data, radio) {
  await $(() => {
    var split = data.split(",");
    function disableButton() {
      for (var i = 0; i < split.length; i++) {
        $(`body ${split[i]}`).prop("disabled", true);
        $(`body ${split[i]}`).css("pointer-events", "none");
      }
    }
      $(".cx-send").on("keyup click", function (e) {
        disableButton();
        resetTimer();
      });
      $(".cx-message-input").keyup(function (e) {
        if (e.which == 13) {
          resetTimer();
          disableButton();
        }
      });

    
    setTimeout(() => {
      for (let k = 0; k <= split.length - 1; k++) {
        $(`body ${split[k]}`).click(() => {
          $(`body ${split[k]}`).css("background", "#1352de");
          $(`body ${split[k]}`).css("color", "#ffffff");
          $(`body ${split[k]}`).css("font-weight", "300");
          disableButton();
          sender($(split[k]).text().toUpperCase().trim());
        });
      }
    }, 50);
  });
  return await true;
}
async function reasonmorecancelreselectP(toArray, index) {
  var html = toArray;

  html += `<br><br><center>
  <button id='button-cancel1-${index}' class='button-cancel1 cx-cancel1 cx-btn cx-btn-primary i18n' style='width: 200px;'>COURT APPERANCE</button>
  <button id='button-cancel2-${index}' class='button-cancel2 cx-cancel2 cx-btn cx-btn-primary i18n' style='width: 200px; white-space: normal'>HOME/DESTINATION UNINHABITABLE</button>
  <button id='button-cancel3-${index}' class='button-cancel3 cx-cancel3 cx-btn cx-btn-primary i18n' style='width: 200px;'>DEATH</button>
  <button id='button-cancel4-${index}' class='button-cancel4 cx-cancel4 cx-btn cx-btn-primary i18n' style='width: 200px; white-space: normal'>AIRLINE/CRUISE LINE PROBLEMS</button>
  <button id='button-cancel5-${index}' class='button-cancel5 cx-cancel5 cx-btn cx-btn-primary i18n' style='width: 200px;'>OTHERS</button>
  <button id='button-cancel6-${index}' class='button-cancel6 cx-cancel6 cx-btn cx-btn-primary i18n' style='width: 200px;'>GOBACK</button>

  </center>
  </div>`;
  await setTimeout(() => {
    //    document.getElementById("cx-chat-index-"+e.data.messages[i].index).append(json2html.render(data,template))
    $("#cx-chat-index-" + index + " .cx-message-text").html(null);
    $("#cx-chat-index-" + index + " .cx-message-text").html(html);
  }, 40);

  return `#button-cancel1-${index},#button-cancel2-${index},#button-cancel3-${index},#button-cancel4-${index},#button-cancel5-${index},#button-cancel6-${index}`;
}

async function reasonmorecancelreselectS(data, radio) {
  await $(() => {
    var split = data.split(",");
    function disableButton() {
      for (var i = 0; i < split.length; i++) {
        $(`body ${split[i]}`).prop("disabled", true);
        $(`body ${split[i]}`).css("pointer-events", "none");
      }
    }
      $(".cx-send").on("keyup click", function (e) {
        disableButton();
        resetTimer();
      });
      $(".cx-message-input").keyup(function (e) {
        if (e.which == 13) {
          resetTimer();
          disableButton();
        }
      });

    
    setTimeout(() => {
      for (let k = 0; k <= split.length - 1; k++) {
        $(`body ${split[k]}`).click(() => {
          $(`body ${split[k]}`).css("background", "#1352de");
          $(`body ${split[k]}`).css("color", "#ffffff");
          $(`body ${split[k]}`).css("font-weight", "300");
          disableButton();
          sender($(split[k]).text().toUpperCase().trim());
        });
      }
    }, 50);
  });
  return await true;
}



// <--------------------- GET STARTED ------------------------->

async function buttonUrlParser(toArray, index) {
  var html = ``;
  var split = toArray.split(",");
  var buttonBuilder = "";
  var appIndex = 0;

  await _.forEach(split, (data) => {
    let value = data.trim();

    buttonBuilder += `<button id='btn-${index}' class='button-getStarted1 cx-${index} btn-${index}-${appIndex} cx-btn cx-btn-primary i18n'  value='${value}' style='width: 200px'>${value.toUpperCase()}</button>`;
    appIndex++;
  });

  html += `<center>${buttonBuilder}</center></div>`;

  await setTimeout(() => {
    $("#cx-chat-index-" + index + " .cx-message-text").html(null);
    $("#cx-chat-index-" + index + " .cx-message-text").html(html);
  }, 40);




  return `#btn-${index}`;
}



async function buttonUrlReParser(toArray, index) {
  var html = toArray;

  html += `<center>

  <br><button id='button-getStarted-${index}' class='button-getStarted cx-getStarted cx-btn cx-btn-primary i18n' style='width: 200px'>GET STARTED</button>
  </center>
  </div>`;
  await setTimeout(() => {
    $("#cx-chat-index-" + index + " .cx-message-text").html(null);
    $("#cx-chat-index-" + index + " .cx-message-text").html(html);
  }, 40);

  return `#button-getStarted-${index}`;
}


async function buttonUrlSender(messages, data, index, chatM) {
  await $(() => {

    var split = data.split(",");
    var message = messages.split(",");
    isUrlTransfer = true;
    noGetStartedMessage = false;

    $(`.button-getStarted1`).prop("disabled", true);
    $(`.button-getStarted1`).css("pointer-events", "none");
    $(`.button-getStarted`).prop("disabled", true);
    $(`.button-getStarted`).css("pointer-events", "none");
    
    if(isUrlTransfer) {

      $(".cx-message-input").keyup(function(e) {


        if($(this).val() == 'get started' || 
           $(this).val() == 'GET STARTED' || 
           $(this).val() == 'GET started' ||
           $(this).val() == 'get STARTED' || 
           $(this).val() == 'Get STARTED' ||
           $(this).val() == "Get started" || 
           $(this).val() == "Get Started" || 
           $(this).val() == "START" || 
           $(this).val() == "STARTED" || 
           $(this).val() == "started" || 
           $(this).val() == "start" || 
           $(this).val() == "Get Start" || 
           $(this).val() == "get start" || 
           $(this).val() == "GET START" && isUrlTransfer){
         isUrlTransfer = true;

       $(".cx-message-input").keyup(function (e) {
          if (e.which == 13) {
            window.open(dynamicUrl);
            isUrlTransfer = false;
            if(!noGetStartedMessage){
              $(".cx-send").unbind('click');
              $(".cx-message-input").unbind('keyup');
            }
            clearTimeout(fifteenseconds)
            clearTimeout(fifteensecondsReselect)
            noGetStartedMessage = true;

            for (let k = 0; k <= message.length - 1; k++) {
              setTimeout(() => {
      
                $(`#btn-${index}`).prop("disabled", false);
                $(`#btn-${index}`).css("pointer-events", "auto");
              }, 500);
      
             }

          }
        });


      $(".cx-send").on("click", function (e) {
        window.open(dynamicUrl);
        isUrlTransfer = false;
        if(!noGetStartedMessage){
          $(".cx-send").unbind('click');
          $(".cx-message-input").unbind('keyup');
        }
        clearTimeout(fifteenseconds)
        clearTimeout(fifteensecondsReselect)
        noGetStartedMessage = true;
        for (let k = 0; k <= message.length - 1; k++) {
          setTimeout(() => {
  
            $(`#btn-${index}`).prop("disabled", false);
            $(`#btn-${index}`).css("pointer-events", "auto");
          }, 500);
  
         }

        });
  
        }
      });
    }
    function disableButton() {
      for (var i = 0; i < message.length; i++) {
        $(`.btn-${index}-${i}`).prop("disabled", true);
        $(`.btn-${index}-${i}`).css("pointer-events", "none");
      }
    }


      $(".cx-send").on("keyup click", function (e) {
        disableButton();
        resetTimer();
       clearTimeout(fifteenseconds)


      });

      $(".cx-message-input").keyup(function (e) {
        if (e.which == 13) {
          disableButton();

          clearTimeout(fifteenseconds)
          clearTimeout(fifteensecondsReselect)
          resetTimer();
        }
      });


    setTimeout(() => {
      for (let k = 0; k <= message.length - 1; k++) {

        fifteenseconds = setTimeout(() => {
          
          sender('TIMEOUT15SECONDS');
          hideAdaptivecard = true;
          if(!noGetStartedMessage){
            $(".cx-send").unbind('click');
            $(".cx-message-input").unbind('keyup');
          }
          noGetStartedMessage = true;

          setTimeout(() => {

            $(`.btn-${index}-${k}`).prop("disabled", false);
            $(`.btn-${index}-${k}`).css("pointer-events", "auto");
       
             }, 800);
        }, 15000);

        $(`.btn-${index}-${k}`).on("click", function (e) {


          isUrlTransfer = false;

 
        if(!noGetStartedMessage){
          sender($(split[k]).text().toUpperCase().trim());
          $(".cx-send").unbind('click');
          $(".cx-message-input").unbind('keyup');
        }
        if($(split[k]).text().toUpperCase().trim() == "GET STARTED") window.open(dynamicUrl);resetTimer();
          clearTimeout(fifteenseconds)
          noGetStartedMessage = true;
          setTimeout(() => {

            $(`.btn-${index}-${k}`).prop("disabled", false);
            $(`.btn-${index}-${k}`).css("pointer-events", "auto");
       
             }, 500);
        });
      }
    }, 80);
  });
  return await true;
}




async function buttonUrlReSender(data, index) {
  await $(() => {
    var split = data.split(",");
    noGetStartedMessage = false;
    clearTimeout(fifteenseconds)
    $(`.button-getStarted1`).prop("disabled", true);
    $(`.button-getStarted1`).css("pointer-events", "none");
    $(`.button-getStarted`).prop("disabled", true);
    $(`.button-getStarted`).css("pointer-events", "none");

    function disableButton() {
      for (var i = 0; i < split.length; i++) {
        $(`body ${split[i]}`).prop("disabled", true);
        $(`body ${split[i]}`).css("pointer-events", "none");
      }
    }
      $(".cx-send").on("keyup click", function (e) {
        disableButton();
        resetTimer();
        clearTimeout(fifteensecondsReselect)

        for (let k = 0; k <= split.length - 1; k++) {
          setTimeout(() => {
            $(`#button-getStarted-${index}`).prop("disabled", false);
            $(`#button-getStarted-${index}`).css("pointer-events", "auto");
          }, 500);
         }
         setTimeout(() => {

          $(`.button-getStarted1`).prop("disabled", true);
          $(`.button-getStarted1`).css("pointer-events", "none");
     
           }, 1000);


      });

      $(".cx-message-input").keyup(function (e) {
        if (e.which == 13) {
          disableButton();
          clearTimeout(fifteenseconds)
          clearTimeout(fifteensecondsReselect)
          resetTimer();


          for (let k = 0; k <= split.length - 1; k++) {
            
            setTimeout(() => {
              $(`#button-getStarted-${index}`).prop("disabled", false);
              $(`#button-getStarted-${index}`).css("pointer-events", "auto");
            }, 500);
           }
          
        setTimeout(() => {

          $(`.button-getStarted1`).prop("disabled", true);
          $(`.button-getStarted1`).css("pointer-events", "none");
     
           }, 1000);
          
        }
      });



    setTimeout(() => {
      
      for (let k = 0; k <= split.length - 1; k++) {
        fifteensecondsReselect = setTimeout(() => {
          sender('TIMEOUT15SECONDS');
          hideAdaptivecard = true;
          noGetStartedMessage = true;
          if(!noGetStartedMessage){
            $(".cx-send").unbind('click');
            $(".cx-message-input").unbind('keyup');
          }

        }, 15000);



        $(`body ${split[k]}`).on("click", function (e) {

          isUrlTransfer = false;
          if(!noGetStartedMessage){
            $(".cx-send").unbind('click');
            $(".cx-message-input").unbind('keyup');
          }

         if(!noGetStartedMessage){
          sender($(split[k]).text().toUpperCase().trim());
        }
        if($(split[k]).text().toUpperCase().trim() == "GET STARTED") window.open(dynamicUrl);resetTimer();
        clearTimeout(fifteensecondsReselect)
        noGetStartedMessage = true;
        for (let k = 0; k < split.length; k++) {
          setTimeout(() => {
            $(`#button-getStarted-${index}`).prop("disabled", false);
            $(`#button-getStarted-${index}`).css("pointer-events", "auto");
          }, 1000);
         }

        });
      }
    }, 50);
  });
  return await true;
}