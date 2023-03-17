import pool from "@/database/db";

export const GetAll = async () => {
  const query = ` SELECT e.Id, e.InstituicaoId, i.Nome AS Instituicao, FORMAT(e.DtEnvio, 'yyyy-MM-dd') As DtEnvioString, Cast(e.DtEnvio AS DATE) AS DtEnvio, e.TipoEnvio, e.Valor
                  FROM Envios e
                  INNER JOIN Instituicoes i on e.InstituicaoId = i.Id
                  ORDER BY e.DtEnvio DESC`;

  try {
    await pool.connect();
    const result = await pool.request().query(query);
    return result.recordset.length > 0 ? result.recordset : [];
  } catch (error) {
    return { error: error.message };
  }
};

export const GetItem = async (id) => {
  const query = ` SELECT e.Id, e.InstituicaoId, i.Nome AS Instituicao, FORMAT(e.DtEnvio, 'yyyy-MM-dd') As DtEnvioString, Cast(e.DtEnvio AS DATE) AS DtEnvio, e.TipoEnvio, e.Valor
                  FROM Envios e
                  INNER JOIN Instituicoes i on e.InstituicaoId = i.Id
                  WHERE e.Id = '${id}'`;

  try {
    await pool.connect();
    const result = await pool.request().query(query);
    return result.recordset.length > 0 ? result.recordset[0] : {};
  } catch (error) {
    return { error: error.message };
  }
};

export const SaveItem = async (item) => {
  const query = `INSERT INTO Envios (Id, InstituicaoId, DtEnvio, TipoEnvio, Valor) VALUES (DEFAULT, '${item.InstituicaoId}', '${item.DtEnvio}', '${item.TipoEnvio}', '${item.Valor}')`;
  try {
    await pool.connect();
    await pool.request().query(query);
    return true;
  } catch (error) {
    return false
  }
}

export const UpdateItem = async (item) => {
  const query = `UPDATE Envios SET InstituicaoId = '${item.InstituicaoId}', DtEnvio = '${item.DtEnvio}', TipoEnvio = '${item.TipoEnvio}', Valor = '${item.Valor}' WHERE Id = '${item.Id}'`;

  try {
    await pool.connect();
    await pool.request().query(query);
    return true;
  } catch (error) {
    return false
  }
}

export const RemoveItem = async (id) => {
  const query = `DELETE FROM Envios WHERE Id = '${id}'`;

  try {
    await pool.connect();
    await pool.request().query(query);
    return true;
  } catch (error) {
    return false
  }
}