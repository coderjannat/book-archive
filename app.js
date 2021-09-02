//Getting Search details
const searchDetails = document.getElementById('search-details');
//Getting Results container
const booksContainer = document.getElementById('books-container');

///////////////////////// search button's event listerner///////////////////
document.getElementById('search-button').addEventListener('click', getSearchValue => {
    // input text field
    const searchText = document.getElementById('input-field');

    ////////////////////error handleing////////////////////////////
    if(searchText.value === ''){
        searchDetails.innerText = `Search field can't be empty!`;
        booksContainer.textContent = '';
    }else{
    ///////////////////// fetching data ////////////////////////////
    const url = (`https://openlibrary.org/search.json?q=${searchText.value}`);
    fetch(url)
    .then(response => response.json())
    .then(data => displayResults(data))
    }
    // clear input field
    searchText.value = '';
}); 

const displayResults = books => {
   
    
    booksContainer.textContent = '';

    books.docs.forEach(book => {
       
         // update the found results
        searchDetails.innerText = `Total Book Found ${books.numFound} !`
      
        // creating new div
        const div = document.createElement('div');
        div.classList.add('col');
        div.innerHTML = `
        <div class="card border-light h-100">
        <img src="https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg" class="card-img-top w-50 h-50 mx-auto" alt="...">
        <div class="card-body">
        
          <h5 class="card-title fw-bolder text-center">Book Name: ${book.title}</h5>
          <p class="fs-5 fst-italic text-primary">Author: ${book.author_name[0]}</p>
          <p class="fs-6">Publisher: ${book.publisher[0]}</p>
          <p class="fs-7">Published Year: ${book.first_publish_year}</p>
        </div>
      </div>
        `;

        // appending child
        booksContainer.appendChild(div);
    });

    // api error handling if search input not matched 
    if(books.numFound === 0){
        searchDetails.innerText = `No Result Found!`;
    }
}