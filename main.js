document.addEventListener("DOMContentLoaded", () => {
  const display = document.getElementById("display");
  const buttons = document.querySelectorAll("button");

  function calcularExpresion(exp) {
    try {
      exp = exp.replace(/\^/g, "**");
      exp = exp.replace(/sin\(([^)]+)\)/g, (_, val) =>
        Math.sin((parseFloat(val) * Math.PI) / 180)
      );
      exp = exp.replace(/cos\(([^)]+)\)/g, (_, val) =>
        Math.cos((parseFloat(val) * Math.PI) / 180)
      );
      exp = exp.replace(/tan\(([^)]+)\)/g, (_, val) =>
        Math.tan((parseFloat(val) * Math.PI) / 180)
      );
      exp = exp.replace(/√\(([^)]+)\)/g, (_, val) => Math.sqrt(parseFloat(val)));

      return Function(`"use strict"; return (${exp})`)();
    } catch {
      return "Error";
    }
  }

  buttons.forEach((button) => {
    button.addEventListener("click", () => {
      const val = button.textContent.trim();

      if (val === "=") {
        display.value = calcularExpresion(display.value).toString();
      } else if (val === "C") {
        display.value = "";
      } else if (["sin", "cos", "tan", "√"].includes(val)) {
        if (val === "√") {
          display.value += "√(";
        } else {
          display.value += val + "(";
        }
      } else {
        display.value += val;
      }
    });
  });
});
