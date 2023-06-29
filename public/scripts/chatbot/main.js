/**********************************************************************/



let widgetversion = "v1.0"


/**********************************************************************/


var deleteTimers;
var firstLoad = true;
var typing = false;
var chatEnded = false;
let timeOutChat = 1;
var hideAdaptivecard = false;
let missingMessageLoad = 0;
var showTimeout = false;
var numbersOnly = false;
let plugin = CXBus.registerPlugin("TestExtension");
let frameLoaded = false;
let iframe;
let invalidCard = true;
let enabledDates = [];
let enabledDatesObj;
let dateArray = [];
let futureDates = false;
var firstLoadOnlyOnce = false;
var symptomsList;
var botTime;
var timeStarted, expireTime;
var convid;
let submitBtn1, submitBtn2;
let productSubmitted = false;
let symptomsSubmitted = false;
let phoneTypeSubmitted = false;
var letDisableButton = true;
let productSection = false;
let symptomsSection = false;
let phoneTypeSection = false;
let tkid, cskey; 
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
        "dataURL": "https://api.mypurecloud.com",
        "deploymentKey": "54b29c0e-3349-47d4-b59d-383b9bbe023a",
        "orgGuid": "ad4fc484-e0f4-44e8-95fc-7a610731d98e",
        "interactionData": {
          "routing": {
            "targetType": "QUEUE",
            "targetAddress": "Language_Translate_Dev",
            "priority": 2
          },
        },
      },
      userData: {
        convid: getUrlParams(),
      },
    },
  },
};
console.log("%cWarranty Version " + widgetversion, "color: Blue;");
//console.log = function(){};
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

    // if (typeof messages === "string" && messages.includes("#welcome")) {
    //   const removeIndex = e.data.messages[i].index;
    //   setTimeout(() => {
    //     $("#cx-chat-index-" + removeIndex + " .cx-message-text").html(null);
    //     let saysomething = ` `;
    //     $("#cx-chat-index-" + removeIndex + " .cx-message-text").html(saysomething);
    //     $("#cx-chat-index-" + removeIndex + "").remove();
    //   }, 40);
    // }

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
            // $("div").remove(".cx-message-group");
          }, 30);
  
          break;
  
        case "DISLIKE":
          const indexdisLike = e.data.messages[i].index;
          setTimeout(() => {
            $("#cx-chat-index-" + indexdisLike + " .cx-message-text").html(null);
            let saysomething = ` `;
            $("#cx-chat-index-" + indexdisLike + " .cx-message-text").html(
              saysomething
            );
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
        
        
        if (
          typeof messages === "string" &&
          messages.includes("#sessiontimeout")
          ) {
            if (messages && e.data.messages[i].from.type == "Bot") {
 
          
            let split = messages.split("#")[0];
            let sessiontimeoutIndex = e.data.messages[i].index;
            setTimeout(() => {
            $("#cx-chat-index-" + sessiontimeoutIndex + " .cx-message-text").html(
            null
            );
            let saysomething = split;
            $("#cx-chat-index-" + sessiontimeoutIndex + " .cx-message-text").html(
            saysomething
            );
            }, 40);
            // $('.cx-message.cx-system').css('visibility', 'visible') 

            // $('.cx-message.cx-system[data-message="Chat Started"]').css( { transition: "transform 0.5s",
            //       transform:  "rotate(360deg)" } );
            // $('.cx-message.cx-system[data-message="Chat Started"]').toggleClass("expireIcon");


          }
        }

        if (
          typeof messages === "string" &&
          messages.includes("#pleaseVisit")
          ) {
            // $('.cx-message.cx-system').css('visibility', 'visible') 
            // $('.cx-message.cx-system[data-message="Chat Started"]').toggleClass("notExpireIcon");
      

          let split = messages.split("#")[0];
          let visitUrlIndex = e.data.messages[i].index;
          document.documentElement.setAttribute('data-source', 'AIG');

          setTimeout(() => {
          $("#cx-chat-index-" + visitUrlIndex + " .cx-message-text").html(
          null
          );
          let saysomething = split;
          $("#cx-chat-index-" + visitUrlIndex + " .cx-message-text").html(
          saysomething
          );
          }, 40);
          
          }
          if (
            typeof messages === "string" &&
            messages.includes("#newline")
            ) {
              // $('.cx-message.cx-system').css('visibility', 'visible') 
              // $('.cx-message.cx-system[data-message="Chat Started"]').toggleClass("notExpireIcon");
        
  
            let split = messages.split("#")[0];
            let visitUrlIndex = e.data.messages[i].index;
            setTimeout(() => {
            $("#cx-chat-index-" + visitUrlIndex + " .cx-message-text").html(
            null
            );
            let saysomething = split;
            $("#cx-chat-index-" + visitUrlIndex + " .cx-message-text").html(
            saysomething
            );
            }, 40);
            
            }



        
          if (
            typeof messages === "string" &&
            messages.includes("#clientClaimStatus")
            ) {
            let split = messages.split("#")[0];
            let status = split.split(":")[1].split("Next")[0];
            let checkOpenDone = status.includes("Claim Received") || status.includes("claim received") || status.includes("CLAIM RECEIVED") || status.includes("Claim received") || status.includes("claim Received") ?  true : false
            let checkProcessDone = status.includes("New") || status.includes("NEW") || status.includes("new") || status.includes("Open") || status.includes("open") || status.includes("OPEN") || status.includes("Claim Reviewed") || status.includes("CLAIM REVIEWED") || status.includes("claim reviewed") || status.includes("claim Reviewed") || status.includes("Claim reviewed") ? true : false
            let checkCompletedDone = status.includes("Claim Finalized") || status.includes("claim finalized") || status.includes("Claim finalized") || status.includes("claim Finalized") || status.includes("CLAIM FINALIZED") ? true : false
            let clientClaimStatusIndex = e.data.messages[i].index;
            setTimeout(() => {
            $("#cx-chat-index-" + clientClaimStatusIndex + " .cx-message-text").html(
            null
            );
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
            $("#cx-chat-index-" + clientClaimStatusIndex + " .cx-message-text").html(
            saysomething
            );
            }, 40);
            
            }

        if (
          typeof messages === "string" &&
          messages.includes("Voice Conversation ID")
        ) {
          var hideAdaptive = e.data.messages[i].index;
          setTimeout(() => {
            $("#cx-chat-index-" + hideAdaptive + " .cx-message-text").html(
              null
            );
            let saysomething = ` `;
            $("#cx-chat-index-" + hideAdaptive + " .cx-message-text").html(
              saysomething
            );
            $("#cx-chat-index-" + hideAdaptive + "").remove();
            // $("div").remove(".cx-message-group");
          }, 30);
          hideAdaptivecard = false;

        }

        if (
          typeof messages === "string" &&
          messages.includes("CLAIMSCC")
        ) {
          var hideAdaptive = e.data.messages[i].index;
          setTimeout(() => {
            $("#cx-chat-index-" + hideAdaptive + " .cx-message-text").html(
              null
            );
            let saysomething = ` `;
            $("#cx-chat-index-" + hideAdaptive + " .cx-message-text").html(
              saysomething
            );
            $("#cx-chat-index-" + hideAdaptive + "").remove();
            // $("div").remove(".cx-message-group");
          }, 30);
          hideAdaptivecard = false;

        }


      
        if (typeof messages === "string" && messages.includes("#improvementmsg")) {
          let split = messages.split("#")[0];
         let areasDynamicindex = e.data.messages[i].index;

          setTimeout(() => {
            $("#cx-chat-index-" + areasDynamicindex + " .cx-message-text").html(
              null
            );
            let saysomething = split;
            $("#cx-chat-index-" + areasDynamicindex + " .cx-message-text").html(
              saysomething
            );
          }, 30);
          inputTextAreaofImprovementParser(e.data.messages[i].index).then(
            (data) => {
              inputTextHidevalueSender(data).then(() => {});
            }
          );

          // textAreaAutoResize();
        }


 
        if (
          typeof messages === "string" &&
          messages.includes("#chatclosedhours")
        ) {
          var hideAdaptive = e.data.messages[i].index;
          setTimeout(() => {
            $("#cx-chat-index-" + hideAdaptive + " .cx-message-text").html(
              null
            );
            const match = e.data.messages.filter(e => e.type === 'Message' && e.text.includes('Sorry') || e.text.includes('Okay'))
            let saysomething = match[0].text.split('#')[0];
            // let sundaySched = saysomething.split("Sunday");
            // let html = `${saysomething.split("Monday")[0]}<br /><br />Monday ${saysomething.split("Monday")[1]}`
            $("#cx-chat-index-" + hideAdaptive + " .cx-message-text").html(
              saysomething
            );
            $("#cx-chat-index-" + hideAdaptive + " .cx-message-text").parent().parent().removeClass();
            $("#cx-chat-index-" + hideAdaptive + " .cx-message-text").parent().parent().addClass('cx-message cx-participant cx-them cx-Bot cx-bot');
            // $("#cx-chat-index-" + hideAdaptive + " .cx-message-text").parent().prev().prev().remove();
            // $("#cx-chat-index-" + hideAdaptive + "").remove();
            // $("div").remove(".cx-message-group");
          }, 30);
          hideAdaptivecard = false;
        }

        if (
          typeof messages === "string" &&
          messages.includes("Sorry, an error occurred")
        ) {
          showTimeout = false;
          chatEnded = true;
          setTimeout(() => {
            timeOutChat = 0;
            clearInterval(deleteTimers);
          }, 5000);
        }

        if (
          typeof messages === "string" &&
          messages.includes("Please try the following before continuing")
        ) {
          var splitMessage = messages.split("\n\n");
          renderList(splitMessage, e.data.messages[i].index);
        }

        if (
          typeof messages === "string" &&
          messages.includes("Am I chatting with")
        ) {
          showTimeout = true;
          $(`body .typing`).remove();

         if(/Android|iPhone|Mac|iPad|iPod/i.test(navigator.userAgent)){

            document.querySelector('body .cx-transcript').style.setProperty("height", "50vh", "important");

            document.querySelector('body .cx-transcript').style.setProperty("max-height", "400px", "important");

          }



        }
        if (
          typeof messages === "string" &&
          messages.includes("Travel Guard's Virtual Assistant")
        ) {
          showTimeout = true;
          $(`body .typing`).remove();
         if(/Android|iPhone|Mac|iPad|iPod/i.test(navigator.userAgent)){



          }

          if(/iPhone|Mac|iPad|iPod/i.test(navigator.userAgent)){
            document.querySelector('body .cx-transcript').style.setProperty("height", "65vh", "important");

            document.querySelector('body .cx-transcript').style.setProperty("max-height", "480px", "important");

          }else if (/Android/i.test(navigator.userAgent)){
            document.querySelector('body .cx-transcript').style.setProperty("height", "62vh", "important");

            document.querySelector('body .cx-transcript').style.setProperty("max-height", "440px", "important");
          }



        }

        if (
          typeof messages === "string" &&
          messages.includes("AIG's Virtual Assistant")
        ) {
          showTimeout = true;
          $(`body .typing`).remove();
         if(/Android|iPhone|Mac|iPad|iPod/i.test(navigator.userAgent)){



          }

          if(/iPhone|Mac|iPad|iPod/i.test(navigator.userAgent)){
            document.querySelector('body .cx-transcript').style.setProperty("height", "65vh", "important");

            document.querySelector('body .cx-transcript').style.setProperty("max-height", "480px", "important");

          }else if (/Android/i.test(navigator.userAgent)){
            document.querySelector('body .cx-transcript').style.setProperty("height", "60vh", "important");

            document.querySelector('body .cx-transcript').style.setProperty("max-height", "440px", "important");
          }



        }


        
        if (
          typeof messages === "string" &&
          messages.includes("Sorry, something went wrong. Would you like to connect")
        ) {

          showTimeout = true;
          $(`body .typing`).remove();
          if (firstLoad) {

            console.log('Sorry, something went wrong')
         if(/Android|iPhone|Mac|iPad|iPod/i.test(navigator.userAgent)){

            document.querySelector('body .cx-transcript').style.setProperty("height", "43vh", "important");

            document.querySelector('body .cx-transcript').style.setProperty("max-height", "345px", "important");

          }
        }

        }

        if (
          typeof messages === "string" &&
          messages.includes("Thank you for reaching out today.")
        ) {

          firstLoad = false;
        }
        if (
          typeof messages === "string" &&
          messages.includes("Sorry, our live chat agents are currently not available")
        ) {

          firstLoad = false;

        }

        
        if (
          typeof messages === "string" &&
          messages.includes("I have located multiple plans for you.")
        ) {
          radioButtonParser(
            e.data.messages[i].text,
            e.data.messages[i].index,
            true
          ).then((data) => {
            radioSender(data).then(() => {});
          });
        }

        if (
          typeof messages === "string" &&
          messages.includes("I have found multiple claims.")
        ) {
          radioButtonTableParser(
            e.data.messages[i].text,
            e.data.messages[i].index
          ).then((data) => {
            radioSenderComma(data).then(() => {});
          });
        }
        
        if (
          typeof messages === "string" &&
          messages.includes("Thank you for your valuable feedback")
        ) {
          let feedbackImprove = e.data.messages[i].text.split(".");
          var feedbackImproveSplit = `${feedbackImprove[0]}<br>${feedbackImprove[1]}`;
          yesButtonParser(
            feedbackImproveSplit,
            e.data.messages[i].index,
            true
          ).then((data) => {
            yesNoThanksButtonSender(data).then(() => {});
          });
        }


       if (
          typeof messages === "string" &&
          messages.includes("#clientcontractnumber")
        ) {
          let split = messages.split("#")[0];
          let clientcontractDynamicindex = e.data.messages[i].index;
          setTimeout(() => {
            $(
              "#cx-chat-index-" + clientcontractDynamicindex + ".cx-message.cx-them .cx-bubble"
            ).css("cssText", "margin-top: -23px !important");
          }, 30);
          setTimeout(() => {
            $("#cx-chat-index-" + clientcontractDynamicindex + " .cx-message-text").html(
              null
            );
            let saysomething = split;
            $("#cx-chat-index-" + clientcontractDynamicindex + " .cx-message-text").html(
              saysomething
            );
          }, 30);
          inputTextClientContractNumberParser(e.data.messages[i].index).then((data) => {
            inputTextClientContractNumbersender(data).then(() => {});
          });
        }  

       if (
          typeof messages === "string" &&
          messages.includes("#nameselect")
        ) {
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
          inputTextNameParser(e.data.messages[i].index).then((data) => {
            inputTextNamesender(data).then(() => {});
          });
        }
        if (
          typeof messages === "string" &&
          messages.includes("#namereselect")
        ) {
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
          inputTextNameParser(e.data.messages[i].index).then((data) => {
            inputTextNamesender(data).then(() => {});
          });
        }


        if (
          typeof messages === "string" &&
          messages.includes("#claimlastname")
        ) {
          let split = messages.split("#")[0];
          let addressIndex = e.data.messages[i].index;
      setTimeout(() => {
            $("#cx-chat-index-" + addressIndex + " .cx-message-text").html(
              null
            );
            let saysomething = split;
            $("#cx-chat-index-" + addressIndex + " .cx-message-text").html(
              saysomething
            );
          }, 30);
          inputClaimLastnameTagParser(e.data.messages[i].index).then(
            (data) => {
              inputClaimLastnameSender(data, addressIndex).then(() => {});
            }
          );
        }

        if (
          typeof messages === "string" &&
          messages.includes("#welcome")
        ) {
          let split = messages.split("#")[0];
          let addressIndex = e.data.messages[i].index;
      setTimeout(() => {
            $("#cx-chat-index-" + addressIndex + " .cx-message-text").html(
              null
            );
            let saysomething = split;
            $("#cx-chat-index-" + addressIndex + " .cx-message-text").html(
              saysomething
            );
          }, 30);
          inputClaimLastnameTagParser(e.data.messages[i].index).then(
            (data) => {
              inputClaimLastnameSender(data, addressIndex).then(() => {});
            }
          );
        }

        

         if (
          typeof messages === "string" &&
          messages.includes("#claimlastnamereselect")
        ) {
          let split = messages.split("#")[0];
          let addressIndex = e.data.messages[i].index;
      setTimeout(() => {
            $("#cx-chat-index-" + addressIndex + " .cx-message-text").html(
              null
            );
            let saysomething = split;
            $("#cx-chat-index-" + addressIndex + " .cx-message-text").html(
              saysomething
            );
          }, 30);
          inputClaimLastnameTagParser(e.data.messages[i].index).then(
            (data) => {
              inputClaimLastnameSender(data, addressIndex).then(() => {});
            }
          );
        }


        if (
          typeof messages === "string" &&
          messages.includes("#documentStatus")
        ) {
          let split = messages.split("#")[0];
          let addressIndex = e.data.messages[i].index;
          setTimeout(() => {
            $("#cx-chat-index-" + addressIndex + " .cx-message-text").html(
              null
            );
            let saysomething = ` `;
            $("#cx-chat-index-" + addressIndex + " .cx-message-text").html(
              saysomething
            );
          }, 30);
          inputDocumentStatusTableParser(split, e.data.messages[i].index)
          // .then(
          //   (data) => {
          //     inputClaimLastnameSender(data, addressIndex).then(() => {});
          //   }
          // );
        }





        if (
          typeof messages === "string" &&
          messages.includes("#fileanewclaimtransfer")
        ) {
         letDisableButton = true;
          let split = messages.split("#")[0];
          var dynamicIndex = e.data.messages[i].index;
          var oneFrame = e.data.messages[i].index;
          setTimeout(() => {
            $(
              "#cx-chat-index-" + oneFrame + ".cx-message.cx-them .cx-bubble"
            ).css("cssText", "margin-top: -23px !important");
          }, 30);
          buttonUrlParser(split, e.data.messages[i].index).then(
            (data) => {
              buttonUrlSender(split, data, dynamicIndex, messages).then(
                () => {}
              );
            }
          );
        }

        if (
          
          typeof messages === "string" &&
          messages.includes("#fileclaimtransferreselect")
        ) {
          let split = messages.split("#")[0];
          var dynamicIndex = e.data.messages[i].index;

          buttonUrlReParser(split, e.data.messages[i].index).then(
            (data) => {
              buttonUrlReSender(data, dynamicIndex).then(() => {});
            }
          );
          
        }

        if (
          typeof messages === "string" &&
          messages.includes("#uploadtransfer")
        ) {
         letDisableButton = true;
          let split = messages.split("#")[0];
          var dynamicIndex = e.data.messages[i].index;
          var oneFrame = e.data.messages[i].index;
          setTimeout(() => {
            $(
              "#cx-chat-index-" + oneFrame + ".cx-message.cx-them .cx-bubble"
            ).css("cssText", "margin-top: -23px !important");
          }, 30);
          buttonUrlParser(split, e.data.messages[i].index).then(
            (data) => {
              uploadUrlSender(split, data, dynamicIndex).then(
                () => {}
              );
            }
          );
        }

        if (
          typeof messages === "string" &&
          messages.includes("#uploadreselecttransfer")
        ) {
          let split = messages.split("#")[0];
          let uploadreselecttransferIndex = e.data.messages[i].index;

          setTimeout(() => {
            $("#cx-chat-index-" + uploadreselecttransferIndex + " .cx-message-text").html(
            null
            );
            let saysomething = split;
            $("#cx-chat-index-" + uploadreselecttransferIndex + " .cx-message-text").html(
            saysomething
            );
            }, 40);

          uploadUrlReParser(split, e.data.messages[i].index).then(
            (data) => {
              uploadUrlReSender(data).then(() => {});
            }
          );
          
        }



        if (
          typeof messages === "string" &&
          messages.includes("#yesnoliveagent")
        ) {
          let split = messages.split("#")[0];

          yesButtonParser(split, e.data.messages[i].index).then((data) => {
            yesButtonSender(data).then(() => {});
          });
          
        }





    


       if (
          typeof messages === "string" &&
          messages.indexOf("#yesnobuttons") !== -1
        ) {

          typing = true;
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
              dynamicCategoryButtonSender(split, data, dynamicIndex).then(
                () => {}
              );
            }
          );
        }
      if (
          typeof messages === "string" &&
          messages.indexOf("#dynamicbuttons") !== -1
        ) {
         letDisableButton = true;
          let split = messages.split("#")[0];
          var dynamicIndex = e.data.messages[i].index;
          var oneFrame = e.data.messages[i].index;
          
          //firstLoad = false;

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
        if (
          typeof messages === "string" &&
          messages.indexOf("#dynamicpipebutton") !== -1
        ) {
         letDisableButton = true;
         typing = false;
          let split = messages.split("#")[0];
          var dynamicIndex = e.data.messages[i].index;
          var oneFrame = e.data.messages[i].index;


          //firstLoad = false;
          setTimeout(() => {
            $(
              "#cx-chat-index-" + oneFrame + ".cx-message.cx-them .cx-bubble"
            ).css("cssText", "margin-top: -23px !important");
          }, 30);
          dynamicButtonPipeParser(split, e.data.messages[i].index).then(
            (data) => {
              dynamicButtonPipeSender(split, data, dynamicIndex).then(
                () => {}
              );
            }
          );
        }


        

        if (
          typeof messages === "string" &&
          messages.includes("#dynamicfileaclaimurl")
        ) {
          dynamicUrl = messages.split('#')[0];
          const urlIndex = e.data.messages[i].index;
          setTimeout(() => {
            $("#cx-chat-index-" + urlIndex + " .cx-message-text").html(null);
            let saysomething = ` `;
            $("#cx-chat-index-" + urlIndex + " .cx-message-text").html(
              saysomething
            );
            $("#cx-chat-index-" + urlIndex + "").remove();
          }, 40);
        }





        if (
          typeof messages === "string" &&
          messages.includes("let me connect you to a live agent")
        ) {

          removeTimeoutMessage();        
          setTimeout(() => {
            timeOutChat = 0;
            clearInterval(deleteTimers);
          }, 5000);

        }

        if (
          typeof messages === "string" &&
          messages.includes("All our agents currently are busy at moment")
        ) {

                 
          setTimeout(() => {
            $(`body .typing`).remove();
          }, 500);

        }

        if (
          typeof messages === "string" &&
          messages.includes("For any emergency")
        ) {

                 
          setTimeout(() => {
            $(`body .typing`).remove();
          }, 500);

        }

     

        if (
          typeof messages === "string" &&
          messages.includes("#intentreselection")
        ) {
          claimButtonParser2(messages.split("#")[0], e.data.messages[i].index).then((data) => {
            claimButtonSender(data).then(() => {});
          });
        }

        if (
          typeof messages === "string" &&
          messages.includes("#reselectioncategory")
        ) {
          let split = messages.split("#")[0];
          let split2 = split.split(":")[1]
          var dynamicIndex = e.data.messages[i].index;

          dynamicCategoryButtonParser2(split, dynamicIndex).then(
            (data) => {
              dynamicCategoryButtonSender(split2, data, dynamicIndex).then(
                () => {}
              );
            }
          );
        }
     
        break;
    }
  }
});





plugin.subscribe("WebChatService.ready", function (e) {



});

plugin.subscribe("WebChat.minimized", function (e) {
  $(".icon-maximize").css("display", "block");
  $(".icon-minimize").css("display", "none");
  if (!chatEnded) {
    $("body .cx-subtitle").show();
  }
});
plugin.subscribe("WebChat.unminimized", function (e) {
  $(".icon-maximize").css("display", "none");
  $(".icon-minimize").css("display", "block");
  if (!chatEnded) {
    $("body .cx-subtitle").hide();
  }
});

plugin.subscribe("WebChatService.started", function (e) {
  addWindowControl();
  chatEnded = false;
  missingMessageLoad = 0;
  timeoutMessage();
  inProgress();
  firstLoad = true;
  typing = false;
  timeOutChat = 1;
  hideAdaptivecard = false;
  missingMessageLoad = 0;
  showTimeout = false;
  numbersOnly = false;
  frameLoaded = false
  dateArray = [];
  phoneTypeSubmitted = false;
  letDisableButton = true;
  productSection = false;
  symptomsSection = false;
  phoneTypeSection = false;
  showResponse = false;
  findClaimResponse  = false;
  $(document).unbind();
  isUrlUpload = false;
  yesPleaseUpload = false;
  

  $(".cx-common-container .cx-titlebar").on("keyup click", function (e) {
    if (
      $(".cx-icon.cx-button-minimize").attr("aria-label") ==
      "Live Chat Minimize"
    ) {
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
    // removeTimeoutMessage();   
    // timeoutMessage();
    // $("body .timeoutChat1").remove();
    // $("body .timeoutChat2").remove();
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
  console.log("Chat ended", e);
  showTimeout = false;
  chatEnded = true;
  typing = false;
  missingMessageLoad = 0;
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



plugin.command("WebChatService.sendMessage", function (e) {
  console.log("Chat sendMessage", e);
});

plugin.subscribe("WebChatService.clientTypingStopped", function (e) {});
//agents connections listener
plugin.subscribe("WebChatService.agentConnected", function (e) {
  typing = true;
});
plugin.subscribe("WebChatService.agentDisconnected", function (e) {
  typing = false;
});

/***********************************************************************************************************************************************/

/*******************************************************************************************************************/

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


      $(`body .cx-transcript`).append(

        "<div class='typing' style='position: relative;float: left;font-size: 10px;clear: both;width: 100%;display: block;bottom: 0;color: #888'>Mae is typing...</div>"

      );

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
      if (timeOutChat == 300) {
        $("body .timeoutChat1").remove();
        console.log('Are you still there?')

        $(`body .cx-transcript`).append(
          "<center><div class='timeoutChat1' style='position: relative;float: center;clear: both;width: 100%;display: block;top: 5px;color: #1352de; font-weight: bold'>Are you still there?</div><center>"
        );
        $(`body .cx-transcript`).scrollTop(9999999999);
        //customPlugin.command("WebChat.endChat", getAdvancedConfig());
      } else if (timeOutChat == 480) {
        $("body .timeoutChat2").remove();
        console.log('Your session will timeout in two minutes.')

        $(`body .cx-transcript`).append(
          "<center><div class='timeoutChat2' style='position: relative;float: center;clear: both;width: 100%;display: block;top: 5px;color: #1352de; font-weight: bold'>Your session will timeout in two minutes.</div><center>"
        );
        $(`body .cx-transcript`).scrollTop(9999999999);
      } else if (timeOutChat == 600) {
        console.log('Chat Ending due to Inactivity')
        customPlugin.command("WebChat.endChat", getAdvancedConfig());

        
      }

      //console.log = function(){};
   // console.log(timeOutChat++)
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



function addWindowControl() {
  $(".cx-button-group.cx-buttons-window-control").html(null);
  let htmlTag = `<div style="z-index: 99999;" class="customized-window-control">
  
  <div style="display: block; cursor: pointer; position: relative; top: 0px; left: 60%;" class="icon-close">
    <img width="16" height="16" src="../../styles/img/Close.png" />
  </div>
</div>`;

  $(`body .cx-wrapper`).append(
      `

      <div id='confirmExitId' class='confirmExit'>CONFIRM EXIT?<div>
      <div id='exitTextId' class='exitText'>Please note: The chat history will be cleared, once you exit this chat.<div>
      <br><div id='exitTextId2' class='exitText'>Are you sure you want to exit? <Yes> <No><div>

      <button id='button-confirmExitIdYes' class='button-confirmExitIdYes cx-confirmExitIdYes cx-btn cx-btn-primary i18n' style="width: 130px; position: relative;">YES</button>
      <button id='button-confirmExitIdNo' class='button-confirmExitIdNo cx-confirmExitIdNo cx-btn cx-btn-primary i18n' style="width: 130px; position: relative;">NO</button>`
   
    );

    // claimNumberInfoWindow()

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
    `
    <div class='claim-info-window'>
      <h6 class='claim-info-header'>How to find your claim number?</h6><span class="claim-info-close"><i class="fa-solid fa-xmark"></i></span>
      
    
      <p class="claim-info-text">Your claim number is a number with UC prefix that is shared with you at the time of claim notification. Please note that it’s different from your policy number

      </p>
      <p class="claim-info-text">If your claim was created online, you would have received this email from <a style="color: #1352de! important;  font-weight: bolder!important;"> AIG </a> with your claim number mentioned in the subject of the email. If your claim  was created via phone, it will be in the postal mail letter</p>
     <p class="claim-info-text">Here is an illustration on how to locate your claim number in your email

     </p>

<img class="screenShotClaim" src="./img/screenshotClaim.png">
<p class="claim-info-disclaimer">[Please note that in case you are unable to find this email, make sure to search the spam or junk folder in your mailbox]</p>


<span class="claim-info-close2"><i class="fa-solid fa-xmark"></i></span>

    <div>`
 
  );
  setTimeout(function(){
    $(".claim-info-close").click(() => {
      $(`.claim-info-window`).hide();
      $(".cx-smokescreen").hide();
      $('.cx-webchat div.cx-input-container').css("z-index", 999999);
     // document.querySelector('body .cx-transcript').style.setProperty("overflow-y", "scroll", "important");


    })
    $(".claim-info-close2").click(() => {
      $(`.claim-info-window`).hide();
      $(".cx-smokescreen").hide();
      $('.cx-webchat div.cx-input-container').css("z-index", 999999);
      //document.querySelector('body .cx-transcript').style.setProperty("overflow-y", "scroll", "important");


    })
   $(".screenShotClaim").on('click', function(){
    
   // this.requestFullscreen()
  })


  },800)
}

function windowClose() {
  window.open('','_parent','');
  window.open('','_self').close()
  
 // window.close();
}

function inProgress() {
  if (!chatEnded) {
    $(`body .cx-subtitle`).append(
      "<div class='subtitle' style='left: 14px; top: -3px; position: relative; display: block;'>- &nbsp; IN PROGRESS <div>"
    );
    $("body .cx-subtitle").hide();
  }
}

/***********************************************************************************************************************************************/

/*******************************************************************************************************************/
var customPlugin = CXBus.registerPlugin("Custom");

function getAdvancedConfig() {
  return {
    form: {
      autoSubmit: true,
    },
  };
}

var proActive = setTimeout(() => {
  customPlugin.command("WebChat.open", getAdvancedConfig());
  clearTimeout(proActive);
}, 1000);



function textAreaAutoResize() {
  setTimeout(() => {
    $(".cx-transcript textarea").on("input", function () {
      this.style.height = "auto";
      this.style.height = this.scrollHeight + "px";
    });
  }, 1000);
}




function formatPhoneNumber(val) {
  let regexPattern = /^\d{3}-\d{3}-\d{4}$/gm;
}

window.addEventListener('resize', reportWindowSize);

function reportWindowSize (event) {
  
  if(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)){
    // true for mobile device
    $('.cx-webchat div.cx-input-container').css("position", "fixed")
    $('.cx-webchat div.cx-input-container').css("bottom", "-20px")
  }else{
    // false for not mobile device
    // document.write("not mobile device");
  }
};

function clearListCookiesIOS(){
  var cookies = document.cookie.split(";");
      for (var i = 0; i < cookies.length; i++){   
          var spcook =  cookies[i].split("=");
          document.cookie = spcook[0];                                
      }
  }

  function getUrlParams(){
    const urlSearchParams = new URLSearchParams(window.location.search);
    if (urlSearchParams.has("convId")){
      return urlSearchParams.get("convId").split("/")[0]
    } else if(urlSearchParams.has("ConvId")){
      return urlSearchParams.get("ConvId").split("/")[0]
    } else if (urlSearchParams.has("Convid")) {
      return urlSearchParams.get("Convid").split("/")[0]
    } else if (urlSearchParams.has("convid")) {
      return urlSearchParams.get("convid").split("/")[0]
    } else {
      return "";

    }
  }

  
  $(document).ready(function(){
    
    if(/iPhone|Mac|iPad|iPod/i.test(navigator.userAgent)){
    clearListCookiesIOS()
    cookieStore.getAll().then(cookies => cookies.forEach(cookie => {
      cookieStore.delete('_genesys.widgets.webchat.state.purecloud-v2-sockets.ConversationID');
    }));    console.log('Mac and Iphone')
    } else {
    document.cookie = "_genesys.widgets.webchat.state.purecloud-v2-sockets.ConversationID=; path=/; domain=.accenture.com; max-age=0";
    console.log('Windows and Android')
    cookieStore.getAll().then(cookies => cookies.forEach(cookie => {
      cookieStore.delete('_genesys.widgets.webchat.state.purecloud-v2-sockets.ConversationID');
      cookieStore.delete('_genesys.widgets.webchat.state.purecloud-v2-sockets.LastMsgId');
      cookieStore.delete('_genesys.widgets.webchat.state.purecloud-v2-sockets.JWtoken');
    }));
  
  }
    })

