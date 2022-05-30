document.querySelector('#clickMe').addEventListener('click', makeReq)

async function makeReq(){
  // coin.style.animation = "none";

  const res = await fetch('/api')
  const data = await res.json()

  console.log(data);
  //suggestion: right before we change the text below, perhaps we could have the text flash red so the user can tell if it's changing from heads back to heads

    // coin toss
    const coin = document.getElementById("coin");
    coin.style.animation = "none";
    // coin toss
     //coin toss
      if (data.flip === 'Heads') {
        coin.style.animation = "flip-heads 3s forwards"
      }
      else if (data.flip === 'Tails') {
        coin.style.animation = "flip-tails 3s forwards"
      }
      //coin toss


  document.querySelector("#flipResponse").textContent = data.flip

}