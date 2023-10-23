// CreatorCard.
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLinkedin, faGithub } from '@fortawesome/free-brands-svg-icons';

const CreatorCard = ({ name, description, imageUrl, linkedinUrl, githubUrl }) => {
return (
<div className="creator-card">
    <img src={imageUrl} alt={`Profile of ${name}`} className="creator-profile-pic" />
    <h2 className="creator-name">{name}</h2>
    <p className="creator-description">{description}</p>
    <div className="social-links">
    <a href={linkedinUrl} target="_blank" rel="noopener noreferrer">
        <FontAwesomeIcon icon={faLinkedin} size="2x" className="linkedin-icon" />
    </a>
    <a href={githubUrl} target="_blank" rel="noopener noreferrer">
        <FontAwesomeIcon icon={faGithub} size="2x" className="github-icon" />
    </a>
    </div>
</div>
);
};

export default CreatorCard;
