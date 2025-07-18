import { useState } from "react";
import { useEffect } from "react";
import EscolhaVotos from "./componente/EscolhaVotos";
import CriarVotacoes from "./componente/CriarVotacoes";

function App() {
  const [errorVazio /*igual a mim*/, SetErrorVazio] = useState(false);
  const [numeroVotos, setNumeroVotos] = useState(5);
  const [ganhador, setGanhador] = useState(null);
  const [inputNewVote, setInputNewVote] = useState("");
  const [listaDeVotacao, setListaDeVotacao] = useState([
    { id: 1, title: "javascript", votos: 0 },
    { id: 2, title: "python", votos: 0 },
    { id: 3, title: "java", votos: 0 },
    { id: 4, title: "go", votos: 0 },
    { id: 5, title: "c#", votos: 0 },
  ]);
  const [ultimoVoto, setUltimoVoto] = useState("");

  useEffect(() => {
    if (ultimoVoto) {
      const lista =
        JSON.parse(localStorage.getItem("listaDoHistoricoVotados")) || [];
      lista.push(ultimoVoto);
      console.log(lista);
      localStorage.setItem("listaDoHistoricoVotados", JSON.stringify(lista));
    }
  }, [ultimoVoto]);

  const desfazerVoto = () => {
    if (ganhador === true) return;
    const historico = JSON.parse(
      localStorage.getItem("listaDoHistoricoVotados"),
    );
    if (historico.length === 0) return;

    const ultimaModificacao = historico.pop();
    const novaLista = listaDeVotacao.map((item) => {
      if (item.id === ultimaModificacao.id) {
        return { ...item, votos: ultimaModificacao.votos };
      }
      return item;
    });
    setListaDeVotacao(novaLista);
    setNumeroVotos((prev) => prev + 1);
    localStorage.setItem("listaDoHistoricoVotados", JSON.stringify(historico));
  };

  //function para o escolhaVotos
  function onvotado(id) {
    if (numeroVotos === 0) return;
    if (ganhador === true) return;
    setNumeroVotos((prev) => prev - 1);
    let idVotado = null;
    const novaLista = listaDeVotacao.map((opcao) => {
      if (opcao.id === id) {
        idVotado = { ...opcao };
        return { ...opcao, votos: opcao.votos + 1 };
      }
      return opcao;
    });
    setUltimoVoto(idVotado);
    setListaDeVotacao(novaLista);
  }
  // function para o resultado
  const mostraresultado = () => {
    const copiaLista = [...listaDeVotacao];
    copiaLista.sort((a, b) => b.votos - a.votos);
    setListaDeVotacao(copiaLista);
    setGanhador(true);
  };
  //criar escolhar de votacao
  const handleCreateVote = (e) => {
    if (e.key === "Enter") {
      const texto = inputNewVote.trim();
      if (!texto) {
        SetErrorVazio(true);
        return;
      }

      const maiorId = Math.max(...listaDeVotacao.map((item) => item.id), 0);
      const novoVoto = {
        id: maiorId + 1,
        title: texto,
        votos: 0,
      };
      setListaDeVotacao([...listaDeVotacao, novoVoto]);
      setInputNewVote("");
    }
  };

  return (
    <div>
      <div>
        <h1> numero de votos: {numeroVotos}</h1>
      </div>
      <CriarVotacoes
        valueInput={inputNewVote}
        onKeyDownInput={handleCreateVote}
        onChangeinput={(e) => setInputNewVote(e.target.value)}
      />
      {errorVazio && <p> Error: escreva algo</p>}
      <EscolhaVotos
        listaDeVotacao={listaDeVotacao}
        onvotado={onvotado}
        ganhador={ganhador}
      />
      <button onClick={mostraresultado}> mostra resultado</button>
      {ganhador === true && (
        <div>
          {listaDeVotacao.map((opcao) => (
            <div key={opcao.id}>
              <p>{opcao.title}</p>
            </div>
          ))}
        </div>
      )}
      <button onClick={desfazerVoto}> desfaz o voto </button>
    </div>
  );
}
export default App;
