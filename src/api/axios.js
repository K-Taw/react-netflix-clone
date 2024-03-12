import axios from "axios";

const instance = axios.create({
    baseURL:"https://api.themoviedb.org/3",
    params: {
        api_key: "96793ed7017a8fdc2badd01f5bd44ae8",
        language:"ko-KR",
    },
});

export default instance;