import pool from "@/database/db";

export const GetAll = async () => {
  const query = ` SELECT  Id, InstituicaoId, Instituicao, DtRend, Ano, Mes, Dia, MesNome, SaldoAnt, Saldo, Valor
                  FROM    vRendimentos
                  WHERE   DtRend >= CAST(CONCAT(YEAR(DATEADD(MONTH, -6, GETDATE())), '-', MONTH(DATEADD(MONTH, -4, GETDATE())), '-', 1) AS DATE)
                  ORDER   BY DtRend DESC`;
  try {
    await pool.connect();
    const result = await pool.request().query(query);
    return result.recordset.length > 0 ? result.recordset : [];
  } catch (error) {
    return { error: error.message };
  }
};

export const GetItem = async (id) => {
  const query = ` SELECT  Id, InstituicaoId, Instituicao, DtRend, Ano, Mes, Dia, MesNome, SaldoAnt, Saldo, Valor
                  FROM    vRendimentos
                  WHERE   Id = '${id}'`;
  try {
    await pool.connect();
    const result = await pool.request().query(query);
    return result.recordset.length > 0 ? result.recordset[0] : {};
  } catch (error) {
    return { error: error.message };
  }
};

export const GetLast = async () => {
  const query = ` SELECT TOP 1 Saldo FROM Rendimentos ORDER BY CreateAt DESC`;
  try {
    await pool.connect();
    const result = await pool.request().query(query);
    return result.recordset.length > 0 ? result.recordset[0] : {};
  } catch (error) {
    return { error: error.message };
  }
};

export const SaveItem = async (item) => {
  const query = ` INSERT INTO Rendimentos (Id, InstituicaoId, DtRendimento, SaldoAnt, Saldo, CreateAt) 
                  VALUES (DEFAULT, '${item.InstituicaoId}', '${item.DtRendimento}', '${item.SaldoAnt}', '${item.Saldo}', DEFAULT)`;
  try {
    await pool.connect();
    await pool.request().query(query);
    return true;
  } catch (error) {
    return false
  }
}

export const UpdateItem = async (item) => {
  const query = ` UPDATE Rendimentos SET 
                  InstituicaoId = '${item.InstituicaoId}', 
                  DtRendimento = '${item.DtRendimento}', 
                  SaldoAnt = '${item.SaldoAnt}', 
                  Saldo = '${item.Saldo}' 
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
  const query = ` DELETE FROM Rendimentos WHERE Id = '${id}'`;

  try {
    await pool.connect();
    await pool.request().query(query);
    return true;
  } catch (error) {
    return false
  }
}