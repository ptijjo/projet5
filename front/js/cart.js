
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
                let prixTotalArticle;
                let qte = document.getElementsByClassName("itemQuantity");
                    
                for(let i=0; i<qte.length;i++){
                    
                    qte[i].addEventListener("change",function(){                                   
                                                                
                        let nvelleCommande = new Quantite(commande[i].id,commande[i].couleur,this.value);                                        
                        commande.splice(i,1,nvelleCommande);
                        console.log(commande);     
                        localStorage.clear;
                        saveArticle(commande);   
                        fetch(`http://localhost:3000/api/products/${commande[i].id}`)
                        .then (data => data.json())
                        .then (prixQte => {     
                            prixTotalArticle= prixQte.price*JSON.parse(nvelleCommande.quantite);
                            console.log(prixTotalArticle);                          
                            
                        })
                    })
                }   
                // Suppression d'element

                let supprimer = document.getElementsByClassName("deleteItem")
                //console.log(supprimer.length);
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
                
                
                                        
            })
                

                
                
                /*supprimer.addEventListener("click",()=>{
                    console.log("Je supprime l'article", element);
                    localStorage.clear();
                
                }*/

                    /*resume.innerHTML=`<p> ${panier.name} est supprimé du panier </p>`;    
                
                    document.getElementById("totalPrice").innerText=0;
                    document.getElementById("totalQuantity").innerText=0;
                    
                })*/
    }
    

    

            

    

    



}

