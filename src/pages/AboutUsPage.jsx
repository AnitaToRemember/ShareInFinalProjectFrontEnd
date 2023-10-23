// AboutUsPage
import CreatorCard from '../components/CreatorCard';
import '../styles/pages/AboutUsPage.css';

const AboutUsPage = () => {
return (
<div className="about-us-page">
    <h1 className="about-us-heading">About Us</h1>
    <div className="creators-container">
    {/* Creator 1 */}
    <CreatorCard
        name="Ana Cristina"
        description="Co-founder and Developer"
        imageUrl="/src/assets/ana.jpeg"
        linkedinUrl="https://www.linkedin.com/in/anabest/"
        githubUrl="https://github.com/AnitaToRemember"
    />

    {/* Creator 2 */}
    <CreatorCard
        name="Evelin"
        description="Co-founder and Designer"
        imageUrl='/src/assets/evelin.png'
        linkedinUrl="https://www.linkedin.com/in/evelinarboleda/"
        githubUrl="https://github.com/EveArbol"
    />
    </div>
</div>
);
};

export default AboutUsPage;
