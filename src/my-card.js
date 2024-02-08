import { LitElement, html, css } from 'lit';

/**
 * Now it's your turn. Here's what we need to try and do
 * 1. 
 */

export class MyCard extends LitElement {

  static get tag() {
    return 'my-card';
  }

  constructor() {
    super();
    this.title = "My card";
    this.buttontitle = "Second card";
    this.img = "https://cdn.britannica.com/77/170477-050-1C747EE3/Laptop-computer.jpg"
    this.fancy = false;
  }

  static get styles() {
    return css`
    :host([fancy]) {
display: block;
  background-color: pink;
  border: 2px solid fuchsia;
  box-shadow: 10px 5px 5px red;
}
      :host { 
span {
  font-size: 16px; 
}
h1 {
  font-size: 2em;
  margin: 0;
  padding: 0;
}

h3,h4,h5,h6 {
  margin: 8px 0;
}

#card-list {
  display: flex;
}
.card {
  font-size: 1em;
  display: inline-flex;
  border: 2px solid grey;
  padding: 8px;
  margin: 8px;
  opacity: .8;
  background-color: navy;
  transition: .6s all ease-in-out;
}

.card-image {
  width: 200px;
  height: 100%;
}

.card-text {
  width: 300px;
  padding: 0 8px 8px 8px;
  color: black;
  background-color: white;
  margin: 0 0 0 8px;
  height: 300px;
  overflow: auto;
}

.card-title {
  position: sticky;
  top: 0;
  background-color: #eeeeee;
  text-align: center;
  font-size: 2em;
  padding: 8px 8px 16px;
  margin: 0 -8px;
}

ul {
  margin: 0;
  padding: 0 32px;
}

ul li {
  padding: 8px 16px;
  list-style: square;
}

ul li:hover {
  list-style: "🤯";
  font-weight: bold;
  cursor: help;
}

a {
  text-decoration: none;
}

.links li:focus-within,
.links li:hover {
  list-style: "🃏";
  background-color: purple;
  color: red;
}
.links li a:focus,
.links li:hover a {
  color: green;
  text-decoration: underline;
  cursor: move;
  outline: none;
}

ul li:nth-child(odd) {
  background-color: #eeeeee;
}

ul li:nth-child(even) {
  background-color: #dddddd;
}

.card:hover,
.card:focus-within {
  opacity: 1;
  outline: 2px solid green;
  outline-offset: 16px;
}

        }
    `;
  }

  render() {
    return html`<div class="control-wrapper">
    <a href="https://hax.psu.edu">
      <button class="btn">${this.buttontitle}</button>
    </a>
  </div>
  <div id="cardlist">
    <div class="card">
      <img class="card-image" alt="Github profile photo of the prof" src="${this.img}" />
      <div class="card-text">
        <h3 class="card-title">Cassius French</h3>
        <div class="card-details">
          <p>
          Hello my name is Cassius French. This card was created for my IST 256 class. This card is heavily inspiried by what the professor created on Youtube. This is late because I wasn't in the country for the past week and I didn't have access to internet for some time until now.
          <h4>Main Link</h4>
          <ul class="links">
           <li>
              <a href="https://hax.psu.edu">
              HAX [dot] PSU</a>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>`;
  }

  static get properties() {
    return {
      title: { type: String },
      buttontitle: { type: String },
      img: { type: String },
      fancy: { type: Boolean, reflect: true }
    };
  }
}

globalThis.customElements.define(MyCard.tag, MyCard);
