import { useContext } from 'react'
import { AuthContext } from '../context/AuthContext'
import NewLink from '../components/NewLink'
import useListLinks from '../hooks/useListLinks'
import Loading from '../components/Loading'
import ErrorMessage from '../components/ErrorMessage'
import LinkPost from '../components/LinkPost'
import Auth from '../components/Auth'

// Home page component
function HomePage() {
    // Retrieve user information from the AuthContext using useContext
    const { user } = useContext(AuthContext)

    // Use the useListLinks hook to fetch, add, and remove links
    const { links, error, loading, addLink, removeLink } = useListLinks()

    // Render loading component while data is being fetched
    if (loading) return <Loading />

    // Render error message component if there is an error
    if (error) return <ErrorMessage message={error} />

    // Render the main content of the home page
    return (
        <main>
            {/* Display authentication component in the header */}
            <header>
                <Auth />
            </header>
            <section>
                {/* Display the "NewLink" component if a user is authenticated */}
                {user ? <NewLink addLink={addLink} /> : null}
                
                {/* Display the title for the list of latest posts */}
                <h1>Latest posts</h1>

                {/* Map through the list of links and display each as a "LinkPost" component */}
                {links.map((link) => (
                    <LinkPost key={link.id} link={link} removeLink={removeLink} />
                ))}
            </section>
        </main>
    )
}

export default HomePage
