import React from "react";
import {auth, database} from '../firebase';
import {ref, onValue} from "firebase/database";

const Home = () => {
    //TODO: set document.title in each page
    document.title = "Home | Art Supply Tracker";

    //html list of supplies, initially empty
    const [supplies, setSupplies] = React.useState([]);

    //retrieve art supplies and update state with the html nested list of supplies
    const getSupplies = () => {
        //connect to db
        const dbRef = ref(database, "users/" + auth.currentUser.uid + "/supplies");
        onValue(dbRef, (snapshot) => {
            //get the user's saved art supplies
            const data = snapshot.val();
            
            const categories = Object.keys(data);
            
            //TODO: handle case of category with no supplies
            //TODO: message for user with no supplies
            //for each category
            const listOfSupplies = categories.map((category) => {
                    const supplies = data[category];
                    const supplyNames = Object.keys(supplies);
                    //for each supply for that category
                    const listOfNames = supplyNames.map((name) => {
                        //get the general data (description, brand name, location, are optional, quantity is default 1)
                        const generalData = supplies[name]["generalData"];
                        const generalFields = Object.keys(generalData);
                        const genSections = generalFields.map(field => {
                            //ignore name
                            if (field === "Name" ||
                                //ignore quantity if 1 
                                (field === "Quantity" && generalData[field] === 1)) {
                                return null;
                            } else {
                                //one list item for each field
                                return (
                                    <li>
                                        <h6>{field}</h6>
                                        <p>{generalData[field]}</p>
                                    </li>
                                );
                            }
                        });

                        //get the category specific data
                        const catData = supplies[name]["categoryData"];
                        const catFields = Object.keys(catData);
                        const catSections = catFields.map(field => {
                            if (catData[field] === "") return null;
                            //one list item for each field
                            return (
                                <li>
                                    <h6>{field}</h6>
                                    <p>{catData[field]}</p>
                                </li>
                            );
                        });

                        //one list item for each supply
                        return (
                            <li>
                                <h5>{name}</h5>
                                <ul class="fields">{genSections}{catSections}</ul>
                            </li>

                        );
                    });

                    //one list item for each category
                    return (
                        <li>
                            <h4>{category}</h4>
                            <ul>{listOfNames}</ul>
                        </li>
                    );
                })
            setSupplies(listOfSupplies);
            //only load once, when button is clicked
        }, {"onlyOnce": true});
    }

    //page content
    return (
        <main id="customize-page">
            <h2><span>Welcome to</span>your Art Supply Tracker!</h2>
            <section>
                <h3>Your Art Supplies</h3>
                <div id="list-art-supplies">
                    <ul>{supplies}</ul>
                </div>
                <button type="button" class="button" onClick={getSupplies}>Load Supplies</button>
            </section>
        </main>
    );
};

export default Home;