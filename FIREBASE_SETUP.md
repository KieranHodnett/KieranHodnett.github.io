# 🔥 Firebase Setup Guide for Magdalena Food Tracker

## Step 1: Create Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click "Create a project" or "Add project"
3. Name it `magdalena-food-tracker`
4. Enable Google Analytics (optional)
5. Click "Create project"

## Step 2: Enable Firestore Database

1. In your Firebase project, click "Firestore Database" in the left sidebar
2. Click "Create database"
3. Choose "Start in test mode" (we'll secure it later)
4. Select a location close to you (e.g., `us-central1`)
5. Click "Done"

## Step 3: Get Your Configuration

1. Click the gear icon ⚙️ next to "Project Overview"
2. Select "Project settings"
3. Scroll down to "Your apps" section
4. Click the web icon (</>)
5. Register app with name "Magdalena Food Tracker"
6. Copy the configuration object

## Step 4: Update Configuration File

Replace the placeholder config in `/assets/js/firebase-config.js` with your actual Firebase config:

```javascript
const firebaseConfig = {
  apiKey: "your-actual-api-key",
  authDomain: "your-project-id.firebaseapp.com",
  projectId: "your-project-id",
  storageBucket: "your-project-id.appspot.com",
  messagingSenderId: "your-sender-id",
  appId: "your-app-id"
};
```

## Step 5: Set Up Security Rules (Optional but Recommended)

In Firestore Database → Rules, replace with:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /food_entries/{document} {
      allow read, write: if true; // For now, allow all access
    }
  }
}
```

## Step 6: Test Your Setup

1. Deploy your changes to GitHub Pages
2. Visit your food tracker page
3. Try adding a new entry
4. Check the browser console for any errors
5. Verify data appears in Firebase Console → Firestore Database

## 🎉 Benefits You'll Get

- **Real-time sync** across all devices
- **Automatic backups** in the cloud
- **No data loss** if browser is cleared
- **Access from anywhere** - phone, laptop, tablet
- **Free tier** handles thousands of entries

## 🔧 Troubleshooting

**If you see "Firebase not initialized" errors:**
- Check that your config is correct
- Ensure Firebase SDK scripts are loading
- Verify the order of script tags

**If data isn't saving:**
- Check browser console for errors
- Verify Firestore is enabled
- Check security rules

**If you want to migrate existing localStorage data:**
- The app will automatically create sample data if Firebase fails
- You can manually add entries through the form

## 📱 Cross-Device Usage

Once set up, Magdalena can:
- Add entries on her phone
- See them instantly on her laptop
- Access from any browser
- Never lose data again!

The app will automatically sync in real-time across all devices. ✨ 