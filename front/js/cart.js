
let commande =JSON.parse(localStorage.getItem("commande"));


class Quantite{
    constructor(id,couleur,nombre){
        this.id=id;
        this.couleur=couleur;
        this.quantite=nombre;        
    }
}

//console.log("voici ma commande",commande);
if (commande==null){
    document.getElementById("cart__items").innerHTML= `<p> Votre panier est vide</p>`;
}
else{
    commande.forEach(element => {

        fetch(`http://localhost:3000/api/products/${element.id}`)
            .then (data => data.json())
            .then (panier => {                 
                
                
                document.getElementById("cart__items").innerHTML+=  `<article class="cart__item" data-id="${element.id}" data-color="${element.couleur}">
                                        <div class="cart__item__img">
                                            <img src="${panier.imageUrl}" alt="${panier.altTxt}">
                                        </div>
                                        <div class="cart__item__content">
                                            <div class="cart__item__content__description">
                                                <h2>${panier.name}</h2>
                                                <p>${element.couleur}</p>
                                                <p> ${panier.price}€</p>
                                            </div>
                                            <div class="cart__item__content__settings">
                                                <div class="cart__item__content__settings__quantity">
                                                    <p>Qté :</p>
                                                    <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value=${element.quantite}>
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
                                    console.log("Nous avons ",qte.length," articles dont on peut modifier la qte");

                                    qte.addEventListener("change",function(){                                   
                                                                                
                                        console.log(this.value);
                                        let nvelleCommande = new Quantite(element.id,element.couleur,this.value);
                                    
                                        commande.splice(0,1,nvelleCommande);
                                        console.log(commande);
                                        
                                        prixTotalArticle = this.value*this.price;                                     
                                                                             
                                        
                                    })
                                        
             })
                

                /*document.querySelector(".deleteItem").addEventListener("click",()=>{
                    console.log("Je supprime l'article", element);
                    localStorage.clear();
                    resume.innerHTML=`<p> ${panier.name} est supprimé du panier </p>`;    
                
                    document.getElementById("totalPrice").innerText=0;
                    document.getElementById("totalQuantity").innerText=0;
                    
                })*/
    })

            

    

    



}

