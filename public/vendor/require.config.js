var jam = {
    "packages": [
        {
            "name": "backbone",
            "location": "vendor/backbone",
            "main": "backbone.js"
        },
        {
            "name": "jade",
            "location": "vendor/jade",
            "main": "index.js"
        },
        {
            "name": "jquery",
            "location": "vendor/jquery",
            "main": "dist/jquery.js"
        },
        {
            "name": "moment",
            "location": "vendor/moment",
            "main": "moment.js"
        },
        {
            "name": "require-jade",
            "location": "vendor/require-jade",
            "main": "jade.js"
        },
        {
            "name": "rivets",
            "location": "vendor/rivets",
            "main": "./dist/rivets.js"
        },
        {
            "name": "spin-js",
            "location": "vendor/spin-js",
            "main": "spin.js"
        },
        {
            "name": "text",
            "location": "vendor/text",
            "main": "text.js"
        },
        {
            "name": "underscore",
            "location": "vendor/underscore",
            "main": "underscore.js"
        }
    ],
    "version": "0.2.17",
    "shim": {
        "backbone": {
            "deps": [
                "underscore",
                "jquery"
            ],
            "exports": "Backbone"
        },
        "underscore": {
            "exports": "_"
        }
    }
};

if (typeof require !== "undefined" && require.config) {
    require.config({
    "packages": [
        {
            "name": "backbone",
            "location": "vendor/backbone",
            "main": "backbone.js"
        },
        {
            "name": "jade",
            "location": "vendor/jade",
            "main": "index.js"
        },
        {
            "name": "jquery",
            "location": "vendor/jquery",
            "main": "dist/jquery.js"
        },
        {
            "name": "moment",
            "location": "vendor/moment",
            "main": "moment.js"
        },
        {
            "name": "require-jade",
            "location": "vendor/require-jade",
            "main": "jade.js"
        },
        {
            "name": "rivets",
            "location": "vendor/rivets",
            "main": "./dist/rivets.js"
        },
        {
            "name": "spin-js",
            "location": "vendor/spin-js",
            "main": "spin.js"
        },
        {
            "name": "text",
            "location": "vendor/text",
            "main": "text.js"
        },
        {
            "name": "underscore",
            "location": "vendor/underscore",
            "main": "underscore.js"
        }
    ],
    "shim": {
        "backbone": {
            "deps": [
                "underscore",
                "jquery"
            ],
            "exports": "Backbone"
        },
        "underscore": {
            "exports": "_"
        }
    }
});
}
else {
    var require = {
    "packages": [
        {
            "name": "backbone",
            "location": "vendor/backbone",
            "main": "backbone.js"
        },
        {
            "name": "jade",
            "location": "vendor/jade",
            "main": "index.js"
        },
        {
            "name": "jquery",
            "location": "vendor/jquery",
            "main": "dist/jquery.js"
        },
        {
            "name": "moment",
            "location": "vendor/moment",
            "main": "moment.js"
        },
        {
            "name": "require-jade",
            "location": "vendor/require-jade",
            "main": "jade.js"
        },
        {
            "name": "rivets",
            "location": "vendor/rivets",
            "main": "./dist/rivets.js"
        },
        {
            "name": "spin-js",
            "location": "vendor/spin-js",
            "main": "spin.js"
        },
        {
            "name": "text",
            "location": "vendor/text",
            "main": "text.js"
        },
        {
            "name": "underscore",
            "location": "vendor/underscore",
            "main": "underscore.js"
        }
    ],
    "shim": {
        "backbone": {
            "deps": [
                "underscore",
                "jquery"
            ],
            "exports": "Backbone"
        },
        "underscore": {
            "exports": "_"
        }
    }
};
}

if (typeof exports !== "undefined" && typeof module !== "undefined") {
    module.exports = jam;
}