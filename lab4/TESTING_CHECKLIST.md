# Lab 4 - Testing & Validation Checklist

## 🎯 Pre-Flight Checklist

Before running tests, verify setup:

- [ ] Firebase SDK installed: `npm install firebase` (run if needed)
- [ ] Lab 4 directory structure is correct
- [ ] All 12 new component files exist
- [ ] App.js contains AuthProvider wrapper
- [ ] Navigation.js uses useAuth hook
- [ ] No syntax errors (check VS Code)

---

## ✅ Test Suite 1: Installation & Setup

### Test 1.1: Dependencies Installation
```bash
cd lab4
npm install firebase
```
**Expected Result:** ✅ No errors, firebase package installed

**Verification:**
- [ ] Command completes without errors
- [ ] `node_modules/firebase/` directory created
- [ ] `package.json` updated with firebase dependency

---

## ✅ Test Suite 2: Application Launch

### Test 2.1: Start Development Server
```bash
npm start
```
**Expected Result:** ✅ App starts on localhost:3000

**Verification:**
- [ ] Browser opens to http://localhost:3000
- [ ] No red error overlays in browser
- [ ] Console shows no errors (F12 → Console tab)
- [ ] Navigation bar visible at top
- [ ] Home page content loads

### Test 2.2: Check Initial Navigation
**Expected Result:** ✅ See Login/Register buttons

**Verification:**
- [ ] Top right shows "Вхід" (Login) button
- [ ] Top right shows "Реєстрація" (Register) button
- [ ] "🔒 Тестування" link NOT visible
- [ ] No user email displayed

---

## ✅ Test Suite 3: User Registration

### Test 3.1: Navigate to Register Page
**Steps:**
1. Click "Реєстрація" button in top right
2. Verify URL changes to `/register`

**Expected Result:** ✅ See registration form

**Verification:**
- [ ] URL is `http://localhost:3000/register`
- [ ] Form shows email input field
- [ ] Form shows password input field
- [ ] Form shows password confirm input field
- [ ] Form shows "Зареєструватися" button

### Test 3.2: Register New User
**Steps:**
1. Enter email: `test@example.com`
2. Enter password: `password123`
3. Confirm password: `password123`
4. Click "Зареєструватися"

**Expected Result:** ✅ Successfully registered, redirected to home

**Verification:**
- [ ] Form validation passes (no red error text)
- [ ] Page redirects to home (/)
- [ ] Navigation bar now shows:
  - [ ] User email: `test@example.com`
  - [ ] "Вихід" (Logout) button
  - [ ] "🔒 Тестування" link visible

### Test 3.3: Error Handling - Duplicate Email
**Steps:**
1. Try to register again with same email
2. Enter email: `test@example.com`
3. Enter password: `password123`
4. Click "Зареєструватися"

**Expected Result:** ✅ Error message shown

**Verification:**
- [ ] Error text appears: something like "auth/email-already-in-use"
- [ ] Form stays on page (doesn't redirect)
- [ ] User can try different email

### Test 3.4: Error Handling - Password Too Short
**Steps:**
1. Click "Реєстрація" again
2. Enter password: `abc` (too short)
3. Try to submit

**Expected Result:** ✅ Error message shown

**Verification:**
- [ ] Error text appears about password length
- [ ] Submit button disabled or form shows validation error
- [ ] Form prevents submission

---

## ✅ Test Suite 4: User Login

### Test 4.1: Logout Current User
**Steps:**
1. Click "Вихід" (Logout) button in navigation

**Expected Result:** ✅ Logged out successfully

**Verification:**
- [ ] Navigation shows "Вхід" and "Реєстрація" buttons again
- [ ] User email no longer visible
- [ ] "🔒 Тестування" link disappears

### Test 4.2: Navigate to Login Page
**Steps:**
1. Click "Вхід" button
2. Verify URL changes to `/login`

**Expected Result:** ✅ See login form

**Verification:**
- [ ] URL is `http://localhost:3000/login`
- [ ] Form shows email input
- [ ] Form shows password input
- [ ] Form shows "Увійти" button

### Test 4.3: Login with Valid Credentials
**Steps:**
1. Enter email: `test@example.com`
2. Enter password: `password123`
3. Click "Увійти"

**Expected Result:** ✅ Successfully logged in, redirected to home

**Verification:**
- [ ] Redirects to home (/
- [ ] Navigation shows:
  - [ ] User email: `test@example.com`
  - [ ] "Вихід" button
  - [ ] "🔒 Тестування" link

### Test 4.4: Error Handling - Wrong Password
**Steps:**
1. Go to `/login`
2. Enter email: `test@example.com`
3. Enter wrong password: `wrongpassword`
4. Click "Увійти"

**Expected Result:** ✅ Error message shown

**Verification:**
- [ ] Error appears (like "auth/wrong-password")
- [ ] Form stays on page
- [ ] User can try again

### Test 4.5: Error Handling - User Not Found
**Steps:**
1. Go to `/login`
2. Enter email: `nonexistent@example.com`
3. Enter password: `password123`
4. Click "Увійти"

**Expected Result:** ✅ Error message shown

**Verification:**
- [ ] Error appears
- [ ] Form stays on page

---

## ✅ Test Suite 5: Protected Routes

### Test 5.1: Access Protected Route While Logged In
**Steps:**
1. Ensure you're logged in (see email in nav)
2. Click "🔒 Тестування" link

**Expected Result:** ✅ See Testing page with Firestore demo

**Verification:**
- [ ] URL becomes `/testing`
- [ ] FirestoreDemo component loads
- [ ] See sections:
  - [ ] "Історичні События" section
  - [ ] "Добавити нову подію" section
  - [ ] "Мої результати тесту" section
  - [ ] "Мій прогрес" section

### Test 5.2: Access Protected Route While Logged Out
**Steps:**
1. Logout by clicking "Вихід"
2. Try to navigate to `/testing` directly by typing in URL bar

**Expected Result:** ✅ Redirected to login page

**Verification:**
- [ ] URL redirects to `/login`
- [ ] Login form appears
- [ ] Cannot access testing page without login

### Test 5.3: Session Persistence
**Steps:**
1. Login with your credentials
2. Refresh page (F5)
3. Check navigation

**Expected Result:** ✅ Still logged in after refresh

**Verification:**
- [ ] Page doesn't redirect to login
- [ ] User email still shown
- [ ] Can still access testing page
- [ ] Confirms onAuthStateChanged listener working

---

## ✅ Test Suite 6: Firestore Read Operations

### Test 6.1: Load Events from Firestore
**Steps:**
1. Login and go to `/testing`
2. Wait 2-3 seconds for component to load
3. Look at "Історичні События" section

**Expected Result:** ✅ Events display in grid

**Verification:**
- [ ] Section shows "Завантаження..." initially
- [ ] Events appear in grid format
- [ ] Each event shows:
  - [ ] Event ID (in gray)
  - [ ] Event title
  - [ ] Event date
  - [ ] Event description
  - [ ] 📋 Button

### Test 6.2: Events Grid Display
**Expected Result:** ✅ Responsive grid layout

**Verification:**
- [ ] On desktop: events in 2-3 column grid
- [ ] On mobile: events in 1 column
- [ ] Each event card has hover effect
- [ ] All event text is readable

### Test 6.3: Read User Progress History
**Steps:**
1. Scroll to "Мій прогрес" section
2. Look for quiz scores

**Expected Result:** ✅ User progress displays (if scores exist)

**Verification:**
- [ ] Section shows "Завантаження..." initially
- [ ] If scores exist: shows date, score (2/2), percentage (100%)
- [ ] If no scores: shows empty message or "No data"
- [ ] Timestamps are readable

---

## ✅ Test Suite 7: Firestore Write Operations

### Test 7.1: Add New Event (WRITE Operation)
**Steps:**
1. On Testing page, scroll to "Добавити нову подію" section
2. Fill form:
   - Title: `Test Event 2024`
   - Date: `2024`
   - Period: Select from dropdown (e.g., "Новітні часи")
   - Description: `This is a test event`
3. Click "Зберегти подію до Firestore"

**Expected Result:** ✅ Event saved and added to grid

**Verification:**
- [ ] Button shows loading state while saving
- [ ] Success message appears
- [ ] New event appears at top of grid
- [ ] New event shows:
  - [ ] Document ID
  - [ ] Your entered title
  - [ ] Your entered date
  - [ ] Your entered period
  - [ ] Your entered description

### Test 7.2: Verify Event in Firestore Console
**Steps:**
1. Open Firebase Console (console.firebase.google.com)
2. Select your project
3. Go to Firestore Database
4. Click on "events" collection

**Expected Result:** ✅ New event visible in Firestore

**Verification:**
- [ ] Console shows new document
- [ ] Document contains your entered data
- [ ] Confirms WRITE operation worked end-to-end

### Test 7.3: Save Test Score (WRITE Operation)
**Steps:**
1. On Testing page, find "Зберегти результат тесту до Firestore" section
2. Click "Зберегти результат тесту"

**Expected Result:** ✅ Score saved to Firestore

**Verification:**
- [ ] Success alert appears
- [ ] Score (2/2, 100%) appears in UI
- [ ] Timestamp shown

### Test 7.4: Verify Score Saved
**Steps:**
1. Check "Мій прогрес" section
2. Look for newly saved score

**Expected Result:** ✅ Score appears in user progress

**Verification:**
- [ ] New score visible in "Мій прогрес" section
- [ ] Shows score (2/2)
- [ ] Shows percentage (100%)
- [ ] Shows timestamp

### Test 7.5: Verify Score in Firestore Console
**Steps:**
1. Open Firebase Console
2. Go to "userProgress" collection

**Expected Result:** ✅ Document created with your score

**Verification:**
- [ ] New document in userProgress collection
- [ ] Contains userId, score (2), total (2), percentage (100)
- [ ] Has timestamp

---

## ✅ Test Suite 8: Form Validation

### Test 8.1: Add Event Form - Empty Fields
**Steps:**
1. Click "Зберегти подію до Firestore" without filling form

**Expected Result:** ✅ Validation error or form doesn't submit

**Verification:**
- [ ] Form shows error message
- [ ] Required fields highlighted
- [ ] Event not created

### Test 8.2: Add Event Form - Empty Title
**Steps:**
1. Leave title empty
2. Fill other fields
3. Try to submit

**Expected Result:** ✅ Validation prevents submission

**Verification:**
- [ ] Title field shows error
- [ ] Button may be disabled
- [ ] No event created

---

## ✅ Test Suite 9: Error Handling

### Test 9.1: Firebase Connection Error
**Steps:**
1. Turn off internet briefly
2. Try to add event or save score
3. Turn internet back on

**Expected Result:** ✅ Error message shown

**Verification:**
- [ ] Error message displays
- [ ] No app crash
- [ ] Can retry after internet restored

### Test 9.2: Invalid Firebase Credentials
**Steps:**
1. If credentials are wrong, registration/login fails

**Expected Result:** ✅ Clear error message

**Verification:**
- [ ] Error explains what went wrong
- [ ] User can correct and retry

---

## ✅ Test Suite 10: Full User Flow

### Complete User Journey Test
**Steps:**
1. **Register:**
   - Navigate to `/register`
   - Create account: `fulltest@example.com` / `testpass123`
   - Verify redirected to home

2. **Access Protected Content:**
   - Click "🔒 Тестування"
   - Verify page loads with Firestore demo

3. **Read Data:**
   - Verify events load from Firestore
   - Check existing user progress

4. **Write Data - Add Event:**
   - Fill event form
   - Submit and verify in grid
   - Check Firestore console

5. **Write Data - Save Score:**
   - Click save score button
   - Verify in progress section
   - Check Firestore console

6. **Logout:**
   - Click "Вихід"
   - Verify redirected and buttons change

7. **Login Again:**
   - Go to `/login`
   - Enter same credentials
   - Verify access to `/testing`
   - Verify data persists (previous scores visible)

**Expected Result:** ✅ Complete flow works seamlessly

---

## 📊 Test Results Summary

| Test Suite | Tests | Status | Notes |
|-----------|-------|--------|-------|
| 1. Installation | 1 | ⬜ | Run first |
| 2. Launch | 2 | ⬜ | Check for errors |
| 3. Registration | 4 | ⬜ | Test happy + error paths |
| 4. Login | 5 | ⬜ | Test happy + error paths |
| 5. Protected Routes | 3 | ⬜ | Auth check critical |
| 6. Firestore Read | 3 | ⬜ | Verify data loads |
| 7. Firestore Write | 5 | ⬜ | Most complex - verify DB |
| 8. Form Validation | 2 | ⬜ | User experience |
| 9. Error Handling | 2 | ⬜ | Edge cases |
| 10. Full Journey | 1 | ⬜ | Integration test |

**Total Tests:** 28  
**Expected Pass Rate:** 100%

---

## 🐛 Troubleshooting Quick Reference

| Problem | Solution |
|---------|----------|
| "Cannot find module firebase" | Run `npm install firebase` |
| "useAuth must be used within AuthProvider" | Check App.js wraps Router with AuthProvider |
| Login redirects to `/login` when trying to access `/testing` | Auth listener may not have fired yet - wait 2-3 sec |
| Events don't show in grid | Check Firestore database is created and has data |
| Write operations fail silently | Check browser console (F12) for errors |
| Buttons don't show in navigation | Check Navigation.css has auth button styles |
| Form won't submit | Check browser console for validation errors |
| Page completely blank | Check for React/JSX syntax errors in console |

---

## 📝 Notes for Lab Submission

When writing your lab report:

1. **Include Test Evidence:**
   - Screenshots of registration flow
   - Screenshots of login screen
   - Screenshots of protected page (Testing)
   - Screenshots of Firestore read (events grid)
   - Screenshots of Firestore write (new event added)
   - Screenshots of user progress data

2. **Code to Highlight:**
   - firebase.js configuration
   - AuthContext with onAuthStateChanged
   - ProtectedRoute component logic
   - firestoreService read/write functions
   - FirestoreDemo component showing all operations

3. **Explain:**
   - How authentication protects routes
   - How Firestore persists user data
   - How onAuthStateChanged maintains session
   - How serverTimestamp() works
   - How read vs write operations differ

---

**Test Progress Tracker:**
- [ ] All 28 tests passed
- [ ] Firebase installed and running
- [ ] No console errors
- [ ] Firestore database populated
- [ ] Lab report ready for submission

**Ready for Submission:** ✅ After all tests pass and evidence collected

