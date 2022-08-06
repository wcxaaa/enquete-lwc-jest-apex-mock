/* eslint-disable no-unused-vars */
import { createElement } from "lwc";
import FooList from "c/fooList";

// Apex
import getFoos from "@salesforce/apex/FooController.getFoos";

// Mocking imperative Apex method call
jest.mock(
  "@salesforce/apex/FooController.getFoos",
  () => {
    return {
      default: jest.fn(() => Promise.resolve())
    };
  },
  { virtual: true }
);

describe("c-foo-list", () => {
  afterEach(() => {
    // The jsdom instance is shared across test cases in a single file so reset the DOM
    while (document.body.firstChild) {
      document.body.removeChild(document.body.firstChild);
    }
    // restore the spy created with spyOn
    jest.restoreAllMocks();
  });

  test("Get my foos", async () => {
    // Arrange
    getFoos.mockReturnValue(
      new Promise((resolve, _) =>
        resolve(["foo-test-1", "foo-test-2", "foo-test-3"])
      )
    );

    const element = createElement("c-foo-list", {
      is: FooList
    });

    // Act
    document.body.appendChild(element);

    // Wait for async DOM changes in connectedCallback() to complete
    await new Promise(process.nextTick);

    /** @type {HTMLUListElement} */
    const ul = element.shadowRoot.querySelector("ul.fooList");

    // Assert
    expect(ul.childNodes.length).toBe(3);
  });

  test("Get my foos 2", async () => {
    // Arrange
    getFoos.mockReturnValue(
      new Promise((resolve, _) => resolve(["foo-test-1"]))
    );

    const element = createElement("c-foo-list", {
      is: FooList
    });

    // Act
    document.body.appendChild(element);

    // Wait for async DOM changes in connectedCallback() to complete
    await new Promise(process.nextTick);

    /** @type {HTMLUListElement} */
    const ul = element.shadowRoot.querySelector("ul.fooList");

    // Assert
    expect(ul.childNodes.length).toBe(1);
  });
});
