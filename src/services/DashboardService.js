export const GetUltimosResultados = async () => {
  const response = await fetch(`/api/dashboard/ultimos-resultados`);
  const data = await response.json();
  return data;
};
