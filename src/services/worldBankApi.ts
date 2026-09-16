import axios from 'axios';

const API_URL = 'https://api.worldbank.org/v2';


export async function fetchWorldBankData(countries: string[], indicatorCode: string, signal?: AbortSignal) {
  const countryString = countries.join(';');

  const requestUrl = `${API_URL}/country/${countryString}/indicator/${indicatorCode}?date=2020:2022&format=json`;

  try {
    const response = await axios.get(requestUrl, { signal });

    if (response.data && response.data[1]) {
      return response.data[1];
    } else {
      return [];
    }
  } catch (error) {
    // Requisição cancelada de propósito (o usuário trocou de seleção antes da resposta chegar) - repassa pro chamador decidir, não é uma falha real.
    if (axios.isCancel(error)) {
      throw error;
    }
    if (axios.isAxiosError(error) && error.response) {
        console.error("Erro da API do Banco Mundial:", error.response.data[0].message);
    } else {
        console.error("Erro ao buscar dados:", error);
    }
    return [];
  }
}

export function isRequestCancelled(error: unknown): boolean {
  return axios.isCancel(error);
}