import fetch from 'node-fetch'

export default async function handler(req, res) {
    try {
        const { from, to, amount } = req.query

        // URL da API externa com sua chave do .env
        const API_URL = `https://v6.exchangerate-api.com/v6/${process.env.API_KEY}/latest/${from}`

        const response = await fetch(API_URL)
        if (!response.ok) return res.status(500).json({ error: "Erro na API externa" })

        const data = await response.json()

        if (!data.conversion_rates || !data.conversion_rates[to]) {
            return res.status(500).json({ error: "Moeda inválida" })
        }

        const rate = data.conversion_rates[to]
        const cleanAmount = Number(amount.toString().replace(/ /g, '').replace(/,/g, ''))
        const result = cleanAmount * rate

        res.status(200).json({ result, rate })
    } catch (err) {
        console.error(err)
        res.status(500).json({ error: "Erro interno no servidor" })
    }
}