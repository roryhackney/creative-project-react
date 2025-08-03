# creative-project-react
The Art Supply Tracker is a personal project I’ve been working on since 2024, inspired by my desire to organize, track, and easily search for my own art supplies while out shopping.

**Version 1**: [art-supply-tracker](https://github.com/roryhackney/art-supply-tracker)  
After gaining confidence developing software and programming in my CS courses, I began exploring ways to create an application to manage my art supply collection. After creating an initial mobile first [UX design](https://www.figma.com/design/0LxqJbBWnw07SKJpn5pTVx/Art-Supply-Tracker--Mobile-) in Figma, I began exploring React and Firebase to develop a mobile first website during my summer break.

![image](https://github.com/user-attachments/assets/9d7b3e59-3353-4961-8f7b-1153babeff92)

  
**Version 2**: [creative-project](https://github.com/roryhackney/creative-project)  
After learning more about Node, Express, and SQL in the fall of my senior year, I redesigned the application, improving the UX and implementing additional features including a SQL database tracking users, art supply categories, properties, and inventory, enabling authentication and routing using Node and Express. I also learned to use APIs, integrating a feature to display clickable color options fetched from an API based on the user's color family selection. Although the application worked, it was difficult to maintain and expand features because I was writing SQL, HTML, and JavaScript/Node code manually rather than using a framework or other tools.

![image](https://github.com/user-attachments/assets/3f7f95d3-1ab8-4ad9-956a-043fae39d368)
  

**Verson 3**: [creative-project-react](https://github.com/roryhackney/creative-project-react)  
After learning more about React, software design, and cloud computing, I implemented this repo as an improved version during my senior web development course, implementing additional features including both stronger authentication and a JSON database backed by Firebase / Google Cloud, unit tests using JUnit, and dynamic forms utilizing React components that generate fields based on user choices (for example, after selecting a category of art supply like paintbrush or yarn, different fields are generated, like color, weight, or material). As part of the process, I was able to learn a lot about software design, developing more organized and maintainable applications using React components, the challenges and rewards of cloud services, and the tradeoffs between SQL and more flexible NoSQL / JSON databases.

![image](https://github.com/user-attachments/assets/653a03e7-ef88-4768-a1b3-e5558fdc8e57)


---

To run the application, clone the repo and run <code>cd art-supply-tracker</code> in the terminal. Run <code>npm install</code>, <code>npm run dev</code> and then open the displayed link or localhost:5173/.

User authentication has been implemented. You can log in, log out, and register, using email and password or GitHub authentication. Pages will be available based on authentication requirements to ensure only valid access to content.  

![image](https://github.com/user-attachments/assets/653a03e7-ef88-4768-a1b3-e5558fdc8e57)

Once logged in, click Load Supplies on the home page and the system will display any art supplies you have in the database.

The customize page will also display your preferred name and email in the customize page. You can update both, but must verify the new email by clicking the link sent to the email to confirm.

Add New supplies on the Add New page. You can select a category, and it will automatically generate fields for the properties of that category. When you save your supply, it will add it to the database and can be displayed on the home page.  

![image](https://github.com/user-attachments/assets/b2e8b51a-9fc1-4fc4-8f99-9851c4ebe46e)

Lots of unit testing in the tests folder, based on components. No testing on Firebase stuff, yet, other than manual testing.

<b>To see a bunch of supplies already added, log in as demo user (a@a.com, 12345678) to see the functionality without the hassle of setup.</b>  

![image](https://github.com/user-attachments/assets/afc95b66-7e21-41af-b424-cee23028e307)
