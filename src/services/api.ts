import axios from "axios";

const BASE_URL = "https://api.unsplash.com/search/photos";
const API_KEY = "1-zniJCsDIL9hosFtgSlH1MCuQXjhfiZtSPDCByJO0A";

interface IImage {
  id: string;
  alt_description: string;
  urls: {
    small: string;
    regular: string;
  };
}
interface IResponse {
  results: IImage[];
  total: number;
  total_pages: number;
}

export const fetchImages = async (
  query: string,
  page: number = 1
): Promise<IResponse> => {
  const response = await axios.get<IResponse>(BASE_URL, {
    params: {
      query,
      page,
      per_page: 12,
      client_id: API_KEY,
    },
  });
  return response.data;
};
