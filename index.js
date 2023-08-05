 // adds the replace at index method to string
 String.prototype.replaceAtIndex = function (index, replacement, length) {
    console.log(1);
    return this.substring(0, index) + replacement + this.substring(index + length);
}

function highlightHTMLContent(htmlContent, plainText, positions) {
    let selectedOccurrenceIndex; // this variable will store index

    const highlightedWords = positions.map((pos) => {
        const { start, end } = pos;
        const wordToHighlight = plainText.slice(start, end); // word that needs to be highlighted
        let currentIndex = plainText.indexOf(wordToHighlight); // index of the very first occurence of the word to be highlighted

        const occurrenceIndexes = []; // stored all the occurences of the word to be highlighted from the plainText string provided
        while (currentIndex !== -1) {
            occurrenceIndexes.push(currentIndex);
            currentIndex = plainText.indexOf(wordToHighlight, currentIndex + 1);
        }

        occurrenceIndexes.find((occurrence, index) => {
            if (occurrence === start) {
                selectedOccurrenceIndex = index;
            }
        }); // after finding all the occurences we find the occurence that matches the start and save the index of it from the occurrenceIndexes array 

        return { // then we return the object of word to be highlighted and its correct occurrence index from occurrenceIndexes array
            wordToHighlight,
            selectedOccurrenceIndex
        };
    }); // after this highlightedWords is an array of objects and these objects consist of the word to highlight and index of it from occurrenceIndexes array or basically which occurence of the word do we need to find in the given HTML content as it can have duplicate values


    highlightedWords.forEach((highlightedWord) => {

        const regex = new RegExp(`${highlightedWord.wordToHighlight}`, 'ig'); // here we create a regular expression which searches globally and differentiates between letter casing
        const htmlWordMatches = htmlContent.matchAll(regex); // we generate an iterator here which has all the occurences of the word to highlight from the htmlContent string and does not stop after just finding the first occurence
        const htmlWordArray = Array.from(htmlWordMatches); // now we create an array of the string iterator and so we could get every occurence as a different array inside and array and these occurences are from the htmlContent string and we save it with their index
        const matchedHtmlWord = htmlWordArray[highlightedWord.selectedOccurrenceIndex]; // then we find the array which we want by using the index of the occurrenceIndexes array we stored earlier or the occurence we want and we store this array for further use

        const matchedIndex = matchedHtmlWord.index; // we retrieve the index of the occurence required by us
        const matchedWord = matchedHtmlWord[0];

        htmlContent = htmlContent.replaceAtIndex(matchedIndex, `<mark>${matchedWord}</mark>`, matchedWord.length);
    });

    return htmlContent;
}


// this function runs first and the call the highlightHTMLContent function
function highlight() {
    const htmlContent = document.getElementById("html").value;
    const plainText = document.getElementById("text").value;

    const plainTextPositions = [];

    let checker = 1;
    const positionInputs = document.querySelectorAll(".position-input");
    positionInputs.forEach((input) => {
        const start = parseInt(input.querySelector("input:nth-child(1)").value);
        const end = parseInt(input.querySelector("input:nth-child(2)").value);
        if (!isNaN(start) && !isNaN(end)) {
            plainTextPositions.push({ start, end });
        }
        else{
            checker--;
        }
    });


    /* Sample Data */

    // const htmlContent = `<p><span>Hi David<br><br>Headline: Energix Closes $520 Million Financing and Tax Equity Deal to Fund New Solar Projects<br><br>Summary: Two deals with Morgan Stanley Renewables Inc. and Santander CIB will help finance the construction and operation of six utility Equity scale solar…<br><br>Read the Equity full article <a href="https://content.seleritycorp.com/hosted/assets/www/UKMW47_hYz_RGzPSpHm44Hi1L49HdNBhs1OkKKW2OPI">here</a><br><br>-------------------------------------<br><br>You received this because you are subscribed to news related to <a href="https://iris.steeleye.co/market/instruments?search=ES0113900J37">ES0113900J37</a>, and this story was marked as 82% relevant.<br><br>Copyright of PR Newswire. All Rights Reserved. Terms and Conditions | Privacy Policy. To stop PR Newswire emails from getting removed by email filters please add our address (noreply@prnewswire.com) to your email address book. Registered Office: 3 Spring Mews, London SE11 5AN. Tel: +44 (0) 207 8405100. <br><br>To unsubscribe change your email preferences, please click <a href="https://www.youtube.com/watch?v=dQw4w9WgXcQ&ab_channel=RickAstley">here</a>.<br><br>-------------------------------------<br><br><img src="https://context.seleritycorp.com/selerity/assets/sc_icons/pressRelease.png" alt="Rick Astley" style="width:100px;height:100px;"></span></p>`
    // const plainText = `Hi David Headline: Energix Closes $520 Million Financing and Tax Equity Deal to Fund New Solar Projects Summary: Two deals with Morgan Stanley Renewables Inc. and Santander CIB will help finance the construction and operation of six utility Equity scale solar… Read the full article here ------------------------------------- You received this because you are subscribed to news related to ES0113900J37 , and this story was marked as 82% relevant. Copyright of PR Newswire. All Rights Reserved. Terms and Conditions | Privacy Policy. To stop PR Newswire emails from getting removed by email filters please add our address (noreply@prnewswire.com) to your email address book. Registered Office: 3 Spring Mews, London SE11 5AN. Tel: +44 (0) 207 8405100. To unsubscribe change your email preferences, please click here . -------------------------------------`


    // const plainTextPositions = [
    //     {
    //         "start": 241,
    //         "end": 247  
    //         // "start": 0,
    //         // "end": 2
    //     },
    //     {
    //         "start": 518,
    //         "end": 525
    //     }
    // ];




    if(checker > 0){
        document.getElementById('output').classList.add('bg-Color')
        const result = highlightHTMLContent(htmlContent, plainText, plainTextPositions);
        document.getElementById("output").innerHTML = result;
        console.log(result)
    }


}




function addStartAndEndInputs(){
    const positionsInput = document.getElementById("positionsInput");
    const positionInput = document.createElement("div");
    positionInput.classList.add("position-input");
    positionInput.innerHTML = `
    <input type="number" class="form-control" placeholder="Start" />
    <input type="number" class="form-control" placeholder="End" />
`;
    positionsInput.appendChild(positionInput);

}





// module.exports = highlightHTMLContent;