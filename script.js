//Getting word input and search button html elements

const wordInput = document.getElementById("wordInput");
const submitWord = document.getElementById("submitWord");
const resultArea = document.getElementById("resultDisplay");
//const title = document.getElementById("title");
//Fetch API when user clicks on search button

submitWord.addEventListener("click", () => {
    resultArea.innerHTML = "";
  const word = wordInput.value;
  //console.log(word);
  const response = fetch(
    `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`
  );
  response
    .then((data) => data.json())
    .then((e) => {
      console.log(e);

      //title.innerHTML = `${word}`;
      //console.log(e.length);
      for (let i = 0; i < e.length; i++) {
        const list = document.createElement("div");
        const wordName = document.createElement("div");
        wordName.innerHTML =  `${e[i].word}`;
       // console.log(e[i].phonetics.length);
        for (let j = 0; j < e[i].phonetics.length; j++) {
          //console.log(e[i].phonetics[j].audio);
          list.innerHTML = `<button>${e[i].phonetics[j].text}</button><br/>
                <audio controls>
                     <source src=${e[i].phonetics[j].audio} type="audio/mpeg">
                     <source src=${e[i].phonetics[j].audio} type="audio/ogg">
                        Your browser does not support the audio element.
                </audio>
                
                `;
           list.append(wordName);    
           resultArea.append(list);     
        }
        
        for(let k=0;k<e[i].meanings.length;k++){
            const meanings = document.createElement("div");
            meanings.classList.add("meanings");
            //console.log(e[i].meanings.length);
            meanings.innerHTML=`<p>${e[i].meanings[k].partOfSpeech}</p>
            <p>${e[i].meanings[k].synonyms}</p>
            `;
            list.append(meanings);
            //console.log(e[i].meanings[k].definitions.length);
            for(let l=0;l<e[i].meanings[k].definitions.length;l++){
                const definitions = document.createElement("div");
                definitions.innerHTML = `<p>${e[i].meanings[k].definitions[l].definition}</p>`;
                meanings.append(definitions);
            }
        }
      }
    })
    .catch((error) =>{
        //console.log(error);
        resultArea.innerHTML = error;
    } );
});
