import React, { useRef } from 'react';
import SelectInput from './SelectInput';
import TextInput from './TextInput';
import FloatInput from './FloatInput';
import IntInput from './IntInput';
import {auth, database} from "../firebase";

//TODO: replace with importing from db
import { catProps, properties } from './SampleData';
import { set, ref, onValue } from 'firebase/database';

//TODO: allow user to select color family, then display color boxes, then if a user clicks on one it sets color name
const AddNew = () => {
    document.title = "Add New | Art Supply Tracker";
    //the form
    const formRef = useRef();
    
    //currently selected category
    const [category, updateCategory] = React.useState("");
    
    //generic data which is the same for all categories
    const [generalData, setGeneralData] = React.useState({
        "Name": "",
        "Quantity": 1 //default value
    })

    //data specific to the selected category
    const [categoryData, setCategoryData] = React.useState({});

    //errors to be displayed
    const [errors, setErrors] = React.useState({
        "Name": "",
        "Save": ""
    });

    
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

    const reset = () => {
        updateCategory("");
        setGeneralData({"Name": "", "Quantity": 1});
        setCategoryData({});
        setErrors({"Name": "", "Save": ""});
        formRef.current.reset();
    }

    //retrieves category specific fields and turn them into form inputs
    const categoryFields = (cat) => {
        const categoryProps = Object.keys(catProps[cat]);

        //map each category's properties to html input fields
        const customProperties = categoryProps.map((name) => {
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

    const replaceInvalidChars = (name) => {
        //TODO: can't use . $ # [ ] /
        const validName = name.replace(/[\.\$#\[\]\/]/g, '');
        if (validName != name) {
            setGeneralData(prev => ({...prev, Name: validName}))
        }
        return validName;
    }

    //prevent overwriting existing key name
    //using promises to handle async onValue
    const checkNameUnique = async (category, name) => {
        //get list of supplies for that user for that category
        //if name is already present, false, else true
        const refToDb = ref(database, "users/" + auth.currentUser.uid + "/supplies/" + category + "/" + name);
        return new Promise((resolve) => {
            onValue(refToDb, 
                (snapshot) => {
                    if (snapshot.exists()) {
                        resolve(false);
                    } else {
                        resolve(true);
                    }
                },
                {onlyOnce: true}
            )
        })
    }

    //saves the entered supply to the database under users/[id]/supplies/[category]/
    //TODO: saves the validated name as the key but old unvalidated name is still inside the generalData due to old state
    const saveSupply = async (cleanName) => {
        const refToDb = ref(database, "users/" + auth.currentUser.uid + "/supplies/" + category + "/" + cleanName);
        return new Promise((resolve) => {
            set(
                refToDb, {generalData, categoryData}
            ).then(() => {
                resolve(true);
            }).catch(error => {
                resolve(false);
            })
        });
    }

    const handleSubmit = (event) => {
        event.preventDefault();

        //remove invalid chars from name
        const validatedName = replaceInvalidChars(generalData["Name"]);

        //check that the name is not already being used as a key in the category
        checkNameUnique(category, validatedName)
        .then((isUnique) => {
            if (isUnique) {
                //save supply to the database if name is unique
                saveSupply(validatedName).then((success) => {
                    if (success) {
                        //TODO: idk a success animation maybe
                        setErrors(prev => ({"Save": "", "Name": ""}));
                        reset();
                        //TODO: replace with better alert
                        alert("Successfully Added!")
                        //scroll to top
                        window.scrollTo({top: 300, left: 0, behavior: "smooth"});
                    } else {
                        setErrors(prev => ({...prev, "Save": "Unable to save supply. Please try again later."}));
                    }
                })
            } else {
                const message = "Name already exists. Try using a more descriptive name.";
                if (errors["Name"] !== message) {
                    setErrors(prev => ({...prev, "Name": message}));
                }
            }
        }).catch(error => {
            //if something went wrong, assume name cannot be used
            console.log(error.code, error.message);
            const message = "Name cannot be used. Try using something else.";
            if (errors["Name"] !== message) {
                setErrors(prev => ({...prev, "Name": message}));
            }
        })
        
        return false; //don't submit
    }

    //the dynamically generated form
    return (
        <main>
            <h2><span>Add new art supplies to</span>your Art Supply Tracker!</h2>
            <form onSubmit={handleSubmit} ref={formRef}>
                <button type="reset" onClick={reset}>Reset</button>
                <h3>General fields</h3>
                <SelectInput name="Category" options={Object.keys(catProps)} setChoice={updateCategory} setCatData={setCategoryData} required={true}/>
                {/* <TextInput name="Name" required={true} changeHandler={handleGeneralInputChange}/> */}
                <div className = "input-column">
                    <label htmlFor="Name">Name</label>
                    <input type="text" id="Name" name="Name" onChange={handleGeneralInputChange} value={generalData["Name"]} required={true}/>
                </div>
                <span>{errors["Name"]}</span>
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

                <button type="submit">Save</button>
                <button type="reset" onClick={reset}>Reset</button>
                <span>{errors["Save"]}</span>
            </form>
        </main>
    );
}

export default AddNew;