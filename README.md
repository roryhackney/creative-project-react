# creative-project-react
The Art Supply Tracker is a personal project I’ve been working on since 2024, inspired by my desire to organize, track, and easily search for my own art supplies while out shopping. After gaining confidence developing software and programming in my CS courses, I began exploring ways to create an application to manage my art supply collection. After creating an initial UX design in Figma, I began exploring React and Firebase to develop a mobile first website during the summer.

After learning more about React and cloud computing in the fall of my senior year, I implemented this improved version during my web development course, improving the UX and implementing features including authentication, a database, unit tests, and dynamic forms that generate fields based on user choices. As part of the process, I was able to learn a lot about software design, developing React applications, using Node and Express, and the tradeoffs between SQL and JSON databases.

This project uses Firebase to handle authentication and data using a JSON database, together with React, HTML, and CSS.
The previous version uses SQL, Node, and Express, as you can see at [creative-project](https://github.com/roryhackney/creative-project).

To run the application, clone the repo and run <code>npm install</code> in the terminal. Run <code>cd art-supply-tracker</code>
<code>npm run dev</code> and then open the displayed link or localhost:5173/.

User authentication has been implemented. You can log in, log out, and register, using email and password or GitHub authentication. Pages will be available based on authentication requirements to ensure only valid access to content.
![image](https://github.com/user-attachments/assets/653a03e7-ef88-4768-a1b3-e5558fdc8e57)

Once logged in, click Load Supplies on the home page and the system will display any art supplies you have in the database.

The customize page will also display your preferred name and email in the customize page. You can update both, but must verify the new email by clicking the link sent to the email to confirm.

Add New supplies on the Add New page. You can select a category, and it will automatically generate fields for the properties of that category. When you save your supply, it will add it to the database and can be displayed on the home page.
![image](https://github.com/user-attachments/assets/b2e8b51a-9fc1-4fc4-8f99-9851c4ebe46e)

Lots of unit testing in the tests folder, based on components. No testing on Firebase stuff, yet, other than manual testing.

<b>To see a bunch of supplies already added, log in as demo user (a@a.com, 12345678) to see the functionality without the hassle of setup.</b>
![image](https://github.com/user-attachments/assets/afc95b66-7e21-41af-b424-cee23028e307)
