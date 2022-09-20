// Récupération de l'id depuis l'url de la page
const str = window.location.href;
const url = new URL(str);
const produit = url.searchParams.get("id");



// Requete GET afin de récupérer un produit spécifique avec son id présent dans la base de donées
fetch(`http://localhost:3000/api/products/${produit}`)
    .then (data => data.json())
        .then (canape => {
            //Inserer en format text les caractéristiques du produit trouvé en base de données
            document.getElementById("title").innerText=`${canape.name}`; // Insertion du nom 
            document.getElementById("price").innerText=`${canape.price}`;// Insertion du prix
            document.getElementById("description").innerText=`${canape.description}`;// Insertion de la descritption
            document.querySelector(".item__img").innerHTML=`<img src="${canape.imageUrl}" alt="${canape.altTxt}"/>`; //Insertion de la photo

            // Affichage des différentes couleurs disponibles en fonction de l'article   
            canape.colors.forEach(element => {  
            document.getElementById("colors").innerHTML+= `<option value="${element}">${element}</option>;`;            
            });

            // Définition des variables couleur et quantité
            let choixCouleur=document.getElementById("colors");         
            let quantite=document.getElementById("quantity");                    

            // Définition d'une classe avec un id, une couleur et une quantité
            class Choix{   
                constructor(){
                    this.id=produit,
                    this.couleur=choixCouleur.value,
                    this.quantite=quantite.value
                }         
            }
            
            // Ajouter l'article au panier
            document.getElementById("addToCart").addEventListener("click",()=>{ //lorsqu'on click sur le bouton ajouter au panier   
                let panier =valide(); //on crée un objet avec une couleur un id et une quantité
                panier;

                // si on ne choisit pas de couleur on a un message d'alerte
                if(panier.couleur.length==0){ 
                    alert("Veuillez choisir une couleur");
                }
                // si on a une quantité negative on reçoit message d'alerte
                else if(panier.quantite<=0){
                    alert("Veuillez choisir une quantité positive et non nulle !");
                }                
                else{
                    alert(`Vous venez d'ajouter ${panier.quantite} ${canape.name} ${panier.couleur} au panier !`); // alerte nous disant qu'on a rajouté un article au panier
                    let produit = addArticle(panier); // on recupere l'article qu'on stock dans un tableau puis dans le local storage
                    produit; 
                    
                }
            });
            
            // Fonction qui permet de créer un article avec une couleur un id et une quantité   
            function valide(){         
                let choix = new Choix();
                return choix;          
            }

            
            // Fonction qui permet de sauvegarder l'article crée dans le localStorage
            function saveArticle(produit){ 
                return localStorage.setItem("commande",JSON.stringify(produit));  
            }

            // Fonction qui permet d'ajouter un article ou augmenter la quantité dans le localStorage
            function addArticle(produit){     
                let stock = localStorage.getItem("commande"); 
                if (stock==null){ // lorsque le localstorage est vide nous créons un tableau vide
                    stock=[];
                }
                else{  // si non vide on va sérialiser les données du localstorage
                    stock=JSON.parse(stock);
                } 
                let chercheId = stock.find(p => p.id == produit.id);//on cherche une correspondance avec le nouvel id et un id deja present dans le localstorage
                let chercheCouleur= stock.find(p=> p.couleur==produit.couleur);//on cherche une correspondance avec la nouvelle couleur et une couleur deja present dans le localstorage
                if (chercheId && chercheCouleur != undefined){// si l'id et la couleur corresponde a un article dans le localstorage
                    let quantite = JSON.parse(chercheCouleur.quantite) + JSON.parse(produit.quantite);
                    chercheCouleur.quantite=quantite; //la quantité sera egale a la quantité du nouvelle article + l'article deja present
                }
                else{ // si l'id et la couleur ne correspondent pas on ajoute le nouvel article au localstorage
                    stock.push(produit);
                }
                saveArticle(stock); // On sauvegarde le nouveau panier            
            }
        })
        .catch((erreur)=> res.status(400).json({erreur}))
    .catch((erreur)=> res.status(500).json({erreur}))

    
        
    
      




                                                  

    

