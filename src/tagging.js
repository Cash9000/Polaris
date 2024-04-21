import { LitElement, html, css } from 'lit';

export class Tagging extends LitElement {
  static get tag() {
    return 'tagging';
  }

  static get styles() {
    return css`
      :host {
        display: block;
        padding: 16px;
        box-sizing: border-box;
      }
      .image-box {
        border: 1px solid black;
        height: 200px;
        margin-bottom: 16px;
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: #f0f0f0; /* Placeholder style */
      }
      .question-box {
        border: 1px solid black;
        padding: 8px;
        margin-bottom: 16px;
      }
      .tags-container {
        display: flex;
        flex-wrap: wrap;
        gap: 10px;
        margin-bottom: 16px;
      }
      .tag {
        border: 1px solid black;
        padding: 8px;
        cursor: pointer;
        user-select: none;
      }
      .answer-box {
        border: 1px solid black;
        min-height: 100px;
        padding: 8px;
        margin-bottom: 16px;
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: #f0f0f0; /* Placeholder style */
      }
      .button-container {
        display: flex;
        justify-content: space-between;
      }
      button {
        padding: 8px 16px;
        cursor: pointer;
      }
    `;
  }

  render() {
    return html`
      <div class="image-box">Image Box</div>
      <div class="question-box">Which of the following big ideas would YOU associate with this artistic work?</div>
      <div class="tags-container">
        <div class="tag">good form</div>
        <div class="tag">poor taste</div>
        <div class="tag">contrasting themes</div>
        <div class="tag">AI</div>
        <div class="tag">shading</div>
        <div class="tag">original work</div>
        <div class="tag">accessible</div>
      </div>
      <div class="answer-box">Tag Answer Box (Drag Tags Into Here)</div>
      <div class="button-container">
        <button>Check Answer</button>
        <button>Reset</button>
      </div>
    `;
  }
}

// Define the new element
globalThis.customElements.define(Tagging.tag, Tagging);
