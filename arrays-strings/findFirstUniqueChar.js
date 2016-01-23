function findFirstUniqueChar(inputStr) {
  var charMap = {},
      len = inputStr.length;

  for (var i = 0; i < len; i++) {
    var c = inputStr[i];
    if (c in charMap) {
      charMap[c] = -1;
    } else {
      charMap[c] = i;
    }
  }

  for (var j = 0; j < len ; j++) {
    if (charMap[inputStr[j]] > -1) {
      return inputStr[j];
    }
  }
  
  return null;
}