function LinkedList() {
  this.head = null;
  this.tail = null;
}

function Node(data) {
  this.data = data;
  this.next = null;
}

LinkedList.prototype.push = function(val) {
  var node = new Node(val);

  if (!this.head) {
    this.head = node;
    this.tail = node;
  } else {
    var current = this.head;
    while (current.next) {
      current = current.next;
    }
    current.next = node;
    this.tail = node;
  }
};

LinkedList.prototype.find = function(val) {
  var current = this.head;
  while (current !== null && current.data !== val) {
    current = current.next;
  }
  return current;
};

LinkedList.prototype.remove = function(elem) {
  if (!elem) {
    return false;
  }

  if (elem == this.head) {
    this.head = elem.next;
    if (!this.head) {
      this.tail = null;
    }
    return true;
  } else {
    var current = this.head;
    while (current) {
      if (current.next == elem) {
        current.next = elem.next;
        if (current.next === null) {
          this.tail = current;
        }
        return true;
      }
      current = current.next;
    }
    return false;
  }
};

LinkedList.prototype.insertAfter = function(elem, data) {
  if (data === null) {
    return false;
  }

  var newElem = Node(data);
  // Insert the new node at the head
  if (!elem) {
    newElem.next = this.head.next;
    this.head = newElem;

    if (!this.tail) {
      this.tail = newElem;
    }
    return true;
  }

  var current = this.head;
  while (current) {
    if (current == elem) {
      elem.next = current.next;
      current.next = elem;

      if (!elem.next) {
        this.tail = elem;
      }
      return true;
    }
    current = current.next;
  }
  return false;
};

var sll = new LinkedList();
sll.push(1);
sll.push(2);
sll.push(3);
sll.push(4);
var elem3 = sll.find(3);
sll.remove(elem3);


