// BUTTONS


async function sender(value) {
  
  setTimeout(() => {
    
  $(`#cx_input`).focus();
  $(".cx-send").trigger('click', $(`#cx_input`).val(value));
}, 50);
  
}



async function likeButtonParserCC(toArray, index) {
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

async function likeButtonReParserCC(toArray, index) {
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



async function likeButtonSenderCC(data, radio) {
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





async function yesButtonParserCC(toArray, index, thanks = false) {
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

async function yesButtonSenderCC(data, radio) {
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
          $(`body ${split[k]}`).css("font-weight", "600");
          disableButton();

          sender($(split[k]).text().toUpperCase().trim());
        });
      }
    }, 50);
  });
  return await true;
}

async function yesNoThanksButtonSenderCC(data, radio) {
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
          $(`body ${split[k]}`).css("font-weight", "600");
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

async function yesModifyButtonParserCC(toArray, index) {
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

async function yesModifyButtonSenderCC(data, radio) {
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
          $(`body ${split[k]}`).css("font-weight", "600");
          disableButton();
          sender($(split[k]).text().toUpperCase().trim());
        });
      }
    }, 50);
  });
  return await true;
}




async function yesNoButtonParserCC(toArray, index) {
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



async function yesNoButtonSenderCC(data, radio) {
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
          $(`body ${split[k]}`).css("font-weight", "600");
          disableButton();
          sender($(split[k]).text().toUpperCase().trim());
        });
      }
    }, 50);
  });
  return await true;
}

async function yesNoSureButtonParserCC(toArray, index) {
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

async function yesNoSureButtonSenderCC(data, radio) {
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
          $(`body ${split[k]}`).css("font-weight", "600");
          disableButton();
          sender($(split[k]).text().toUpperCase().trim());
        });
      }
    }, 50);
  });
  return await true;
}






async function claimButtonParserCC(toArray, index) {
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

async function claimButtonParser2CC(toArray, index) {
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

async function claimButtonSenderCC(data, radio) {
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
          $(`body ${split[k]}`).css("font-weight", "600");

          disableButton();
          sender($(split[k]).text().toUpperCase().trim());
          letDisableButton = false;

        });
      }
    }, 40);
  });
  return await true;
}

async function nonBusinessParserCC(toArray, index) {
  var html = ``;

  html += `<style='font-size: 14px;margin-bottom: 5px;position: relative'>${toArray}</label><br><br><center>
  <button id='button-file-${index}' class='button-file cx-file cx-btn cx-btn-primary i18n' style='width: 200px; letter-spacing: 0.5px;'>FILE A CLAIM</button>
  <button id='button-status-${index}' class='button-status cx-status cx-btn cx-btn-primary i18n' style='width: 200px'>CLAIM STATUS</button><br>
  </center>
  </div>`;
  await setTimeout(() => {
    //    document.getElementById("cx-chat-index-"+e.data.messages[i].index).append(json2html.render(data,template))
    $("#cx-chat-index-" + index + " .cx-message-text").html(null);
    $("#cx-chat-index-" + index + " .cx-message-text").html(html);
  }, 40);

  return `#button-file-${index},#button-status-${index},#button-another-${index}`;
}

async function nonBusinessSenderCC(data, radio) {
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
          $(`body ${split[k]}`).css("font-weight", "600");

          disableButton();
          sender($(split[k]).text().toUpperCase().trim());
          letDisableButton = false;

        });
      }
    }, 40);
  });
  return await true;
}

async function dynamicCategoryButtonSenderCC(messages, data, index) {
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
          // e.preventDefault()

          $(`.btn-${index}-${k}`).css("background", "#1352de");
          $(`.btn-${index}-${k}`).css("color", "#ffffff");
          $(`.btn-${index}-${k}`).css("font-weight", "600");
         sender($(`body ${split}`)[k].value.toUpperCase());

          disableButton();
        });
      }
    }, 40);
  });
  return await true;
}



async function uploadUrlReParserCC(toArray, index) {
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

async function uploadUrlReSenderCC(data, radio) {
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
          $(`body ${split[k]}`).css("font-weight", "600");
          disableButton();
         //e.preventDefault()

         isUrlUpload = false;
         $(".cx-send").unbind('click');
         $(".cx-message-input").unbind('keyup');
         
          sender("Upload");
        if($(split[k]).text().toUpperCase().trim() == "UPLOAD") window.open(dynamicUrl);resetTimer();

          hideAdaptivecard = true;

        });
      }
    }, 50);
  });
  return await true;
}




async function uploadUrlSenderCC(messages, data, index) {
  await $(() => {

    var split = data.split(",");
    var message = messages.split(",");


    isUrlUpload = true;




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
          $(`body ${split[k]}`).css("font-weight", "600");
          disableButton();
         
          isUrlUpload = false;
          $(".cx-send").unbind('click');
          $(".cx-message-input").unbind('keyup');
  

        // e.preventDefault()
          sender("Upload");
        if($(split[k]).text().toUpperCase().trim() == "UPLOAD") window.open(dynamicUrl);resetTimer();

          hideAdaptivecard = true;
        });
      }
    }, 80);
  });
  return await true;
}

////////// DYNAMIC BUTTON ////////////////////

async function dynamicButtonParserCC(toArray, index) {
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


async function dynamicButtonSenderCC(messages, data, index) {
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
          $(`.btn-${index}-${k}`).css("font-weight", "600");
          sender($(`body ${split}`)[k].value.toUpperCase());

          disableButton();
        });
      }
    }, 80);
  });
  return await true;
}


async function dynamicButtonPipeParserCC(toArray, index) {
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


async function dynamicButtonPipeSenderCC(messages, data, index) {
  await $(() => {
    // var split = data.split(/\r\n|\n|\r/);
    // var message = messages.split(/\r\n|\n|\r/);
    var split = data.split(",");
    var message = messages.split("|");

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
          $(`.btn-${index}-${k}`).css("font-weight", "600");
          sender($(`body ${split}`)[k].value.toUpperCase());
  

          disableButton();
        });
      }
    }, 80);
  });
  return await true;
}


async function dynamicyespleaseButtonPipeParserCC(toArray, index) {
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


async function dynamicyespleaseButtonPipeSenderCC(messages, data, index) {
  await $(() => {
    // var split = data.split(/\r\n|\n|\r/);
    // var message = messages.split(/\r\n|\n|\r/);
    var split = data.split(",");
    var message = messages.split("|");

    yesPleaseUpload = true;


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
         yesPleaseUpload = false;
          $(`.btn-${index}-${k}`).css("background", "#1352de");
          $(`.btn-${index}-${k}`).css("color", "#ffffff");
          $(`.btn-${index}-${k}`).css("font-weight", "600");
          sender($(`body ${split}`)[k].value.toUpperCase());
          if($(split[k]).text().toUpperCase().trim() == "YES, PLEASE") {
            window.open(dynamicUrl);
            hideAdaptivecard = true;
            resetTimer();
          }
          
          disableButton();
        });
      }
    }, 80);
  });
  return await true;
}


////////// ERROR BUTTON ////////////////////
async function okayreselectPCC(toArray, index) {
  var html = toArray;

  html += `<br><br><center>
  <button id='button-okay-${index}' class='button-yesRe cx-yesRe cx-btn cx-btn-primary i18n' style='width: 200px'>OKAY</button>

  </center>
  </div>`;
  await setTimeout(() => {
    //    document.getElementById("cx-chat-index-"+e.data.messages[i].index).append(json2html.render(data,template))
    $("#cx-chat-index-" + index + " .cx-message-text").html(null);
    $("#cx-chat-index-" + index + " .cx-message-text").html(html);
  }, 40);

  return `#button-okay-${index}`;
}

async function okayreselectSCC(data, radio) {
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
          $(`body ${split[k]}`).css("font-weight", "600");
          disableButton();
          sender($(split[k]).text().toUpperCase().trim());
        });
      }
    }, 50);
  });
  return await true;
}

async function gotitreselecttPCC(toArray, index) {
  var html = toArray;

  html += `<br><br><center>
  <button id='button-gotit-${index}' class='button-yesRe cx-yesRe cx-btn cx-btn-primary i18n' style='width: 200px'>GOT IT</button>

  </center>
  </div>`;
  await setTimeout(() => {
    //    document.getElementById("cx-chat-index-"+e.data.messages[i].index).append(json2html.render(data,template))
    $("#cx-chat-index-" + index + " .cx-message-text").html(null);
    $("#cx-chat-index-" + index + " .cx-message-text").html(html);
  }, 40);

  return `#button-gotit-${index}`;
}

async function gotitreselectSCC(data, radio) {
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
          $(`body ${split[k]}`).css("font-weight", "600");
          disableButton();
          sender($(split[k]).text().toUpperCase().trim());
        });
      }
    }, 50);
  });
  return await true;
}



async function baggagelossReselectPCC(toArray, index) {
  var html = toArray;

  html += `<br><br><center>
  <button id='button-yesRe-${index}' class='button-yesRe cx-yesRe cx-btn cx-btn-primary i18n' style='width: 200px'>BAGGAGE IS LOST</button>
  <button id='button-noRe-${index}' class='button-noRe cx-noRe cx-btn cx-btn-primary i18n' style='width: 200px'>BAGGAGE WAS STOLEN</button>
  <button id='button-backRe-${index}' class='button-backRe cx-backRe cx-btn cx-btn-primary i18n' style='width: 200px'>BAGGAGE WAS DAMAGED</button>

  </center>
  </div>`;
  await setTimeout(() => {
    //    document.getElementById("cx-chat-index-"+e.data.messages[i].index).append(json2html.render(data,template))
    $("#cx-chat-index-" + index + " .cx-message-text").html(null);
    $("#cx-chat-index-" + index + " .cx-message-text").html(html);
  }, 40);

  return `#button-yesRe-${index},#button-noRe-${index},#button-backRe-${index}`;
}

async function baggagelossReselectSCC(data, radio) {
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
          $(`body ${split[k]}`).css("font-weight", "600");
          disableButton();
          sender($(split[k]).text().toUpperCase().trim());
        });
      }
    }, 50);
  });
  return await true;
}

async function yesnobackReselectPCC(toArray, index) {
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

async function yesnobackReselectSCC(data, radio) {
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
          $(`body ${split[k]}`).css("font-weight", "600");
          disableButton();
          sender($(split[k]).text().toUpperCase().trim());
        });
      }
    }, 50);
  });
  return await true;
}


async function yesnogobackReselectPCC(toArray, index) {
  var html = toArray;

  html += `<br><br><center>
  <button id='button-yesRe-${index}' class='button-yesRe cx-yesRe cx-btn cx-btn-primary i18n' style='width: 200px'>YES</button>
  <button id='button-noRe-${index}' class='button-noRe cx-noRe cx-btn cx-btn-primary i18n' style='width: 200px'>NO</button>
  <button id='button-backRe-${index}' class='button-backRe cx-backRe cx-btn cx-btn-primary i18n' style='width: 200px'>GO BACK</button>

  </center>
  </div>`;
  await setTimeout(() => {
    //    document.getElementById("cx-chat-index-"+e.data.messages[i].index).append(json2html.render(data,template))
    $("#cx-chat-index-" + index + " .cx-message-text").html(null);
    $("#cx-chat-index-" + index + " .cx-message-text").html(html);
  }, 40);

  return `#button-yesRe-${index},#button-noRe-${index},#button-backRe-${index}`;
}

async function yesnogobackReselectSCC(data, radio) {
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
          $(`body ${split[k]}`).css("font-weight", "600");
          disableButton();
          sender($(split[k]).text().toUpperCase().trim());
        });
      }
    }, 50);
  });
  return await true;
}

async function yesnoReselectPCC(toArray, index) {
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

async function yesnoReselectSCC(data, radio) {
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
          $(`body ${split[k]}`).css("font-weight", "600");
          disableButton();
          sender($(split[k]).text().toUpperCase().trim());
        });
      }
    }, 50);
  });
  return await true;
}


async function yesPleaseReselectPCC(toArray, index) {
  var html = toArray;

  html += `<br><br><center>
  <button id='button-yesRe-${index}' class='button-yesRe cx-yesRe cx-btn cx-btn-primary i18n' style='width: 200px'>YES, PLEASE</button>
  <button id='button-noRe-${index}' class='button-noRe cx-noRe cx-btn cx-btn-primary i18n' style='width: 200px'>NO, I'LL DO LATER</button>

  </center>
  </div>`;
  await setTimeout(() => {
    //    document.getElementById("cx-chat-index-"+e.data.messages[i].index).append(json2html.render(data,template))
    $("#cx-chat-index-" + index + " .cx-message-text").html(null);
    $("#cx-chat-index-" + index + " .cx-message-text").html(html);
  }, 40);

  return `#button-yesRe-${index},#button-noRe-${index}`;
}

async function yesPleaseReselectSCC(data) {
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
          $(`body ${split[k]}`).css("font-weight", "600");
          disableButton();
          sender($(split[k]).text().toUpperCase().trim());
         if($(split[k]).text().toUpperCase().trim() == "YES, PLEASE") {
          window.open(dynamicUrl);
          yesPleaseUpload = false;
          resetTimer();
         }

        });
      }
    }, 50);
  });
  return await true;
}
async function yesIhaveReselectPCC(toArray, index) {
  var html = toArray;

  html += `<br><br><center>
  <button id='button-yesRe-${index}' class='button-yesRe cx-yesRe cx-btn cx-btn-primary i18n' style='width: 200px'>YES, I HAVE</button>
  <button id='button-noRe-${index}' class='button-noRe cx-noRe cx-btn cx-btn-primary i18n' style='width: 200px'>NO, I HAVEN'T</button>

  </center>
  </div>`;
  await setTimeout(() => {
    //    document.getElementById("cx-chat-index-"+e.data.messages[i].index).append(json2html.render(data,template))
    $("#cx-chat-index-" + index + " .cx-message-text").html(null);
    $("#cx-chat-index-" + index + " .cx-message-text").html(html);
  }, 40);

  return `#button-yesRe-${index},#button-noRe-${index}`;
}

async function yesIhaveReselectSCC(data, radio) {
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
          $(`body ${split[k]}`).css("font-weight", "600");
          disableButton();
          sender($(split[k]).text().toUpperCase().trim());
        });
      }
    }, 50);
  });
  return await true;
}
async function yeslaterReselectPCC(toArray, index) {
  var html = toArray;

  html += `<br><br><center>
  <button id='button-yesRe-${index}' class='button-yesRe cx-yesRe cx-btn cx-btn-primary i18n' style='width: 200px'>YES, PLEASE</button>
  <button id='button-noRe-${index}' class='button-noRe cx-noRe cx-btn cx-btn-primary i18n' style='width: 200px'>NO, I'LL DO LATER</button>

  </center>
  </div>`;
  await setTimeout(() => {
    //    document.getElementById("cx-chat-index-"+e.data.messages[i].index).append(json2html.render(data,template))
    $("#cx-chat-index-" + index + " .cx-message-text").html(null);
    $("#cx-chat-index-" + index + " .cx-message-text").html(html);
  }, 40);

  return `#button-yesRe-${index},#button-noRe-${index}`;
}

async function yeslaterReselectS(data, radio) {
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
          $(`body ${split[k]}`).css("font-weight", "600");
          disableButton();
          sender($(split[k]).text().toUpperCase().trim());
        });
      }
    }, 50);
  });
  return await true;
}
async function continueReselectPCC(toArray, index) {
  var html = toArray;

  html += `<br><br><center>
  <button id='button-yesRe-${index}' class='button-yesRe cx-yesRe cx-btn cx-btn-primary i18n' style='width: 200px'>CONTINUE</button>

  </center>
  </div>`;
  await setTimeout(() => {
    //    document.getElementById("cx-chat-index-"+e.data.messages[i].index).append(json2html.render(data,template))
    $("#cx-chat-index-" + index + " .cx-message-text").html(null);
    $("#cx-chat-index-" + index + " .cx-message-text").html(html);
  }, 40);

  return `#button-yesRe-${index}`;
}



async function continueReselectSCC(data, radio) {
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
          $(`body ${split[k]}`).css("font-weight", "600");
          disableButton();
          sender($(split[k]).text().toUpperCase().trim());
        });
      }
    }, 50);
  });
  return await true;
}

async function viewDocumentReselectPCC(toArray, index) {
  var html = toArray;

  html += `<br><br><center>
  <button id='button-noRe2-${index}' class='button-noRe2 cx-noRe2 cx-btn cx-btn-primary i18n' style='width: 200px; white-space: normal'>VIEW RECOMMENDED DOCUMENTS</button>
  <button id='button-yesRe-${index}' class='button-yesRe cx-yesRe cx-btn cx-btn-primary i18n' style='width: 200px'>FILE A CLAIM</button>
  <button id='button-noRe-${index}' class='button-noRe cx-noRe cx-btn cx-btn-primary i18n' style='width: 200px'>VIEW CLAIM STATUS</button>

  </center>
  </div>`;
  await setTimeout(() => {
    //    document.getElementById("cx-chat-index-"+e.data.messages[i].index).append(json2html.render(data,template))
    $("#cx-chat-index-" + index + " .cx-message-text").html(null);
    $("#cx-chat-index-" + index + " .cx-message-text").html(html);
  }, 40);

  return `#button-noRe2-${index},#button-yesRe-${index},#button-noRe-${index}`;
}

async function viewDocumentReselectSCC(data, radio) {
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
          $(`body ${split[k]}`).css("font-weight", "600");
          disableButton();
          sender($(split[k]).text().toUpperCase().trim());
        });
      }
    }, 50);
  });
  return await true;
}



async function furtherAssistanceReselectPCC(toArray, index) {
  var html = toArray;

  html += `<br><br><center>
  <button id='button-yesRe-${index}' class='button-yesRe cx-yesRe cx-btn cx-btn-primary i18n' style='width: 200px; white-space: normal;'>NEED FURTHER ASSISTANCE</button>
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

async function furtherAssistanceReselectSCC(data, radio) {
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
          $(`body ${split[k]}`).css("font-weight", "600");
          disableButton();
          sender($(split[k]).text().toUpperCase().trim());
        });
      }
    }, 50);
  });
  return await true;
}

async function learnmorereselectPCC(toArray, index) {
  var html = toArray;

  html += `<br><br><center>
  <button id='button-learn-${index}' class='button-learn cx-learn cx-btn cx-btn-primary i18n' style='width: 200px;'>LEARN MORE</button>
  <button id='button-noRe-${index}' class='button-noRe cx-noRe cx-btn cx-btn-primary i18n' style='width: 200px'>NOTHING ELSE TODAY</button>
  <button id='button-yesRe-${index}' class='button-yesRe cx-yesRe cx-btn cx-btn-primary i18n' style='width: 200px; white-space: normal;'>NEED FURTHER ASSISTANCE</button>

  </center>
  </div>`;
  await setTimeout(() => {
    $("#cx-chat-index-" + index + " .cx-message-text").html(null);
    $("#cx-chat-index-" + index + " .cx-message-text").html(html);
  }, 40);

  return `#button-learn-${index},#button-noRe-${index},#button-yesRe-${index}`;
}

async function learnmorereselectSCC(data, radio) {
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
          $(`body ${split[k]}`).css("font-weight", "600");
          disableButton();
          sender($(split[k]).text().toUpperCase().trim());
        });
      }
    }, 50);
  });
  return await true;
}



async function tryAgainReselectPCC(toArray, index) {
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

async function tryAgainReselectSCC(data, radio) {
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
          $(`body ${split[k]}`).css("font-weight", "600");
          disableButton();
          sender($(split[k]).text().toUpperCase().trim());
        });
      }
    }, 50);
  });
  return await true;
}

async function yesnothanksReselectPCC(toArray, index) {
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

async function yesnothanksReselectSCC(data, radio) {
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
          $(`body ${split[k]}`).css("font-weight", "600");
          disableButton();
          sender($(split[k]).text().toUpperCase().trim());
        });
      }
    }, 50);
  });
  return await true;
}


async function okaylearnmoreReselectPCC(toArray, index) {
  var html = toArray;

  html += `<br><br><center>
  <button id='button-yesRe-${index}' class='button-yesRe cx-yesRe cx-btn cx-btn-primary i18n' style='width: 200px'>OKAY</button>
  <button id='button-noRe-${index}' class='button-noRe cx-noRe cx-btn cx-btn-primary i18n' style='width: 200px'>LEARN MORE</button>

  </center>
  </div>`;
  await setTimeout(() => {
    //    document.getElementById("cx-chat-index-"+e.data.messages[i].index).append(json2html.render(data,template))
    $("#cx-chat-index-" + index + " .cx-message-text").html(null);
    $("#cx-chat-index-" + index + " .cx-message-text").html(html);
  }, 40);

  return `#button-yesRe-${index},#button-noRe-${index}`;
}

async function okaylearnmoreReselectSCC(data, radio) {
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
          $(`body ${split[k]}`).css("font-weight", "600");
          disableButton();
          sender($(split[k]).text().toUpperCase().trim());
        });
      }
    }, 50);
  });
  return await true;
}

async function contReselectPCC(toArray, index) {
  var html = toArray;

  html += `<br><br><center>
  <button id='button-yesRe-${index}' class='button-yesRe cx-yesRe cx-btn cx-btn-primary i18n' style='width: 200px'>CONTINUE</button>

  </center>
  </div>`;
  await setTimeout(() => {
    //    document.getElementById("cx-chat-index-"+e.data.messages[i].index).append(json2html.render(data,template))
    $("#cx-chat-index-" + index + " .cx-message-text").html(null);
    $("#cx-chat-index-" + index + " .cx-message-text").html(html);
  }, 40);

  return `#button-yesRe-${index},#button-noRe-${index}`;
}

async function contReselectSCC(data, radio) {
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
          $(`body ${split[k]}`).css("font-weight", "600");
          disableButton();
          sender($(split[k]).text().toUpperCase().trim());
        });
      }
    }, 50);
  });
  return await true;
}


async function somethingelsereselectPCC(toArray, index) {
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

async function somethingelsereselectSCC(data, radio) {
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
          $(`body ${split[k]}`).css("font-weight", "600");
          disableButton();
          sender($(split[k]).text().toUpperCase().trim());
        });
      }
    }, 50);
  });
  return await true;
}

async function tripcancelreselectPCC(toArray, index) {
  var html = toArray;

  html += `<br><br><center>
  <button id='button-tripcancel-${index}' class='button-tripcancel cx-tripcancel cx-btn cx-btn-primary i18n' style='width: 200px;'>TRIP CANCELLATION</button>
  <button id='button-bagloss-${index}' class='button-bagloss cx-bagloss cx-btn cx-btn-primary i18n' style='width: 200px;'>BAGGAGE LOSS</button>
  <button id='button-tripinterrupt-${index}' class='button-tripinterrupt cx-tripinterrupt cx-btn cx-btn-primary i18n' style='width: 200px'>TRIP INTERRUPTION</button>
  <button id='button-tripnone-${index}' class='button-tripnone cx-tripnone cx-btn cx-btn-primary i18n' style='width: 200px;'>SOMETHING ELSE</button>

  </center>
  </div>`;
  await setTimeout(() => {
    //    document.getElementById("cx-chat-index-"+e.data.messages[i].index).append(json2html.render(data,template))
    $("#cx-chat-index-" + index + " .cx-message-text").html(null);
    $("#cx-chat-index-" + index + " .cx-message-text").html(html);
  }, 40);

  return `#button-tripcancel-${index},#button-bagloss-${index},#button-tripinterrupt-${index},#button-tripnone-${index}`;
}

async function tripcancelreselectSCC(data, radio) {
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
          $(`body ${split[k]}`).css("font-weight", "600");
          disableButton();
          sender($(split[k]).text().toUpperCase().trim());
        });
      }
    }, 50);
  });
  return await true;
}

async function reasoncancelreselectPCC(toArray, index) {
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

async function reasoncancelreselectSCC(data, radio) {
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
          $(`body ${split[k]}`).css("font-weight", "600");
          disableButton();
          sender($(split[k]).text().toUpperCase().trim());
        });
      }
    }, 50);
  });
  return await true;
}
async function reasonmorecancelreselectPCC(toArray, index) {
  var html = toArray;

  html += `<br><br><center>
  <button id='button-cancel1-${index}' class='button-cancel1 cx-cancel1 cx-btn cx-btn-primary i18n' style='width: 200px;'>COURT APPEARANCE</button>
  <button id='button-cancel2-${index}' class='button-cancel2 cx-cancel2 cx-btn cx-btn-primary i18n' style='width: 200px; white-space: normal'>HOME/DESTINATION UNINHABITABLE</button>
  <button id='button-cancel3-${index}' class='button-cancel3 cx-cancel3 cx-btn cx-btn-primary i18n' style='width: 200px;'>DEATH</button>
  <button id='button-cancel4-${index}' class='button-cancel4 cx-cancel4 cx-btn cx-btn-primary i18n' style='width: 200px; white-space: normal'>AIRLINE/CRUISE LINE PROBLEMS</button>
  <button id='button-cancel5-${index}' class='button-cancel5 cx-cancel5 cx-btn cx-btn-primary i18n' style='width: 200px;'>OTHERS</button>
  <button id='button-cancel6-${index}' class='button-cancel6 cx-cancel6 cx-btn cx-btn-primary i18n' style='width: 200px;'>GO BACK</button>

  </center>
  </div>`;
  await setTimeout(() => {
    //    document.getElementById("cx-chat-index-"+e.data.messages[i].index).append(json2html.render(data,template))
    $("#cx-chat-index-" + index + " .cx-message-text").html(null);
    $("#cx-chat-index-" + index + " .cx-message-text").html(html);
  }, 40);

  return `#button-cancel1-${index},#button-cancel2-${index},#button-cancel3-${index},#button-cancel4-${index},#button-cancel5-${index},#button-cancel6-${index}`;
}

async function reasonmorecancelreselectSCC(data, radio) {
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
          $(`body ${split[k]}`).css("font-weight", "600");
          disableButton();
          sender($(split[k]).text().toUpperCase().trim());
        });
      }
    }, 50);
  });
  return await true;
}



// <--------------------- GET STARTED ------------------------->

async function buttonUrlParserCC(toArray, index) {
  var html = ``;
  var split = toArray.split(",");
  var buttonBuilder = "";
  var appIndex = 0;

  await _.forEach(split, (data) => {
    let value = data.trim();

    buttonBuilder += `<button id='btn-${index}' class='button-getStarted1 cx-${index} btn-${index}-${appIndex} cx-btn cx-btn-primary i18n'  value='${value}' style='width: 200px;  white-space: normal;'>${value.toUpperCase()}</button>`;
    appIndex++;
  });

  html += `<center>${buttonBuilder}</center></div>`;

  await setTimeout(() => {
    $("#cx-chat-index-" + index + " .cx-message-text").html(null);
    $("#cx-chat-index-" + index + " .cx-message-text").html(html);
  }, 40);




  return `#btn-${index}`;
}



async function buttonUrlReParserCC(toArray, index) {
  var html = toArray;

  html += `<center>

  <br><button id='button-getStarted-${index}' class='button-getStarted cx-getStarted cx-btn cx-btn-primary i18n' style='width: 200px'>GET STARTED</button>
 <button id='button-getStarted2-${index}' class='button-getStarted2 cx-getStarted2 cx-btn cx-btn-primary i18n' style='width: 200px'>LEARN MORE</button>
 <button id='button-getStarted3-${index}' class='button-getStarted3 cx-getStarted3 cx-btn cx-btn-primary i18n' style='width: 200px'>NOTHING ELSE TODAY</button>
 <button id='button-getStarted4-${index}' class='button-getStarted4 cx-getStarted4 cx-btn cx-btn-primary i18n' style='width: 200px; white-space: normal;'>NEED FURTHER ASSISTANCE</button>

  </center>
  </div>`;
  await setTimeout(() => {
    $("#cx-chat-index-" + index + " .cx-message-text").html(null);
    $("#cx-chat-index-" + index + " .cx-message-text").html(html);
  }, 40);

  return `#button-getStarted-${index},#button-getStarted2-${index},#button-getStarted3-${index},#button-getStarted4-${index}`;
}

async function getstarted3buttonReParserCC(toArray, index) {
  var html = toArray;

  html += `<center>

  <br><button id='button-getStarted-${index}' class='button-getStarted cx-getStarted cx-btn cx-btn-primary i18n' style='width: 200px'>GET STARTED</button>
 <button id='button-getStarted3-${index}' class='button-getStarted3 cx-getStarted3 cx-btn cx-btn-primary i18n' style='width: 200px'>NOTHING ELSE TODAY</button>
 <button id='button-getStarted4-${index}' class='button-getStarted4 cx-getStarted4 cx-btn cx-btn-primary i18n' style='width: 200px; white-space: normal;'>NEED FURTHER ASSISTANCE</button>

  </center>
  </div>`;
  await setTimeout(() => {
    $("#cx-chat-index-" + index + " .cx-message-text").html(null);
    $("#cx-chat-index-" + index + " .cx-message-text").html(html);
  }, 40);

  return `#button-getStarted-${index},#button-getStarted3-${index},#button-getStarted4-${index}`;
}



async function buttonUrlSenderCC(messages, data, index, chatM) {
  await $(() => {

    var split = data.split(",");
    var message = messages.split(",");
    isUrlTransfer = true;

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
              $(".cx-send").unbind('click');
              $(".cx-message-input").unbind('keyup');
  

          }
        });


      $(".cx-send").on("click", function (e) {
        window.open(dynamicUrl);
        isUrlTransfer = false;
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
        clearTimeout(fifteenseconds)
      });

      $(".cx-message-input").keyup(function (e) {
        if (e.which == 13) {
          disableButton();
          resetTimer();
          clearTimeout(fifteenseconds)
        }
      });


    setTimeout(() => {
      for (let k = 0; k <= message.length - 1; k++) {


        // $(`.btn-${index}-${0}`).on("click", function (e) {


        //   window.open(dynamicUrl);
        //   // setTimeout(() => {

        //   //   $(`.btn-${index}-${k}`).prop("disabled", false);
        //   //   $(`.btn-${index}-${k}`).css("pointer-events", "auto");
       
        //   //    }, 500);
        // });

        // if push through
        // fifteenseconds = setTimeout(() => {
          
        //   sender('GET STARTED');
        //   hideAdaptivecard = true;
        //   if(!noGetStartedMessage){
        //     $(".cx-send").unbind('click');
        //     $(".cx-message-input").unbind('keyup');
        //   }
        //   noGetStartedMessage = true;

        //   setTimeout(() => {

        //     $(`.btn-${index}-${k}`).prop("disabled", false);
        //     $(`.btn-${index}-${k}`).css("pointer-events", "auto");
       
        //      }, 800);
        // }, 15000);

        $(`.btn-${index}-${k}`).on("click", function (e) {
         // e.preventDefault()
          clearTimeout(fifteenseconds)
         
         if($(split[k]).text().toUpperCase().trim() == "GET STARTED") window.open(dynamicUrl);
          $(`.btn-${index}-${k}`).css("background", "#1352de");
          $(`.btn-${index}-${k}`).css("color", "#ffffff");
          $(`.btn-${index}-${k}`).css("font-weight", "600");

          sender($(`body ${split}`)[k].value.toUpperCase());
          $(".cx-send").unbind('click');
          $(".cx-message-input").unbind('keyup');
          disableButton();
          resetTimer();
        });




      }
    }, 80);
  });
  return await true;
}




async function buttonUrlReSenderCC(data, index) {
  await $(() => {
    var split = data.split(",");
    noGetStartedMessage = false;

    function disableButton() {
      for (var i = 0; i < split.length; i++) {
        $(`body ${split[i]}`).prop("disabled", true);
        $(`body ${split[i]}`).css("pointer-events", "none");
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
          resetTimer();
          clearTimeout(fifteenseconds)
        }
      });



    setTimeout(() => {
      
      for (let k = 0; k <= split.length - 1; k++) {

        // $(`.btn-${index}-${0}`).on("click", function (e) {


        //   window.open(dynamicUrl);
        //   // setTimeout(() => {

        //   //   $(`.btn-${index}-${k}`).prop("disabled", false);
        //   //   $(`.btn-${index}-${k}`).css("pointer-events", "auto");
       
        //   //    }, 500);
        // });
        fifteenseconds = setTimeout(() => {
          
          sender('GET STARTED');
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

        $(`body ${split[k]}`).click(() => {
          clearTimeout(fifteenseconds)
          if($(split[k]).text().toUpperCase().trim() == "GET STARTED") window.open(dynamicUrl);

          $(`body ${split[k]}`).css("background", "#1352de");
          $(`body ${split[k]}`).css("color", "#ffffff");
          $(`body ${split[k]}`).css("font-weight", "600");
          disableButton();
          sender($(split[k]).text().toUpperCase().trim());
          $(".cx-send").unbind('click');
          $(".cx-message-input").unbind('keyup');
          resetTimer();
        });

      }
    }, 50);
  });
  return await true;
}


async function buttonUrlPipeParserCC(toArray, index) {
  var html = ``;
  var split = toArray.split("|");
  var buttonBuilder = "";
  var appIndex = 0;

  await _.forEach(split, (data) => {
    let value = data.trim();

    buttonBuilder += `<button id='btn-${index}' class='button-getStarted1 cx-${index} btn-${index}-${appIndex} cx-btn cx-btn-primary i18n'  value='${value}' style='width: 200px; white-space: normal;'>${value.toUpperCase()}</button>`;
    appIndex++;
  });

  html += `<center>${buttonBuilder}</center></div>`;

  await setTimeout(() => {
    $("#cx-chat-index-" + index + " .cx-message-text").html(null);
    $("#cx-chat-index-" + index + " .cx-message-text").html(html);
  }, 40);




  return `#btn-${index}`;
}

async function letsgetStartbuttonReParserCC(toArray, index) {
  var html = toArray;

  html += `<center>

  <br><button id='button-getStarted-${index}' class='button-getStarted cx-getStarted cx-btn cx-btn-primary i18n' style='width: 200px'>YES, LET'S GET STARTED</button>
 <button id='button-getStarted3-${index}' class='button-getStarted3 cx-getStarted3 cx-btn cx-btn-primary i18n' style='width: 200px'>NOTHING ELSE TODAY</button>
 <button id='button-getStarted4-${index}' class='button-getStarted4 cx-getStarted4 cx-btn cx-btn-primary i18n' style='width: 200px; white-space: normal;'>NEED FURTHER ASSISTANCE</button>

  </center>
  </div>`;
  await setTimeout(() => {
    $("#cx-chat-index-" + index + " .cx-message-text").html(null);
    $("#cx-chat-index-" + index + " .cx-message-text").html(html);
  }, 40);

  return `#button-getStarted-${index},#button-getStarted3-${index},#button-getStarted4-${index}`;
}



async function buttonUrlPipeSenderCC(messages, data, index, chatM) {
  await $(() => {

    var split = data.split(",");
    var message = messages.split("|");
    isUrlTransfer = true;
    noGetStartedMessage = false;

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

        $(this).val() == "YES, LET'S GET STARTED" || 
        $(this).val() == "Yes, Let's Get Started" || 
        $(this).val() == "yes, let's get started" || 


        $(this).val() == "start" && isUrlTransfer){
          isUrlTransfer = true;

       $(".cx-message-input").keyup(function (e) {
          if (e.which == 13) {
            window.open(dynamicUrl);
            isUrlTransfer = false;
              $(".cx-send").unbind('click');
              $(".cx-message-input").unbind('keyup');
       
  
            noGetStartedMessage = true;



          }
        });


      $(".cx-send").on("click", function (e) {
        window.open(dynamicUrl);
        isUrlTransfer = false;
          $(".cx-send").unbind('click');
          $(".cx-message-input").unbind('keyup');
   

        noGetStartedMessage = true;


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
          disableButton();
          resetTimer();
        }
      });


    setTimeout(() => {
      for (let k = 0; k <= message.length - 1; k++) {



        $(`.btn-${index}-${k}`).on("click", function (e) {
         // e.preventDefault()
          $(`.btn-${index}-${k}`).css("background", "#1352de");
          $(`.btn-${index}-${k}`).css("color", "#ffffff");
          $(`.btn-${index}-${k}`).css("font-weight", "600");

          if($(split[k]).text().toUpperCase().trim() == "YES, LET'S GET STARTED"){
            window.open(dynamicUrl);
            sender("YES, LET'S GET STARTED");
          } else{
            sender($(`body ${split}`)[k].value.toUpperCase());
          }
          
          disableButton();
          resetTimer();
        });




      }
    }, 80);
  });
  return await true;
}



async function letsgetStartbuttonReSenderCC(data, index) {
  await $(() => {

    var split = data.split(",");
    
    isUrlTransfer = true;
    noGetStartedMessage = false;

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

        $(this).val() == "YES, LET'S GET STARTED" || 
        $(this).val() == "Yes, Let's Get Started" || 
        $(this).val() == "yes, let's get started" || 


        $(this).val() == "start" && isUrlTransfer){
          isUrlTransfer = true;

       $(".cx-message-input").keyup(function (e) {
          if (e.which == 13) {
            window.open(dynamicUrl);
            isUrlTransfer = false;
              $(".cx-send").unbind('click');
              $(".cx-message-input").unbind('keyup');
      
  
            noGetStartedMessage = true;


          }
        });


      $(".cx-send").on("click", function (e) {
        window.open(dynamicUrl);
        isUrlTransfer = false;
          $(".cx-send").unbind('click');
          $(".cx-message-input").unbind('keyup');
     

        noGetStartedMessage = true;

        });
  
        }
      });
    }
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



         $(`body ${split[k]}`).on("click", function (e) {
         // e.preventDefault()
         $(`body ${split[k]}`).css("background", "#1352de");
         $(`body ${split[k]}`).css("color", "#ffffff");
         $(`body ${split[k]}`).css("font-weight", "600");



          if($(split[k]).text().toUpperCase().trim() == "YES, LET'S GET STARTED"){
            window.open(dynamicUrl);
            sender("YES, LET'S GET STARTED");
          } else{
            sender($(split[k]).text().toUpperCase().trim());

          }
          disableButton();
          resetTimer();
        });




      }
    }, 80);
  });
  return await true;
}

async function buttonUrlParserFA(toArray, index) {
  var html = ``;
  var split = toArray.split(",");
  var buttonBuilder = "";
  var appIndex = 0;

  await _.forEach(split, (data) => {
    let value = data.trim();

    buttonBuilder += `<button id='btn-${index}' class='button-url cx-${index} btn-${index}-${appIndex} cx-btn cx-btn-primary i18n'  value='${value}' style='width: 200px;  white-space: normal;'>${value.toUpperCase()}</button>`;
    appIndex++;
  });

  html += `<center>${buttonBuilder}</center></div>`;

  await setTimeout(() => {
    $("#cx-chat-index-" + index + " .cx-message-text").html(null);
    $("#cx-chat-index-" + index + " .cx-message-text").html(html);
  }, 40);




  return `#btn-${index}`;
}

async function buttonUrlSenderFA(messages, data, index, chatM) {
  await $(() => {

    var split = data.split(",");
    var message = messages.split(",");
    isUrlTransfer = true;

    if(isUrlTransfer) {

      $(".cx-message-input").keyup(function(e) {


        if($(this).val() == 'PROCEED' || 
           $(this).val() == 'proceed' || 
           $(this).val() == 'Proceed' && isUrlTransfer){
         isUrlTransfer = true;

       $(".cx-message-input").keyup(function (e) {
          if (e.which == 13) {
            window.open(dynamicUrl);
            isUrlTransfer = false;
              $(".cx-send").unbind('click');
              $(".cx-message-input").unbind('keyup');
  

          }
        });


      $(".cx-send").on("click", function (e) {
        window.open(dynamicUrl);
        isUrlTransfer = false;
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
          disableButton();
          resetTimer();
        }
      });


    setTimeout(() => {
      for (let k = 0; k <= message.length - 1; k++) {


        // $(`.btn-${index}-${0}`).on("click", function (e) {


        //   window.open(dynamicUrl);
        //   // setTimeout(() => {

        //   //   $(`.btn-${index}-${k}`).prop("disabled", false);
        //   //   $(`.btn-${index}-${k}`).css("pointer-events", "auto");
       
        //   //    }, 500);
        // });

        $(`.btn-${index}-${k}`).on("click", function (e) {
         // e.preventDefault()

         
         if($(split[k]).text().toUpperCase().trim() == "PROCEED") window.open(dynamicUrl);
          $(`.btn-${index}-${k}`).css("background", "#1352de");
          $(`.btn-${index}-${k}`).css("color", "#ffffff");
          $(`.btn-${index}-${k}`).css("font-weight", "600");

          // sender($(`body ${split}`)[k].value.toUpperCase());
          $(".cx-send").unbind('click');
          $(".cx-message-input").unbind('keyup');
          disableButton();
          resetTimer();
        });




      }
    }, 80);
  });
  return await true;
}