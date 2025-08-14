import axios from 'axios';

const API_URL = 'https://api.worldbank.org/v2';

const GDP_INDICATOR = 'NY.GDP.MKTP.CD'; 

const COUNTRIES = 'BR;US;CN;IN;DE';

export async function fetchGdpData() {
  const requestUrl = `${API_URL}/country/${COUNTRIES}/indicator/${GDP_INDICATOR}?date=2020:2022&format=json`;

  console.log("Buscando dados em:", requestUrl);

  try {
    const response = await axios.get(requestUrl);

    if (response.data && response.data[1]) {
      console.log("Dados recebidos da API:", response.data[1]);
      return response.data[1];
    } else {
      return [];
    }
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
        console.error("Erro da API do Banco Mundial:", error.response.data[0].message);
    } else {
        console.error("Erro ao buscar dados:", error);
    }
    return [];
  }
}