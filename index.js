import { empty, get, save } from "./filesMethods.js";
import inquirer from "inquirer";
import { promptConfirmaGasto, promptNuevoGasto } from "./gastosPrompts.js";
import { Console } from "console";

const main = async () => {
  console.log('Módulo de carga de gastos');
  let run = true;
  while (run) {
    const action = await inquirer.prompt([
      {
        type: "rawlist",
        name: "accion",
        message: "Qué desea hacer:",
        choices: [
          { value: 1, name: "Consultar gastos" },
          { value: 2, name: "Agregar gasto" },
          { value: 3, name: "Vaciar la lista de gastos" },
          { value: 99, name: "Salir" },
        ],
      },
    ]);
    switch (action.accion) {
      case 1:
        await consultarGastos();
        break;
      case 2:
        await agregarGasto();
        break;
      case 3:
        await vaciarGastos();
        break;
      case 99:
        run = false;
        break;
      default:
        run = false;
        break;
    }
  }
  console.log("Gracias por usar nuestra App");
};

main();

async function agregarGasto() {
  console.log("Agregue un gasto:");
  const nuevoGastoData = await promptNuevoGasto();

  const guardarGasto = await promptConfirmaGasto();
  
  if (guardarGasto.confirmaCarga) {
   const gastosGuardados = await get("gastos");

   gastosGuardados.push(nuevoGastoData);
   await save("gastos", gastosGuardados);
  } else {
    console.log("No se ha registrado el gasto...");
  }
}

async function consultarGastos() {
  console.log('LISTA DE GASTOS GUARDADOS')
  const gastosGuardados = await get("gastos");
  console.log(gastosGuardados);
}

async function vaciarGastos() {
    console.log('LISTA DE GASTOS VACIA !!!')
    await empty("gastos");
}
