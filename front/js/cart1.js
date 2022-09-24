let prixTotalArticle=0; // initilisation du prix total du panier
let totalQuantite=0;  // initialisation de la quantité totale du panier


// Classe avec un id, une couleur et une quantité
class Quantite{ 
    constructor(id,couleur,nombre){
        this.id=id;
        this.couleur=couleur;
        this.quantite=nombre;       
    }
}



let commande =JSON.parse(localStorage.getItem("commande"));



if (commande==null || commande.length==0){ // Lorsque le localstorage est vide on affiche ce message
    document.getElementById("cart__items").innerHTML= `<p> Votre panier est vide</p>`;
}

afficherPanier(commande);


function afficherPanier(commande){

    
    for (let i =0; i < commande.length; ++i){
        fetch(`http://localhost:3000/api/products/${commande[i].id}`) // on fait une recherche en fonction de l'id dans le back
            .then (data => data.json())
                .then (canape => {
          let cart = document.querySelector("#cart__items"); //sélection du noeud
          
          //création des balises
          let codeArticle = document.createElement("article");//<article></article>
          let codeDivImg = document.createElement("div")//<div></div>
          let codeImg = document.createElement("img");//</img>
          let codeDivContent = document.createElement("div");//<div></div>
          let codeDivDescription = document.createElement("div");//<div></div>
          let codeH2 = document.createElement("h2");//<h2></h2>
          let codeColorPara = document.createElement("p");//<p></p>
          let codePricePara = document.createElement("p");//<p></p>
          let codeDivSettings = document.createElement("div");//<div></div>
          let codeDivQuantity = document.createElement("div");//<div></div>
          let codeQuantityPara = document.createElement("p");//<p></p>
          let codeQuantityInput = document.createElement("input");//<input></input>
          let codeDivDelete = document.createElement("div");//<div></div>
          let codeDeletePara = document.createElement("p");//<p></p>

          //Affecter les balises, classes et attribut dans le dom
          cart.appendChild(codeArticle);// ajout <article> a la balise parente <section> dans le DOM
          codeArticle.classList.add("cart__item");//ajout de class="cart_item" à la balise <article> dans le DOM
          codeArticle.dataset.id = commande[i].id;//ajout de l'attribut 'data' à la balise <article> dans le DOM
          codeArticle.dataset.color = commande[i].couleur;//ajout de l'attribut 'data' à la balise <article> dans le DOM

          codeArticle.appendChild(codeDivImg);
          codeDivImg.classList.add("cart__item__img");
          codeDivImg.appendChild(codeImg);
          codeImg.src = canape.imageUrl;
          codeImg.alt = canape.altTxt;

          codeArticle.appendChild(codeDivContent);
          codeDivContent.classList.add("cart__item__content");

          codeDivContent.appendChild(codeDivDescription);
          codeDivDescription.classList.add("cart__item__content__description");
          codeDivDescription.appendChild(codeH2);
          codeH2.textContent = canape.name;
          codeDivDescription.appendChild(codeColorPara);
          codeColorPara.textContent = commande[i].couleur;
          codeDivDescription.appendChild(codePricePara);
          codePricePara.textContent = canape.price+ "€";

          codeDivContent.appendChild(codeDivSettings);
          codeDivSettings.classList.add("cart__item__content__settings");
          codeDivSettings.appendChild(codeDivQuantity);
          codeDivQuantity.classList.add("cart__item__content__settings__quantity");
          codeDivQuantity.appendChild(codeQuantityPara);
          codeQuantityPara.textContent = "Qté : ";
          codeDivQuantity.appendChild(codeQuantityInput);
          codeQuantityInput.type = "number";
          codeQuantityInput.classList.add("itemQuantity");
          codeQuantityInput.name = "itemQuantity";
          codeQuantityInput.min = "1";
          codeQuantityInput.max = "100";
          codeQuantityInput.value = commande[i].quantite;

          codeDivSettings.appendChild(codeDivDelete);
          codeDivDelete.classList.add("cart__item__content__settings__delete");
          codeDivDelete.appendChild(codeDeletePara);
          codeDeletePara.classList.add("deleteItem");
          codeDivDelete.textContent = "Supprimer";

        
        

          prixTotalArticle+= canape.price*JSON.parse(commande[i].quantite);//le prix total est égale a la somme des prix de chaque article x par sa quantité  dans le localstorage                  
          totalQuantite+= JSON.parse(commande[i].quantite);//la quantité totale est la somme de toutes les quantités des articles dans le localstorage
          document.getElementById('totalQuantity').innerText=totalQuantite; //on affiche le prix total
          document.getElementById('totalPrice').innerText=prixTotalArticle; // on affiche la quantité totale

                        
        })
        // Modification de quantité                    
        let qte = document.getElementsByClassName("itemQuantity");
        let article = document.querySelectorAll("article");                                 
        for(let i=0; i<qte.length;++i){   // pour chaque article present dans le localstorage                                        
            qte[i].addEventListener("change",function(event){ // on va ecouter le changement dans itemQuantity   
                
                prixTotalArticle=0;   // on réinitialise le prix total
                totalQuantite=0;   // on reinitialise la quantité totale   
                let nouvelleQuantite = event.target.value;
                nouvelleQuantite = Math.abs(nouvelleQuantite);    
                
                let idArticle = article[i].dataset.id;
                //console.log(idArticle);
                let couleurArticle = article[i].dataset.color;
                //console.log(couleurArticle);

                let position = commande.findIndex((i)=> i.id === idArticle && i.couleur === couleurArticle);
              console.log(position);
              commande[position].quantite = nouvelleQuantite;
              console.log(nouvelleQuantite);


                let nvelleCommande = new Quantite(commande[position].id,commande[position].couleur,commande[position].quantite); // on crée un nouvel objet avec la valeur lue dans itemQuantity                                     
                commande.splice(i,1,nvelleCommande); // On remplace les données de l'article selectionné dans le localstorage    
                localStorage.clear; // on vide le localstorage
                saveArticle(commande);  // on y sauvegarde les nouveaux articles après modification    

                for(let i=0;i<commande.length;++i){  // pour chaque article modifié
                    fetch(`http://localhost:3000/api/products/${element.id}`) // on va rechercher dans le back en fonction de son id son prix
                        .then (donne => donne.json())
                        .then (prix => {                                       
                            prixTotalArticle+= prix.price*JSON.parse(element.quantite);// on définit le nouveau prix total du panier                                                         
                            totalQuantite+= JSON.parse(element.quantite);//on definit la nouvelle quantité totale du panier
                            document.getElementById('totalQuantity').innerText=totalQuantite;// on affiche le nouveau prix total
                            document.getElementById('totalPrice').innerText=prixTotalArticle; // on affiche la nouvelle quantité totale
                        })
                        .catch((erreur)=> console.log(erreur))
                    .catch((erreur)=> console.log(erreur))              
                }
                
            })
        } 


        // Suppression d'élements du panier
        let supprimer = document.getElementsByClassName("deleteItem");// on récupere tous les élements ayant pour classe deleteItem
        for(let i=0; i<supprimer.length;++i){/**  @for pour chaque élement ayant pour classe deleteItem*/ 
            supprimer[i].addEventListener("click", ()=>{  // lorsqu'on clique dessus 
                alert(`Vous avez supprimé ${panier.name} ${commande[i].couleur} du panier !`); 
                prixTotalArticle=0; // On réinitialise le prix total du panier
                totalQuantite=0; // on réinitialise la quantité totale du panier
                commande.splice(i,1); // on supprime l'élement du local storage
                saveArticle(commande);// on remplace l'ancien panier par le nouveau dans le localstorage                                                    
                location.reload();// on met à jour l'affichage                                                                  
                for(let i=0;i<commande.length;++i){ // on va rechercher dans le back le prix de chaque element du localstorage en fonction de son id                            
                    fetch(`http://localhost:3000/api/products/${commande[i].id}`)
                        .then (donne => donne.json())
                            .then (prix => { 
                                prixTotalArticle+= prix.price*JSON.parse(commande[i].quantite);// on définit le nouveau prix total du panier                    
                                totalQuantite+= JSON.parse(commande[i].quantite);//on définit la nouvelle quantité totale du panier
                                document.getElementById('totalQuantity').innerText=totalQuantite;// on affiche le nouveau prix total
                                document.getElementById('totalPrice').innerText=prixTotalArticle; // on affiche la nouvelle quantité totale
                            })  
                            .catch((erreur)=> console.log(erreur))
                        .catch((erreur)=> console.log(erreur))
                }                            
            })
        }                                 
    }  
  
}


