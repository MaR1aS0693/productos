const detalleContainer = document.getElementById("detalleProducto");

const params = new URLSearchParams(window.location.search);
const productId = params.get("id");

if (!productId) {
  detalleContainer.innerHTML = "<p>Producto no encontrado</p>";
} else {
  fetch(`https://dummyjson.com/products/${productId}`)
    .then(response => response.json())
    .then(product => {
      detalleContainer.innerHTML = `
        <div class="detalle-card">
          <img src="${product.thumbnail}" alt="${product.title}">
          
          <div class="detalle-info">
            <h2>${product.title}</h2>
            <p class="detalle-description">${product.description}</p>

            <p class="detalle-price">$${product.price}</p>
            <p class="detalle-rating">⭐ ${product.rating}</p>
            <p class="detalle-category">${product.category}</p>
            <p class="opiniones-count">Opiniones: ${product.stock}</p>

            <button class="btn-volver" onclick="history.back()">
              ← Volver al catálogo
            </button>
          </div>
        </div>
      `;
    })
    .catch(error => {
      detalleContainer.innerHTML = "<p>Error al cargar el producto</p>";
      console.error(error);
    });
}
