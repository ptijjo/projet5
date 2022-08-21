const produit = window.location.search.split("?").join("").substr(3); //Recupère l'id sur l'Url



fetch(`http://localhost:3000/api/products/${produit}`)// Demande de l'article en fonction de l'id sur l'url
.then (data => data.json())
.then (canape => {

    document.getElementById("title").innerText=`${canape.name}`; // affichage du nom en fonction de l'id sur URL
    let prix=document.getElementById("price").innerText=`${canape.price}`;// le prix
    document.getElementById("description").innerText=`${canape.description}`;// descritption
    document.querySelector(".item__img").innerHTML=`<img src="${canape.imageUrl}" alt="${canape.altTxt}"/>`; //Sa photo

    for(let i=0; i<`${canape.colors.length}`;i++){    
    document.getElementById("colors").innerHTML+= `<option value="${canape.colors[i]}">${canape.colors[i]}</option>;`;

    }
    
    document.getElementById("addToCart").addEventListener("click",()=>{
    
    
       
        valide();
        let save=saveArticle(valide());
        save;
        let produit = addArticle(save);
        produit;
        
        
       
        
    });
    
   function valide(){
        let choixCouleur=document.getElementById("colors");         
        let quantite=document.getElementById("quantity");
                        

        class Choix{
            constructor(){
                this.id=produit;
                this.couleur=choixCouleur.value;
                this.quantite=quantite.value;
            }         
        }
        
        let choix = new Choix();
        return choix;    
         
   }

   function saveArticle(produit){
    return localStorage.setItem("commande",JSON.stringify(produit));  
   }

   function addArticle(){
    let commande=[];
    let produit = localStorage.getItem("commande");
    produit=JSON.parse(produit);
    
    commande.push(produit);
    saveArticle(commande);
   }

})




                                                  

    

