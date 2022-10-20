import { Link } from 'react-router-dom';

interface IntroCardProps {
  category: string;
  title: string;
  src: string;
}

const IntroCard = ({ category, src, title }: IntroCardProps) => {
  return (
    <Link to={`/products/?category=${category}`}>
      <figure>
        <img src={src} alt={category} />
      </figure>
      <div className="intro__text-container">
        <h2 className="intro__title">{title}</h2>
        <p className="intro__message">Discover more</p>
      </div>
    </Link>
  );
};

export default IntroCard;
