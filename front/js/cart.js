
let commande =JSON.parse(localStorage.getItem("commande"));


function saveArticle(produit){
    return localStorage.setItem("commande",JSON.stringify(produit));  
   }

   function deleteArticle(article){
    localStorage.removeItem(article);
   }


class Quantite{
    constructor(id,couleur,nombre){
        this.id=id;
        this.couleur=couleur;
        this.quantite=nombre;       
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

    // Passer la commande

    document.getElementById("order").addEventListener("click",()=>{
        
    })
}

