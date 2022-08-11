
/**
 * @description Element catcher to access elements with object syntax 
 * @param {object} object 
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
        alert("Error - " + message)
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
        if (this.#object.getElementsWith == "id") {
            for (const element of this.#object.directChildren ? this.app.childNodes : this.app.getElementsByTagName("*")) {
                if (this.#object.ignoreClass) { if (element.id && element.className != this.#object.ignoreClass) this[element.id] = element }
                else if (this.#object.includeClass) { if (element.id && element.className == this.#object.includeClass) this[element.id] = element }
                else if (element.id) { this[element.id] = element }
            }
        } else if (this.#object.getElementsWith == "class") {
            for (const element of this.#object.directChildren ? this.app.childNodes : this.app.getElementsByTagName("*")) {
                if (this.#object.ignoreClass) { if (element.className && element.classList.contains(!this.#object.ignoreClass)) this.elements.push(element) }
                else if (this.#object.includeClass) { if (element.className && element.classList.contains(this.#object.includeClass)) this.elements.push(element) }
                else if (element.className) { this.elements.push(element) }
            }
        } else if(this.#object.getElementsWith == "all") {
            for (const element of this.#object.directChildren ? this.app.childNodes : this.app.getElementsByTagName("*")) {
                if (this.#object.ignoreClass) { if (element.classList.contains(!this.#object.ignoreClass)) element.id ? this[element.id] = element : this.elements.push(element) }
                else if (this.#object.includeClass) { if (element.classList.contains(this.#object.includeClass)) element.id ? this[element.id] = element : this.elements.push(element)  }
                else { this.elements.push(element) } 
            }
        } else if(this.#object.getElementsWith == "allAsArray"){
            for (const element of this.#object.directChildren ? this.app.childNodes : this.app.getElementsByTagName("*")) {
                if (this.#object.ignoreClass) { if (element.classList.contains(!this.#object.ignoreClass)) this.elements.push(element) }
                else if (this.#object.includeClass) { if (element.classList.contains(this.#object.includeClass)) this.elements.push(element) }
                else { this.elements.push(element) }
            }
        } else {
            this.error(`No 'getElementsWith' option`)
        }
    }
}
