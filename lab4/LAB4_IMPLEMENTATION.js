/**
 * LAB 4 - FIREBASE AUTHENTICATION & FIRESTORE IMPLEMENTATION  
 * Variant 15: Platform for learning history through interactive events
 * 
 * This comprehensive guide explains how each lab requirement was implemented
 */

/* ============================================
 * REQUIREMENT 1: FIREBASE AUTHENTICATION
 * ============================================ */

/**
 * 1.1 CONFIGURATION (src/firebase.js)
 * 
 * - Initializes Firebase App with credentials
 * - Exports auth service for authentication
 * - Exports Firestore db for database operations
 * 
 * Key functions used:
 * - initializeApp(firebaseConfig)
 * - getAuth(app) - returns auth service
 * - getFirestore(app) - returns Firestore database reference
 */

/**
 * 1.2 AUTHENTICATION CONTEXT (src/context/AuthContext.js)
 * 
 * - Creates AuthContext for global auth state management
 * - Uses onAuthStateChanged() to track login status
 * - Provides useAuth() hook for components
 * 
 * State provided:
 * - user: Current authenticated user object (from Firebase)
 * - loading: Boolean indicating if auth state is being checked
 * - error: Any authentication errors
 * - isAuthenticated: Boolean for quick auth check
 * - signOut(): Function to logout user
 */

/**
 * 1.3 AUTHENTICATION FORMS (src/components/LoginForm.js, RegisterForm.js)
 * 
 * RegisterForm:
 * - Uses createUserWithEmailAndPassword() Firebase SDK function
 * - Validates password strength and confirmation
 * - Handles registration errors (email in use, weak password, etc.)
 * 
 * LoginForm:
 * - Uses signInWithEmailAndPassword() Firebase SDK function
 * - Email and password validation
 * - User-friendly error messages
 * 
 * Both forms:
 * - Controlled components with React state
 * - onSuccess callback for navigation after auth
 * - Error display with Firebase error handling
 */

/**
 * 1.4 AUTHENTICATION PAGE (src/pages/AuthPage.js)
 * 
 * - Toggle between login and register modes
 * - Auto-redirects authenticated users to home
 * - Handles auth success and navigation
 */

/* ============================================
 * REQUIREMENT 2: ACCESS CONTROL / PROTECTED ROUTES
 * ============================================ */

/**
 * 2.1 PROTECTED ROUTE COMPONENT (src/components/ProtectedRoute.js)
 * 
 * Lab Requirement: Testing (Quiz) page only for authenticated users
 * 
 * Implementation:
 * - Checks authentication status using useAuth() hook
 * - If user is authenticated: renders the protected component
 * - If user is NOT authenticated: redirects to /login using Navigate
 * - Shows loading state while checking auth status
 * 
 * Usage in App.js:
 * <Route 
 *   path="/testing" 
 *   element={
 *     <ProtectedRoute element={<Testing />} />
 *   } 
 * />
 */

/**
 * 2.2 ROUTING STRUCTURE (src/App.js)
 * 
 * Public Routes:
 * - / (Home)
 * - /profile (User Profile)
 * - /login (Login Form)
 * - /register (Register Form)
 * 
 * Protected Routes:
 * - /testing (Quiz/Testing) - REQUIRES AUTHENTICATION
 */

/**
 * 2.3 NAVIGATION WITH AUTH (src/components/Navigation.js)
 * 
 * Shows different content based on auth status:
 * 
 * If User is Logged In:
 * - Display user's email
 * - Show "Testing" link (protected page)
 * - Show "Logout" button
 * 
 * If User is NOT Logged In:
 * - Hide "Testing" link
 * - Show "Login" button
 * - Show "Register" button
 */

/* ============================================
 * REQUIREMENT 3: DATABASE (FIREBASE FIRESTORE)
 * ============================================ */

/**
 * 3.1 FIRESTORE COLLECTIONS STRUCTURE
 * 
 * Collection: 'events'
 * - Stores historical events data
 * - Fields: title, date, period, description, images, etc.
 * 
 * Collection: 'quizQuestions'
 * - Stores quiz questions and answers
 * - Fields: question, options, correctAnswer, difficulty, etc.
 * 
 * Collection: 'userProgress'
 * - Stores user test scores and progress
 * - Fields: userId, score, total, userName, timestamp, etc.
 */

/**
 * 3.2 READ OPERATIONS (src/services/firestoreService.js)
 * 
 * Function: fetchEvents()
 * - Reads all documents from 'events' collection
 * - Firebase SDK: collection(), getDocs()
 * - Returns: Array of event objects
 * 
 * Function: fetchQuizQuestions()
 * - Reads all documents from 'quizQuestions' collection
 * - Firebase SDK: collection(), getDocs()
 * - Returns: Array of quiz question objects
 * 
 * Function: fetchUserProgress(userId)
 * - Reads user's progress from 'userProgress' collection
 * - Firebase SDK: collection(), query(), where()
 * - Returns: Array of user's quiz attempts
 */

/**
 * 3.3 WRITE OPERATIONS (src/services/firestoreService.js)
 * 
 * Function: saveUserScore(userId, score, total, userName)
 * - Writes new document to 'userProgress' collection
 * - Firebase SDK: collection(), addDoc(), serverTimestamp()
 * - Stores: User ID, score, percentage, timestamp
 * - Returns: Document ID of created record
 * 
 * Function: addNewEvent(eventData)
 * - Writes new historical event to 'events' collection
 * - Firebase SDK: collection(), addDoc()
 * - Stores: Event details with server timestamp
 * - Returns: Document ID of created event
 * 
 * Function: updateEvent(eventId, updates)
 * - Updates existing event in 'events' collection
 * - Firebase SDK: doc(), updateDoc(), serverTimestamp()
 */

/**
 * 3.4 FIRESTORE DEMO COMPONENT (src/components/FirestoreDemo.js)
 * 
 * This component demonstrates all Firestore operations:
 * 
 * READ OPERATION:
 * - Uses useEffect to fetch events from Firestore
 * - Displays fetched events in a grid
 * - Shows Firebase document IDs
 * 
 * WRITE OPERATION - Add Event:
 * - Form to input new historical event
 * - Calls addNewEvent() on form submission
 * - Updates local state after successful write
 * - Confirms success with alert
 * 
 * WRITE OPERATION - Save Test Score:
 * - Button to save user's test score
 * - Calls saveUserScore() with user data
 * - Requires user to be authenticated
 * - Reloads user progress after save
 * 
 * READ OPERATION - User Progress:
 * - Fetches user's progress from Firestore
 * - Displays all quiz attempts
 * - Shows score, percentage, and timestamp
 * - Protected for authenticated users only
 */

/* ============================================
 * COMPLETE FEATURE FLOW: USER AUTHENTICATION 
 * ============================================ */

/**
 * REGISTRATION FLOW:
 * 
 * 1. User navigates to /register
 * 2. RegisterForm component renders
 * 3. User enters email and password
 * 4. On submit, RegisterForm calls createUserWithEmailAndPassword()
 * 5. Firebase creates new user account
 * 6. onAuthStateChanged() listener triggers
 * 7. AuthContext updates user state
 * 8. AuthPage redirects to / (home)
 * 9. Navigation shows user's email and logout button
 */

/**
 * LOGIN FLOW:
 * 
 * 1. User navigates to /login
 * 2. LoginForm component renders
 * 3. User enters email and password
 * 4. On submit, LoginForm calls signInWithEmailAndPassword()
 * 5. Firebase authenticates user
 * 6. onAuthStateChanged() listener triggers
 * 7. AuthContext updates user state
 * 8. AuthPage redirects to / (home)
 * 9. "Testing" link becomes visible in navigation
 */

/**
 * ACCESS PROTECTED PAGE FLOW:
 * 
 * AUTHENTICATED USER:
 * 1. User clicks on "Testing" link
 * 2. Browser navigates to /testing
 * 3. ProtectedRoute component checks authentication
 * 4. user.isAuthenticated is true
 * 5. ProtectedRoute renders <Testing /> component
 * 6. FirestoreDemo component displays
 * 7. User can read events and save scores
 * 
 * UNAUTHENTICATED USER:
 * 1. User tries to navigate to /testing
 * 2. ProtectedRoute component checks authentication
 * 3. user.isAuthenticated is false
 * 4. ProtectedRoute redirects to /login
 * 5. User is forced to login/register first
 */

/**
 * FIRESTORE OPERATIONS FLOW:
 * 
 * READ HISTORICAL EVENTS:
 * 1. FirestoreDemo component mounts
 * 2. useEffect calls fetchEvents()
 * 3. fetchEvents() queries 'events' collection
 * 4. Firestore returns all documents
 * 5. Component displays events in grid
 * 6. Each event shows: title, date, description, Firebase ID
 * 
 * WRITE NEW EVENT:
 * 1. Admin fills event form
 * 2. On submit, calls addNewEvent()
 * 3. addNewEvent() writes to 'events' collection
 * 4. Firebase adds serverTimestamp()
 * 5. Returns document ID
 * 6. Component updates local state
 * 7. New event appears in the list
 * 
 * SAVE USER TEST SCORE:
 * 1. Authenticated user clicks "Save Score" button
 * 2. onClick handler calls saveUserScore()
 * 3. saveUserScore() writes to 'userProgress' collection
 * 4. Saves: userId, score, userName, serverTimestamp()
 * 5. Returns document ID
 * 6. Component reloads user progress
 * 7. New score appears in "User Progress" section
 */

/* ============================================
 * FIREBASE SDK FUNCTIONS USED
 * ============================================ */

/**
 * Authentication Functions:
 * - initializeApp(config) - Initialize Firebase
 * - getAuth(app) - Get auth service
 * - createUserWithEmailAndPassword(auth, email, password)
 * - signInWithEmailAndPassword(auth, email, password)
 * - signOut(auth)
 * - onAuthStateChanged(auth, callback)
 */

/**
 * Firestore Functions:
 * - getFirestore(app) - Get Firestore database
 * - collection(db, name) - Reference to collection
 * - getDocs(query) - Get all documents
 * - addDoc(collection, data) - Add new document
 * - doc(db, collection, id) - Reference to specific document
 * - updateDoc(docRef, updates) - Update document fields
 * - query() - Build query
 * - where(field, operator, value) - Filter documents
 * - serverTimestamp() - Server-generated timestamp
 */

/* ============================================
 * BEST PRACTICES DEMONSTRATED
 * ============================================ */

/**
 * 1. Error Handling
 * - Try-catch blocks for async operations
 * - Firebase error code checking
 * - User-friendly error messages
 * 
 * 2. Security
 * - Password validation and confirmation
 * - Protected routes for sensitive pages
 * - Authentication state verification
 * 
 * 3. User Experience
 * - Loading states during auth check
 * - Auto-redirect after authentication
 * - Clear navigation showing auth status
 * - Disabled form fields during submission
 * 
 * 4. Code Organization
 * - Separate service file for Firestore operations
 * - Context for global auth state
 * - Reusable form components
 * - Protected route wrapper component
 * 
 * 5. Database Design
 * - Collections for different data types
 * - Timestamps for tracking
 * - User ID for associating data with users
 * - Indexes for efficient queries
 */

/* ============================================
 * TESTING THE IMPLEMENTATION
 * ============================================ */

/**
 * TEST 1: User Registration
 * 1. Go to /register
 * 2. Enter new email and password
 * 3. Confirm password
 * 4. Click "Зареєструватися"
 * 5. Should redirect to / 
 * 6. Email should appear in navigation
 * 
 * TEST 2: User Login
 * 1. Sign out (if logged in)
 * 2. Go to /login
 * 3. Enter registered email and password
 * 4. Click "Увійти"
 * 5. Should redirect to /
 * 6. Email should appear in navigation
 * 
 * TEST 3: Protected Route
 * 1. Sign out
 * 2. Try to navigate to /testing
 * 3. Should redirect to /login
 * 4. Login with valid credentials
 * 5. Navigate to /testing
 * 6. Should display FirestoreDemo component
 * 
 * TEST 4: Firestore Read
 * 1. Go to /testing (while logged in)
 * 2. Should see "Історичні События" section
 * 3. Should display events from database
 * 4. Check that document IDs are visible
 * 
 * TEST 5: Firestore Write
 * 1. Go to /testing
 * 2. Click "Додати нову подію"
 * 3. Fill in event form
 * 4. Click "Зберегти подію до Firestore"
 * 5. Check Firestore console - new document should exist
 * 6. New event should appear in list
 * 
 * TEST 6: Save User Score
 * 1. Go to /testing
 * 2. Click "Зберегти результат тесту"
 * 3. Should show success alert
 * 4. Check "Мій прогрес" section
 * 5. New score should appear
 * 
 * TEST 7: Logout
 * 1. Click "Вихід" button
 * 2. Should redirect to /
 * 3. Email should disappear from navigation
 * 4. "Вхід" and "Реєстрація" buttons should appear
 */
