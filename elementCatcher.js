
/**
 * @description Element catcher to access elements with object syntax 
 * @param {object} - Options object 
 * 
 * @author TheWilley
 */
 class elementCatcher {
    #object

    constructor(object) {
        this.#object = object
        this.elements = []

        this.app = this.returnApp()
        this.start()
    }

    error(message) {
        alert("[[elementCatcher]] Error - " + message)
        throw new Error(message)
    }

    returnApp() {
        if (this.#object == null) this.error(`No options object`)
        if (this.#object.ignoreClass && this.#object.includeClass) this.error(`Can't both ignore AND include class, pick one`)
        if (!this.#object.id) this.error(`No ID`)
        if (document.getElementById(this.#object.id) == null) this.error(`No id with value "${this.#object.id}" found`)

        return document.getElementById(this.#object.id)
    }

    start() {
        switch(this.#object.getElementsWith) {
            case 'id':
                for (const element of this.#object.directChildren ? this.app.childNodes : this.app.getElementsByTagName("*")) {
                    if (this.#object.ignoreClass) { if (!element.id && element.classList.contains(this.#object.ignoreClass)) this[element.id] = element }
                    else if (this.#object.includeClass) { if (element.id && element.classList.contains(this.#object.includeClass)) this[element.id] = element }
                    else if (element.id) { this[element.id] = element }
                }
                break;
            case 'class':
                for (const element of this.#object.directChildren ? this.app.childNodes : this.app.getElementsByTagName("*")) {
                    if (this.#object.ignoreClass) { if (element.classList.length > 0 && !element.classList.contains(this.#object.ignoreClass)) this.elements.push(element); }
                    else if (this.#object.includeClass) { if (element.classList.length > 0 && element.classList.contains(this.#object.includeClass)) this.elements.push(element) }
                    else if (element.classList.length > 0) { this.elements.push(element) }
                }
                break;
            case 'all':
                for (const element of this.#object.directChildren ? this.app.childNodes : this.app.getElementsByTagName("*")) {
                    if (this.#object.ignoreClass) { if (!element.classList.contains(this.#object.ignoreClass)) element.id ? this[element.id] = element : this.elements.push(element) }
                    else if (this.#object.includeClass) { if (element.classList.contains(this.#object.includeClass)) element.id ? this[element.id] = element : this.elements.push(element)  }
                    else { element.id ? this[element.id] = element : this.elements.push(element) } 
                }
                break;
            case 'allAsArray':
                for (const element of this.#object.directChildren ? this.app.childNodes : this.app.getElementsByTagName("*")) {
                    if (this.#object.ignoreClass) { if (!element.classList.contains(this.#object.ignoreClass)) this.elements.push(element) }
                    else if (this.#object.includeClass) { if (element.classList.contains(this.#object.includeClass)) this.elements.push(element) }
                    else { this.elements.push(element) }
                }
                break;
            default:
                this.error(`'${this.#object.getElementsWith}' is not a valid getElementsWith option (id, class, all, allAsArray)`)
        }
    }
}
