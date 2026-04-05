const objectIds = [
   437986, //Denial of St. Peter, Caravaggio x
   436140, //Dancers, Pink and Green, Edgar Degas x
   437519, //A River Landscape, Théodore Rousseau x
   437392,//Herman Doomer, Rembrandt x
   437878, //A Maid Asleep, Vermeer x
   436526, //First Steps, after Millet, Vincent van Gogh x
   435868, //The Card Players, Paul Cezanne x
   435702, //The Horse Fair, Rosa Bonheur x
   438123, //A Man Leaning on a Parapet, Georges Seurat x
   436545, //Manuel Osorio Manrique de Zuñiga, Goya x
   437526, //A Forest at Dawn with a Deer Hunt, Peter Paul Rubens x
   437316, //Côte des Grouettes, near Pontoise, Camille Pissarro x
   436455, //Evening: Landscape with an Aqueduct, Theodore Gericault x
   ];
   let Clicked = false;

   document.getElementById("refresh").addEventListener("click", newObject)

   async function newObject() {
      if (Clicked == false) {
         Clicked = !Clicked
         document.getElementById("refresh").innerHTML = 'Refresh <i class="fa fa-refresh"></i>';
      }    
      const randomObject = objectIds[Math.floor(Math.random() * objectIds.length)];
      console.log(randomObject);
      const baseUrl = "https://collectionapi.metmuseum.org/public/collection/v1/objects/";
      const url = `${baseUrl}${randomObject}`;
      
      try {
         const response = await fetch(url)
         const objectData = await response.json();
         displayObject(objectData);
      } catch (error) {
         console.log(error);
      }    
   }


   async function displayObject(objectData) {
      document.getElementById("object-image").src = objectData.primaryImage;
      document.getElementById("title").innerText = objectData.title;
      document.getElementById("artist").innerText = objectData.artistDisplayName;
      document.getElementById("date").innerText = objectData.objectDate;
      document.getElementById("medium").innerText = objectData.medium;
      console.log(objectData.primaryImage);

      const booksUrl = `https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(objectData.artistDisplayName)}&maxResults=3&key=AIzaSyDxqPLEilRQEFCfDar65LdO-_W5i_xEvVc`;
      
      try {
         const response = await fetch(booksUrl)
         const bookData = await response.json();
         displayBook(bookData);
      } catch (error) {
         console.log(error);
      }
   }

   function displayBook(bookData) {
      for (let i = 0; i < bookData.items.length; i++) {
         const book = bookData.items[i];
         document.getElementById("bookcover" + [i + 1]).src = book.volumeInfo.imageLinks.thumbnail;
         document.getElementById("booktitle" + [i + 1]).innerText = book.volumeInfo.title;
         document.getElementById("bookauthor" + [i + 1]).innerText = book.volumeInfo.authors;
         document.getElementById("bookdate" + [i + 1]).innerText = book.volumeInfo.publishedDate;
        };
      
   
   }

