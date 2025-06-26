function EscolhaVotos({ listaDeVotacao, onvotado, votado }) {
  return (
    <div>
      {listaDeVotacao.map(opcao => (
        <div key={opcao.id}>
          <p>{opcao.votos}</p>
          <button onClick={() => onvotado(opcao.id)} >
            {opcao.title}
          </button>
          
        </div>
      ))}
    </div>
  )
}

export default EscolhaVotos;
