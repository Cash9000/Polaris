import { css, html } from 'lit';
import { DDD } from '@lrnwebcomponents/d-d-d/d-d-d.js';
import '@lrnwebcomponents/rpg-character/rpg-character.js';
import '@lrnwebcomponents/multiple-choice/lib/confetti-container.js';

class RPGCard extends DDD {
    static get tag() {
        return 'rpg-card';
    }

    static get properties() {
        return {
            title: { type: String },
            users: { type: Array },
            teams: { type: Array },
            inputUserName: { type: String },
            inputTeamName: { type: String },
            selectedTeam: { type: String }
        };
    }

    constructor() {
        super();
        this.title = "RPG Characters";
        this.users = [];
        this.teams = [];
        this.inputUserName = '';
        this.inputTeamName = '';
        this.selectedTeam = null;
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

    createTeam() {
        if (this.users.length >= 2 && this.inputTeamName.trim()) {
            this.teams = [...this.teams, { name: this.inputTeamName.trim(), members: [...this.users] }];
            this.users = [];
            this.inputTeamName = '';
            this.makeItRain();
        }
    }

    makeItRain() {
        const confettiEl = this.shadowRoot.getElementById('confetti');
        if (confettiEl) {
            confettiEl.setAttribute('popped', '');
        }
    }

    selectTeam(teamName) {
        this.selectedTeam = teamName;
    }

    removeTeam(teamName) {
        this.teams = this.teams.filter(team => team.name !== teamName);
        if (this.selectedTeam === teamName) {
            this.selectedTeam = null;
        }
    }

    renderUserList() {
        return html`
            <ul>
                ${this.users.map(user => html`
                    <li>
                        <rpg-character seed="${user}"></rpg-character>
                        ${user}
                        <button @click="${() => this.removeUser(user)}">Remove</button>
                    </li>
                `)}
            </ul>
        `;
    }

    renderTeamList() {
        return html`
            ${this.teams.map(team => html`
                <div>
                    <button @click="${() => this.selectTeam(team.name)}">${team.name}</button>
                    <button @click="${() => this.removeTeam(team.name)}">Remove Team</button>
                </div>
            `)}
        `;
    }

    render() {
        return html`
        <confetti-container id="confetti">
            <div class="card-title">${this.title}</div>
            <input type="text" .value="${this.inputUserName}" @input="${this.inputScrub}" placeholder="Enter character name">
            <button @click="${this.addUser}">Add Character</button>
            ${this.renderUserList()}

            ${this.users.length >= 2 ? html`
                <input type="text" .value="${this.inputTeamName}" @input="${e => this.inputTeamName = e.target.value}" placeholder="Enter team name">
                <button @click="${this.createTeam}">Save Team</button>
            ` : ''}

            ${this.renderTeamList()}

            ${this.selectedTeam ? html`
                <div>
                    <h3>${this.selectedTeam}</h3>
                    <ul>
                        ${this.teams.find(team => team.name === this.selectedTeam).members.map(user => html`
                            <li>
                                <rpg-character seed="${user}"></rpg-character>
                                ${user}
                            </li>
                        `)}
                    </ul>
                </div>
            ` : ''}

            </confetti-container>
        `;
    }
}

window.customElements.define(RPGCard.tag, RPGCard);
