// Dire que le fichier est chargé
console.log("[Longer-In-Twitter] index.js loaded");

// Préparer une variable
var href = "";

// Toutes les secondes, effectuer quelques vérifs
setInterval(() => {
    // Vérifier si le chemin de la page a changé
    if(location.href !== href){
        // Redéfinir la variable "href"
        href = location.href;

        // Si on regarde un tweet
        if(location.href.match(/^https?:\/\/twitter\.com\/(?:#!\/)?(\w+)\/status(es)?\/(\d+)/g)){
            // Obtenir le contenu du tweet
            var tweetContent = document?.querySelectorAll("article")[0]?.childNodes[0]?.childNodes[0]?.childNodes[0]?.childNodes[2]?.childNodes[0]?.childNodes[0]?.childNodes[0]?.innerText

            // Si il est impossible d'obtenir le contenu du tweet, on réesayera
            if(!tweetContent){
                href = ""
                return console.log("[Longer-In-Twitter] tweetContent is null, retrying...")
            }

            // Si le contenu du tweet contient un TwitLonger
            if(tweetContent && tweetContent.includes("tl.gd/") || tweetContent.includes("twitlonger.com/show/")){
                // Obtenir l'ID du TwitLonger (texte après tl.gd/ ou twitlonger.com/show/)
                var id = tweetContent.match(/tl\.gd\/(\w+)|twitlonger\.com\/show\/(\w+)/g)[0].replace("twitlonger.com/show/",'').replace("tl.gd/",'');

                // Obtenir et afficher le contenu du TwitLonger
                chrome.runtime.sendMessage({ text: id }, function(response){
                    document.querySelectorAll("article")[0].childNodes[0].childNodes[0].childNodes[0].childNodes[2].childNodes[0].childNodes[0].childNodes[0].innerHTML = `${document.querySelectorAll("article")[0].childNodes[0].childNodes[0].childNodes[0].childNodes[2].childNodes[0].childNodes[0].childNodes[0].innerHTML.replace(`tl.gd/${id}`,'    ').replace(`twitlonger.com/show/${id}`,'')}<a style="color: rgb(255, 255, 255); text-decoration: none;" href="https://twitlonger.com/show/${id}"><p style="margin-top: 0.85em; font-weight: bold; font-size: 2rem; text-align: center;">TwitLonger :</p></a>${response.replace(/\n/g,'')}`
                });

                // Enlever le bouton pour traduire
                document?.querySelectorAll("article")[0]?.childNodes[0]?.childNodes[0]?.childNodes[0]?.childNodes[2]?.childNodes[0]?.childNodes[0]?.childNodes[1]?.remove()
            } else {
                console.log("[Longer-In-Twitter] no TwitLonger found")
            }
        }
    }
}, 1000);
