import axios from "axios";

const API_KEY = "SeUFj1xwChL0ljimNj_TUMDvA_tBPYpz1OR8V4zFrMg";
const BASE_URL = "https://api.unsplash.com/search/photos";

const fetchImages = async (query, page) => {
  const response = await axios.get(BASE_URL, {
    params: {
      query,
      page,
      per_page: 12,
      client_id: API_KEY,
    },
  });

  return response.data.results;
};

export default fetchImages;
