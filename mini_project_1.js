 let inputslider = document.querySelector("#dataLengthSlider");
 const lengthDisplay = document.querySelector("#dataLengthNumber");
 const PasswordDisplay = document.querySelector(".display");
 const copybtn = document.querySelector("[data-copy]");
 const copymsg  = document.querySelector("[data-copyMsg]");
 const uppercase = document.querySelector("#uppercase");
 const lowercase = document.querySelector("#lowercase");
 const number = document.querySelector("#numbers");
 const symbol = document.querySelector("#symbols");
 const indicator = document.querySelector("#indicator");
 const genbutton = document.querySelector(".Generate-button");
 const allcheck = document.querySelectorAll("input[type=checkbox]");
 const sym = "!#$%&'()*+,-./:;<=>?@[\\]^_`{|}~"

 let password ="";
 let passwordlength =10;
 let checkcount =0;
 handleSlider();

 function handleSlider(){
    inputslider.value = passwordlength;
    lengthDisplay.innerText = passwordlength;
    

 }

 
function  setIndicator(color){
   indicator.style.backgroundColor = color;
}

function getRndInteger(min,max){
   return Math.floor(Math.random()*(max - min))+min;
}

function getRandomNumber(){
   return getRndInteger(0,9);
}

function getlowercase(){
   return String.fromCharCode(getRndInteger(97,123));
}

function getuppercase(){
   return String.fromCharCode(getRndInteger(65,91));
}

function getsymbols(){
   const rndnum = getRndInteger(0,sym.length);
   return sym.charAt(rndnum);
}


function calcStrength() {
   let hasUpper = false;
   let hasLower = false;
   let hasNum = false;
   let hasSym = false;
   if (uppercase.checked) hasUpper = true;
   if (lowercase.checked) hasLower = true;
   if (number.checked) hasNum = true;
   if (symbol.checked) hasSym = true;
 
   if (hasUpper && hasLower && (hasNum || hasSym) &&  passwordlength >= 8) {
     setIndicator("#0f0");
   } else if (
     (hasLower || hasUpper) &&
     (hasNum || hasSym) &&
     passwordlength >= 6
   ) {
     setIndicator("#ff0");
   } else {
     setIndicator("#f00");
   }
}

async function copyContent() {
   try {
       await navigator.clipboard.writeText(PasswordDisplay.value);
       copymsg.innerText = "copied";
   }
   catch(e) {
       copymsg.innerText = "Failed";
   }
   //to make copy wala span visible
   copymsg.classList.add("active");

   setTimeout( () => {
       copymsg.classList.remove("active");
   },2000);

}


function shufflePassword(array) {
   //Fisher Yates Method
   for (let i = array.length - 1; i > 0; i--) {
       const j = Math.floor(Math.random() * (i + 1));
       const temp = array[i];
       array[i] = array[j];
       array[j] = temp;
     }
   let str = "";
   array.forEach((el) => (str += el));
   return str;
}

function handlecheckboxchange(){
   checkcount = 0;
   allcheck.forEach((checkbox)=>{
      if(checkbox.checked){
         checkcount++;
      }
   });

   if(passwordlength<checkcount){
      passwordlength = checkcount;
      handleSlider();
   }
}

allcheck.forEach((checkbox) => {
   checkbox.addEventListener('change',handlecheckboxchange);
});

inputslider.addEventListener('input',(e)=>{
   passwordlength = e.target.value;
   handleSlider();
})

copybtn.addEventListener('click',()=>{
   if(PasswordDisplay.value)
      copyContent();
})

genbutton.addEventListener('click',()=>{
   if(checkcount<=0) 
      return;
   
   if(passwordlength < checkcount){
      passwordlength = checkcount;
      handleSlider();
   }

   password = "";

   let funArr = [];
   if(uppercase.checked)
      funArr.push(getuppercase);

   if(lowercase.checked)
      funArr.push(getlowercase);

   if(number.checked)
      funArr.push(getRandomNumber);

   if(symbol.checked)
      funArr.push(getsymbols);

   for(let i=0;i<funArr.length;i++){
      password += funArr[i]();
   }
   console.log("compuslory addition");

   for(let i=0;i<passwordlength - funArr.length;i++){
      let radIndex = getRndInteger(0,funArr.length);
      password += funArr[radIndex](); 
   }
 console.log("remening additiin");
   password = shufflePassword(Array.from(password));
   console.log("remening additiin2");

   PasswordDisplay.value = password;
   console.log("remening additiin3");
   calcStrength();

});

