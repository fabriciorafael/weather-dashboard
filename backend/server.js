const express = require("express")
const cors = require("cors")
require("dotenv").config()

process.on("uncaughtException", (erro) => {
    console.log("ERRO GLOBAL:", erro)
})

process.on("unhandledRejection", (erro) => {
    console.log("PROMISE ERROR:", erro)
})

const app = express()
app.use(cors())
app.use(express.json())

// CLIMA
app.get("/clima", async (req, res) => {
    const cidade = req.query.cidade

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${cidade}&appid=${process.env.CHAVE_CLIMA}&units=metric&lang=pt_br`

    const resposta = await fetch(url)
    const dados = await resposta.json()

    res.json(dados)
})

// IA
app.post("/ia", async (req, res) => {
    try {


        console.log("CHAVE IA:", process.env.CHAVE_IA)

        const { cidade, temperatura, umidade } = req.body

        const resposta = await fetch("https://api.groq.com/openai/v1/chat/completions", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${process.env.CHAVE_IA}`
            },
           body: JSON.stringify({
               model: "llama-3.1-8b-instant",
               messages: [
                    {
                       role: "user",
                       content: `Sugira roupa para:
           Cidade: ${cidade}
           Temperatura: ${temperatura}
           Umidade: ${umidade}`
                    }
                ]
            })
        })

        const dados = await resposta.json()

console.log("RESPOSTA IA:", dados)

if (dados.error) {
    return res.json({ erro: "Erro na IA" })
}

return res.json({
    resposta: dados.choices[0].message.content
})

    } catch (erro) {
        console.log("ERRO NA IA:", erro)
        res.status(500).json({ erro: "Erro interno" })
    }
})


app.listen(3000, () => {
    console.log("Servidor rodando na porta 3000")
})

