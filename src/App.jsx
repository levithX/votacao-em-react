import { useState } from 'react'
import EscolhaVotos from './componente/EscolhaVotos'
import CriarVotacoes from './componente/CriarVotacoes'

function App() {
const [numeroVotos, setNumeroVotos] = useState(5)
const [ganhador, setGanhador] = useState(null)
const [inputNewVote, setInputNewVote] = useState('') 
const [falhaResultado,setFalhaResultado ] = useState(false)
const [listaDeVotacao, setListaDeVotacao] = useState([ 
    {id: 1,  title: "javascript",votos: 0},
    {id: 2,title: "python",votos: 0},
    {id: 3,title: "java",votos: 0},
    {id: 4, title: "go", votos: 0 },  
    {id: 5,title: "c#",votos: 0}
])

//function para o escolhaVotos 
function onvotado(id) { 
  if (numeroVotos === 0 ) return
  
  setNumeroVotos(prev => prev - 1);

     const novaLista = listaDeVotacao.map(opcao => { 
            if (opcao.id === id) {
        return {...opcao, votos: opcao.votos + 1}
      }
      return opcao;
    })
    setListaDeVotacao(novaLista)
  }
// function para o resultado 
const mostraresultado = () =>  {
  const limite = listaDeVotacao.length
  const copiaLista = [...listaDeVotacao]
  for (var index = 0; index < limite - 1; ++index) {
     if (copiaLista[index].votos <copiaLista[index + 1].votos) { 
        const primeiro = copiaLista[index] 
        copiaLista[index] = copiaLista[index + 1] 
        copiaLista[index + 1] = primeiro; 
     } 
  }
  setListaDeVotacao(copiaLista)
}
//criar votacao 
const handleCreateVote = (e) => {
  if (e.key === "Enter") {    
    const texto =  inputNewVote.trim(); 
    if (!texto) return;

    const maiorId = Math.max(...listaDeVotacao.map(item => item.id), 0)
    const novoVoto = { 
      id: maiorId + 1, 
      title: texto,
      votos: 0
    }
    setListaDeVotacao([...listaDeVotacao, novoVoto]); 
    setInputNewVote('');
    }   
  } 



  return (
    <div>
      <div>
        <h1> numero de votos: {numeroVotos}</h1>
      </div>
      <CriarVotacoes valueInput={inputNewVote} onKeyDownInput={handleCreateVote}
      onChangeinput= {(e) => setInputNewVote(e.target.value)}/> 
      <EscolhaVotos listaDeVotacao={listaDeVotacao} onvotado={onvotado} />
      <button onClick={mostraresultado}> monstra resultado</button>
      {ganhador && !falhaResultado}<p>{ganhador}</p>
    </div>
  )
}

export default App
