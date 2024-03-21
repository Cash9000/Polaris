// we import JS code into this JS code. Modular javascript is a big deal
// more modern (relatively speaking) and allows the web to feel like
// a full blown development environment
import { LitElement, html, css } from 'lit';
import "@lrnwebcomponents/rpg-character/rpg-character.js";
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
export class RPGCard extends LitElement {
  static get tag() {
    return 'rpg-card';
  }

  constructor() {
    super();
    this.title = "RPG Characters";
  }

  static get styles() {
    return css`
      :host { 
        display: block;
        border: 2px solid grey;
        padding: 16px;
        margin: 8px;
        width: 300px; /* Adjust width to make it thinner */
        background-color: white;
        box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
        transition: 0.3s;
      }
      .card-title {
        text-align: center;
        font-size: 1.5em;
        margin-bottom: 16px;
      }
      button {
        font-size: 1em;
        padding: 8px 16px;
        margin: 8px;
        cursor: pointer;
        background-color: #4CAF50; /* Green */
        color: white;
        border: none;
        border-radius: 4px;
      }
    `;
  }

  render() {
    return html`
      <div class="card-title">${this.title}</div>
      <button>Add a Character</button>
      <button>Remove a Character</button>
      <button>Save a Team</button>
      
    `;
  }
}

globalThis.customElements.define(RPGCard.tag, RPGCard);

