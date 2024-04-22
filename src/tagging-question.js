import { LitElement, html, css } from 'lit';
import '@lrnwebcomponents/multiple-choice/lib/confetti-container.js';

export class TaggingQuestion extends LitElement {
  static get styles() {
    return css`
      :host {
        display: block;
        padding: 16px;
      }
      .tag {
        display: inline-block;
        padding: 8px;
        margin: 4px;
        background-color: lightgrey;
        border-radius: 8px;
        cursor: pointer;
        user-select: none; /* Prevents selection while dragging */
      }
      .answer-area {
        min-height: 50px;
        border: 2px dashed grey;
        margin-top: 16px;
        padding: 8px;
        border-radius: 8px;
        display: flex;
        flex-wrap: wrap;
        align-items: flex-start;
        justify-content: flex-start;
      }
      .correct {
        border: 2px solid green;
      }
      .incorrect {
        border: 2px solid red;
      }
    `;
  }

  static get properties() {
    return {
      tags: { type: Array },
      correctAnswers: { type: Array }
    };
  }

  static get tag() {
    return 'tagging-question';
  }

  constructor() {
    super();
    this.tags = [
      { text: 'good form', correct: true, feedback: 'The shape of the vase clearly demonstrates craftsmanship' },
      { text: 'poor taste', correct: false, feedback: 'Taste is in the eye of the designer as well as the viewer.' },
      { text: 'contrasting themes', correct: false, feedback: 'There is uniformity in the shape, but there is no depth to this media to imply that it is contrasting with other figures.' },
      { text: 'AI', correct: true, feedback: 'While a modification of prior work, this is still AI generative work.' },
      { text: 'shading', correct: false, feedback: 'While there is a light source and a shadow cast, shading is a term used for pencil based sketching' },
      { text: 'original work', correct: true, feedback: 'This character is not based on any person, place, or existing trope' },
      { text: 'accessible', correct: false, feedback: 'The color scheme while high contrast in some areas, loses form in others and has written text unrelated to the character' }
    ];
    this.correctAnswers = this.tags.filter(tag => tag.correct).map(tag => tag.text);
  }

  render() {
    return html`
      <confetti-container id="confetti">
        <div>
          <h2>Which of the following tags apply?</h2>
          <div id="tag-pool" @dragstart="${this.handleDragStart}">
            ${this.tags.map(tag => html`
              <div class="tag" draggable="true" data-tag="${tag.text}">${tag.text}</div>
            `)}
          </div>
          <div class="answer-area" @dragover="${this.allowDrop}" @drop="${this.handleDrop}">
            Drop tags here
          </div>
          <button @click="${this.checkAnswers}">Check Answer</button>
          <button @click="${this.reset}">Reset</button>
        </div>
      </confetti-container>
    `;
  }

  handleDragStart(event) {
    event.dataTransfer.setData("text", event.target.getAttribute('data-tag'));
  }

  allowDrop(event) {
    event.preventDefault(); // Necessary to allow dropping
  }

  handleDrop(event) {
    event.preventDefault();
    const data = event.dataTransfer.getData("text");
    const draggableElement = this.shadowRoot.querySelector(`[data-tag="${data}"]`);
    const dropZone = event.target;
    if (dropZone.classList.contains('answer-area')) {
      dropZone.appendChild(draggableElement);
    }
  }

  checkAnswers() {
    const answerArea = this.shadowRoot.querySelector('.answer-area');
    const selectedTags = Array.from(answerArea.children);
    let allCorrect = true;

    selectedTags.forEach(tag => {
      const tagText = tag.getAttribute('data-tag');
      const tagData = this.tags.find(t => t.text === tagText);
      if (tagData.correct) {
        tag.classList.add('correct');
        tag.classList.remove('incorrect');
      } else {
        tag.classList.add('incorrect');
        tag.classList.remove('correct');
        allCorrect = false;
        alert(tagData.feedback); // Show feedback for incorrect tags
      }
    });

    if (allCorrect && selectedTags.length === this.correctAnswers.length) {
      this.shadowRoot.querySelector('#confetti').setAttribute('popped', '');
    }
  }

  reset() {
    const tagPool = this.shadowRoot.querySelector('#tag-pool');
    const answerArea = this.shadowRoot.querySelector('.answer-area');
    answerArea.querySelectorAll('.tag').forEach(tag => {
      tag.classList.remove('correct', 'incorrect');
      tagPool.appendChild(tag); // Move all tags back to the pool
    });
  }
}

// Register the custom element with the tag defined in the static getter
globalThis.customElements.define(TaggingQuestion.tag, TaggingQuestion);
