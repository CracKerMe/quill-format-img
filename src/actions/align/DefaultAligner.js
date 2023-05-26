// @flow

import { Aligner } from './Aligner';
import type { Alignment } from './Alignment';
import type { AlignOptions } from '../../Options';

const LEFT_ALIGN = 'left';
const CENTER_ALIGN = 'center';
const RIGHT_ALIGN = 'right';
const SET_LINK = 'setlink';

export default class DefaultAligner implements Aligner {
  alignments: { [string]: Alignment };
  alignAttribute: string;
  applyStyle: boolean;

  constructor(options: AlignOptions, quill: any) {
    this.applyStyle = options.aligner.applyStyle;
    this.alignAttribute = options.attribute;
    this.alignments = {
      [LEFT_ALIGN]: {
        name: LEFT_ALIGN,
        icon: options.icons.left,
        apply: (el: HTMLElement) => {
          this.setAlignment(el, LEFT_ALIGN);
          this.setStyle(el, 'inline', 'left', '0 1em 1em 0');
        },
      },
      [CENTER_ALIGN]: {
        name: CENTER_ALIGN,
        icon: options.icons.center,
        apply: (el: HTMLElement) => {
          this.setAlignment(el, CENTER_ALIGN);
          this.setStyle(el, 'block', null, 'auto');
        },
      },
      [RIGHT_ALIGN]: {
        name: RIGHT_ALIGN,
        icon: options.icons.right,
        apply: (el: HTMLElement) => {
          this.setAlignment(el, RIGHT_ALIGN);
          this.setStyle(el, 'inline', 'right', '0 0 1em 1em');
        },
      },
      [SET_LINK]: {
        name: SET_LINK,
        icon: options.icons.setlink,
        apply: (el: HTMLElement) => {
          this.showLinkSet(el, quill);
          quill.root.click();
          quill.update();
        },
      },
    };
  }

  showLinkSet(el, quill) {
    const originEl = el;
    if (document.querySelector('#insertLink')) {
      document.querySelector('#insertLink').style.display = 'block';
    } else {
      const tempUI = `
      <div class="insert-link-box poa">
        <ul>
          <li><label>
            <p><i class="iconengage engage-fuzhilianjie link-box-icon"></i></p>
            <input type="text" placeholder="Paste or type Link here">
          </label></li>
        </ul>
        <div class="insert-link-save" style="float: right;"><p>Cancel</p><button>Save Link</button>
        </div>
      </div>`;
      const tempDiv = document.createElement('div');
      tempDiv.id = 'insertLink';
      tempDiv.innerHTML = tempUI;
      quill.root.parentNode.appendChild(tempDiv);
    }
    const inputRef = document.querySelector('#insertLink input');
    const saveBtn = document.querySelector('.insert-link-save button');
    saveBtn.innerText = 'Save Link';
    if (originEl.getAttribute('data-link')) {
      inputRef.value = originEl.getAttribute('data-link');
      saveBtn.classList.add('active');
    } else {
      inputRef.value = 'https://';
      saveBtn.classList.remove('active');
    }
    saveBtn.onclick = () => {
      if (!saveBtn.classList.contains('active')) {
        return;
      }
      const link = inputRef.value;
      originEl.setAttribute('data-link', link);
      document.querySelector('#insertLink').style.display = 'none';
      inputRef.value = 'https://';
      quill.getSelection(true);
    };
    inputRef.onkeyup = () => {
      if (!inputRef.value) {
        saveBtn.innerText = 'Remove Link';
      } else {
        saveBtn.innerText = 'Save Link';
      }
      if (inputRef.value === 'https://') {
        saveBtn.classList.remove('active');
      } else {
        saveBtn.classList.add('active');
      }
    };
    const cancelBtn = document.querySelector('.insert-link-save p');
    cancelBtn.onclick = () => {
      document.querySelector('#insertLink').style.display = 'none';
      inputRef.value = 'https://';
    };
    document.addEventListener('keyup', (e) => {
      if (e.keyCode === 27) {
        document.querySelector('#insertLink').style.display = 'none';
        inputRef.value = 'https://';
      }
    });
  }

  getAlignments(): Alignment[] {
    return Object.keys(this.alignments).map(k => this.alignments[k]);
  }

  clear(el: HTMLElement): void {
    el.removeAttribute(this.alignAttribute);
    this.setStyle(el, null, null, null);
  }

  isAligned(el: HTMLElement, alignment: Alignment): boolean {
    return el.getAttribute(this.alignAttribute) === alignment.name;
  }

  setAlignment(el: HTMLElement, value: string) {
    el.setAttribute(this.alignAttribute, value);
  }

  setStyle(el: HTMLElement, display: ?string, float: ?string, margin: ?string) {
    if (this.applyStyle) {
      el.style.setProperty('display', display);
      el.style.setProperty('float', float);
      el.style.setProperty('margin', margin);
      document.querySelector('#insertLink').style.display = 'none';
    }
  }
}
