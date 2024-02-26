// we import JS code into this JS code. Modular javascript is a big deal
// more modern (relatively speaking) and allows the web to feel like
// a full blown development environment
import { LitElement, html, css } from 'lit';

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
export class CampusAlert extends LitElement {
  // this is not a requirement, but it's a convention I personally enjoy
  // because it helps when looking at multiple elements. I open this file
  // I glance and go "oh the HTML tag for this code is called polaris-chip"
  // see the very bottom of the file for where this is actually implemented
  static get tag() {
    return 'campus-alert';
  }
  // constructor establishes defaults for the class
  constructor() {
    super();
    // a variable on this object called title
    this.open = true;
    this.sticky = false;
  }

  // CSS styles are scoped JUST to this element. This uses a technology called
  // "Shadow DOM" which is ver controversial to some, but to new people and new
  // things, it's incredible. It automatically ensures that the things in your render()
  // method below it look exactly the same always no matter where they are loaded!
  static get styles() {
    // "css" called here is actually a function exported from Lit at the top
    // so that it scopes the CSS nicely and also applies sanitization
    return css`
    :host([status="notice"]) {
      --alert-color: #007bff; /* Blue for notice */
    }
    :host([status="warning"]) {
      --alert-color: #ffc107; /* Yellow for warning */
    }
    :host([status="alert"]) {
      --alert-color: #dc3545; /* Red for alert */
    }
    :host([sticky]) {
      position: sticky;
      top: 0;
      z-index: 100; /* Adjust z-index as needed */
    }
    :host {
        --alert-color: #ffc107; /* Default alert color */
        --alert-text-color: #000; /* Default text color */
        --alert-close-color: #000; /* Default close button color */
        display: block;
        position: sticky;
        top: 0;
        background: var(--alert-color);
        padding: 10px;
        color: var(--alert-text-color);
        font-family: sans-serif;
      }
      .alert-icon {
        color: var(--alert-close-color);
        margin-right: 10px;
      }
      .close-btn {
        float: right;
        border: none;
        background: none;
        color: var(--alert-close-color);
        cursor: pointer;
      }
      .alert-content {
        display: flex;
        align-items: center;
      }
      .alert-text {
        flex-grow: 1;
      }
      .alert-date {
        margin-right: 20px;
        font-weight: bold;
      }
    `;
  }

  /**
   * render method is specific to LitElement based code. Anything you write here
   * you can think of as what gets printed to the screen when the tag is used.
   * In this example, <polaris-chip></polaris-chip> will actually display what you
   * see below in the render method.
   * @returns an HTML template which gets sanitized and rendered
   */
  render() {
    return this.open
    ? html`
        <div class="alert-content ${this.sticky ? 'sticky' : ''}">
          <span class="alert-icon">⚠️</span>
          <div class="alert-text">
            <slot></slot> <!-- User provided content will be projected here -->
          </div>
          <div class="alert-date">${this.date}</div>
          <button class="close-btn" @click=${this.toggle}>CLOSE</button>
        </div>
      `
    : html`
    <button @click="${this.toggle}">REOPEN ALERT</button>
    `;
  }
  toggle() {
    this.open = !this.open;
    // Save state to localStorage
    if (this.open) {
      localStorage.removeItem('campusAlertClosed');
    } else {
      localStorage.setItem('campusAlertClosed', 'true');
    }
  }
  connectedCallback() {
    super.connectedCallback();
    this.sticky = this.getAttribute('sticky') !== null;
    if (localStorage.getItem('campusAlertClosed')) {
      this.open = false;
    }
  }
  static get properties() {
    return {
      // this is a String. Array, Object, Number, Boolean are other valid values here
      open: { type: Boolean, reflect: true },
      status: { type: String, reflect: true },
      date: { type: String },
      sticky: { type: Boolean, reflect: true }
    };
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
globalThis.customElements.define(CampusAlert.tag, CampusAlert);
