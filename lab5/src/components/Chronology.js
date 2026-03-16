import React, { useState } from 'react';
import EventCard from './EventCard';
import './Chronology.css';

/**
 * Chronology Component - Main container for displaying filtered historical events
 * Implements dynamic filtering by historical periods
 */
const Chronology = ({ onLearnMore }) => {
    // Historical events data
    const allEvents = [
        {
            id: 1,
            title: "Античність",
            date: "800 до н.е. — 476 н.е.",
            period: "ancient",
            shortDesc: "Розквіт грецької філософії, римського права та архітектури.",
            fullDesc: "Античність заклала фундамент сучасної європейської цивілізації. У цей час були створені основи демократії в Афінах, збудовані величні Колізей та Парфенон, а римське право стало базою для багатьох сучасних правових систем.",
            img: "https://images.unsplash.com/photo-1564399580075-5dfe19c205f3?auto=format&fit=crop&w=500&q=60",
            map: { lat: 41.8902, lng: 12.4922, zoom: 5, label: "Рим, Італія" }
        },
        {
            id: 2,
            title: "Середньовіччя",
            date: "476 — 1492",
            period: "medieval",
            shortDesc: "Епоха лицарства, формування королівств та готичних соборів.",
            fullDesc: "Період, що почався після падіння Західної Римської імперії. Характеризується феодальною системою, домінуванням релігії в житті суспільства, хрестовими походами та будівництвом неприступних замків.",
            img: "https://i.pinimg.com/1200x/37/05/10/37051007336826ca9f34c8819bcf3f9c.jpg",
            map: { lat: 48.8584, lng: 2.2945, zoom: 5, label: "Париж, Франція" }
        },
        {
            id: 3,
            title: "Відродження",
            date: "XIV — XVII ст.",
            period: "renaissance",
            shortDesc: "Повернення до античних ідеалів, великі географічні відкриття.",
            fullDesc: "Епоха Ренесансу подарувала людству геніїв на кшталт Леонардо да Вінчі та Мікеланджело. Це час стрімкого розвитку науки, мистецтва та початку книгодрукування Гутенбергом.",
            img: "https://images.unsplash.com/photo-1576016770956-debb63d92058?auto=format&fit=crop&w=500&q=60",
            map: { lat: 43.7696, lng: 11.2558, zoom: 6, label: "Флоренція, Італія" }
        },
        {
            id: 4,
            title: "Нові часи",
            date: "XVII — XIX ст.",
            period: "modern",
            shortDesc: "Епоха просвітництва, промислової революції та формування націй.",
            fullDesc: "Період великих наукових відкриттів, технологічного прогресу та соціальних змін. Час промислової революції, що змінила світ назавжди.",
            img: "https://images.unsplash.com/photo-1532012197267-da84d127e765?auto=format&fit=crop&w=500&q=60",
            map: { lat: 51.5074, lng: -0.1278, zoom: 5, label: "Лондон, Великобританія" }
        },
        {
            id: 5,
            title: "Новітній час",
            date: "XX — XXI ст.",
            period: "contemporary",
            shortDesc: "Епоха світових воєн, технологічного прориву та глобалізації.",
            fullDesc: "Сучасна епоха, що включає дві світові війни, космічну гонку, цифрову революцію та становлення глобального інформаційного суспільства.",
            img: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=500&q=60",
            map: { lat: 40.7128, lng: -74.0060, zoom: 5, label: "Нью-Йорк, США" }
        }
    ];

    // State for filtering
    const [selectedPeriod, setSelectedPeriod] = useState('all');

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
                    {filteredEvents.length > 0 ? (
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
