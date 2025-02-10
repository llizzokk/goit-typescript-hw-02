import axios from "axios";

const BASE_URL = "https://api.unsplash.com/search/photos";
const API_KEY = "1-zniJCsDIL9hosFtgSlH1MCuQXjhfiZtSPDCByJO0A";

export const fetchImages = async (query, page = 1) => {
  const response = await axios.get(BASE_URL, {
    params: {
      query,
      page,
      per_page: 12,
      client_id: API_KEY,
    },
  });
  return response.data;
};
