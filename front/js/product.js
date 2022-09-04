const produit = window.location.search.split("?").join("").substr(3); //Recupère l'id sur l'Url



fetch(`http://localhost:3000/api/products/${produit}`)// Recherce de l'article en fonction de l'id sur l'url
.then (data => data.json())
.then (canape => {

    document.getElementById("title").innerText=`${canape.name}`; // affichage du nom en fonction de l'id sur URL
    let prix=document.getElementById("price").innerText=`${canape.price}`;// le prix
    document.getElementById("description").innerText=`${canape.description}`;// descritption
    document.querySelector(".item__img").innerHTML=`<img src="${canape.imageUrl}" alt="${canape.altTxt}"/>`; //Sa photo

    
    canape.colors.forEach(element => {  // affichage des couleurs disponibles en fonction de l'article
   
    document.getElementById("colors").innerHTML+= `<option value="${element}">${element}</option>;`;
    
    });

    let choixCouleur=document.getElementById("colors");         
    let quantite=document.getElementById("quantity");                    

    class Choix{   // Classe avec un id une couleur et une quantité
        constructor(){
            this.id=produit,
            this.couleur=choixCouleur.value,
            this.quantite=quantite.value
        }         
    }
    
     document.getElementById("addToCart").addEventListener("click",()=>{ //lorsqu'on click sur ajouter au panier   
        let panier =valide(); //on crée un objet avec une couelur un id et une quantité
        panier;
        if(panier.couleur.length==0){ // si on ne choisit pas de couleur on a un message d'alerte
            alert("Veuillez choisir une couleur");
        }        
        else{
        alert("Vous venez d'ajouter un produit"); // alerte nous disant qu'on a rajouté un article au panier
        let produit = addArticle(panier); // on recupere l'article qu'on stock dans un tableau puis dans le local storage
        produit; 
        window.location.href=`./index.html`; // On retourne à la page d'accueil avoir choisi un article
        }
    });
    
   function valide(){         // Fonction qui permet de créer un article
        let choix = new Choix();
        return choix;          
   }

   

   function saveArticle(produit){ // Fonction qui permet de sauvegarder l'article crée dans le localStorage
    return localStorage.setItem("commande",JSON.stringify(produit));  
   }

   function addArticle(produit){ // Fonction qui permet d'ajouter un article ou augmenter la quantité dans le localStorage
    
    

    
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




                                                  

    

