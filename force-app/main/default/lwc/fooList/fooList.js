import { LightningElement } from 'lwc';

// Apex
import getFoos from "@salesforce/apex/FooController.getFoos";

export default class FooList extends LightningElement {
  /** @type { string[] } */
  foos = [];
  async connectedCallback() {
    this.foos = await getFoos();
  }
}