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
export function formatDate(value) {
  const values = value.split('T')[0].split("-");

  const day = parseInt(values[2] < 10) ? "0" + values[2] : values[2];
  const month = parseInt(values[1] < 10) ? "0" + values[1] : values[1];
  const year = values[0];

  return `${day}/${month}/${year}`;
}

// Date to yyyy-mm-dd
export function formatDateISO(date) {
  const d = new Date(date);
  const month = `${d.getMonth() + 1}`;
  const day = `${d.getDate()}`;
  const year = d.getFullYear();

  return [year, month.length < 2 ? `0${month}` : month, day.length < 2 ? `0${day}` : day].join("-");
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
    const dataSearch = tr.getAttribute("data-search").toLowerCase();
    termos.forEach(termo => {
      if (!dataSearch.includes(termo)) {
        tr.classList.add("d-none");
      }
    })
  })
}