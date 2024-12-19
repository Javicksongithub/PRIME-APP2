import './favoritos.css';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

function Favoritos() {
    const [filmes, setFilmes] = useState([]);

    useEffect(() => {
        const minhaLista = localStorage.getItem("@primeflix");
        setFilmes(JSON.parse(minhaLista) || []);
    }, []);

    function excluirFilme(id) {
        let filtroFilmes = filmes.filter((item)=>{

            return (item.id!== id)

        })
        setFilmes(filtroFilmes);
        localStorage.setItem("@primeflix", JSON.stringify(filtroFilmes));
        toast.success("filme excluido com sucesso!");

        const filmesAtualizados = filmes.filter(filme => filme.id !== id);
        setFilmes(filmesAtualizados);
        localStorage.setItem("@primeflix", JSON.stringify(filmesAtualizados));
    }

    return (
        <div className="meus-filmes">
            <h1>Meus Filmes</h1>
            

            <ul>
                {filmes.length === 0 ? (
                    <li>Você não possui nenhum filmes salvos.</li>
                ) : (
                    filmes.map((item) => (
                        <li key={item.id}>
                            <span>{item.title}</span>
                            <div>
                                <Link to={`/filme/${item.id}`}>Acessar Detalhes do filme</Link>
                                <button onClick={() => excluirFilme(item.id)}>Excluir</button>
                            </div>
                        </li>
                    ))
                )}
            </ul>
        </div>
    );
}

export default Favoritos;
