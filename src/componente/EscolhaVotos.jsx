function EscolhaVotos({ listaDeVotacao, onvotado, votado }) {
  return (
    <div>
      {listaDeVotacao.map(opcao => (
            <div key={opcao.id}>
          <button onClick={() => onvotado(opcao.id)} disabled={votado} >
            {opcao.title}
          </button>
          <p>{opcao.votos}</p>
        </div>
      ))}
    </div>
  )
}

export default EscolhaVotos;
