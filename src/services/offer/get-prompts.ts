import { Offer } from "@/types/offer";

export const getPrompts = (offer: Offer) => {
  return {
    steps: `TON RÔLE :
Tu es un expert business et marketing.

INSTRUCTIONS :
J'attends de toi que tu structures un déroulé d'offre avec les phases clés du programme.
Elles doivent correspondre à ce que je vais te donner entre les caractères ((( et ))).

1. Tu dois impérativement concevoir les différentes phases de la façon expliquée entre << et >>.
<<
Phase X (où X est remplacé par le numéro de la phase)  
TITRE (Remplace le titre, il doit être court et percutant)  
- Élément 1  
- Élément 2  
- Élément 3  
- Élément 4  
- Élément 5  
(Les 5 éléments doivent être le détail de ce qu'on va voir dans la phase. Des phrases courtes et percutantes. Remplace "Élément" et ne mets que la phrase.)  
Objectif : (L'objectif doit être clair, concis et mesurable.)  
Durée des rendez-vous : (Si pertinent uniquement, ça dépendra des offres. La durée peut être modifiée par la suite. Mets déjà une idée de ce que ça doit prendre en terme de temps.)  
>>
2. Je vais te donner un exemple complet avec toutes les phases entre <<< et >>>.
3. Tu dois impérativement appliquer cette structure à l'offre suivante entre [[[ et ]]] :

DONNÉES :
<<<
Phase 1
CRÉATION DE VOTRE OFFRE
- Validation de votre niche
- Définition de la proposition de valeur
- Définition des composantes de votre offre
- Définition des objectifs
- Définition du prix
Objectif : Avoir une offre claire et irrésistible.
Durée des rendez-vous : 1h30

Phase 2
CRÉATION DE VOTRE PROFIL LINKEDIN
- Création des textes par rapport à votre offre
- Design du profil par notre équipe
- Mise en place de tous les éléments
- Tracking des résultats
- Itération et optimisation
Objectif : Avoir un profil LinkedIn performant.
Durée des rendez-vous : 1h

Phase 3
CRÉATION DE VOTRE LIGNE ÉDITORIALE
- Dégager toutes les problématiques de votre niche
- Trouver des idées de contenu qui répondent à ces problèmes
- Évaluer la pertinence de chaque idée
- Ajoutez vos propres idées et opinions
- Mettre en place un calendrier de publication
Objectif : Avoir une ligne éditoriale cohérente avec votre offre.
Durée des rendez-vous : 1h

Phase 4
CRÉATION DE VOTRE CONTENU
- Vous apprenez les codes de LinkedIn
- Création de vos premières publication
- Création des carousels, visuels, posts
- On vous écrit 1 post par semaine
- Suivi des performances et optimisation
Objectif : Avoir un contenu performant qui fait des ventes.
Durée des rendez-vous : 1h

Phase 5
PROSPECTION OUTBOUND
- On commencer à récupérer les leads générés par votre contenu
- On va chercher les leads chez vous concurrents
- On vous apprendre à écrire de bons messages de prospection
- On vous montre comment automatiser certains messages de prospection
- On vous montre comment effectuer le suivi
Objectif : Avoir un contenu performant.
Durée des rendez-vous : 1h
>>>

[[[
L'offre :
${offer?.offerJson?.userInput?.offer}
]]]

Le déroulé de l'offre :
(((${offer?.offerJson?.userInput?.steps})))

FORMAT ATTENDU :
- Tu dois mettre autant de phases qu'il y en a dans mon offre.  
- Tu dois faire des phrases courtes.
- Tu ne dois pas utiliser de markdown, pas de gras, ni de **, pas de souligné, pas de italique, pas de titres.
- L'objectif est que ce soit clair et limpide pour le potentiel client.  
- Il doit tout comprendre.  
- Évite le jargon trop technique.
- Le retour ne doit contenir que ce qui est demandé, au même format que le texte entre <<< et >>>
- Tu dois impérativement faire attention à ne pas reprendre les éléments de l'exemple fourni entre <<< et >>>, seulement reprendre du format et t'inspirer du ton employé.
`,
    whoAmI: `TON RÔLE :
Tu es un expert en storytelling et en copywriting. Tu sais parfaitement identifier les points forts d'une personne et les éléments qui rendent légitime et crédible une personne par rapport à une offre.
Ton rôle sera d'identifier les éléments les plus pertinents de mon CV liés à l'offre que je vais te partager.

INSTRUCTIONS :
Tu vas devoir identifier et rédiger les éléments de légitimité de l'offre.  
Les personnes qui liront cet élément doivent se dire "Cette personne est la bonne personne pour résoudre mon problème".

1. Tu dois être ultra direct.  
2. Le retour généré doit respecter la même structure que l'exemple entre <<< et >>>
3. Tu dois impérativement faire attention à ne pas reprendre les éléments de cet exemple.  
4. Tu dois juste t'inspirer de sa structure et du ton employé.
5. Je vais te donner mon CV entre ((( et ))), qui te donnera le contexte afin que tu puisses rédiger des éléments de légitimité pertinents. Ne mets rien qui ne soit pas en rapport avec mon offre.
6. Tu dois mettre en valeur mon "Qui suis-je?" grâce à mon offre actuelle qui est entre les caractères [[[ et ]]]
7. Les éléments doivent être rédigés de manière percutante, brute, visuelle, sans enrobage.

DONNÉES :
<<<
Je m'appelle Ruben Taieb et je suis expert LinkedIn pour les indépendants.

En 5 ans, j'ai exploré LinkedIn sous tous ses angles.

- J'ai fait du Coaching LinkedIn 1:1.
- J'ai accompagné +100 entreprises. (Back market, Amazon, Century21, Aircall, Unilever, Toshiba...)
- J'ai pivoté en Agence de prospection. (450 comptes sous gestion & 1,5M d'invitations envoyées...)
- J'ai donné +100 conférences LinkedIn.
- J'ai formé +1000 personnes sur LinkedIn.
- J'ai écrit +2000 publications pour des dirigeants.
- J'ai fait +20 campagnes d'influence sur LinkedIn.

Et aujourd'hui, je vous partage tous mes secrets pour contrètement augmenter votre CA.
>>>

(((${offer.offerJson?.userInput?.cv})))

[[[
L'offre :
${offer.offerJson?.userInput?.offer}

Le déroulé de l'offre :
${offer.offerJson?.userInput?.steps}
]]]

FORMAT ATTENDU :
- Le retour doit être exactement comme dans l'exemple entre <<< et >>>, c'est à dire :
  - commencer par 1 phrase séparée par un saut de ligne (ex: "Je m'appelle [Prenom Nom], et je suis spécilisé dans [domaine] pour [cible]")
  - puis un saut de ligne,
  - puis une phrase deuxième phrase ultra percutante qui montre de la crédibilité et légitimité par rapport à l'offre (ex: "En 8 mois, j'ai aidé 200+ freelances à faire de LinkedIn leur canal d'acquisition n°1")
  - puis un saut de ligne,
  - puis la liste dont chaque point commence par un "-",
  - puis un saut de ligne,
  - puis une phrase de conclusion ultra percutante et courte (ex: "En bref, ")
  - Tu dois principalement donner des chiffres pour appuyer tes propos.  
- Tu ne dois pas utiliser d'émojis.  
- Tu ne dois pas utiliser de markdown, pas de gras, ni de **, pas de souligné, pas de italique, pas de titres.
- Tu dois impérativement faire attention à ne pas reprendre les éléments de l'exemple fourni entre <<< et >>>, seulement copier la structure et d'inspirer du ton.  
- Tu dois lister au moins 8 points pertinents.  
- Tu dois faire des phrases courtes, concises et percutantes, sans manquer d'informations.  
- Tu dois parler au passé le plus possible dans les points de la liste (Ex: "J'ai formé +200 freelance", "J'ai généré +8 millions d'impressions LinkedIn", "J'ai accompagné +180 freelances dans l'IT", "J'ai créé une formation LinkedIn dédiée aux développeurs")
- Reste le plus factuel possible en fonction de mon CV, n'invente pas, par contre embellis.
`,
    included: `TON RÔLE :
Tu es un expert en copywriting.
Tu sais parfaitement identifier les points forts d'une offre et concevoir une offre irrésistible.

INSTRUCTIONS :
Je veux que tu m'aides à remplir la partie de mon formulaire qui reprend l'ensemble des éléments de mon offre.
Ce format doit lister tous les livrables que le prospect obtiendra en achetant mon offre entre [[[ et ]]].

1. Tu va devoir régiger la partie "Ce que contient cette offre" entre au même format que ce qui est entre ((( et ))).
2. Voici un exemple complet pour t'aider à identifier la typologie d'éléments entre <<< et >>>.
3. Voici mon offre exacte entre [[[ et ]]], tu dois appliquer la structure de l'exemple entre <<< et >>> à mon offre.

DONNÉES :
((([
✔︎ Écrire ici... Exemple : Audit complet de votre présence digitale actuelle.
✔︎ Écrire ici... Exemple : Élaboration d'une stratégie de contenu personnalisée.
✔︎ Écrire ici... Exemple : Gestion de vos réseaux sociaux avec création de contenus engageants.
✔︎ Écrire ici... Exemple : Optimisation SEO de votre site web pour un meilleur référencement.
✔︎ Écrire ici... Exemple : Reporting mensuel détaillé avec analyses et recommandations.
)))

<<<
✔︎ Un rendez-vous individuel de 45min avec moi toutes les 2 semaines.
✔︎ L'accès à des centaines de contenu d'expertise LinkedIn pour t'améliorer.
✔︎ L'accès à un formulaire de correction de publications LinkedIn illimité.
✔︎ L'accès à ma ligne WhatsApp individuelle pour répondre à toutes tes questions.
✔︎ L'intégration à un groupe WhatsApp collectif de discussion.
✔︎ L'intégration à un groupe collectif d'engagement LinkedIn.
✔︎ Un tableau de bord entièrement personnalisé.
>>>

[[[
Qui suis-je ?
${offer.offerJson?.generated?.whoAmI}

Déroulé de l'offre
${offer.offerJson?.generated?.steps}
]]]

FORMAT ATTENDU :
- Les phrases doivent commencer par ce caractère spécial : ✔︎
- Tu ne dois pas utiliser de markdown, pas de gras, ni de **, pas de souligné, pas de italique, pas de titres.
- Tu ne dois pas mettre d'émojis.
- Le retour ne doit contenir que ce qui est demandé, au même format que le texte entre <<< et >>>.
- Tu dois impérativement t'inspirer du ton employé mais ne pas copier les éléments de l'exemple.  
- Tu dois être exhaustif dans la description de manière percutante, concis mais descriptif.  
- Tu dois faire des phrases courtes.  
`,
    notIncluded: `TON RÔLE :
Tu es un expert en copywriting.
Tu sais parfaitement identifier les points forts et faibles d'une offre et concevoir une offre irrésistible.

INSTRUCTIONS :
Je veux que tu m'aides à remplir la partie de mon formulaire qui reprend l'ensemble des éléments que ne contient PAS mon offre.
Ce format doit lister tous les livrables que ma prestation ne comprend pas en achetant mon offre pour éviter tout malentendu.  
Tu dois impérativement lister les livrables potentiels auxquels le prospect s'attend mais qui ne seront pas compris dans l'offre.

1. Tu va devoir régiger la partie "Ce que ne contient pas cette offre" entre au même format que ce qui est entre ((( et ))).
2. Voici un exemple complet pour t'aider à identifier la typologie d'éléments entre <<< et >>>.
3. Voici mon offre exacte entre [[[ et ]]], tu dois appliquer la structure de l'exemple entre <<< et >>> à mon offre.

DONNÉES :
[[[
✘ Un papounet qui va te chouchouter.
✘ Une énième formation LinkedIn magique.
✘ Des supports de formations avec des conseils.
✘ Une stratégie toute prête à ton arrivée.
✘ Un 0 de plus sur ton compte sans rien faire.
✘ Des masterclass avec des experts.
]]]

Voici également pour t'inspirer de la structure, ce que j'attends en termes d'éléments, entre /// et ///.
((([
✘ Écrire ici... Exemple : La création ou la refonte complète de votre site web.
✘ Écrire ici... Exemple : Les dépenses publicitaires (elles seront facturées séparément).
✘ Écrire ici... Exemple : La gestion des relations presse ou des événements physiques.
✘ Écrire ici... Exemple : Le support technique pour des problèmes non liés au marketing.
✘ Écrire ici... Exemple : Les formations approfondies pour vos équipes (disponibles en option).
)))

[[[
Qui suis-je ?
${offer.offerJson?.generated?.whoAmI}

Le déroulé de l'offre :
${offer.offerJson?.generated?.steps}

Ce que contient mon offre :
${offer.offerJson?.generated?.included}
]]]

FORMAT ATTENDU :
- Les phrases doivent commencer par ce caractère spécial : ✘
- Tu ne dois pas utiliser de markdown, pas de gras, ni de **, pas de souligné, pas de italique, pas de titres.
- Tu ne dois pas mettre d'émojis.
- Le retour ne doit contenir que ce qui est demandé, au même format que le texte entre <<< et >>>.
- Tu dois impérativement t'inspirer du ton employé mais ne pas copier les éléments de l'exemple.  
- Tu dois être exhaustif dans la description de manière percutante, concis mais descriptif.  
- Tu dois faire des phrases courtes.
`,
    doneForYou: `TON RÔLE :
Prends le rôle d'un expert en copywriting qui utilise les dernières techniques de rédaction et au maximum du state of art.

CONTEXTE :
J'ai créé une landing page sur laquelle je vais renvoyer mon audience pour les convertir.
Tu trouveras tous les détails de mon programme, ce qui te permettra d'en déduire les cibles pour la rédaction, entre ces caractères <<< et >>> :

INSTRUCTIONS :
1. Exploite ces détails pour rédiger le bloc qui répond à l'affirmation suivante :Cette offre est faite pour vous si…
2. Le format attendu est :  
✔︎ Cible N°1 + Objectif + Problèmes ou Échecs ou Réussites ou Obstacles ou Défis ou Opportunités ou Préoccupations ou Besoins ou Tendances ou Attentes ou Limitations ou Aspirations  
(Par exemple : Aux startups technologiques souhaitant augmenter leur notoriété pour attirer des investisseurs mais n'y arrivent pas.)  
✔︎ Cible N°2 + Objectif + Problèmes ou Échecs ou Réussites ou Obstacles ou Défis ou Opportunités ou Préoccupations ou Besoins ou Tendances ou Attentes ou Limitations ou Aspirations  
(Par exemple : Aux PME du secteur numérique cherchant à booster leurs ventes en ligne mais ne savent pas comment faire.)
...jusqu'à 5 cibles différentes.
3. Voici un exemple complet de ce à quoi doit ressembler le retour entre [[[ et ]]] :
4. Tu dois l'appliquer à mon offre entre <<< et >>> :

DONNÉES :
[[[
✔︎ Tu es entrepreneur ou consultant et tu veux générer plus de clients avec LinkedIn, mais tes posts ne convertissent pas. Tu publies, tu engages, mais au final, zéro prospect qualifié.  
✔︎ Tu es expert dans ton domaine, mais tu galères à créer une offre qui attire et vend. Ton audience ne comprend pas ta valeur, et tes posts passent inaperçus.  
✔︎ Tu as déjà suivi une formation LinkedIn, mais ça n'a rien changé. Trop de théorie, pas d'accompagnement concret, et toujours aucune vente générée.  
✔︎ Tu veux devenir une figure d'autorité sur LinkedIn, mais tu ne sais pas comment structurer un contenu percutant. Tu veux être visible, reconnu et respecté pour ton expertise.  
✔︎ Tu veux décrocher des clients avec LinkedIn sans publicité, sans cold emailing et sans prospecter comme un forcené. Tu veux que tes posts génèrent des leads en automatique.
]]]

<<<
Qui suis-je ?
${offer.offerJson?.generated?.whoAmI}

Le déroulé du programme :
${offer.offerJson?.generated?.steps}

Ce que comprend l'offre :
${offer.offerJson?.generated?.included}

Ce que ne comprend pas l'offre :
${offer.offerJson?.generated?.notIncluded}
>>>

FORMAT ATTENDU :
- Tu ne dois pas mettre d'émojis.
- Tu ne dois pas utiliser de markdown, pas de gras, ni de **, pas de souligné, pas de italique, pas de titres.
- Le retour ne doit contenir que ce qui est demandé, au même format que le texte entre [[[ et ]]]
- Tu dois impérativement prendre un ton percutant et impactant.  
- Tu ne dois pas utiliser d'émojis.  
- Tu dois formuler des phrases simplement.  
- Tu dois être le plus précis possible sur les problématiques rencontrées.  
- Tu dois formuler des phrases courtes.
- Tu dois impérativement commencer tes lignes par "✔︎ Tu"
`,
    notDoneForYou: `TON RÔLE :
Prends le rôle d'un expert en copywriting qui utilise les dernières techniques de rédaction et au maximum du state of art.

CONTEXTE :
J'ai créé une landing page sur laquelle je vais renvoyer mon audience pour les convertir.
Tu trouveras tous les détails de mon programme, ce qui te permettra d'en déduire les cibles pour la rédaction, entre ces caractères <<< et >>> :

INSTRUCTIONS :
1. Exploite ces détails pour rédiger le bloc qui répond à l'affirmation suivante : Cette offre n'est pas faite pour vous si…
2. Le format attendu est :  
✘ Cible N°1 + Objectif + Problèmes ou Échecs ou Réussites ou Obstacles ou Défis ou Opportunités ou Préoccupations ou Besoins ou Tendances ou Attentes ou Limitations ou Aspirations  
(Par exemple : Vous cherchez uniquement à externaliser sans implication interne et vous y arrivez très bien.)  
✘ Cible N°2 + Objectif + Problèmes ou Échecs ou Réussites ou Obstacles ou Défis ou Opportunités ou Préoccupations ou Besoins ou Tendances ou Attentes ou Limitations ou Aspirations  
(Par exemple : Les organisations dont l'objectif principal est de réduire leurs coûts plutôt que d'investir dans la croissance et arrivent à augmenter leur CA.)
...jusqu'à 5 cibles différentes.
3. Voici un exemple complet de ce à quoi doit ressembler le retour entre [[[ et ]]] :
4. Tu dois l'appliquer à mon offre entre <<< et >>> :

DONNÉES :
[[[
✘ Tu penses que LinkedIn ne sert qu'au réseautage et qu'il est impossible d'y faire du business.  
✘ Tu n'as aucune expertise exploitable et aucune idée de ce que tu peux vendre.  
✘ Tu ne veux pas apprendre à vendre. Tu attends que les clients viennent à toi sans effort.  
✘ Tu ne veux pas publier sur LinkedIn. Tu cherches juste quelqu'un pour gérer ton compte à ta place.  
✘ Tu refuses d'adapter ton business model pour réussir sur LinkedIn. Tu veux que ça fonctionne sans rien changer.  
]]]

<<<
Qui suis-je ?
${offer.offerJson?.generated?.whoAmI}

Le déroulé du programme :
${offer.offerJson?.generated?.steps}

Ce que comprend l'offre :
${offer.offerJson?.generated?.included}

Ce que ne comprend pas l'offre :
${offer.offerJson?.generated?.notIncluded}
>>>

FORMAT ATTENDU :
- Tu ne dois pas mettre d'émojis.
- Tu ne dois pas utiliser de markdown, pas de gras, ni de **, pas de souligné, pas de italique, pas de titres.
- Le retour ne doit contenir que ce qui est demandé, au même format que le texte entre [[[ et ]]]
- Tu dois impérativement prendre un ton percutant et impactant.  
- Tu ne dois pas utiliser d'émojis.  
- Tu dois formuler des phrases simplement.  
- Tu dois être le plus précis possible sur les problématiques rencontrées.  
- Tu dois formuler des phrases courtes.
- Tu dois impérativement commencer tes lignes par "✘ Tu"
`,
    FAQ: `TON RÔLE :
Joue le rôle de tous mes clients potentiels et identifie les questions relatives à mon offre qu'on pourrait se poser une fois qu'on a lu toute l'offre.

INSTRUCTIONS :
Tu dois procéder de la manière suivante :
1. Étudie l'offre que je vais te copier à la fin.  
2. Identifie toutes les catégories aux questions. (Exemple : Paiement, déroulé, procédés, livrables, concurrences, modalités, comment le produit fonctionne, c'est à qui de faire quoi etc…)  
3. Rédige une question en te mettant à la place du prospect, commence cette question par "Je…"  
4. Formule une réponse concise et fournie qui se collerait parfaitement à ma façon de faire. (Je pourrais ensuite les modifier si nécessaires.)
5. Tu trouveras l'offre pour laquelle tu dois générer les questions relatives entre [[[ et ]]] :

DONNÉES :
Voici un exemple de questions relatives à ma propre offre entre <<< et >>>.  
<<<
➜ Si je veux arrêter le programme en cours de route, comment ça se passe ?  
Tu peux arrêter le programme à tout instant mais le coût total du programme ne sera pas remboursé. Si tu as opté pour un paiement échelonné, il courra jusqu'à paiement intégral. Je suis autant engagé que toi. Je n'arrêterai jamais le programme.

➜ Le programme se déroule uniquement avec toi ?  
Oui. Il se déroulera uniquement avec moi et ce peu importe ce qu'il arrive. Chaque séance individuelle est entre toi et moi. Il n'y aura jamais d'autres experts qui interviendront, je suis engagé contractuellement envers toi.

➜ Possible de mettre le programme en pause ?  
Oui. C'est tout à fait possible, tu peux m'envoyer un message pour mettre en pause à tout instant le programme. Ceci dit, le paiement doit être réglé en intégralité et ne pourra pas être repoussé.

➜ Je publie sur LinkedIn en anglais, ton programme est pour moi ?  
Oui. Je suis bilingue en anglais et je maîtrise parfaitement le déroulé du programme qui peut être adapté à une cible anglophone. Cependant, le groupe d'engagement Linkedin est strictement en Français.

➜ Que se passe-t-il après le programme ?  
Après le programme, 3 choix s'offrent à toi. Tu peux décider de définir de nouveaux objectifs et de reprendre un autre programme pour 6 mois. Tu peux décider de ne pas poursuivre les sessions individuelles mais rester dans la communauté WhatsApp. Ou tu peux tout simplement tout arrêter.

➜ Je n'ai pas besoin du groupe, je suis obligé de parler dedans ?  
Le groupe a une importance capitale dans ton voyage sur LinkedIn, mais si tu ne souhaites pas l'exploiter ceci n'impactera pas les objectifs qu'on se sera fixés. Tu n'es donc pas obligé d'interagir avec les autres participants.

➜ Je suis obligé de suivre à la lettre ce que tu vas me dire ?  
Je suis là pour te donner mon avis et des recommandations d'actions à effectuer. Tu es libre de faire ce que tu veux et de suivre ton propre chemin. Mais si ça ne fonctionne pas, ce ne sera pas ma responsabilité.

➜ Si je n'arrive pas à vendre quoi que ce soit, il se passe quoi ?  
Ça ne m'est jamais arrivé, et pour aucun des participants. Mais si ça arrivait un jour, nous trouverons une solution en changeant des variables tel que le profil, le produit, l'offre ou la stratégie éditoriale jusqu'à ce que ça fonctionne. Il est évidemment très important que tu saches que je ne suis soumis à aucun engagement de résultats.

➜ Puis-je me faire accompagner à côté du programme ?  
Tu fais ce que tu veux tant que ça n'interfère pas avec les recommandations que je vais te partager pour atteindre nos objectifs qu'on se sera fixés. J'ai également des participants qui viennent avec leur coach aux sessions individuelles.

➜ Si je ne suis pas disponible à notre séance, c'est possible de décaler ?  
Bien évidemment, je fonctionne en bonne intelligence. Ceci dit j'attends de toi une certaine fiabilité pour me prévenir assez tôt dans la mesure possible. Cependant si tu ne te manifestes pas au rendez-vous sans me prévenir et tu ne réponds pas à mes messages, je ne relancerai pas la conversation. J'suis pas ta mère.

➜ Je peux te parler entre chaque séance ?  
Oui. On peut s'appeler si je suis disponible, ou bien directement sur WhatsApp, je te répondrai tous les jours et à toutes les questions que tu me poseras.

➜ Si j'ai un Ghostwriter ou Community Manager, le programme marche aussi ?  
Oui. J'ai plusieurs clients qui font appel à des prestataires pour la rédaction de leurs publications. Dans ce cas nous adapterons le programme pour atteindre les objectifs du mieux qu'on puisse.

➜ On peut être plusieurs à suivre le programme ?  
Oui. Tu peux venir à plusieurs à chacune des séances, cependant il n'y aura pas de places supplémentaires dans la communauté, ni plus de séances individuelles qu'une toutes les 2 semaines.

➜ Comment s'effectue le règlement ?  
Par prélèvement bancaire avec envoi automatique des factures par mail à chaque date de prélèvement.

➜ On peut régler en plusieurs fois ?  
Oui, jusqu'à 6 fois. Tu peux même commencer à payer jusqu'à 3 mois après avoir commencé le programme.
>>>

[[[
Qui suis-je ?
${offer.offerJson?.generated?.whoAmI}

Ce programme est fait pour toi si :
${offer.offerJson?.generated?.doneForYou}

Ce programme n'est pas fait pour toi si :
${offer.offerJson?.generated?.notDoneForYou}

Le déroulé du programme :
${offer.offerJson?.generated?.steps}

Ce que comprend l'offre :
${offer.offerJson?.generated?.included}

Ce que ne comprend pas l'offre :
${offer.offerJson?.generated?.notIncluded}
]]]

FORMAT ATTENDU :
- Tu ne dois pas mettre d'émojis.
- Tu doit commencer chaque question par le symbole "➜"
- Tu ne dois pas utiliser de markdown, pas de gras, ni de **, pas de souligné, pas de italique, pas de titres.
- Le retour ne doit contenir que ce qui est demandé, exactement au même format que le texte entre <<< et >>>.
- Tu dois impérativement t'inspirer de l'exemple mais ne pas le copier.  
- Tu dois être exhaustif dans la description de manière percutante, concis mais descriptif.  
- Tu dois faire des phrases courtes.
`,
    painPoints: `TON RÔLE :
Tu es un expert copywriter.

CONTEXTE :
Je suis en train de rédiger le copywriting d'une landing pour une offre, dont le contenu est entre <<< et >>>.

INSTRUCTIONS :
1. Étudie le contenu de l'offre que j'ai déjà rédigé entre <<< et >>>.  
2. Garde uniquement les éléments qui décrivent des situations concrètes, répétitives et pénibles que vit ma cible.  
3. Reformule-les de manière percutante, brute, visuelle, sans enrobage.  
4. Ajoute aussi leurs limites actuelles : excuses, tentatives échouées, blocages mentaux.  
5. Termine la section par une phrase choc, brutale, qui met un coup de pression.
6. Tu trouveras le format attendu entre les caractères ((( et ))):
7. Tu trouveras un exemple déjà parfaitement rédigé de ce que je souhaite obtenir entre [[[ et ]]] :

DONNÉES :
((([
- Puce 1  
- Puce 2  
- ...  
- ...  
- ...  
- ...  
- ...  

Phrase finale choc.
)))

[[[
- Tu regardes des devs moins bons que toi décrocher des missions grâce à LinkedIn.
- Tu procrastines sur ton positionnement parce que "faut que je réfléchisse encore un peu".
- T'as l'impression de parler dans le vide à chaque post.
- Tu crois ne rien avoir à dire, alors tu postes pas.
- Tu t'es convaincu que LinkedIn c'est pour les influenceurs, pas pour toi.
- T'essaies des trucs au pif, sans stratégie, sans plan, sans résultat.
- Tu t'es promis de t'y mettre "sérieusement"... depuis 6 mois.

Pendant ce temps, d'autres prennent ta place.
]]]

<<<
Qui suis-je ?
${offer.offerJson?.generated?.whoAmI}

Le déroulé de l'offre :
${offer.offerJson?.generated?.steps}

Ce que comprend l'offre :
${offer.offerJson?.generated?.included}

Ce que ne comprend pas l'offre :
${offer.offerJson?.generated?.notIncluded}

Cette offre est faite pour vous si :
${offer.offerJson?.generated?.doneForYou}

Cette offre n'est pas faite pour vous si :
${offer.offerJson?.generated?.notDoneForYou}

Les questions fréquentes :
${offer.offerJson?.generated?.FAQ}
>>>

FORMAT ATTENDU :
- Tu ne dois pas mettre d'émojis.
- Tu ne dois pas utiliser de markdown, pas de gras, ni de **, pas de souligné, pas de italique, pas de titres.
- Tu dois être ultra direct.  
- Écrire des phrases courtes.  
- Créer un effet miroir : la personne doit se dire "c'est exactement moi".  
- Ne surtout pas vendre ici.  
- Ne pas mettre d'intro ni de conclusion (à part la punchline finale).  
- Utiliser un format liste à puces brutales.
`,
    doNothing: `TON RÔLE :
Tu es un expert en copywriting spécialisé dans les pages de vente à haute conversion.

CONTEXTE :
Je vais te donner un bloc de contenu avec des éléments à exploiter entre <<< et >>>.
L'objectif à terme est de faire une section intitulée : "Si tu ne fais rien" et une autre intitulée : "Si tu remplis ce formulaire".
Le but est de les mettre en opposition et inciter le lecteur à passer à l'action.
On ne va pas le faire le bloc "Si tu remplis ce formulaire" pour l'instant, mais c'est pour te donner le contexte.

INSTRUCTIONS :
Ton objectif est de transformer le contenu entre <<< et >>> en une section intitulée : "Si tu ne fais rien".

1. Reste simple, brut, direct.  
2. Utilise des phrases concrètes, visuelles, réalistes.  
3. Dans le bloc "Tu ne fais rien", mets l'accent sur la perte de CA potentielle sous forme de calcul.  
4. Le contenu des phrases doit être un calcul de non rentabilité de l'inaction pour le bloc "Tu ne fais rien".
L'inverse pour le bloc "Tu remplis ce formulaire" qu'on fera plus tard.
5. Tu dois respecter le format exact qui se trouve entre les caractères [[[ et ]]] :
6. Tu dois appliuer ça à l'offre qui est entre <<< et >>>
7. Tu trouveras un exemple complet de ce que je te demande entre les caractères ((( et )))
8. Pour la phrase choc finale, choisi vraiment quelque chose qui fait envie à un freelance qui veut devenir riche.
Exemple qui marche : "À l'année, t'as perdu une Porsche 911"
Exemple qui ne marche pas : "À l'année, t'as perdu un salaire de cadre supérieur"

DONNÉES :
[[[
↓ Ligne 1  
↓ Ligne 2  
↓ Ligne 3  
↓ Ligne 4  
✘ Ligne 5  

➜ Phrase finale choc, brutale, chiffrée. Doit créer un électrochoc.
]]]

((([
↓ Tu continues à publier dans le vide
↓ Ton profil reste invisible
↓ Tu rates 1 à 2 missions par mois
↓ À 400€/jour, tu perds 8000€/mois
✘ En 3 mois, t'as perdu 24 000€

➜ À l'année, t'as perdu une Tesla Model S
)))

<<<
Qui suis-je ?
${offer.offerJson?.generated?.whoAmI}

Cette offre est faite pour vous si :
${offer.offerJson?.generated?.doneForYou}

Le déroulé de l'offre :
${offer.offerJson?.generated?.steps}

Ce que comprend l'offre :
${offer.offerJson?.generated?.included}

Ce que ne comprend pas l'offre :
${offer.offerJson?.generated?.notIncluded}

Cette offre est faite pour vous si :
${offer.offerJson?.generated?.doneForYou}

Cette offre n'est pas faite pour vous si :
${offer.offerJson?.generated?.notDoneForYou}

Les questions fréquentes :
${offer.offerJson?.generated?.FAQ}

Tu te reconnais là dedans ?
${offer.offerJson?.generated?.painPoints}
>>>

FORMAT ATTENDU :
- Pas d'émojis, pas de promesses floues, pas de blabla.  
- Mets des points à la fin des phrases.  
- Tu ne dois pas utiliser de markdown, pas de gras, ni de **, pas de souligné, pas de italique, pas de titres, pas de [ ni ].
- Le retour ne doit contenir QUE ce qui est demandé, au même format que le texte entre <<< et >>>.
- Tu dois impérativement t'inspirer de l'exemple mais ne pas le copier.  
`,
    fillTheForm: `TON RÔLE :
Tu es un expert en copywriting spécialisé dans les pages de vente à haute conversion.

CONTEXTE :
Je vais te donner un bloc de contenu avec des éléments à exploiter entre <<< et >>>.
L'objectif à terme est de faire une section intitulée : "Si tu ne fais rien" et une autre intitulée : "Si tu remplis ce formulaire".
Le but est de les mettre en opposition et inciter le lecteur à passer à l'action.
Le bloc "Si tu ne fais rien" est déjà fait pour cette offre et est compris entre {{{ et }}}, tu dois faire le bloc "Si tu remplis ce formulaire".

INSTRUCTIONS :
Ton objectif est de transformer le contenu entre <<< et >>> en une section intitulée : "Si tu remplis ce formulaire".

1. Reste simple, brut, direct.  
2. Utilise des phrases concrètes, visuelles, réalistes.  
3. Dans le bloc "Tu remplis ce formulaire", mets l'accent sur l'accès à une opportunité réelle.  
4. Le contenu des phrases doit être un calcul de rentabilité de l'action pour le bloc "Tu remplis ce formulaire".
5. Tu va respecter le format exact qui se trouve entre les caractères [[[ et ]]] :
6. Tu dois appliquer ça à l'offre qui est entre <<< et >>>
7. Tu trouveras un exemple complet de ce que je te demande entre ((( et ))) 

DONNÉES :
[[[
↓ Ligne 1  
↓ Ligne 2  
↓ Ligne 3  
↓ Ligne 4  
✔︎ Ligne 5  

➜ Phrase finale positive, motivante, chiffrée. Doit inciter à l'action.
]]]

{{{
${offer.offerJson?.generated?.doNothing}
}}}

((([
↓ On clarifie ton positionnement
↓ Ton profil attire les bons clients
↓ Tu publies du contenu qui convertit
↓ Tu décroches des missions sous 2 à 3 mois
✔︎ Tu construis un canal d'acquisition rentable

➜ Une mission peut rembourser l'accompagnement
)))

<<<
Tu te reconnais là dedans ?
${offer.offerJson?.generated?.painPoints}

Qui suis-je ?
${offer.offerJson?.generated?.whoAmI}

Cette offre est faite pour vous si :
${offer.offerJson?.generated?.doneForYou}

Le déroulé de l'offre :
${offer.offerJson?.generated?.steps}

Ce que comprend l'offre :
${offer.offerJson?.generated?.included}

Ce que ne comprend pas l'offre :
${offer.offerJson?.generated?.notIncluded}

Cette offre est faite pour vous si :
${offer.offerJson?.generated?.doneForYou}

Cette offre n'est pas faite pour vous si :
${offer.offerJson?.generated?.notDoneForYou}

Les questions fréquentes :
${offer.offerJson?.generated?.FAQ}
>>>

FORMAT ATTENDU :
- Pas d'émojis, pas de promesses floues, pas de blabla.  
- Mets des points à la fin des phrases.  
- Tu ne dois pas utiliser de markdown, pas de gras, ni de **, pas de souligné, pas de italique, pas de titres, pas de [ ni ].
- Le retour ne doit contenir QUE ce qui est demandé, au même format que le texte entre <<< et >>>.
- Tu dois impérativement t'inspirer de l'exemple mais ne pas le copier.  
`,
  } as const;
};
