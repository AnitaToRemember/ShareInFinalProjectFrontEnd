import { useState, useEffect } from "react"
import { linksServices } from "../services"
import { getAllLinksService, removeLinkService, sendLinkService } from "../services/links"

function useListLinks(token) {
		const [links, setLinks] = useState([])
		const [loading, setLoading] = useState(false)
		const [error, setError] = useState("")

		useEffect(() => {
				const loadLinks = async () => {
					try {
						setLoading(true);
						const data = token
							? await linksServices.getUserLinksService(token)
							: await linksServices.getAllLinksService()
		
						setLinks(data.links)
					} catch (error) {
						setError(error.message)
					} finally {
						setLoading(false)
					}
				};
		
				loadLinks();
			}, [token])
		
			const addLink = async (data, token) => {
				await sendLinkService({data, token})
				const allNewLinks = await getAllLinksService()
				setLinks(allNewLinks.links);
			};
		
			const removeLink = async (id, token) => {
				console.log(id);
				await removeLinkService({id, token})
				const allNewLinks = await getAllLinksService()
				setLinks(allNewLinks.links);
				/*console.log('Removing link with id:', id);
				setLinks((prevLinks) => prevLinks.filter((link) => link.id !== id));*/
			};
		
			return { links, error, loading, addLink, removeLink }
		}

export default useListLinks
