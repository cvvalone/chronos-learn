# Historia - Interactive History Education Platform
## React Application (Lab 3 - Variant 15)

### Overview
This is a React-based interactive history education platform that allows users to explore historical events, take quizzes, and track their learning progress.

### Project Structure

```
src/
├── components/
│   ├── Chronology.js          # Main container with filtering functionality
│   ├── Chronology.css
│   ├── EventCard.js           # Displays individual historical events
│   ├── EventCard.css
│   ├── Quiz.js                # Interactive quiz component
│   ├── Quiz.css
│   ├── ProgressChart.js       # Tracks and displays user progress
│   ├── ProgressChart.css
│   ├── Navigation.js          # Navigation bar with routing
│   ├── Navigation.css
│   ├── Footer.js              # Footer component
│   └── Footer.css
├── pages/
│   ├── Home.js                # Home page with timeline and quiz
│   ├── Home.css
│   ├── Profile.js             # Profile page with progress statistics
│   └── Profile.css
├── App.js                     # Main app with routing setup
├── App.css
├── index.js
└── index.css
```

### Key Features (Lab Requirements)

#### 1. Component-Based Architecture ✅
- **Chronology**: Main container component that manages historical events
- **EventCard**: Reusable component for displaying individual events
- **Quiz**: Interactive quiz component with question validation
- **ProgressChart**: Component for tracking and visualizing user progress

#### 2. State Management with useState ✅
- `progress` state in App.js tracks all quiz attempts
- `selectedPeriod` state in Chronology.js manages filtering
- `answers` and `userName` states in Quiz.js manage form data
- LocalStorage persistence for user progress

#### 3. Dynamic Filtering ✅
Implemented in the Chronology component:
- Filter by periods: All, Ancient World, Medieval, Renaissance, Modern Times, Contemporary
- Buttons to toggle between different historical periods
- Real-time filtering of events based on selection

#### 4. Routing with react-router-dom ✅
- **Home Page** (`/`): Displays chronology, events, and quiz
- **Profile Page** (`/profile`): Shows user's progress and statistics
- Single Page Application (SPA) behavior - no page reloads
- Active navigation highlighting

### Technologies Used
- React 18
- React Router DOM v6
- CSS3 (CSS Variables for theming)
- LocalStorage API for data persistence

### How to Run

```bash
cd lab3/my-history-app
npm install
npm start
```

The application will open at `http://localhost:3000`

### Features Breakdown

#### Chronology Component
- Displays historical events in a timeline format
- Implements filtering by historical periods
- Uses EventCard components for each event
- Alternates layout (left/right) for visual appeal

#### EventCard Component
- Displays event title, date, description, and image
- "Learn More" button opens modal with detailed information
- Responsive design for mobile devices

#### Quiz Component  
- Two multiple-choice questions about history
- Name input for personalized results
- Visual feedback (✔/✖) for correct/incorrect answers
- Score calculation and display
- Ability to retake the quiz

#### ProgressChart Component
- Displays total quiz attempts
- Shows correct answers count
- Calculates average percentage
- Provides grade based on performance
- Lists quiz attempt history with timestamps

#### Routing
- Seamless navigation between pages
- Active link highlighting
- Browser history support
- Deep linking support

### Data Flow
1. User takes quiz → Quiz component collects answers
2. Quiz submission → Calls `onQuizComplete` callback
3. App.js updates progress state
4. Progress saved to LocalStorage
5. Profile page reads progress from state
6. ProgressChart visualizes the data

### Responsive Design
- Mobile-first approach
- Breakpoint at 768px for tablet/mobile
- Collapsible timeline on mobile
- Adjusted font sizes and spacing

### Lab Report Documentation

**Component Architecture:**
- All components are functional components using React hooks
- Props are passed down from parent to child components
- State is managed at the appropriate level (lifting state up when needed)

**State Management:**
- `useState` hook for local component state
- `useEffect` hook for side effects (localStorage sync)
- State lifting pattern for sharing data between components

**Filtering Implementation:**
- Period-based filtering using array `.filter()` method
- Controlled components for filter buttons
- Conditional rendering based on filter state

**Routing:**
- `BrowserRouter` wraps the entire application
- `Routes` and `Route` components define navigation structure
- `Link` component for navigation without page reloads
- `useLocation` hook for active link detection

### Credits
Developed for University Lab Assignment - Variant 15
"History Education Platform through Interactive Events"
