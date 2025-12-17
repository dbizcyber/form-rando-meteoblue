import crypto from "crypto";

export default function handler(req, res) {

    // 🔓 CORS – AUTORISER GITHUB PAGES
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET, OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");

    // Réponse immédiate aux requêtes OPTIONS (préflight)
    if (req.method === "OPTIONS") {
        return res.status(200).end();
    }

    try {
        const SHARED_SECRET = process.env.METEOBLUE_SECRET;
        const API_KEY = process.env.METEOBLUE_KEY;

        if (!SHARED_SECRET || !API_KEY) {
            return res.status(500).json({ error: "Variables Meteoblue manquantes" });
        }

        const lat = 47.1;
        const lon = 8.6;
        const expire = 1924948800;

        const query =
            `/packages/basic-1h?lat=${lat}&lon=${lon}` +
            `&apikey=${API_KEY}&expire=${expire}`;

        const sig = crypto
            .createHmac("sha256", SHARED_SECRET)
            .update(query)
            .digest("hex");

        return res.status(200).json({
            signedUrl: `https://my.meteoblue.com${query}&sig=${sig}`
        });

    } catch (err) {
        return res.status(500).json({
            error: "Erreur serveur",
            message: err.message
        });
    }
}


