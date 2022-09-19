
let commande =JSON.parse(localStorage.getItem("commande")); //On recupere les articles dans le localstorage

let prixTotalArticle=0; // initilisation du prix total du panier
let totalQuantite=0;  // initialisation de la quantité totale du panier

function saveArticle(produit){ // fonction qui permet de sauvegarder un produit dans la localstorage
    return localStorage.setItem("commande",JSON.stringify(produit));  
   }

function deleteArticle(article){ // fonction qui permet de supprimer un article du localstorage
    localStorage.removeItem(article);
   }

function saveContact(produit){// fonction qui permet de sauvegarder les coordonnées des clients
    return localStorage.setItem("Contact",JSON.stringify(produit));  
   }

class Quantite{ // Classe avec un id, une couleur et une quantité
    constructor(id,couleur,nombre){
        this.id=id;
        this.couleur=couleur;
        this.quantite=nombre;       
    }
}

class Contact{ // quantité avec un numero de commande, coordonnées du formulaire
    constructor(idCommande,firstName,lastName,adresse,city,email){
        this.idCommande=idCommande;
        this.firstName=firstName;
        this.lastName=lastName;
        this.adresse=adresse;
        this.city=city;
        this.email=email;
    }
}



if (commande==null){ // Lorsque le localstorage est vide on affiche ce message
    document.getElementById("cart__items").innerHTML= `<p> Votre panier est vide</p>`;
}else{ // sinon     
    for (let i=0; i<commande.length; i++) { // on affiche tous les articles presents dans le localstorage
        fetch(`http://localhost:3000/api/products/${commande[i].id}`) // on fait une recherche en fonction de l'id dans le back
            .then (data => data.json())
                .then (panier => { // on ajoute en html la carte de l'objet present dans le localstorage                            
                
                    document.getElementById("cart__items").innerHTML+=  `<article class="cart__item" data-id="${commande[i].id}" data-color="${commande[i].couleur}">
                                            <div class="cart__item__img">
                                                <img src="${panier.imageUrl}" alt="${panier.altTxt}">
                                            </div>
                                            <div class="cart__item__content">
                                                <div class="cart__item__content__description">
                                                    <h2>${panier.name}</h2>
                                                    <p>${commande[i].couleur}</p>
                                                    <p> ${panier.price}€</p>
                                                </div>
                                                <div class="cart__item__content__settings">
                                                    <div class="cart__item__content__settings__quantity">
                                                        <p>Qté :</p>
                                                        <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value=${commande[i].quantite}>
                                                    </div>
                                                    <div class="cart__item__content__settings__delete">
                                                        <p class="deleteItem">Supprimer</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </article>`;      
                                        
                        prixTotalArticle+= panier.price*JSON.parse(commande[i].quantite);//le prix total est égale a la somme des prix de chaque article x par sa quantité  dans le localstorage                  
                        totalQuantite+= JSON.parse(commande[i].quantite);//la quantité totale est la somme de toutes les quantités des articles dans le localstorage
                        document.getElementById('totalQuantity').innerText=totalQuantite; //on affiche le prix total
                        document.getElementById('totalPrice').innerText=prixTotalArticle; // on affiche la quantité totale
        
                                    

                    // Modification de quantité                    
                    let qte = document.getElementsByClassName("itemQuantity");  
                                
                    for(let i=0; i<qte.length;i++){   // pour chaque article present dans le localstorage
                                        
                        qte[i].addEventListener("change",function(){ // on va ecouter le changement dans itemQuantity   
                            prixTotalArticle=0;   // on réinitialise le prix totale
                            totalQuantite=0;   // on reinitialise la quantité totale                                                                                     
                            let nvelleCommande = new Quantite(commande[i].id,commande[i].couleur,this.value); // on crée un nouvel objet avec la valeur lue dans itemQuantity                                     
                            commande.splice(i,1,nvelleCommande); // On remplace les données de l'article selectionné dans le localstorage    
                            localStorage.clear; // on vide le localstorage
                            saveArticle(commande);  // on y sauvegarde les nouveaux articles après modification                                   
                            for(let i=0;i<commande.length;i++){  // pour chaque article modifié
                                fetch(`http://localhost:3000/api/products/${commande[i].id}`) // on va rechercher dans le back en fonction de son id son prix
                                    .then (donne => donne.json())
                                    .then (prix => {          
                                        
                                        
                                        prixTotalArticle+= prix.price*JSON.parse(commande[i].quantite);// on définit le nouveau prix total du panier                                                         
                                        totalQuantite+= JSON.parse(commande[i].quantite);//on definit la nouvelle quantité totale du panier
                                        document.getElementById('totalQuantity').innerText=totalQuantite;// on affiche le nouveau prix total
                                        document.getElementById('totalPrice').innerText=prixTotalArticle; // on affiche la nouvelle quantité totale
                                    })              
                            }
                            
                        })
                    }   

                    // Suppression d'element
                    let supprimer = document.getElementsByClassName("deleteItem");// on récupere tous les elements ayant pour classe deleteItem
                    for(let i=0; i<supprimer.length;i++){// pour chaque elemnt ayant pour classe deleteItem
                        supprimer[i].addEventListener("click", () =>{  // lorsqu'on clique dessus 
                            prixTotalArticle=0; // On réinitialise le prix total du panier
                            totalQuantite=0; // on réinitialise la quantité totale du panier
                            commande.splice(i,1); // on supprime l'element 
                            saveArticle(commande);// on remplace l'ancien panier par le nouveau dans le localstorage
                            location.reload();// on rafraichi la page pour mettre a jour l'affichage                                            
                            for(let i=0;i<commande.length;i++){ // on va rechercher dans la back le prix de chaque element du localstorage en fonction de son id                            
                                fetch(`http://localhost:3000/api/products/${commande[i].id}`)
                                    .then (donne => donne.json())
                                    .then (prix => {                                 

                                        prixTotalArticle+= prix.price*JSON.parse(commande[i].quantite);// on définit le nouveau prix total du panier                    
                                        totalQuantite+= JSON.parse(commande[i].quantite);//on definit la nouvelle quantité totale du panier
                                        document.getElementById('totalQuantity').innerText=totalQuantite;// on affiche le nouveau prix total
                                        document.getElementById('totalPrice').innerText=prixTotalArticle; // on affiche la nouvelle quantité totale
                                    })              
                            }                            
                        })
                    }                                 
                })  
                .catch(error => {console.log(error)})
            .catch(error => {console.log(error)});                 
        }

    // Validation du formulaire avec des regex
    let prenom=document.getElementById("firstName"); // on récupere l'element du dom avec son id
    prenom.addEventListener('input',function(e){// on va ecouter tout ce qu'on y entre
        if (e.target.value.match(/^[a-zA-Z\s-]{2,30}$/)){ // si la valeur correspond au regex
            document.getElementById('firstNameErrorMsg').innerText="";// pas de message d'erreur
        }else{// sinon on affiche une erreur
            document.getElementById('firstNameErrorMsg').innerText="Veuillez compléter le champ avec au moins deux lettres !";
        }        
    })

    let nom=document.getElementById("lastName")
    nom.addEventListener('input',function(e){
        if (e.target.value.match(/^[a-zA-Z\s'-]{2,30}$/)){
            document.getElementById('lastNameErrorMsg').innerText="";
        }
        else{
            document.getElementById('lastNameErrorMsg').innerText="Veuillez compléter le champ avec au moins deux lettres !";
        }        
    })

    let adresse=document.getElementById("address")
    adresse.addEventListener('input',function(e){
        if (e.target.value.match(/^[a-zA-Z0-9\s-']{3,}$/)){
            document.getElementById('addressErrorMsg').innerText="";
        }
        else{
            document.getElementById('addressErrorMsg').innerText="Veuillez compléter le champ avec au moins trois chiffres ou lettres";
        }        
    })


    let ville=document.getElementById("city")
    ville.addEventListener('input',function(e){
        if (e.target.value.match(/^[a-zA-Z\s'-]{2,30}$/)){
            document.getElementById('cityErrorMsg').innerText="";
        }
        else{
            document.getElementById('cityErrorMsg').innerText="Veuillez compléter le champ avec au moins deux chiffres ou lettres";
        }        
    })


    let email=document.getElementById("email")
    email.addEventListener('input',function(e){
        if (e.target.value.match(/^[a-zA-Z0-9\s-.]+@+[a-z]+\.+[a-z]{2,6}$/)){
            document.getElementById('emailErrorMsg').innerText="";
        }
        else{
            document.getElementById('emailErrorMsg').innerText="Veuillez vérifier votre adresse email !";
        }        
    })    
    
    //Passer la commande    
    document.getElementById("order").addEventListener("click",()=>{// lorsqu'on clic sur l'element avec l'id order
        while(prenom.value.match(/^[a-zA-Z\s-]{2,30}$/) && nom.value.match(/^[a-zA-Z\s'-]{2,30}$/) && adresse.value.match(/^[a-zA-Z0-9\s-']{3,}$/) && 
            ville.value.match(/^[a-zA-Z\s'-]{2,30}$/) && email.value.match(/^[a-zA-Z0-9\s-.]+@+[a-z]+\.+[a-z]{2,6}$/)){
            // tant que les valeurs des formulaires correspondent a leur regex
            let min=1000; // on definit un nombre minimum
            let max=999999; // on definit un nombre maximum
            let idCommande = Math.floor(Math.random() * (max - min)) + min; // on crée un nombre aleatoire entre notre min et max
            let contact = new Contact(idCommande,prenom.value,nom.value,adresse.value,ville.value,email.value);// on crée un objet avec les valeur du formulaire et un id de commande        
            let fiche = [contact,commande];// on crée un tableau avec l'objet contact et le panier
            saveContact(fiche); //on sauvegarde la fiche dans le localstorage 
            localStorage.removeItem("commande");  // on supprime le panier du localstorage  
            window.location.href=`./confirmation.html?id=${idCommande}`;// on se redirige vers la page de confirmation avec un id de commande dans l'url
            break;// on sort de la boucle pour ne pas qu'elle soit infinie            
        }

        alert("Veuillez vérifier la champ non valide !");
        
        
    })
}

