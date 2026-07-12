export function load() {
  const lineasAyuda = [
    {
      id: "emergencia-1",
      nombre: "VEN 911 (Emergencias Generales)",
      numero: "911",
      donde: "Todo el país",
      enQueAyudan: "Llama aquí si hay un accidente en la calle, un choque, un robo o si necesitas policías y ambulancias rápido."
    },
    {
      id: "emergencia-2",
      nombre: "Protección Civil",
      numero: "0212-6627074",
      donde: "Todo el país",
      enQueAyudan: "Ayuda si hay inundaciones por lluvias, árboles caídos, temblores o si una casa o pared está en peligro de caerse."
    },
    {
      id: "emergencia-3",
      nombre: "Bomberos Universitarios UCV",
      numero: "0212-6052222",
      donde: "Caracas y Miranda",
      enQueAyudan: "Apagan incendios, rescatan personas atrapadas y dan primeros auxilios si alguien se pone muy grave."
    },
    {
      id: "emergencia-4",
      nombre: "Cruz Roja Venezolana",
      numero: "0212-5781122",
      donde: "Todo el país",
      enQueAyudan: "Te ayudan con ambulancias, curaciones, médicos de emergencia y a buscar sangre si estás en el hospital."
    },
    {
      id: "emergencia-5",
      nombre: "Cáritas de Venezuela",
      numero: "0212-4433153",
      donde: "Todo el país",
      enQueAyudan: "Tienen comedores públicos, dan comida a los niños que lo necesitan y reparten bolsas de alimentos en las trancas."
    },
    {
      id: "emergencia-6",
      nombre: "Bomberos de Caracas",
      numero: "0212-5454545",
      donde: "Caracas",
      enQueAyudan: "Rescate en accidentes de tránsito, cables eléctricos sueltos, fuegos en casas y escapes de gas."
    }
  ];

  return {
    lineasAyuda: Promise.resolve(lineasAyuda)
  };
}