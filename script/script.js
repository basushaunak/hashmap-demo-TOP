// JS Scripts
import { HashMap } from "./hashmap.js";
window.onload = () => {
  let test = new HashMap();
  test.set("apple", "red");
  test.set("banana", "yellow");
  test.set("carrot", "orange");
  test.set("dog", "brown");
  test.set("elephant", "gray");
  test.set("frog", "green");
  test.set("grape", "purple");
  test.set("hat", "black");
  test.set("ice cream", "white");
  test.set("jacket", "blue");
  test.set("kite", "pink");
  test.set("lion", "golden");
  console.log(test);
  test.set("frog", "blue");
  test.set("dog", "black");
  test.set("ice cream", "chocolate");
  test.set('moon', 'silver')
  console.log(test);

};
