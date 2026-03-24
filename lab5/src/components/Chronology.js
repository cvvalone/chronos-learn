import React, { useEffect, useState } from 'react';
import EventCard from './EventCard';
import { fetchEvents } from '../services/backendApi';
import './Chronology.css';

/**
 * Chronology Component - Main container for displaying filtered historical events
 * Implements dynamic filtering by historical periods
 */
const Chronology = ({ onLearnMore }) => {
    const [allEvents, setAllEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // State for filtering
    const [selectedPeriod, setSelectedPeriod] = useState('all');

    useEffect(() => {
        const loadEvents = async () => {
            try {
                setLoading(true);
                const data = await fetchEvents();
                setAllEvents(Array.isArray(data?.events) ? data.events : []);
            } catch (err) {
                console.error('Failed to load events from backend:', err);
                setError('Не вдалося завантажити події з сервера');
            } finally {
                setLoading(false);
            }
        };

        loadEvents();
    }, []);

    // Filter events based on selected period
    const filteredEvents = selectedPeriod === 'all'
        ? allEvents
        : allEvents.filter(event => event.period === selectedPeriod);

    // Period filter options
    const periods = [
        { value: 'all', label: 'Всі епохи' },
        { value: 'ancient', label: 'Античність' },
        { value: 'medieval', label: 'Середньовіччя' },
        { value: 'renaissance', label: 'Відродження' },
        { value: 'modern', label: 'Нові часи' },
        { value: 'contemporary', label: 'Новітній час' }
    ];

    return (
        <section id="timeline" className="section-padding relative-overflow">
            <div className="container">
                <div className="section-title">
                    <h2 className="font-serif text-white">Хронологія Епох</h2>
                    <div className="divider"></div>
                </div>

                {/* Filter Buttons */}
                <div className="filter-container">
                    <p className="filter-label text-muted">Фільтрувати за періодом:</p>
                    <div className="filter-buttons">
                        {periods.map(period => (
                            <button
                                key={period.value}
                                className={`filter-btn ${selectedPeriod === period.value ? 'active' : ''}`}
                                onClick={() => setSelectedPeriod(period.value)}
                            >
                                {period.label}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Timeline with filtered events */}
                <div className="timeline">
                    {loading && <div className="no-events text-muted">Завантаження подій...</div>}

                    {!loading && error && <div className="no-events text-muted">{error}</div>}

                    {!loading && !error && filteredEvents.length > 0 ? (
                        filteredEvents.map((event, index) => (
                            <EventCard
                                key={event.id}
                                event={event}
                                index={index}
                                onLearnMore={onLearnMore}
                            />
                        ))
                    ) : (
                        <div className="no-events text-muted">
                            Немає подій для відображення
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
};

export default Chronology;
