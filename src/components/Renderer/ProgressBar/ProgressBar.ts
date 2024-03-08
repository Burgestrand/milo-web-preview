export default class ProgressBar extends HTMLElement {
  static observedAttributes = ["progress"]

  get #bar(): HTMLElement {
    return this.querySelector("[data-progress]")
  }

  get progress() {
    return parseFloat(this.getAttribute("progress"))
  }

  set progress(value: number) {
    this.setAttribute("progress", value.toFixed(0))
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (name === "progress") {
      this.#bar.style.width = `${newValue}%`
    }
  }
}