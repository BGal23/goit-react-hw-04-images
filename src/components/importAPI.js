import axios from 'axios';
const baseUrl = 'https://pixabay.com/api/';
const key = '39891007-90054c7bf84e45a363315c2ae';
const getAllItem = async (query, pageNr) => {
  const url = `${baseUrl}?q=${query}&page=${pageNr}&key=${key}&all=photo&orientation=horizontal&per_page=12`;
  const resp = await axios.get(url);
  return resp.data.hits;
};

export default getAllItem;
