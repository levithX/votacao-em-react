import { useState } from 'react'
import EscolhaVotos from './componente/EscolhaVotos'
import CriarVotacoes from './componente/CriarVotacoes'

function App() {
const [numeroVotos, setNumeroVotos] = useState(5)
const [ganhador, setGanhador] = useState(null)
const [inputNewVote, setInputNewVote] = useState('') 
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
  if (ganhador === true ) return 
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
  const copiaLista = [...listaDeVotacao]
  copiaLista.sort((a, b ) => b.votos - a.votos); 
  setListaDeVotacao(copiaLista)
  setGanhador(true)
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
      {ganhador === true &&
        <div>
        {listaDeVotacao.map( opcao => (
          <div key={opcao.id}>
            <p>{opcao.title}</p>
          </div>
        ))}
           
      </div>
      }
    </div>
)}
export default App
