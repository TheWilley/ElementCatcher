interface Config {
    ignoreClass: string
    includeClass: string
    getElementsWith: string
    id: string
    directChildren: boolean
}

class ElementCatcher {
    // Global vraibles
    private config: Config
    private targetElement: Element
    private elements: Array<Element>

    constructor(config: Config) {
        // Error checks before continuing
        if (this.checkApp()) {
            this.config = config
            this.elements = []
            this.targetElement = document.getElementById(config.id)!
            this.start()
        }
    }

    private error(message) {
        alert("[[ElementCatcher]] Error - " + message)
        throw new Error(message)
    }

    private checkApp() {
        if (this.config == null) this.error(`No object found`)
        if (this.config.hasOwnProperty('ignoreClass') && this.config.hasOwnProperty('includeClass')) this.error(`ignoreClass and includeClass cannot exist in the same instance`)
        if (!this.config.hasOwnProperty('id')) this.error(`No id value found`)
        if (document.getElementById(this.config.id) == null) this.error(`No id with value "${this.config.id}" found`)

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

    public addElement(element: HTMLElement) {
        // Add an array of elements
        if (Array.isArray(element)) {
            element.forEach(e => {
                if (e.hasOwnProperty('id')) {
                    this[e.id] = e;
                } else if (e.classList.length > 0) {
                    this.elements.push(e);
                } else {
                    this.elements.push(element);
                }
            })
        // Add a single element
        } else {
            if (element.hasOwnProperty('id')) {
                this[element.id] = element;
            } else if (element.classList.length > 0) {
                this.elements.push(element);
            } else {
                this.elements.push(element);
            }
        }
    }
}
