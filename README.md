# creative-project-react
Remake of creative-project using React and Firebase

Developing a creative project for my web development course, namely an art supply tracking system, inspired by my own chaotic collection.

To use, download the project and run <code>npm install</code> in the terminal. Run <code>cd art-supply-tracker</code>
<code>npm run dev</code> and then open the displayed link or localhost:5173/.

User authentication has now been implemented. You can log in, log out, and register, using email and password or GitHub authentication. Pages will be available based on authentication requirements to ensure only valid access to content.
![image](https://github.com/user-attachments/assets/653a03e7-ef88-4768-a1b3-e5558fdc8e57)

Once logged in, click Load Supplies on the home page and the system will display any art supplies you have in the database.

The customize page will also display your preferred name and email in the customize page. You can update both, but must verify the new email by clicking the link sent to the email to confirm.

Add New supplies on the Add New page. You can select a category, and it will automatically generate fields for the properties of that category. When you save your supply, it will add it to the database and can be displayed on the home page.
![image](https://github.com/user-attachments/assets/b2e8b51a-9fc1-4fc4-8f99-9851c4ebe46e)

Lots of unit testing in the tests folder, based on components. No testing on Firebase stuff, yet, other than manual testing.

<b>To see a bunch of supplies already added, log in as demo user (a@a.com, 12345678) to see the functionality without the hassle of setup.</b>
![image](https://github.com/user-attachments/assets/afc95b66-7e21-41af-b424-cee23028e307)
