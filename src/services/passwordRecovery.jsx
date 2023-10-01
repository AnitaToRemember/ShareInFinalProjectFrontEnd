// Function to send an email to recover a password
export const SendEmailToRecoverPassword = async ({ email }) => {
    const response = await fetch(
        `${import.meta.env.VITE_APP_BACKEND}/users/password/recover`,
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email }),
        }
    );

    const json = await response.json();
    if (!response.ok) {
        throw new Error(json.message);
    }
    return json.data;
};

// Function to recover a password by email
export const RecoveryByEmailService = async ({ email, code, password }) => {
    const response = await fetch(
        `${import.meta.env.VITE_APP_BACKEND}/users/password/recover`,
        {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, code, password }),
        }
    );

    const json = await response.json();
    if (!response.ok) {
        throw new Error(json.message);
    }
    return json.data;
};
