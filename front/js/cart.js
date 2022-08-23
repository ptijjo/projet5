
let commande =JSON.parse(localStorage.getItem("commande"));

console.log("voici ma commande",commande);
if (commande==null){
    document.getElementById("cart__items").innerHTML= `<p> Votre panier est vide</p>`;
}
else{
    commande.forEach(element => {

        fetch(`http://localhost:3000/api/products/${element.id}`)
            .then (data => data.json())
            .then (panier => {
                console.log(element);
                
                /*let totalPrice=panier.price*element.quantite;        

                document.getElementById("totalPrice").innerText=totalPrice;  
                document.getElementById("totalQuantity").innerText=element.quantite;*/
                
                
                
                let resume=document.getElementById("cart__items")
                resume.innerHTML+=  `<article class="cart__item" data-id="{product-ID}" data-color="{product-color}">
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


                document.querySelector(".itemQuantity").addEventListener("click",()=>{




                })    

                document.querySelector(".deleteItem").addEventListener("click",()=>{
                    console.log("Je supprime l'article", element);
                    localStorage.clear();
                    resume.innerHTML=`<p> ${panier.name} est supprimé du panier </p>`;    
                
                    /*document.getElementById("totalPrice").innerText=0;
                    document.getElementById("totalQuantity").innerText=0;*/
                    
                })
            })

    });
}

