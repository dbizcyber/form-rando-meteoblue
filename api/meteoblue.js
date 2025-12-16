import crypto from "crypto";

export default function handler(req, res) {

    const SHARED_SECRET = process.env.METEOBLUE_SECRET;
    const API_KEY = process.env.METEOBLUE_KEY;

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

    res.status(200).json({
        signedUrl: `https://my.meteoblue.com${query}&sig=${sig}`
    });
}
Commit → Push
