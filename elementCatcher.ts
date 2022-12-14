interface Config {
    ignoreClass: string
    includeClass: string
    getElementsWith: string
    targetElement: Element
    directChildren: boolean
}

class ElementCatcher {
    // Global vraibles
    private config: Config
    private targetElement: Element
    private elements: Array<Element>

    constructor(config: Config) {
        // Error checks before continuing
        if (this.checkApp(config)) {
            this.config = config
            this.elements = []
            this.targetElement = config.targetElement!
            this.start()
        }
    }

    private error(message) {
        alert("[[ElementCatcher]] Error - " + message)
        throw new Error(message)
    }

    private checkApp(config: Config) {
        if (config == null) this.error(`No object found`)
        if (config.hasOwnProperty('ignoreClass') && this.config.hasOwnProperty('includeClass')) this.error(`ignoreClass and includeClass cannot exist in the same instance`)
        if (!config.hasOwnProperty('targetElement')) this.error(`No targetElement value found`)
        //if (config.targetElement == null) this.error(`No id with value "${config.targetElement}" found`)

        return true
    }

    private checkForClass(element) {
        if (this.config.hasOwnProperty('ignoreClass')) {
            if (element.classList.contains(this.config.ignoreClass)) {
                return false
            }
        } else if (this.config.hasOwnProperty('includeClass')) {
            if (element.classList.contains(this.config.includeClass)) {
                return true
            }
        } else {
            return true
        }
    }

    private start() {
        // Check if the 'directChildren' attribute is added
        // Because HTMLCollection is not an array, we convert - https://stackoverflow.com/a/222847
        for (const element of this.config.directChildren == true ? [].slice.call(this.targetElement.children) : [].slice.call(this.targetElement.getElementsByTagName("*"))) {
            switch (this.config.getElementsWith) {
                case 'id':
                    if (this.checkForClass(element)) {
                        // Check if an element exist before adding it
                        if (element.id) this[element.id] = element
                    }
                    break;
                case 'class':
                    if (this.checkForClass(element)) {
                        // Check if a class exist before adding it
                        if (element.classList.length > 0) { this.elements.push(element) }
                    }
                    break;
                case 'all':
                    if (this.checkForClass(element)) {
                        // Check if an id OR class exist before adding it
                        element.id ? this[element.id] = element : this.elements.push(element)
                    }
                    break;
                case 'allAsArray':
                    if (this.checkForClass(element)) {
                        // Just add element, no checks
                        this.elements.push(element)
                    }
                    break;
                default:
                    // Default to error if no paramter was enterd
                    this.error(`'${this.config.getElementsWith} ' is not a valid 'getElementsWith' value (id, class, all, allAsArray)`)
            }
        }
    }

    private manuallyAddControl(element: Element) {
        if (element.hasOwnProperty('id')) {
            this[element.id] = element;
        } else if (element.classList.length > 0) {
            this.elements.push(element);
        } else {
            this.elements.push(element);
        }
    }

    public addElement(element: Element) {
        // Add an array of elements
        if (Array.isArray(element)) {
            element.forEach(e => {
                this.manuallyAddControl(element)
            })
            // Add a single element
        } else {
            this.manuallyAddControl(element)
        }
    }
}
