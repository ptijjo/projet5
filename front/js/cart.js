
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

let prixTotalArticle=0;
let totalQuantite=0;    


class Quantite{
    constructor(id,couleur,nombre){
        this.id=id;
        this.couleur=couleur;
        this.quantite=nombre;       
    }
}

class Contact{
    constructor(idCommande,firstName,lastName,adresse,city,email){
        this.idCommande=idCommande;
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
                                    
                    prixTotalArticle+= panier.price*JSON.parse(commande[i].quantite);
                    console.log(panier.price, commande[i].quantite);                      
                    totalQuantite+= JSON.parse(commande[i].quantite);
                    document.getElementById('totalQuantity').innerText=totalQuantite;
                    document.getElementById('totalPrice').innerText=prixTotalArticle; 
      
                                  

                // Modification de quantité                    
                let qte = document.getElementsByClassName("itemQuantity");  
                             
                for(let i=0; i<qte.length;i++){   
                                     
                    qte[i].addEventListener("change",function(){    
                        prixTotalArticle=0;    
                        totalQuantite=0;                                                                                        
                        let nvelleCommande = new Quantite(commande[i].id,commande[i].couleur,this.value);                                        
                        commande.splice(i,1,nvelleCommande);     
                        localStorage.clear;
                        saveArticle(commande);                                     
                        for(let i=0;i<commande.length;i++){  
                            fetch(`http://localhost:3000/api/products/${commande[i].id}`)
                                .then (donne => donne.json())
                                .then (prix => {          
                                    
                                    
                                    prixTotalArticle+= prix.price*JSON.parse(commande[i].quantite);
                                    console.log(prix.price, commande[i].quantite); 
                                                         
                                    totalQuantite+= JSON.parse(commande[i].quantite);
                                    document.getElementById('totalQuantity').innerText=totalQuantite;
                                    document.getElementById('totalPrice').innerText=prixTotalArticle; 
                                })              
                        }
                        
                    })
                }   

                // Suppression d'element
                let supprimer = document.getElementsByClassName("deleteItem");
                for(let i=0; i<supprimer.length;i++){
                    supprimer[i].addEventListener("click", () =>{
                        prixTotalArticle=0;    
                        totalQuantite=0; 
                        console.log("Article supprimé est : ",commande[i]);
                        commande.splice(i,1);
                        saveArticle(commande);
                        location.reload();
                                              

                        for(let i=0;i<commande.length;i++){  
                            
                            fetch(`http://localhost:3000/api/products/${commande[i].id}`)
                                .then (donne => donne.json())
                                .then (prix => {                                 

                                    prixTotalArticle+= prix.price*JSON.parse(commande[i].quantite);
                                    console.log(prix.price, commande[i].quantite);                      
                                    totalQuantite+= JSON.parse(commande[i].quantite);
                                    document.getElementById('totalQuantity').innerText=totalQuantite;
                                    document.getElementById('totalPrice').innerText=prixTotalArticle; 
                                })              
                        }                            
                    })
                }                                 
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
        if (e.target.value.match(/^[a-zA-Z0-9\s-']{3,}$/)){
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
        if (e.target.value.match(/^[a-zA-Z0-9\s-.]+@[a-z]+\.[a-z]{2,6}$/)){
            document.getElementById('emailErrorMsg').innerText="";
        }
        else{
            document.getElementById('emailErrorMsg').innerText="Ce n'est pas un email correct";
        }        
    })

    
    
    //Passer la commande
    
    document.getElementById("order").addEventListener("click",()=>{
        while(prenom.value.match(/^[a-zA-Z\s-]{2,30}$/) && nom.value.match(/^[a-zA-Z\s'-]{2,30}$/) && adresse.value.match(/^[a-zA-Z0-9\s-']{3,}$/) && 
            ville.value.match(/^[a-zA-Z\s'-]{2,30}$/) && email.value.match(/^[a-zA-Z0-9\s-.]+@[a-z]+\.[a-z]{2,6}$/)){

            let min=1000; 
            let max=999999;  
            let idCommande = Math.floor(Math.random() * (max - min)) + min; 
            let contact = new Contact(idCommande,prenom.value,nom.value,adresse.value,ville.value,email.value);
        console.log(contact);
        saveContact(contact);       
        window.location.href=`./confirmation.html?id=${idCommande}`;
        break;
            
        }
        
        alert("Veuillez compléter le formulaire svp !");
        
        
    })
}

