import { Component } from 'react';
import { createPortal } from 'react-dom';
import css from './Modal.module.css';

// Caută modalul pentru a-l adăuga dinamic în arborele DOM al paginii
const modalRoot = document.querySelector('#modal-root');

export class Modal extends Component {
  // Înregistrează un handler pentru evenimentul keydown pe fereastra browserului
  componentDidMount() {
    window.addEventListener('keydown', this.keyDown); // când se apasă tasta Escape, se apelează funcția keyDown
  }

  keyDown = evt => {
    // verifică codul tastei
    if (evt.code === 'Escape') {
      this.props.closeModal(); // închide modalul
    }
  };

  componentWillUnmount() {
    window.removeEventListener('keydown', this.keyDown); // elimină handlerul evenimentului keydown de pe fereastra browserului
  }

  // închiderea modalului la clic pe fundal
  handleClose = evt => {
    // verifică dacă clicul a fost pe fundal
    if (evt.currentTarget === evt.target) {
      this.props.closeModal(); // închide modalul
    }
  };

  render() {
    return createPortal(
      <div onClick={this.handleClose} className={css.Overlay}>
        <div className={css.Modal}>{this.props.children}</div>{' '}
        {/* randarea elementelor copil */}
      </div>,
      modalRoot
    );
  }
}
