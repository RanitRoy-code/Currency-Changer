const BASE_URL = "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies";

const dropdown = document.querySelectorAll(".dropdown select");
const btn = document.querySelector("form button");
const fromCurr = document.querySelector(" .from select");
const toCurr = document.querySelector(".to select");
const MSG = document.querySelector(".msg");

for (let select of dropdown) {
    for (currcode in countryList) {
        let newoption = document.createElement("option");//create new options
        newoption.innerText = currcode;
        newoption.value = currcode;
        if (select.name == "from" && currcode == "USD") {
            newoption.selected = "selected";
        }
        else if (select.name == "to" && currcode == "INR") {
            newoption.selected = "selected";
        }
        select.append(newoption);
    }
    select.addEventListener("change", (evt) => {
        updateFlag(evt.target);
    })
}

const updateFlag = (element) => {
    let currcode = element.value;
    let countryCode = countryList[currcode];
    let newsrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
    let img = element.parentElement.querySelector("img");
    img.src = newsrc;

}

btn.addEventListener("click", async (evt) => {
    evt.preventDefault();//stop the default changes
    let amount = document.querySelector("form input");
    let amtvalue = amount.value;
    let flage = 1;
    for (let value in amtvalue) {
        if (value !== "0" || value !== "1" || value !== "2" || value !== "3" || value !== "4" || value !== "5" || value !== "6" || value !== "7" || value !== "8" || value !== "9") {
            flage = 0;
        }
    }
    if (amtvalue == "" || amtvalue < 1 || flage!== 0) {
        amtvalue = "";
        amount.value = "";
    }
    else {
        let fromValue = fromCurr.value;
        let toValue = toCurr.value;
        let fromAmtList = await fetch(`${BASE_URL}/${fromValue.toLowerCase()}.json`);
        let fromAmtCurrList = await fromAmtList.json();
        let unitAmt = fromAmtCurrList[fromValue.toLowerCase()][toValue.toLowerCase()];
        let finalAmt = amtvalue * unitAmt;
        MSG.innerText = `${amtvalue} ${fromValue} = ${finalAmt} ${toValue}`;
    }
});