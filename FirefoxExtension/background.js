// Dire que le fichier est chargé
console.log("[Longer-In-Twitter] background.js loaded");

// Quand un message (demande pour obtenir un TwitLonger) est reçu
chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
    getTwitLonger(msg.text).then(content => sendResponse(content));
    return true;
});

// Fonction pour obtenir le contenu d'un TwitLonger
async function getTwitLonger(id){
    console.log(`[Longer-In-Twitter] requesting content of TwitLonger by id "${id}"`);
    var content = await fetch(`https://twitlonger-api-unofficial.johanstickman.com/getContent/${id}`).then(res => res.text())
    return content;
}