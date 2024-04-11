

function API() {

   
    const url = "https://api.api-ninjas.com/v1/quotes?category=happiness"

    fetch(url, {
        headers: {
            "X-Api-Key": "zpHSqA1y7GNkkV4Sz1spRA==ES9TThFsQLVNjU3m"
        }
    })
        .then(function (respons) { return respons.json() })
        .then(function (data) {
            console.log("data", data)

            let quoteDatas = data;



            quoteDatas.map(function (quoteData) {
                console.log(quoteData);
                document.getElementById("api").innerHTML = "";



                let card = document.createElement("div");
                card.setAttribute("class", "card");

                let quote = document.createElement("p");
                quote.innerHTML = quoteData.quote;

                let author = document.createElement("p");
                author.innerHTML = quoteData.author;



                card.appendChild(quote);
                card.appendChild(author);
                document.getElementById("api").appendChild(card);
              
                
               
                
            });

        })

        .catch(function (error) {
            console.log("Något gick fel: ", error)

        })
}

