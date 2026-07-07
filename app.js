/* ==========================================================
   Gong Filename Interpreter
   app.js
   ----------------------------------------------------------
   Event ทั้งหมดของหน้าเว็บ
========================================================== */

// ปุ่ม Interpret
document
    .getElementById("fn-btn")
    .addEventListener("click", function () {

        render(
            document.getElementById("fn-input").value
        );

    });


// กด Enter
document
    .getElementById("fn-input")
    .addEventListener("keydown", function (e) {

        if (e.key === "Enter") {

            render(this.value);

        }

    });


// Example Buttons
document
    .querySelectorAll(".example-chip")
    .forEach(function (chip) {

        chip.addEventListener("click", function () {

            document.getElementById("fn-input").value =
                this.dataset.fn;

            render(this.dataset.fn);

        });

    });