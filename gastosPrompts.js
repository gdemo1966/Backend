import inquirer from "inquirer";
import DatePrompt from "inquirer-date-prompt";

inquirer.registerPrompt("date", DatePrompt);

export async function promptNuevoGasto() {
  return await inquirer.prompt(nuevoGastoPrompt);
}

const nuevoGastoPrompt = [
  {
    type: "date",
    name: "fecha_gasto",
    message: "Fecha del gasto:",
    locale: "es-es",
    format: { month: "short", hour: undefined, minute: undefined },
    clearable: true,
  },
  {
    type: 'rawlist',
    name: 'tipo_gasto',
    message: 'Tipo de gasto?',
    choices: ['Combustible', 'Alimentos', 'Salud', 'Servicios', 'Otros'],
    filter(val) {
      return val.toLowerCase();
    },
  },
  {
    type: "input",
    name: "descripcion",
    message: "Descripción:",
  },
  {
    type: "input",
    name: "importe",
    message: "Importe $.:",
    validate(value) {
      const valid = !isNaN(parseFloat(value));
      return valid || 'Por favor, ingrese un importe válido.';
    },
    filter: Number,
  },
];

export async function promptConfirmaGasto() {
  return await inquirer.prompt(confirmaCargaPrompt);
};

const confirmaCargaPrompt = [
  {
    type: 'confirm',
    name: 'confirmaCarga',
    message: 'Desea guardar el gasto (Enter confirma)?',
    default: true,
  },
];