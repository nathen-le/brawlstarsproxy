import express from "express";
import fetch from "node-fetch";

const app = express();
const PORT = process.env.PORT || 3000;

const BRAWL_API = "https://api.brawlstars.com/v1";
const TOKEN = process.env.BRAWL_TOKEN; // We’ll set this in Render

app.get("/player/:tag", async (req, res) => {
    try {
        const tag = req.params.tag.replace("#", "%23");

        const r = await fetch(`${BRAWL_API}/players/${tag}`, {
            headers: { Authorization: `Bearer ${TOKEN}` }
        });

        const data = await r.json();
        res.json(data);
    } catch (e) {
        res.status(500).json({ error: "API error" });
    }
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));