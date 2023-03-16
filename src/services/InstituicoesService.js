export const GetList = async () => {
  const response = await fetch(`/api/instituicoes`);
  const data = await response.json();
  return data;
};

export const RemoveItem = async (id) => {
  const response = await fetch(`/api/instituicoes/${id}`, {
    method: 'DELETE',
  });
  const data = await response.json();
  return data;
}

export const GetItem = async (id) => {
  const response = await fetch(`/api/instituicoes/${id}`);
  const data = await response.json();
  return data;
}

export const SaveItem = async (item) => {

  //check if item contains an id
  if (item.Id) {
    const response = await fetch(`/api/instituicoes/${item.Id}`, {
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
    const response = await fetch(`/api/instituicoes`, {
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