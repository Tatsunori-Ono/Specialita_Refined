// Timer
var startTimerButton = document.querySelector('.startTimer');
var pauseTimerButton = document.querySelector('.pauseTimer');
var timerDisplay = document.querySelector('.timer');
var total_time_display = document.querySelector('.total_timer');
var startTime;
var updatedTime;
var difference;
var tInterval;
var savedTime;
var paused = 0;
var running = 0;
var total_time = 0;
//Selector
var selector_chosen = document.querySelector('#selectSubject');
var selector_chosen_subject;
//Selector function that activates whenever the value changes
selector_chosen.addEventListener('change', (event) => {
  selector_chosen_subject = event.target.value;
  // console.log(event.target.value);
  
  // Subject Selection
  let selector = document.querySelector('#selectSubject');
  
  //Ajax to send selected subject and get total_time of that subject from the database
  //Also, I am adding here system of sending sp_image path
  $.ajax("/total_time",{
    type:"POST",
    dataType:"json",
    data: {
        "subject": selector.value
    }
  }).done(function(response){
    // console.log(response)
    // console.log(response['subject'])
    // console.log(response['total_time'])
    total_time = response['total_time'];
    ShowTotalTime();
    // UpdateSpImage();
  });
  
});

//validates whether inside a variable is empty or not
function isEmpty(obj){
  return !Object.keys(obj).length;
}

function startTimer() {
  if(!running && !isEmpty(selector_chosen_subject)) {
    startTime = new Date().getTime();
    tInterval = setInterval(getShowTime, 1);
    paused = 0;
    running = 1;
  } else if (isEmpty(selector_chosen_subject)) {
    //do not start timer until the subject is chosen
    console.log('please choose the subject first');
  } else {
    //do not start timer again if it is already running
  }
}

function pauseTimer() {
  if (!difference) {
    // if timer never started, don't allow pause button to do anything
  } else if (!paused) {
    clearInterval(tInterval);
    savedTime = difference;
    paused = 1;
    running = 0;
  } else {
    startTimer();
  }
}

function resetTimer() {
  if (running) {
    paused = 0;
    running = 0;
  } else if (paused) {
    total_time = total_time + savedTime;
    ShowTotalTime();
    clearInterval(tInterval);
    savedTime = 0;
    difference = 0;
    paused = 0;
    running = 0;
    document.querySelector('.timer').innerHTML = 'Start Studying!';
  } else if (isEmpty(selector_chosen_subject)) {
    //do not allow to save time if the subject is not chosen
    console.log("please choose the subject first");
  } else {
    total_time = total_time + savedTime;
    ShowTotalTime();
    savedTime = 0;
  }
}

function getShowTime() {
  updatedTime = new Date().getTime();
  if (savedTime){
    difference = (updatedTime - startTime) + savedTime;
  } else {
    difference =  updatedTime - startTime;
  }
  
  var hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  var minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
  var seconds = Math.floor((difference % (1000 * 60)) / 1000);
  var milliseconds = Math.floor((difference % (1000 * 60)) / 100);

  hours = (hours < 10) ? "0" + hours : hours;
  minutes = (minutes < 10) ? "0" + minutes : minutes;
  seconds = (seconds < 10) ? "0" + seconds : seconds;
  milliseconds = (milliseconds < 100) ? (milliseconds < 10) ? "00" + milliseconds : "0" + milliseconds : milliseconds;
  document.querySelector('.timer').innerHTML = hours + ':' + minutes + ':' + seconds + ':' + milliseconds;
}

function ShowTotalTime() {
  var thours = Math.floor((total_time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  var tminutes = Math.floor((total_time % (1000 * 60 * 60)) / (1000 * 60));
  var tseconds = Math.floor((total_time% (1000 * 60)) / 1000);
  var tmilliseconds = Math.floor((total_time % (1000 * 60)) / 100);
    
  thours = (thours < 10) ? "0" + thours : thours;
  tminutes = (tminutes < 10) ? "0" + tminutes : tminutes;
  tseconds = (tseconds < 10) ? "0" + tseconds : tseconds;
  tmilliseconds = (tmilliseconds < 100) ? (tmilliseconds < 10) ? "00" + tmilliseconds : "0" + tmilliseconds : tmilliseconds;
  
  document.querySelector('.total_timer').innerHTML = 'Total Time: ' + thours + ':' + tminutes + ':' + tseconds + ':' + tmilliseconds;
  
  // Subject Selection
  let selector = document.querySelector('#selectSubject');
  
  //Ajax to send the subject and its total_time to the database
  $.ajax("/home",{
    type:"POST",
    dataType:"json",
    data: {
        "subject": selector.value,
        "total_time": total_time
    }
  }).done(function(){
    console.log("sent");
  // }).fail(function (jqXHR, textStatus, errorThrown) {
  //   alert('error');
  });
}

function UpdateSpImage() {
  //SelectorでSubjectを変えた際にsp_image更新される！
  document.querySelector('.update_sp_image').innerHTML = "<img src= \"<%= current_user.user_sp_images.order(id: \"DESC\").first.record.image %>\">";
  // console.log("<img src= \"<%= current_user.user_sp_images.order(id: \"DESC\").first.record.image %>\">");
}