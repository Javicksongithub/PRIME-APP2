import axios from "axios";

//base da url:https://api.themoviedb.org/3/
//url da api: https://api.themoviedb.org/3/movie/now_playing?api_key=862992d2670bb0401d85e36513068bb2&language=pt-BR

const api = axios.create({
    baseURL: 'https://api.themoviedb.org/3/'

});

export default api;