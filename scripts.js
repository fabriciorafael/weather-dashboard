/*
    Lógica de Programação
    - Algoritimo (Receita de bolo - passso a passo)

    Fluxo básico 

    [x] Descobrir quando o botão foi clicado
    [x] Pegar o nome da cidade do input
    [x] Enviar a Cidade para o servidor
    [] Pegar a resposta e colocar na tela

    Fluxo de voz
    [] Descobrir quando o botão foi clicado
    [] Comecar a ouvir e pegar a trancricao
    [] Enviar trancricao para o servidor
    [] Pegar a resposta e coplocar na tela

    Fluxo da IA
    [] Pegar os dados da cidade
    [] Enviar dados para IA
    [] Colocar os dados na tela
*/


async function cliqueiNoBotao() {
    let cidade = document.querySelector(".input-cidade").value
    let caixa = document.querySelector(".caixa-media")
    let chave = "ebf6c5a14d1e47ecb69a99403c998775"

    let endereco = `https://api.openweathermap.org/data/2.5/weather?q=${cidade}&appid=${chave}&units=metric&lang=pt_br`
    let respostaServidor = await fetch(endereco)

    let dadosJson = await respostaServidor.json()

    console.log(dadosJson)

    caixa.innerHTML = `
    <h2 class="cidade">${dadosJson.name}</h2>
    <p class="temp">${Math.floor(dadosJson.main.temp)} °C</p>
    <img class="icone" src="  https://openweathermap.org/payload/api/media/file/${dadosJson.weather[0].icon}.png">
    <p class="umidade">Umidade: ${dadosJson.main.humidity}</p>
    <button class="botao-ia">Sugestão de Roupa</button>
    <p class="resposta-ia">Resposta da IA </p>



    `
}
