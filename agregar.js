const crearProducto = () => {
    const titulo = document.getElementById('titulo').value;
    const precio = document.getElementById('precio').value;
    const descripcion = document.getElementById('descripcion').value;
    const categoria = document.getElementById('categoria').value;
    const cajaMensaje = document.getElementById('mensaje-exito');

    // Validación
    if(!titulo || !precio || !descripcion){
        alert('Por favor, complete todos los campos obligatorios.');
        return;
    }

    const nuevoProducto = {
        title: titulo,
        price: parseFloat(precio),
        description: descripcion,
        category: categoria
    };


    fetch('https://dummyjson.com/products/add', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(nuevoProducto)
    })
    .then(res => res.json())
    .then(productoCreado => {
        console.log("Respuesta API:", productoCreado);

        cajaMensaje.style.display = 'block';
        cajaMensaje.innerHTML = `
            <strong>¡Producto agregado correctamente!</strong><br>
            ID asignado: ${productoCreado.id}<br>
            Producto: ${productoCreado.title}<br>
            <small>Nota: Es una API de prueba, el producto no se guarda realmente en el servidor.</small>
        `;

       
        document.getElementById('titulo').value = '';
        document.getElementById('precio').value = '';
        document.getElementById('descripcion').value = '';
        document.getElementById('categoria').selectedIndex = 0;


        setTimeout(() => { window.location.href = '../agregar.html'; }, 2000);
    })
    .catch(error => {
        console.error('Error al crear el producto:', error);
        cajaMensaje.style.display = 'block';
        cajaMensaje.innerHTML = 'Error al guardar el producto.';
    });
};