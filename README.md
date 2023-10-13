# KinoXP

KinoXP is a Cinema business, and this Next.js application, is just the frontend and allows KinoXP to create/show programs of their movies and for custoemrs to buy thickets.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

Clone the Frontend Repository: https://github.com/IntelliOptima/KD-23-frontend.git

Clone the backend Repository: https://github.com/IntelliOptima/KD-23-backend.git

Update application.properties in the Backend to the following:


spring.datasource.url=jdbc:mysql://kinoxpdb.mysql.database.azure.com/kinoxpdb

spring.datasource.username=azureUser

spring.datasource.password=KeaDat22!


Run the Backend
Run the Frontend

## Logins and Roles

The admin is the owner of the cinema, he can create a program from his dashboard, so when a user with the role ADMIN logs in they are redirected directly to the dashboard, and if a USER tries to go to the /admin/dashboard they cannot access.

The user is a client to the Cinema, they get a list of the movie shows that are set in the program by the Admin. They dont need to be logged in to be able to book a ticket to a show, but they need to send an email with the booking.

We wanted to make a profile page for the User so that they could see their bookings, but didn't have enough time, so the login feature for the User is not actually very functional

ADMIN - 
        email: admin@test.dk
        password: admintest1234

USER -  
        email: user@test.dk
        password: usertest1234

### Prerequisites

- Node.js (>=12.x)
- npm (>=6.x)

### Installation

1. Clone the repository:

```bash
git clone https://github.com/IntelliOptima/KD-23-frontend.git
```

2. Navigate into the project directory:

```bash
cd KD-23-frontend
```

3. Install dependencies:

```bash
npm install
```

4. Start the development server:

```bash
npm run dev
```

Now, open http://localhost:3000 in your browser to see the app running.

## Built With

- [Next.js](https://nextjs.org/) - The React framework for production
- [React](https://reactjs.org/) - A JavaScript library for building user interfaces
- [TypeScript](https://www.typescriptlang.org/) - A typed superset of JavaScript that compiles to plain JavaScript
- [Tailwind CSS](https://tailwindcss.com/) - A utility-first CSS framework for rapidly building custom designs
- [Jest](https://jestjs.io/) - A JavaScript testing framework
- [selenium-webdriver](https://www.npmjs.com/package/selenium-webdriver) - A browser automation library
- [ESLint](https://eslint.org/) - A pluggable and configurable linter tool for identifying and reporting on patterns in JavaScript
- [Prettier](https://prettier.io/) - An opinionated code formatter


## Code Standards
To ensure consistency and quality in the code, the following standards are enforced:



### Naming Conventions
Naming should be consistent throughout the project, and most importantly ALWAYS BE DESCRIPTIVE... The following naming conventions should be used:
- **Component names / File names**: All component names should be in `PascalCase` (e.g. `MyComponent`).
- **Variable names**: All variable names should be in `camelCase` (e.g. `myVariable`).
- **Function names**: All function names should be in `camelCase` (e.g. `myFunction`).
- **Class names**: All class names should be in `PascalCase` (e.g. `MyClass`).
- **Interface names**: All interface names should be in `PascalCase` (e.g. `MyInterface`).
- **Enum names**: All enum names should be in `PascalCase` (e.g. `MyEnum`).
- **Enum members**: All enum members should be in `UPPER_CASE` (e.g. `MY_ENUM_MEMBER`).
- **Constants**: All constants should be in `UPPER_CASE` (e.g. `MY_CONSTANT`).
- **Short names**: Short names should be avoided unless they are very common (e.g. `i`, `j`, `k`, `x`, `y`, `z`), or makes sense (discuss with teammembers).

### Code Formatting
- **Indentation**: All code should be indented with 2 spaces.
- **Line length**: All lines should be no longer than 120 characters.
- **Semicolons**: All statements should end with a semicolon.
- **Quotes**: All strings should be in double quotes.
- **Braces**: All braces should be on the same line as the corresponding statement or declaration.
- **Parentheses**: All parentheses should be on the same line as the corresponding statement or declaration.
- **Commas**: All commas should be followed by a space.
- **Operators**: All operators should be surrounded by spaces.
- **Comments**: All comments should be in English and follow the [JSDoc](https://jsdoc.app/) standard. if applicable.

### Code Quality
- **TypeScript/JavaScript**: All code should be written in TypeScript or JS.
- **Imports**: All imports should be sorted alphabetically.
- **Variables**: All variables should be declared with `const` or `let`.
- **Functions**: All functions should be declared with `const`.
- **Classes**: All classes should be declared with `class`.
- **Interfaces**: All interfaces should be declared with `interface`.
- **Enums**: All enums should be declared with `enum`.

### Libraries/Utilities:
Libraries or utility files, should be written in `kebab-case`, this ensures its easy to see its either library or utility file.
- Example: `my-utility.ts`, `my-utility.js`


These conventions help maintain a consistent and understandable project structure, making it easier for developers to navigate and work with the codebase.

