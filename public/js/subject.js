// もう使っていない、セレクトが変わったら更新するシステム
// Ajaxを一括で送りたいからやめた

// let selector = document.querySelector('#selectSubject');
// selector.addEventListener('change', (event) => {
// //   console.log(event.target.value);
//   $.ajax("/home",{
//     type:"POST",
//     dataType:"json",
//     data: {
//         "subject": event.target.value
//     }
//   }).done(function(){
//     console.log("sent subject")
//   // }).fail(function (jqXHR, textStatus, errorThrown) {
//   //   alert('error');
//   });
// });