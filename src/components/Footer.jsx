import { faCircleInfo } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Link } from "react-router-dom"
import '../styles/components/Footer.css'

const Footer = () => {
    

    return (
        <footer className='about-us'><Link to={'/about-us'}><FontAwesomeIcon icon={faCircleInfo} size="2xl" style={{ color: "#0093ff" }} /> </Link></footer>
    )
}


export default Footer

//this will be used in the future.