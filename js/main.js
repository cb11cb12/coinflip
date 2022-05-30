document.querySelector('#clickMe').addEventListener('click', makeReq)

async function makeReq(){

  const res = await fetch('/api')
  const data = await res.json()

  console.log(data);
  //suggestion: right before we change the text below, perhaps we could have the text flash red so the user can tell if it's changing from heads back to heads
  document.querySelector("#flipResponse").textContent = data.flip

}