function quickSort(items, l, r) {
  l = l || 0;
  r = r || items.length - 1;

  if (items.length <= 1) {
    return items;
  }

  // Arrange the array elements around a middle element and return the partition
  var p = partition(items, l, r) ;

  // Recursively sort the L and R subarrays, but only if the partition is to the
  //    right of the left index, or to the left of the right index
  if (l < p - 1) {
    quickSort(items, l, p - 1);
  }
  if (r > p) {
    quickSort(items, p, r);
  }

  return items;
}

function partition(items, l, r) {
  var m = items[Math.floor((l + r)/2)];
  var i = l;
  var j = r;

  // Start moving indicators at the extremes of the array towards the middle
  // We are looking for elements that need to be swapped
  while (i <= j) {
    while (items[i] < m) {
      i++;
    }
    while (items[j] > m) {
      j--;
    }
    swap(items, i, j);
    i++;
    j--;
  }

  return i;
}

function swap(items, i, j) {
  if (i != j) {
    var tmp = items[i];
    items[i] = items[j];
    items[j] = tmp;
  }
}
