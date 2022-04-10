// Dire que le fichier est chargé
console.log("[Longer-In-Twitter] index.js loaded");

// Préparer une variable
var href = "";

// Toutes les secondes, effectuer quelques vérifs
setInterval(() => {
	// Si la pop up pour dire de se connecter pour continuer (si on regarde un compte sans être connecté) est affichée
	if(document.documentElement.style.overflow === 'none' || document.documentElement.style.overflow === 'hidden'){
		// Supprimer la pop up
		document.getElementsByClassName("css-1dbjc4n r-1awozwy r-1kihuf0 r-18u37iz r-1pi2tsx r-1777fci r-1pjcn9w r-xr3zp9 r-1xcajam r-ipm5af r-g6jmlv")[0]?.remove()

		// Réajouter le scroll
		document.documentElement.style.overflow = 'auto'
	}

	// Ajouter un bouton "Continuer en invité" sur la page de connexion
	if(location.pathname === "/" && !document.getElementById("inviteButton") && document.querySelectorAll('[data-testid="loginButton"]')[0]){
		// Obtenir le parent du bouton "Se connecter"
		var parent = document.querySelectorAll('[data-testid="loginButton"]')[0].parentNode
		var button = document.querySelectorAll('[data-testid="loginButton"]')[0]

		// Crée un bouton "Continuer en invité"
		var inviteButton = document.createElement("a")
		inviteButton.innerHTML = button.innerHTML
		inviteButton.classList = button.classList
		inviteButton.setAttribute('href', '/explore')
		inviteButton.setAttribute('role', 'link')
		inviteButton.setAttribute('id', 'inviteButton')
		inviteButton.setAttribute('style', button.getAttribute('style'))
		inviteButton.childNodes[0].childNodes[0].innerText = 'Continuer en invité'

		// Ajouter le bouton "Continuer en invité" au parent
		parent.appendChild(inviteButton)
	}

	// Masquer la banderolle "Ne manquez pas ce qui se passe - Se connecter / s'inscrire"
	if(document.getElementsByClassName("css-1dbjc4n r-l5o3uw r-qo02w8")[0]) document.getElementsByClassName("css-1dbjc4n r-l5o3uw r-qo02w8")[0]?.remove()

	// M'enfout des cookies
	if(document.getElementsByClassName("css-1dbjc4n r-1awozwy r-1sw30gj r-15ce4ve r-eqz5dr r-1d7fvdj r-ymttw5 r-1knelpx r-1f1sjgu r-13qz1uu")[0]) document.getElementsByClassName("css-1dbjc4n r-1awozwy r-1sw30gj r-15ce4ve r-eqz5dr r-1d7fvdj r-ymttw5 r-1knelpx r-1f1sjgu r-13qz1uu")[0]?.remove()
	if(document.getElementsByClassName("css-1dbjc4n r-1awozwy r-1sw30gj r-15ce4ve r-18u37iz r-1d7fvdj r-ymttw5 r-1f1sjgu r-13qz1uu")[0]) document.getElementsByClassName("css-1dbjc4n r-1awozwy r-1sw30gj r-15ce4ve r-18u37iz r-1d7fvdj r-ymttw5 r-1f1sjgu r-13qz1uu")[0]?.remove()

	// Si on est en train d'écrire un tweet
	if(location.pathname === "/home" || location.pathname === "" || location.pathname === "/compose/tweet"){
		// Ajouter un bouton "Ouvrir TwitLonger"
		if(document.getElementById("openInTwitlongerButton") === null && document.querySelectorAll('[data-text="true"]')[0] && (document.querySelectorAll('[data-text="true"]')[0]?.parentNode?.parentNode?.parentNode?.parentNode?.innerText?.length || document.querySelectorAll('[data-text="true"]')[0].innerText.length) > 280){
			console.log("[Longer-In-Twitter] tweet is too long, considering as a TwitLonger format");

			// Obtenir le bouton pour tweeter (et le dupliquer)
			var tweetButton = document.getElementsByClassName("css-1dbjc4n r-l5o3uw r-42olwf r-sdzlij r-1phboty r-rs99b7 r-19u6a5r r-2yi16 r-1qi8awa r-icoktb r-1ny4l3l r-ymttw5 r-o7ynqc r-6416eg r-lrvibr")[0]
			tweetButton.parentElement.insertAdjacentHTML('beforeend', tweetButton.outerHTML)

			// Obtenir le bouton dupliqué
			var openInTwitlongerButton_beforeChange = tweetButton.parentElement.lastChild

			// Crée un élement (le bouton dupliqué, mais genre cliquable et modifié)
			var openInTwitlongerButton = document.createElement('a');

			// Remplacer l'ancien bouton par le nouveau
			openInTwitlongerButton_beforeChange.parentNode.replaceChild(openInTwitlongerButton, openInTwitlongerButton_beforeChange)

			// Ajouter les attributs de l'ancien bouton dans le nouvel élément
			openInTwitlongerButton.innerHTML = openInTwitlongerButton_beforeChange.innerHTML
			openInTwitlongerButton.classList = openInTwitlongerButton_beforeChange.classList
			openInTwitlongerButton.setAttribute('id', 'openInTwitlongerButton')
			openInTwitlongerButton.setAttribute('role', openInTwitlongerButton_beforeChange.getAttribute('role'))

			// Modifier quelques autres attributs
			openInTwitlongerButton.setAttribute('href', 'https://twitlonger.com')
			openInTwitlongerButton.childNodes[0].childNodes[0].childNodes[0].innerText = "Ouvrir TwitLonger"
			openInTwitlongerButton.style.textDecoration = 'none'
			openInTwitlongerButton.classList.remove('r-icoktb')

			// Masquer l'ancien bouton
			tweetButton.style.display = 'none'

			// Copier dans le presse papier le tweet si on clique sur le bouton
			openInTwitlongerButton.addEventListener('click', () => {
				navigator.clipboard.writeText(document.querySelectorAll('[data-text="true"]')[0]?.parentNode?.parentNode?.innerText || document.querySelectorAll('[data-text="true"]')[0].innerText)
				console.log("[Longer-In-Twitter] content of tweet copied to clipboard")
			})
		}

		// Supprimer le bouton "Ouvrir TwitLonger"
		if(document.getElementById("openInTwitlongerButton") !== null && document.querySelectorAll('[data-text="true"]')[0] && ((document.querySelectorAll('[data-text="true"]')[0]?.parentNode?.parentNode?.parentNode?.parentNode?.innerText?.length || document.querySelectorAll('[data-text="true"]')[0].innerText.length) < 281)){
			console.log("[Longer-In-Twitter] tweet isn't too long, considering as a normal twitter");

			// Obtenir deux boutons
			var openInTwitlongerButton = document.getElementById("openInTwitlongerButton")
			var tweetButton = openInTwitlongerButton.parentElement.childNodes[openInTwitlongerButton.parentElement.childNodes.length - 1]

			// Afficher le bouton pour tweeter
			openInTwitlongerButton.parentElement.childNodes[openInTwitlongerButton.parentElement.childNodes.length - 2].style.display = ''

			// Supprimer le bouton "Ouvrir TwitLonger"
			openInTwitlongerButton.remove()
		}
	}

	// Vérifier si le chemin de la page a changé
	if(location.href !== href){
		// Redéfinir la variable "href"
		href = location.href;

		// Si on regarde un tweet
		if(location.href.match(/^https?:\/\/twitter\.com\/(?:#!\/)?(\w+)\/status(es)?\/(\d+)/g)){
			// Remplacer le lien sur les sources de tweets (Twitter for iPhone, Twitter for Android, Twitter Web App)
			// ptdr y'a 0 rapport mais ça me parait utile et le plus optimisé c'est de le mettre ici
			var tweetSource = document.getElementsByClassName("css-4rbku5 css-18t94o4 css-901oao css-16my406 r-9ilb82 r-1loqt21 r-poiln3 r-bcqeeo r-1jeg54m r-qvutc0")[0]
			if(tweetSource?.innerText === "Twitter for iPhone") tweetSource?.setAttribute("href","https://apps.apple.com/fr/app/twitter/id333903271")
			if(tweetSource?.innerText === "Twitter for Android") tweetSource?.setAttribute("href","https://play.google.com/store/apps/details?id=com.twitter.android")
			if(tweetSource?.innerText === "Twitter for iPad") tweetSource?.setAttribute("href","https://apps.apple.com/fr/app/twitter/id333903271")
			if(tweetSource?.innerText === "Twitter for Mac") tweetSource?.setAttribute("href","https://apps.apple.com/fr/app/twitter/id1482454543")
			if(tweetSource?.innerText === "Twitter Web App") tweetSource?.setAttribute("href","https://twitter.com")
			if(tweetSource?.innerText === "Twitterminal") tweetSource?.setAttribute("href","https://twiterminal.carrd.co")
			if(tweetSource?.innerText === "TweetDeck") tweetSource?.setAttribute("href","https://tweetdeck.twitter.com")

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

				// Définir le tweet dans une variable
				var tweet = document.querySelectorAll("article")[0].childNodes[0].childNodes[0].childNodes[0].childNodes[2].childNodes[0].childNodes[0].childNodes[0]

				// Enlever le texte "Read: " avant le lien du TwitLonger (vu que le lien sera enlevé)
				tweet.innerHTML = `${tweet.innerHTML.replace("\nRead: </span>",'</span>')}`

				// Rendre le titre du TwitLonger et ajouter un "via TwitLonger"
				tweet.childNodes[0].style.fontWeight = 'bold'
				tweet.childNodes[0].innerHTML = `<span>${tweet.childNodes[0]?.innerText?.split("\n")[0] || tweet.childNodes[0]?.innerText}<span style="font-weight: normal;">&nbsp; — &nbsp;(via TwitLonger)</span></span>`

				// Enlever le lien du TwitLonger (la ligne après l'enlève visuellement mais il reste cliquable)
				tweet.childNodes[tweet.childNodes.length - 1].remove()

				// Obtenir le TwitLonger
				chrome.runtime.sendMessage({ text: id }, function(response){
					tweet.innerHTML = `${tweet.innerHTML.replace(`tl.gd/${id}`,'').replace(`twitlonger.com/show/${id}`,'')}\n\n${response.replace(/\n/g,'')}`
				});

				// Enlever le bouton pour traduire
				document?.querySelectorAll("article")[0]?.childNodes[0]?.childNodes[0]?.childNodes[0]?.childNodes[2]?.childNodes[0]?.childNodes[0]?.childNodes[1]?.remove()
			} else {
				console.log("[Longer-In-Twitter] no TwitLonger found")
			}
		}
	}
}, 1000);