// on récupere l'id commande depuis l'url
const str = window.location.href;
const url = new URL(str);
const numeroCommande = url.searchParams.get("id");

// on ajoute l'id de la commande dans l'element avec pour id orderid
document.getElementById("orderId").innerText=numeroCommande; 
//localStorage.clear();