const { Pool } = require('pg');
require('dotenv').config();


const pool = new Pool({
  user: process.env.BD_USER,
  host: process.env.BD_HOST,
  database: process.env.BD_NAME,
  password: process.env.BD_PASS,
  port: process.env.BD_PORT
});

const insertDataCreateMissionInDB = async (formData) => {
  try {
    await pool.query(`INSERT INTO "CadastroMissao" ("nomeMissao", "objetivoMissao", "apogeuPrevisto", "horaVoo", "dataVoo", "altitudeRelacaoNivelMar") 
    VALUES ($1, $2, $3, $4, $5, $6)`, [formData.nomeMissao, formData.objetivoMissao, formData.apogeuPrevisto, formData.hora, formData.data, formData.altitudeRelacaoNivelMar]);
  } catch (error) {
    console.error('Erro ao inserir no banco de dados:', error);
  };
};

const selectDataCreateMissionInDB = async () => {
  try {
    const querySqlCreateMission = await pool.query(`SELECT "nomeMissao", "apogeuPrevisto", "dataVoo", "idMissao" FROM "CadastroMissao"`);
    return querySqlCreateMission.rows;
  } catch (error) {
    console.error('Erro ao resgatar dados no banco de dados:', error);
    return [];
  }
};

const verificarDadosNaTabela = async () => {
  try {
    const result = await pool.query('SELECT COUNT(*) FROM "CadastroMissao"');
    const rowCount = parseInt(result.rows[0].count);
    return rowCount > 0;
  } catch (error) {
    console.error('Erro ao verificar os dados na tabela:', error);
    return false;
  }
};

module.exports = { 
  insertDataCreateMissionInDB,
  selectDataCreateMissionInDB,
  verificarDadosNaTabela
};
