const numeroCommande = window.location.search.split("?").join("").substr(3);// on récupere l'id commande depuis l'url
document.getElementById("orderId").innerText=numeroCommande; // on ajoute l'id de la commande dans l'element avec pour id orderid
//localStorage.clear();