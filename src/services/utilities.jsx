// Function to submit a star rating for a link
export const starRatingService = async (value, linkId, token) => {
  const response = await fetch(
    `${import.meta.env.VITE_APP_BACKEND}/links/${linkId}/votes`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
      body: JSON.stringify({ value }),
    }
  );

  const json = await response.json();

  if (!response.ok) {
    throw new Error(json.message);
  }
};

// Function to filter links based on sorting and keyword
export const filterService = async (sortBy, keyword) => {
  const response = await fetch(
    `${import.meta.env.VITE_APP_BACKEND}/links?${sortBy}=votes&${keyword}`,
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
