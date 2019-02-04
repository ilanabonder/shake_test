let mobileCheck = false;

  if(navigator.userAgent.match(/Android/i)
   || navigator.userAgent.match(/webOS/i)
   || navigator.userAgent.match(/iPhone/i)
   || navigator.userAgent.match(/iPad/i)
   || navigator.userAgent.match(/iPod/i)
   || navigator.userAgent.match(/BlackBerry/i)
   || navigator.userAgent.match(/Windows Phone/i)){
   mobileCheck = true;
  }

if (mobileCheck === true){
  createHome();
}else{
          $("body").append(" <p>this is a mobile experience only, to know more about the art of gogyōshi, please access to this webpage using your phone :) </p>");
}

function createHome(){
  $("body").append("<h2>five lines poem</h2>");
  $("body").append("<h1>gogyoshi</h1>");
  $("body").append("<button id='btn1'>start</button>");
  $("#btn1").click(function(){
      $("h2, h1, #btn1").remove();
      createIntro();
    });
}

function createIntro(){
  $("body").append("<h1>gogyōshi</h1><h2 id='intoText'></h2>");
  typeWriter();
}

var i = 0;
var txt = 'Is the freest among other Japanese five-line poetic forms. It incorporates no syllabic or line-breaks and no rhyme scheme. One of the only rules is that it must have a title. ';
var speed = 80;

function typeWriter() {
  if (i < txt.length) {
    document.getElementById("intoText").innerHTML += txt.charAt(i);
    i++;
    setTimeout(typeWriter, speed);
  }
  if (i === 165){
    setTimeout(shakePage, 3000);
    once = true;
  }
}

function shakePage(){
  $("h2, h1").remove();
  $("body").append("<img src='../img/touch/apple-touch-icon-144x144-precomposed.png' alt='Smiley face'><p>shake your phone to discover new  goyoshi poems</p>")

  listenToShake();
}

let myShakeEvent = new Shake({
    threshold: 80, // optional shake strength threshold
    timeout: 1000 // optional, determines the frequency of event generation
});

function listenToShake(){
  console.log('i am listening to the shake!')
  myShakeEvent.start()
  window.addEventListener('shake', shakeEventDidOccur, false);
//   shakeEventDidOccur();
}

let myNumbers = [];

function shakeEventDidOccur () {
  let url = 'poems.json';
  fetch(url)
  .then(response => response.json())
  .then(data => {
    console.log(data)
    let number = Math.round(Math.random()*data.length);
    if(myNumbers.includes(number)){
      number = Math.round(Math.random()*data.length);
    }else if(myNumbers.length === data.length){
      myNumbers = 0;
      number = Math.round(Math.random()*data.length);
    }else{
      $("img, p, h1, h2, h3").remove();
      $("body").append("<h1>"+ data[number].title + "</h1><h2>"+data[number].text+"</h2><h3>"+data[number].author+"</h3>");
      myNumbers.push(number);
    }
  });
}
