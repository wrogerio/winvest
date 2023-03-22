import pool from "@/database/db";

export const GetUltimosResultados = async () => {
  const query = ` SELECT  Ano, Mes, DiasMes, MesNome, Tipo, Rendimento 
                  FROM    zDash_Last3_RendDivid
                  ORDER   BY Ano DESC, Mes DESC`;
  try {
    await pool.connect();
    const result = await pool.request().query(query);
    return result.recordset.length > 0 ? result.recordset : [];
  } catch (error) {
    return { error: error.message };
  }
};