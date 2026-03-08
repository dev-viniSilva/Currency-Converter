
const amountInput = document.getElementById("amount")
const fromCurrencySelect = document.getElementById("from-currency")
const toCurrencySelect = document.getElementById("to-currency")
const convertBtn = document.getElementById("convert-btn")
const resultText = document.getElementById("convert-amount")
const exchangeRateText = document.getElementById("exchange-rate")
const errorMsg = document.getElementById("error-msg")


async function convert() {

    const amount = Number(amountInput.value.replace(/ /g, '').replace(/,/g, ''))
    const fromCurrency = fromCurrencySelect.value
    const toCurrency = toCurrencySelect.value

    if (amount === "" || Number(amount) <= 0) {
        errorMsg.style.display = "block"
        return
    } else {
        errorMsg.style.display = "none"
    }

    const response = await fetch(`/api/convert?from=${fromCurrency}&to=${toCurrency}&amount=${amount}`)
    if (!response.ok) {
        console.error("Erro ao converter")
        return
    }

    const data = await response.json()
    if (!data.result || !data.rate) {
        console.error("Dados inválidos")
        return
    }

    resultText.innerText = `${data.result.toFixed(2)} ${toCurrency}`
    exchangeRateText.innerText = `1 ${fromCurrency} = ${data.rate.toFixed(4)} ${toCurrency}`

}

convertBtn.addEventListener('click', () => {
    convert()
})