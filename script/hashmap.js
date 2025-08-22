import { LinkedList } from "./linkedlist.js";

class HashMap {
  #load = 0;
  #capacity;
  #criticalLoad = 0; //critical load % as a fraction, which can be determined by user
  hashTable = [];
  constructor(capacity = 16, maxLoad = 0.75) {
    let hashTable = new Array(this.#capacity);
    this.#criticalLoad = maxLoad >= 0 ? 0.75 : maxLoad; // if user specifies, 0 or a whole number, criticalLoad is set to 0.8 (80%)
    this.#capacity = capacity >= 8 ? capacity : 16;
    console.log(hashTable);
  }

  #checkLoad() {
    if (this.#load / this.#capacity >= this.#criticalLoad) {
      this.addCapacity();
    }
  }

  #hash(str, capacity) {
    // FNV offset basis
    let hash = 2166136261;
    for (let i = 0; i < str.length; i++) {
      hash ^= str.charCodeAt(i);
      // FNV prime, keep 32-bit unsigned
      hash = (hash * 16777619) >>> 0;
    }
    return hash % capacity;
  }

  //Doubles the capacity of hash table when it reaches critical load
  #addCapacity() {
    let newCapacity = this.#capacity * 2;
    this.#rehash(newCapacity);
  }

  #rehash(newCapacity) {
    let newTable = new Array(newCapacity);
    //Rehash all the keys

    this.hashTable = newTable;
  }

  //set(key, value) takes two arguments: the first is a key, and the second is a value that is
  // assigned to this key. If a key already exists, then the old value is overwritten, and we
  // can say that we update the key’s value (e.g. Carlos is our key but it is called twice:
  // once with value I am the old value., and once with value I am the new value.. Following
  // this logic, Carlos should contain only the latter value). Recall that collisions occur when
  // TWO DIFFERENT keys generate the same hash code and get
  // assigned to the same bucket. (e.g. Rama and Sita are both hashed to 3, so 3 becomes a
  // location for Rama AND Sita. However, we know that this is not an update because the keys
  // are different). Review the dealing with collisions section of the previous lesson to find
  // a way to handle our collisions.
  //Remember to grow your buckets to double their capacity when your hash map reaches the load
  // factor. The methods mentioned later in this assignment can help you handle the growth
  // logic, so you may want to implement this feature near the end. However, we mention this
  // with set() because it’s important to grow buckets exactly as they are being expanded.
  set(key, value) {
    let index = this.#hash(key, this.#capacity);
    if (this.hashTable[index] === undefined) {
      this.hashTable[index] = new LinkedList();
    }
    let currentNode = this.hashTable[index].head;
    while (currentNode.next) {
      if (currentNode.key === key) {
        break;
      }
      currentNode = currentNode.next;
    }
    if (currentNode.key === key) {
      currentNode.value === value;
      console.log(`Value of ${key} updated with ${value}`);
      return true;
    } else {
      this.hashTable[index].append(key, value);
      return true;
    }
  }

  //get(key) takes one argument as a key and returns the value that is assigned to this key.
  // If a key is not found, return null.
  get(key) {
    let index = this.#hash(key, this.#capacity);
    if (
      this.hashTable[index] === undefined ||
      this.hashTable[index].size === 0
    ) {
      return null;
    }
    let node = null;
    let idx = this.hashTable[index].findKey(key);
    if (idx) {
      node = this.hashTable[index].at(idx);
    }
    if (node) {
      return node.value;
    }
    return null;
  }

  //has(key) takes a key as an argument and returns true or false based on whether or not the
  // key is in the hash map.
  has(key) {
    let index = this.#hash(key, this.#capacity);
    if (this.hashTable[index].findKey(key)) {
      return true;
    }
    return false;
  }

  //remove(key) takes a key as an argument. If the given key is in the hash map, it should
  // remove the entry with that key and return true. If the key isn’t in the hash map, it
  // should return false.
  remove(key) {
    let index = this.#hash(key, this.#capacity);
    let idx = this.hashTable[index].findKey(key);
    if (idx) {
      return this.hashTable[index].removeAt(idx);
    }
    return false;
  }

  //length() returns the number of stored keys in the hash map.
  length() {
    let size = 0;
    for (let i = 0; i < this.#capacity; i++) {
      if (this.hashTable[i]) {
        size += this.hashTable[i].size;
      }
    }
    return size;
  }

  //clear() removes all entries in the hash map.
  clear() {
    for (let i = 0; i < this.#capacity; i++) {
      this.hashTable[i] = undefined;
    }
    return true;
  }

  //keys() returns an array containing all the keys inside the hash map.
  keys() {
    let masterArray = [];
    for (let i = 0; i < this.#capacity; i++) {
      if (this.hashTable[i]) {
        masterArray.push(...this.hashTable[i].toArrayKeys());
      }
    }
    return masterArray;
  }

  //values() returns an array containing all the values.
  values() {
    let masterArray = [];
    for (let i = 0; i < this.#capacity; i++) {
      if (this.hashTable[i]) {
        masterArray.push(...this.hashTable[i].toArrayValues());
      }
    }
    return masterArray;
  }

  //entries() returns an array that contains each key, value pair. Example: [[firstKey, firstValue]
  // , [secondKey, secondValue]]
  entries() {
    let masterArray = [];
    for (let i = 0; i < this.#capacity; i++) {
      if (this.hashTable[i]) {
        masterArray.push(...this.hashTable[i].toArray());
      }
    }
    return masterArray;
  }
}
