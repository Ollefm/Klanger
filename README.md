# Klanger

**Klanger** is a fun and interactive **music quiz app** where users can guess songs based on short audio previews. Players can test their music knowledge in **single-player** mode or **challenge friends in multiplayer** mode to see who scores the highest!

---

##  Key Features

###  Game Modes
- **Single Player:** Listen to a song snippet and guess the correct title.
- **Multiplayer:** Challenge friends, compete in real-time, and see who comes out on top.
- **Game Feedback:** Receive instant feedback on correct or incorrect answers, including the correct song title.

###  Social & Progression
- **Leaderboard:** Compare your score with others and climb the global rankings.
- **User Profile:**
  - View past performances and total score.
  - Present progress with performance graphs and statistics.

###  Cross-Platform Support
- Functional on **iOS and Android**.
- Primarily optimized for **iOS devices**.
- 
### Third-party components (user-visible)
- react-native-chart-kit https://github.com/indiespirit/react-native-chart-kit - visibe in `src/views/profileView`
- react-countdown-circle-timer https://github.com/indiespirit/react-native-chart-kit - visible in `src/views/countDokuView.tsx`
---

##  Deployment & Running the App

The application is deployed on **Stackblitz**. Follow these steps to run the app:

1. Visit: **https://stackblitz.com/edit/tv1ndoh4-49mhsyhe?file=README.md**
2. Wait for all dependencies to install. A **QR code** will appear in the StackBlitz terminal once it's ready.

   > If the install fails:
   > - Press `Ctrl + C` in the StackBlitz terminal
   > - Then run:
   >   ```bash
   >   npm install && npm run dev
   >   ```

3. Download the **Expo Go** app from the App Store or Google Play.
4. Scan the QR code using your phone’s camera.
5. Open the app in **Expo Go** on your phone.

>  **Note:** If the app doesn't work correctly in Safari, try using **Chrome** instead.

---

##  Prototyping & Formative Evaluation

The process of prototyping and conducting formative evaluations with users is documented in the following report:

 **User Evaluation Report:**  
[🔗 View the Document](https://docs.google.com/document/d/1jDcA647Fq_FcGBDwmr9Y7sFzARihf6lnSfkAALm5D3g/edit?usp=sharing)

---

## Playthrough

1. **Register or Log In**  
   The user starts by registering or logging in to the application.

2. **Pending Challenges**  
   After logging in, the **Pending Challenges** view displays all current games the user is involved in.

3. **Start a New Game**  
   From the **New Game** view, the user can choose between:
   - **Single Player:** Start guessing songs immediately.
   - **Multiplayer:** Challenge another player.

     - Once the opponent accepts, the challenge appears under **Pending Challenges**.
     - The user is informed whether it’s their turn or the opponent's.
     - After the game concludes, the results are shown to both players.

> **Note for Android users:**  
If you press the **Home** button while viewing results, a bug may cause a white screen to appear. This issue is specific to Android.
