// Dire que le fichier est chargé
console.log("[Longer-In-Twitter] background.js loaded");

// Quand un message (demande pour obtenir un TwitLonger) est reçu
chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
    if(msg.type == 'twitlonger') getTwitLonger(msg.text).then(content => sendResponse(content));
    if(msg.type == 'xltweet') getXlTweet(msg.text).then(content => sendResponse(content));
    return true;
});

// Fonction pour obtenir le contenu d'un TwitLonger
async function getTwitLonger(id){
    console.log(`[Longer-In-Twitter] requesting content of TwitLonger by id "${id}"`);
    var content = await fetch(`https://twitlonger-api-unofficial.johanstick.me/twitlonger/${id}`).then(res => res.text())
    return content;
}

// Fonction pour obtenir le contenu d'un XLTweet
async function getXlTweet(id){
    console.log(`[Longer-In-Twitter] requesting content of XLTweet by id "${id}"`);
    var content = await fetch(`https://twitlonger-api-unofficial.johanstick.me/xltweet/${id}`).then(res => res.text())
    return content;
}
