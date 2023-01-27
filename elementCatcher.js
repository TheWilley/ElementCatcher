"use strict";
var ElementCatcher = /** @class */ (function () {
    function ElementCatcher(config) {
        this.config = {
            getElementsWith: "id",
            targetElement: document.getElementById("app")
        };
        this.elements = [];
        // Error checks before continuing
        if (this.checkApp(config)) {
            this.config = config;
            this.elements = [];
            this.start();
        }
    }
    ElementCatcher.prototype.error = function (message) {
        alert("[[ElementCatcher]] Error - " + message);
        throw new Error(message);
    };
    ElementCatcher.prototype.checkApp = function (config) {
        if (config == null)
            this.error("No object found");
        if (config.hasOwnProperty('ignoreClass') && config.hasOwnProperty('includeClass'))
            this.error("ignoreClass and includeClass cannot exist in the same instance");
        if (!config.hasOwnProperty('targetElement'))
            this.error("No 'targetElement' value found");
        if (!config.targetElement.nodeType)
            this.error("targetElement does not exist");
        return true;
    };
    ElementCatcher.prototype.checkForClass = function (element) {
        if (this.config.ignoreClass) {
            if (element.classList.contains(this.config.ignoreClass)) {
                return false;
            }
        }
        if (this.config.includeClass) {
            if (element.classList.contains(this.config.includeClass)) {
                return true;
            }
        }
        return true;
    };
    ElementCatcher.prototype.start = function () {
        // Check if the 'directChildren' attribute is added
        // Because HTMLCollection is not an array, we convert - https://stackoverflow.com/a/222847
        var element;
        for (var _i = 0, _a = this.config.directChildren == true ? [].slice.call(this.config.targetElement.children) : [].slice.call(this.config.targetElement.getElementsByTagName("*")); _i < _a.length; _i++) {
            element = _a[_i];
            switch (this.config.getElementsWith) {
                case 'id':
                    if (this.checkForClass(element)) {
                        // Check if an element exist before adding it
                        if (element.id)
                            this[element.id] = element;
                    }
                    break;
                case 'class':
                    if (this.checkForClass(element)) {
                        // Check if a class exist before adding it
                        if (element.classList.length > 0) {
                            this.elements.push(element);
                        }
                    }
                    break;
                case 'all':
                    if (this.checkForClass(element)) {
                        // Check if an id OR class exist before adding it
                        element.id ? this[element.id] = element : this.elements.push(element);
                    }
                    break;
                case 'allAsArray':
                    if (this.checkForClass(element)) {
                        // Just add element, no checks
                        this.elements.push(element);
                    }
                    break;
                default:
                    // Default to error if no paramter was enterd
                    this.error("'".concat(this.config.getElementsWith, " ' is not a valid 'getElementsWith' value (id, class, all, allAsArray)"));
            }
        }
    };
    ElementCatcher.prototype.manuallyAddControl = function (element) {
        if (element.hasOwnProperty('id')) {
            this[element.id] = element;
        }
        else if (element.classList.length > 0) {
            this.elements.push(element);
        }
        else {
            this.elements.push(element);
        }
    };
    ElementCatcher.prototype.addElement = function (element) {
        var _this = this;
        // Check if parameter is empty
        if (element != null) {
            // Check if paramter is element
            if (element.nodeType) {
                // Add an array of elements
                if (Array.isArray(element)) {
                    element.forEach(function (e) {
                        _this.manuallyAddControl(element);
                    });
                    // Add a single element
                }
                else {
                    _this.manuallyAddControl(element);
                }
            }
        }
    };
    return ElementCatcher;
}());
