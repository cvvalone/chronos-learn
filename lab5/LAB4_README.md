# Lab 4: Firebase Authentication & Firestore Implementation
## Variant 15: Platform for Learning History Through Interactive Events

### Project Overview
This is a complete Firebase implementation for a History Education Platform that includes user authentication, protected routes, and Firestore database integration.

---

## ✅ Lab Requirements (All Implemented)

### 1. Firebase Authentication ✓

#### Files:
- **`src/firebase.js`** - Firebase configuration and initialization
- **`src/components/LoginForm.js`** - User login component
- **`src/components/RegisterForm.js`** - User registration component
- **`src/context/AuthContext.js`** - Global authentication state management
- **`src/pages/AuthPage.js`** - Auth page with toggle between login/register

#### Features Implemented:
✅ User registration with `createUserWithEmailAndPassword()`
✅ User login with `signInWithEmailAndPassword()`
✅ User logout with `signOut()`
✅ Authentication state listener with `onAuthStateChanged()`
✅ Email and password validation
✅ Error handling with Firebase error codes
✅ useAuth() custom hook for accessing auth state

---

### 2. Access Control / Protected Routes ✓

#### Files:
- **`src/components/ProtectedRoute.js`** - Route protection wrapper
- **`src/App.js`** - Routing configuration with protected routes
- **`src/pages/Testing.js`** - Protected Testing page

#### Implementation:
✅ **Testing page** is ONLY accessible to authenticated users
✅ Unauthenticated users are automatically redirected to `/login`
✅ ProtectedRoute component checks authentication before rendering
✅ Loading state while checking authentication
✅ Seamless redirection after login

#### Route Structure:
```
Public Routes:
- /                    → Home page
- /profile             → User profile
- /login               → Login form
- /register            → Registration form

Protected Routes:
- /testing   (REQUIRES AUTH) → Testing/Quiz page
```

---

### 3. Database (Firebase Firestore) ✓

#### Configuration File:
- **`src/firebase.js`** - Initializes Firestore database

#### Service File:
- **`src/services/firestoreService.js`** - All Firestore operations

#### Collections Structure:

**Collection: `events`**
```javascript
{
  id: string,
  title: string,
  date: string,
  period: string,
  shortDesc: string,
  fullDesc: string,
  img: string,
  createdAt: timestamp,
  updatedAt: timestamp
}
```

**Collection: `quizQuestions`**
```javascript
{
  id: string,
  question: string,
  options: array,
  correctAnswer: string,
  difficulty: string,
  createdAt: timestamp
}
```

**Collection: `userProgress`**
```javascript
{
  id: string,
  userId: string,
  score: number,
  total: number,
  userName: string,
  percentage: number,
  timestamp: timestamp,
  createdAt: timestamp
}
```

#### Read Operations: ✓

**Function: `fetchEvents()`**
```javascript
const events = await fetchEvents();
// Returns: Array of all historical events from Firestore
// Uses: collection(), getDocs()
```

**Function: `fetchQuizQuestions()`**
```javascript
const questions = await fetchQuizQuestions();
// Returns: Array of all quiz questions from Firestore
// Uses: collection(), getDocs()
```

**Function: `fetchUserProgress(userId)`**
```javascript
const progress = await fetchUserProgress(userId);
// Returns: Array of user's quiz attempts from Firestore
// Uses: collection(), query(), where()
```

#### Write Operations: ✓

**Function: `saveUserScore(userId, score, total, userName)`**
```javascript
const docId = await saveUserScore(userId, 2, 2, userName);
// Writes: New document to 'userProgress' collection
// Returns: Document ID
// Uses: collection(), addDoc(), serverTimestamp()
// Lab Requirement: Saves user test scores to database
```

**Function: `addNewEvent(eventData)`**
```javascript
const docId = await addNewEvent({
  title: "Нова подія",
  date: "2020-2026",
  shortDesc: "Опис"
});
// Writes: New historical event to 'events' collection
// Returns: Document ID
// Uses: collection(), addDoc()
// Lab Requirement: Writes data to Firestore database
```

**Function: `updateEvent(eventId, updates)`**
```javascript
await updateEvent(eventId, { title: "Updated Title" });
// Updates: Existing event in 'events' collection
// Uses: doc(), updateDoc(), serverTimestamp()
```

---

### 4. Firestore Demo Component ✓

#### File:
- **`src/components/FirestoreDemo.js`** - Complete demonstration component

#### Demonstrates All Firestore Operations:

1. **READ EXAMPLE**
   - Fetches events from Firestore on component mount
   - Displays events in a responsive grid
   - Shows Firestore document IDs

2. **WRITE EXAMPLE - Add Event**
   - Form to input new historical event
   - Button to submit and save to Firestore
   - Updates local state after successful write
   - Shows success/error messages

3. **WRITE EXAMPLE - Save Test Score**
   - Button to save user's test score
   - Requires user authentication
   - Saves user data to Firestore
   - Reloads progress after save

4. **READ EXAMPLE - User Progress**
   - Fetches user's quiz attempts from Firestore
   - Displays all scores with timestamps
   - Shows calculation of percentages
   - Protected for authenticated users only

---

## 📁 File Structure

```
lab4/
├── src/
│   ├── firebase.js                  ← Firebase configuration
│   ├── components/
│   │   ├── LoginForm.js             ← Login form component
│   │   ├── LoginForm.css
│   │   ├── RegisterForm.js          ← Registration form component
│   │   ├── RegisterForm.css
│   │   ├── ProtectedRoute.js        ← Route protection wrapper
│   │   ├── FirestoreDemo.js         ← Firestore demo component
│   │   ├── FirestoreDemo.css
│   │   ├── Navigation.js            ← Updated with auth
│   │   └── Navigation.css           ← Updated with auth styles
│   ├── context/
│   │   └── AuthContext.js           ← Global auth state
│   ├── services/
│   │   └── firestoreService.js      ← Firestore operations
│   ├── pages/
│   │   ├── AuthPage.js              ← Auth toggle page
│   │   ├── Testing.js               ← Protected testing page
│   │   └── ... (other existing pages)
│   ├── App.js                       ← Updated with routing & auth
│   └── ... (other existing files)
├── LAB4_IMPLEMENTATION.js            ← Detailed documentation
└── README.md
```

---

## 🔐 Authentication Flow

### User Registration
```
1. User → /register
2. RegisterForm component
3. Input: email, password, confirm password
4. Firebase: createUserWithEmailAndPassword()
5. Success → Auth context updates
6. Redirect → Home page
7. Navigation shows: user email + logout button
```

### User Login
```
1. User → /login
2. LoginForm component
3. Input: email, password
4. Firebase: signInWithEmailAndPassword()
5. Success → Auth context updates
6. Redirect → Home page
7. Navigation shows: user email + logout button
```

### Access Protected Page
```
AUTHENTICATED:
1. User clicks "Testing" link
2. Navigate to /testing
3. ProtectedRoute checks: user exists?
4. YES → Render Testing page ✓

NOT AUTHENTICATED:
1. User tries /testing
2. ProtectedRoute checks: user exists?
3. NO → Redirect to /login
```

---

## 🗄️ Firestore Database Flow

### Reading Historical Events
```
1. Component mounts
2. useEffect calls: fetchEvents()
3. Firestore query: collection('events').getDocs()
4. Returns array of event documents
5. Component displays events in grid
6. Each shows: title, date, description, Firebase ID
```

### Writing New Event
```
1. Admin fills event form
2. Submit → calls addNewEvent()
3. Firestore: collection('events').addDoc(newEvent)
4. Adds serverTimestamp() automatically
5. Returns document ID
6. Local state updates
7. New event appears in list
```

### Saving User Score
```
1. User takes quiz
2. Clicks "Save Score" button
3. calls saveUserScore(userId, score, 2, userName)
4. Firestore: collection('userProgress').addDoc(scoreData)
5. Saves: userId, score, userName, timestamp
6. Returns document ID
7. Component reloads user progress
8. New score appears in results
```

---

## 🛡️ Security Features

1. **Protected Routes**
   - Testing page only for authenticated users
   - Automatic redirect for unauthenticated users

2. **Password Validation**
   - Minimum 6 characters required
   - Password confirmation matching
   - Server-side Firebase validation

3. **Error Handling**
   - Firebase error code checking
   - User-friendly error messages
   - Specific messages for each error type

4. **User Data**
   - User ID associated with progress
   - Server timestamps for audit trail
   - Firestore security rules (to be configured)

---

## 💻 Usage Instructions

### Running the Application
```bash
cd lab4
npm install
npm start
```

### Testing Features

**Test Registration:**
1. Go to `/register`
2. Enter email and password (min 6 chars)
3. Confirm password
4. Click "Зареєструватися"

**Test Login:**
1. Go to `/login`
2. Enter registered email and password
3. Click "Увійти"

**Test Protected Route:**
1. Logout first
2. Try to access `/testing`
3. Should redirect to `/login`

**Test Firestore:**
1. Login first
2. Go to `/testing`
3. See events fetched from Firestore
4. Add new event (write operation)
5. Save test score (write operation)

---

## 🔥 Firebase Configuration

The app is configured with Firebase project credentials:
```javascript
apiKey: "AIzaSyAVMyjWiSYiYRMXjsr72oIeEWPe9Sygg48"
authDomain: "new-web-project-f8b78.firebaseapp.com"
projectId: "new-web-project-f8b78"
storageBucket: "new-web-project-f8b78.firebasestorage.app"
messagingSenderId: "1034190787164"
appId: "1:1034190787164:web:bd255abbdc851423b04c99"
measurementId: "G-NPLH42PZK8"
```

---

## 📚 Lab Report Tips

Include in your report:

1. **Architecture Overview**
   - Explain AuthContext for state management
   - Show routing diagram
   - Explain ProtectedRoute wrapper

2. **Implementation Details**
   - Code snippets from each file
   - Explain Firebase SDK functions used
   - Show error handling examples

3. **Database Design**
   - Collection structure diagram
   - Example documents from each collection
   - Explain data relationships

4. **Security**
   - Authentication flow diagram
   - Protected route logic
   - Data isolation by user

5. **Testing Evidence**
   - Screenshots of UI with logged in user
   - Screenshots of protected page access
   - Firestore console showing data

---

## 🎯 All Lab Requirements Fulfilled

✅ Firebase Authentication setup
✅ User registration with createUserWithEmailAndPassword()
✅ User login with signInWithEmailAndPassword()
✅ User logout with signOut()
✅ Authentication state listener (onAuthStateChanged)
✅ Protected routes for Testing page
✅ Redirect unauthenticated users to login
✅ Firebase Firestore configuration
✅ Read data from Firestore (fetchEvents, fetchUserProgress)
✅ Write data to Firestore (saveUserScore, addNewEvent)
✅ Firestore demo component with all operations
✅ Clean, documented code suitable for lab report
✅ Modern React practices (hooks, context, etc.)

---

## 📖 References

- [Firebase Authentication Docs](https://firebase.google.com/docs/auth)
- [Firestore Docs](https://firebase.google.com/docs/firestore)
- [React Router v6 Docs](https://reactrouter.com)
- LAB4_IMPLEMENTATION.js - Detailed code documentation
