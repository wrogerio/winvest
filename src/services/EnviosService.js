export const GetList = async () => {
  const response = await fetch(`/api/envios`);
  const data = await response.json();
  return data;
};

export const RemoveItem = async (id) => {
  const response = await fetch(`/api/envios/${id}`, {
    method: 'DELETE',
  });
  const data = await response.json();
  return data;
}

export const GetItem = async (id) => {
  const response = await fetch(`/api/envios/${id}`);
  const data = await response.json();
  return data;
}

export const SaveItem = async (item) => {

  //check if item contains an id
  if (item.Id) {
    const response = await fetch(`/api/envios/${item.Id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(item)
    });
    const data = await response.json();
    return data;
  }
  else {
    const response = await fetch(`/api/envios`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(item)
    });
    const data = await response.json();
    return data;
  }
}