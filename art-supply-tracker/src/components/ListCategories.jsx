//TODO: replace with getting categories from user db
import {categories} from './SampleData';

const ListCategories = () => {

    //ok this doesn't work and I'm not totally understanding explanations online
    //so I think I should not implement this bc I don't feel good about copying code
    /* const uncheckChildren = (event) => {
        if(! event.target.checked) {
            //get enclosing parent li tag
            const li = event.target.closest("li");
            console.log(li);

            const sublist = li.lastChild.children;
            console.log(sublist);

            for (let index = 0; index < sublist.length; index++) {
                sublist[index].checked = false;
                console.log(sublist[index].checked);
            }
        }
    } */

    const categoryHierarchyCheckboxes = (categoryObj) => {
        //create an array of li checkbox input items
        //to be nested in <ul></ul>

        //create a list to hold the keys
        const elements = [];

        const keys = Object.keys(categoryObj);
        for (const key of keys) {            
            const item = (
                //display the key
                <li key={key}>
                    {/* onClick={uncheckChildren} */}
                    {/* disabled for now. TODO: allow user to customize their categories*/}
                    <input type="checkbox" name={key} id={key} defaultChecked="checked" disabled/>
                    <label htmlFor={key}>{key}</label>
                    {/* if cat[key] has child categories then call recursively*/}
                    {categoryObj[key] !== "empty" &&
                    <ul>{categoryHierarchyCheckboxes(categoryObj[key])}</ul>}
                </li>
            );

            elements.push(item);
        }
        return elements;
    }

    return categoryHierarchyCheckboxes(categories);
}

export default ListCategories;