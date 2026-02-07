let skip = 0;
const limit = 10;
let totalProductos = 0;

const tabla = document.getElementById('tabla-productos');
const infoPagina = document.getElementById('info-pagina');

const cargarCategorias = () => {
    fetch('https://dummyjson.com/products/category-list')
    .then(res => res.json())
    .then(categorias => {
        const select = document.getElementById('filtro-categoria');
        categorias.forEach(cat => {
            select.innerHTML += `<option value="${cat}">${cat}</option>`;
        });
    })
    .catch(err => console.error('Error cargando categorías', err));
};

const cargarProductos = () => {
    fetch(`https://dummyjson.com/products?limit=${limit}&skip=${skip}`)
    .then(res => res.json())
    .then(data => {
        totalProductos = data.total;
        renderizarTabla(data.products);
        actualizarInfoPagina();
    })
    .catch(err => console.error('Error cargando productos', err));
};

const renderizarTabla = (productos) => {
    tabla.innerHTML = '';

    productos.forEach(p => {
        tabla.innerHTML += `
            <tr>
                <td>${p.id}</td>
                <td><img src="${p.thumbnail}"></td>
                <td>${p.title}</td>
                <td>$${p.price}</td>
                <td>${p.category}</td>
                <td>
                    <button onclick="editarProducto(${p.id})">✏️</button>
                    <button onclick="eliminarProducto(${p.id}, this)">🗑️</button>
                </td>
            </tr>
        `;
    });
};

const actualizarInfoPagina = () => {
    const paginaActual = Math.floor(skip / limit) + 1;
    const totalPaginas = Math.ceil(totalProductos / limit);
    infoPagina.textContent = `Página ${paginaActual} de ${totalPaginas}`;
};

const siguiente = () => {
    if(skip + limit < totalProductos){
        skip += limit;
        cargarProductos();
    }
};

const anterior = () => {
    if(skip - limit >= 0){
        skip -= limit;
        cargarProductos();
    }
};

const buscar = () => {
    const texto = document.getElementById('busqueda').value;

    fetch(`https://dummyjson.com/products/search?q=${texto}`)
    .then(res => res.json())
    .then(data => {
        renderizarTabla(data.products);
        infoPagina.textContent = `Resultados para "${texto}"`;
    })
    .catch(err => console.error('Error en búsqueda', err));
};

const filtrarCategoria = () => {
    const categoria = document.getElementById('filtro-categoria').value;

    if(!categoria){
        cargarProductos();
        return;
    }

    fetch(`https://dummyjson.com/products/category/${categoria}`)
    .then(res => res.json())
    .then(data => {
        renderizarTabla(data.products);
        infoPagina.textContent = `Categoría: ${categoria}`;
    })
    .catch(err => console.error('Error filtrando categoría', err));
};

const ordenarProductos = () => {
    const valor = document.getElementById('ordenar').value;

    if(!valor){
        cargarProductos();
        return;
    }

    const partes = valor.split('-');
    const campo = partes[0];
    const tipo = partes[1];

    fetch(`https://dummyjson.com/products?sortBy=${campo}&order=${tipo}&limit=${limit}&skip=${skip}`)
    .then(res => res.json())
    .then(data => renderizarTabla(data.products))
    .catch(err => console.error('Error ordenando productos', err));
};

const eliminarProducto = (id, boton) => {
    if(!confirm('¿Seguro que deseas eliminar este producto?')) return;

    fetch(`https://dummyjson.com/products/${id}`, {
        method: 'DELETE'
    })
    .then(res => res.json())
    .then(() => {
        boton.closest('tr').remove();
        alert('Producto eliminado (simulado)');
    })
    .catch(err => console.error('Error eliminando producto', err));
};

const editarProducto = (id) => {
    window.location.href = `editar.html?id=${id}`;
};


cargarCategorias();
cargarProductos();