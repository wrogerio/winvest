import pool from "@/database/db";

export const GetAll = async () => {
  const query = ` SELECT  Id, FundoId, Sigla, DtLancamento, DtLancamentoDt, Ano, Mes, Dia, MesNome, Tipo, Qtd, Valor, Total 
                  FROM    vCarteiras
                  WHERE   DtLancamentoDt >= CAST(CONCAT(YEAR(DATEADD(YEAR, -3, GETDATE())), '-', MONTH(DATEADD(MONTH, -4, GETDATE())), '-', 1) AS DATE)
                  ORDER   BY DtLancamentoDt Desc, Sigla`;
  try {
    await pool.connect();
    const result = await pool.request().query(query);
    return result.recordset.length > 0 ? result.recordset : [];
  } catch (error) {
    return { error: error.message };
  }
};

export const GetItem = async (id) => {
  const query = ` SELECT  Id, FundoId, Sigla, DtLancamento, DtLancamentoDt, Ano, Mes, Dia, MesNome, Tipo, Qtd, Valor, Total 
                  FROM    vCarteiras
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
  const query = ` INSERT INTO Carteiras (FundoId, DtLancamento, Tipo, Qtd, Valor) 
                  VALUES ('${item.FundoId}', '${item.DtLancamento}', '${item.Tipo}', '${item.Qtd}', '${item.Valor}')`;
  try {
    await pool.connect();
    await pool.request().query(query);
    return true;
  } catch (error) {
    return false
  }
}

export const UpdateItem = async (item) => {
  const query = ` UPDATE Carteiras SET 
                  FundoId = '${item.FundoId}',
                  DtLancamento = '${item.DtLancamento}',
                  Tipo = '${item.Tipo}',
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
  const query = ` DELETE FROM Carteiras WHERE Id = '${id}'`;

  try {
    await pool.connect();
    await pool.request().query(query);
    return true;
  } catch (error) {
    return false
  }
}