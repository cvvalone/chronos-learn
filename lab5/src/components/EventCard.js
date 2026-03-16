import React from 'react';
import './EventCard.css';

/**
 * EventCard Component - Displays a single historical event
 * @param {Object} event - Event data object
 * @param {number} index - Index in the array for styling purposes
 * @param {function} onLearnMore - Callback when "Learn More" is clicked
 */
const EventCard = ({ event, index, onLearnMore }) => {
    const isReverse = index % 2 !== 0;

    return (
        <div className={`timeline-item ${isReverse ? 'reverse' : ''}`}>
            <div className={`timeline-content text-${isReverse ? 'left' : 'right'}`}>
                <h3 className="font-serif text-white">{event.title}</h3>
                <span className="date">{event.date}</span>
                <p className="text-muted">{event.shortDesc}</p>
                <button
                    className="btn-outline btn-small"
                    onClick={() => onLearnMore(event)}
                >
                    Дізнатися більше
                </button>
            </div>
            <div className={`timeline-dot ${isReverse ? 'bg-secondary border-accent' : ''}`}></div>
            <div className="timeline-img">
                <img src={event.img} alt={event.title} />
            </div>
        </div>
    );
};

export default EventCard;
