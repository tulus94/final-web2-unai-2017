$(function() {
    var decodeHtml = function(html) {
    var txt = document.createElement("textarea");
    txt.innerHTML = html;
    return txt.value;
  }
 

var currentQuote = '', currentAuthor = '';
function openURL(url){
  window.open(url, 'Share', 'width=550, height=400, toolbar=0, scrollbars=1 ,location=0 ,statusbar=0,menubar=0, resizable=0');
}
  
  
  var setHeight = function() {
    var viewHeight = $(window).height();
    var naturalHeight = $(".container").outerHeight();
    if ( naturalHeight > viewHeight ) {
      $(".container").css("height", "auto");
    } else {
      $(".container").css("height", viewHeight + "px");
    }
  }
  
  // Searching Chuck Norris API from google.
  var getQuote = function() {
    $.getJSON('https://api.icndb.com/jokes/random', function(data) {
      var quote = data.value.joke;
      var decoded_quote = decodeHtml(quote);
      $(".quote h3").animate({opacity: 0}, 400,
        function(){
          $(this).animate({opacity: 1}, 400);
          $(this).html(quote);
        });
    $(".twitter").attr("href", "https://twitter.com/intent/tweet?text=" + encodeURIComponent(decoded_quote) + "&hashtags=quote-Chuck-Norris");
    });
  }
  
  setHeight();
  getQuote();
  
  $(".newquote").click(function(e) {
    e.preventDefault();
    getQuote();
  });
  
  $(window).resize(function() {
    setHeight();
  });
});