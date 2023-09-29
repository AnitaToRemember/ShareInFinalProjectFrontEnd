import { useState, useEffect} from 'react'

function useScroll() {
    const [scroll, setScroll] = useState(true)

    useEffect(() => {
        const handler = () => setScroll(document.scrollingElement.scrollTop)
        window.addEventListener('scroll', handler)
        return () => window.removeEventListener('scroll', handler)
    }, [])

    return scroll
}

export default useScroll