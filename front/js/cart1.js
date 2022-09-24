// Code de creation des carts panier sans innerHtml ou innerText
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
          codeDeletePara.textContent = "Supprimer";

        
        

          