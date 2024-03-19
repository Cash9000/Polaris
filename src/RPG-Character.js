// we import JS code into this JS code. Modular javascript is a big deal
// more modern (relatively speaking) and allows the web to feel like
// a full blown development environment
import { LitElement, html, css } from 'lit';
import "@lrnwebcomponents/multiple-choice/lib/confetti-container.js";
// export means that other JS files can reference this JS file and
// pull in this class

// class means it's a full object to work with with methods and properties
// extends means this class is built off another
// LitElement is a small helper from lit.dev which makes it easy
// to understand how to build web components. Think of it like jQuery
// as far as built juuuuust on top of vanillaJS to make it easier to build
// things. However, unlike jQuery, ALL things built on Web components are
// compatible with all things built on other web component systems!
// We will only stick with Lit for this class and look at Vanilla examples
// but compatibility across sites / libraries is unique to web components
// and not a thing in React, Vue, Angular, etc
export class CounterApp extends LitElement {
  // this is not a requirement, but it's a convention I personally enjoy
  // because it helps when looking at multiple elements. I open this file
  // I glance and go "oh the HTML tag for this code is called polaris-chip"
  // see the very bottom of the file for where this is actually implemented
  static get tag() {
    return 'counter-app';
  }

  constructor() {
    super();
    this.counter = 0;
    this.min = 0;
    this.max = 100;
  }

  static get styles() {
    return css`
      :host {
        display: block;
        text-align: center;
      }
      .counter {
        font-size: 96px;
        color: var(--counter-color, black); /* default to black */
      }
      .buttons {
        margin-top: 16px;
      }
      button {
      font-size: 24px;
      padding: 8px 16px;
      margin: 0 8px;
      cursor: pointer;
      border: none;
      background-color: orange; /* updated to orange */
      color: black;
      border-radius: 4px;
    }
    button:disabled {
      background-color: #ccc;
      cursor: not-allowed;
    }
    `;
  }
  
  updated() {
    super.updated();
    this.style.setProperty('--counter-color', this.getCounterColor());
  }

  render() {
    return html`
    <confetti-container id="confetti">
      <div class="counter">${this.counter}</div>
      <div class="buttons">
        <button @click=${this.increment} ?disabled="${this.counter >= this.max}">+</button>
        <button @click=${this.decrement} ?disabled="${this.counter <= this.min}">-</button>
      </div>
      </confetti-container>
    `;
  }
  updated(changedProperties) {
    super.updated(changedProperties);
    if (changedProperties.has('counter')) {
      this.style.setProperty('--counter-color', this.getCounterColor());
      if (this.counter === 21) {
        this.makeItRain();
      }
    }
  }
  makeItRain() {
    import("@lrnwebcomponents/multiple-choice/lib/confetti-container.js").then(
      (module) => {
        // This is a minor timing 'hack'. We know the code library above will import prior to this running
        // The "set timeout 0" means "wait 1 microtask and run it on the next cycle.
        // this "hack" ensures the element has had time to process in the DOM so that when we set popped
        // it's listening for changes so it can react
        setTimeout(() => {
          // forcibly set the poppped attribute on something with id confetti
          // while I've said in general NOT to do this, the confetti container element will reset this
          // after the animation runs so it's a simple way to generate the effect over and over again
          this.shadowRoot.querySelector("#confetti").setAttribute("popped", "");
        }, 0);
      }
    );
  }
  static get properties() {
    return {
      counter: { type: Number },
      min: { type: Number },
      max: { type: Number }
    };
  }

  getCounterColor() {
    return this.counter === 21 ? 'blue' :
           this.counter === 18 ? 'green' :
           this.counter === this.min || this.counter === this.max ? 'red' : 'black';
  }

  increment() {
    this.counter++;
  }

  decrement() {
    this.counter--;
  }
}

// All web components have a call to customElements.define(tag-name, className);
// this code tells the browser that when you see this new HTML tag name
// that you should run this class definition. This is the magic of standards
// because this code runs at the browser layer it means that Safari/Firefox/Chrome/Edge
// authors have all agreed on how this should work and as a result it is extremely fast
// Lit operates juuuust above the standards layer and leverages other standards
// in order to deliver optimal performance with minimal "syntactical sugar"
// aka things specific to Lit itself
globalThis.customElements.define(CounterApp.tag, CounterApp);