# Ocean Explorer - Data Persistence Troubleshooting Guide

## 🎯 Overview

This guide helps ensure all form data is properly saved before opening the Ocean Explorer game.

## ✅ What's Been Fixed

### Frontend Improvements

1. **Dual Storage Mechanism**
   - Primary: `sessionStorage` (cleared on browser tab close)
   - Backup: `localStorage` (persists across sessions)
   - Automatic fallback if sessionStorage is empty

2. **Enhanced Validation**
   - All required fields validated before navigation
   - Clear error messages for failed saves
   - Confirmation that both storage systems have "student_id"

3. **Better Error Handling**
   - Improved error messages for network issues
   - Timeout protection (10 seconds for onboarding, 15 for scores)
   - Retry buttons if save fails

4. **Loading States**
   - Loading spinner during initialization
   - Clear feedback during data persistence
   - Prevents navigation until data is confirmed saved

### Backend Improvements

1. **Enhanced Logging**
   - Logs all incoming requests with data
   - Logs validation errors with details
   - Logs database operations for debugging

2. **Validation**
   - Requires student_id from onboarding response
   - Validates all required fields before database operations
   - Proper error responses if data is invalid

3. **Data Backup**
   - Fallback score save if onboarding session record doesn't exist
   - Creates student record if not found
   - Maintains data integrity with transactions

## 🔍 Testing Checklist

### Browser Console Debugging

Open DevTools → Console and look for these logs:

#### During Onboarding:

```
✅ Player data saved successfully
🔍 Ocean Explorer Storage Debug Info:
   - Session Storage Exists: true
   - Local Storage Exists: true
   - Player Data: {...complete object...}
   - Validation Result: {valid: true, errors: []}
```

#### During Game Play:

```
Player data loaded: {...}
Score saved successfully
```

### Manual Testing Steps

1. **Complete Onboarding Form**
   - Fill in all fields correctly
   - Click "🌊 Dive In!" button
   - Should see "Saving..." state briefly
   - Should navigate to game page automatically

2. **Verify Data in Storage**
   - Open DevTools → Application → Storage
   - Check `sessionStorage` for key `ocean_explorer_player`
   - Check `localStorage` for key `ocean_explorer_player_backup`
   - Both should contain complete player object

3. **Complete Game Round**
   - Play through all 10 rounds
   - Game should show "Saving your session..." message
   - After save, should show "Play Again" button
   - Data should be cleared from storage after successful save

### Expected Data Structure

The stored player data should look like:

```javascript
{
  name: "John Doe",
  age: 7,
  gender: "Male",
  buddy: "fish",
  school_name: "Green School",
  school_location: "Mumbai",
  contact_person: "Ms. Smith",
  student_id: "uuid-here",
  onboarding_session_id: 123,
  timestamp: "2024-04-08T10:30:00.000Z"
}
```

## 🚨 Common Issues & Solutions

### Issue: Form shows "Save failed: Invalid response from server"

**Causes:**

- Backend API not running
- Incorrect API URL in `.env.local`
- Malformed JSON response

**Solutions:**

1. Check backend is running: `npm run dev` in `/backend` folder
2. Verify `NEXT_PUBLIC_API_URL` in `.env.local`:
   ```
   NEXT_PUBLIC_API_URL=http://localhost:5000/api
   ```
3. Check backend logs for errors

### Issue: Data doesn't appear in storage

**Causes:**

- Storage quota exceeded
- Cookies/storage disabled in browser
- Browser privacy mode

**Solutions:**

1. Disable browser extensions that block storage
2. Check if running in incognito/private mode
3. Clear browser cache and try again
4. Check DevTools for storage errors

### Issue: Game redirects to onboarding after opening

**Causes:**

- sessionStorage cleared between page navigation
- Tab closed and reopened (sessionStorage is lost)
- localStorage backup also missing

**Solutions:**

1. Use URL check: Copy URL from address bar
2. Complete form again - localStorage backup should restore data
3. Check browser developer tools for storage errors
4. Clear all site data and start fresh

### Issue: Score not saving after game completion

**Causes:**

- Backend /scores endpoint failing
- Network timeout
- Database connection issue

**Solutions:**

1. Check backend logs: `npm run logs` in `/backend`
2. Increase timeout if network is slow
3. Click "Retry Save" button
4. Check database connection string in `.env`

## 🛠️ Advanced Debugging

### Enable Debug Logging

Open browser DevTools Console and run:

```javascript
// Log all current storage
console.log(
  "Session Storage:",
  sessionStorage.getItem("ocean_explorer_player"),
);
console.log(
  "Local Storage:",
  localStorage.getItem("ocean_explorer_player_backup"),
);

// Check storage size
console.log(
  "Session Size:",
  sessionStorage.getItem("ocean_explorer_player")?.length || 0,
  "bytes",
);
console.log(
  "Local Size:",
  localStorage.getItem("ocean_explorer_player_backup")?.length || 0,
  "bytes",
);

// Validate structure
const data = JSON.parse(
  sessionStorage.getItem("ocean_explorer_player") || "{}",
);
console.log("Student ID:", data.student_id);
console.log("Name:", data.name);
console.log(
  "Required fields present:",
  data.name && data.age && data.buddy && data.student_id,
);
```

### Backend Database Check

Connect to your PostgreSQL database and run:

```sql
-- Check if student was created
SELECT * FROM student WHERE name = 'John Doe' ORDER BY created_at DESC LIMIT 1;

-- Check if onboarding session was created
SELECT * FROM ocean_explorer_sessions WHERE player_name = 'John Doe' ORDER BY completed_at DESC LIMIT 1;

-- Check screening test result
SELECT s.*, st.* FROM student s
LEFT JOIN screening_test st ON s.student_id = st.student_id
WHERE s.name = 'John Doe' ORDER BY st.test_date DESC LIMIT 1;
```

### Network Request Inspection

Open DevTools → Network Tab and:

1. Complete onboarding form
2. Look for: `POST /ocean-explorer/onboarding`
   - Check Response status (should be 201)
   - Check Response body includes `student_id`
3. Complete game
4. Look for: `POST /ocean-explorer/scores`
   - Check Response status (should be 201)
   - Check Response body includes successful message

## 📋 Data Flow Diagram

```
┌─────────────────┐
│  User fills     │
│  onboarding     │
│  form           │
└────────┬────────┘
         │
         ▼
┌─────────────────────────────────┐
│  POST /onboarding endpoint      │
│  Creates: School, Student,      │
│  Onboarding Session             │
└────────┬────────────────────────┘
         │
         ▼
┌─────────────────────────────────┐
│  Response with:                 │
│  - student_id                   │
│  - onboarding_session_id        │
│  - school_id                    │
└────────┬────────────────────────┘
         │
         ▼
┌─────────────────────────────────┐
│  Save to Storage:               │
│  - sessionStorage (primary)     │
│  - localStorage (backup)        │
└────────┬────────────────────────┘
         │
         ▼
┌─────────────────┐
│  Navigate to    │
│  game page      │
└────────┬────────┘
         │
         ▼
┌─────────────────────────────────┐
│  Load from storage              │
│  (session first, then local)    │
└────────┬────────────────────────┘
         │
         ▼
┌─────────────────────────────────┐
│  Player plays game (10 rounds)  │
└────────┬────────────────────────┘
         │
         ▼
┌─────────────────────────────────┐
│  POST /scores endpoint          │
│  Creates: Screening Test        │
│  Updates: Ocean Explorer Session│
└────────┬────────────────────────┘
         │
         ▼
┌─────────────────────────────────┐
│  Clear storage on success       │
│  Show completion screen         │
└─────────────────────────────────┘
```

## 📞 Support

If data is still not persisting:

1. Check browser console for errors (F12 → Console tab)
2. Check backend logs for database errors
3. Verify database connection is working
4. Try in a different browser
5. Check CORS headers if backend is on different domain

Remember: All console logs will help identify the exact point of failure!
