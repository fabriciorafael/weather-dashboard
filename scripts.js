/*
    Lógica de Programação
    - Algoritimo (Receita de bolo - passso a passo)

    Fluxo básico 

    [x] Descobrir quando o botão foi clicado
    [x] Pegar o nome da cidade do input
    [x] Enviar a Cidade para o servidor
    [x] Pegar a resposta e colocar na tela

    Fluxo de voz
    [x] Descobrir quando o botão foi clicado
    [x] Comecar a ouvir e pegar a trancricao
    [x] Enviar trancricao para o servidor
    [x] Pegar a resposta e coplocar na tela

    Fluxo da IA
    [x] Pegar os dados da cidade
    [x] Enviar dados para IA
    [x] Colocar os dados na tela
*/



async function cliqueiNoBotao() {
    let cidade = document.querySelector(".input-cidade").value
    let caixa = document.querySelector(".caixa-media")
  


    let respostaServidor = await fetch(`http://localhost:3000/clima?cidade=${cidade}`)
    let dadosJson = await respostaServidor.json()

    console.log(dadosJson)

    caixa.innerHTML = `
    <h2 class="cidade">${dadosJson.name}</h2>
    <p class="temp">${Math.floor(dadosJson.main.temp)} °C</p>
    <img class="icone" src="  https://openweathermap.org/payload/api/media/file/${dadosJson.weather[0].icon}.png">
    <p class="umidade">Umidade: ${dadosJson.main.humidity}%</p>
    <button class="botao-ia" onclick="pedirSugestaoRoupa()">Sugestão de Roupa</button>
    <p class="resposta-ia">Resposta da IA </p>
`



}

function detectaVoz() {
    let reconhecimento = new webkitSpeechRecognition()
    reconhecimento.lang = "pt-BR"
    reconhecimento.start()

    reconhecimento.onresult = function (evento) {
        let textoTranscrito = evento.results[0][0].transcript
        document.querySelector(".input-cidade").value = textoTranscrito
        cliqueiNoBotao()
    }
}

async function pedirSugestaoRoupa() {

    let temperatura = document.querySelector(".temp").textContent
    let umidade = document.querySelector(".umidade").textContent
    let cidade = document.querySelector(".cidade").textContent



    let resposta = await fetch("http://localhost:3000/ia", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            cidade,
            temperatura,
            umidade
        })
    })

    let dados = await resposta.json()

    console.log(document.querySelector(".resposta-ia"))

let elemento = document.querySelector(".resposta-ia")

if (dados.resposta) {
    elemento.innerHTML = dados.resposta
} else if (dados.error) {
    elemento.innerHTML = "Erro da IA: " + dados.error.message
} else {
    elemento.innerHTML = "Não consegui gerar sugestão 😢"
}
    console.log(dados)
}