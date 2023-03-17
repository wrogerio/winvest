export const GetList = async () => {
  const response = await fetch(`/api/rendimentos`);
  const data = await response.json();
  return data;
};

export const RemoveItem = async (id) => {
  const response = await fetch(`/api/rendimentos/add-or-edit/${id}`, {
    method: 'DELETE',
  });
  const data = await response.json();
  return data;
}

export const GetItem = async (id) => {
  console.log(id);
  const response = await fetch(`/api/rendimentos/add-or-edit/${id}`);
  const data = await response.json();
  return data;
}

export const GetLast = async () => {
  const response = await fetch(`/api/rendimentos/last`);
  const data = await response.json();
  return data;
}

export const SaveItem = async (item) => {

  //check if item contains an id
  if (item.Id) {
    const response = await fetch(`/api/rendimentos/add-or-edit/${item.Id}`, {
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
    const response = await fetch(`/api/rendimentos`, {
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