const btt = document.querySelector('.btt')
const input = document.querySelector('.input')
const output = document.querySelector('.output')
const form = document.querySelector('.form')
const btnInformal = document.querySelector('.btn-informal')
const btnEquilibrado = document.querySelector('.btn-equilibrado')
const btnFormal = document.querySelector('.btn-formal')

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

btnInformal.addEventListener('click', async () => { 
  btnFormal.classList.remove('active')
  btnInformal.classList.add('active')
  btnEquilibrado.classList.remove('active')
  btnEquilibrado.classList.remove('active')
  active = "informal"
  console.log(active)
})


form.addEventListener('submit', async (event) => {
  event.preventDefault()
  const valorInput = input.value 
  console.log(valorInput)

  const responce = await fetch("https://api-rest-w0uk.onrender.com/chat" ,{
    method: "POST",
    headers:{
      "Content-Type": "application/json"
    },
    body: JSON.stringify({"texto": valorInput, "agr": active})
  } 
  )
  try{
     const data = await responce.json()
     output.value = data.msg
  }catch(error){
    console.error(error)
  }
 
})

