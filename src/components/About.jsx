import React, { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import { Container } from 'react-bootstrap';
import PropTypes from 'prop-types';
import Fade from 'react-reveal';
import Header from './Header';
import endpoints from '../constants/endpoints';
import FallbackSpinner from './FallbackSpinner';

const styles = {
  introTextContainer: {
    margin: 10,
    textAlign: 'left',
    fontSize: '1.2em',
    fontWeight: 500,
    lineHeight: '1.6', // Améliore la lisibilité pour l'effet journal
  },
  introImageContainer: {
    float: 'right', // Fait flotter l'image à droite (ou 'left' selon votre choix)
    marginLeft: '20px', // Espace entre le texte et l'image
    marginBottom: '10px',
    maxWidth: '300px', // Ajustez la taille selon vos besoins
  },
};

function About(props) {
  const { header } = props;
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch(`${process.env.PUBLIC_URL}/${endpoints.about}`, {
      method: 'GET',
    })
      .then((res) => {
        if (!res.ok) throw new Error('Fichier non trouvé');
        return res.json();
      })
      .then((res) => setData(res))
      .catch((err) => console.error('Erreur Fetch:', err));
  }, []);

  return (
    <>
      <Header title={header} />
      <div className="section-content-container">
        <Container>
          {data ? (
            <Fade>
              {/* On retire Row et Col pour laisser le flux HTML naturel */}
              <div style={styles.introTextContainer}>
                <div style={styles.introImageContainer} className="intro-image-journal">
                  <img
                    src={`${process.env.PUBLIC_URL}/${data.imageSource}`}
                    alt="profile"
                    style={{ width: '100%', borderRadius: '10px' }}
                  />
                </div>
                <ReactMarkdown children={data.about} />
              </div>
            </Fade>
          ) : (
            <FallbackSpinner />
          )}
        </Container>
      </div>
    </>
  );
}

About.propTypes = {
  header: PropTypes.string.isRequired,
};

export default About;
