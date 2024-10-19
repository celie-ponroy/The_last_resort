// scripts.js
document.addEventListener("DOMContentLoaded", () => {
    const papers = document.querySelectorAll(".paper");
    const nextButton = document.getElementById("next");
    const prevButton = document.getElementById("prev");
    let currentIndex = 0;

    // Fonction pour afficher la feuille actuelle
    function showPaper(index) {
        papers.forEach((paper, i) => {
            paper.style.display = i === index ? "block" : "none"; // Afficher la feuille courante
        });

        // Activer ou désactiver les boutons
        prevButton.disabled = index === 0; // Désactiver le bouton précédent si on est à la première feuille
        nextButton.disabled = index === papers.length - 1; // Désactiver le bouton suivant si on est à la dernière feuille
    }

    // Événements des boutons
    nextButton.addEventListener("click", () => {
        if (currentIndex < papers.length - 1) {
            currentIndex++;
            showPaper(currentIndex);
        }
    });

    prevButton.addEventListener("click", () => {
        if (currentIndex > 0) {
            currentIndex--;
            showPaper(currentIndex);
        }
    });

    // Afficher la première feuille au démarrage
    showPaper(currentIndex);
});
