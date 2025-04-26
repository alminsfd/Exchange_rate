const base_Url="https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@2024-03-06/v1/currencies"

let dropselect=document.querySelectorAll(".dropdwon select")
let btn=document.querySelector("button")
let formcurr=document.querySelector(".from  select")
let tocurr=document.querySelector(".to  select")
let msg=document.querySelector(".msg")

for(let selec of dropselect){
    for(let code in countryList){
        let newOption=document.createElement("option")
        newOption.innerText=code
        newOption.value=code
        selec.append(newOption)
        if(selec.name==="from"&& code==="USD"){
            newOption.selected ="selected"
        }else if(selec.name==="to" && code==="BDT"){
            newOption.selected="selected"
        }
    }
    selec.addEventListener("change",(evt)=>{
        UpdateFlage(evt.target);
    })
}

const UpdateFlage=(element)=>{
     let current_Code=element.value
     let country_Code=countryList[current_Code]
     let newSrc=`https://flagsapi.com/${country_Code}/flat/64.png`
     let img=element.parentElement.querySelector("img")
     img.src=newSrc
}

btn.addEventListener("click", async(evt)=>{
    evt.preventDefault()
    let amount=document.querySelector(".amount input")
    let amount_value=parseFloat(amount.value)
    if(amount_value===""||amount_value<1){
        amount_value=1
        amount.value="1"
    }
    let from_currence=formcurr.value.toLowerCase()
    let to_currence=tocurr.value.toLowerCase()
    let response=await fetch(`${base_Url}/${from_currence}.json`)
    let data=await response.json()
    let rate=data[from_currence][to_currence]
    let Finall_value=amount_value*rate
    msg.innerText=`${amount_value}${formcurr.value}=${Finall_value}${tocurr.value}`
})