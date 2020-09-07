// let colors = [
//    'rgb(224, 86, 253)', 
//    'rgb(34, 166, 179)', 
//    'rgb(106, 176, 76)', 
//    'rgb(240, 147, 43)', 
//    'rgb(72, 52, 212)', 
//    'rgb(255, 121, 121)' 
// ];


let body = document.querySelector('body');
let h1 = document.querySelector('h1');
let square = document.querySelectorAll('.square');
let message = document.querySelector('#message');
let colorDisplay = document.querySelector('#colorDisplay');
let button = document.querySelector('#reset');
let easy = document.querySelector('#easy');
let hard = document.querySelector('#hard');


// Cantidad de cuadrados que estan en juego. 
let numberOfSquares = 6;
   
// Generar un arreglo de 6 colores.
let colors = generateRandomColors(6);

// Generar al azar el color ganador.
let pickedColor = colors[pickColor()];

// Mostrar #colorDisplay el color ganador. 
colorDisplay.innerHTML = pickedColor;



// Agregar colores a los cuadrados.
for (let i = 0; i < square.length; i++) {
   square[i].style.backgroundColor = colors[i];
}


// Agregrar eventos a los cuadrados         
for (let i = 0; i < square.length; i++) {
   
   square[i].addEventListener('click', (e) => { 
   
      let clickedColor = square[i].style.backgroundColor; 
      
      // Si adivina el color ganador: click sobre el cuadrado que almacena el color de pickedColor
      if (clickedColor === pickedColor) {
         // 1). Colocar mensaje 'Correct!' a #message
         message.innerHTML = 'Correct!';
         // 2). Establecer el color de fondo de h1 con el color ganador.
         h1.style.backgroundColor = pickedColor;
         // 3). Establecer todos los cuadrados con el color ganador.
         changeColors(pickedColor);
         // 4). Cambiar mensaje del boton a 'Play Again?'
         button.innerHTML = 'Play Again?';
      } else {         

         // 1). Establecer al cuadrado que se le hizo click el color de fondo del body.
         square[i].style.backgroundColor = body.style.backgroundColor;
         // 2). Colocar mensaje 'Try Again' a #message
         message.innerHTML = 'Try Again';
         // Agregar efecto fadeOut al ocultar el cuadrado.  
         square[i].classList.add('fadeOut');
      }
   });
}


// FUNCIONES

// Establece el mismo color a todos los cuadrados.
function changeColors (color) {
   for (let i = 0; i < square.length; i++) {
      square[i].style.backgroundColor = color;      
   }
}


// Retorna un número entero aleatorio entre 0 y colors.length - 1 (inclusive). 
function pickColor() {
   return Math.round(Math.random() * (colors.length - 1));  
}


// Retorna un color aleatorio (string)   // 'rgb(n1,n2,n3)'    // entre 0 y 255 (inclusive)
function randomColor () {
   return 'rgb('+ Math.round(Math.random() * 255) +', '+ Math.round(Math.random() * 255) +', '+ Math.round(Math.random() * 255)+')';
}


// Retorna un arreglo de n colores aleatorios.
function generateRandomColors (n) {
   let arrColors = [];
   for (let i = 0; i < n; i++) {
      arrColors[i] = randomColor();
   }
   return arrColors;
}


// EVENTOS

button.addEventListener('click', (e) => {
   
   // Generar nuevos colores en el arreglo ( numberOfSquares === 3 || 6 )
   colors = generateRandomColors(numberOfSquares);
   // Generar al azar el color ganador.
   pickedColor = colors[pickColor()];
   // Mostrar en #colorDisplay el color ganador. 
   colorDisplay.innerHTML = pickedColor;

   // Reiniciar los colores
   for (let i = 0; i < colors.length; i++) {
      square[i].style.backgroundColor = colors[i];
   }

   // Resetear el mensaje del boton a 'New Colors'
   button.innerHTML = 'New Colors';

   // Eliminar posible mensaje que se haya generado de 'Correct' o 'Try Again'
   message.innerHTML = '';

   // Reestablecer el color de fondo original de h1.
   h1.style.backgroundColor = '#4682B4';
});


easy.addEventListener('click', (e) => {
   easy.classList.add('selected');
   hard.classList.remove('selected');

   // Generar un arreglo de 3 colores
   colors = generateRandomColors(3);
   // Generar al azar el color ganador.
   pickedColor = colors[pickColor()];
   // Mostrar en #colorDisplay el color ganador. 
   colorDisplay.innerHTML = pickedColor;

   // Establecer los colores a los 3 primeros cuadrados y ocultar Los 3 cuadrados restantes.  
   for (let i = 0; i < square.length; i++) {
      if (colors[i]) {  // Si existe un elemento, retorna string === true . Sino retorna undefined === false
         square[i].style.backgroundColor = colors[i];
      } else {
         square[i].style.display = 'none';
      }
   }

   // Reestablecer la cantidad de cuadrados en juego. 
   numberOfSquares = 3;
});


hard.addEventListener('click', (e) => {
   hard.classList.add('selected');
   easy.classList.remove('selected');

   // Generar un arreglo de 6 colores
   colors = generateRandomColors(6);
   // Generar al azar el color ganador.
   pickedColor = colors[pickColor()];
   // Mostrar en #colorDisplay el color ganador. 
   colorDisplay.innerHTML = pickedColor;


   // Hacer visible los 6 cuadrados (por si el usuario cambio al menos una vez a modo fácil) y agregar los colores a los cuadrados.
   for (let i = 0; i < square.length; i++) {
      square[i].style.display = 'block';
      square[i].style.backgroundColor = colors[i];
   }
   
   // Reestablecer la cantidad de cuadrados en juego. 
   numberOfSquares = 6;
});