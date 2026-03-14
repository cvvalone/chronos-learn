import React, { useState } from 'react';
import Chronology from '../components/Chronology';
import Quiz from '../components/Quiz';
import MapView from '../components/MapView';
import './Home.css';

/**
 * Home Page - Main page with timeline and quiz
 */
const Home = ({ onQuizComplete }) => {
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [showQuiz, setShowQuiz] = useState(false);

  const handleLearnMore = (event) => {
    setSelectedEvent(event);
  };

  const handleCloseModal = () => {
    setSelectedEvent(null);
  };

  const handleOpenQuiz = () => {
    setShowQuiz(true);
    // Smooth scroll to quiz section
    setTimeout(() => {
      const quizElement = document.querySelector('.quiz-section');
      if (quizElement) {
        quizElement.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  return (
    <div className="home-page">
      {/* Hero Section */}
      <section id="hero">
        <div className="hero-overlay"></div>
        <div className="hero-content">
          <h1 className="font-serif">Вивчай минуле,<br />щоб зрозуміти майбутнє</h1>
          <p>Інтерактивна платформа для занурення в ключові епохи людства.</p>
          <a href="#timeline" className="btn-outline">Почати подорож</a>
        </div>
      </section>

      {/* Chronology Section */}
      <Chronology onLearnMore={handleLearnMore} />

      {/* Events Section with Quiz Button */}
      <section id="events" className="section-padding bg-secondary">
        <div className="container">
          <div className="section-title">
            <h2 className="font-serif text-white">Ключові Події та Перевірка</h2>
            <p className="text-muted">Готові перевірити свої знання?</p>
            <br />
            <button
              className="btn-submit"
              style={{ margin: '0 auto' }}
              onClick={handleOpenQuiz}
            >
              Пройти Тест
            </button>
          </div>
        </div>
      </section>

      {/* Quiz Section */}
      {showQuiz && (
        <div className="quiz-section">
          <Quiz onQuizComplete={onQuizComplete} />
        </div>
      )}

      {/* Modal for Event Details */}
      {selectedEvent && (
        <div className="modal" onClick={handleCloseModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <span className="close-btn" onClick={handleCloseModal}>&times;</span>
            <h2 className="font-serif text-accent">{selectedEvent.title}</h2>
            <p className="text-white mt-4">{selectedEvent.fullDesc}</p>
            <div className="modal-map">
              <MapView
                lat={selectedEvent.map.lat}
                lng={selectedEvent.map.lng}
                zoom={selectedEvent.map.zoom}
                label={selectedEvent.map.label}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
