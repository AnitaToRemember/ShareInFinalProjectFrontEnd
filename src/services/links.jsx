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
  
  export const getSingleLinkService = async ({ linkId }) => {
    const response = await fetch(
      `${import.meta.env.VITE_APP_BACKEND}/links/${linkId}`,
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
  
  export const deleteLinkService = async ({ linkId, token }) => {
    const response = await fetch(
      `${import.meta.env.VITE_APP_BACKEND}/links/${linkId}`,
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
  