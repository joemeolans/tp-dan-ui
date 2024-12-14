// Function to fetch a paginated list of Pokémon
export async function buscarPedido(queryValue, limit, offset = 0) {
    const apiUrl = `/pedidos/api/pedidos`;
    console.log('querying to ',apiUrl);
    try {
      const response = await fetch(apiUrl);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      return data.results;
    } catch (error) {
      console.error("Failed to fetch pedidos:", error);
    }
  }