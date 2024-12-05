# creative-project-react
Remake of creative-project using React and Firebase

Developing a creative project for my web development course, namely an art supply tracking system, inspired by my own chaotic collection.

To use, download the project and run <code>npm install</code> in the terminal. Run <code>cd art-supply-tracker</code>
<code>npm run dev</code> and then open the displayed link or localhost:5173/. For some reason, npm run build > npm run start isn't working. Trying to fix it.

User authentication has now been implemented. You can log in, log out, and register, using email and password or GitHub authentication. Pages will be available based on authentication requirements to ensure only valid access to content.

Once logged in, click Load Supplies on the home page and the system will display any art supplies you have in the database.

The customize page will also display your preferred name and email in the customize page. You can update both, but must verify the new email due to Firebase's requirements.

Add New supplies on the Add New page. You can select a category, and it will automatically generate fields for the properties of that category. When you save your supply, it will add it to the database and can be displayed on the home page.

Lots of unit testing in the tests folder, based on components. No testing on Firebase stuff, yet, other than manual testing.

<b>To see a bunch of supplies already added, log in as demo user (a@a.com, 12345678) to see the functionality without the hassle of setup.</b>