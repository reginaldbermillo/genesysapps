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



async function inputLastName(index, label) {
  return `
  <style='font-size: 14px;margin-bottom: 5px;position: relative'>Please provide the following information.</label>
  <br><br><style='font-size: 14px;margin-bottom: 5px;position: relative'>${label}</label>
  <br><input class='form-input-lastName' type='text' placeholder='PLEASE ENTER LAST NAME' id='input-lastName-${index}' style='width: 100%;position: relative' />`;
}




async function formSender(data, radio) {
  await $(() => {
    var split = data.split(",");

    setTimeout(() => {
      $(`body ${split[0]}`).click(() => {
        sender("SONY");
      });
      $(`body ${split[2]}`).click(() => {
        sender("MODIFY");
      });
    }, 80);
  });
  return await true;
}

async function foreachCallbackOne(array) {
  var toreturn = "";
  await _.forEach(array, (value) => {
    toreturn += $(`body ${value}`).val();
  });

  return toreturn;
}
async function foreachCallback(array) {
  var toreturn = "";
  await _.forEach(array, (value) => {
    toreturn += $(`body ${value}`).val() + ",";
  });

  return toreturn;
}

async function inputPolicyCoverage(data, index) {
  let header = data.split(':')[0] + ":";
  let splitlist = data.split(':')[1].split('•\t');
  splitlist.shift();
  let footer = data.split('.')[1];
  let optionBuilder = '';
  var html = '';
  html += `<h6 class="document-table-header">${header}</h6><table id="document-table">
              <tr>
                <th>Section</th>
                <th>Description</th>
              </tr>
            <tbody>`
  await _.forEach(splitlist, (data) => {
    let section = data.includes('–') ? data.trim().split('–')[0] : data.trim().split('-')[0];
    let description = data.includes('–') ? data.trim().split('–')[1] : data.trim().split('-')[1];
    description = description.includes('.') ? description.split('.')[0] : description;
    optionBuilder += `<tr><td>${section}</td><td>${description}</td></tr>`
  })
  html += optionBuilder;
  html += `</table><br>${footer}`
  setTimeout(() => {
    $("#cx-chat-index-" + index + " .cx-message-text").append(html);

  }, 40);
  return ``;
}