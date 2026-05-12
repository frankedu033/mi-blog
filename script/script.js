// script.js - Código para TODAS las páginas

document.addEventListener('DOMContentLoaded', function() {
    
    // ===== CÓDIGO PARA PRODUCTOS.HTML =====
    // Solo ejecutar si estamos en la página de productos
    if (document.querySelector('.galeria')) {
        // Inicializar carrito
        let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
        
        // Añadir evento a cada producto
        const productos = document.querySelectorAll('.producto');
        
        productos.forEach(producto => {
            producto.addEventListener('click', function() {
                const nombre = this.querySelector('p').textContent;
                const imagen = this.querySelector('img').src;
                
                // Añadir al carrito
                añadirAlCarrito(nombre, imagen);
                
                // Mostrar confirmación
                mostrarConfirmacion(`${nombre} añadido al carrito`);
            });
        });
        
        // Función para añadir productos al carrito
        function añadirAlCarrito(nombre, imagen) {
            const productoExistente = carrito.find(item => item.nombre === nombre);
            
            if (productoExistente) {
                productoExistente.cantidad += 1;
            } else {
                carrito.push({
                    nombre: nombre,
                    imagen: imagen,
                    cantidad: 1
                });
            }
            
            // Guardar en localStorage
            localStorage.setItem('carrito', JSON.stringify(carrito));
            
            // Actualizar contador del carrito
            actualizarContadorCarrito();
        }
        
        // Inicializar contador al cargar la página
        actualizarContadorCarrito();
    }
    
    // ===== CÓDIGO PARA INDEX.HTML =====
    // Solo ejecutar si estamos en la página de inicio
    if (document.querySelector('main') && document.querySelector('main section:first-child h2') && 
        document.querySelector('main section:first-child h2').textContent === 'Bienvenidos') {
        
        // Sistema de testimonios rotativos
        const testimonios = [
            {
                nombre: "María González",
                comentario: "¡Las mejores tortas de El Alto! Siempre pido para los cumpleaños de mis hijos.",
                rating: 5
            },
            {
                nombre: "Carlos López",
                comentario: "Los cupcakes de frambuesa son increíbles. Mi esposa los ama.",
                rating: 5
            },
            {
                nombre: "Ana Martínez",
                comentario: "Pedí una torta personalizada para mi boda y fue perfecta. ¡Gracias!",
                rating: 5
            }
        ];

        // Crear sección de testimonios
        const seccionTestimonios = document.createElement('section');
        seccionTestimonios.innerHTML = `
            <h2>Lo que dicen nuestros clientes</h2>
            <div class="testimonio-activo">
                <p class="testimonio-texto"></p>
                <p class="testimonio-autor"></p>
                <div class="testimonio-rating"></div>
            </div>
            <div class="controles-testimonios">
                <button id="anterior-testimonio">‹</button>
                <button id="siguiente-testimonio">›</button>
            </div>
        `;
        
        // Insertar después de la última sección
        const main = document.querySelector('main');
        main.appendChild(seccionTestimonios);

        let testimonioActual = 0;

        function mostrarTestimonio(index) {
            const testimonio = testimonios[index];
            const texto = document.querySelector('.testimonio-texto');
            const autor = document.querySelector('.testimonio-autor');
            const rating = document.querySelector('.testimonio-rating');
            
            texto.textContent = `"${testimonio.comentario}"`;
            autor.textContent = `- ${testimonio.nombre}`;
            rating.innerHTML = '★'.repeat(testimonio.rating) + '☆'.repeat(5 - testimonio.rating);
        }

        // Event listeners para controles
        document.getElementById('siguiente-testimonio').addEventListener('click', function() {
            testimonioActual = (testimonioActual + 1) % testimonios.length;
            mostrarTestimonio(testimonioActual);
        });

        document.getElementById('anterior-testimonio').addEventListener('click', function() {
            testimonioActual = (testimonioActual - 1 + testimonios.length) % testimonios.length;
            mostrarTestimonio(testimonioActual);
        });

        // Mostrar primer testimonio
        mostrarTestimonio(testimonioActual);

        // Rotación automática cada 5 segundos
        setInterval(function() {
            testimonioActual = (testimonioActual + 1) % testimonios.length;
            mostrarTestimonio(testimonioActual);
        }, 5000);
    }
    
    // ===== CÓDIGO PARA CONTACTO.HTML =====
    // Solo ejecutar si estamos en la página de contacto
    if (document.querySelector('.info') && document.querySelector('.info h2').textContent === 'Información de contacto') {
        
        // Crear formulario de contacto
        const formulario = document.createElement('form');
        formulario.innerHTML = `
            <h2>Envíanos un mensaje</h2>
            <label for="nombre">Nombre:</label>
            <input type="text" id="nombre" name="nombre" required>
            
            <label for="email">Email:</label>
            <input type="email" id="email" name="email" required>
            
            <label for="telefono">Teléfono:</label>
            <input type="tel" id="telefono" name="telefono">
            
            <label for="mensaje">Mensaje:</label>
            <textarea id="mensaje" name="mensaje" rows="5" required></textarea>
            
            <button type="submit">Enviar Mensaje</button>
        `;
        
        // Insertar el formulario antes de la información
        const infoSection = document.querySelector('.info');
        document.querySelector('main').insertBefore(formulario, infoSection);
        
        // Manejar envío del formulario
        formulario.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const nombre = document.getElementById('nombre').value;
            const email = document.getElementById('email').value;
            const telefono = document.getElementById('telefono').value;
            const mensaje = document.getElementById('mensaje').value;
            
            // Simular envío (en un caso real, aquí iría una petición AJAX)
            mostrarConfirmacion(`¡Gracias ${nombre}! Tu mensaje ha sido enviado. Te contactaremos pronto.`);
            
            // Limpiar formulario
            formulario.reset();
        });
    }
    
    // ===== FUNCIONES COMPARTIDAS =====
    // Función para actualizar el contador del carrito (compartida)
    function actualizarContadorCarrito() {
        const carrito = JSON.parse(localStorage.getItem('carrito')) || [];
        const totalItems = carrito.reduce((total, item) => total + item.cantidad, 0);
        
        // Crear o actualizar el contador en el nav
        let contador = document.querySelector('.contador-carrito');
        
        if (!contador) {
            contador = document.createElement('span');
            contador.className = 'contador-carrito';
            document.querySelector('nav').appendChild(contador);
        }
        
        contador.textContent = `(${totalItems})`;
    }
    
    // Función para mostrar confirmación (compartida)
    function mostrarConfirmacion(mensaje) {
        const notificacion = document.createElement('div');
        notificacion.textContent = mensaje;
        notificacion.className = 'notificacion';
        
        document.body.appendChild(notificacion);
        
        // Remover después de 3 segundos
        setTimeout(() => {
            if (document.body.contains(notificacion)) {
                document.body.removeChild(notificacion);
            }
        }, 3000);
    }
    
    // Efecto de scroll suave para enlaces internos (compartido)
    document.querySelectorAll('nav a').forEach(enlace => {
        enlace.addEventListener('click', function(e) {
            if (this.getAttribute('href').startsWith('#')) {
                e.preventDefault();
                const destino = document.querySelector(this.getAttribute('href'));
                if (destino) {
                    destino.scrollIntoView({
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
    
    // Inicializar contador del carrito en todas las páginas
    actualizarContadorCarrito();
});