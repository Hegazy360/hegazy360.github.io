// JavaScript Document
//npm run watch-js
//browser-sync start --server --files "**"
amazon = require('amazon-product-api');
var client = amazon.createClient({
  awsId: "AKIAI5TZ5OVGKOGKXM6Q",
  awsSecret: "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",
  awsTag: "shoppiassi01a-21"
});



var clientInput;
var chatWindow;
var possibilities = ['Reply1\n\t', 'Reply2\n\t', 'Reply3\n\t'];
var reply;


window.searchKeyPress = function(e) {
  // look for window.event in case event isn't passed in
  e = e || window.event;
  if (e.keyCode == 13 && document.getElementById("client").value.match(/^.*(?=.*[a-zA-Z]).*$/)) {
    document.getElementById('send').click();
    return false;
  } else if (document.getElementById("client").value.match(/^\n/i)) {
    document.getElementById("client").value = "";
  }

  return true;
}

window.confirm = function() {
  if (document.getElementById("client").value.match(/^.*(?=.*[a-zA-Z]).*$/)) {
    clic();
  }


}


window.clic = function() {
  var tableName;
  var color;
  var type;
  var size;
  document.getElementById("searchResults").innerHTML = '';
  clientInput = document.getElementById("client").value;
  document.getElementById("client").value = "";
  chatWindow = document.getElementById("assisstant");

  var findMain = clientInput.match(/pants|pantalon|shoes|shoe/i);

  if (/pants|pantalon/i.test(findMain)) {

    searchTerms("pants","","Men","");
    possibilities = ['So you are looking for new pants,one second', 'On it!', 'Looking for your pants right now'];
    changeInterface();
  } else if (/shoes|shoe/i.test(findMain)) {
    searchTerms("shoes","","Men","");
    possibilities = ['So you are looking for new shoes,one second', 'On it!', 'Looking for your shoes right now'];
    changeInterface();
  } else {
    possibilities = ['Sorry,I don\'t have what you\'re looking for', 'I didn\'t understant'];
    changeInterface();
  }
}

window.changeInterface = function() {
  reply = possibilities[Math.floor(Math.random() * possibilities.length)];
  chatWindow.value = (chatWindow.value + "Client : " + clientInput + "\n\t");
  chatWindow.value = (chatWindow.value + "Assisstant : " + reply + "\n\t");
  chatWindow.scrollTop = chatWindow.scrollHeight;
}

window.searchTerms = function(main,type,sex,color){
      client.itemSearch({
        keywords: main + ' ' + color,
        searchIndex: 'Fashion' + sex,
        responseGroup: 'ItemAttributes,Offers,Images'
      }, function(err, results, response) {
        if (err) {
          console.log(err);
          chatWindow.value = (chatWindow.value + "Assisstant : " + "Sorry,I couldn't find what you are looking for" + "\n\t");
        } else {
          console.log(results); // products
          console.log(results.length);
          console.log(response); // response (containing TotalPages, TotalResults, MoreSearchResultsUrl and so on)
          displayResults(results, response);
          chatWindow.value = (chatWindow.value + "Assisstant : " + "Did you find what you were looking for ?" + "\n\t");
        }
      });
}


window.displayResults = function(items, response) {
  var container = "";
  for (var i = 0; i < items.length; i++) {
    console.log(i);

    if (typeof items[i].MediumImage != 'undefined') {
      container += "<div class=\"product-box\">";
      container += "<a target=\"_blank\" href=\"" + items[i].DetailPageURL[0] + "\"><img src=\"" + items[i].MediumImage[0].URL[0] + "\" width=\"120\" height=\"160\"></a>";
      container += "<div class=\"product-title\"><h3>" + items[i].ItemAttributes[0].Title[0] + "</h3></div>";
      container += "<p class=\"product-price\">" + items[i].OfferSummary[0].LowestNewPrice[0].FormattedPrice[0] + "<br><a target=\"_blank\" style=\"color: #337ab7; text-decoration:none;\" href=\"" + items[i].Offers[0].MoreOffersUrl[0] + "\"> More offers </a></p>";
      container += "<div><span class=\"a-button a-button-primary\"><a target=\"_blank\" href=\"" + items[i].DetailPageURL[0] + "\"style=\"text-decoration:none\">";
      container += "<span class=\"a-button-inner\"><img src=\"http://ddjax94hptnew.cloudfront.net/assets/images/Amazon-Favicon-64x64.png\" class=\"a-icon a-icon-shop-now\"><input class=\"a-button-input\" type=\"submit\" value=\"Add to cart\"><span class=\"a-button-text\">Shop Now</span></span>";
      container += "</span></div>";
      container += "</div>";
      document.getElementById("searchResults").innerHTML = container;
    } else {
      container += "<div class=\"product-box\">";
      container += "<a target=\"_blank\" href=\"" + items[i].DetailPageURL[0] + "\"><img src=\"" + "http://ddjax94hptnew.cloudfront.net/assets/images/amazon-no-image.jpg" + "\" width=\"120\" height=\"160\"></a>";
      container += "<div class=\"product-title\"><h3>" + items[i].ItemAttributes[0].Title[0] + "</h3></div>";
      container += "<p class=\"product-price\">" + items[i].OfferSummary[0].LowestNewPrice[0].FormattedPrice[0] + "<br><a target=\"_blank\" style=\"color: #337ab7; text-decoration:none;\" href=\"" + items[i].Offers[0].MoreOffersUrl[0] + "\"> More offers </a></p>";
      container += "<div><span class=\"a-button a-button-primary\"><a target=\"_blank\" href=\"" + items[i].DetailPageURL[0] + "\"style=\"text-decoration:none\">";
      container += "<span class=\"a-button-inner\"><img src=\"http://ddjax94hptnew.cloudfront.net/assets/images/Amazon-Favicon-64x64.png\" class=\"a-icon a-icon-shop-now\"><input class=\"a-button-input\" type=\"submit\" value=\"Add to cart\"><span class=\"a-button-text\">Shop Now</span></span>";
      container += "</span></div>";
      container += "</div>";
      document.getElementById("searchResults").innerHTML = container;
    }
  }

}
