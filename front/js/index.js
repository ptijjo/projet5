class Product{
  constructor(produit){
    
    produit && Object.assign(this, produit);
    /*Object.assign va assigner toutes les propriétes de l'objet de produit dans l'objet this mais sans ecraser celles qui existent
        déjà.
        THIS represente un object de la classe. */
  
  }
}


fetch("http://localhost:3000/api/products")
  .then (data => data.json()) //le resultat du fetch va etre sauvegardé dans la variable data 
  /* data => data.json : on transforme les données de data en un object de formats de données en json*/

  .then (listArticle =>{ // ce then retourne le then précedent dc data.json qui deviendra listeArticle
    for (let article of listArticle) {
      let product = new Product(article);
      document.getElementById("items").innerHTML+= `<a href="./product.html?id=${product._id}">
                                                      <article>
                                                        <img src="${product.imageUrl}" alt="${product.altTxt}">
                                                        <h3 class="productName">${product.name}</h3>
                                                        <p class="productDescription">${product.description}</p>
                                                      </article>
                                                    </a>`;
    }
    
  })


  