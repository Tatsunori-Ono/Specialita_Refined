//Selector
var selector_chosen = document.querySelector('#selectBackground');
var selector_chosen_background;
var bg_path;

function ShowBackground() {
    var correct_bg_path;
    // 最初の./public/の部分は邪魔だから前頭だけを空白に置き換える
    correct_bg_path = bg_path.replace('./public/', '')
    document.querySelector('.background_preview').innerHTML = "<img src="+correct_bg_path+">";
}

//Selector function that activates whenever the value changes
selector_chosen.addEventListener('change', (event) => {
  selector_chosen_background = event.target.value;
  
  // Subject Selection
  let selector = document.querySelector('#selectBackground');
  
  $.ajax("/background",{
    type:"POST",
    dataType:"json",
    data: {
        "bg_name": selector.value
    }
  }).done(function(response){
    // console.log(response);
    bg_path = response['bg_image'];
    ShowBackground();
  });
  
});