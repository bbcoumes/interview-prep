'use strict';

function htmlNode() {
  this.value = null;
  this.isTag = null;
  this.children = null;
}

function compareHtml(root1, root2) {
  let stack1 = [root1];
  let stack2 = [root2];

  while (stack1.length > 0 && stack2.length > 0) {
    let curr1 = stack1.pop();
    let curr2 = stack2.pop();

    console.log("Curr 1 value: " + curr1.value);
    console.log("Curr 2 value: " + curr2.value);

    // Get string elements
    while (curr1.isTag) {
      pushArray(stack1, curr1.children);
      curr1 = stack1.pop()
      if (!curr1.children) {
        break;
      }
    }
    console.log("Curr 1 value: " + curr1.value);
    while (curr2.isTag) {
      pushArray(stack2, curr2.children);
      curr2 = stack2.pop();
      if (!curr2.children) {
        break;
      }
    }
    console.log("Curr 2 value: " + curr2.value);

    // We've reached the end of both html doms without finding strings
    if (curr1.isTag && curr2.isTag) {
      return true;
    }

    // One of the html doms contained a string while the other did not
    if (curr1.isTag !== curr2.isTag) {
      return false;
    }

    // Compare strings
    let len1 = curr1.value.length;
    let len2 = curr2.value.length;
    if (len1 > len2) {
      if (curr1.value.substring(0,len2) === curr2.value) {
        let node = new htmlNode();
        node.value = curr1.value.substring(len2);
        node.isTag = false;
        stack1.push(node);
      } else {
        return false;
      }
    } else if (len2 > len1) {
      if (curr2.value.substring(0,len1) === curr1.value) {
        let node = new htmlNode();
        node.value = curr2.value.substring(len1);
        node.isTag = false;
        stack2.push(node);
      } else {
        return false;
      }
    } else {
      return (curr1.value === curr2.value);
    }
  }
  return true;
}

function pushArray(stack, arr) {
  if (!arr) {
    return stack;
  }
  for (let i = 0; i < arr.length; i++) {
    stack.push(arr[i]);
  }
  return stack;
}

function test() {
  let html1 = new htmlNode();
  html1.value = "<html>";
  html1.isTag = true;

  let p1 = new htmlNode();
  p1.value = "<p>";
  p1.isTag = true;

  let hello = new htmlNode();
  hello.value = "hello";
  hello.isTag = false;

  let p1Close = new htmlNode();
  p1Close.value = "</p>";
  p1Close.isTag = true;

  let htmlClose = new htmlNode();
  htmlClose.value = "</html>";
  htmlClose.isTag = true;

  p1.children = [p1Close, hello];
  html1.children = [htmlClose, p1];

  /////////////////////////////////

  let html2 = new htmlNode();
  html2.value = "<html>";
  html2.isTag = true;

  let p2 = new htmlNode();
  p2.value = "<p>";
  p2.isTag = true;

  let he = new htmlNode();
  he.value = "he";
  he.isTag = false;

  let span = new htmlNode();
  span.value = "<span>";
  span.isTag = true;

  let llo = new htmlNode();
  llo.value = "llo";
  llo.isTag = false;

  let spanClose = new htmlNode();
  spanClose.value = "</span>";
  spanClose.isTag = true;

  let p2Close = new htmlNode();
  p2Close.value = "</p>";
  p2Close.isTag = true;

  span.children = [spanClose, llo];
  p2.children = [p2Close, span, he];
  html2.children = [htmlClose, p2];

  console.log(compareHtml(html1, html2));
}

test();