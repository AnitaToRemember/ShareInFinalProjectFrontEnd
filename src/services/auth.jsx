// registerUserService function sends a POST request to register a new user.
// It takes user details like username, email, and password as input and returns a Promise.
// If the registration is successful, it returns a JSON token; otherwise, it throws an error.
export const registerUserService = async ({ userName, email, password }) => {
    const response = await fetch(
        `${import.meta.env.VITE_APP_BACKEND}/users/register`,
        {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
            },
            body: JSON.stringify({ userName, email, password }),
        }
    );

    const json = await response.json();

    if (!response.ok) {
        throw new Error(json.message);
    }
};

// loginUserService function sends a POST request to authenticate a user.
// It takes the user's email and password as input and returns a Promise.
// If authentication is successful, it returns a JSON token; otherwise, it throws an error.
export const loginUserService = async ({ email, password }) => {
    const response = await fetch(
        `${import.meta.env.VITE_APP_BACKEND}/users/login`,
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }),
        }
    );

    const json = await response.json();

    if (!response.ok) {
        throw new Error(json.message);
    }
    return json.token;
};

// changePasswordService function sends a PUT request to change a user's password.
// It takes oldPassword, newPassword, and a user token as input and returns a Promise.
// If the password change is successful, it returns a data object; otherwise, it throws an error.
export const changePasswordService = async ({
    oldPassword,
    newPassword,
    token,
}) => {
    const response = await fetch(
        `${import.meta.env.VITE_APP_BACKEND}/users/password`,
        {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                Authorization: token,
            },
            body: JSON.stringify({
                oldPass: oldPassword,
                newPass: newPassword,
            }),
        }
    );

    const json = await response.json();
    if (!response.ok) {
        throw new Error(json.message);
    }
    return json.data;
};
