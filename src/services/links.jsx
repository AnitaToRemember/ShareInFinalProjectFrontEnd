// Function to fetch all links
export const getAllLinksService = async () => {
  const response = await fetch(`${import.meta.env.VITE_APP_BACKEND}/links`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  const json = await response.json();

  if (!response.ok) {
    throw new Error(json.message);
  }

  return json.data;
};

// Function to fetch a single link by ID
export const getSingleLinkService = async (id) => {
  const response = await fetch(
    `${import.meta.env.VITE_APP_BACKEND}/links/${id}`,
    {
      method: "GET",
      headers: {
        "Content-type": "application/json",
      },
    }
  );

  const json = await response.json();

  if (!response.ok) {
    throw new Error(json.message);
  }
  return json.data;
};

// Function to send a new link
export const sendLinkService = async ({ data, token }) => {
  const response = await fetch(`${import.meta.env.VITE_APP_BACKEND}/links`, {
    method: "POST",
    body: data,
    headers: {
      Authorization: token,
    },
  });

  const json = await response.json();

  if (!response.ok) {
    throw new Error(json.message);
  }

  return json.data;
};

// Function to fetch user-specific links
export const getUserLinksService = async (token) => {
  const response = await fetch(`${import.meta.env.VITE_APP_BACKEND}/mylinks`, {
    headers: {
      Authorization: `${token}`,
    },
  });

  const json = await response.json();

  if (!response.ok) {
    throw new Error(json.message);
  }

  return json.data;
};

// Function to remove a link by ID
export const removeLinkService = async ({ id, token }) => {
  const response = await fetch(
    `${import.meta.env.VITE_APP_BACKEND}/links/${id}`,
    {
      method: "DELETE",
      headers: {
        Authorization: token,
      },
    }
  );

  const json = await response.json();

  if (!response.ok) {
    throw new Error(json.message);
  }
};

  