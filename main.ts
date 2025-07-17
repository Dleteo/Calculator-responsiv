document.addEventListener("DOMContentLoaded", () => {
  const display = document.getElementById("display") as HTMLInputElement;
  const buttons = document.querySelectorAll("button");

  function calcularExpresion(exp: string): string | number {
    try {
      exp = exp.replace(/\^/g, "**");
      exp = exp.replace(/sin\(([^)]+)\)/g, (_, val) =>
        Math.sin((parseFloat(val) * Math.PI) / 180).toString()
      );
      exp = exp.replace(/cos\(([^)]+)\)/g, (_, val) =>
        Math.cos((parseFloat(val) * Math.PI) / 180).toString()
      );
      exp = exp.replace(/tan\(([^)]+)\)/g, (_, val) =>
        Math.tan((parseFloat(val) * Math.PI) / 180).toString()
      );
      exp = exp.replace(/√\(([^)]+)\)/g, (_, val) =>
        Math.sqrt(parseFloat(val)).toString()
      );

      const resultado = new Function(`return (${exp})`)();

      if (typeof resultado === "number" && !isNaN(resultado)) {
        return resultado;
      } else {
        return "Error";
      }
    } catch {
      return "Error";
    }
  }

  buttons.forEach((button) => {
    button.addEventListener("click", () => {
      const val = button.textContent?.trim() ?? "";

      if (val === "=") {
        const resultado = calcularExpresion(display.value);
        display.value = resultado.toString();
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
