// string to first letter uppercase of each word
export function toFirstLetterUpperCase(str) {
  return str.replace(/\w\S*/g, function (txt) {
    return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
  });
}

// Date to dd/mm/yyyy
export function formatDate(date) {
  const d = new Date(date);
  const month = `${d.getMonth() + 1}`;
  const day = `${d.getDate()}`;
  const year = d.getFullYear();

  return [day.length < 2 ? `0${day}` : day, month.length < 2 ? `0${month}` : month, year].join("/");
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