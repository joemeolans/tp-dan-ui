// Function to fetch a paginated list of Pokémon
export async function getAllClientes() {
  const apiUrl = `http://localhost/clientes/api/clientes`;
  console.log('querying to ',apiUrl);
  try {
    const response = await fetch(apiUrl);
    console.log('Respuesta recibida:', response);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    console.log('Datos parseados:', data);
    return data || []; // Asegúrate de que esto es correcto
  } catch (error) {
    console.error("Failed to fetch clientes:", error);
    return [];
  }
}

export async function getClientesByFilters(queryValue = {}, limit = 10, offset = 0) {
  const { cuit, nombre } = queryValue; // Desestructura los valores de los filtros

  
  const params = new URLSearchParams();

  if (cuit) params.append("cuit", cuit);
  if (nombre) params.append("nombre", nombre); 
  params.append("limit", limit); 
  params.append("offset", offset); 

  const apiUrl = `http://localhost/clientes/api/clientes?${params.toString()}`;

  console.log('Consultando con URL:', apiUrl);

  try {
      const response = await fetch(apiUrl);
      console.log('Respuesta recibida:', response);
      if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      console.log('Datos parseados:', data);
      return data || [];
  } catch (error) {
      console.error("Error al consultar clientes:", error);
      return [];
  }
}

export const deleteCliente = async (id) => {
  const apiUrl = `http://localhost/clientes/api/clientes/${id}`;
  console.log('Eliminando cliente con URL:', apiUrl);

  try {
    const response = await fetch(apiUrl, { method: 'DELETE' });
    console.log('Respuesta recibida:', response);
    if (!response.ok) {
      throw new Error(`Error al eliminar el cliente. Estado HTTP: ${response.status}`);
    }
    console.log(`Cliente con id ${id} eliminado correctamente.`);
  } catch (error) {
    console.error("Error al eliminar el cliente:", error);
    throw error; // Propagar el error para manejarlo en el nivel superior si es necesario
  }
};

