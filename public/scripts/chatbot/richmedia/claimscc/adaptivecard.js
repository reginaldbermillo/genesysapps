async function engineGenerator(index, tag) {
  await htmlwrpper(index).then((data) => {
    setTimeout(() => {
      switch (tag) {
        case "inputText":
          inputText(index).then((htmlTag) => {
            $(`body ${data}`).append(htmlTag);
          });
      }
    }, 40);
  });
}
async function htmlwrpper(index) {
  var html = `<div id='form-${index}'</div>`;
  await setTimeout(() => {
    $("#cx-chat-index-" + index + " .cx-message-text").append(html);
  }, 40);
  return `#form-${index}`;
}

async function radioCard(toArray, index, label) {
  var html = `<label class='form-label' style='font-size: 14px;margin-bottom: 5px;position: relative; font-weight: 400;'>${label}</label><br><br><br>
         
`;

  var split = toArray.split("|");
  var optionBuilder = "";
  var top = 0;
  await _.forEach(split, (data) => {
    let value = data.trim();
    optionBuilder += `<div class='label-wrapper' style='margin-top: -${top}px; top: -15px!important;'>
    <label class="radio-inline radio-item" >
      <input type="radio" class='radioInput' id='optradio${index}' name="optradio${index}" value='${value}'><span></span>${value}
      
    </label>
    </div><br><br>
    
    
    `;
    top += 20;
  });
  html += optionBuilder;
  html += `</div>`;

  return html;
}

