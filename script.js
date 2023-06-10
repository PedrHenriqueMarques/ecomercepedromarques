document.addEventListener("DOMContentLoaded", function () {
  const cardRow = document.getElementById("cardRow");
  const searchInput = document.getElementById("searchInput");
  const categorySelect = document.getElementById("categorySelect");
  let url = "https://diwserver.vps.webdock.cloud/products";

  
  // Função para buscar os produtos com base nos filtros
  function fetchProducts() {
    fetch(`${url}?page_items=21`)
      .then((response) => response.json())
      .then((data) => {
        cardRow.innerHTML = "";
        data.products.forEach((product) => {
          const cardCol = document.createElement("div");
          cardCol.classList.add("col-md-4");
          cardRow.classList.remove("card");
          cardCol.innerHTML = `
            <div class="card">
              <img src="${product.image}" class="card-img-top" alt="${product.title}">
              <div class="card-body">
                <h5 class="card-title">${product.title}</h5 >
                <p class="card-text">Categoria:${product.category}</p>
                <p class="card-text">Rating:${product.rating.rate}</p>
                <p class="card-text">$${product.price}</p>
                <a href="detalhes.html?id=${product.id}" class="btn btn-danger">Detalhes</a>
              </div>
            </div>
          `;

          cardRow.appendChild(cardCol);
        });
      });
  }
  
  // Função para buscar as categorias e preencher o select
  function fetchCategories() {
    fetch(`${url}/categories`)
      .then((response) => response.json())
      .then((data) => {
        data.forEach((category) => {
          const option = document.createElement("option");
          option.value = category;
          option.textContent = category;
          categorySelect.appendChild(option);
        });
      });
  }

  function fetchfilter() {
    const categoryQuery = categorySelect.value;
    if(categoryQuery=="Todas as categorias"){
      fetchProducts();
    }
    fetch(`${url}/category/${categoryQuery}?page_items=21`)
      .then((response) => response.json())
      .then((data) => {
        cardRow.innerHTML = "";
        data.products.forEach((product) => {
          const cardCol = document.createElement("div");
          cardCol.classList.add("col-md-4");
          cardRow.classList.remove("card");
          cardCol.innerHTML = `
            <div class="card">
              <img src="${product.image}" class="card-img-top" alt="${product.title}">
              <div class="card-body">
                <h5 class="card-title">${product.title}</h5 >
                <p class="card-text">Categoria:${product.category}</p>
                <p class="card-text">Rating:${product.rating.rate}</p>
                <p class="card-text">$${product.price}</p>
                <a href="detalhes.html?id=${product.id}" class="btn btn-danger">Detalhes</a>
              </div>
            </div>
          `;
          cardRow.appendChild(cardCol);
        });
      });
  
  }

  categorySelect.addEventListener("change", fetchfilter);
  
  function search(event){
    event.preventDefault();
    const searchQuery = searchInput.value;
    fetch(`${url}/search?query=${searchQuery}`)
    .then((response) => response.json())
    .then((data) => {
      cardRow.innerHTML = "";
      data.forEach((product) => {
        const cardCol = document.createElement("div");
        cardCol.classList.add("col-md-4");
        cardRow.classList.remove("card");
        cardCol.innerHTML = `
          <div class="card">
            <img src="${product.image}" class="card-img-top" alt="${product.title}">
            <div class="card-body">
              <h5 class="card-title">${product.title}</h5 >
              <p class="card-text">Categoria:${product.category}</p>
              <p class="card-text">Rating:${product.rating.rate}</p>
              <p class="card-text">$${product.price}</p>
              <a href="detalhes.html?id=${product.id}" class="btn btn-danger">Detalhes</a>
            </div>
          </div>
        `;
        cardRow.appendChild(cardCol);
      });
    });

  }
  searchButton.addEventListener("click", search);
  fetchCategories();


  fetchProducts();


});
