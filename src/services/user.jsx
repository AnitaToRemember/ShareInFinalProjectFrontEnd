// Function to get user data using a provided token
export const getMyUserDataService = async ({ token }) => {
    const response = await fetch(`${import.meta.env.VITE_APP_BACKEND}/users`, {
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

// Function to upload a user's avatar image
export const uploadAvatar = async ({ imageFile, token }) => {
    const formData = new FormData();
    formData.append('avatar', imageFile);
    try {
        const response = await fetch(
            `${import.meta.env.VITE_APP_BACKEND}/users/avatar`,
            {
                method: 'PATCH',
                headers: {
                    Authorization: token,
                },
                body: formData,
            }
        );

        const json = await response.json();
        if (!response.ok) {
            throw new Error(json.message);
        }
        return json.data;
    } catch (error) {
        throw new Error(error);
    }
};
