export default async function handler(req, res) {
    if (req.method !== "POST") {
        return res.status(405).json({ error: "Method not allowed" });
    }

    const { email, firstName, phone } = req.body;

    const ACTIVE_CAMPAIGN_API_KEY = process.env.ACTIVE_CAMPAIGN_API_KEY;
    const ACTIVE_CAMPAIGN_LIST_ID = process.env.ACTIVE_CAMPAIGN_LIST_ID;
    const ACTIVE_CAMPAIGN_URL = process.env.ACTIVE_CAMPAIGN_URL + "/api/3/contacts"; // Concatenando corretamente

    try {
        const response = await fetch(ACTIVE_CAMPAIGN_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Api-Token": ACTIVE_CAMPAIGN_API_KEY
            },
            body: JSON.stringify({
                contact: {
                    email,
                    firstName,
                    phone,
                    listid: ACTIVE_CAMPAIGN_LIST_ID,
                }
            })
        });

        const data = await response.json();
        return res.status(200).json(data);
    } catch (error) {
        return res.status(500).json({ error: "Error submitting the form." });
    }
}
