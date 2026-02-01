
const itemsContainer = document.getElementById("items-container");
const searchInput = document.getElementById("searchInput");

let allProducts = [];


fetch("https://dummyjson.com/products?limit=30")
  .then(response => response.json())
  .then(data => {
    allProducts = data.products;
    renderProducts(allProducts);
  })
  .catch(error => {
    console.error("Error al cargar productos:", error);
  });


function renderProducts(products) {
  itemsContainer.innerHTML = "";

  if (products.length === 0) {
    itemsContainer.innerHTML = `<p class="no-results">No se encontraron productos</p>`;
    return;
  }

  products.forEach(product => {
    const itemDiv = document.createElement("div");
    itemDiv.classList.add("item");

   
    itemDiv.addEventListener("click", () => {
      window.location.href = `vista-detalle.html?id=${product.id}`;
    });

    itemDiv.innerHTML = `
      <img src="${product.thumbnail}" alt="${product.title}" class="item-image">
      <h3 class="item-title">${product.title}</h3>
      <p class="item-description">${product.description}</p>
      <p class="item-price">$${product.price}</p>
      <p class="item-rating">⭐ ${product.rating}</p>
      <p class="item-category">${product.category}</p>
    `;

    itemsContainer.appendChild(itemDiv);
  });
}


searchInput.addEventListener("input", () => {
  const searchText = searchInput.value.toLowerCase().trim();

  const filteredProducts = allProducts.filter(product =>
    product.title.toLowerCase().includes(searchText)
  );

  renderProducts(filteredProducts);
});
