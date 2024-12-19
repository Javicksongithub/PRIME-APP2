import { useEffect, useState } from "react";
import api from "../../Services/api";
import { Link } from "react-router-dom";
import './Home.css'; // Corrigi a importação do 'api'

// URL: https://api.themoviedb.org/3/movie/now_playing?api_key=862992d2670bb0401d85e36513068bb2&language=pt-BR

function Home() {
    const [filmes, setFilmes] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function loadFilmes() {
            try {
                const response = await api.get("movie/now_playing", {
                    params: {
                        api_key: "862992d2670bb0401d85e36513068bb2",
                        language: "pt-BR",
                        page: 1,
                    },
                });
                setFilmes(response.data.results.slice(0, 10)); // Ajusta conforme a estrutura da resposta
            } catch (error) {
                console.error("Erro ao carregar filmes: ", error);
            } finally {
                setLoading(false); // Definir o loading como false após a requisição, sucesso ou erro
            }
        }

        loadFilmes();
    }, []);

    if (loading) {
        return (
            <div className="loading">
                <h2>Carregando Filmes... </h2>
            </div>
        );
    }

    return (
        <div className="container">
            <h1>Bem-vindo à Home</h1>
            <div className="lista-filmes">
                {filmes.map((filme) => {
                    return (
                        <article key={filme.id}>
                            <strong>{filme.title}</strong>
                            <img src={`https://image.tmdb.org/t/p/original/${filme.poster_path}`} alt={filme.title} />
                            <Link to={`/filme/${filme.id}`}>Acessar</Link>
                        </article>
                    );
                })}
            </div>
        </div>
    );
}

export default Home;
