import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { removeLinkService } from "../services/links";


function useDeleteLink() {
	const { token } = useContext(AuthContext);
	const [error, setError] = useState("");

	const deleteLink = async (linkId, onSuccess) => {
		try {
			await removeLinkService({ linkId, token });

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
