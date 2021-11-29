console.log("post");

//hide parameter box initially
let parametersBox = document.getElementById("parametersBox");
parametersBox.style.display = "none";

//parameter clicked, then hide json
let paramRadio = document.getElementById("paramRadio");
paramRadio.addEventListener("click", () => {
  document.getElementById("jsonReq").style.display = "none";
  document.getElementById("parametersBox").style.display = "block";
});

//json clicked, then hide parameter
let jsonRadio = document.getElementById("jsonRadio");
jsonRadio.addEventListener("click", () => {
  document.getElementById("jsonReq").style.display = "block";
  document.getElementById("parametersBox").style.display = "none";
});

//function to create string to dom
function strToDom(string) {
  let div = document.createElement("div");
  div.innerHTML = string;
  return div.firstElementChild;
}

//if clicked on + button add more parameter
let count = 2;
let addParam = document.getElementById("addBtn");
  addParam.addEventListener("click", () => {
    let moreparam = document.getElementById("moreparam");
    let string = `<div class="row g-3 my-2 ">
                        <label for="url" class="col-sm-2 col-form-label">Parameter ${count}</label>
                        <div class="col-sm">
                            <input type="text" class="form-control " placeholder="parameter key" id="paramKey ${count}">
                        </div>
                        <div class="col-sm">
                            <input type="text" class="form-control " placeholder="parameter value" id="aramVal ${count}">
                            </div>
                            <button class="btn btn-primary removeParam">-</button>                 
                    </div>`;

    let convertToDom = strToDom(string);
    moreparam.appendChild(convertToDom);

    //add an event to remove parameter on clicking -
    let removeParam = document.getElementsByClassName("removeParam");
    for (item of removeParam) {
      item.addEventListener("click", (e) => {
        e.target.parentElement.remove();
      });
    }
    count++;
  });


//clicked on submit button
let submit = document.getElementById("submit");
submit.addEventListener("click", () => {
  //wait
  document.getElementById("jsonResponse").value = "Please wait!!";

  //fetching values user has enter
  let url = document.getElementById("url").value;
  let requestType = document.querySelector(
    'input[name="requestType"]:checked'
  ).value;
  let ContantType = document.querySelector(
    'input[name="contantType"]:checked'
  ).value;

  //if parameter clicked , store every data in obj
  if (ContantType == "paramRadio") {
    data = {};
    for (let i = 0; i < count + 1; i++) {
      if (document.getElementById('paramKey' + (i + 1)) != undefined) {
        let key = document.getElementById('paramKey' + (i + 1)).value; 
        let value = document.getElementById('paramVal' + (i + 1)).value;
        data[key] = value;
      }
    }
    data = JSON.stringify(data);
  } else {
    data = document.getElementById("jsonReqarea").value;
  }

  console.log("url is: " , url);
  console.log("requestType is: ", requestType);
  console.log("ContantType is: ", ContantType);
  console.log("data is: ", data);

  // if req type get , invoke fetch api to create get request
  if(requestType == 'GET'){
    fetch(url, { 
      method: 'GET',
    })
    .then(response=> response.text())
    .then((text) =>{
      document.getElementById('jsonResponse').value = text;
    });
  }
  else{
    fetch(url, {
      method: 'POST',
      body: data,
      headers: {
        "Content-type": "application/json;  charset=UTF-8"
      }
    })
    .then(response=> response.text())
    .then((text) =>{
      document.getElementById('jsonResponse').innerHTML = text;
    });
  }


});
