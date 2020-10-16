$(document).on("click", '[data-toggle="lightbox"]', function (event) {
  event.preventDefault();
  $(this).ekkoLightbox();
});

$(".port-item").click(function () {
  $(".collapse").collapse("hide");
});

class TypeWriter {
  constructor(txtElement, words, wait = 3000) {
    this.txtElement = txtElement;
    this.words = words;
    this.txt = "";
    this.wordIndex = 0;
    this.wait = parseInt(wait, 10);
    this.type();
    this.isDeleting = false;
  }

  type() {
    // Current index of word
    const current = this.wordIndex % this.words.length;
    // Get full text of current word
    const fullTxt = this.words[current];

    // Check if deleting
    if (this.isDeleting) {
      // Remove char
      this.txt = fullTxt.substring(0, this.txt.length - 1);
    } else {
      // Add char
      this.txt = fullTxt.substring(0, this.txt.length + 1);
    }

    // Insert txt into element
    this.txtElement.innerHTML = `<span class="txt">${this.txt}</span>`;

    // Initial Type Speed
    let typeSpeed = 100;

    if (this.isDeleting) {
      typeSpeed /= 2;
    }

    // If word is complete
    if (!this.isDeleting && this.txt === fullTxt) {
      // Make pause at end
      typeSpeed = this.wait;
      // Set delete to true
      this.isDeleting = true;
    } else if (this.isDeleting && this.txt === "") {
      this.isDeleting = false;
      // Move to next word
      this.wordIndex++;
      // Pause before start typing
      typeSpeed = 100;
    }

    setTimeout(() => this.type(), typeSpeed);
  }
}

// Init On DOM Load
document.addEventListener("DOMContentLoaded", init);

// Init App
function init() {
  const txtElement = document.querySelector(".txt-type");
  const words = JSON.parse(txtElement.getAttribute("data-words"));
  const wait = txtElement.getAttribute("data-wait");
  // Init TypeWriter
  new TypeWriter(txtElement, words, wait);
}

// //partical
// var canvas = document.getElementById("canvas");
// var c = canvas.getContext("2d");
// var tx = window.innerWidth;
// var ty = window.innerHeight;
// canvas.width = tx;
// canvas.height = ty;
// //c.lineWidth= 5;
// //c.globalAlpha = 0.5;

// var mousex = 0;
// var mousey = 0;

// addEventListener("mousemove", function () {
//   mousex = event.clientX;
//   mousey = event.clientY;
// });

// var grav = 0.99;
// c.strokeWidth = 5;
// function randomColor() {
//   return (
//     "rgba(" +
//     Math.round(Math.random() * 250) +
//     "," +
//     Math.round(Math.random() * 250) +
//     "," +
//     Math.round(Math.random() * 250) +
//     "," +
//     Math.ceil(Math.random() * 10) / 10 +
//     ")"
//   );
// }

// function Ball() {
//   this.color = randomColor();
//   this.radius = Math.random() * 20 + 14;
//   this.startradius = this.radius;
//   this.x = Math.random() * (tx - this.radius * 2) + this.radius;
//   this.y = Math.random() * (ty - this.radius);
//   this.dy = Math.random() * 2;
//   this.dx = Math.round((Math.random() - 0.5) * 10);
//   this.vel = Math.random() / 5;
//   this.update = function () {
//     c.beginPath();
//     c.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
//     c.fillStyle = this.color;
//     c.fill();
//     //c.stroke();
//   };
// }

// var bal = [];
// for (var i = 0; i < 50; i++) {
//   bal.push(new Ball());
// }

// function animate() {
//   if (tx != window.innerWidth || ty != window.innerHeight) {
//     tx = window.innerWidth;
//     ty = window.innerHeight;
//     canvas.width = tx;
//     canvas.height = ty;
//   }
//   requestAnimationFrame(animate);
//   c.clearRect(0, 0, tx, ty);
//   for (var i = 0; i < bal.length; i++) {
//     bal[i].update();
//     bal[i].y += bal[i].dy;
//     bal[i].x += bal[i].dx;
//     if (bal[i].y + bal[i].radius >= ty) {
//       bal[i].dy = -bal[i].dy * grav;
//     } else {
//       bal[i].dy += bal[i].vel;
//     }
//     if (bal[i].x + bal[i].radius > tx || bal[i].x - bal[i].radius < 0) {
//       bal[i].dx = -bal[i].dx;
//     }
//     if (
//       mousex > bal[i].x - 20 &&
//       mousex < bal[i].x + 20 &&
//       mousey > bal[i].y - 50 &&
//       mousey < bal[i].y + 50 &&
//       bal[i].radius < 70
//     ) {
//       //bal[i].x += +1;
//       bal[i].radius += 5;
//     } else {
//       if (bal[i].radius > bal[i].startradius) {
//         bal[i].radius += -5;
//       }
//     }

//     //forloop end
//   }
//   //animation end
// }

// animate();

// setInterval(function () {
//   bal.push(new Ball());
//   bal.splice(0, 1);
// }, 400);

document.getElementById("name").addEventListener("blur", validateName);
document.getElementById("email").addEventListener("blur", validateEmail);

function validateName() {
  const name = document.getElementById("name");
  const re = /^[a-zA-Z\s]{2,50}$/;

  if (!re.test(name.value)) {
    name.classList.add("is-invalid");
  } else {
    name.classList.remove("is-invalid");
  }
}

function validateEmail() {
  const email = document.getElementById("email");
  const re = /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/;
  if (!re.test(email.value)) {
    email.classList.add("is-invalid");
  } else {
    email.classList.remove("is-invalid");
  }
}
