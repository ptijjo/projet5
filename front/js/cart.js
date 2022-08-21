
/*let choix = localStorage.getItem("choix");
choix= JSON.parse(choix);
console.log(choix);*/

let commande =JSON.parse(localStorage.getItem("commande"));

console.log("voici ma commande",commande);

//for (let i=0; i< commande.lenght; i++){

    fetch(`http://localhost:3000/api/products/${commande[0].id}`)
        .then (data => data.json())
        .then (panier => {
            console.log(panier.imageUrl);
            
            let totalPrice=panier.price*commande[0].quantite;
            //console.log(totalPrice);

        

        document.getElementById("totalPrice").innerText=totalPrice;  
        document.getElementById("totalQuantity").innerText=commande[0].quantite;
        
            
            
        let resume=document.getElementById("cart__items")
        resume.innerHTML=  `<article class="cart__item" data-id="{product-ID}" data-color="{product-color}">
                                <div class="cart__item__img">
                                    <img src="${panier.imageUrl}" alt="${panier.altTxt}">
                                </div>
                                <div class="cart__item__content">
                                    <div class="cart__item__content__description">
                                        <h2>${panier.name}</h2>
                                        <p>${commande[0].couleur}</p>
                                        <p> ${panier.price}€</p>
                                    </div>
                                    <div class="cart__item__content__settings">
                                        <div class="cart__item__content__settings__quantity">
                                            <p>Qté :</p>
                                            <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value=${commande[0].quantite}>
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
            console.log("Je supprime tous les articles");
            resume.innerHTML=`<p> Votre panier est vide</p>`;    
            
            document.getElementById("totalPrice").innerText=0;
            document.getElementById("totalQuantity").innerText=0;
            localStorage.clear();

        })
    })
//}
