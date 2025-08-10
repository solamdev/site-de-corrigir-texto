const btt = document.querySelector('.btt')
const input = document.querySelector('.input')
const output = document.querySelector('.output')
const form = document.querySelector('.form')
const btnInformal = document.querySelector('.btn-informal')
const btnEquilibrado = document.querySelector('.btn-equilibrado')
const btnFormal = document.querySelector('.btn-formal')
const btnColar = document.querySelector('.btn-colar')
const btnCopy = document.querySelector('.btn-copy')
const copiado = document.querySelector('.copiado')
const loader = document.querySelector('.loader')

let active = "equilibrado"

btnEquilibrado.addEventListener('click', async () => { 
  btnFormal.classList.remove('active')
  btnInformal.classList.remove('active')
  btnEquilibrado.classList.add('active')
  active = "equilibrado"
  console.log(active)
})

btnFormal.addEventListener('click', async () => { 
  btnFormal.classList.add('active')
  btnInformal.classList.remove('active')
  btnEquilibrado.classList.remove('acitive')
  btnEquilibrado.classList.remove('active')
  active = "formal"
  console.log(active)
  
})

output.addEventListener('input', () => {
  if(output.value.trim()) {
    btnCopy.disabled = false
    btnCopy.title = "copiar texto"
  }else{
    btnCopy.disabled = true
   btnCopy.title = "não há nada para copiar"
  }
})

btnCopy.addEventListener('click', () => {
    
  if(output.value.trim()){
    
    navigator.clipboard.writeText(output.value)
    copiado.classList.remove('hidden')
    copiado.classList.add('anmc-copy')
    setTimeout(function() {
      copiado.classList.add('hidden')
      copiado.classList.remove('anmc-copy')
    },4000)
  }
})

btnColar.addEventListener('click', () => {
  navigator.clipboard.readText().then((texto) =>{
    input.value = texto
    if(input.value.trim()){
      btt.disabled = false
    }

  })

})

btnInformal.addEventListener('click', async () => { 
  btnFormal.classList.remove('active')
  btnInformal.classList.add('active')
  btnEquilibrado.classList.remove('active')
  btnEquilibrado.classList.remove('active')
  active = "informal"
  console.log(active)
})

input.addEventListener('input', async () => {
  if (input.value.trim()) {
    btt.disabled = false
    btt.title = "Corrigir texto"
  } 
  else{
    btt.disabled = true
    btt.title = "Não há nada para corrigir"
  }
})

form.addEventListener('submit', async (event) => {
  event.preventDefault()
  const valorInput = input.value 
  console.log(valorInput)
  output.value = ""
  output.placeholder = ""
  loader.classList.remove('hidden')

  const responce = await fetch("https://api-rest-w0uk.onrender.com/chat" ,{
    method: "POST",
    headers:{
      "Content-Type": "application/json"
    },
    body: JSON.stringify({"texto": valorInput, "agr": active})
  } 
  )
  try{
    if (!responce.ok){
      throw new error(`erro ${responce.status}`)
    }
     const data = await responce.json()
     loader.classList.add('hidden')
     output.value = data.msg
     output.dispatchEvent(new Event('input'))

  }catch(error){
    output.value  = "Bah ocorreu um erro, tente novamente"
    console.error(error)
  }
 
})

