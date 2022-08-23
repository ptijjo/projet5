const produit = window.location.search.split("?").join("").substr(3); //Recupère l'id sur l'Url



fetch(`http://localhost:3000/api/products/${produit}`)// Demande de l'article en fonction de l'id sur l'url
.then (data => data.json())
.then (canape => {

    document.getElementById("title").innerText=`${canape.name}`; // affichage du nom en fonction de l'id sur URL
    let prix=document.getElementById("price").innerText=`${canape.price}`;// le prix
    document.getElementById("description").innerText=`${canape.description}`;// descritption
    document.querySelector(".item__img").innerHTML=`<img src="${canape.imageUrl}" alt="${canape.altTxt}"/>`; //Sa photo

    
    canape.colors.forEach(element => {        
   
    document.getElementById("colors").innerHTML+= `<option value="${element}">${element}</option>;`;
    
    });

    let choixCouleur=document.getElementById("colors");         
    let quantite=document.getElementById("quantity");                    

    class Choix{   // creation d'un article avec un id une couleur et un quantité
        constructor(){
            this.id=produit,
            this.couleur=choixCouleur.value,
            this.quantite=quantite.value
        }         
    }
    
     document.getElementById("addToCart").addEventListener("click",()=>{ //lorsqu'on click sur ajouter au panier
    
       
        let panier =valide(); //on crée un objet avec une couelur un id et une quantité
        panier;
        
        

        let produit = addArticle(panier); // on recupere l'article qu'on stock dans un tableau puis dans le local storage
        produit; 
        

    });
    
   function valide(){        
        let choix = new Choix();
        return choix;          
   }

   function saveArticle(produit){
    return localStorage.setItem("commande",JSON.stringify(produit));  
   }

   function addArticle(produit){
    
    let stock = localStorage.getItem("commande");    

    if (stock==null){
        stock=[];
    }
    else{
     stock=JSON.parse(stock);
    } 

    let chercheId = stock.find(p => p.id == produit.id);
    let chercheCouleur= stock.find(p=> p.couleur==produit.couleur);
    

    console.log(produit.couleur);

    if (chercheId && chercheCouleur != undefined){
        chercheCouleur.quantite++;
    }

    else{        
        stock.push(produit);
    }
    

    
    
    
    //console.log("actuellement mon voici mon tableau",stock);

    saveArticle(stock);
    
    
    
   }

})




                                                  

    

