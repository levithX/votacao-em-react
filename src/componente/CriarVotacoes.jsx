function CriarVotacoes({valueInput, onChangeinput, onKeyDownInput}) {
    return (
     <div>
        <input type="text"  
        value={valueInput} 
        onKeyDown={onKeyDownInput}
        onChange={onChangeinput}
        placeholder="digite nova opcao de votacao"
        />
     </div>
    )
}


export default CriarVotacoes;