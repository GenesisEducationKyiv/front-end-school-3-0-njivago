Hi, my name is Nikita Kuzmenko, and this is my implementation of the test case.

Steps to start the app:

1. Run `npm i` or `pnpm i` to install dependencies.
2. Copy the example environment file: `cp .env.example .env`.
3. Check the .env variables and update them if needed.
4. Start the app: `npm start` or `pnpm start`.

I want to mention that there are several areas for future improvement. This application was built in a bit of a rush, so here are some planned enhancements:

1. Add loading indicators.
2. Clean up and optimize imports.
3. Refactor the List component and the TrackList widget to better align with the Single Responsibility Principle (SRP).
4. Add an ESLint configuration (oxlint doesn’t currently support many usable rules).
5. Refactor code to ensure compliance with W3C standards.
6. Automatically refill the paginated list after a deletion.
7. Use an external library for the audio player to support visualization and animations.
