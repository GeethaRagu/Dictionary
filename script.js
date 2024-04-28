//Getting the html elements

const wordInput = document.getElementById("wordInput");
const submitWord = document.getElementById("submitWord");
const resultArea = document.getElementById("resultDisplay");
const accordion = document.getElementById("accordionFlushExample");

//function to create elements
function element(tag, classname, id, text) {
  let tags = document.createElement(tag);
  tags.classList = classname;
  tags.id = id;
  tags.innerHTML = text;
  return tags;
}

//Fetch API when user clicks on search button

submitWord.addEventListener("click", () => {
  accordion.innerHTML = "";
  const word = wordInput.value;
  //console.log(word);
  const response = fetch(
    `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`
  );
  response
    .then((data) => data.json())
    .then((e) => {
     // console.log(e);
      for (let i = 0; i < e.length; i++) {
        const accordionItem = element("div", "accordion-item", "", "");
        const accordionHeader = element("h2", "accordion-header", "", "");
        const accordionButton = element("button", " ", "", "");
        accordionButton.classList.add("accordion-button", "collapsed");
        accordionButton.setAttribute("type", "button");
        accordionButton.setAttribute("data-bs-toggle", "collapse");
        accordionButton.setAttribute("data-bs-target", `#flush-collapse${i}`);
        // console.log(e[i].phonetics.length);
        for (let j = 0; j < e[i].phonetics.length; j++) {
          accordionButton.innerHTML = `
            <div>
                    <span>${e[i].phonetics[j].text}</span><br/>
                    <audio controls>
                            <source src=${e[i].phonetics[j].audio} type="audio/mpeg">
                            <source src=${e[i].phonetics[j].audio} type="audio/ogg">
                                Your browser does not support the audio element.
                    </audio>
            </div>        
            <div>Synonyms and definitions of ${e[i].word} </div>
                `;
          accordionHeader.append(accordionButton);
          accordionItem.append(accordionHeader);
          accordion.append(accordionItem);
        }
        const accordionBody = element("div", " ", "", "");
        accordionBody.classList.add("accordion-collapse", "collapse");
        accordionBody.setAttribute("id", `flush-collapse${i}`);
        accordionBody.setAttribute("data-bs-parent", "#accordionFlushExample");

        const accordionBodySub = element("div", "accordion-body", "", "");
        for (let k = 0; k < e[i].meanings.length; k++) {
          const meanings = element("div", "meanings", "", "");
          //console.log(e[i].meanings.length);
          meanings.innerHTML = `<p>${e[i].meanings[k].partOfSpeech}</p>`;
          //
          if (e[i].meanings[k].synonyms.length > 0)
            meanings.innerHTML += `<div>Synonyms of ${e[i].word} : ${e[i].meanings[k].synonyms}</div>`;

          accordionBodySub.append(meanings);

          const defTitle = element("h5", "", "", "");
          defTitle.innerHTML = `Definitions of ${e[i].word}:`;
          const uList = element("ul", "list-group", "", "");
          for (let l = 0; l < e[i].meanings[k].definitions.length; l++) {
            const definitions = element("li", "list-group-item", "", "");
            definitions.innerHTML = `${e[i].meanings[k].definitions[l].definition}`;
            uList.append(definitions);
          }
          meanings.append(defTitle, uList);
        }

        accordionBody.append(accordionBodySub);
        accordionItem.append(accordionBody);
        resultArea.setAttribute("style","border:2px solid gray");
      }
      
      resultArea.setAttribute("style","visibility:visible"); //show details container only after data are fetched
    })
    .catch((error) => {
      //console.log(error);
      accordion.innerHTML = error;
    });
});
