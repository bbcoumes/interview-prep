function Element(val) {
  this.val = val;
  this.prev = null;
}

function Stack() {
  this.tail = null;
}

Stack.prototype.push = function(val) {
  var elem = new Element(val); // Create a new node

  // ! Check that the elem was created successfully
  if (!elem) {
    return null;
  }

  // If the stack is empty, set the tail
  if (Stack.tail === null) {
    Stack.tail = elem;
  } else {
  // Stack is not empty, so set the current tail as the new element's prev
  // and update the stack's tail
    elem.prev = this.tail;
    this.tail = elem;  
  }
  return this;
}

Stack.prototype.pop = function() {
  var lastElem = this.tail; // Save the old tail
  if (lastElem) {
    this.tail = lastElem.prev; // Update the stack's tail
  }
  return lastElem;
}
