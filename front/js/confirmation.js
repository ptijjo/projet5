const numeroCommande = window.location.search.split("?").join("").substr(25);
console.log(numeroCommande);

document.getElementById("orderId").innerText=numeroCommande;
localStorage.clear();