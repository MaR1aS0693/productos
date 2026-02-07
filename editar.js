const parametros = new URLSearchParams(window.location.search);
const id = parametros.get('id');

const cargarProducto = () => {
    if(!id) return;
    fetch('https://dummyjson.com/products/' + id)
    .then(res => res.json())
    .then(producto => {
        document.getElementById('titulo').value = producto.title || '';
        document.getElementById('precio').value = producto.price || '';
        document.getElementById('descripcion').value = producto.description || '';
        document.getElementById('categoria').value = producto.category || 'smartphones';
        document.getElementById('imagen').value = (producto.images && producto.images[0]) || producto.thumbnail || '';
    })
    .catch(err => console.error('Error al cargar producto', err));
}

const editarProducto = () => {
    const titulo = document.getElementById('titulo').value;
    const precio = document.getElementById('precio').value;
    const descripcion = document.getElementById('descripcion').value;
    const categoria = document.getElementById('categoria').value;
    const imagen = document.getElementById('imagen').value;
    const cajaMensaje = document.getElementById('mensaje-exito');

    if(!titulo || !precio || !descripcion){
        alert('Por favor, complete todos los campos obligatorios.');
        return;
    }

    // Preparar objeto con los datos editados
    const productoActualizado = {
        title: titulo,
        price: parseFloat(precio),
        category: categoria,
        description: descripcion
    };
    if(imagen) productoActualizado.thumbnail = imagen;

    // Realizar PUT a la API de DummyJSON para actualizar el producto
    fetch('https://dummyjson.com/products/' + id, {
        method: 'PUT',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(productoActualizado)
    })
    .then(respuesta => respuesta.json())
    .then(productoActualizado => {
        console.log("Respuesta API:", productoActualizado);
        cajaMensaje.style.display = 'block';
        cajaMensaje.innerHTML = `
            <strong>¡Producto actualizado!</strong><br>
            ID: ${productoActualizado.id}<br>
            Producto: ${productoActualizado.title}<br>
            Precio: $${productoActualizado.price}<br>
            Categoría: ${productoActualizado.category}
        `;

        setTimeout(()=>{ window.location.href = `detalle.html?id=${id}` },2000);
    })
    .catch(error => {
        console.error('Error al actualizar el producto:', error);
        cajaMensaje.style.display = 'block';
        cajaMensaje.innerHTML = 'Error al actualizar el producto.';
    });
}

// iniciar
cargarProducto();