async function sender(value) {
  $(`#cx_input`).focus();
  $(".cx-send").trigger('click', $(`#cx_input`).val(value));
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
          $(`body ${split[k]}`).css("font-weight", "600");
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
          $(`body ${split[k]}`).css("font-weight", "600");
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
          $(`body ${split[k]}`).css("font-weight", "600");
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
          $(`body ${split[k]}`).css("font-weight", "600");
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
          $(`body ${split[k]}`).css("font-weight", "600");
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
          $(`body ${split[k]}`).css("font-weight", "600");
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

    buttonBuilder += `<button id='btn-${index}' class='button-${index} cx-${index} btn-${index}-${appIndex} cx-btn cx-btn-primary i18n' value="${value}" style='width: 200px; white-space: normal;'>${value.toUpperCase()}</button>`;
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
          $(`.btn-${index}-${k}`).css("font-weight", "600");
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
          $(`.btn-${index}-${k}`).css("font-weight", "600");
          sender($(`body ${split}`)[k].value.toUpperCase());

          disableButton();
        });
      }
    }, 80);
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


        if($(this).val() == 'continue' || 
          //  $(this).val() == 'GET STARTED' || 
          //  $(this).val() == 'GET started' ||
          //  $(this).val() == 'get STARTED' || 
          //  $(this).val() == 'Get STARTED' ||
          //  $(this).val() == "Get started" || 
          //  $(this).val() == "Get Started" || 
          //  $(this).val() == "START" || 
          //  $(this).val() == "STARTED" || 
          //  $(this).val() == "started" || 
          //  $(this).val() == "start" || 
          //  $(this).val() == "Get Start" || 
          $(this).val() == "CONTINUE" || 
           $(this).val() == "Continue" && isUrlTransfer){
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

        // if push through
        // fifteenseconds = setTimeout(() => {
          
        //   sender('CONTINUE');
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
            $(`#button-getStarted-${index}`).prop("disabled", true);
            $(`#button-getStarted-${index}`).css("pointer-events", "none");
            $(`#button-getStarted-${index}`).css("background", "#1352de");
            $(`#button-getStarted-${index}`).css("color", "#ffffff");
          }, 500);
         }
         setTimeout(() => {

          $(`#button-getStarted-${index}`).prop("disabled", true);
            $(`#button-getStarted-${index}`).css("pointer-events", "none");
            $(`#button-getStarted-${index}`).css("background", "#1352de");
            $(`#button-getStarted-${index}`).css("color", "#ffffff");
     
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
              $(`#button-getStarted-${index}`).prop("disabled", true);
              $(`#button-getStarted-${index}`).css("pointer-events", "none");
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

        // if push through
        // fifteensecondsReselect = setTimeout(() => {
        //   sender('GET STARTED');
        //   hideAdaptivecard = true;
        //   noGetStartedMessage = true;
        //   if(!noGetStartedMessage){
        //     $(".cx-send").unbind('click');
        //     $(".cx-message-input").unbind('keyup');
        //   }

        // }, 15000);

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
            $(`#button-getStarted-${index}`).prop("disabled", true);
            $(`#button-getStarted-${index}`).css("pointer-events", "none");
            $(`#button-getStarted-${index}`).css("background", "#1352de");
            $(`#button-getStarted-${index}`).css("color", "#ffffff");
          }, 1000);
         }

        });
      }
    }, 50);
  });
  return await true;
}


async function FAbuttonUrlParser(toArray, index) {
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

async function FAbuttonUrlSender(messages, data, index) {
  await $(() => {

    var split = data.split(",");
    var message = messages.split(",");
    isUrlTransfer = true;

    if(isUrlTransfer) {

      $(".cx-message-input").keyup(function(e) {
        if($(this).val() == 'CONTINUE' || 
           $(this).val() == 'Continue' || 
           $(this).val() == 'continue' ||
           $(this).val() == 'okay' || 
           $(this).val() == 'Okay' ||
           $(this).val() == "OKAY" || 
           $(this).val() == "YES" || 
           $(this).val() == "Yes" || 
           $(this).val() == "yes" || 
           $(this).val() == "Proceed" || 
           $(this).val() == "proceed" || 
           $(this).val() == "PROCEED" && isUrlTransfer){
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
      // for (let k = 0; k <= message.length - 1; k++) {


        // $(`.btn-${index}-${0}`).on("click", function (e) {


        //   window.open(dynamicUrl);
        //   // setTimeout(() => {

        //   //   $(`.btn-${index}-${k}`).prop("disabled", false);
        //   //   $(`.btn-${index}-${k}`).css("pointer-events", "auto");
       
        //   //    }, 500);
        // });

        // if push through
        // fifteenseconds = setTimeout(() => {
          
        //   sender('CONTINUE');
        //   hideAdaptivecard = true;
        //   if(!noGetStartedMessage){
        //     $(".cx-send").unbind('click');
        //     $(".cx-message-input").unbind('keyup');
        //   }
        //   noGetStartedMessage = true;

        //   setTimeout(() => {

        //     $(`.btn-${index}-0`).prop("disabled", false);
        //     $(`.btn-${index}-0`).css("pointer-events", "auto");
       
        //      }, 800);
        // }, 15000);

        $(`body ${split[0]}`).on("click", function (e) {
         // e.preventDefault()
          clearTimeout(fifteenseconds)
         
         if($(split[0]).text().toUpperCase().trim() == "CONTINUE") window.open(dynamicUrl);
          $(`body ${split[0]}`).css("background", "#1352de");
          $(`body ${split[0]}`).css("color", "#ffffff");
          $(`body ${split[0]}`).css("font-weight", "600");

          // sender('CONTINUE');
          $(".cx-send").unbind('click');
          $(".cx-message-input").unbind('keyup');
          disableButton();
          resetTimer();
        });
      // }
    }, 80);
  });
  return await true;
}

async function FAbuttonUrlReSender(messages, data, index) {
  await $(() => {

    var split = data.split(",");
    var message = messages.split(",");
    isUrlTransfer = true;

    if(isUrlTransfer) {

      $(".cx-message-input").keyup(function(e) {
        if($(this).val() == 'CONTINUE' || 
           $(this).val() == 'Continue' || 
           $(this).val() == 'continue' ||
           $(this).val() == 'okay' || 
           $(this).val() == 'Okay' ||
           $(this).val() == "OKAY" || 
           $(this).val() == "YES" || 
           $(this).val() == "Yes" || 
           $(this).val() == "yes" || 
           $(this).val() == "Proceed" || 
           $(this).val() == "proceed" || 
           $(this).val() == "PROCEED" && isUrlTransfer){
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
      // for (let k = 0; k <= message.length - 1; k++) {


        // $(`.btn-${index}-${0}`).on("click", function (e) {


        //   window.open(dynamicUrl);
        //   // setTimeout(() => {

        //   //   $(`.btn-${index}-${k}`).prop("disabled", false);
        //   //   $(`.btn-${index}-${k}`).css("pointer-events", "auto");
       
        //   //    }, 500);
        // });

        // if push through
        // fifteenseconds = setTimeout(() => {
          
        //   sender('CONTINUE');
        //   hideAdaptivecard = true;
        //   if(!noGetStartedMessage){
        //     $(".cx-send").unbind('click');
        //     $(".cx-message-input").unbind('keyup');
        //   }
        //   noGetStartedMessage = true;

        //   setTimeout(() => {

        //     $(`.btn-${index}-0`).prop("disabled", false);
        //     $(`.btn-${index}-0`).css("pointer-events", "auto");
       
        //      }, 800);
        // }, 15000);

        $(`body ${split[0]}`).on("click", function (e) {
         // e.preventDefault()
          clearTimeout(fifteenseconds)
         
         if($(split[0]).text().toUpperCase().trim() == "CONTINUE") window.open(dynamicUrl);
          $(`body ${split[0]}`).css("background", "#1352de");
          $(`body ${split[0]}`).css("color", "#ffffff");
          $(`body ${split[0]}`).css("font-weight", "600");

          sender('CONTINUE');
          $(".cx-send").unbind('click');
          $(".cx-message-input").unbind('keyup');
          disableButton();
          resetTimer();
        });




      // }
    }, 80);
  });
  return await true;
}


async function FAbuttonUrlParserReselect(toArray, index) {
  var html = toArray;

  html += `<center>

  <br><button id='button-reupload-${index}' class='btn-${index}-0 button-reupload cx-reupload cx-btn cx-btn-primary i18n' style='width: 200px'>CONTINUE</button>
  </center>
  </div>`;
  await setTimeout(() => {
    $("#cx-chat-index-" + index + " .cx-message-text").html(null);
    $("#cx-chat-index-" + index + " .cx-message-text").html(html);
  }, 40);

  return `#button-reupload-${index}`;
}

async function FAbuttonUrlSenderReselect(data, radio) {
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
         
          sender("CONTINUE");
        if($(split[k]).text().toUpperCase().trim() == "CONTINUE") window.open(dynamicUrl);resetTimer();

          hideAdaptivecard = true;

        });
      }
    }, 50);
  });
  return await true;
}

async function dynamicButtonParserReselect(toArray, index, header) {
  var html = ``;
  var split = toArray.includes('|') ? toArray.split("|") : toArray.split(",");
  var buttonBuilder = "";
  var appIndex = 0;

  await _.forEach(split, (data) => {
    let value = data.trim();
    buttonBuilder += `<button id='btn-${index}' class='button-${index} cx-${index} btn-${index}-${appIndex} cx-btn cx-btn-primary i18n'  value="${value}" style='width: 200px; white-space: normal;'>${value.toUpperCase()}</button>`;
    appIndex++;
  });

  html += `${header}<br><br><center>${buttonBuilder}</center></div>`;

  await setTimeout(() => {
    $("#cx-chat-index-" + index + " .cx-message-text").html(null);
    $("#cx-chat-index-" + index + " .cx-message-text").html(html);
  }, 40);

  return `#btn-${index}`;
}


async function dynamicButtonSenderReselect(messages, data, index) {
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
          sender($(this).val());
          disableButton();
        });
      }
    }, 80);
  });
  return await true;
}