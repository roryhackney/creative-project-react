//default data
//TODO: allow user to create their own
const catProps = {
    "Pencils": {
        "Size": true,
        "Color Family": true
    },
    "Pens and Markers": {
        "Brand Color Code": true,
        "Brand Color Name": true,
        "Color Family": true,
        "Color Name": true,
        "Size": true,
        "Tip Type": true
    },
    "Drawing Paper": {
        "Height": true,
        "Material": true,
        "Thickness": true,
        "Width": true
    },
    "Acrylic Paint": {
        "Color Family": true,
        "Color Name": true,
        "Brand Color Name": true
    },
    "Watercolor Paint": {
        "Color Name": true,
        "Color Family": true,
        "Brand Color Name": true,
        "Material": true
    },
    "Ink": {
        "Color Name": true,
        "Color Family": true,
        "Brand Color Name": true,
        "Material": true
    },
    "Brush": {
        "Tip Type": true,
        "Size": true,
        "Material": true
    },
    "Canvas": {
        "Width": true,
        "Height": true
    },
    "Yarn": {
        "Material": true,
        "Thickness": true,
        "Color Family": true,
        "Color Name": true,
        "Brand Color Name": true
    },
    "Crochet Hooks": {
        "Material": true,
        "Size": true
    },
    "Knitting Needles": {
        "Material": true,
        "Size": true
    },
    "Fabric": {
        "Pattern": true,
        "Material": true,
        "Color Family": true,
        "Color Name": true,
        "Brand Color Name": true,
        "Width": true,
        "Height": true
    },
    "Crafting Paper": {
        "Color Name": true,
        "Width": true,
        "Height": true,
        "Material": true,
        "Thickness": true,
        "Pattern": true
    },
    "Bookbinding Thread": {
        "Color Family": true,
        "Color Name": true
    },
    "Cutting Tools": {
        "Tip Type": true
    },
    "Glue": {
        "Material": true,
        "Size": true
    }
}

const categories = {
    "Art Supplies": {
        "Drawing": {
            "Pencils": "empty",
            "Pens and Markers": "empty",
            "Drawing Paper": "empty"
        },

        "Painting": {
            "Acrylic Paint": "empty",
            "Watercolor Paint": "empty",
            "Ink": "empty",
            "Brush": "empty",
            "Canvas": "empty"
        },

        "Fabric Crafts": {
            "Yarn": "empty",
            "Crochet Hooks": "empty",
            "Knitting Needles": "empty",
            "Fabric": "empty"
        },

        "Paper Crafts": {
            "Crafting Paper": "empty",
            "Bookbinding Thread": "empty",
            "Cutting Tools": "empty",
            "Glue": "empty"
        }
    }
}

const properties = {
    "Size": {
        'type': 'text',
        'required': true
    },
    "Width": {
        'type': 'float',
        'required': true
    },
    "Height": {
        'type': 'float',
        'required': true
    },
    "Thickness": {
        'type': 'text',
        'required': true
    },
    "Color Family": {
        'type': 'select',
        'options': ["Gray", "Red", "Orange", "Yellow", "Green", "Cyan", "Aqua", "Blue", "Purple", "Pink"],
        'required': true
    },
    "Color Name": {
        'type': 'text',
        'required': true
    },
    "Pattern": {
        'type': 'text',
        'required': false
    },
    "Brand Color Code": {
        'type': 'text',
        'required': false
    },
    "Brand Color Name": {
        'type': 'text',
        'required': false
    },
    "Tip Type": {
        'type': 'text',
        'required': true
    },
    "Material": {
        'type': 'text',
        'required': true
    }
}

export {catProps, categories, properties};