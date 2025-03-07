// all variables

let eventName = document.querySelector("#event");
let place = document.querySelector("#place");
let dateChoosen = document.querySelector("#date");

let btnAdd = document.querySelector("#btnAdd");
let id = 0;
let deletebtn = 1;

// checking localstorage status
if (localStorage.getItem("item") === null) {
  localStorage.setItem("item", JSON.stringify([]));
}
let item = JSON.parse(localStorage.getItem(`item`));

// get all data from user
function getData(a, b, c) {
  return {
    a,
    b,
    c,
  };
}

// makin a new arry for saving all dadt coming from user
let today = new Date().toLocaleDateString();
let sts = false;

// first button for add a data to storage
btnAdd.addEventListener("click", function (e) {
  if (eventName.value == "" || place.value == "" || dateChoosen.value == "") {
    alert("please enter all data");
    
  } else if (
    Date.parse(new Date(dateChoosen.value).toLocaleDateString()) >
    Date.parse(new Date().toLocaleDateString())
  ) {
    item.push(getData(eventName.value, place.value, dateChoosen.value));
    
   
    localStorage.setItem(`item`, JSON.stringify(item));
      
      

  
  } else if (
    Date.parse(new Date(dateChoosen.value).toLocaleDateString()) ==
    Date.parse(new Date().toLocaleDateString())
  ) {
    alert("please find chosen date in afetr this day");
    
  }
  
    location.reload();
  
 
  e.preventDefault();
});

let retnData = JSON.parse(localStorage.getItem(`item`));

let big = document.querySelector(".title");

big.innerHTML += `glad to inform you have ${
  retnData.length <= 0 ? "you don't have any " : retnData.length
} events till now  and today is ${new Date().toISOString().split("T")[0]}`;

let one = document.querySelector("#one");


item.forEach((element,index) => {
  let div = document.createElement("div");
  div.classList.add("col");
  let p1 = document.createElement("p");
  let p2 = document.createElement("p");
  let p3 = document.createElement("p");
  let p4 = document.createElement("p");
  let p5 = document.createElement("p");
  let btndel = document.createElement("button");
  

  btndel.innerHTML = "Delete";
  btndel.style.cssText =
    "width:100%;padding:6px;margin:10px auto;border-radius:9px;font-size:15px;font-weight:bold;text-transform:capitalize;border:none";

  //   button delete data from localestorage
  btndel.addEventListener("click", function (e) {
    let x = retnData.indexOf(retnData[this.getAttribute("value")]);
    retnData.splice(x, 1);
    console.log(retnData);
    localStorage.setItem("item", JSON.stringify(retnData));
    location.reload();
  });
  btndel.setAttribute("value", `${id++}`);

  div.appendChild(p5).style.cssText =
    "text-align:center;text-transform:capitalize;font-style:italic";
  div.appendChild(p1);
  div.appendChild(p2);
  div.appendChild(p3);
  div.appendChild(p4);
  p5.innerHTML = `event number => ${
    retnData.indexOf(retnData[btndel.getAttribute("value")]) + 1
  }`;
  p1.innerHTML = `Event By:${element.a} `;
  p2.innerHTML = ` evnet palce : ${element.b}`;
  p3.innerHTML = `the Date of event on : ${new Date(
    element.c
  ).toDateString()}`;
 let countdown = setInterval(function () {
    p4.innerHTML = diff(element.c, new Date());
  }, 1000);
  div.appendChild(btndel);

  one.appendChild(div);
  if(Date.parse(retnData[retnData.indexOf(retnData[index])].c)- Date.parse(new Date())<0){
    retnData[retnData.indexOf(retnData[index])].c
    
    retnData.splice(retnData.indexOf(retnData[index]), 1)
    localStorage.setItem("item", JSON.stringify(retnData));
  };
});

// function count the difference between to days
function diff(a, b) {
  let ms = Date.parse(a) - Date.parse(b);
  let seconds = ms / 1000; // تحويل الميلي ثانية إلى ثواني
  let minutes = seconds / 60; // تحويل الثواني إلى دقائق
  let hours = minutes / 60; // تحويل الدقائق إلى ساعات
  let days = hours / 24; // تحويل الساعات إلى أيام
  // if (ms < 0) {
  //   clearInterval(countdown);
  // }
  days = Math.floor(days);
  hours = Math.floor(hours % 24);
  minutes = Math.floor(minutes % 60);
  seconds = Math.floor(seconds % 60);
  let total = `  ${
    days == 0 ? "Aftermidnight ," : "still " + days + "Day"
  }    ${hours} hours, ${
    minutes < 10 ? "0" + minutes : minutes
  } minute, ${seconds < 10 ? "0" + seconds : seconds} sds`;
  
  return total;
}

// button for delete all data from localestorage
let deleAll = document.querySelector("[value= ck]");
deleAll.style.cssText ="padding:10px;margin:10px 20px;border-radius:9px;font-weight:bold;text-transform:capitalize;";
deleAll.addEventListener("click", function () {
  
  localStorage.removeItem("item");
  location.reload();

}  );
   
let lastend= new Date().getFullYear();

let end = document.querySelector(".copy");
let cop= document.querySelector(".cop");
end.innerHTML = `all  copy rights reserved ${cop.innerHTML} ${lastend} `;
