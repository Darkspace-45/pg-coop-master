document.getElementById('usuarioForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const datos = {
        codigo_usuario: document.getElementById('codigo_usuario').value,
        nombre: document.getElementById('nombre').value,
        apellido: document.getElementById('apellido').value,
        telefono: document.getElementById('telefono').value,
        correo_electronico: document.getElementById('correo_electronico').value,
        cedula: document.getElementById('cedula').value
    };

    fetch('http://localhost:5000/api/usuarios', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(datos)
    })
    .then(response => response.json())
    .then(data => {
        console.log('Éxito:', data);
        const responseMessage = document.getElementById('responseMessage');
        responseMessage.innerText = 'Usuario agregado correctamente';
        
        // Desaparecer el mensaje después de 3 segundos
        setTimeout(() => {
            responseMessage.innerText = '';
        }, 3000);

              // Limpiar los inputs
              document.getElementById('codigo_usuario').value = '';
              document.getElementById('nombre').value = '';
              document.getElementById('apellido').value = '';
              document.getElementById('telefono').value = '';
              document.getElementById('correo_electronico').value = '';
              document.getElementById('cedula').value = '';
    })
    .catch(error => {
        console.error('Error al agregar el usuario:', error);
        const responseMessage = document.getElementById('responseMessage');
        responseMessage.innerText = 'Error al agregar el usuario';
        
        // Desaparecer el mensaje después de 3 segundos
        setTimeout(() => {
            responseMessage.innerText = '';
        }, 3000);
    });
});
