import React from 'react';
import SelectInput from './SelectInput';
import TextInput from './TextInput';
import FloatInput from './FloatInput';
import IntInput from './IntInput';
import {auth, database} from "../firebase";

//TODO: replace with importing from db
import { catProps, properties } from './SampleData';
import { onAuthStateChanged } from 'firebase/auth';
import { set, ref } from 'firebase/database';

const AddNew = (props) => {
    //the currently logged in user
    const [currUser, setCurrUser] = React.useState(auth.currentUser);
    
    //currently selected category
    const [category, updateCategory] = React.useState("");
    
    //generic data which is the same for all categories
    const [generalData, setGeneralData] = React.useState({
        "Quantity": 1 //default value
    })

    //data specific to the selected category
    const [categoryData, setCategoryData] = React.useState({});

    //whenever a generic input is changed, the current value is tracked
    const handleGeneralInputChange = (event) => {
        const fieldName = event.target.name;
        const fieldValue = event.target.value;
        setGeneralData(prev => ({...prev, [fieldName]: fieldValue}));
    }
    //whenever a category specific input is changed, the current value is tracked
    const handleCategoryInputChange = (event) => {
        const fieldName = event.target.name;
        const fieldValue = event.target.value;
        setCategoryData(prev => ({
            ...prev, [fieldName]: fieldValue
        }));
    }

    //if the currently logged in user changes, update state
    onAuthStateChanged(auth, user => setCurrUser(user));

    //retrieves category specific fields and turn them into form inputs
    const categoryFields = (cat) => {
        const props = Object.keys(catProps[cat]);

        //map each category's properties to html input fields
        const customProperties = props.map((name) => {
            const prop = properties[name];
            const type = prop['type'];
            const required = prop['required'];
            switch (type) {
                case 'text':
                    return <TextInput key={name} name={name} required={required} changeHandler={handleCategoryInputChange}/>;
                case 'select':
                    const opts = prop['options'];
                    return <SelectInput key={name} name={name} options={opts} required={required} changeHandler={handleCategoryInputChange}/>;
                case 'float':
                    return <FloatInput key={name} name={name} required={required} changeHandler={handleCategoryInputChange}/>;
                case 'int':
                    return <IntInput key={name} name={name} required={required} changeHandler={handleCategoryInputChange}/>
            }
        });
        return customProperties;
    }

    //is this necessary or is it auto handled by firebase?
    const checkNameUnique = (category, name) => {
        //get list of supplies for that user for that category
        //if name is already present
        //error span: Name already exists. Try using a more descriptive name.
        const refToDb = ref(database, "users/" + user.uid + "/supplies/" + category);
        
        return true;
    }

    //saves the entered supply to the database under users/[id]/supplies/[category]/
    const saveSupply = (event) => {
        event.preventDefault();
        const user = currUser;
        const refToDb = ref(database, "users/" + user.uid + "/supplies/" + category + "/" + generalData["Name"]);
        set(refToDb, {
            generalData,
            categoryData
        }).then(() => {
            console.log("Successfully saved to database!");
        }).catch(error => {
            console.log("Error:", error.code, error.messge);
        })
        return false;
    }

    //the dynamically generated form
    return (
        <main>
            <h2><span>Add new art supplies to</span>your Art Supply Tracker!</h2>
            <form onSubmit={saveSupply}>
                <h3>General fields</h3>
                <SelectInput name="Category" options={Object.keys(catProps)} setChoice={updateCategory} setCatData={setCategoryData} required={true}/>
                <TextInput name="Name" required={true} changeHandler={handleGeneralInputChange}/>
                <TextInput name="Description" required={false} changeHandler={handleGeneralInputChange}/>
                <TextInput name="Location" required={false} changeHandler={handleGeneralInputChange}/>
                <div className="form-row">
                    <div className="input-column">
                        <label htmlFor="BrandName">Brand Name</label>
                        <input type="text" id="BrandName" name="BrandName" autoComplete="true" className="medium" required={false} onChange={handleGeneralInputChange}/>
                    </div>
                    <div className="input-column">
                        <label htmlFor="Quantity">Quantity</label>
                        <input type="number" defaultValue="1" name="Quantity" id="Quantity" className="small" min="0" required={true} onChange={handleGeneralInputChange}/>
                    </div>
                </div>

                {/* category specific properties */}
                {category !== "" && (
                    <section>
                        <h3>{category} fields</h3>
                        {categoryFields(category)}
                    </section>)
                }

                <button type="submit" onClick={() => console.log(JSON.stringify(generalData) + JSON.stringify(categoryData))}>Save</button>
            </form>
        </main>
    );
}

export default AddNew;