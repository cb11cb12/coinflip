// Event listener on our button
document.querySelector('#clickMe').addEventListener('click', makeReq)

async function makeReq(){

  // Here we fetch the result of the coinflip from our server.js /api path
  const res = await fetch('/api')
  const data = await res.json()

  console.log(data);
  //suggestion: right before we change the text below, perhaps we could have the text flash red so the user can tell if it's changing from heads back to heads
  document.querySelector("#flipResponse").textContent = data.flip

}