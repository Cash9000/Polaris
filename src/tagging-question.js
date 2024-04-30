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
        user-select: none;
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
      img {
        max-width: 100%;
        height: auto;
        margin-bottom: 16px;
      }
    `;
  }

  static get properties() {
    return {
      tags: { type: Array },
      correctAnswers: { type: Array },
      img: { type: String },
      dataUrl: { type: String, attribute: 'data-url' }, // New property for the URL of the JSON file
      question: { type: String, attribute: 'question' }
    };
  }

  static get tag() {
    return 'tagging-question';
  }

  constructor() {
    super();
    this.tags = [];
    this.correctAnswers = [];
    this.img = '';
    this.dataUrl = '';
    this.question = 'Which of the following tags apply?';
  }

  connectedCallback() {
    super.connectedCallback();
    if (this.dataUrl) {
      this.loadData();
    }
  }
// Helper function to shuffle an array (Fisher-Yates shuffle)
_shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

async loadData() {
  if (!this.dataUrl) return;
  try {
    const response = await fetch(this.dataUrl);
    if (!response.ok) {
      throw new Error('Network response was not ok.');
    }
    const data = await response.json();
    this.tags = data.map(item => ({
      tag: item.text,
      correct: item.correct,
      feedback: item.feedback
    }));
    this._shuffleArray(this.tags);  // Shuffle the tags initially
    this.correctAnswers = this.tags.filter(tag => tag.correct).map(tag => tag.tag);
  } catch (error) {
    console.error("Failed to load data:", error);
    this.tags = [];
  }
}
  clearTagStyles() {
  const tags = this.shadowRoot.querySelectorAll('.tag');
  tags.forEach(tag => {
    tag.classList.remove('correct', 'incorrect');
  });
    }

  reset() {
    this.loadData();  // Reload and reshuffle tags when resetting
      this.clearTagStyles();
    } 

toggleTag(event) {
  const tagElement = event.target.closest('.tag'); // Get the closest tag element from the click
  if (!tagElement) return; // If not clicked on a tag, do nothing
  
  const parentElement = tagElement.parentNode;
  const tagPool = this.shadowRoot.querySelector('#tag-pool');
  const answerArea = this.shadowRoot.querySelector('.answer-area');

  if (parentElement === tagPool) {
    answerArea.appendChild(tagElement); // Move tag to the answer area
  } else if (parentElement === answerArea) {
    tagPool.appendChild(tagElement); // Move tag back to the tag pool
    this.clearTagStyles(); // Clear styles when a tag is moved out of the drop zone
  }
}

render() {
  return html`
    <confetti-container id="confetti">
      <div>
        <div class="description">
          Welcome to the Tagging Interaction Module! This tool is designed to enhance learning experiences by allowing users to interact with content through a tagging system. Look at the provided image and read the accompanying question. You can either drag and drop or click on the tags to move them into the answer area based on your understanding of the content. Tags can be evaluated for correctness, and you'll receive immediate feedback on your selections. This interactive approach helps reinforce learning and improve content comprehension.
        </div>
        ${this.img ? html`<img src="${this.img}" alt="Relevant imagery">` : ''}
        <h2>${this.question}</h2>
        <div id="tag-pool" @click="${this.toggleTag}">
          ${this.tags.map(tag => html`
            <div class="tag" draggable="true" @dragstart="${this.handleDragStart}" data-tag="${tag.tag}">${tag.tag}</div>
          `)}
        </div>
        <div class="answer-area" @dragover="${this.allowDrop}" @drop="${this.handleDrop}" @click="${this.toggleTag}">
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
    event.preventDefault();
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
      const tagData = this.tags.find(t => t.tag === tagText);
      if (tagData) {
        if (tagData.correct) {
          tag.classList.add('correct');
          tag.classList.remove('incorrect');
          alert(`Correct: ${tagText} - ${tagData.feedback}`);  // Ensure feedback for correct tags
        } else {
          tag.classList.add('incorrect');
          tag.classList.remove('correct');
          allCorrect = false;
          alert(`Incorrect: ${tagText} - ${tagData.feedback}`);  // Ensure feedback for incorrect tags
        }
      } else {
        // If no data found for a tag (shouldn't happen normally), handle gracefully
        console.error("No data found for tag:", tagText);
        allCorrect = false;
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
      tagPool.appendChild(tag);
    });
  }
}

globalThis.customElements.define(TaggingQuestion.tag, TaggingQuestion);
