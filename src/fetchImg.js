import axios from "axios";

const BASE_URL = 'https://pixabay.com/api/';
const PER_PAGES = 40;
const KEY = '29385955-aff2fabd11c0a187a88b06a62';

export const fetchImg = async(searchQuery, page) => {
    const response = await axios.get(`${BASE_URL}?key=${KEY}&q=${searchQuery}&image_type=photo&orientation=horizontal&safesearch=true&per_page=${PER_PAGES}&page=${page}`);
    return response.data; 

}

