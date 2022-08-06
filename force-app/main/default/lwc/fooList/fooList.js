import { LightningElement } from "lwc";

// Apex
import getFoos from "@salesforce/apex/FooController.getFoos";

export default class FooList extends LightningElement {
  /** @type { string[] } */
  foos = [];
  finishedLoading = false;
  async connectedCallback() {
    const newFoos = await getFoos();
    console.log(
      `newFoos`,
      JSON.parse(
        JSON.stringify(newFoos || { warn: "object is false/null/undefined" })
      )
    );
    this.foos = newFoos;
    this.finishedLoading = true;
  }
}
