var deleteTimers;
var firstLoad = true;
var typing = false;
var chatEnded = false;
let timeOutChat = 1;
var hideAdaptivecard = false;
var showTimeout = false;
var numbersOnly = false;
let plugin = CXBus.registerPlugin("TestExtension");
var firstLoadOnlyOnce = false;
var botTime;
var convid;
let submitBtn1, submitBtn2;
var letDisableButton = true;
let showResponse = false;
let dynamicUrl = '';
let fifteensecondsReselect;
let fifteenseconds;
let isUrlTransfer = false;
let isUrlUpload = false;
let yesPleaseUpload = false;
let clickedSendBtn = false;
let findClaimResponse;
let noGetStartedMessage;
let policyName = '';
let policyNumber = '';
let policyEmail = ''
let policyDeparture = ''
let policyOrigDates1 = ''
let policyOrigDates2 = ''
let agentConnectTrue;


if (!window._genesys) window._genesys = {};
if (!window._genesys.widgets) window._genesys.widgets = {};
if (!window._genesys.widgets.extensions)
  window._genesys.widgets.extensions = {};

const urlSearchParams = new URLSearchParams(window.location.search);
if (urlSearchParams.has("convid") || urlSearchParams.has("Convid")) {
  convid = urlSearchParams.get('convid')? urlSearchParams.get("convid").split("/")[0] : urlSearchParams.get("Convid").split("/")[0];
} else {
  convid = "";
}

window._genesys = {
  widgets: {
    main: {},
    webchat: {
         uploadsEnabled: 'true',
         maxMessageLength: 500,
      transport: {
        "type": "purecloud-v2-sockets",
        "dataURL": dataUrl,
        "deploymentKey": deploymentKey,
        "orgGuid": orgGuid,
        // "deploymentKey": "1534a27b-a5fe-4aaf-a87b-8cac8feda922", //UAT
        "interactionData": {
          "routing": {
            "targetType": "QUEUE",
            "targetAddress": queueName,
            "priority": 2
          },
        },
      },
      userData: {
        convid: getUrlParams(),
      },
    },
  },
}

console.log("%cFrontier Version " + widgetversion, "color: Blue;");
// console.log = function(){};
console.log('convid: ', getUrlParams())

plugin.subscribe("WebChatService.messageReceived", function (e) {
  for (var i = 0; i < e.data.messages.length; i++) {
    var messages = e.data.messages[i].text;
    $('.cx-message.cx-system[data-message="Chat Started"]').css('visibility', 'visible') 
    console.log(messages);
    if (
      e.data.messages[i].text != undefined &&
      e.data.messages[i].text != "" &&
      !e.data.messages[i].text.includes("Voice Conversation ID")
    ) 

    if (typeof messages === "string" && messages.includes("#welcome")) {
      const removeIndex = e.data.messages[i].index;
      setTimeout(() => {
        $("#cx-chat-index-" + removeIndex + " .cx-message-text").html(null);
        let saysomething = ` `;
        $("#cx-chat-index-" + removeIndex + " .cx-message-text").html(saysomething);
        $("#cx-chat-index-" + removeIndex + "").remove();
      }, 40);
    }

    if (messages && e.data.messages[i].from.type == "Bot") {
      // $(`body .typing`).remove();
      camTyping();
      // clearTimeout(botTime)
      botTime = setTimeout(() => {
        $(`body .typing`).remove();
      }, 800);
    } else {
      // botTime = setTimeout(() => {camTyping()}, 500);
      $(`body .typing`).remove();
      clearTimeout(botTime);
      if (showTimeout) {
        if (messages == undefined) {
          setTimeout(() => {
            timeOutChat = 0;
            clearInterval(deleteTimers);
          }, 3000);
        }
      }
    }
    if(typeof messages == 'string' && e.data.messages[i].from.type == 'Client' && messages.length < 5){
      const index = e.data.messages[i].index;
      setTimeout(() => {
        $("#cx-chat-index-" + index + " .cx-message-text").css('text-align', 'center');
      }, 40);
    }
    switch (messages) {
      case "👍,👎":
        var oneFrame = e.data.messages[i].index;

        setTimeout(() => {
          $(
            "#cx-chat-index-" + oneFrame + ".cx-message.cx-them .cx-bubble"
          ).css("cssText", "margin-top: -23px !important");
        }, 30);
        likeButtonParser(messages, e.data.messages[i].index).then((data) => {
          likeButtonSender(data).then(() => {});
        });

        break;
        case "LIKE":
          const indexLike = e.data.messages[i].index;
          setTimeout(() => {
            $("#cx-chat-index-" + indexLike + " .cx-message-text").html(null);
            let saysomething = ` `;
            $("#cx-chat-index-" + indexLike + " .cx-message-text").html(
              saysomething
            );
            $("#cx-chat-index-" + indexLike + "").remove();
          }, 30);
  
          break;
  
        case "DISLIKE":
          const indexdisLike = e.data.messages[i].index;
          setTimeout(() => {
            $("#cx-chat-index-" + indexdisLike + " .cx-message-text").html(null);
            let saysomething = ` `;
            $("#cx-chat-index-" + indexdisLike + " .cx-message-text").html(saysomething);
            $("#cx-chat-index-" + indexdisLike + "").remove();
            // $("div").remove(".cx-message-group");
          }, 30);
          break;
      default:
        
        if (hideAdaptivecard) {
          var hideAdaptive = e.data.messages[i].index;
          // var hideAdaptive = e.data.messages[i].index;
          setTimeout(() => {
            // $("#cx-chat-index-" + hideAdaptive + "").remove();
            $("#cx-chat-index-" + hideAdaptive + " .cx-bubble").remove();
            $("#cx-chat-index-" + hideAdaptive + "").remove();
          }, 20);
          hideAdaptivecard = false;
        }

        if (showResponse) {
          var showIndex = e.data.messages[i].index;
          setTimeout(() => {
            // $("#cx-chat-index-" + hideAdaptive + "").remove();
            $("#cx-chat-index-" + showIndex + " .cx-bubble .cx-message-text").html("SUBMIT");
            // $("#cx-chat-index-" + hideAdaptive + "").remove();
          }, 20);
          showResponse = false;
        }
        if (findClaimResponse) {
          var showIndex = e.data.messages[i].index;
          setTimeout(() => {
            // $("#cx-chat-index-" + hideAdaptive + "").remove();
            $("#cx-chat-index-" + showIndex + " .cx-bubble .cx-message-text").html("SUBMIT");
            // $("#cx-chat-index-" + hideAdaptive + "").remove();
          }, 20);
          findClaimResponse = false;
        }
    
        if (typeof messages === "string" && messages.includes("#sessiontimeout")) {
          if (messages && e.data.messages[i].from.type == "Bot") {      
            let split = messages.split("#")[0];
            let sessiontimeoutIndex = e.data.messages[i].index;
            setTimeout(() => {
              $("#cx-chat-index-" + sessiontimeoutIndex + " .cx-message-text").html(null);
              let saysomething = split;
              $("#cx-chat-index-" + sessiontimeoutIndex + " .cx-message-text").html(saysomething);
            }, 40);
            // $('.cx-message.cx-system').css('visibility', 'visible') 

            // $('.cx-message.cx-system[data-message="Chat Started"]').css( { transition: "transform 0.5s",
            //       transform:  "rotate(360deg)" } );
            // $('.cx-message.cx-system[data-message="Chat Started"]').toggleClass("expireIcon");


          }
        }

      //   if (
      //     typeof messages === "string" &&
      //     messages.includes("#pleaseVisit")
      //     ) {
      //       // $('.cx-message.cx-system').css('visibility', 'visible') 
      //       // $('.cx-message.cx-system[data-message="Chat Started"]').toggleClass("notExpireIcon");
      

      //     let split = messages.split("#")[0];
      //     let visitUrlIndex = e.data.messages[i].index;
      //     document.documentElement.setAttribute('data-source', 'AIG');

      //     setTimeout(() => {
      //     $("#cx-chat-index-" + visitUrlIndex + " .cx-message-text").html(
      //     null
      //     );
      //     let saysomething = split;
      //     $("#cx-chat-index-" + visitUrlIndex + " .cx-message-text").html(
      //     saysomething
      //     );
      //     }, 40);
          
      //     }
      //     if (typeof messages === "string" && messages.includes("#newline")) {
      //         // $('.cx-message.cx-system').css('visibility', 'visible') 
      //         // $('.cx-message.cx-system[data-message="Chat Started"]').toggleClass("notExpireIcon");
        
  
      //       let split = messages.split("#")[0];
      //       let visitUrlIndex = e.data.messages[i].index;
      //       setTimeout(() => {
      //       $("#cx-chat-index-" + visitUrlIndex + " .cx-message-text").html(
      //       null
      //       );
      //       let saysomething = split;
      //       $("#cx-chat-index-" + visitUrlIndex + " .cx-message-text").html(
      //       saysomething
      //       );
      //       }, 40);
            
      //       }
        
      //     if (typeof messages === "string" && messages.includes("#clientClaimStatus")) {
      //       let split = messages.split("#")[0];
      //       let status = split.split(":")[1].split("Next")[0];
      //       let checkOpenDone = status.includes("Claim Received") || status.includes("claim received") || status.includes("CLAIM RECEIVED") || status.includes("Claim received") || status.includes("claim Received") ?  true : false
      //       let checkProcessDone = status.includes("New") || status.includes("NEW") || status.includes("new") || status.includes("Open") || status.includes("open") || status.includes("OPEN") || status.includes("Claim Reviewed") || status.includes("CLAIM REVIEWED") || status.includes("claim reviewed") || status.includes("claim Reviewed") || status.includes("Claim reviewed") ? true : false
      //       let checkCompletedDone = status.includes("Claim Finalized") || status.includes("claim finalized") || status.includes("Claim finalized") || status.includes("claim Finalized") || status.includes("CLAIM FINALIZED") ? true : false
      //       let clientClaimStatusIndex = e.data.messages[i].index;
      //       setTimeout(() => {
      //       $("#cx-chat-index-" + clientClaimStatusIndex + " .cx-message-text").html(
      //       null
      //       );
      //       let html = `${split.split(':')[0]}:<br><ol id="progress-status">
      //                   <li class="progress-items ${checkOpenDone ? 'done' : checkProcessDone ? 'done' : checkCompletedDone ? 'done' : 'todo'}">
      //                     <i class="far fa-file fa-3x"></i>
      //                     <p>&nbsp;&nbsp;&nbsp;Open&nbsp;&nbsp;&nbsp;</p>
      //                     <div class="progress-circle"></div>
      //                   </li>
      //                   <li class="progress-items ${checkProcessDone ? 'done' : checkCompletedDone ? 'done' : 'todo'}">
      //                     <i class="fa-solid fa-spinner fa-3x"></i>
      //                     <p>Under Review</p>
      //                     <div class="progress-circle"></div>
      //                   </li>
      //                   <li class="progress-items ${checkCompletedDone ? 'done' : 'todo'}">
      //                     <i class="fa-solid fa-check-to-slot fa-3x"></i>
      //                     <p>Closed</p>
      //                     <div class="progress-circle"></div>
      //                   </li>
                        
      //                 </ol><span class="progress-line"></span>${split.split(':')[1]}`;
      //       let saysomething = html;
      //       $("#cx-chat-index-" + clientClaimStatusIndex + " .cx-message-text").html(
      //       saysomething
      //       );
      //       }, 40);
            
      //       }

      //   if (
      //     typeof messages === "string" &&
      //     messages.includes("Voice Conversation ID")
      //   ) {
      //     var hideAdaptive = e.data.messages[i].index;
      //     setTimeout(() => {
      //       $("#cx-chat-index-" + hideAdaptive + " .cx-message-text").html(
      //         null
      //       );
      //       let saysomething = ` `;
      //       $("#cx-chat-index-" + hideAdaptive + " .cx-message-text").html(
      //         saysomething
      //       );
      //       $("#cx-chat-index-" + hideAdaptive + "").remove();
      //       // $("div").remove(".cx-message-group");
      //     }, 30);
      //     hideAdaptivecard = false;

      //   }

      //   if (
      //     typeof messages === "string" &&
      //     messages.includes("CLAIMSCC")
      //   ) {
      //     var hideAdaptive = e.data.messages[i].index;
      //     setTimeout(() => {
      //       $("#cx-chat-index-" + hideAdaptive + " .cx-message-text").html(
      //         null
      //       );
      //       let saysomething = ` `;
      //       $("#cx-chat-index-" + hideAdaptive + " .cx-message-text").html(
      //         saysomething
      //       );
      //       $("#cx-chat-index-" + hideAdaptive + "").remove();
      //       // $("div").remove(".cx-message-group");
      //     }, 30);
      //     hideAdaptivecard = false;

      //   }


      
      //   if (typeof messages === "string" && messages.includes("#improvementmsg")) {
      //     let split = messages.split("#")[0];
      //    let areasDynamicindex = e.data.messages[i].index;

      //     setTimeout(() => {
      //       $("#cx-chat-index-" + areasDynamicindex + " .cx-message-text").html(
      //         null
      //       );
      //       let saysomething = split;
      //       $("#cx-chat-index-" + areasDynamicindex + " .cx-message-text").html(
      //         saysomething
      //       );
      //     }, 30);
      //     inputTextAreaofImprovementParser(e.data.messages[i].index).then(
      //       (data) => {
      //         inputTextHidevalueSender(data).then(() => {});
      //       }
      //     );

      //     // textAreaAutoResize();
      //   }


 
      //   if (
      //     typeof messages === "string" &&
      //     messages.includes("#chatclosedhours")
      //   ) {
      //     var hideAdaptive = e.data.messages[i].index;
      //     setTimeout(() => {
      //       $("#cx-chat-index-" + hideAdaptive + " .cx-message-text").html(
      //         null
      //       );
      //       const match = e.data.messages.filter(e => e.type === 'Message' && e.text.includes('Sorry') || e.text.includes('Okay'))
      //       let saysomething = match[0].text.split('#')[0];
      //       // let sundaySched = saysomething.split("Sunday");
      //       // let html = `${saysomething.split("Monday")[0]}<br /><br />Monday ${saysomething.split("Monday")[1]}`
      //       $("#cx-chat-index-" + hideAdaptive + " .cx-message-text").html(
      //         saysomething
      //       );
      //       $("#cx-chat-index-" + hideAdaptive + " .cx-message-text").parent().parent().removeClass();
      //       $("#cx-chat-index-" + hideAdaptive + " .cx-message-text").parent().parent().addClass('cx-message cx-participant cx-them cx-Bot cx-bot');
      //       // $("#cx-chat-index-" + hideAdaptive + " .cx-message-text").parent().prev().prev().remove();
      //       // $("#cx-chat-index-" + hideAdaptive + "").remove();
      //       // $("div").remove(".cx-message-group");
      //     }, 30);
      //     hideAdaptivecard = false;
      //   }

      //   if (
      //     typeof messages === "string" &&
      //     messages.includes("Sorry, an error occurred")
      //   ) {
      //     showTimeout = false;
      //     chatEnded = true;
      //     setTimeout(() => {
      //       timeOutChat = 0;
      //       clearInterval(deleteTimers);
      //     }, 5000);
      //   }

      //   if (
      //     typeof messages === "string" &&
      //     messages.includes("Please try the following before continuing")
      //   ) {
      //     var splitMessage = messages.split("\n\n");
      //     renderList(splitMessage, e.data.messages[i].index);
      //   }

      //   if (
      //     typeof messages === "string" &&
      //     messages.includes("Am I chatting with")
      //   ) {
      //     showTimeout = true;
      //     $(`body .typing`).remove();

      //    if(/Android|iPhone|Mac|iPad|iPod/i.test(navigator.userAgent)){

      //       document.querySelector('body .cx-transcript').style.setProperty("height", "50vh", "important");

      //       document.querySelector('body .cx-transcript').style.setProperty("max-height", "400px", "important");

      //     }
      //   }
      //   if (
      //     typeof messages === "string" &&
      //     messages.includes("Travel Guard's Virtual Assistant")
      //   ) {
      //     showTimeout = true;
      //     $(`body .typing`).remove();
      //    if(/Android|iPhone|Mac|iPad|iPod/i.test(navigator.userAgent)){

      //     }
      //     if(/iPhone|Mac|iPad|iPod/i.test(navigator.userAgent)){
      //       document.querySelector('body .cx-transcript').style.setProperty("height", "65vh", "important");

      //       document.querySelector('body .cx-transcript').style.setProperty("max-height", "480px", "important");

      //     }else if (/Android/i.test(navigator.userAgent)){
      //       document.querySelector('body .cx-transcript').style.setProperty("height", "62vh", "important");
      //       document.querySelector('body .cx-transcript').style.setProperty("max-height", "440px", "important");
      //     }
      //   }

      //   if (
      //     typeof messages === "string" &&
      //     messages.includes("AIG's Virtual Assistant")
      //   ) {
      //     showTimeout = true;
      //     $(`body .typing`).remove();
      //    if(/Android|iPhone|Mac|iPad|iPod/i.test(navigator.userAgent)){



      //     }
      //     if(/iPhone|Mac|iPad|iPod/i.test(navigator.userAgent)){
      //       document.querySelector('body .cx-transcript').style.setProperty("height", "65vh", "important");
      //       document.querySelector('body .cx-transcript').style.setProperty("max-height", "480px", "important");
      //     }else if (/Android/i.test(navigator.userAgent)){
      //       document.querySelector('body .cx-transcript').style.setProperty("height", "60vh", "important");
      //       document.querySelector('body .cx-transcript').style.setProperty("max-height", "440px", "important");
      //     }
      //   }

      //   if (typeof messages === "string" && messages.includes("Sorry, something went wrong. Would you like to connect")) {
      //     showTimeout = true;
      //     $(`body .typing`).remove();
      //     if (firstLoad) {

      //       console.log('Sorry, something went wrong')
      //    if(/Android|iPhone|Mac|iPad|iPod/i.test(navigator.userAgent)){
      //       document.querySelector('body .cx-transcript').style.setProperty("height", "43vh", "important");
      //       document.querySelector('body .cx-transcript').style.setProperty("max-height", "345px", "important");
      //     }
      //   }

      //   }

      //   if (
      //     typeof messages === "string" &&
      //     messages.includes("Thank you for reaching out today.")
      //   ) {

      //     firstLoad = false;
      //   }
      //   if (typeof messages === "string" && messages.includes("Sorry, our live chat agents are currently not available")) {
      //     firstLoad = false;
      //   }
        
      //   if (typeof messages === "string" && messages.includes("Thank you for your valuable feedback")) {
      //     let feedbackImprove = e.data.messages[i].text.split(".");
      //     var feedbackImproveSplit = `${feedbackImprove[0]}<br>${feedbackImprove[1]}`;
      //     yesButtonParser(
      //       feedbackImproveSplit,
      //       e.data.messages[i].index,
      //       true
      //     ).then((data) => {
      //       yesNoThanksButtonSender(data).then(() => {});
      //     });
      //   }


      //  if (typeof messages === "string" && messages.includes("#clientcontractnumber")) {
      //     let split = messages.split("#")[0];
      //     let clientcontractDynamicindex = e.data.messages[i].index;
      //     setTimeout(() => {
      //       $(
      //         "#cx-chat-index-" + clientcontractDynamicindex + ".cx-message.cx-them .cx-bubble"
      //       ).css("cssText", "margin-top: -23px !important");
      //     }, 30);
      //     setTimeout(() => {
      //       $("#cx-chat-index-" + clientcontractDynamicindex + " .cx-message-text").html(
      //         null
      //       );
      //       let saysomething = split;
      //       $("#cx-chat-index-" + clientcontractDynamicindex + " .cx-message-text").html(
      //         saysomething
      //       );
      //     }, 30);
      //     inputTextClientContractNumberParser(e.data.messages[i].index).then((data) => {
      //       inputTextClientContractNumbersender(data).then(() => {});
      //     });
      //   }  

      //  if (
      //     typeof messages === "string" &&
      //     messages.includes("#nameselect")
      //   ) {
      //     let split = messages.split("#")[0];
      //     let nameDynamicindex = e.data.messages[i].index;

      //     setTimeout(() => {
      //       $("#cx-chat-index-" + nameDynamicindex + " .cx-message-text").html(
      //         null
      //       );
      //       let saysomething = split;
      //       $("#cx-chat-index-" + nameDynamicindex + " .cx-message-text").html(
      //         saysomething
      //       );
      //     }, 30);
      //     inputTextNameParser(e.data.messages[i].index).then((data) => {
      //       inputTextNamesender(data).then(() => {});
      //     });
      //   }
      //   if (
      //     typeof messages === "string" &&
      //     messages.includes("#namereselect")
      //   ) {
      //     let split = messages.split("#")[0];
      //     let nameDynamicindex = e.data.messages[i].index;

      //     setTimeout(() => {
      //       $("#cx-chat-index-" + nameDynamicindex + " .cx-message-text").html(
      //         null
      //       );
      //       let saysomething = split;
      //       $("#cx-chat-index-" + nameDynamicindex + " .cx-message-text").html(
      //         saysomething
      //       );
      //     }, 30);
      //     inputTextNameParser(e.data.messages[i].index).then((data) => {
      //       inputTextNamesender(data).then(() => {});
      //     });
      //   }


      //   if (
      //     typeof messages === "string" &&
      //     messages.includes("#claimlastname")
      //   ) {
      //     let split = messages.split("#")[0];
      //     let addressIndex = e.data.messages[i].index;
      // setTimeout(() => {
      //       $("#cx-chat-index-" + addressIndex + " .cx-message-text").html(
      //         null
      //       );
      //       let saysomething = split;
      //       $("#cx-chat-index-" + addressIndex + " .cx-message-text").html(
      //         saysomething
      //       );
      //     }, 30);
      //     inputClaimLastnameTagParser(e.data.messages[i].index).then(
      //       (data) => {
      //         inputClaimLastnameSender(data, addressIndex).then(() => {});
      //       }
      //     );
      //   }

        

      //    if (
      //     typeof messages === "string" &&
      //     messages.includes("#claimlastnamereselect")
      //   ) {
      //     let split = messages.split("#")[0];
      //     let addressIndex = e.data.messages[i].index;
      // setTimeout(() => {
      //       $("#cx-chat-index-" + addressIndex + " .cx-message-text").html(
      //         null
      //       );
      //       let saysomething = split;
      //       $("#cx-chat-index-" + addressIndex + " .cx-message-text").html(
      //         saysomething
      //       );
      //     }, 30);
      //     inputClaimLastnameTagParser(e.data.messages[i].index).then(
      //       (data) => {
      //         inputClaimLastnameSender(data, addressIndex).then(() => {});
      //       }
      //     );
      //   }


      //   if (
      //     typeof messages === "string" &&
      //     messages.includes("#documentStatus")
      //   ) {
      //     let split = messages.split("#")[0];
      //     let addressIndex = e.data.messages[i].index;
      //     setTimeout(() => {
      //       $("#cx-chat-index-" + addressIndex + " .cx-message-text").html(
      //         null
      //       );
      //       let saysomething = ` `;
      //       $("#cx-chat-index-" + addressIndex + " .cx-message-text").html(
      //         saysomething
      //       );
      //     }, 30);
      //     inputDocumentStatusTableParser(split, e.data.messages[i].index)
      //     // .then(
      //     //   (data) => {
      //     //     inputClaimLastnameSender(data, addressIndex).then(() => {});
      //     //   }
      //     // );
      //   }

      //   if (
      //     typeof messages === "string" &&
      //     messages.includes("#fileanewclaimtransfer")
      //   ) {
      //    letDisableButton = true;
      //     let split = messages.split("#")[0];
      //     var dynamicIndex = e.data.messages[i].index;
      //     var oneFrame = e.data.messages[i].index;
      //     setTimeout(() => {
      //       $(
      //         "#cx-chat-index-" + oneFrame + ".cx-message.cx-them .cx-bubble"
      //       ).css("cssText", "margin-top: -23px !important");
      //     }, 30);
      //     buttonUrlParser(split, e.data.messages[i].index).then(
      //       (data) => {
      //         buttonUrlSender(split, data, dynamicIndex, messages).then(
      //           () => {}
      //         );
      //       }
      //     );
      //   }

      //   if (
          
      //     typeof messages === "string" &&
      //     messages.includes("#fileclaimtransferreselect")
      //   ) {
      //     let split = messages.split("#")[0];
      //     var dynamicIndex = e.data.messages[i].index;

      //     buttonUrlReParser(split, e.data.messages[i].index).then(
      //       (data) => {
      //         buttonUrlReSender(data, dynamicIndex).then(() => {});
      //       }
      //     );
          
      //   }

      //   if (
      //     typeof messages === "string" &&
      //     messages.includes("#uploadtransfer")
      //   ) {
      //    letDisableButton = true;
      //     let split = messages.split("#")[0];
      //     var dynamicIndex = e.data.messages[i].index;
      //     var oneFrame = e.data.messages[i].index;
      //     setTimeout(() => {
      //       $(
      //         "#cx-chat-index-" + oneFrame + ".cx-message.cx-them .cx-bubble"
      //       ).css("cssText", "margin-top: -23px !important");
      //     }, 30);
      //     buttonUrlParser(split, e.data.messages[i].index).then(
      //       (data) => {
      //         uploadUrlSender(split, data, dynamicIndex).then(
      //           () => {}
      //         );
      //       }
      //     );
      //   }

      //   if (
      //     typeof messages === "string" &&
      //     messages.includes("#uploadreselecttransfer")
      //   ) {
      //     let split = messages.split("#")[0];
      //     let uploadreselecttransferIndex = e.data.messages[i].index;

      //     setTimeout(() => {
      //       $("#cx-chat-index-" + uploadreselecttransferIndex + " .cx-message-text").html(null);
      //       let saysomething = split;
      //       $("#cx-chat-index-" + uploadreselecttransferIndex + " .cx-message-text").html(saysomething);
      //       }, 40);

      //     uploadUrlReParser(split, e.data.messages[i].index).then(
      //       (data) => {
      //         uploadUrlReSender(data).then(() => {});
      //       }
      //     );
          
      //   }



      //   if (
      //     typeof messages === "string" &&
      //     messages.includes("#yesnoliveagent")
      //   ) {
      //     let split = messages.split("#")[0];

      //     yesButtonParser(split, e.data.messages[i].index).then((data) => {
      //       yesButtonSender(data).then(() => {});
      //     });
          
      //   }

      //  if (
      //     typeof messages === "string" &&
      //     messages.indexOf("#yesnobuttons") !== -1
      //   ) {

      //     typing = true;
      //    letDisableButton = true;
      //     let split = messages.split("#")[0];
      //     var dynamicIndex = e.data.messages[i].index;
      //     var oneFrame = e.data.messages[i].index;
      //     setTimeout(() => {
      //       $(
      //         "#cx-chat-index-" + oneFrame + ".cx-message.cx-them .cx-bubble"
      //       ).css("cssText", "margin-top: -23px !important");
      //     }, 30);
      //     dynamicButtonParser(split, e.data.messages[i].index).then(
      //       (data) => {
      //         dynamicCategoryButtonSender(split, data, dynamicIndex).then(
      //           () => {}
      //         );
      //       }
      //     );
      //   }
      // if (
      //     typeof messages === "string" &&
      //     messages.indexOf("#dynamicbuttons") !== -1
      //   ) {
      //    letDisableButton = true;
      //     let split = messages.split("#")[0];
      //     var dynamicIndex = e.data.messages[i].index;
      //     var oneFrame = e.data.messages[i].index;
          
      //     //firstLoad = false;

      //     setTimeout(() => {
      //       $(
      //         "#cx-chat-index-" + oneFrame + ".cx-message.cx-them .cx-bubble"
      //       ).css("cssText", "margin-top: -23px !important");
      //     }, 30);
      //     dynamicButtonParser(split, e.data.messages[i].index).then(
      //       (data) => {
      //         dynamicButtonSender(split, data, dynamicIndex).then(
      //           () => {}
      //         );
      //       }
      //     );
      //   }
      //   if (typeof messages === "string" && messages.indexOf("#dynamicpipebutton") !== -1) {
      //    letDisableButton = true;
      //    typing = false;
      //     let split = messages.split("#")[0];
      //     var dynamicIndex = e.data.messages[i].index;
      //     var oneFrame = e.data.messages[i].index;


      //     //firstLoad = false;
      //     setTimeout(() => {
      //       $(
      //         "#cx-chat-index-" + oneFrame + ".cx-message.cx-them .cx-bubble"
      //       ).css("cssText", "margin-top: -23px !important");
      //     }, 30);
      //     dynamicButtonPipeParser(split, e.data.messages[i].index).then(
      //       (data) => {
      //         dynamicButtonPipeSender(split, data, dynamicIndex).then(
      //           () => {}
      //         );
      //       }
      //     );
      //   }

      //   if (typeof messages === "string" && messages.includes("#dynamicfileaclaimurl")) {
      //     dynamicUrl = messages.split('#')[0];
      //     const urlIndex = e.data.messages[i].index;
      //     setTimeout(() => {
      //       $("#cx-chat-index-" + urlIndex + " .cx-message-text").html(null);
      //       let saysomething = ` `;
      //       $("#cx-chat-index-" + urlIndex + " .cx-message-text").html(
      //         saysomething
      //       );
      //       $("#cx-chat-index-" + urlIndex + "").remove();
      //     }, 40);
      //   }

      //   if (typeof messages === "string" && messages.includes("let me connect you to a live agent")) {
      //     removeTimeoutMessage();        
      //     setTimeout(() => {
      //       timeOutChat = 0;
      //       clearInterval(deleteTimers);
      //     }, 5000);

      //   }

      //   if (typeof messages === "string" && messages.includes("All our agents currently are busy at moment")) {  
      //     setTimeout(() => {
      //       $(`body .typing`).remove();
      //     }, 500);
      //   }

      //   if (typeof messages === "string" && messages.includes("For any emergency")) {    
      //     setTimeout(() => {
      //       $(`body .typing`).remove();
      //     }, 500);
      //   }

      //   if (typeof messages === "string" && messages.includes("#intentreselection")) {
      //     claimButtonParser2(messages.split("#")[0], e.data.messages[i].index).then((data) => {
      //       claimButtonSender(data).then(() => {});
      //     });
      //   }

      //   if (typeof messages === "string" && messages.includes("#reselectioncategory")) {
      //     let split = messages.split("#")[0];
      //     let split2 = split.split(":")[1]
      //     var dynamicIndex = e.data.messages[i].index;

      //     dynamicCategoryButtonParser2(split, dynamicIndex).then(
      //       (data) => {
      //         dynamicCategoryButtonSender(split2, data, dynamicIndex).then(
      //           () => {}
      //         );
      //       }
      //     );
      //   }

      // //////////////////////////ERROR RESELECT ///////////////////////////////////////////
      // if (typeof messages === "string" && messages.includes("#yesnobackreselect")) {
      //   let confirmclaimreselectindex = e.data.messages[i].index;
      //   let split = messages.split("#")[0];
      //   yesnobackReselectP(split, e.data.messages[i].index).then(
      //     (data) => {
      //       yesnobackReselectS(data).then(() => {});
      //     }
      //   );
      // }
      
      // if (typeof messages === "string" && messages.includes("#yesnoreselect")) {
      //   let yesnoreselectindex = e.data.messages[i].index;
      //   let split = messages.split("#")[0];
      //   yesnoReselectP(split, e.data.messages[i].index).then(
      //     (data) => {
      //       yesnoReselectS(data).then(() => {});
      //     }
      //   );
      // }
      // if (typeof messages === "string" && messages.includes("#furtherassistancereselect")) {
      //   let yesnoreselectindex = e.data.messages[i].index;
      //   let split = messages.split("#")[0];
      //   furtherAssistanceReselectP(split, e.data.messages[i].index).then(
      //     (data) => {
      //       furtherAssistanceReselectS(data).then(() => {});
      //     }
      //   );
      // }
      // if (
      //   typeof messages === "string" &&
      //   messages.includes("#learnmorereselect")
      // ) {
      //   let yesnoreselectindex = e.data.messages[i].index;
      //   let split = messages.split("#")[0];
      //   learnmorereselectP(split, e.data.messages[i].index).then(
      //     (data) => {
      //       learnmorereselectS(data).then(() => {});
      //     }
      //   );
      // }
      // if (
      //   typeof messages === "string" &&
      //   messages.includes("#somethingelsereselect")
      // ) {
      //   let yesnoreselectindex = e.data.messages[i].index;
      //   let split = messages.split("#")[0];

   
      //   somethingelsereselectP(split, e.data.messages[i].index).then(
      //     (data) => {
      //       somethingelsereselectS(data).then(() => {});
      //     }
      //   );
      // }
      // if (typeof messages === "string" && messages.includes("#tripcancelreselect")) {
      //   let yesnoreselectindex = e.data.messages[i].index;
      //   let split = messages.split("#")[0];
      //   tripcancelreselectP(split, e.data.messages[i].index).then(
      //     (data) => {
      //       tripcancelreselectS(data).then(() => {});
      //     }
      //   );
      // }

      // if (typeof messages === "string" && messages.includes("#reasoncancelreselect")) {
      //   let yesnoreselectindex = e.data.messages[i].index;
      //   let split = messages.split("#")[0];
      //   reasoncancelreselectP(split, e.data.messages[i].index).then(
      //     (data) => {
      //       reasoncancelreselectS(data).then(() => {});
      //     }
      //   );
      // }
      
      // if (typeof messages === "string" && messages.includes("#reasonmorecancelreselect")) {
      //   let yesnoreselectindex = e.data.messages[i].index;
      //   let split = messages.split("#")[0];
      //   reasonmorecancelreselectP(split, e.data.messages[i].index).then(
      //     (data) => {
      //       reasonmorecancelreselectS(data).then(() => {});
      //     }
      //   );
      // }


      // if (typeof messages === "string" && messages.includes("#tryAgainreselect")) {
      //   let yesnoreselectindex = e.data.messages[i].index;
      //   let split = messages.split("#")[0];
      //   tryAgainReselectP(split, e.data.messages[i].index).then(
      //     (data) => {
      //       tryAgainReselectS(data).then(() => {});
      //     }
      //   );
      // }

      // if (
      //   typeof messages === "string" &&
      //   messages.includes("#yesnothanksreselect")
      // ) {
      //   let yesnoreselectindex = e.data.messages[i].index;
      //   let split = messages.split("#")[0];

   
      //   yesnothanksReselectP(split, e.data.messages[i].index).then(
      //     (data) => {
      //       yesnothanksReselectS(data).then(() => {});
      //     }
      //   );
      // }

      // if (
      //   typeof messages === "string" &&
      //   messages.includes("#likeDiskeReselect")
      // ) {
      //   let yesnoreselectindex = e.data.messages[i].index;
      //   let split = messages.split("#")[0];

   
      //   likeButtonReParser(split, e.data.messages[i].index).then((data) => {
      //     likeButtonSender(data).then(() => {});
      //   });
        
      // }

      /**********************************************************************/

        // WIDGET TG CLAIM CC VERSION

      /**********************************************************************/

      if(isUrlUpload) {
          if(messages == 'upload' || messages == 'UPLOAD' || messages == "Upload" || messages == 'yes' || messages == 'Yes' || messages == "YES" || messages == 'okay' || messages == 'OKAY' || messages == "Okay" || messages == 'yeah' || messages == 'YEAH' || messages == "Yeah" || messages == "UpLoad" || messages == 'ok' || messages == "OK" || messages == 'Ok' || messages == 'Proceed' || messages == "proceed" || messages == 'PROCEED' || messages == 'fine' || messages == "Fine" || messages == 'FINE' || messages == 'accept' || messages == "ACCEPT" || messages == "Accept" && isUrlUpload){

          if (messages && e.data.messages[i].from.type == "Bot") {

            }else{
              window.open(dynamicUrl);
              isUrlUpload = false;
              isUrlUpload = null;
            }
          }
      }

      if(yesPleaseUpload) {
        if(messages == 'yes, please' || 
           messages == 'Yes, Please' || 
           messages == "YES, PLEASE" || 
           messages == 'yes please' || 
           messages == 'Yes Please' || 
           messages == "YES PLEASE" ||
           messages == 'yes' || 
           messages == 'Yes' || 
           messages == "YES" ||
           messages == 'yeah' || 
           messages == 'Yeah' || 
           messages == "YEAH" && yesPleaseUpload){

        if (messages && e.data.messages[i].from.type == "Bot") {

          }else{
            window.open(dynamicUrl);
            yesPleaseUpload = false;
            yesPleaseUpload = null;
          }
        }
    }


      if (typeof messages === "string" && messages.includes("#CCsessiontimeout")
        ) {
        if (messages && e.data.messages[i].from.type == "Bot") {
          let split = messages.split("#")[0];
          let sessiontimeoutIndex = e.data.messages[i].index;
          setTimeout(() => {
            $("#cx-chat-index-" + sessiontimeoutIndex + " .cx-message-text").html(null);
            let saysomething = split;
            $("#cx-chat-index-" + sessiontimeoutIndex + " .cx-message-text").html(saysomething);
          }, 40);
        }
      }

      if (typeof messages === "string" && messages.includes("#CCpleaseVisit")) {
        let split = messages.split("#")[0];
        let visitUrlIndex = e.data.messages[i].index;
        setTimeout(() => {
          $("#cx-chat-index-" + visitUrlIndex + " .cx-message-text").html(null);
          let saysomething = split;
          $("#cx-chat-index-" + visitUrlIndex + " .cx-message-text").html(saysomething);
        }, 40);
        
        }
        if (typeof messages === "string" && messages.includes("#CCclientClaimStatus")) {
          let split = messages.split("#")[0];
          let status = split.split(":")[1].split("Next")[0];
          let checkOpenDone = status.includes("Claim Received") || status.includes("claim received") || status.includes("CLAIM RECEIVED") || status.includes("Claim received") || status.includes("claim Received") ?  true : false
          let checkProcessDone = status.includes("New") || status.includes("NEW") || status.includes("new") || status.includes("Open") || status.includes("open") || status.includes("OPEN") || status.includes("Claim Reviewed") || status.includes("CLAIM REVIEWED") || status.includes("claim reviewed") || status.includes("claim Reviewed") || status.includes("Claim reviewed") ? true : false
          let checkCompletedDone = status.includes("Claim Finalized") || status.includes("claim finalized") || status.includes("Claim finalized") || status.includes("claim Finalized") || status.includes("CLAIM FINALIZED") ? true : false
          let clientClaimStatusIndex = e.data.messages[i].index;
          setTimeout(() => {
          $("#cx-chat-index-" + clientClaimStatusIndex + " .cx-message-text").html(null);
          let html = `${split.split(':')[0]}:<br><ol id="progress-status">
                      <li class="progress-items ${checkOpenDone ? 'done' : checkProcessDone ? 'done' : checkCompletedDone ? 'done' : 'todo'}">
                        <i class="far fa-file fa-3x"></i>
                        <p>&nbsp;&nbsp;&nbsp;Open&nbsp;&nbsp;&nbsp;</p>
                        <div class="progress-circle"></div>
                      </li>
                      <li class="progress-items ${checkProcessDone ? 'done' : checkCompletedDone ? 'done' : 'todo'}">
                        <i class="fa-solid fa-spinner fa-3x"></i>
                        <p>Under Review</p>
                        <div class="progress-circle"></div>
                      </li>
                      <li class="progress-items ${checkCompletedDone ? 'done' : 'todo'}">
                        <i class="fa-solid fa-check-to-slot fa-3x"></i>
                        <p>Closed</p>
                        <div class="progress-circle"></div>
                      </li>
                      
                    </ol><span class="progress-line"></span>${split.split(':')[1]}`;
          let saysomething = html;
          $("#cx-chat-index-" + clientClaimStatusIndex + " .cx-message-text").html(saysomething);
          }, 40);
          
          }

      if (typeof messages === "string" && messages.includes("#CCimprovementmsg")) {
        let split = messages.split("#")[0];
        let areasDynamicindex = e.data.messages[i].index;

        setTimeout(() => {
          $("#cx-chat-index-" + areasDynamicindex + " .cx-message-text").html(null);
          let saysomething = split;
          $("#cx-chat-index-" + areasDynamicindex + " .cx-message-text").html(saysomething);
        }, 30);
        inputTextAreaofImprovementParserCC(e.data.messages[i].index).then(
          (data) => {
            inputTextHidevalueSenderCC(data).then(() => {});
          }
        );
        // textAreaAutoResize();
      }



      if (typeof messages === "string" && messages.includes("#CCchatclosedhours")) {
        var hideAdaptive = e.data.messages[i].index;
        setTimeout(() => {
          $("#cx-chat-index-" + hideAdaptive + " .cx-message-text").html(null);
          const match = e.data.messages.filter(e => e.type === 'Message' && e.text.includes('Sorry') || e.text.includes('Okay'))
          let saysomething = match[0].text.split('#')[0];
          // let sundaySched = saysomething.split("Sunday");
          // let html = `${saysomething.split("Monday")[0]}<br /><br />Monday ${saysomething.split("Monday")[1]}`
          $("#cx-chat-index-" + hideAdaptive + " .cx-message-text").html(saysomething);
          $("#cx-chat-index-" + hideAdaptive + " .cx-message-text").parent().parent().removeClass();
          $("#cx-chat-index-" + hideAdaptive + " .cx-message-text").parent().parent().addClass('cx-message cx-participant cx-them cx-Bot cx-bot');
          // $("#cx-chat-index-" + hideAdaptive + " .cx-message-text").parent().prev().prev().remove();
          // $("#cx-chat-index-" + hideAdaptive + "").remove();
          // $("div").remove(".cx-message-group");
        }, 30);
        hideAdaptivecard = false;
      }

     if (typeof messages === "string" && messages.includes("#CCclientcontractnumber")) {
        let split = messages.split("#")[0];
        let clientcontractDynamicindex = e.data.messages[i].index;
        setTimeout(() => {
          $("#cx-chat-index-" + clientcontractDynamicindex + ".cx-message.cx-them .cx-bubble").css("cssText", "margin-top: -23px !important");
        }, 30);
        setTimeout(() => {
          $("#cx-chat-index-" + clientcontractDynamicindex + " .cx-message-text").html(null);
          let saysomething = split;
          $("#cx-chat-index-" + clientcontractDynamicindex + " .cx-message-text").html(saysomething);
        }, 30);
        inputTextClientContractNumberParserCC(e.data.messages[i].index).then((data) => {
          inputTextClientContractNumbersenderCC(data).then(() => {});
        });
      }  

     if (typeof messages === "string" && messages.includes("#CCnameselect")) {
        let split = messages.split("#")[0];
        let nameDynamicindex = e.data.messages[i].index;

        setTimeout(() => {
          $("#cx-chat-index-" + nameDynamicindex + " .cx-message-text").html(
            null
          );
          let saysomething = split;
          $("#cx-chat-index-" + nameDynamicindex + " .cx-message-text").html(
            saysomething
          );
        }, 30);
        inputTextNameParserCC(e.data.messages[i].index).then((data) => {
          inputTextNamesenderCC(data).then(() => {});
        });
      }
      if (typeof messages === "string" && messages.includes("#CCnamereselect")) {
        let split = messages.split("#")[0];
        let nameDynamicindex = e.data.messages[i].index;

        setTimeout(() => {
          $("#cx-chat-index-" + nameDynamicindex + " .cx-message-text").html(null);
          let saysomething = split;
          $("#cx-chat-index-" + nameDynamicindex + " .cx-message-text").html(saysomething);
        }, 30);
        inputTextNameParserCC(e.data.messages[i].index).then((data) => {
          inputTextNamesenderCC(data).then(() => {});
        });
      }

      if (typeof messages === "string" && messages.includes("#CCclaimlastname")) {
        let split = messages.split("#")[0];
        let addressIndex = e.data.messages[i].index;
        setTimeout(() => {
          $("#cx-chat-index-" + addressIndex + " .cx-message-text").html(null);
          let saysomething = split;
          $("#cx-chat-index-" + addressIndex + " .cx-message-text").html(saysomething);
        }, 30);
        inputClaimLastnameTagParserCC(e.data.messages[i].index).then(
          (data) => {
            inputClaimLastnameSenderCC(data, addressIndex).then(() => {});
          }
        );
      }
    //    if (typeof messages === "string" && messages.includes("#CCclaimlastnamereselect")) {
    //     let split = messages.split("#")[0];
    //     let addressIndex = e.data.messages[i].index;
    // setTimeout(() => {
    //       $("#cx-chat-index-" + addressIndex + " .cx-message-text").html(
    //         null
    //       );
    //       let saysomething = split;
    //       $("#cx-chat-index-" + addressIndex + " .cx-message-text").html(
    //         saysomething
    //       );
    //     }, 30);
    //     inputClaimLastnameTagParserCC(e.data.messages[i].index).then(
    //       (data) => {
    //         inputClaimLastnameSenderCC(data, addressIndex).then(() => {});
    //       }
    //     );
    //   }

      if (typeof messages === "string" && messages.includes("#CCdocumentStatus")) {
        let split = messages.split("#")[0];
        let addressIndex = e.data.messages[i].index;
        setTimeout(() => {
          $("#cx-chat-index-" + addressIndex + " .cx-message-text").html(null);
          let saysomething = ` `;
          $("#cx-chat-index-" + addressIndex + " .cx-message-text").html(saysomething);
        }, 30);
        inputDocumentStatusTableParserCC(split, e.data.messages[i].index)
      }

      if (typeof messages === "string" && messages.includes("#CCrequirementChecklist")) {
        let addressIndex = e.data.messages[i].index;
        setTimeout(() => {
          $("#cx-chat-index-" + addressIndex + " .cx-message-text").html(null);
          let saysomething = ` `;
          $("#cx-chat-index-" + addressIndex + " .cx-message-text").html(saysomething);
        }, 30);
        inputRequirementChecklistCC(messages, e.data.messages[i].index)
      }

      if (typeof messages === "string" && messages.includes("#CCrequirementreselect")) {
        // let split = messages.split("#")[0];
        let addressIndex = e.data.messages[i].index;
        setTimeout(() => {
          $("#cx-chat-index-" + addressIndex + " .cx-message-text").html(null);
          let saysomething = ` `;
          $("#cx-chat-index-" + addressIndex + " .cx-message-text").html(saysomething);
        }, 30);
        inputRequirementChecklistReSelectCC(messages, e.data.messages[i].index)
        .then(
          (data) => {
            inputRequirementChecklistSenderCC(data, addressIndex).then(() => {});
          }
        );
      }

      if (typeof messages === "string" && messages.includes("#CCfileanewclaimtransfer")) {
       letDisableButton = true;
        let split = messages.split("#")[0];
        var dynamicIndex = e.data.messages[i].index;
        var oneFrame = e.data.messages[i].index;
        setTimeout(() => {
          $("#cx-chat-index-" + oneFrame + ".cx-message.cx-them .cx-bubble").css("cssText", "margin-top: -23px !important");
        }, 30);
        buttonUrlParserCC(split, e.data.messages[i].index).then(
          (data) => {
            buttonUrlSenderCC(split, data, dynamicIndex, messages).then(
              () => {}
            );
          }
        );
      }

      if (typeof messages === "string" && messages.includes("#CCurlpipebuttons")) {
       letDisableButton = true;
        let split = messages.split("#")[0];
        var dynamicIndex = e.data.messages[i].index;
        var oneFrame = e.data.messages[i].index;
        setTimeout(() => {
          $("#cx-chat-index-" + oneFrame + ".cx-message.cx-them .cx-bubble").css("cssText", "margin-top: -23px !important");
        }, 30);
        buttonUrlPipeParserCC(split, e.data.messages[i].index).then(
          (data) => {
            buttonUrlPipeSenderCC(split, data, dynamicIndex, messages).then(
              () => {}
            );
          }
        );
      }

      if (typeof messages === "string" && messages.includes("#CCfileclaimtransferreselect")) {
        let split = messages.split("#")[0];
        var dynamicIndex = e.data.messages[i].index;

        buttonUrlReParserCC(split, e.data.messages[i].index).then(
          (data) => {
            buttonUrlReSenderCC(data, dynamicIndex).then(() => {});
          }
        );        
      }

      if (typeof messages === "string" && messages.includes("#CCstarted3reselect")) {
        let split = messages.split("#")[0];
        var dynamicIndex = e.data.messages[i].index;

        getstarted3buttonReParserCC(split, e.data.messages[i].index).then(
          (data) => {
            buttonUrlReSenderCC(data, dynamicIndex).then(() => {});
          }
        );
        
      }
      if (typeof messages === "string" && messages.includes("#CCletsgetstartreselect")) {
        let split = messages.split("#")[0];
        var dynamicIndex = e.data.messages[i].index;

        letsgetStartbuttonReParserCC(split, e.data.messages[i].index).then(
          (data) => {
            letsgetStartbuttonReSenderCC(data, dynamicIndex).then(() => {});
          }
        );        
      }

      if (typeof messages === "string" && messages.includes("#CCuploadtransfer")) {
       letDisableButton = true;
        let split = messages.split("#")[0];
        var dynamicIndex = e.data.messages[i].index;
        var oneFrame = e.data.messages[i].index;
        setTimeout(() => {
          $("#cx-chat-index-" + oneFrame + ".cx-message.cx-them .cx-bubble").css("cssText", "margin-top: -23px !important");
        }, 30);
        buttonUrlParserCC(split, e.data.messages[i].index).then(
          (data) => {
            uploadUrlSenderCC(split, data, dynamicIndex).then(
              () => {}
            );
          }
        );
      }

      if (typeof messages === "string" && messages.includes("#CCuploadreselecttransfer")) {
        let split = messages.split("#")[0];
        let uploadreselecttransferIndex = e.data.messages[i].index;

        setTimeout(() => {
          $("#cx-chat-index-" + uploadreselecttransferIndex + " .cx-message-text").html(null);
          let saysomething = split;
          $("#cx-chat-index-" + uploadreselecttransferIndex + " .cx-message-text").html(saysomething);
          }, 40);

        uploadUrlReParserCC(split, e.data.messages[i].index).then(
          (data) => {
            uploadUrlReSenderCC(data).then(() => {});
          }
        );
      }

      if (typeof messages === "string" && messages.includes("#CCyesnoliveagent")) {
        let split = messages.split("#")[0];

        yesButtonParserCC(split, e.data.messages[i].index).then((data) => {
          yesButtonSenderCC(data).then(() => {});
        });
      }

     if (typeof messages === "string" && messages.indexOf("#CCyesnobuttons") !== -1) {
        yesPleaseUpload = false;
        yesPleaseUpload = null;
        isUrlUpload = false;
        isUrlUpload = null;
        
        // typing = true;
       letDisableButton = true;
        let split = messages.split("#")[0];
        var dynamicIndex = e.data.messages[i].index;
        var oneFrame = e.data.messages[i].index;
        setTimeout(() => {
          $(
            "#cx-chat-index-" + oneFrame + ".cx-message.cx-them .cx-bubble"
          ).css("cssText", "margin-top: -23px !important");
        }, 30);
        dynamicButtonParser(split, e.data.messages[i].index).then(
          (data) => {
            dynamicButtonSender(split, data, dynamicIndex).then(
              () => {}
            );
          }
        );
      }
    if (typeof messages === "string" && messages.indexOf("#CCdynamicbuttons") !== -1 || typeof messages === "string" && messages.indexOf("#CCdynamicnonbusiness") !== -1) {
       letDisableButton = true;
        let split = messages.split("#")[0];
        var dynamicIndex = e.data.messages[i].index;
        var oneFrame = e.data.messages[i].index;
        //firstLoad = false;

        setTimeout(() => {
          $("#cx-chat-index-" + oneFrame + ".cx-message.cx-them .cx-bubble").css("cssText", "margin-top: -23px !important");
        }, 30);
        dynamicButtonParser(split, e.data.messages[i].index).then(
          (data) => {
            dynamicButtonSender(split, data, dynamicIndex).then(
              () => {}
            );
          }
        );
      }
      
      if (typeof messages === "string" && messages.indexOf("#CCdynamicpipebutton") !== -1) {
       letDisableButton = true;
       typing = false;
        let split = messages.split("#")[0];
        var dynamicIndex = e.data.messages[i].index;
        var oneFrame = e.data.messages[i].index;

        //firstLoad = false;
        isUrlTransfer = false;
        setTimeout(() => {
          $("#cx-chat-index-" + oneFrame + ".cx-message.cx-them .cx-bubble").css("cssText", "margin-top: -23px !important");
        }, 30);
        dynamicButtonPipeParserCC(split, e.data.messages[i].index).then(
          (data) => {
            dynamicButtonPipeSenderCC(split, data, dynamicIndex).then(
              () => {}
            );
          }
        );
      }
      if (typeof messages === "string" && messages.indexOf("#CCyespleasepipebuttons") !== -1) {
       letDisableButton = true;
       typing = false;
        let split = messages.split("#")[0];
        var dynamicIndex = e.data.messages[i].index;
        var oneFrame = e.data.messages[i].index;
        setTimeout(() => {
          $("#cx-chat-index-" + oneFrame + ".cx-message.cx-them .cx-bubble").css("cssText", "margin-top: -23px !important");
        }, 30);
        dynamicyespleaseButtonPipeParserCC(split, e.data.messages[i].index).then(
          (data) => {
            dynamicyespleaseButtonPipeSenderCC(split, data, dynamicIndex, messages).then(
              () => {}
            );
          }
        );
      }

      if (typeof messages === "string" && messages.includes("#CCdynamicfileaclaimurl")) {
        dynamicUrl = messages.split('#')[0];
        const urlIndex = e.data.messages[i].index;
        setTimeout(() => {
          $("#cx-chat-index-" + urlIndex + " .cx-message-text").html(null);
          let saysomething = ` `;
          $("#cx-chat-index-" + urlIndex + " .cx-message-text").html(saysomething);
          $("#cx-chat-index-" + urlIndex + "").remove();
        }, 40);
      }

      if (typeof messages === "string" && messages.includes("#CCintentreselection")) {
        let split = messages.split("#")[0];
        let reselectIndex = e.data.messages[i].index
        let buttonList = 'FILE A CLAIM,CLAIM STATUS,ANOTHER REQUEST'
        dynamicButtonParserReselect(buttonList, e.data.messages[i].index, split).then(
          (data) => {
            dynamicButtonSenderReselect(buttonList,buttonList,reselectIndex).then(() => {});
          }
        );
      }

      if (typeof messages === "string" && messages.includes("#CCnonbusinesreselect")) {
        let split = messages.split("#")[0];
        let reselectIndex = e.data.messages[i].index
        let buttonList = 'FILE A CLAIM,CLAIM STATUS'
        dynamicButtonParserReselect(buttonList, e.data.messages[i].index, split).then(
          (data) => {
            dynamicButtonSenderReselect(buttonList,buttonList,reselectIndex).then(() => {});
          }
        );
      }

    //   if (
    //     typeof messages === "string" &&
    //     messages.includes("#CCreselectioncategory")
    //   ) {
    //     let split = messages.split("#")[0];
    //     let split2 = split.split(":")[1]
    //     var dynamicIndex = e.data.messages[i].index;

    //     dynamicErrorButtonParserCC(split, dynamicIndex).then(
    //       (data) => {
    //         dynamicCategoryButtonSenderCC(split2, data, dynamicIndex).then(
    //           () => {}
    //         );
    //       }
    //     );
    //   }

    // //////////////////////////ERROR RESELECT ///////////////////////////////////////////
    if (typeof messages === "string" && messages.includes("#CCgotitreselect")) {
      let split = messages.split("#")[0];
      let reselectIndex = e.data.messages[i].index
      let buttonList = "GOT IT"
      setTimeout(() => {
      $("#cx-chat-index-" + reselectIndex + " .cx-message-text").html(null);
      let saysomething = split;
      $("#cx-chat-index-" + reselectIndex + " .cx-message-text").html(saysomething);
      }, 40);
      dynamicButtonParserReselect(buttonList, e.data.messages[i].index, split).then(
        (data) => {
          dynamicButtonSenderReselect(buttonList,buttonList,reselectIndex).then(() => {});
        }
      );
    }
    if (typeof messages === "string" && messages.includes("#CCokayreselect")) {
      let split = messages.split("#")[0];
      let reselectIndex = e.data.messages[i].index
      let buttonList = "OKAY"
      setTimeout(() => {
      $("#cx-chat-index-" + reselectIndex + " .cx-message-text").html(null);
      let saysomething = split;
      $("#cx-chat-index-" + reselectIndex + " .cx-message-text").html(saysomething);
      }, 40);
      dynamicButtonParserReselect(buttonList, e.data.messages[i].index, split).then(
        (data) => {
          dynamicButtonSenderReselect(buttonList,buttonList,reselectIndex).then(() => {});
        }
      );
    }
    if (typeof messages === "string" && messages.includes("#CCBaggagelossreselect")) {
      let split = messages.split("#")[0];
      let reselectIndex = e.data.messages[i].index
      let buttonList = "BAGGAGE IS LOST,BAGGAGE WAS STOLEN,BAGGAGE WAS DAMAGED"
      dynamicButtonParserReselect(buttonList, e.data.messages[i].index, split).then(
        (data) => {
          dynamicButtonSenderReselect(buttonList,buttonList,reselectIndex).then(() => {});
        }
      );
    }

    if (typeof messages === "string" && messages.includes("#CCyesnobackreselect")) {
      let split = messages.split("#")[0];
      let reselectIndex = e.data.messages[i].index
      let buttonList = "YES,NO,BACK"
      dynamicButtonParserReselect(buttonList, e.data.messages[i].index, split).then(
        (data) => {
          dynamicButtonSenderReselect(buttonList,buttonList,reselectIndex).then(() => {});
        }
      );
    }

    if (typeof messages === "string" && messages.includes("#CCyesnogobackreselect")) {
      let split = messages.split("#")[0];
      let reselectIndex = e.data.messages[i].index
      let buttonList = "YES,NO,GO BACK"
      dynamicButtonParserReselect(buttonList, e.data.messages[i].index, split).then(
        (data) => {
          dynamicButtonSenderReselect(buttonList,buttonList,reselectIndex).then(() => {});
        }
      );
    }
    
    if (typeof messages === "string" && messages.includes("#CCyesnoreselect")) {
      let split = messages.split("#")[0];
      let reselectIndex = e.data.messages[i].index
      let buttonList = "YES,NO"
      dynamicButtonParserReselect(buttonList, e.data.messages[i].index, split).then(
        (data) => {
          dynamicButtonSenderReselect(buttonList,buttonList,reselectIndex).then(() => {});
        }
      );
    }
    
    if (typeof messages === "string" && messages.includes("#CCcustomreselect")) {
      let split = messages.split("#")[0];
      let reselectIndex = e.data.messages[i].index
      let buttonList = "YES, PLEASE|NO, I'LL DO LATER"
      dynamicButtonParserReselect(buttonList, e.data.messages[i].index, split).then(
        (data) => {
          dynamicButtonSenderReselect(buttonList,buttonList,reselectIndex).then(() => {});
        }
      );
    }
    if (typeof messages === "string" && messages.includes("#CCcustombuttonreselect")) {
      let split = messages.split("#")[0];
      let reselectIndex = e.data.messages[i].index
      let buttonList = "YES, I HAVE|NO, I HAVEN'T"
      dynamicButtonParserReselect(buttonList, e.data.messages[i].index, split).then(
        (data) => {
          dynamicButtonSenderReselect(buttonList,buttonList,reselectIndex).then(() => {});
        }
      );
    }

    if (typeof messages === "string" && messages.includes("#CCyeslaterreselect")) {
      let split = messages.split("#")[0];
      let reselectIndex = e.data.messages[i].index
      let buttonList = "YES, PLEASE|NO, I'LL DO LATER"
      dynamicButtonParserReselect(buttonList, e.data.messages[i].index, split).then(
        (data) => {
          dynamicButtonSenderReselect(buttonList,buttonList,reselectIndex).then(() => {});
        }
      );
    }
    
    if (typeof messages === "string" && messages.includes("#CCcontinuereselct")) {
      let split = messages.split("#")[0];
      let reselectIndex = e.data.messages[i].index
      let buttonList = 'CONTINUE'
      dynamicButtonParserReselect(buttonList, e.data.messages[i].index, split).then(
        (data) => {
          dynamicButtonSenderReselect(buttonList,buttonList,reselectIndex).then(() => {});
        }
      );
    }

    if (typeof messages === "string" && messages.includes("#CCurlcontinuereselect")) {
      let yesnoreselectindex = e.data.messages[i].index;
      let split = messages.split("#")[0];
      continueReselectPCC(split, e.data.messages[i].index).then(
        (data) => {
          continueReselectSCC(data).then(() => {});
        }
      );
    }
    if (typeof messages === "string" && messages.includes("#CCconfirmcontinuereselect")) {
      let split = messages.split("#")[0];
      let reselectIndex = e.data.messages[i].index
      let buttonList = 'CONTINUE'
      dynamicButtonParserReselect(buttonList, e.data.messages[i].index, split).then(
        (data) => {
          dynamicButtonSenderReselect(buttonList,buttonList,reselectIndex).then(() => {});
        }
      );
    }

    if (typeof messages === "string" && messages.includes("#CCreselectdocumentintent")) {
      let split = messages.split("#")[0];
      let reselectIndex = e.data.messages[i].index
      let buttonList = 'VIEW RECOMMENDED DOCUMENTS,FILE A CLAIM,VIEW CLAIM STATUS'
      dynamicButtonParserReselect(buttonList, e.data.messages[i].index, split).then(
        (data) => {
          dynamicButtonSenderReselect(buttonList,buttonList,reselectIndex).then(() => {});
        }
      );
    }

    if (typeof messages === "string" && messages.includes("#CCfurtherassistancereselect")) {
      let split = messages.split("#")[0];
      let reselectIndex = e.data.messages[i].index
      let buttonList = 'NEED FURTHER ASSISTANCE,NOTHING ELSE TODAY'
      dynamicButtonParserReselect(buttonList, e.data.messages[i].index, split).then(
        (data) => {
          dynamicButtonSenderReselect(buttonList,buttonList,reselectIndex).then(() => {});
        }
      );
    }

    if (typeof messages === "string" && messages.includes("#CClearnmorereselect")) {
      let split = messages.split("#")[0];
      let reselectIndex = e.data.messages[i].index
      let buttonList = 'LEARN MORE,NOTHING ELSE TODAY,NEED FURTHER ASSISTANCE'
      dynamicButtonParserReselect(buttonList, e.data.messages[i].index, split).then(
        (data) => {
          dynamicButtonSenderReselect(buttonList,buttonList,reselectIndex).then(() => {});
        }
      );
    }
    if (typeof messages === "string" && messages.includes("#CCsomethingelsereselect")) {
      let split = messages.split("#")[0];
      let reselectIndex = e.data.messages[i].index
      let buttonList = 'YES,NO,SOMETHING ELSE'
      dynamicButtonParserReselect(buttonList, e.data.messages[i].index, split).then(
        (data) => {
          dynamicButtonSenderReselect(buttonList,buttonList,reselectIndex).then(() => {});
        }
      );
    }

    if (typeof messages === "string" && messages.includes("#CCtripcancelreselect")) {
      let split = messages.split("#")[0];
      let reselectIndex = e.data.messages[i].index
      let buttonList = 'TRIP CANCELLATION,BAGGAGE LOSS,TRIP INTERRUPTION,SOMETHING ELSE'
      dynamicButtonParserReselect(buttonList, e.data.messages[i].index, split).then(
        (data) => {
          dynamicButtonSenderReselect(buttonList,buttonList,reselectIndex).then(() => {});
        }
      );
    }

    if (typeof messages === "string" && messages.includes("#CCreasoncancelreselect")) {
      let split = messages.split("#")[0];
      let reselectIndex = e.data.messages[i].index
      let buttonList = 'ILLNESS,INJURY,PREGNANCY RELATED,INCLEMENT WEATHER,WORK/EMPLOYMENT RELATED,MILITARY ORDER,MORE REASONS'
      dynamicButtonParserReselect(buttonList, e.data.messages[i].index, split).then(
        (data) => {
          dynamicButtonSenderReselect(buttonList,buttonList,reselectIndex).then(() => {});
        }
      );
    }
    
    if (typeof messages === "string" && messages.includes("#CCreasonmorecancelreselect")) {
      let split = messages.split("#")[0];
      let reselectIndex = e.data.messages[i].index
      let buttonList = 'COURT APPEARANCE,HOME/DESTINATION UNINHABITABLE,DEATH,AIRLINE/CRUISE LINE PROBLEMS,OTHERS,GO BACK'
      dynamicButtonParserReselect(buttonList, e.data.messages[i].index, split).then(
        (data) => {
          dynamicButtonSenderReselect(buttonList,buttonList,reselectIndex).then(() => {});
        }
      );
    }


    if (typeof messages === "string" && messages.includes("#CCtryAgainreselect")) {
      let split = messages.split("#")[0];
      let reselectIndex = e.data.messages[i].index
      let buttonList = 'TRY AGAIN LATER,LIVE AGENT'
      dynamicButtonParserReselect(buttonList, e.data.messages[i].index, split).then(
        (data) => {
          dynamicButtonSenderReselect(buttonList,buttonList,reselectIndex).then(() => {});
        }
      );
    }

    if (typeof messages === "string" && messages.includes("#CCyesnothanksreselect")) {
      let split = messages.split("#")[0];
      let reselectIndex = e.data.messages[i].index
      let buttonList = 'YES,NO THANKS'
      dynamicButtonParserReselect(buttonList, e.data.messages[i].index, split).then(
        (data) => {
          dynamicButtonSenderReselect(buttonList,buttonList,reselectIndex).then(() => {});
        }
      );
    }

    if (typeof messages === "string" && messages.includes("#CCoklearnreselect")) {
      let split = messages.split("#")[0];
      let reselectIndex = e.data.messages[i].index
      let buttonList = 'OKAY,LEARN MORE'
      dynamicButtonParserReselect(buttonList, e.data.messages[i].index, split).then(
        (data) => {
          dynamicButtonSenderReselect(buttonList,buttonList,reselectIndex).then(() => {});
        }
      );
    }

    if (typeof messages === "string" && messages.includes("#CCContinuereselect")) {
      let split = messages.split("#")[0];
      let reselectIndex = e.data.messages[i].index
      let buttonList = 'CONTINUE'
      dynamicButtonParserReselect(buttonList, e.data.messages[i].index, split).then(
        (data) => {
          dynamicButtonSenderReselect(buttonList,buttonList,reselectIndex).then(() => {});
        }
      );
    }

    if (typeof messages === "string" && messages.includes("#CClikeDiskeReselect")) {
      let yesnoreselectindex = e.data.messages[i].index;
      let split = messages.split("#")[0];
      likeButtonReParserCC(split, e.data.messages[i].index).then((data) => {
        likeButtonSenderCC(data).then(() => {});
      });
      
    }

    // Frontier
    if (typeof messages === "string" && messages.includes("#FApolicyCoverage")) {
      let addressIndex = e.data.messages[i].index;
      let split = messages.split("#")[0]
      setTimeout(() => {
        $("#cx-chat-index-" + addressIndex + " .cx-message-text").html(null);
        let saysomething = ` `;
        $("#cx-chat-index-" + addressIndex + " .cx-message-text").html(saysomething);
      }, 30);
      inputPolicyCoverage(split, e.data.messages[i].index)
    }

    if (typeof messages === "string" && messages.includes("#FApolicyContactDetails")) {
      let split = messages.split("#")[0];
      let visitUrlIndex = e.data.messages[i].index;
      setTimeout(() => {
      $("#cx-chat-index-" + visitUrlIndex + " .cx-message-text").html(null);
      let saysomething = split;
      $("#cx-chat-index-" + visitUrlIndex + " .cx-message-text").html(saysomething);
      }, 40);
      inputPolicyContactDetailsParser(e.data.messages[i].index).then(
        (data) => {
          inputPolicyContactDetailsSender(data, visitUrlIndex).then(() => {});
        }
      );
      }

    if (typeof messages === "string" && messages.includes("#FAnewline") || typeof messages === "string" && messages.includes("#CCnewline")) {
      let split = messages.split("#")[0];
      let visitUrlIndex = e.data.messages[i].index;
      document.documentElement.setAttribute('data-source', 'TG');
      setTimeout(() => {
        $("#cx-chat-index-" + visitUrlIndex + " .cx-message-text").html(null);
        let saysomething = split;
        $("#cx-chat-index-" + visitUrlIndex + " .cx-message-text").html(saysomething);
      }, 40);
      }

      if (typeof messages === "string" && messages.includes("#FAauthentication")) {
        let split = messages.split("#")[0];
        let addressIndex = e.data.messages[i].index;
        var oneFrame = e.data.messages[i].index;
        setTimeout(() => {
          $("#cx-chat-index-" + addressIndex + " .cx-message-text").html(null);
          $("#cx-chat-index-" + oneFrame + ".cx-message.cx-them .cx-bubble").css("cssText", "margin-top: -23px !important");
        }, 30);
        inputBookingAuthenticationParser(e.data.messages[i].index).then(
          (data) => {
            inputBookingAuthenticationSender(data, addressIndex).then(() => {});
          }
        );
      }

      if (typeof messages === "string" && messages.includes("#FANameCorrection")) {
        let split = messages.split("#")[0];
        let addressIndex = e.data.messages[i].index;
        var oneFrame = e.data.messages[i].index;
        setTimeout(() => {
          $("#cx-chat-index-" + addressIndex + " .cx-message-text").html(null);
          $("#cx-chat-index-" + oneFrame + ".cx-message.cx-them .cx-bubble").css("cssText", "margin-top: -23px !important");
        }, 30);
        inputPolicyModificationNameParser(e.data.messages[i].index).then(
          (data) => {
            inputPolicyModificationNameSender(data, addressIndex).then(() => {});
          }
        );
      }

      if (typeof messages === "string" && messages.includes("#FAChangeinName")) {
        let split = messages.split("#")[0];
        let addressIndex = e.data.messages[i].index;
        var oneFrame = e.data.messages[i].index;
        setTimeout(() => {
          $("#cx-chat-index-" + addressIndex + " .cx-message-text").html(null);
          $("#cx-chat-index-" + oneFrame + ".cx-message.cx-them .cx-bubble").css("cssText", "margin-top: -23px !important");
        }, 30);
        inputPolicyModificationNameParser(e.data.messages[i].index).then(
          (data) => {
            inputPolicyModificationNameSender(data, addressIndex).then(() => {});
          }
        );
      }

      if (typeof messages === "string" && messages.includes("#FAChangeDOB")) {
        let split = messages.split("#")[0];
        let addressIndex = e.data.messages[i].index;
        var oneFrame = e.data.messages[i].index;
        setTimeout(() => {
          $("#cx-chat-index-" + addressIndex + " .cx-message-text").html(
            null
          );
          $("#cx-chat-index-" + oneFrame + ".cx-message.cx-them .cx-bubble").css("cssText", "margin-top: -23px !important");
        }, 30);
        inputPolicyModificationDateBirthParser(e.data.messages[i].index).then(
          (data) => {
            inputPolicyModificationDateBirthSender(data, addressIndex).then(() => {});
          }
        );
      }

      if (typeof messages === "string" && messages.includes("#FAAddressCorrection")) {
        let split = messages.split("#")[0];
        let addressIndex = e.data.messages[i].index;
        var oneFrame = e.data.messages[i].index;
        setTimeout(() => {
          $("#cx-chat-index-" + addressIndex + " .cx-message-text").html(null);
          $("#cx-chat-index-" + oneFrame + ".cx-message.cx-them .cx-bubble").css("cssText", "margin-top: -23px !important");
        }, 30);
        inputPolicyModificationAddressParser(e.data.messages[i].index).then(
          (data) => {
            inputPolicyModificationAddressSender(data, addressIndex).then(() => {});
          }
        );
      }

      if (typeof messages === "string" && messages.includes("#FAChangeinAddress")) {
        let split = messages.split("#")[0];
        let addressIndex = e.data.messages[i].index;
        var oneFrame = e.data.messages[i].index;
        setTimeout(() => {
          $("#cx-chat-index-" + addressIndex + " .cx-message-text").html(
            null
          );
          $("#cx-chat-index-" + oneFrame + ".cx-message.cx-them .cx-bubble").css("cssText", "margin-top: -23px !important");
        }, 30);
        inputPolicyModificationAddressParser(e.data.messages[i].index).then(
          (data) => {
            inputPolicyModificationAddressSender(data, addressIndex).then(() => {});
          }
        );
      }

      if (typeof messages === "string" && messages.includes("#FAChangeinTripDate")) {
        let split = messages.split("#")[0];
        let addressIndex = e.data.messages[i].index;
        var oneFrame = e.data.messages[i].index;
        setTimeout(() => {
          $("#cx-chat-index-" + addressIndex + " .cx-message-text").html(
            null
          );
          $("#cx-chat-index-" + oneFrame + ".cx-message.cx-them .cx-bubble").css("cssText", "margin-top: -23px !important");
        }, 30);
        inputPolicyModificationTripDateParser(e.data.messages[i].index).then(
          (data) => {
            inputPolicyModificationTripDateSender(data, addressIndex).then(() => {});
          }
        );
      }

      if (typeof messages === "string" && messages.includes("#FATripCost")) {
        let split = messages.split("#")[0];
        let addressIndex = e.data.messages[i].index;
        var oneFrame = e.data.messages[i].index;
        setTimeout(() => {
          $("#cx-chat-index-" + addressIndex + " .cx-message-text").html(
            null
          );
          $("#cx-chat-index-" + oneFrame + ".cx-message.cx-them .cx-bubble").css("cssText", "margin-top: -23px !important");
        }, 30);
        inputPolicyModificationTripCostParser(e.data.messages[i].index).then(
          (data) => {
            inputPolicyModificationTripCostSender(data, addressIndex).then(() => {});
          }
        );
      }

      if (typeof messages === "string" && messages.includes("#FAbeneficiary")) {
        let split = messages.split("#")[0];
        let addressIndex = e.data.messages[i].index;
        var oneFrame = e.data.messages[i].index;
        setTimeout(() => {
          $("#cx-chat-index-" + addressIndex + " .cx-message-text").html(null);
          $("#cx-chat-index-" + oneFrame + ".cx-message.cx-them .cx-bubble").css("cssText", "margin-top: -23px !important");
        }, 30);
        inputPolicyModificationBeneficiaryParser(e.data.messages[i].index).then(
          (data) => {
            inputPolicyModificationBeneficiarySender(data, addressIndex).then(() => {});
          }
        );
      }

      if (typeof messages === "string" && messages.includes("#FAcallbackdetails")) {
        let split = messages.split("#")[0];
        let addressIndex = e.data.messages[i].index;
        var oneFrame = e.data.messages[i].index;
        setTimeout(() => {
          $("#cx-chat-index-" + addressIndex + " .cx-message-text").html(null);
          $("#cx-chat-index-" + oneFrame + ".cx-message.cx-them .cx-bubble").css("cssText", "margin-top: -23px !important");
        }, 30);
        inputCallbackDetailsParser(e.data.messages[i].index).then(
          (data) => {
            inputCallbackDetailsSender(data, addressIndex).then(() => {});
          }
        );
      }
      
      if (typeof messages === "string" && messages.includes("#FAdynamicButtonsUrl")) {
       letDisableButton = true;
        let split = messages.split("#")[0];
        var dynamicIndex = e.data.messages[i].index;
        var oneFrame = e.data.messages[i].index;
        setTimeout(() => {
          $("#cx-chat-index-" + oneFrame + ".cx-message.cx-them .cx-bubble").css("cssText", "margin-top: -23px !important");
        }, 30);
        FAbuttonUrlParser(split, e.data.messages[i].index).then(
          (data) => {
            FAbuttonUrlSender(split, data, dynamicIndex, messages).then(
              () => {}
            );
          }
        );
      }
      
      if (typeof messages === "string" && messages.includes("#FAdynamicButtons")) {
          letDisableButton = true;
          let split = messages.split("#")[0];
          var dynamicIndex = e.data.messages[i].index;
          var oneFrame = e.data.messages[i].index;
          setTimeout(() => {
            $(
              "#cx-chat-index-" + oneFrame + ".cx-message.cx-them .cx-bubble"
            ).css("cssText", "margin-top: -23px !important");
          }, 30);
          dynamicButtonParser(split, e.data.messages[i].index).then(
            (data) => {
              dynamicButtonSender(split, data, dynamicIndex).then(
                () => {}
              );
            }
          );
        }

        if (typeof messages === "string" && messages.indexOf("#FAyesnoButtons") !== -1) {
          typing = true;
         letDisableButton = true;
          let split = messages.split("#")[0];
          var dynamicIndex = e.data.messages[i].index;
          var oneFrame = e.data.messages[i].index;
          setTimeout(() => {
            $("#cx-chat-index-" + oneFrame + ".cx-message.cx-them .cx-bubble").css("cssText", "margin-top: -23px !important");
          }, 30);
          dynamicButtonParser(split, e.data.messages[i].index).then(
            (data) => {
              dynamicButtonSender(split, data, dynamicIndex).then(
                () => {}
              );
            }
          );
        }

        if (typeof messages === "string" && messages.includes("#FAlastnamechange")) {
          let split = messages.split("#")[0];
          let addressIndex = e.data.messages[i].index;
          var oneFrame = e.data.messages[i].index;
          setTimeout(() => {
            $("#cx-chat-index-" + addressIndex + " .cx-message-text").html(null);
            $("#cx-chat-index-" + oneFrame + ".cx-message.cx-them .cx-bubble").css("cssText", "margin-top: -23px !important");
          }, 30);
          inputChangeLastnameParser(e.data.messages[i].index).then(
            (data) => {
              inputChangeLastnameSender(data, addressIndex).then(() => {});
            }
          );
        }
        if (typeof messages === "string" && messages.indexOf("#FAdynamicPipeButtons") !== -1 || typeof messages === "string" && messages.indexOf("#CCdynamicpipebuttons") !== -1) {
             letDisableButton = true;
             typing = false;
              let split = messages.split("#")[0];
              var dynamicIndex = e.data.messages[i].index;
              var oneFrame = e.data.messages[i].index;
              setTimeout(() => {
                $("#cx-chat-index-" + oneFrame + ".cx-message.cx-them .cx-bubble").css("cssText", "margin-top: -23px !important");
              }, 30);
              dynamicButtonPipeParser(split, e.data.messages[i].index).then(
                (data) => {
                  dynamicButtonPipeSender(split, data, dynamicIndex).then(
                    () => {}
                  );
                }
              );
            }

              if (typeof messages === "string" && messages.includes("#FAdynamicUrl")) {
                dynamicUrl = messages.split("#")[0];
                const urlIndex = e.data.messages[i].index;
                setTimeout(() => {
                  $("#cx-chat-index-" + urlIndex + " .cx-message-text").html(null);
                  let saysomething = ` `;
                  $("#cx-chat-index-" + urlIndex + " .cx-message-text").html(saysomething);
                  $("#cx-chat-index-" + urlIndex + "").remove();
                }, 40);
              }

              if (typeof messages === "string" && messages.includes("#FAsurveyButton")) {
                const urlIndex = e.data.messages[i].index;
                setTimeout(() => {
                  $("#cx-chat-index-" + urlIndex + " .cx-message-text").html(null);
                  let saysomething = ` `;
                  $("#cx-chat-index-" + urlIndex + " .cx-message-text").html(saysomething);
                  $("#cx-chat-index-" + urlIndex + "").remove();
                  surveyButton()
                }, 40);
              }

              if (typeof messages === "string" && messages.includes("#FApolicycontactDetailsset")) {
                policyName = messages.split('#')[0].split(',')[0];
                policyNumber = messages.split('#')[0].split(',')[1];
                policyEmail = messages.split('#')[0].split(',')[2];
                policyDeparture = formatDepartureDate(messages.split('#')[0].split(',')[3].split('T')[0]);
                const urlIndex = e.data.messages[i].index;
                setTimeout(() => {
                  $("#cx-chat-index-" + urlIndex + " .cx-message-text").html(null);
                  let saysomething = ` `;
                  $("#cx-chat-index-" + urlIndex + " .cx-message-text").html(saysomething);
                  $("#cx-chat-index-" + urlIndex + "").remove();
                }, 40);
              }


              // Invalid Inputs
              if (typeof messages === "string" && messages.includes("#FANobookingcontinueReselect")) {
                let split = messages.split("#")[0];
                let uploadreselecttransferIndex = e.data.messages[i].index;

                setTimeout(() => {
                  $("#cx-chat-index-" + uploadreselecttransferIndex + " .cx-message-text").html(null);
                  let saysomething = split;
                  $("#cx-chat-index-" + uploadreselecttransferIndex + " .cx-message-text").html(saysomething);
                  }, 40);

                FAbuttonUrlParserReselect(split, e.data.messages[i].index).then(
                  (data) => {
                    FAbuttonUrlSenderReselect(data).then(() => {});
                  }
                );
               }

               if (typeof messages === "string" && messages.includes("#FAviewpolicyReselect")) {
                let split = messages.split("#")[0];
                let uploadreselecttransferIndex = e.data.messages[i].index;

                setTimeout(() => {
                  $("#cx-chat-index-" + uploadreselecttransferIndex + " .cx-message-text").html(null);
                  let saysomething = split;
                  $("#cx-chat-index-" + uploadreselecttransferIndex + " .cx-message-text").html(saysomething);
                  }, 40);

                FAbuttonUrlParserReselect(split, e.data.messages[i].index).then(
                  (data) => {
                    FAbuttonUrlReSender(split, data, uploadreselecttransferIndex, messages).then(() => {});
                  }
                );
               }

              if (typeof messages === "string" && messages.includes("#FAdon'thavecontinueReselect")) {
                let split = messages.split("#")[0];
                let reselectIndex = e.data.messages[i].index
                let buttonList = 'YES,NO'
                dynamicButtonParserReselect(buttonList, e.data.messages[i].index, split).then(
                  (data) => {
                    dynamicButtonSenderReselect(buttonList,buttonList,reselectIndex).then(() => {});
                  }
                );
              }

              if (typeof messages === "string" && messages.includes("#FAsomethingelsereselect")) {
                let split = messages.split("#")[0];
                let reselectIndex = e.data.messages[i].index
                let buttonList = 'YES,NO'
                dynamicButtonParserReselect(buttonList, e.data.messages[i].index, split).then(
                  (data) => {
                    dynamicButtonSenderReselect(buttonList,buttonList,reselectIndex).then(() => {});
                  }
                );
              }

              if (typeof messages === "string" && messages.includes("#FAtripdateorcostReselect")) {
                let split = messages.split("#")[0];
                let reselectIndex = e.data.messages[i].index
                let buttonList = 'TRIP DATE,TRIP COST'
                dynamicButtonParserReselect(buttonList, e.data.messages[i].index, split).then(
                  (data) => {
                    dynamicButtonSenderReselect(buttonList,buttonList,reselectIndex).then(() => {});
                  }
                );
              }

              if (typeof messages === "string" && messages.includes("#FAIntentreselect")) {
                let split = messages.split("#")[0];
                let reselectIndex = e.data.messages[i].index
                let buttonList = 'TRIP CANCELLATION COVERAGE,REQUEST PREMIUM REFUND,POLICY MODIFICATION'
                dynamicButtonParserReselect(buttonList, e.data.messages[i].index, split).then(
                  (data) => {
                    dynamicButtonSenderReselect(buttonList,buttonList,reselectIndex).then(() => {});
                  }
                );
              }

              if (typeof messages === "string" && messages.includes("#FAnothingelseReselect")) {
                let split = messages.split("#")[0];
                let reselectIndex = e.data.messages[i].index
                let buttonList = 'READ POLICY DOCUMENT,FILE A CLAIM,NOTHING ELSE TODAY,GO BACK TO MAIN MENU'
                dynamicButtonParserReselect(buttonList, e.data.messages[i].index, split).then(
                  (data) => {
                    dynamicButtonSenderReselect(buttonList,buttonList,reselectIndex).then(() => {});
                  }
                );
              }

              if (typeof messages === "string" && messages.includes("#FAmodifypolicyReselect")) {
                let split = messages.split("#")[0];
                let reselectIndex = e.data.messages[i].index
                let buttonList = `SPELLING CORRECTION,DATE OF BIRTH,BENEFICIARY,TRAVEL DATE/COST,GO BACK TO MAIN MENU`
                dynamicButtonParserReselect(buttonList, e.data.messages[i].index, split).then(
                  (data) => {
                    dynamicButtonSenderReselect(buttonList,buttonList,reselectIndex).then(() => {});
                  }
                );
              }

              if (typeof messages === "string" && messages.includes("#FAtryagainreselect")) {
                let split = messages.split("#")[0];
                let reselectIndex = e.data.messages[i].index
                let buttonList = `TRY AGAIN`
                dynamicButtonParserReselect(buttonList, e.data.messages[i].index, split).then(
                  (data) => {
                    dynamicButtonSenderReselect(buttonList,buttonList,reselectIndex).then(() => {});
                  }
                );
              }

              if (typeof messages === "string" && messages.includes("#FAagentreselectreselect")) {
                let split = messages.split("#")[0];
                let reselectIndex = e.data.messages[i].index
                let buttonList = `CONNECT WITH A LIVE CHAT AGENT,NOTHING ELSE FOR TODAY`
                dynamicButtonParserReselect(buttonList, e.data.messages[i].index, split).then(
                  (data) => {
                    dynamicButtonSenderReselect(buttonList,buttonList,reselectIndex).then(() => {});
                  }
                );
              }

              if (typeof messages === "string" && messages.includes("#FAtrylaterreselect")) {
                let split = messages.split("#")[0];
                let reselectIndex = e.data.messages[i].index
                let buttonList = `CONNECT WITH A LIVE CHAT AGENT,TRY AGAIN LATER`
                dynamicButtonParserReselect(buttonList, e.data.messages[i].index, split).then(
                  (data) => {
                    dynamicButtonSenderReselect(buttonList,buttonList,reselectIndex).then(() => {});
                  }
                );
              }

              if (typeof messages === "string" && messages.includes("#FANamecollectionReselect")) {
                let split = messages.split("#")[0];
                let reselectIndex = e.data.messages[i].index
                let buttonList = `NAME,ADDRESS`
                dynamicButtonParserReselect(buttonList, e.data.messages[i].index, split).then(
                  (data) => {
                    dynamicButtonSenderReselect(buttonList,buttonList,reselectIndex).then(() => {});
                  }
                );
              }

              if (typeof messages === "string" && messages.includes("#FArefundsubmitReselect")) {
                let split = messages.split("#")[0];
                let reselectIndex = e.data.messages[i].index
                let buttonList = `SUBMIT REQUEST,NEED FURTHER ASSISTANCE,NOTHING ELSE TODAY,GO BACK TO MAIN MENU`
                dynamicButtonParserReselect(buttonList, e.data.messages[i].index, split).then(
                  (data) => {
                    dynamicButtonSenderReselect(buttonList,buttonList,reselectIndex).then(() => {});
                  }
                );
              }

              if (typeof messages === "string" && messages.includes("#FAAddresscollectionReselect")) {
                let split = messages.split("#")[0];
                let reselectIndex = e.data.messages[i].index
                let buttonList = `CORRECTION ONLY,COMPLETE CHANGE`
                dynamicButtonParserReselect(buttonList, e.data.messages[i].index, split).then(
                  (data) => {
                    dynamicButtonSenderReselect(buttonList,buttonList,reselectIndex).then(() => {});
                  }
                );
              }

              if (typeof messages === "string" && messages.includes("#FAcontinuereselect")) {
                let split = messages.split("#")[0];
                let reselectIndex = e.data.messages[i].index
                let buttonList = `CONTINUE`
                dynamicButtonParserReselect(buttonList, e.data.messages[i].index, split).then(
                  (data) => {
                    dynamicButtonSenderReselect(buttonList,buttonList,reselectIndex).then(() => {});
                  }
                );
              }

              if (typeof messages === "string" && messages.includes("#FAneedassistancereselect")) {
                let split = messages.split("#")[0];
                let reselectIndex = e.data.messages[i].index
                let buttonList = `NEED FURTHER ASSISTANCE,NOTHING ELSE TODAY`
                dynamicButtonParserReselect(buttonList, e.data.messages[i].index, split).then(
                  (data) => {
                    dynamicButtonSenderReselect(buttonList,buttonList,reselectIndex).then(() => {});
                  }
                );
              }

              if (typeof messages === "string" && messages.includes("#FAfileclaimtransferreselect")) {
                let split = messages.split("#")[0];
                var dynamicIndex = e.data.messages[i].index;
        
                buttonUrlReParser(split, e.data.messages[i].index).then(
                  (data) => {
                    buttonUrlReSender(data, dynamicIndex).then(() => {});
                  }
                );        
              }

              //Airlines
              if (typeof messages === "string" && messages.includes("#AirlinepolicyCoverage")) {
                let addressIndex = e.data.messages[i].index;
                let split = messages.split("#")[0]
                setTimeout(() => {
                  $("#cx-chat-index-" + addressIndex + " .cx-message-text").html(null);
                  let saysomething = ` `;
                  $("#cx-chat-index-" + addressIndex + " .cx-message-text").html(saysomething);
                }, 30);
                inputPolicyCoverage(split, e.data.messages[i].index)
              }
          
              if (typeof messages === "string" && messages.includes("#AirlinepolicyContactDetails")) {
                let split = messages.split("#")[0];
                let visitUrlIndex = e.data.messages[i].index;
                setTimeout(() => {
                $("#cx-chat-index-" + visitUrlIndex + " .cx-message-text").html(null);
                let saysomething = split;
                $("#cx-chat-index-" + visitUrlIndex + " .cx-message-text").html(saysomething);
                }, 40);
                inputPolicyContactDetailsParser(e.data.messages[i].index).then(
                  (data) => {
                    inputPolicyContactDetailsSender(data, visitUrlIndex).then(() => {});
                  }
                );
                }
          
              if (typeof messages === "string" && messages.includes("#Airlinenewline") || typeof messages === "string" && messages.includes("#CCnewline")) {
                let split = messages.split("#")[0];
                let visitUrlIndex = e.data.messages[i].index;
                document.documentElement.setAttribute('data-source', 'TG');
                setTimeout(() => {
                  $("#cx-chat-index-" + visitUrlIndex + " .cx-message-text").html(null);
                  let saysomething = split;
                  $("#cx-chat-index-" + visitUrlIndex + " .cx-message-text").html(saysomething);
                }, 40);
                }
          
                if (typeof messages === "string" && messages.includes("#Airlineauthentication")) {
                  let split = messages.split("#")[0];
                  let addressIndex = e.data.messages[i].index;
                  var oneFrame = e.data.messages[i].index;
                  setTimeout(() => {
                    $("#cx-chat-index-" + addressIndex + " .cx-message-text").html(null);
                    $("#cx-chat-index-" + oneFrame + ".cx-message.cx-them .cx-bubble").css("cssText", "margin-top: -23px !important");
                  }, 30);
                  inputBookingAuthenticationParser(e.data.messages[i].index).then(
                    (data) => {
                      inputBookingAuthenticationSender(data, addressIndex).then(() => {});
                    }
                  );
                }
          
                if (typeof messages === "string" && messages.includes("#AirlineNameCorrection")) {
                  let split = messages.split("#")[0];
                  let addressIndex = e.data.messages[i].index;
                  var oneFrame = e.data.messages[i].index;
                  setTimeout(() => {
                    $("#cx-chat-index-" + addressIndex + " .cx-message-text").html(null);
                    $("#cx-chat-index-" + oneFrame + ".cx-message.cx-them .cx-bubble").css("cssText", "margin-top: -23px !important");
                  }, 30);
                  inputPolicyModificationNameParser(e.data.messages[i].index).then(
                    (data) => {
                      inputPolicyModificationNameSender(data, addressIndex).then(() => {});
                    }
                  );
                }
          
                if (typeof messages === "string" && messages.includes("#AirlineChangeinName")) {
                  let split = messages.split("#")[0];
                  let addressIndex = e.data.messages[i].index;
                  var oneFrame = e.data.messages[i].index;
                  setTimeout(() => {
                    $("#cx-chat-index-" + addressIndex + " .cx-message-text").html(null);
                    $("#cx-chat-index-" + oneFrame + ".cx-message.cx-them .cx-bubble").css("cssText", "margin-top: -23px !important");
                  }, 30);
                  inputPolicyModificationNameParser(e.data.messages[i].index).then(
                    (data) => {
                      inputPolicyModificationNameSender(data, addressIndex).then(() => {});
                    }
                  );
                }
          
                if (typeof messages === "string" && messages.includes("#AirlineChangeDOB")) {
                  let split = messages.split("#")[0];
                  let addressIndex = e.data.messages[i].index;
                  var oneFrame = e.data.messages[i].index;
                  setTimeout(() => {
                    $("#cx-chat-index-" + addressIndex + " .cx-message-text").html(
                      null
                    );
                    $("#cx-chat-index-" + oneFrame + ".cx-message.cx-them .cx-bubble").css("cssText", "margin-top: -23px !important");
                  }, 30);
                  inputPolicyModificationDateBirthParser(e.data.messages[i].index).then(
                    (data) => {
                      inputPolicyModificationDateBirthSender(data, addressIndex).then(() => {});
                    }
                  );
                }
          
                if (typeof messages === "string" && messages.includes("#AirlineAddressCorrection")) {
                  let split = messages.split("#")[0];
                  let addressIndex = e.data.messages[i].index;
                  var oneFrame = e.data.messages[i].index;
                  setTimeout(() => {
                    $("#cx-chat-index-" + addressIndex + " .cx-message-text").html(null);
                    $("#cx-chat-index-" + oneFrame + ".cx-message.cx-them .cx-bubble").css("cssText", "margin-top: -23px !important");
                  }, 30);
                  inputPolicyModificationAddressParser(e.data.messages[i].index).then(
                    (data) => {
                      inputPolicyModificationAddressSender(data, addressIndex).then(() => {});
                    }
                  );
                }
          
                if (typeof messages === "string" && messages.includes("#AirlineChangeinAddress")) {
                  let split = messages.split("#")[0];
                  let addressIndex = e.data.messages[i].index;
                  var oneFrame = e.data.messages[i].index;
                  setTimeout(() => {
                    $("#cx-chat-index-" + addressIndex + " .cx-message-text").html(
                      null
                    );
                    $("#cx-chat-index-" + oneFrame + ".cx-message.cx-them .cx-bubble").css("cssText", "margin-top: -23px !important");
                  }, 30);
                  inputPolicyModificationAddressParser(e.data.messages[i].index).then(
                    (data) => {
                      inputPolicyModificationAddressSender(data, addressIndex).then(() => {});
                    }
                  );
                }
          
                if (typeof messages === "string" && messages.includes("#AirlineChangeinTripDate")) {
                  let split = messages.split("#")[0];
                  let addressIndex = e.data.messages[i].index;
                  var oneFrame = e.data.messages[i].index;
                  setTimeout(() => {
                    $("#cx-chat-index-" + addressIndex + " .cx-message-text").html(
                      null
                    );
                    $("#cx-chat-index-" + oneFrame + ".cx-message.cx-them .cx-bubble").css("cssText", "margin-top: -23px !important");
                  }, 30);
                  inputPolicyModificationTripDateParser(e.data.messages[i].index).then(
                    (data) => {
                      inputPolicyModificationTripDateSender(data, addressIndex).then(() => {});
                    }
                  );
                }
          
                if (typeof messages === "string" && messages.includes("#AirlineTripCost")) {
                  let split = messages.split("#")[0];
                  let addressIndex = e.data.messages[i].index;
                  var oneFrame = e.data.messages[i].index;
                  setTimeout(() => {
                    $("#cx-chat-index-" + addressIndex + " .cx-message-text").html(
                      null
                    );
                    $("#cx-chat-index-" + oneFrame + ".cx-message.cx-them .cx-bubble").css("cssText", "margin-top: -23px !important");
                  }, 30);
                  inputPolicyModificationTripCostParser(e.data.messages[i].index).then(
                    (data) => {
                      inputPolicyModificationTripCostSender(data, addressIndex).then(() => {});
                    }
                  );
                }
          
                if (typeof messages === "string" && messages.includes("#Airlinebeneficiary")) {
                  let split = messages.split("#")[0];
                  let addressIndex = e.data.messages[i].index;
                  var oneFrame = e.data.messages[i].index;
                  setTimeout(() => {
                    $("#cx-chat-index-" + addressIndex + " .cx-message-text").html(null);
                    $("#cx-chat-index-" + oneFrame + ".cx-message.cx-them .cx-bubble").css("cssText", "margin-top: -23px !important");
                  }, 30);
                  inputPolicyModificationBeneficiaryParser(e.data.messages[i].index).then(
                    (data) => {
                      inputPolicyModificationBeneficiarySender(data, addressIndex).then(() => {});
                    }
                  );
                }
          
                if (typeof messages === "string" && messages.includes("#Airlinecallbackdetails")) {
                  let split = messages.split("#")[0];
                  let addressIndex = e.data.messages[i].index;
                  var oneFrame = e.data.messages[i].index;
                  setTimeout(() => {
                    $("#cx-chat-index-" + addressIndex + " .cx-message-text").html(null);
                    $("#cx-chat-index-" + oneFrame + ".cx-message.cx-them .cx-bubble").css("cssText", "margin-top: -23px !important");
                  }, 30);
                  inputCallbackDetailsParser(e.data.messages[i].index).then(
                    (data) => {
                      inputCallbackDetailsSender(data, addressIndex).then(() => {});
                    }
                  );
                }
                
                if (typeof messages === "string" && messages.includes("#AirlinedynamicButtonsUrl")) {
                  letDisableButton = true;
                  let split = messages.split("#")[0];
                  var dynamicIndex = e.data.messages[i].index;
                  var oneFrame = e.data.messages[i].index;
                  setTimeout(() => {
                    $("#cx-chat-index-" + oneFrame + ".cx-message.cx-them .cx-bubble").css("cssText", "margin-top: -23px !important");
                  }, 30);
                  FAbuttonUrlParser(split, e.data.messages[i].index).then(
                    (data) => {
                      FAbuttonUrlSender(split, data, dynamicIndex, messages).then(
                        () => {}
                      );
                    }
                  );
                }
                
                if (typeof messages === "string" && messages.includes("#AirlinedynamicButtons")) {
                    letDisableButton = true;
                    let split = messages.split("#")[0];
                    var dynamicIndex = e.data.messages[i].index;
                    var oneFrame = e.data.messages[i].index;
                    setTimeout(() => {
                      $(
                        "#cx-chat-index-" + oneFrame + ".cx-message.cx-them .cx-bubble"
                      ).css("cssText", "margin-top: -23px !important");
                    }, 30);
                    dynamicButtonParser(split, e.data.messages[i].index).then(
                      (data) => {
                        dynamicButtonSender(split, data, dynamicIndex).then(
                          () => {}
                        );
                      }
                    );
                  }
          
                  if (typeof messages === "string" && messages.indexOf("#AirlineyesnoButtons") !== -1) {
                    typing = true;
                    letDisableButton = true;
                    let split = messages.split("#")[0];
                    var dynamicIndex = e.data.messages[i].index;
                    var oneFrame = e.data.messages[i].index;
                    setTimeout(() => {
                      $("#cx-chat-index-" + oneFrame + ".cx-message.cx-them .cx-bubble").css("cssText", "margin-top: -23px !important");
                    }, 30);
                    dynamicButtonParser(split, e.data.messages[i].index).then(
                      (data) => {
                        dynamicButtonSender(split, data, dynamicIndex).then(
                          () => {}
                        );
                      }
                    );
                  }
          
                  if (typeof messages === "string" && messages.includes("#Airlinelastnamechange")) {
                    let split = messages.split("#")[0];
                    let addressIndex = e.data.messages[i].index;
                    var oneFrame = e.data.messages[i].index;
                    setTimeout(() => {
                      $("#cx-chat-index-" + addressIndex + " .cx-message-text").html(null);
                      $("#cx-chat-index-" + oneFrame + ".cx-message.cx-them .cx-bubble").css("cssText", "margin-top: -23px !important");
                    }, 30);
                    inputChangeLastnameParser(e.data.messages[i].index).then(
                      (data) => {
                        inputChangeLastnameSender(data, addressIndex).then(() => {});
                      }
                    );
                  }
                  if (typeof messages === "string" && messages.indexOf("#AirlinedynamicPipeButtons") !== -1 || typeof messages === "string" && messages.indexOf("#CCdynamicpipebuttons") !== -1) {
                        letDisableButton = true;
                        typing = false;
                        let split = messages.split("#")[0];
                        var dynamicIndex = e.data.messages[i].index;
                        var oneFrame = e.data.messages[i].index;
                        setTimeout(() => {
                          $("#cx-chat-index-" + oneFrame + ".cx-message.cx-them .cx-bubble").css("cssText", "margin-top: -23px !important");
                        }, 30);
                        dynamicButtonPipeParser(split, e.data.messages[i].index).then(
                          (data) => {
                            dynamicButtonPipeSender(split, data, dynamicIndex).then(
                              () => {}
                            );
                          }
                        );
                      }
          
                  if (typeof messages === "string" && messages.includes("#AirlinedynamicUrl")) {
                    dynamicUrl = messages.split("#")[0];
                    const urlIndex = e.data.messages[i].index;
                    setTimeout(() => {
                      $("#cx-chat-index-" + urlIndex + " .cx-message-text").html(null);
                      let saysomething = ` `;
                      $("#cx-chat-index-" + urlIndex + " .cx-message-text").html(saysomething);
                      $("#cx-chat-index-" + urlIndex + "").remove();
                    }, 40);
                  }
    
                  if (typeof messages === "string" && messages.includes("#AirlinesurveyButton")) {
                    const urlIndex = e.data.messages[i].index;
                    setTimeout(() => {
                      $("#cx-chat-index-" + urlIndex + " .cx-message-text").html(null);
                      let saysomething = ` `;
                      $("#cx-chat-index-" + urlIndex + " .cx-message-text").html(saysomething);
                      $("#cx-chat-index-" + urlIndex + "").remove();
                      surveyButton()
                    }, 40);
                  }
    
                  if (typeof messages === "string" && messages.includes("#FApolicycontactDetailsset")) {
                    policyName = messages.split('#')[0].split(',')[0];
                    policyNumber = messages.split('#')[0].split(',')[1];
                    policyEmail = messages.split('#')[0].split(',')[2];
                    policyDeparture = formatDepartureDate(messages.split('#')[0].split(',')[3].split('T')[0]);
                    const urlIndex = e.data.messages[i].index;
                    setTimeout(() => {
                      $("#cx-chat-index-" + urlIndex + " .cx-message-text").html(null);
                      let saysomething = ` `;
                      $("#cx-chat-index-" + urlIndex + " .cx-message-text").html(saysomething);
                      $("#cx-chat-index-" + urlIndex + "").remove();
                    }, 40);
                  }
          
          
              // Invalid Inputs
              if (typeof messages === "string" && messages.includes("#AirlineNobookingcontinueReselect")) {
                let split = messages.split("#")[0];
                let uploadreselecttransferIndex = e.data.messages[i].index;

                setTimeout(() => {
                  $("#cx-chat-index-" + uploadreselecttransferIndex + " .cx-message-text").html(null);
                  let saysomething = split;
                  $("#cx-chat-index-" + uploadreselecttransferIndex + " .cx-message-text").html(saysomething);
                  }, 40);

                FAbuttonUrlParserReselect(split, e.data.messages[i].index).then(
                  (data) => {
                    FAbuttonUrlSenderReselect(data).then(() => {});
                  }
                );
                }

                if (typeof messages === "string" && messages.includes("#AirlineviewpolicyReselect")) {
                let split = messages.split("#")[0];
                let uploadreselecttransferIndex = e.data.messages[i].index;

                setTimeout(() => {
                  $("#cx-chat-index-" + uploadreselecttransferIndex + " .cx-message-text").html(null);
                  let saysomething = split;
                  $("#cx-chat-index-" + uploadreselecttransferIndex + " .cx-message-text").html(saysomething);
                  }, 40);

                FAbuttonUrlParserReselect(split, e.data.messages[i].index).then(
                  (data) => {
                    FAbuttonUrlSenderReselect(data).then(() => {});
                  }
                );
                }

              if (typeof messages === "string" && messages.includes("#Airlinedon'thavecontinueReselect")) {
                let split = messages.split("#")[0];
                let reselectIndex = e.data.messages[i].index
                let buttonList = 'YES,NO'
                dynamicButtonParserReselect(buttonList, e.data.messages[i].index, split).then(
                  (data) => {
                    dynamicButtonSenderReselect(buttonList,buttonList,reselectIndex).then(() => {});
                  }
                );
              }

              if (typeof messages === "string" && messages.includes("#Airlinesomethingelsereselect")) {
                let split = messages.split("#")[0];
                let reselectIndex = e.data.messages[i].index
                let buttonList = 'YES,NO'
                dynamicButtonParserReselect(buttonList, e.data.messages[i].index, split).then(
                  (data) => {
                    dynamicButtonSenderReselect(buttonList,buttonList,reselectIndex).then(() => {});
                  }
                );
              }

              if (typeof messages === "string" && messages.includes("#AirlinetripdateorcostReselect")) {
                let split = messages.split("#")[0];
                let reselectIndex = e.data.messages[i].index
                let buttonList = 'TRIP DATE,TRIP COST'
                dynamicButtonParserReselect(buttonList, e.data.messages[i].index, split).then(
                  (data) => {
                    dynamicButtonSenderReselect(buttonList,buttonList,reselectIndex).then(() => {});
                  }
                );
              }

              if (typeof messages === "string" && messages.includes("#AirlineIntentreselect")) {
                let split = messages.split("#")[0];
                let reselectIndex = e.data.messages[i].index
                let buttonList = 'TRIP CANCELLATION COVERAGE,REQUEST PREMIUM REFUND,POLICY MODIFICATION,SOMETHING ELSE'
                dynamicButtonParserReselect(buttonList, e.data.messages[i].index, split).then(
                  (data) => {
                    dynamicButtonSenderReselect(buttonList,buttonList,reselectIndex).then(() => {});
                  }
                );
              }

              if (typeof messages === "string" && messages.includes("#AirlinenothingelseReselect")) {
                let split = messages.split("#")[0];
                let reselectIndex = e.data.messages[i].index
                let buttonList = 'READ POLICY DOCUMENT,FILE A CLAIM,NEED FURTHER ASSISTANCE,NOTHING ELSE TODAY,GO BACK TO MAIN MENU'
                dynamicButtonParserReselect(buttonList, e.data.messages[i].index, split).then(
                  (data) => {
                    dynamicButtonSenderReselect(buttonList,buttonList,reselectIndex).then(() => {});
                  }
                );
              }

              if (typeof messages === "string" && messages.includes("#AirlinemodifypolicyReselect")) {
                let split = messages.split("#")[0];
                let reselectIndex = e.data.messages[i].index
                let buttonList = `SPELLING CORRECTION,DATE OF BIRTH,BENEFICIARY,TRAVEL DATE/COST,GO BACK TO MAIN MENU`
                dynamicButtonParserReselect(buttonList, e.data.messages[i].index, split).then(
                  (data) => {
                    dynamicButtonSenderReselect(buttonList,buttonList,reselectIndex).then(() => {});
                  }
                );
              }

              if (typeof messages === "string" && messages.includes("#Airlinetryagainreselect")) {
                let split = messages.split("#")[0];
                let reselectIndex = e.data.messages[i].index
                let buttonList = `TRY AGAIN`
                dynamicButtonParserReselect(buttonList, e.data.messages[i].index, split).then(
                  (data) => {
                    dynamicButtonSenderReselect(buttonList,buttonList,reselectIndex).then(() => {});
                  }
                );
              }

              if (typeof messages === "string" && messages.includes("#Airlineagentreselectreselect")) {
                let split = messages.split("#")[0];
                let reselectIndex = e.data.messages[i].index
                let buttonList = `CONNECT WITH A LIVE CHAT AGENT,NOTHING ELSE FOR TODAY`
                dynamicButtonParserReselect(buttonList, e.data.messages[i].index, split).then(
                  (data) => {
                    dynamicButtonSenderReselect(buttonList,buttonList,reselectIndex).then(() => {});
                  }
                );
              }

              if (typeof messages === "string" && messages.includes("#Airlinetrylaterreselect")) {
                let split = messages.split("#")[0];
                let reselectIndex = e.data.messages[i].index
                let buttonList = `CONNECT WITH A LIVE CHAT AGENT,TRY AGAIN LATER`
                dynamicButtonParserReselect(buttonList, e.data.messages[i].index, split).then(
                  (data) => {
                    dynamicButtonSenderReselect(buttonList,buttonList,reselectIndex).then(() => {});
                  }
                );
              }

              if (typeof messages === "string" && messages.includes("#AirlineNamecollectionReselect")) {
                let split = messages.split("#")[0];
                let reselectIndex = e.data.messages[i].index
                let buttonList = `NAME,ADDRESS`
                dynamicButtonParserReselect(buttonList, e.data.messages[i].index, split).then(
                  (data) => {
                    dynamicButtonSenderReselect(buttonList,buttonList,reselectIndex).then(() => {});
                  }
                );
              }

              if (typeof messages === "string" && messages.includes("#AirlinerefundsubmitReselect")) {
                let split = messages.split("#")[0];
                let reselectIndex = e.data.messages[i].index
                let buttonList = `SUBMIT REQUEST,NEED FURTHER ASSISTANCE,NOTHING ELSE TODAY,GO BACK TO MAIN MENU`
                dynamicButtonParserReselect(buttonList, e.data.messages[i].index, split).then(
                  (data) => {
                    dynamicButtonSenderReselect(buttonList,buttonList,reselectIndex).then(() => {});
                  }
                );
              }

              if (typeof messages === "string" && messages.includes("#AirlineAddresscollectionReselect")) {
                let split = messages.split("#")[0];
                let reselectIndex = e.data.messages[i].index
                let buttonList = `CORRECTION ONLY,COMPLETE CHANGE`
                dynamicButtonParserReselect(buttonList, e.data.messages[i].index, split).then(
                  (data) => {
                    dynamicButtonSenderReselect(buttonList,buttonList,reselectIndex).then(() => {});
                  }
                );
              }

              if (typeof messages === "string" && messages.includes("#Airlinecontinuereselect")) {
                let split = messages.split("#")[0];
                let reselectIndex = e.data.messages[i].index
                let buttonList = `CONTINUE`
                dynamicButtonParserReselect(buttonList, e.data.messages[i].index, split).then(
                  (data) => {
                    dynamicButtonSenderReselect(buttonList,buttonList,reselectIndex).then(() => {});
                  }
                );
              }

              if (typeof messages === "string" && messages.includes("#Airlineneedassistancereselect")) {
                let split = messages.split("#")[0];
                let reselectIndex = e.data.messages[i].index
                let buttonList = `NEED FURTHER ASSISTANCE,NOTHING ELSE TODAY`
                dynamicButtonParserReselect(buttonList, e.data.messages[i].index, split).then(
                  (data) => {
                    dynamicButtonSenderReselect(buttonList,buttonList,reselectIndex).then(() => {});
                  }
                );
              }

              if (typeof messages === "string" && messages.includes("#Airlinefileclaimtransferreselect")) {
                let split = messages.split("#")[0];
                var dynamicIndex = e.data.messages[i].index;
        
                buttonUrlReParser(split, e.data.messages[i].index).then(
                  (data) => {
                    buttonUrlReSender(data, dynamicIndex).then(() => {});
                  }
                );        
              }
        break;
    }
  }
});

plugin.subscribe("WebChatService.ready", function (e) {});

plugin.subscribe("WebChat.minimized", function (e) {
  $(".icon-maximize").css("display", "block");
  $(".icon-minimize").css("display", "none");
  if (!chatEnded) { $("body .cx-subtitle").show(); }
});
plugin.subscribe("WebChat.unminimized", function (e) {
  $(".icon-maximize").css("display", "none");
  $(".icon-minimize").css("display", "block");
  if (!chatEnded) { $("body .cx-subtitle").hide(); }
});

// <!-- Additional Mindful Feedback code to show the web survey: -->
let conversation_id = localStorage.getItem('sdx_genesys_conversation_id');

plugin.subscribe("WebChatService.started", function (e) {
  conversation_id = e.data.data.conversationId;
  localStorage.setItem('sdx_genesys_conversation_id', conversation_id);
  addWindowControl();
  chatEnded = false;
  timeoutMessage();
  inProgress();
  firstLoad = true;
  typing = false;
  timeOutChat = 1;
  hideAdaptivecard = false;
  showTimeout = false;
  numbersOnly = false;
  letDisableButton = true;
  showResponse = false;
  findClaimResponse  = false;
  $(document).unbind();
  isUrlUpload = false;
  yesPleaseUpload = false;
  

  $(".cx-common-container .cx-titlebar").on("keyup click", function (e) {
    if ($(".cx-icon.cx-button-minimize").attr("aria-label") == "Live Chat Minimize") {
    } else {
     // customPlugin.command("WebChat.minimize", getAdvancedConfig());
    }
  });

  $(".cx-icon.cx-button-minimize").on("keyup click", function (e) {
    if (
      $(".cx-icon.cx-button-minimize").attr("aria-label") ==
      "Live Chat Minimize"
    ) {
      if (!chatEnded) {
        $("body .cx-subtitle").show();
      }
    } else {
      $("body .cx-subtitle").hide();
    }
  });
  $(".cx-icon.cx-button-close").on("keyup click", function (e) {
    $("body .cx-subtitle").hide();
  });

  $(".cx-send").on("keyup click", function (e) {
    if (letDisableButton) {
      $(`body .cx-btn-primary`).prop("disabled", true);
      $(`body .cx-widget input`).prop("disabled", true);
      $(`body .cx-widget select`).prop("disabled", true);
      $(`body .cx-btn-primary`).css("pointer-events", "none");
    }
    // camTyping();

    firstLoad = false;

  });
  $(".cx-btn-primary").on("click", function (e) {
    removeTimeoutMessage();   
    timeoutMessage();
    $("body .timeoutChat1").remove();
    $("body .timeoutChat2").remove();
  });

  $(".cx-input-container").on("keyup", (e) => {
    if (e.keyCode === 13) {
      // camTyping();
      //removeTimeoutMessage();
      if (letDisableButton) {
      //  $(`body .cx-btn-primary`).prop("disabled", true);
        $(`body .cx-widget input`).prop("disabled", true);
        $(`body .cx-widget select`).prop("disabled", true);
       // $(`body .cx-btn-primary`).css("pointer-events", "none");
        setTimeout(() => {
      }, 500);
      }
    }
  });
});

plugin.subscribe("WebChatService.ended", function (e) {
  surveyButton()
  console.log("Chat ended", e);
  showTimeout = false;
  chatEnded = true;
  typing = false;
  firstLoad = true;
  firstLoadOnlyOnce = true;
  $(`body .typing`).remove();
  $(`body .cx-btn-primary`).prop("disabled", true);
  $(`body .cx-widget input`).prop("disabled", true);
  $(`body .cx-widget select`).prop("disabled", true);
  $(`body .cx-widget textarea`).prop("disabled", true);
  $(`body .cx-btn-primary`).css("pointer-events", "none");
  $("body #eye").css("pointer-events", "none");
  $("body #eyeSecCode").css("pointer-events", "none");
  removeTimeoutMessage();
  $(`.icon-close`).css("display", "none");
  setTimeout(() => {
    timeOutChat = 0;
    clearInterval(deleteTimers);
  }, 5000);
});

plugin.command("WebChatService.sendMessage", function (e) {console.log("Chat sendMessage", e);});
plugin.subscribe("WebChatService.clientTypingStopped", function (e) {});
plugin.subscribe("WebChatService.agentConnected", function (e) {
  typing = true;
  agentConnectTrue = true;
});
plugin.subscribe("WebChatService.agentDisconnected", function (e) { typing = false; });

function camTypingMessage() {
  setTimeout(() => {
    $("body .typing").remove();
    if (firstLoad) {
      // $(`body .cx-transcript`).append(

      //   "<div class='typing' style='position: absolute;float: left;font-size: 10px;clear: both;width: 100%;display: block;top:630px;color: #888'>Cam is typing...</div>"
      // );
      //$(`body .cx-transcript`).scrollTop( 9999999999)
    } else {
      if(/iPhone|Mac|iPad|iPod/i.test(navigator.userAgent)){
       // document.querySelector('body .cx-transcript').style.setProperty("height", "65vh", "important");
       document.querySelector('body .cx-transcript').style.setProperty("max-height", "667px", "important");
      }else if (/Android/i.test(navigator.userAgent)){
          // document.querySelector('body .cx-transcript').style.setProperty("height", "65vh", "important");
          document.querySelector('body .cx-transcript').style.setProperty("max-height", "667px", "important");
      }
      $(`body .cx-transcript`).append(`<div class='typing' style='position: relative;float: left;font-size: 10px;clear: both;width: 100%;display: block;bottom: 0;color: #888'>${chatBotName} is typing...</div>`);
      $(`body .cx-transcript`).scrollTop(9999999999);
    }
  }, 50);
}
function camTyping() {
  // removeTimeoutMessage();
  // setTimeout(() => {

  if (typing === false) {
    camTypingMessage();
  }
  // }, 500);
}

function resetTimer() {
  console.log("--------------------- RESET TIMER")
  removeTimeoutMessage();
  timeoutMessage();
  $("body .timeoutChat1").remove();
  $("body .timeoutChat2").remove();

}

function timeoutMessage() {
  if (chatEnded == true) {
    return;
  }
  setTimeout(() => {
    deleteTimers = setInterval(function () {
      if (timeOutChat == idleTime1) { // 5 minutes
        $("body .timeoutChat1").remove();
        console.log('Are you still there?')
        $(`body .cx-transcript`).append(`<center><div class='timeoutChat1' style='position: relative;float: center;clear: both;width: 100%;display: block;top: 5px;color: #1352de; font-weight: bold'>${idleTimeMessage1}</div><center>`);
        $(`body .cx-transcript`).scrollTop(9999999999);
        //customPlugin.command("WebChat.endChat", getAdvancedConfig());
      } else if (timeOutChat == idleTime2) { //8 minutes
        $("body .timeoutChat2").remove();
        console.log('Your session will timeout in two minutes.')
        $(`body .cx-transcript`).append(`<center><div class='timeoutChat2' style='position: relative;float: center;clear: both;width: 100%;display: block;top: 5px;color: #1352de; font-weight: bold'>${idleTimeMessage2}</div><center>`);
        $(`body .cx-transcript`).scrollTop(9999999999);
      } else if (timeOutChat == idleTime3) { // 10 minutes
        console.log('Chat Ending due to Inactivity')
        customPlugin.command("WebChat.endChat", getAdvancedConfig());
      }
   timeOutChat++;
    }, 1000);
  }, 2000);
  $("body .timeoutChat1").remove();
  $("body .timeoutChat2").remove();
  timeOutChat = 1;
  clearInterval(deleteTimers);
}

function removeTimeoutMessage() {
  setTimeout(() => {
    timeOutChat = 1;
    clearInterval(deleteTimers);
  }, 2000);
}

var customPlugin = CXBus.registerPlugin("Custom");
function getAdvancedConfig() {
  return {
    form: {
      autoSubmit: true,
    },
  };
}

// var proActive = setTimeout(() => {
//   customPlugin.command("WebChat.open", getAdvancedConfig());
//   clearTimeout(proActive);
// }, 1000);

window.addEventListener('resize', reportWindowSize);

$(document).ready(function () {
  clearCookiesHandler()
  customPlugin.command("WebChat.open", getAdvancedConfig());
});