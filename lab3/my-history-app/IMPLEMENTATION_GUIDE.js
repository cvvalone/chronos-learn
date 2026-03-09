/* 
 * LAB IMPLEMENTATION SUMMARY
 * Variant 15: History Education Platform through Interactive Events
 * 
 * This document explains how each lab requirement was implemented
 */

/* ============================================
 * REQUIREMENT 1: Component-Based Architecture
 * ============================================ */

/**
 * 1. Chronology Component (src/components/Chronology.js)
 * - Main container that holds all historical events
 * - Manages filtering state with useState
 * - Renders EventCard components in a loop
 * - Implements period-based filtering logic
 */

/**
 * 2. EventCard Component (src/components/EventCard.js)
 * - Reusable component for displaying individual events
 * - Receives event data via props
 * - Handles "Learn More" button clicks
 * - Alternates layout based on index (left/right positioning)
 */

/**
 * 3. Quiz Component (src/components/Quiz.js)
 * - Interactive quiz with multiple-choice questions
 * - Manages answer state using useState
 * - Validates user input (all questions must be answered)
 * - Calculates score and provides feedback
 * - Calls parent callback to update progress
 */

/**
 * 4. ProgressChart Component (src/components/ProgressChart.js)
 * - Displays user's learning statistics
 * - Receives progress array via props
 * - Calculates total score, average, and grade
 * - Shows history of all quiz attempts
 */

/* ============================================
 * REQUIREMENT 2: State Management with useState
 * ============================================ */

/**
 * State in App.js:
 * - progress: Array of quiz attempts (localStorage synced)
 * - Uses useEffect to load/save progress from/to localStorage
 * 
 * Example:
 */
const [progress, setProgress] = useState([]);

useEffect(() => {
    const savedProgress = localStorage.getItem('historyProgress');
    if (savedProgress) {
        setProgress(JSON.parse(savedProgress));
    }
}, []);

/**
 * State in Chronology.js:
 * - selectedPeriod: Current filter selection
 * - Controls which events are displayed
 */
const [selectedPeriod, setSelectedPeriod] = useState('all');

/**
 * State in Quiz.js:
 * - answers: Object storing user's selected answers
 * - userName: String for user's name
 * - result: Quiz result object
 * - showAnswers: Boolean to show/hide correct answers
 */
const [answers, setAnswers] = useState({ q1: '', q2: '' });
const [userName, setUserName] = useState('');
const [result, setResult] = useState(null);
const [showAnswers, setShowAnswers] = useState(false);

/**
 * State in Home.js:
 * - selectedEvent: Currently selected event for modal
 * - showQuiz: Boolean to show/hide quiz section
 */
const [selectedEvent, setSelectedEvent] = useState(null);
const [showQuiz, setShowQuiz] = useState(false);

/* ============================================
 * REQUIREMENT 3: Dynamic Filtering
 * ============================================ */

/**
 * Implementation in Chronology.js:
 * 
 * 1. Define filter options:
 */
const periods = [
    { value: 'all', label: 'Всі епохи' },
    { value: 'ancient', label: 'Античність' },
    { value: 'medieval', label: 'Середньовіччя' },
    { value: 'renaissance', label: 'Відродження' },
    { value: 'modern', label: 'Нові часи' },
    { value: 'contemporary', label: 'Новітній час' }
];

/**
 * 2. Filter logic:
 */
const filteredEvents = selectedPeriod === 'all'
    ? allEvents
    : allEvents.filter(event => event.period === selectedPeriod);

/**
 * 3. Render filter buttons:
 */
{
    periods.map(period => (
        <button
            key={period.value}
            className={`filter-btn ${selectedPeriod === period.value ? 'active' : ''}`}
            onClick={() => setSelectedPeriod(period.value)}
        >
            {period.label}
        </button>
    ))
}

/**
 * 4. Display filtered events:
 */
{
    filteredEvents.map((event, index) => (
        <EventCard key={event.id} event={event} index={index} />
    ))
}

/* ============================================
 * REQUIREMENT 4: Routing with react-router-dom
 * ============================================ */

/**
 * 1. Router setup in App.js:
 */
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
    return (
        <Router>
            <Navigation />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/profile" element={<Profile progress={progress} />} />
            </Routes>
            <Footer />
        </Router>
    );
}

/**
 * 2. Navigation component with active links:
 */
import { Link, useLocation } from 'react-router-dom';

const Navigation = () => {
    const location = useLocation();

    return (
        <nav>
            <Link to="/" className={location.pathname === '/' ? 'active' : ''}>
                Головна
            </Link>
            <Link to="/profile" className={location.pathname === '/profile' ? 'active' : ''}>
                Профіль
            </Link>
        </nav>
    );
};

/**
 * 3. Single Page Application behavior:
 * - No page reloads when navigating
 * - Browser history support (back/forward buttons work)
 * - Active link highlighting based on current route
 */

/* ============================================
 * DATA FLOW DIAGRAM
 * ============================================ */

/**
 * User takes quiz:
 * 1. Quiz component → user fills answers
 * 2. Submit button → Quiz validates inputs
 * 3. Quiz calculates score
 * 4. Quiz calls onQuizComplete(score, total, userName)
 * 5. App.js receives callback → updates progress state
 * 6. useEffect in App.js → saves to localStorage
 * 7. User navigates to Profile page
 * 8. Profile receives progress via props
 * 9. ProgressChart displays statistics
 */

/* ============================================
 * MODERN REACT BEST PRACTICES USED
 * ============================================ */

/**
 * 1. Functional Components
 * - All components use modern function syntax
 * - No class components
 * 
 * 2. React Hooks
 * - useState for state management
 * - useEffect for side effects
 * - useLocation for routing information
 * 
 * 3. Props and Callbacks
 * - Data flows down via props
 * - Events flow up via callbacks
 * - One-way data flow pattern
 * 
 * 4. Component Composition
 * - Small, focused components
 * - Reusable components (EventCard)
 * - Container/Presentational pattern
 * 
 * 5. Controlled Components
 * - Form inputs controlled by React state
 * - Single source of truth
 * 
 * 6. Conditional Rendering
 * - && operator for showing/hiding elements
 * - Ternary operator for alternative content
 * 
 * 7. Array Methods
 * - map() for rendering lists
 * - filter() for filtering data
 * - reduce() for calculations
 * 
 * 8. CSS Modules Pattern
 * - Separate CSS file for each component
 * - CSS Variables for theming
 * - BEM-like naming convention
 */

/* ============================================
 * TESTING INSTRUCTIONS
 * ============================================ */

/**
 * 1. Start the application:
 *    cd lab3/my-history-app
 *    npm start
 * 
 * 2. Test Filtering:
 *    - Navigate to home page
 *    - Click different period filter buttons
 *    - Verify that events change accordingly
 *    - Check that "Всі епохи" shows all events
 * 
 * 3. Test Quiz:
 *    - Click "Пройти Тест" button
 *    - Fill in all questions and name
 *    - Submit and verify score calculation
 *    - Check visual feedback (✔/✖ icons)
 * 
 * 4. Test Routing:
 *    - Click "Профіль" in navigation
 *    - Verify no page reload (watch network tab)
 *    - Check active link highlighting
 *    - Use browser back button
 *    - Verify URL changes
 * 
 * 5. Test Progress Tracking:
 *    - Complete multiple quizzes
 *    - Navigate to Profile page
 *    - Verify statistics are correct
 *    - Check quiz attempt history
 *    - Refresh page and verify data persists
 * 
 * 6. Test Modal:
 *    - Click "Дізнатися більше" on any event
 *    - Verify modal opens with event details
 *    - Click X or outside modal to close
 * 
 * 7. Test Responsive Design:
 *    - Open DevTools
 *    - Toggle device toolbar
 *    - Test on mobile viewport (375px)
 *    - Verify layout adapts properly
 */
