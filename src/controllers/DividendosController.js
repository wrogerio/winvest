import pool from "@/database/db";

export const GetAll = async () => {
  const query = ` SELECT  Id, FundoId, Sigla, Fundo, Cnpj, DtDividendo, MesNome, Qtd, Valor, Total
                  FROM    vDividendos
                  WHERE   DtDiv >= CAST(CONCAT(YEAR(DATEADD(YEAR, -3, GETDATE())), '-', MONTH(DATEADD(MONTH, -4, GETDATE())), '-', 1) AS DATE)
                  ORDER   BY Ano Desc, Mes Desc, Sigla ASC`;
  try {
    await pool.connect();
    const result = await pool.request().query(query);
    return result.recordset.length > 0 ? result.recordset : [];
  } catch (error) {
    return { error: error.message };
  }
};

export const GetItem = async (id) => {
  const query = ` SELECT  Id, FundoId, Sigla, Fundo, Cnpj, DtDividendo, MesNome, Qtd, Valor, Total
                  FROM    vDividendos
                  WHERE   Id = '${id}'`;
  try {
    await pool.connect();
    const result = await pool.request().query(query);
    return result.recordset.length > 0 ? result.recordset[0] : {};
  } catch (error) {
    return { error: error.message };
  }
};

export const SaveItem = async (item) => {
  const query = ` INSERT INTO Dividendos (FundoId, DtDividendo, Qtd, Valor) 
                  VALUES ('${item.FundoId}', '${item.DtDividendo}', '${item.Qtd}', '${item.Valor}')`;
  try {
    await pool.connect();
    await pool.request().query(query);
    return true;
  } catch (error) {
    return false
  }
}

export const UpdateItem = async (item) => {
  const query = ` UPDATE Dividendos SET 
                  FundoId = '${item.FundoId}',
                  DtDividendo = '${item.DtDividendo}',
                  Qtd = '${item.Qtd}',
                  Valor = '${item.Valor}' 
                  WHERE Id = '${item.Id}'`;
  try {
    await pool.connect();
    await pool.request().query(query);
    return true;
  } catch (error) {
    return false
  }
}

export const RemoveItem = async (id) => {
  const query = ` DELETE FROM Dividendos WHERE Id = '${id}'`;

  try {
    await pool.connect();
    await pool.request().query(query);
    return true;
  } catch (error) {
    return false
  }
}