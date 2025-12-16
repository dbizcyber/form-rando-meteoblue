<script>
(function () {
    const input = document.getElementById("parking-depart");
    if (!input) {
        console.error("Champ parking-depart introuvable");
        return;
    }

    let lastValue = "";

    input.addEventListener("blur", function () {
        const valeur = input.value.trim();
        if (!valeur || valeur === lastValue) return;
        lastValue = valeur;

        fetch("https://form-rando-meteoblue.vercel.app/api/meteoblue")
            .then(response => response.json())
            .then(data => {
                if (data.signedUrl) {
                    window.open(data.signedUrl, "_blank", "noopener");
                } else {
                    console.error("Réponse API invalide", data);
                }
            })
            .catch(err => console.error("Erreur Meteoblue :", err));
    });
})();
</script>

