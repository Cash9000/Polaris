import { css, html } from 'lit';
import { DDD } from '@lrnwebcomponents/d-d-d/d-d-d.js'; 
import '@lrnwebcomponents/rpg-character/rpg-character.js'; // Importing the RPG character component

class RPGCard extends DDD {
    static get tag() {
        return 'rpg-card';
    }

    static get properties() {
        return {
            title: { type: String },
            users: { type: Array },
            inputUserName: { type: String }
        };
    }

    constructor() {
        super();
        this.title = "RPG Characters";
        this.users = [];
        this.inputUserName = '';
    }

    static get styles() {
        return [
            super.styles,
            css`
                :host { 
                    display: block;
                    border: 2px solid grey;
                    padding: 16px;
                    margin: 8px;
                    width: 300px;
                    background-color: white;
                    box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
                    transition: 0.3s;
                }
                .card-title {
                    text-align: center;
                    font-size: 1.5em;
                    margin-bottom: 16px;
                }
                input[type="text"] {
                    font-size: 1em;
                    padding: 8px;
                    margin: 8px;
                }
                button {
                    font-size: 1em;
                    padding: 8px 16px;
                    margin: 8px;
                    cursor: pointer;
                    background-color: #4CAF50;
                    color: white;
                    border: none;
                    border-radius: 4px;
                }
            `
        ];
    }

    // Input scrub function (adapted from haxcms-party-ui.js)
    inputScrub(e) {
        if (e.key === "Enter") {
            this.addUser();
        }
        const inputVal = e.target.value;
        const scrubVal = inputVal.toLowerCase().replace(/[^a-z0-9]+$/g, "");
        this.inputUserName = scrubVal.slice(0, 10);
    }

    addUser() {
        if (this.inputUserName.trim() && !this.users.includes(this.inputUserName)) {
            this.users = [...this.users, this.inputUserName.trim()];
            this.inputUserName = '';
        }
    }

    removeUser(userName) {
        this.users = this.users.filter(user => user !== userName);
    }

    renderUserList() {
        return html`
            <ul>
                ${this.users.map(user => html`
                    <li>
                        <rpg-character seed="${user}"></rpg-character> <!-- Displaying the RPG character sprite -->
                        ${user}
                        <button @click="${() => this.removeUser(user)}">Remove</button>
                    </li>
                `)}
            </ul>
        `;
    }

    render() {
        return html`
            <div class="card-title">${this.title}</div>
            <input type="text" .value="${this.inputUserName}" @input="${this.inputScrub}" placeholder="Enter character name">
            <button @click="${this.addUser}">Add Character</button>
            ${this.renderUserList()}
        `;
    }
}

window.customElements.define(RPGCard.tag, RPGCard);
