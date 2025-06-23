import { useState } from 'react'
import EscolhaVotos from './componente/EscolhaVotos'


function App() {
const [votado, setVotado] = useState(false)
const [listaDeVotacao, setListaDeVotacao] = useState([ 
    {id: 1,  title: "javascript",votos: 0},
    {id: 2,title: "python",votos: 0},
    {id: 3,title: "java",votos: 0},
    {id: 4, title: "go", votos: 0 },  
    {id: 5,title: "c#",votos: 0}
])
function onvotado(id ) { 
     const novaLista = listaDeVotacao.map(opcao => { 
            if (opcao.id === id) {
        opcao.votos = opcao.votos + 1 
      }
      console.log("nome:" + opcao.title + " numero de votos:" + opcao.votos)
      return opcao;
    })
    setListaDeVotacao(novaLista)
  }
  return (
    <div>
      <EscolhaVotos listaDeVotacao={listaDeVotacao} onvotado={onvotado}/>
    </div>
  )
}

export default App
