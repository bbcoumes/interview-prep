function insertionSort(array) {
  if (array.length < 2) {
    return array;
  }
  for (var i = 1; i < array.length; i++) {
    var tmp = array[i];
    for (var j = i; j > 0; j--) {
      if (array[j-1] <= tmp) {
        break;
      }
      array[j] = array[j-1];
    }
    array[j] = tmp;
  }
  return array;
}