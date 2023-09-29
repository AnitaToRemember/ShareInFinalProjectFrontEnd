import { useEffect, useState } from "react"
import { userServices } from "../services"


function useUser(id) {
    const [user, setUser] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState("")

    useEffect(() => {
        const loadUser = async () => {
        try {
            setLoading(true);
            const data = await userServices.getMyUserDataService(id)

            setUser(data)
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false)
        }
        }

        loadUser()
    }, [id])

    return { user, error, loading }
}

export default useUser
