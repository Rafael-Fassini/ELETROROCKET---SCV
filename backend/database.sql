CREATE TABLE CadastroMissao (
    idMissao SERIAL PRIMARY KEY,
    nomeMissao VARCHAR(255),
    objetivoMissao VARCHAR(255),
    apogeuPrevisto INTEGER,
    horaVoo TIME,
    dataVoo DATE,
    altitudeRelacaoNivelMar FLOAT
);

CREATE TABLE DadosVooApresentacaoTempoReal (
    idVoo SERIAL PRIMARY KEY,
    idMissao INTEGER REFERENCES CadastroMissao(idMissao),
    dataBuffer VARCHAR
);

CREATE TABLE AnaliseDadosPosVoo (
    idAnaliseDados SERIAL PRIMARY KEY,
    velocidadeFuncaoAltitude JSON,
    aceleracaoFuncaoVelocidade JSON,
    pressaoFuncaoAltitude JSON,
    pressaoFuncaoVelocidade JSON,
    temperaturaFuncaoVelocidade JSON,
    temperaturaFuncaoAltitude JSON,
    temperaturaFuncaoPressao JSON,
    idMissao INTEGER REFERENCES CadastroMissao(idMissao),
    idVoo INTEGER REFERENCES DadosVooApresentacaoTempoReal(idVoo),
    distanciaMetrosRecuperacao VARCHAR(255),
    velocidadeMaximaAtingida VARCHAR(255)
);