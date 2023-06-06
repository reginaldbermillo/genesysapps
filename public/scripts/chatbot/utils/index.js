function clearListCookiesIOS() {
  var cookies = document.cookie.split(";");
  for (var i = 0; i < cookies.length; i++) {
    var spcook = cookies[i].split("=");
    document.cookie = spcook[0];
  }
}

function getUrlParams() {
  const urlSearchParams = new URLSearchParams(window.location.search);
  if (urlSearchParams.has("convId")) {
    return urlSearchParams.get("convId").split("/")[0];
  } else if (urlSearchParams.has("ConvId")) {
    return urlSearchParams.get("ConvId").split("/")[0];
  } else if (urlSearchParams.has("Convid")) {
    return urlSearchParams.get("Convid").split("/")[0];
  } else if (urlSearchParams.has("convid")) {
    return urlSearchParams.get("convid").split("/")[0];
  } else {
    return "";
  }
}

function clearCookiesHandler() {
  if (/iPhone|Mac|iPad|iPod/i.test(navigator.userAgent)) {
    clearListCookiesIOS();
    try {
      cookieStore.getAll().then((cookies) =>
      cookies.forEach((cookie) => {
        cookieStore.delete(
          "_genesys.widgets.webchat.state.purecloud-v2-sockets.ConversationID"
        );
        })
      );
    } catch(e){}
    
    console.log("Mac and Iphone");
  } else {
    document.cookie =
      "_genesys.widgets.webchat.state.purecloud-v2-sockets.ConversationID=; path=/; domain=.accenture.com; max-age=0";
    console.log("Windows and Android");
    try {
        cookieStore.getAll().then((cookies) =>
        cookies.forEach((cookie) => {
          cookieStore.delete(
            "_genesys.widgets.webchat.state.purecloud-v2-sockets.ConversationID"
          );
          cookieStore.delete(
            "_genesys.widgets.webchat.state.purecloud-v2-sockets.LastMsgId"
          );
          cookieStore.delete(
            "_genesys.widgets.webchat.state.purecloud-v2-sockets.JWtoken"
          );
        })
      );
    } catch(e){}
    
  }
}

function reportWindowSize(event) {
  if (
    /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator.userAgent
    )
  ) {
    // true for mobile device
    $(".cx-webchat div.cx-input-container").css("position", "fixed");
    $(".cx-webchat div.cx-input-container").css("bottom", "-20px");
  }
}

function formatPhoneNumber(val) {
  let regexPattern = /^\d{3}-\d{3}-\d{4}$/gm;
}

function formatDepartureDate(val) {
  let month = val.split("-")[1];
  let day = val.split("-")[2];
  let year = val.split("-")[0];
  return val.includes("-") ? `${month}/${day}/${year}` : "";
}

function textAreaAutoResize() {
  setTimeout(() => {
    $(".cx-transcript textarea").on("input", function () {
      this.style.height = "auto";
      this.style.height = this.scrollHeight + "px";
    });
  }, 1000);
}

function windowClose() {
  window.open("", "_parent", "");
  window.open("", "_self").close();
}

function surveyButton() {
  console.log(conversation_id, 'id survey');
  //let dynamicSurveyUrl = `https://surveydynamix.com/webhook/web_survey/${conversation_id}`
  let dynamicSurveyUrl =
    "https://surveydynamix.com/webhook/web_survey/362feaa0-8ffe-11ed-93f1-356b1d765c30";
  let dynamicSurveyUrlAgent =
    "https://surveydynamix.com/webhook/web_survey/274c5880-9723-11ed-a42c-efe2f3dcbe02";

  // Lets remove the conversation ID from local storage, in case the customer starts a new webchat
  localStorage.removeItem("sdx_genesys_conversation_id");
  // Let's close the survey 3 seconds after it is completed
  SDXSurvey.surveyCompleted(function () {
    setTimeout(function () {
      SDXSurvey.closeSurvey();
    }, 3000);
  });
  setTimeout(() => {
    // Thank you! As a last step, may I request you to please rate your experience using survey option below.
    $(`body .cx-transcript`).append(
      `<center><div class='survey-title'>Thank you! Your feedback will be highly valuable. Would you like to take a short survey?<br><button id='button-survey' class='button-survey-overlay cx-survey cx-btn cx-btn-primary i18n' style='width: 200px; position:relative; left: 22px;'>YES</button><br><button id='button-survey-maybe-later' class='button-survey-overlay button-survey-maybe-later cx-survey cx-btn cx-btn-primary i18n' style='width: 200px; position:relative; left: 22px;'>MAYBE LATER</button><center></div><br><br>`
    );
    $(`body .cx-transcript`).scrollTop(9999999999);

    $("#button-survey").on("click", function (e) {
      $(`body .button-survey-overlay`).prop("disabled", true);
      $(`body .button-survey-overlay`).css("pointer-events", "none");

      $(`#button-survey`).prop("disabled", true);
      $(`#button-survey`).css("pointer-events", "none");
      $(`#button-survey`).css("background", "#1352de");
      $(`#button-survey`).css("color", "#ffffff");
      $(`#button-survey`).css("font-weight", "600");
      openSurvey();
      // if (agentConnectTrue == true) {
      //   window.open(dynamicSurveyUrlAgent);
      // } else {
      //   window.open(dynamicSurveyUrl);
      // }
      
    });

    $("#button-survey-maybe-later").on("click", function (e) {
      $(`body .button-survey-overlay`).prop("disabled", true);
      $(`body .button-survey-overlay`).css("pointer-events", "none");
      $(`#button-survey-maybe-later`).prop("disabled", true);
      $(`#button-survey-maybe-later`).css("pointer-events", "none");
      $(`#button-survey-maybe-later`).css("background", "#1352de");
      $(`#button-survey-maybe-later`).css("color", "#ffffff");
      $(`#button-survey-maybe-later`).css("font-weight", "600");
      
      $(`body .cx-transcript`).append(`<center><div class='survey-title'>Thank you for reaching out. Hope you have a nice day.</center>`)
      $(`body .cx-transcript`).scrollTop(9999999999);
    });

    function openSurvey() {
      if (agentConnectTrue == true) {
        if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
          // true for mobile device
          $(`body .cx-widget`).hide(1000);
          $(`body .cx-widget`).prop("disabled", true);
          $(`body .cx-widget`).css("pointer-events", "none");
          // setTimeout(function() {
          //  $(`body .cx-widget`).show();

          //            }, 1000);

          //  setTimeout(function() {
          //   $("iframe").contents().find("a:first").click();
          //   $("iframe")[0].modal("show");
          //   $("iframe")[0].click();
          //                   }, 3000);
        } else {
          // false for not mobile device
          // document.write("not mobile device");
        }
        
        SDXSurvey.showSurvey({
          survey_url: agentConnectTrue
            ? dynamicSurveyUrlAgent
            : dynamicSurveyUrl,
          config: {
            location: "bottom-left",
          },
          survey_attributes: {
            respondent_language: "en-US",
            external_ref: conversation_id,
          },
        });
      } else {
        if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
          // true for mobile device
          $(`body .cx-widget`).hide(1000);
          $(`body .cx-widget`).prop("disabled", true);
          $(`body .cx-widget`).css("pointer-events", "none");
          // setTimeout(function() {
          //  $(`body .cx-widget`).show();

          // }, 1000);

          //  setTimeout(function() {
          //   $("iframe").contents().find("a:first").click();
          //   $("iframe")[0].modal("show");

          //   $("iframe")[0].click();
          //     }, 3000);
        } else {
          // false for not mobile device
          // document.write("not mobile device");
        }
        
        SDXSurvey.showSurvey({
          survey_url: agentConnectTrue
            ? dynamicSurveyUrlAgent
            : dynamicSurveyUrl,
          config: {
            location: "bottom-left",
          },
          survey_attributes: {
            respondent_language: "en-US",
            external_ref: conversation_id,
          },
        });
      }
    }
  }, 1000);
}

function addWindowControl() {
    $(".cx-button-group.cx-buttons-window-control").html(null);
    let htmlTag = `<div style="z-index: 99999;" class="customized-window-control">
    
    <div style="display: block; cursor: pointer; position: relative; top: 0px; left: 60%;" class="icon-close">
      <img width="16" height="16" src="../../styles/img/Close.png" />
    </div>
  </div>`;
  
    $(`body .cx-wrapper`).append(
        `<div id='confirmExitId' class='confirmExit'>CONFIRM EXIT?<div>
        <div id='exitTextId' class='exitText'>Please note: The chat history will be cleared, once you exit this chat.<div>
        <br><div id='exitTextId2' class='exitText'>Are you sure you want to exit? <Yes> <No><div>
        <button id='button-confirmExitIdYes' class='button-confirmExitIdYes cx-confirmExitIdYes cx-btn cx-btn-primary i18n' style="width: 130px; position: relative;">YES</button>
        <button id='button-confirmExitIdNo' class='button-confirmExitIdNo cx-confirmExitIdNo cx-btn cx-btn-primary i18n' style="width: 130px; position: relative;">NO</button>`
      );
  
      claimNumberInfoWindow()
  
    setTimeout(function () {
      $(".cx-button-group.cx-buttons-window-control").append(htmlTag);
      $("div.icon-close").on("keyup click", function (e) {
     
    if (!chatEnded) {
      $(`.claim-info-window`).hide()
      $(".cx-smokescreen").show();
      $(".cx-alert.cx-chat-end").show();
            hideAdaptivecard = true;
    $(`#button-confirmExitIdNo`).prop("disabled", false);
    $(`#button-confirmExitIdYes`).prop("disabled", false);
      $(`#button-confirmExitIdNo`).css("pointer-events", "auto");
    $(`#button-confirmExitIdYes`).css("pointer-events", "auto");
  
  
    }else{
         customPlugin.command("WebChat.endChat", getAdvancedConfig());
    }
  
      });
  
    }, 800);
  
      $(`#button-confirmExitIdYes`).click(() => {
        customPlugin.command("WebChat.endChat", getAdvancedConfig());
        $(".cx-smokescreen").hide();
        $(".cx-alert.cx-chat-end").hide();
        $(`.icon-close`).css("display", "none");
  
           });
  
          $(`#button-confirmExitIdNo`).click(() => {
            $(".cx-smokescreen").hide();
           $(".cx-alert.cx-chat-end").hide();
           });
  }
  
  function claimNumberInfoWindow(){
    $(`body .cx-transcript`).append(
      `<div class='claim-info-window '> 
        <div class='claim-info-text-boarder'>
          <h6 class='claim-info-header'>How to find your claim number?</h6><span class="claim-info-close"><i class="fa-solid fa-xmark"></i></span>
            <p class="claim-info-text">Your claim number is a number with UC prefix that is shared with you at the time of claim notification. Please note that it’s different from your policy number.</p>
            <p class="claim-info-text">If your claim was created online, you would have received this email from <a style="color: #1352de! important;  font-weight: bolder!important;"> AIG </a> with your claim number mentioned in the subject of the email. If your claim  was created via phone, it will be in the postal mail letter.</p>
            <p class="claim-info-text">Here is an illustration on how to locate your claim number in your email.</p>
            <img class="screenShotClaim" src="../../styles/img/screenshotClaim.png">
            <p class="claim-info-disclaimer">[Please note that in case you are unable to find this email, make sure to search the spam or junk folder in your mailbox]</p>
          <span class="claim-info-close2"><i class="fa-solid fa-xmark"></i></span>
        </div>
      <div>`
   
    );
    setTimeout(function(){
      $(".claim-info-close").click(() => {
        $(`.claim-info-window`).hide();
        $(".cx-smokescreen").hide();
        $('.cx-webchat div.cx-input-container').css("z-index", 999999);
      })
      $(".claim-info-close2").click(() => {
        $(`.claim-info-window`).hide();
        $(".cx-smokescreen").hide();
        $('.cx-webchat div.cx-input-container').css("z-index", 999999);
        //document.querySelector('body .cx-transcript').style.setProperty("overflow-y", "scroll", "important");
      })
  
     $(".screenShotClaim").on('click', function(){
    })
    },800)
  }
  
  function inProgress() {
    if (!chatEnded) {
      $(`body .cx-subtitle`).append(
        "<div class='subtitle' style='left: 14px; top: -3px; position: relative; display: block;'>- &nbsp; IN PROGRESS <div>"
      );
      $("body .cx-subtitle").hide();
    }
  }