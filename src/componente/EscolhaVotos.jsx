function EscolhaVotos({ listaDeVotacao, onvotado, ganhador }) {
  return (
    <div>
      {ganhador !== true && (
        <>
          {listaDeVotacao.map((opcao) => (
            <div key={opcao.id}>
              <p>{opcao.votos}</p>
              <button onClick={() => onvotado(opcao.id)}>{opcao.title}</button>
            </div>
          ))}
        </>
      )}
    </div>
  );
}

export default EscolhaVotos;
