# Lab 4 - Quick Start Guide
## Firebase Authentication & Firestore Implementation

---

## 📋 Checklist Before Submission

- [ ] Firebase SDK dependency installed (`npm install firebase`)
- [ ] All components created in `src/`
- [ ] AuthContext properly initialized in App.js
- [ ] ProtectedRoute working (causes redirect to login)
- [ ] Navigation shows login/logout buttons
- [ ] FirestoreDemo component loads and displays data
- [ ] All files have proper comments and documentation

---

## 🚀 Installation & Setup

### 1. Install Firebase SDK
```bash
cd lab4
npm install firebase
```

### 2. Verify File Structure
Ensure these files exist:

**Authentication:**
```
✓ src/firebase.js
✓ src/context/AuthContext.js
✓ src/components/LoginForm.js
✓ src/components/RegisterForm.js
✓ src/pages/AuthPage.js
✓ src/components/ProtectedRoute.js
```

**Database:**
```
✓ src/services/firestoreService.js
✓ src/components/FirestoreDemo.js
✓ src/pages/Testing.js
```

**Updated:**
```
✓ src/App.js (with AuthProvider & routing)
✓ src/components/Navigation.js (with auth buttons)
```

### 3. Run Application
```bash
npm start
```

---

## 🧪 Testing Checklist

### Test 1: Registration
- [ ] Navigate to `http://localhost:3000/register`
- [ ] Enter new email address
- [ ] Enter password (min 6 characters)
- [ ] Confirm password
- [ ] Click "Зареєструватися"
- [ ] Should redirect to home page
- [ ] Email should show in navigation bar
- [ ] "Тестування" link should be visible

### Test 2: Login
- [ ] Click "Вихід" button
- [ ] Navigate to `http://localhost:3000/login`
- [ ] Enter same email and password
- [ ] Click "Увійти"
- [ ] Should redirect to home
- [ ] Email should show in navigation
- [ ] "Тестування" link should be visible

### Test 3: Protected Route Access
- [ ] Click "Вихід" button
- [ ] Try to navigate to `/testing`
- [ ] Should redirect to `/login`
- [ ] Confirm you cannot access testing page when logged out

### Test 4: Firestore Read Operation
- [ ] Login with your credentials
- [ ] Click "🔒 Тестування" in navigation
- [ ] Should see "Історичні События" section
- [ ] Should see events displayed in grid
- [ ] Each event should show ID, title, date, description

### Test 5: Firestore Write Operation - Add Event
- [ ] On Testing page, click "Додати нову подію"
- [ ] Fill in event form:
  - Title: "Test Event"
  - Date: "2023 - 2024"
  - Period: "Нові часи"
  - Description: "Test description"
- [ ] Click "Зберегти подію до Firestore"
- [ ] Should show success message
- [ ] New event should appear at top of list
- [ ] Check Firestore console to verify document was created

### Test 6: Firestore Write Operation - Save Score
- [ ] On Testing page, click "Зберегти результат тесту"
- [ ] Should show success alert
- [ ] Look at "Мій прогрес" section
- [ ] Should see new score: 2/2 (100%)
- [ ] Should show timestamp

### Test 7: Firestore Read Operation - User Progress
- [ ] After saving score, check "Мій прогрес" section
- [ ] Should show quiz attempt with:
  - Score: 2/2
  - Percentage: 100%
  - Timestamp of when saved
  - Document ID from Firestore

### Test 8: Logout & Login Again
- [ ] Click "Вихід" button
- [ ] Login again with same credentials
- [ ] Navigate to Testing page
- [ ] Previous scores should still be visible
- [ ] Confirms data persistence in Firestore

---

## 🔑 Key Files for Lab Report

### Firebase Configuration
**File:** `src/firebase.js` (12 lines)
- Shows Firebase initialization
- Exports auth and db for use in app

### Authentication Context
**File:** `src/context/AuthContext.js` (60 lines)
- Global state management with onAuthStateChanged
- useAuth hook pattern
- signOut functionality

### Protected Route
**File:** `src/components/ProtectedRoute.js` (35 lines)
- Shows authentication check
- Conditional rendering
- Redirect logic to login

### Firestore Service
**File:** `src/services/firestoreService.js` (150 lines)
- Demonstrates read operations (fetch)
- Demonstrates write operations (save, add)
- Error handling examples
- Firebase SDK function usage

### Firestore Demo Component
**File:** `src/components/FirestoreDemo.js` (250 lines)
- Shows complete READ and WRITE operations
- Form handling for new data
- Data display from Firestore
- User authentication check

---

## 📝 Code Snippets for Lab Report

### Firebase Initialization
```javascript
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
```

### Authentication State Listener
```javascript
useEffect(() => {
  const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
    setUser(currentUser);
    setLoading(false);
  });
  return () => unsubscribe();
}, []);
```

### Protected Route
```javascript
const ProtectedRoute = ({ element }) => {
  const { user, loading } = useAuth();
  if (loading) return <div>Loading...</div>;
  if (user) return element;
  return <Navigate to="/login" replace />;
};
```

### Firestore Read
```javascript
export const fetchEvents = async () => {
  const eventsCollection = collection(db, 'events');
  const querySnapshot = await getDocs(eventsCollection);
  return querySnapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  }));
};
```

### Firestore Write
```javascript
export const saveUserScore = async (userId, score, total, userName) => {
  const docRef = await addDoc(collection(db, 'userProgress'), {
    userId,
    score,
    total,
    userName,
    percentage: (score / total) * 100,
    timestamp: serverTimestamp()
  });
  return docRef.id;
};
```

---

## 🐛 Troubleshooting

### Issue: "Cannot find module 'firebase'"
**Solution:** Install Firebase package
```bash
npm install firebase
```

### Issue: "useAuth must be used within AuthProvider"
**Solution:** Check that App.js wraps Router with `<AuthProvider>`
```javascript
<AuthProvider>
  <Router>
    {/* routes here */}
  </Router>
</AuthProvider>
```

### Issue: Protected route not working
**Solution:** Check ProtectedRoute component imports useAuth and checks `user`
```javascript
const { user, loading } = useAuth();
if (user) return element;
return <Navigate to="/login" replace />;
```

### Issue: Firestore operations not working
**Solution:** Verify Firebase credentials in firebase.js are correct, and Firestore database is enabled in Firebase Console

### Issue: Form not submitting
**Solution:** Check that form has `onSubmit` handler and button has `type="submit"`

---

## 📚 Documentation Files

All files are included with comprehensive comments:

1. **firebase.js** - Setup template with comments
2. **AuthContext.js** - State management with documentation
3. **LoginForm.js** - Login form with validation
4. **RegisterForm.js** - Registration form with validation
5. **ProtectedRoute.js** - Route protection logic
6. **firestoreService.js** - All CRUD operations documented
7. **FirestoreDemo.js** - Complete working examples
8. **LAB4_IMPLEMENTATION.js** - Detailed lab documentation
9. **LAB4_README.md** - Full project README

---

## ✅ Lab Requirements Completed

### 1. Firebase Authentication ✅
- [x] Reusable components (LoginForm, RegisterForm)
- [x] Signup with createUserWithEmailAndPassword()
- [x] Login with signInWithEmailAndPassword()
- [x] Logout with signOut()
- [x] Authentication state listener with onAuthStateChanged()

### 2. Access Control / Protected Routes ✅
- [x] Protected route for Testing page
- [x] Only authenticated users can access
- [x] Redirect unauthenticated users to login

### 3. Database (Firestore) ✅
- [x] firebase.js configuration
- [x] Read operations (fetchEvents, fetchUserProgress)
- [x] Write operations (saveUserScore, addNewEvent)
- [x] Proper collection structure
- [x] Error handling

---

## 🎓 Ready for Lab Report!

Your implementation demonstrates:
- ✅ Modern React practices (hooks, context)
- ✅ Firebase SDK best practices
- ✅ Proper error handling
- ✅ User authentication flow
- ✅ Database operations
- ✅ Protected routing
- ✅ Clean, documented code

---

## 📞 Support

If you encounter issues:
1. Check console for error messages
2. Verify Firebase console shows collections and data
3. Check that all imports are correct
4. Verify package.json has firebase as dependency
5. Review LAB4_IMPLEMENTATION.js for detailed guidance
