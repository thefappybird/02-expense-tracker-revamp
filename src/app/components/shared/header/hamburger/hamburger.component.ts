import { Component } from '@angular/core';

@Component({
  selector: 'app-hamburger',
  imports: [],
  template: ` <svg
    fill="var(--color-main)"
    width="40px"
    height="40px"
    viewBox="0 0 1024 1024"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M768 306.2V383H256v-76.8h512zM256 536.6h512v-76.8H256v76.8zm0 153.6h512v-76.8H256v76.8z"
      fill-rule="evenodd"
    />
  </svg>`,
})
export class HamburgerComponent {}
