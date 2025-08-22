// append(value) adds a new node containing value to the end of the list
//     prepend(value) adds a new node containing value to the start of the list
//     size returns the total number of nodes in the list
//     head returns the first node in the list
//     tail returns the last node in the list
//     at(index) returns the node at the given index
//     pop removes the last element from the list
//     contains(value) returns true if the passed in value is in the list and otherwise returns false.
//     find(value) returns the index of the node containing value, or null if not found.
//     toString represents your LinkedList objects as strings, so you can print them out and preview them in the console. The format should be: ( value ) -> ( value ) -> ( value ) -> null
//     insertAt(value, index) that inserts a new node with the provided value at the given index.
//     removeAt(index) that removes the node at the given index.

class Node {
  #value;
  key;
  #next;
  constructor(key, value) {
    this.key = key;
    this.#value = value;
    this.#next = null;
  }
  get value() {
    return this.#value;
  }
  set value(val) {
    this.#value = val;
  }
  get next() {
    return this.#next;
  }
  set next(nextNode) {
    this.#next = nextNode;
  }
}

export class LinkedList {
  #head;
  #size;
  constructor() {
    this.#head = null;
    this.#size = 0;
  }

  get size() {
    return this.#size;
  }

  get head() {
    return this.#head;
  }

  get tail() {
    let currentNode = this.head;
    while (currentNode.next) {
      currentNode = currentNode.next;
    }
    return currentNode;
  }

  findValue(val) {
    if (this.size === 0) {
      return -2; // Not found, empty list
    }
    let currentNode = this.head;
    let counter = 0;
    while (counter < this.size) {
      // We are not using strict check as we want to allow users to enter any data type as value.
      if (currentNode.value == val) {
        return counter;
      }
      currentNode = currentNode.next;
      counter++;
    }
    return -1; //Not found
  }

  findKey(key) {
    if (this.size === 0) {
      return -1; // Not found, empty list
    }
    let currentNode = this.head;
    let counter = 0;
    while (counter < this.size) {
      // We are not using strict check as we want to allow users to enter any data type as value.
      if (currentNode.key == key) {
        return counter;
      }
      currentNode = currentNode.next;
      counter++;
    }
    return -1; //Not found
  }
  at(index) {
    if (index < 0 || index >= this.size) {
      return null;
    }
    let currentNode = this.head;
    for (let i = 0; i < index; i++) {
      currentNode = currentNode.next;
    }
    return currentNode;
  }
  containsValue(val) {
    let currentNode = this.#head;
    while (currentNode.next) {
      if (currentNode.value == val) {
        return true;
      }
      currentNode = currentNode.next;
    }
    if (currentNode.value == val) {
      return true;
    }
    return false;
  }
  containsKey(key) {
    let currentNode = this.#head;
    while (currentNode.next) {
      if (currentNode.key == key) {
        return true;
      }
      currentNode = currentNode.next;
    }
    if (currentNode.key == key) {
      return true;
    }
    return false;
  }

  toString() {
    let str = "";
    let currentNode = this.head;
    while (currentNode) {
      str += `( ${currentNode.key}: ${currentNode.value} ) -> `;
      currentNode = currentNode.next;
    }
    return str + "null";
  }

  toArray() {
    let returnArray = [];
    let currentNode = this.head;
    if (this.size === 0) {
      return [];
    }

    if (this.size === 1) {
      returnArray.push([currentNode.key, currentNode.value]);
      return returnArray;
    }
    while (currentNode.next) {
      returnArray.push([currentNode.key, currentNode.value]);
      currentNode = currentNode.next;
    }
    returnArray.push([currentNode.key, currentNode.value]);
    return returnArray;
  }

  toArrayKeys() {
    let returnArray = [];
    let currentNode = this.head;
    if (this.size === 0) {
      return [];
    }

    if (this.size === 1) {
      returnArray.push(currentNode.key);
      return returnArray;
    }
    while (currentNode.next) {
      returnArray.push(currentNode.key);
      currentNode = currentNode.next;
    }
    returnArray.push(currentNode.key);
    return returnArray;
  }

  toArrayValues() {
    let returnArray = [];
    let currentNode = this.head;
    if (this.size === 0) {
      return [];
    }

    if (this.size === 1) {
      returnArray.push(currentNode.value);
      return returnArray;
    }
    while (currentNode.next) {
      returnArray.push(currentNode.value);
      currentNode = currentNode.next;
    }
    returnArray.push(currentNode.value);
    return returnArray;
  }

  append(key, value) {
    let newNode = new Node(key, value);
    if (!this.head) {
      this.#head = newNode;
      this.#size++;
    } else {
      let currentNode = this.head;
      while (currentNode.next) {
        currentNode = currentNode.next;
      }
      currentNode.next = newNode;
      this.#size++;
    }
    return true;
  }

  prepend(key, value) {
    let newNode = new Node(key, value);
    newNode.next = this.#head;
    this.#head = newNode;
    this.#size++;
    return true;
  }

  insertAt(key, val, index) {
    if (index > this.size || index < 0) {
      return false;
    }
    if (index === 0) {
      this.prepend(key, val);
      return true;
    }
    if (index === this.size) {
      this.append(key, val);
      return true;
    }
    let counter = 0;
    let currentNode = this.head;
    let tmpNode = new Node(key, val);
    while (currentNode.next) {
      if (counter === index - 1) {
        tmpNode.next = currentNode.next;
        currentNode.next = tmpNode;
        this.#size++;
        return true;
      }
      currentNode = currentNode.next;
      counter++;
    }
    return false;
  }

  removeAt(index) {
    let counter = 0;
    let currentNode = this.head;
    if (index < 0) {
      return false;
    }
    if (index >= this.#size) {
      return false;
    }
    if (index === 0) {
      this.#head = this.#head.next;
      this.#size--;
      return true;
    }
    while (currentNode) {
      if (counter === index - 1) {
        currentNode.next = currentNode.next.next;
        this.#size--;
        return true;
      }
      currentNode = currentNode.next;
      counter++;
    }
    return false;
  }

  pop() {
    let currentNode = this.head;
    let index = 0;
    if (this.size === 0) {
      return false;
    }
    if (this.size === 1) {
      this.#head = null;
      this.#size = 0;
      return true;
    }
    while (currentNode.next) {
      if (index === this.size - 2) {
        currentNode.next = null;
        this.#size--;
        return true;
      }
      currentNode = currentNode.next;
      index++;
    }
    return false;
  }

  shift() {
    if (this.size === 0) {
      return false;
    }
    this.#head = this.#head.next;
    this.#size--;
    return true;
  }
}
