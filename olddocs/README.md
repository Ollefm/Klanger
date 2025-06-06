# Klanger
Klanger is a music-quiz app. The users can play a quiz game where they hear previews of songs and then guess the name the songs. Users will get a score based on their quiz performance which can then be viewed in a global leaderboard. Another feature will be to get song recommendations based on an inputed song or artist. Songs will be previewed and if the user likes a song they will be able to save it for later in a personal list.

# Instructions for Mid-Project Review 

## Test the React Native application 
The application is hosted on stackblitz (see the link below). If you encounter any problems on for example, safari, try changing the web browser to chrome.

1. Go to: https://stackblitz.com/edit/vitejs-vite-16my6ncc 

2. Wait for all of the dependencies to be installed until you see a qr code in the stackblitz terminal

if the install fails, press ctrl + c in the stackblitz terminal and run `npm install && npm run dev` again or reload the page

3. Download the `Expo Go` from the App Store or Google Play on your phone. 

4. Scan the qr-code from the stackblitz terminal with your phones camera app

5. Open the application in `Expo Go` on your phone (don't use the stackblitz preview)

## What the group has accomplished so far

* Found a relevant api for the use case, which is deezer.api.com
* Created the structure of MVP for the application
* Implemented a couple of fundamental views
* Connected to firebase
* Implemented authentication
* Researched and implemented some functionality from the API:
  - Fetching trackID
  - Fetching and playing Preview from the API
  - Displaying covers from the API

## What the group still plans to do 

* Implement persistence
* Further improve Quiz
  - quizzes in different music genres
  - score system
  - leaderboard
* Functional Profile view 
  - Personal quiz score, personal list with liked songs (Well separated persisted data, per authenticated user)
* Functional Recommended view
 - Personal song recommendations (create added value to users)
* Ability to “like” songs and save them in a list (create added value to users)
* Good visibility of system status (suspense view)



## Your project file structure (short description/purpose of each file)

```plaintext


src/
├── api/
│   └── api.ts # Overall API fetches will be here
├── app/
│   ├── (auth)/ # Authentication/starting page tab view
│   │   ├── _layout.jsx # Layout of the tab view
│   │   ├── index.jsx # Rendering the AuthstartingView, providing the reactiveModel
│   │   ├── login.jsx # Rendering the Loginpage providing the reactiveModel
│   │   └── register.jsx # Rendering the Registerpage providing the reactiveModel
│   ├── (tabs)/
│   │   ├── _layout.jsx # Layout and styling of the main tab view
│   │   ├── guessSong.tsx # Rendering the guessSong, providing the reactiveModel
│   │   ├── index.jsx # Rendering the IndexPage (Not yet fully separated MVP)
│   │   ├── profile.jsx # Rendering the ProfilePage, providing reactiveModel
│   │   ├── quiz.jsx # Rendering the Quiz page, providing the reactiveModel
│   │   └── recommend.jsx # Rendering the recommend, providing ReactiveModel
│   ├── custom components/ # Reusable components
│   │   ├── appInput.tsx # Custom Input
│   │   ├── appPrimaryButton.tsx # Custom Primary Button
│   │   ├── appProfileBar.tsx  # Custom Profile Bar
│   │   ├── appSearchInput.tsx # Custom Search Input
│   │   ├── appSecondaryButton.tsx # Custom Secondary Button
│   │   ├── playPreviewContainer.tsx  # Custom Media player
│   │   └── _layout.jsx # Root Layout
├── assets/ # images
├── model/
│   └── model.ts # Business logic
├── presenters/
│   ├── authStartingPresenter.tsx # Authentication Presenter 
│   ├── guessSongPresenter.tsx # Presenter for the quiz
│   ├── loginPresenter.tsx  # Login Presenter 
│   ├── profilePresenter.tsx # Profle Presenter
│   ├── quizPresenter.tsx # Presenter for the quiz
│   ├── recommendPresenter.tsx # Presenter for the recommendations 
│   └── registerPresenter.tsx
├── views/
│   ├── authStartingView.tsx # Starting view if not authenticated
│   ├── guessSongView.tsx
│   ├── loginView.tsx
│   ├── profileView.tsx  #Personal information, scores, etc 
│   ├── quizView.tsx # View for the quiz (work in progress) 
│   ├── recommendView.tsx # View for the list of the recommended songs 
│   ├── registerView.tsx 
│   ├── suggestionsView.tsx # Work in progress
│   └── suspenseView.jsx #View for loading 
├── bootstrapping.ts
├── firebaseConfig.ts
└── firestoreModel.ts
```
