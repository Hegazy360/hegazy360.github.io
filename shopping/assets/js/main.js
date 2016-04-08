// JavaScript Document
//npm run watch-js
//browser-sync start --server --files "**"
amazon = require('amazon-product-api');
var client = amazon.createClient({
    awsId: "AKIAI5TZ5OVGKOGKXM6Q",
    awsSecret: "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",
    awsTag: "shoppiassis04-21"
});



var clientInput;
var chatWindow;
var possibilities = [];
var reply;
var waitingConfirmation;
var replyTime

// fonction dans le cas de clavier
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

var myVar;
// fonction dans le cas de souris
window.confirm = function() {
    if (document.getElementById("client").value.match(/^.*(?=.*[a-zA-Z]).*$/)) {
        clic();
    }
}


window.clic = function() {

    replyTime = (Math.floor((Math.random() * 3) + 1) / 2) * 1000; //entre 500 ms et 1500 ms
    document.getElementById("searchResults").innerHTML = '';
    clientInput = document.getElementById("client").value;
    document.getElementById("client").value = "";
    chatWindow = document.getElementById("assisstant");
    var greetingsList = ["hello", "hey", "hi", "bonjour", "bonsoir", "yo", "whatsup", "sup"];
    var conditionQuestionsList = ["how are", "how're", "are you okay", "are you okay?"];
    var conditionReplyList = ["fine", "good", "great", "okay"];
    var mainList = ["jeans", "jean", "pants", "pant", "pantaloons", "pantaloon", "underwear", "shirt", "shirts", "shoes", "shoe", "sweater", "jacket", "dress", "tv", "television", "phone", "iphone", "battery", "shorts", "socks", "makeup", "bag", "hat", "beanie", "laptop", "watch", "jewelry", "bracelet", "ring", "chaine", "glasses", "sun-glasses", "home-cinema"];
    var typeList = ["skinny", "slim", "baggy", "classic", "sport", "sports"];
    var sexList = ["men", "man", "women", "woman", "teenager", "kids", "kid", "babies", "baby"];
    var colorList = ["black", "white", "blue", "green", "red", "yellow", "purple", "grey", "orange", "brown"];
    var brandList = ["nike", "adidas", "samsung", "puma", "timberland", "coq sportif", "sony", "htc", "lg", "apple", "blackberry", "reebok", "asics", "vans"];
    var sizeList = ["large", "small", "x-small", "xsmall", "xxsmall", "xx-small", "medium", "xlarge", "xxlarge", "xxxlarge", "x-large", "xx-large", "xxx-large"];
    var positiveConfirmationList = ["yes", "yeah", "yep", "good", "great"];
    var negativeConfirmationList = ["no", "nope", "nop", "didn't"];
    var setMain = "";
    var setType = "";
    var setSex = "";
    var setColor = "";
    var setBrand = "";
    var setSize = "";
    var setConfirmation = "none";
    var doSearch = 0;
    var doAnswerGreetings = 0;
    var doAnswerCondition = 0;
    var doOfferService = 0;
    var doGladOfferService = 0;

    changeInterface("client");
    clientTerms = clientInput.split(" ");
    for (var i = 0; i < clientTerms.length; i++) {
        if (greetingsList.indexOf(clientTerms[i].toLowerCase()) >= 0) {
            doAnswerGreetings = 1;
        }
        if (conditionQuestionsList.indexOf(clientTerms[i].toLowerCase()) >= 0) {
            doAnswerCondition = 1;
        }


        if (clientTerms[i].toLowerCase() == 'i' && typeof clientTerms[i + 1] != "undefined") {
            if (clientTerms[i + 1].toLowerCase() == 'am') {
                if (typeof clientTerms[i + 2] == "undefined") {
                    clientTerms[i + 2] = " "
                };
                if (typeof clientTerms[i + 3] == "undefined") {
                    clientTerms[i + 3] = " "
                };
                if (conditionReplyList.indexOf(clientTerms[i + 2].toLowerCase()) >= 0 || conditionReplyList.indexOf(clientTerms[i + 3].toLowerCase()) >= 0) {
                    doGladOfferService = 1;
                }
            }
        } else if (clientTerms[i].toLowerCase() == 'i\'m') {
            if (typeof clientTerms[i + 1] == "undefined") {
                clientTerms[i + 1] = " "
            };
            if (typeof clientTerms[i + 2] == "undefined") {
                clientTerms[i + 2] = " "
            };
            if (conditionReplyList.indexOf(clientTerms[i + 1].toLowerCase()) >= 0 || conditionReplyList.indexOf(clientTerms[i + 2].toLowerCase()) >= 0) {
                doGladOfferService = 1;
            }
        }


        if (mainList.indexOf(clientTerms[i].toLowerCase()) >= 0) {
            setMain = ' ' + clientTerms[i];
            doSearch = 1;
        }
        if (typeList.indexOf(clientTerms[i].toLowerCase()) >= 0) {
            setType = ' ' + clientTerms[i];
        }
        if (sexList.indexOf(clientTerms[i].toLowerCase()) >= 0) {
            setSex = ' ' + clientTerms[i];
        }
        if (colorList.indexOf(clientTerms[i].toLowerCase()) >= 0) {
            setColor = ' ' + clientTerms[i];
        }
        if (brandList.indexOf(clientTerms[i].toLowerCase()) >= 0) {
            setBrand = ' ' + clientTerms[i];
        }
        if (sizeList.indexOf(clientTerms[i].toLowerCase()) >= 0) {
            setSize = ' ' + clientTerms[i];
        }
        if (waitingConfirmation == 1 && positiveConfirmationList.indexOf(clientTerms[i].toLowerCase()) >= 0) {
            setConfirmation = "positive";
        } else if (waitingConfirmation == 1 && negativeConfirmationList.indexOf(clientTerms[i].toLowerCase()) >= 0) {
            setConfirmation = "negative";
        }


        waitingConfirmation = 0;
    }


    if (doSearch == 0 && doAnswerGreetings == 0 && doAnswerCondition == 0 && doOfferService == 0 && doGladOfferService == 0 && setConfirmation == "none") {
        myVar = setTimeout(changeInterface, replyTime, "assisstant", ['Sorry I didn\'t understand']);
    }



    if (setConfirmation == "positive") {
        myVar = setTimeout(changeInterface, replyTime, "assisstant", ['Glad I can help']);
        setConfirmation = "none";
    } else if (setConfirmation == "negative") {
        myVar = setTimeout(changeInterface, replyTime, "assisstant", ['Sorry,let\'s try again']);
        setConfirmation = "none";
    }





    if (doAnswerGreetings == 1 && doAnswerCondition == 1) {
        myVar = setTimeout(changeInterface, replyTime, "assisstant", ['Hello Mohamed,I\'m good,how are you?']);
        doAnswerCondition = 0;
        doAnswerGreetings = 0;
        myVar = setTimeout(changeInterface, 2000, "assisstant", ['What can I help you with today ?']);


    } else if (doAnswerGreetings == 1 && doAnswerCondition == 0) {
        myVar = setTimeout(changeInterface, replyTime, "assisstant", ['Hello there']);
        doAnswerGreetings = 0;
        myVar = setTimeout(changeInterface, 2000, "assisstant", ['What can I help you with today ?']);

    } else if (doAnswerGreetings == 0 && doAnswerCondition == 1) {
        myVar = setTimeout(changeInterface, replyTime, "assisstant", ['I\'m good thank you,what about you?']);
        doAnswerCondition = 0;

    }



    if (doGladOfferService == 1) {
        doGladOfferService = 0;
        myVar = setTimeout(changeInterface, replyTime, "assisstant", ['I\'m glad you are,what can I help you with today ?','That\'s good,what can I help you with today ?','That\'s good,what can I do for you ?']);
    }


    if (doSearch == 1) {
        doSearch = 0;
        myVar = setTimeout(changeInterface, replyTime, "assisstant", ['So you are looking for new' + setColor + setMain + ',one second', setColor + setBrand + setMain + ',Got it!', 'Looking for your' + setBrand + setMain + ' right now', 'Searching in the database for' + setColor + setBrand + setMain]);
        myVar = setTimeout(searchTerms, replyTime, setMain, setType, setSex, setColor, setBrand, setSize);

    }


}

window.changeInterface = function(mode, poss) {
    if (mode == "assisstant") {
        reply = poss[Math.floor(Math.random() * poss.length)];
        chatWindow.value = (chatWindow.value + "Assisstant : " + reply + "\n\t");

    } else {
        chatWindow.value = (chatWindow.value + "Client : " + clientInput + "\n\t");

    }

    chatWindow.scrollTop = chatWindow.scrollHeight;
}

window.searchTerms = function(main, type, sex, color, brand, size) {
    client.itemSearch({
        keywords: type + brand + main + color + sex + size,
        searchIndex: 'All',
        responseGroup: 'ItemAttributes,Offers,Images'
    }, function(err, results, response) {
        if (err) {
            console.log(err);
            myVar = setTimeout(changeInterface, replyTime, "assisstant", ["Sorry,I couldn't find what you are looking for"]);

        } else {
            console.log(results); // products
            console.log(results.length);
            console.log(response); // response (containing TotalPages, TotalResults, MoreSearchResultsUrl and so on)
            displayResults(results, response);
            myVar = setTimeout(changeInterface, replyTime, "assisstant", ["Did you find what you were looking for ?"]);
            waitingConfirmation = 1;
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
