
/**
 * @description Element catcher to access elements with object syntax 
 * @param {object} object 
 * 
 * @author TheWilley
 */
class elementCatcher {
    #object

    constructor(object)  {
        this.#object = object

        this.app = this.returnApp()
        this.start()
    }

    error(message) {
        alert("Error - " + message)
        throw new Error(message)
    }

    returnApp() {
        if (!this.#object.id) this.error("No ID")
        if(this.#object.ignoreClass && this.#object.includeClass) this.error(`Can't both ignore AND include class, pick one`)
        if (document.getElementById(this.#object.id) == null) this.error(`No id with value "${this.#object.id}" found`)

        return document.getElementById(this.#object.id)
    }

    start() {
        for (const element of this.app.childNodes) {
            if(this.#object.includeClass) if (element.id && element.className != this.#object.ignoreClass) this[element.id] = element
            else if (element.id && element.className == this.#object.includeClass) this[element.id] = element
        }
    }
}