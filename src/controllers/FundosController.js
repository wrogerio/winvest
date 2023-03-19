import pool from "@/database/db";

export const GetAll = async () => {
  const query = ` SELECT  Id, Sigla, Nome, Cnpj, Valor, PVP 
                  FROM    Fundos
                  ORDER   BY Sigla`;

  try {
    await pool.connect();
    const result = await pool.request().query(query);
    return result.recordset.length > 0 ? result.recordset : [];
  } catch (error) {
    return { error: error.message };
  }
};

export const GetItem = async (id) => {
  const query = ` SELECT Id, Sigla, Nome, Cnpj, Valor, PVP 
                  FROM Fundos
                  WHERE Id = '${id}'`;

  try {
    await pool.connect();
    const result = await pool.request().query(query);
    return result.recordset.length > 0 ? result.recordset[0] : {};
  } catch (error) {
    return { error: error.message };
  }
};

export const SaveItem = async (item) => {
  const query = `INSERT INTO Fundos (Id, Sigla, Nome, Cnpj, Valor, PVP) VALUES (DEFAULT, '${item.Sigla}', '${item.Nome}', '${item.Cnpj}', '${item.Valor}', '${item.PVP}')`;
  try {
    await pool.connect();
    await pool.request().query(query);
    return true;
  } catch (error) {
    return false
  }
}

export const UpdateItem = async (item) => {
  const query = `UPDATE Fundos SET Sigla = '${item.Sigla}', Nome = '${item.Nome}', Cnpj = '${item.Cnpj}', Valor = '${item.Valor}', PVP = '${item.PVP}' WHERE Id = '${item.Id}'`;

  try {
    await pool.connect();
    await pool.request().query(query);
    return true;
  } catch (error) {
    return false
  }
}

export const RemoveItem = async (id) => {
  const query = `DELETE FROM Fundos WHERE Id = '${id}'`;

  try {
    await pool.connect();
    await pool.request().query(query);
    return true;
  } catch (error) {
    return false
  }
}