import createElement from '../../assets/lib/create-element.js';

export default class Modal {
  constructor() {
    this.modal = document.createElement('div');
    this.modal.className = 'modal';
    this.modal.innerHTML = `
      <div class="modal__overlay"></div>
      <div class="modal__inner">
        <div class="modal__header">
          <button type="button" class="modal__close">
            <img src="/assets/images/icons/cross-icon.svg" alt="close-icon" />
          </button>
          <h3 class="modal__title"></h3>
        </div>
        <div class="modal__body"></div>
      </div>
    `;

    this._setupEventListeners();
  }

  _setupEventListeners() {
    const closeButton = this.modal.querySelector('.modal__close');
    closeButton.addEventListener('click', () => this.close());

    this._keydownHandler = (event) => {
      if (event.code === 'Escape') {
        this.close();
      }
    };
  }

  open() {
    document.body.append(this.modal);

    document.body.classList.add('is-modal-open');

    document.addEventListener('keydown', this._keydownHandler);
  }

  setTitle(title) {
    const titleElement = this.modal.querySelector('.modal__title');
    titleElement.textContent = title;
  }

  setBody(node) {
    const bodyElement = this.modal.querySelector('.modal__body');
    bodyElement.innerHTML = '';
    bodyElement.append(node);
  }

  close() {
    document.body.classList.remove('is-modal-open');

    document.removeEventListener('keydown', this._keydownHandler);

    this.modal.remove();
  }
}