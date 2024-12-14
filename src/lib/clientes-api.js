// Function to fetch a paginated list of Pokémon
export async function getAllClientes(queryValue, limit, offset = 0) {
    const apiUrl = `/clientes/api/clientes`;
    console.log('querying to ',apiUrl);
    try {
      const response = await fetch(apiUrl);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      return data.results;
    } catch (error) {
      console.error("Failed to fetch clientes:", error);
    }
  }

  export async function getClientesByFilters() { //Hay que cambiar la logica despues
    const apiUrl = `/clientes/api/clientes`;
    console.log('querying to ',apiUrl);
    try {
      const response = await fetch(apiUrl);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      return data.results;
    } catch (error) {
      console.error("Failed to fetch clientes:", error);
    }
  }