import { useState, useEffect } from "react";
import { getSingleLinkService } from "../services/links";


function useOneLink(id) {
    const [link, setLink] = useState("")
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState("")

    useEffect(() => {

        const loadPost = async () => {
            try{
                setLoading(true)

                const data = await getSingleLinkService(id)

                setLink(data.link)

            }
            catch(error){
                setError(error.message)
            }

            finally{
                setLoading(false)
            }
        }

        loadPost()
    }, [id])
    
    return {link, loading, error}
}

export default useOneLink
