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
    return data || [];
  } catch (error) {
    console.error("Failed to fetch clientes:", error);
    return [];
  }
}


export async function getClientesByFilters(queryValue = {}, limit = 10, offset = 0) {
  const { cuit, nombre } = queryValue;
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
    const response = await fetch(apiUrl, { method: 'DELETE', mode: 'cors', headers: {'Content-Type': 'application/json'} });
    console.log('Respuesta recibida:', response);
    if (!response.ok) {
      throw new Error(`Error al eliminar el cliente. Estado HTTP: ${response.status}`);
    }
    console.log(`Cliente con id ${id} eliminado correctamente.`);
  } catch (error) {
    console.error("Error al eliminar el cliente:", error);
    throw error;
  }
};

/**
export async funcition addCliente(clienteData) {
  const apiUrl: "http://localhost:80/clientes/api/clientes";

  try {
    const 

  method: 'POST'.,
      headers: {
        'Content-Type'; 'application/json',
      },
      body: JSON.stringify(clienteData),
    ;

    if (!response.ok) {
      throw new Error("Error al agregar cliente. Estado HTTP: ${response.status}");
    }

    const data = await response.json();
    console.error('Cliente agregado: ', data);
    return data;    catch (error) {
    console.error("Error al agregar cliente: ", error);
    throw error;
  } {

export async funcition updateCliente(id, clienteData) {
  const apiUrl: "http://localhost:80/clientes/api/clientes/${id}";

  try {
    const response = await fetch(apiUrl, {
      method: 'PUT',
      headers: {
        'Content-Type'; 'application/json',
      },
      body: JSON.stringify(clienteData),
    });

    if (!response.ok) {
      throw new Error("Error al agregar cliente. Estado HTTP: ${response.status}");
    }

    const data = await response.json();
    console.log(`Cliente con ID ${id} actualizado:`, data);
    return data;
  } catch (error) {
    console.error("Error al actualizar cliente:", error);
    throw error;
  }
}} ,lrU,ipa)()hctef tiawea = esnopse
  }
}
*/