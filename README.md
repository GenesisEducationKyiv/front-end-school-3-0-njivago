Hi, my name is Nikita Kuzmenko, and this is my implementation of the test case.

Steps to start the app:

1. Run `npm i` or `pnpm i` to install dependencies.
2. Copy the example environment file in client: `cp .env.example .env`.
3. Check the .env variables and update them if needed.
4. Start the app from root: `npm dev` or `pnpm dev`.

I want to mention that there are several areas for future improvement.
1. Refactor code to ensure compliance with W3C standards.
2. Use an external library for the audio player to support visualization and animations.
3. After migrating from REST to GraphQL, mimetype handling doesn't work properly - so fix Upload scalar
4. There is problem with E2E test job, it seems like playwright can't reach resources on CI, but locally it works fine
5. Refactor modals system
   
