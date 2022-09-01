
let commande =JSON.parse(localStorage.getItem("commande"));


function saveArticle(produit){
    return localStorage.setItem("commande",JSON.stringify(produit));  
   }

   function deleteArticle(article){
    localStorage.removeItem(article);
   }

   function saveContact(produit){
    return localStorage.setItem("Contact",JSON.stringify(produit));  
   }


class Quantite{
    constructor(id,couleur,nombre){
        this.id=id;
        this.couleur=couleur;
        this.quantite=nombre;       
    }
}

class Contact{
    constructor(firstName,lastName,adresse,city,email){
        this.firstName=firstName;
        this.lastName=lastName;
        this.adresse=adresse;
        this.city=city;
        this.email=email;
    }
}

if (commande==null){
    document.getElementById("cart__items").innerHTML= `<p> Votre panier est vide</p>`;
}

else{
    for (let i=0; i<commande.length; i++) {

        fetch(`http://localhost:3000/api/products/${commande[i].id}`)
            .then (data => data.json())
            .then (panier => {                             
                //console.log(panier);
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

                                    

                // Modification de quantité                    
                let qte = document.getElementsByClassName("itemQuantity");                    
                for(let i=0; i<qte.length;i++){                    
                    qte[i].addEventListener("change",function(){                                                                                           
                        let nvelleCommande = new Quantite(commande[i].id,commande[i].couleur,this.value);                                        
                        commande.splice(i,1,nvelleCommande);
                        console.log(commande);     
                        localStorage.clear;
                        saveArticle(commande);  
                        location.reload(); 
                    })
                }   

                // Suppression d'element
                let supprimer = document.getElementsByClassName("deleteItem");
                for(let i=0; i<supprimer.length;i++){
                    supprimer[i].addEventListener("click", () =>{
                        console.log("Article supprimé est : ",commande[i]);
                        console.log(commande);
                        commande.splice(i,1);
                        console.log(commande);
                        saveArticle(commande);
                        location.reload();
                        console.log(commande.length);
                        if(commande.length=0){
                            localStorage.clear();
                        }                   
                    })
                } 

                // Affichage du prix total
                let prixTotalArticle=0;
                let totalQuantite=0;               
                for(let i=0;i<commande.length;i++){                        
                            prixTotalArticle+= panier.price*JSON.parse(commande[i].quantite);
                            console.log(prixTotalArticle);                      
                    let chiffre = JSON.parse(commande[i].quantite);
                    totalQuantite+= chiffre;                    
                }
                document.getElementById('totalQuantity').innerText=totalQuantite;
                document.getElementById('totalPrice').innerText=prixTotalArticle;                                        
            })               
    }

    // Validation du formulaire
    let prenom=document.getElementById("firstName");
    prenom.addEventListener('input',function(e){
        if (e.target.value.match(/^[a-zA-Z\s-]{2,30}$/)){
            document.getElementById('firstNameErrorMsg').innerText="";
        }
        else{
            document.getElementById('firstNameErrorMsg').innerText="Ce n'est pas un prénom correct";
        }        
    })

    let nom=document.getElementById("lastName")
    nom.addEventListener('input',function(e){
        if (e.target.value.match(/^[a-zA-Z\s'-]{2,30}$/)){
            document.getElementById('lastNameErrorMsg').innerText="";
        }
        else{
            document.getElementById('lastNameErrorMsg').innerText="Ce n'est pas un nom correct";
        }        
    })

    let adresse=document.getElementById("address")
    adresse.addEventListener('input',function(e){
        if (e.target.value.match(/^[a-zA-Z0-9\s-]{3,}$/)){
            document.getElementById('addressErrorMsg').innerText="";
        }
        else{
            document.getElementById('addressErrorMsg').innerText="Ce n'est pas une adresse correct";
        }        
    })


    let ville=document.getElementById("city")
    ville.addEventListener('input',function(e){
        if (e.target.value.match(/^[a-zA-Z\s'-]{2,30}$/)){
            document.getElementById('cityErrorMsg').innerText="";
        }
        else{
            document.getElementById('cityErrorMsg').innerText="Ce n'est pas une ville correct";
        }        
    })


    let email=document.getElementById("email")
    email.addEventListener('input',function(e){
        if (e.target.value.match(/^[a-zA-Z0-9\s-.]+@[a-z]+\.[a-z]{2,4}$/)){
            document.getElementById('emailErrorMsg').innerText="";
        }
        else{
            document.getElementById('emailErrorMsg').innerText="Ce n'est pas un email correct";
        }        
    })

    
    
    //Passer la commande
    
    document.getElementById("order").addEventListener("click",()=>{
        let contact = new Contact(prenom.value,nom.value,adresse.value,ville.value,email.value)
        console.log(contact);
        saveContact(contact);
        window.location.href=`./confirmation.html?id=${commande[0].id}`;
        
        
    })
}

