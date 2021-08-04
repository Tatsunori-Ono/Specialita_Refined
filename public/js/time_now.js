var now = new Date();

// Date
function realdate() {
  var Year = now.getFullYear();
  var Month = now.getMonth(); 
  var Day = now.getDate();
  var Day_day = now.getDay();
  
  var day = new Array("Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday");
  var month = new Array("January","February","March","April","May","June","July","August","September","October","November","December");
  
  if (Day == 1) Day = Day + "st".sup(); 
  else if (Day == 2) Day = Day + "nd".sup();
  else if (Day == 3) Day = Day + "rd".sup();
  else Day = Day + "th".sup();
 
  var date = month[Month]+" "+Day+", "+Year+" "+"("+day[Day_day]+")";
  
  document.getElementById("RealDate").innerHTML = date;
}
setInterval('realdate()',1000);

// 桁数が1桁だったら先頭に0を加えて2桁に調整する
function set2fig(num) {
   var ret;
   if( num < 10 ) { 
       ret = "0" + num;
   }else{ 
       ret = num;
   }
   return ret;
}

// Time
function realtime() {
   var nowTime = new Date();
   var nowHour = set2fig( nowTime.getHours() );
   var nowMin  = set2fig( nowTime.getMinutes() );
   var nowSec  = set2fig( nowTime.getSeconds() );
   
   var time = nowHour + ":" + nowMin + ":" + nowSec;
   
   document.getElementById("RealtimeClock").innerHTML = time;
}
setInterval('realtime()',1000);