// $(tutorial(){
    introJs().setOptions({
    'nextLabel': "次へ/Next",
    'prevLabel': "戻る/Back",
    'doneLabel': 'Specialita!',
    'showProgress': false,
    'hidePrev': true,
    'hideNext': false,
    'disableInteraction': false,
    'exitOnEsc': false,
    'exitOnOverlayClick': false,
    'keyboardNavigation': true,
    'showStepNumbers': false
    });
    
  //   .onexit(function() {
  //   // $.cookieの中の第一引数で書き込むデータのKEY、第二引数でValue
  //   // expiresでCookieに書き込んだ値の有効期限を設定
  //   // pathで値が有効となるパスを指定
  //   $.cookie('SampleFlg', 'on', { expires: 30,path: '/' });
  // });
// });

// $(function(){ ~ });内に記述したコードは自動的に実行
// $(function(){
//   // $.cookieでCookieを読み込む
//   // `SampleFlg`というデータがonであれば、チュートリアルを呼び出す
//   if ($.cookie('SampleFlg') != 'on') {
//     tutorial();
//   }
// });