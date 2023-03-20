// number with 2 caracters
export function numberWith2Caracters(value) {
  if (value && value < 10) {
    return "0" + value;
  }
  return value;
}

// string to first letter uppercase of each word
export function toFirstLetterUpperCase(str) {
  return str.replace(/\w\S*/g, function (txt) {
    return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
  });
}

// convert string yyyy-MM-dd to dd/mm/yyyy
export function formatDate_DDMMYYYY(value) {
  const values = value.split('T')[0].split("-");

  const day = parseInt(values[2] < 10) ? "0" + values[2] : values[2];
  const month = parseInt(values[1] < 10) ? "0" + values[1] : values[1];
  const year = values[0];

  return `${day}/${month}/${year}`;
}

// Number to currency
export function formatCurrency(value) {
  value = parseFloat(value);
  return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
}

// handle search
export const handleSearch = (termo) => {
  const termos = termo.split(" ");
  const trs = document.querySelectorAll("tbody tr");
  trs.forEach(tr => {
    tr.classList.remove("d-none");
    const dataSearch = removeAcentuacao(tr.getAttribute("data-search").toLowerCase());
    termos.forEach(termo => {
      termo = removeAcentuacao(termo);
      if (!dataSearch.includes(termo)) {
        tr.classList.add("d-none");
      }
    })
  })
}


export const nDateIso = (d) => {
  const date = new Date(d);
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  return `${year}-${month < 10 ? `0${month}` : month}-${day < 10 ? `0${day}` : day}`;
}

export const nDateIsoPlusOneDay = (d) => {
  const date = new Date(d);
  // add one day
  date.setDate(date.getDate() + 1);
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  return `${year}-${month < 10 ? `0${month}` : month}-${day < 10 ? `0${day}` : day}`;
}

export const removeAcentuacao = (str) => {
  str = str.replace(/[ÀÁÂÃÄÅ]/, "A");
  str = str.replace(/[àáâãäå]/, "a");
  str = str.replace(/[ÈÉÊË]/, "E");
  str = str.replace(/[èéêë]/, "e");
  str = str.replace(/[ÌÍÎÏ]/, "I");
  str = str.replace(/[ìíîï]/, "i");
  str = str.replace(/[ÒÓÔÕÖ]/, "O");
  str = str.replace(/[òóôõö]/, "o");
  str = str.replace(/[ÙÚÛÜ]/, "U");
  str = str.replace(/[ùúûü]/, "u");
  str = str.replace(/[Ç]/, "C");
  str = str.replace(/[ç]/, "c");
  return str;
}
