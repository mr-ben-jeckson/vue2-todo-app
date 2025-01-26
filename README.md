# Vue 2 Todo App

This is a simple Todo application built with Vue 2. It allows users to create, update, and delete tasks. The app is integrated with Firebase for real-time data storage and Firebase Cloud Functions.

## Features

- **Create, Update, and Delete Tasks**: Easily manage your tasks with a simple and intuitive interface.
- **Firebase Integration**: Real-time data synchronization using Firebase Firestore.
- **Responsive Design**: The app is designed to work seamlessly on both desktop and mobile devices.

## Installation

To get started with the Vue 2 Todo App, follow these steps:

### Prerequisites

- Node.js (v12.x or higher)
- npm (v6.x or higher)
- Firebase account (for Firebase configuration)

### Step 1: Clone the Repository

```bash
git clone https://github.com/mr-ben-jeckson/vue2-todo-app.git
cd vue2-todo-app
```

### Step 2: Install Dependencies

```bash
npm install
```
```bash
cd functions && npm install
```

### Step 3: Set Up Firebase Configuration

1. Go to the [Firebase Console](https://console.firebase.google.com/).
2. Create a new project.
3. Navigate to **Project Settings** > **General**.
4. Under **Your apps**, click on **Add app** and select **Web**.
5. Register the app and copy the Firebase configuration object.

6. Edit file `./src/firebase/config.js` file in the src directory of your project and replace the Firebase configuration:

```config
VUE_APP_FIREBASE_API_KEY=your-api-key
VUE_APP_FIREBASE_AUTH_DOMAIN=your-auth-domain
VUE_APP_FIREBASE_PROJECT_ID=your-project-id
VUE_APP_FIREBASE_STORAGE_BUCKET=your-storage-bucket
VUE_APP_FIREBASE_MESSAGING_SENDER_ID=your-messaging-sender-id
VUE_APP_FIREBASE_APP_ID=your-app-id
```

### Step 4: Run the Application

```bash
npm run serve
```

The app should now be running on `http://localhost:8080`.

## Deployment

To deploy the app to Firebase Hosting, Firestore Database and Cloud Functions, follow these steps:

### Step 1: Install Firebase CLI

If you haven't installed the Firebase CLI, you can do so by running:

```bash
npm install -g firebase-tools
```

### Step 2: Login to Firebase

```bash
firebase login
```

### Step 3: Initialize Firebase Hosting

```bash
firebase init
```

1. Select **Hosting** , **Firestore** and **Functions** from the list of Firebase features.
2. Choose your Firebase project.
3. Set the public directory to `dist`.
4. Configure as a single-page app (Yes).
5. Do not overwrite the `index.html` file (No).

### Step 4: Build the Project

```bash
npm run build
```

### Step 5: Deploy to Firebase

```bash
firebase deploy --only functions firestore hosting
```

Your app should now be live on Firebase Hosting!

## Contributing

If you'd like to contribute to this project, please follow these steps:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature/YourFeatureName`).
3. Commit your changes (`git commit -m 'Add some feature'`).
4. Push to the branch (`git push origin feature/YourFeatureName`).
5. Open a pull request.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- Vue.js 2 Framework
- Firebase
- Vue CLI
- Vuex@3
- Tailwindcss@2

## Contact

If you have any questions or suggestions, feel free to reach out:

- **Ben Jackson** - [GitHub](https://github.com/mr-ben-jeckson)
- **Email**: thanhtikexaw@gmail.com

---

Happy coding! 🚀