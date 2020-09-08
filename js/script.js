let body = document.querySelector('body');
let h1 = document.querySelector('h1');
let square = document.querySelectorAll('.square'); // Cuadrados
let mode = document.querySelectorAll('.mode');  // Botones 'Easy' y 'Hard'
let message = document.querySelector('#message');
let colorDisplay = document.querySelector('#colorDisplay');
let resetColorsButton = document.querySelector('#reset'); // Boton 'New Colors'

let colors, pickedColor, numberOfSquares;

// Cantidad de cuadrados iniciales. 
numberOfSquares = 6;

init();


function init () {
   addEventModes();
   addEventSquares();
   reset();
}


// Agrega eventos a los botones 'Easy' y 'Hard'.
function addEventModes () {
   for (let i = 0; i < mode.length; i++) {

      mode[i].addEventListener('click', (e) => {  // 0 === Easy   1 === Hard

         mode[0].classList.remove('selected');
         mode[1].classList.remove('selected');
         mode[i].classList.add('selected');

         numberOfSquares = (mode[i].innerHTML === 'Easy') ? 3 : 6;
         
         reset();
      });
   }
}


// Agregra eventos a los cuadrados.         
function addEventSquares () {

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
            resetColorsButton.innerHTML = 'Play Again?';
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
}


// Agregar evento al boton 'New Colors'.
resetColorsButton.addEventListener('click', (e) => {
   reset();
});


// Reestablece la cantidad de cuadrados visibles y les agrega los colores según el modo 'Easy' o 'Hard'. 
function reset () {
   // Generar arreglo de colores ( numberOfSquares: 3 || 6 )
   colors = generateRandomColors(numberOfSquares);
   // Generar al azar el color ganador.
   pickedColor = colors[pickColor()];
   // Mostrar en #colorDisplay el color ganador. 
   colorDisplay.innerHTML = pickedColor;

   // Hacer visible numberOfSquares cantidad de cuadrados y establecerle los colores.
   for (let i = 0; i < square.length; i++) {
      if (colors[i]) {  // Si existe un elemento, retorna string === true . Sino retorna undefined === false
         square[i].style.backgroundColor = colors[i];
         square[i].style.display = 'block';
      } else {
         square[i].style.display = 'none';
      }
   }

   // Resetear el mensaje del boton a 'New Colors'.
   resetColorsButton.innerHTML = 'New Colors';
   // Eliminar posible mensaje que se haya generado de 'Correct' o 'Try Again'.
   message.innerHTML = '';
   // Reestablecer el color de fondo original de h1.
   h1.style.backgroundColor = '#4682B4';
}


// Establece el mismo color a todos los cuadrados.
function changeColors (color) {
   for (let i = 0; i < square.length; i++) {
      square[i].style.backgroundColor = color;      
   }
}

// Retorna un número entero aleatorio entre 0 y colors.length - 1 (inclusive). 
function pickColor () {
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