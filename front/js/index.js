// Création d'une classe Product qui créera les différents éléments présents en back
class Product{
  constructor(produit){    
    produit && Object.assign(this, produit);
    /*Object.assign va assigner toutes les propriétes de l'objet de produit dans l'objet this mais sans ecraser celles qui existent
        déjà.
        THIS represente un object de la classe. */  
  }
}

// Requete GET afin de récupérer tous les produits présents dans la base de donées
fetch("http://localhost:3000/api/products")
  .then (data => data.json()) //le resultat du fetch va etre sauvegardé dans la variable data 
  /* data => data.json : on transforme les données de data en un object de formats de données en json*/

    .then (listArticle =>{ // ce then retourne le then précedent dc data.json qui deviendra listeArticle
      for (let article of listArticle) {
        let product = new Product(article); 
        
        // on ajoute tous les objets présents en base de donnée dans notre html 
        document.getElementById("items").innerHTML+= `<a href="./product.html?id=${product._id}">
                                                        <article>
                                                          <img src="${product.imageUrl}" alt="${product.altTxt}">
                                                          <h3 class="productName">${product.name}</h3>
                                                          <p class="productDescription">${product.description}</p>
                                                        </article>
                                                      </a>`;
      }      
    })
    //Affiche l'erreur si la requête ne s'execute pas correctement
    .catch((erreur)=> res.status(400).json({erreur}))

   // Affiche ce message si pas de réponse de le base de donnée 
  .catch(()=>{
    const erreur = document.createElement("p");
    erreur.innerHTML = '<strong style="font-size: 2em; color: green">Veuillez essayer plutard !</strong>';
    document.getElementById("items").appendChild(erreur);
  });


  