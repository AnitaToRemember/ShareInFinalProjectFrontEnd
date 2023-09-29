import { useContext } from 'react'
import { AuthContext } from '../context/AuthContext'
import NewLink from '../components/NewLink'
import useListLinks from '../hooks/useListLinks'
import Loading from '../components/Loading'
import ErrorMessage from '../components/ErrorMessage'
import LinkPost from '../components/LinkPost'
import Auth from '../components/Auth'

function HomePage() {
    const { links, error, loading, addLink, removeLink } = useListLinks()
    const { user } = useContext(AuthContext)
    
    if (loading) return <Loading />
    if (error) return <ErrorMessage message={error} />

return (
    <main>
        <header>
            <Auth />
        </header>
        <section>
            {user ? <NewLink addLink={addLink} /> : null}
            
                <h1>Latest posts</h1>
                {links.map((link) => (
                    <LinkPost key={link.id} link={link} removeLink={removeLink} />
                ))}
        </section>
    </main>
    )
}

export default HomePage
        
