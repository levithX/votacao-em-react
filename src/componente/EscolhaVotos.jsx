function EscolhaVotos({ listaDeVotacao, onvotado, votado }) {
  return (
    <div>
      {listaDeVotacao.map(opcao => (
        <p key={opcao.id}>
          <button onClick={() => onvotado(opcao.id)} disabled={votado}>
            {opcao.title}
          </button>
        </p>
      ))}
    </div>
  )
}

export default EscolhaVotos;
