'use strict';
const Node = require('./Node');

function treeHeight(node) {
  var lHeight = 0,
      rHeight = 0;    

  if (!(node.left || node.right)) {
    return 1;
  }

  if (node.left) {
    lHeight = treeHeight(node.left);
  }
  if (node.right) {
    rHeight = treeHeight(node.right);
  }

  var height = 1 + Math.max(lHeight, rHeight)
  return height;
}

function preorder(node) {
  if (!node) {
    return;
  }

  // Print the node
  console.log(node.data);
  preorder(node.left);
  preorder(node.right);
}

// Returns an array representing the preorder traversal of a tree
// without using recursion
function nonRecursivePreorder(node) {
  var results = [];
  var stack = [];

  stack.push(node);

  while (stack.length > 0) {
    var currNode = stack.pop();
    results.push(currNode.val);

    if (currNode.right) {
      stack.push(currNode.right);
    }
    if (currNode.left) {
      stack.push(currNode.left);
    }
  }
  return results;
}

function test() {
  // leaf: (1)
  var leaf = new Node(1);
  // leftOnly: (2) -> (1,)
  var leftOnly = new Node(2);
  leftOnly.left = leaf;
  // medTree: (3) -> ((2) -> (1,), (1))
  var medTree = new Node(3);
  medTree.right = leaf;
  medTree.left = leftOnly;
  var bigTree = new Node(100);
  bigTree.left = new Node(50);
  bigTree.right = new Node(150);
  bigTree.left.left = new Node(25);
  bigTree.left.right = new Node(75);
  bigTree.right.left = new Node(125);
  bigTree.right.right = new Node(175);
  bigTree.right.left.left = new Node(110);


  testHeight();
  testPreorder();

  function testHeight() {
    var pass1 = treeHeight(leaf) == 1;
    var pass2 = treeHeight(leftOnly) == 2;
    var pass3 = treeHeight(medTree) == 3;

    console.log('testHeight()');
    console.log([pass1, pass2, pass3]);
  }

  function testPreorder() {
    preorder(leaf);
    console.log("\n");
    preorder(leftOnly);
    console.log("\n");
    preorder(medTree);
    console.log("\n");
    preorder(bigTree);
  }
}

test();