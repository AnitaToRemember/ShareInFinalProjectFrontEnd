import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { linksServices } from "../services";


function useDeleteLink() {
	const { token } = useContext(AuthContext);
	const [error, setError] = useState("");

	const deleteLink = async (linkId, onSuccess) => {
		{console.log(`2. to know what is ${linkId}  `)}

		try {
			await linksServices.deleteLinkService({ linkId, token });

			if (onSuccess) {
				onSuccess(linkId);
			}
		} catch (error) {
			setError(error.message);
		}
	};

	return { deleteLink, error };
}

export default useDeleteLink;
