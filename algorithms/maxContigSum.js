'use strict';

/**
 * Problem: Given an input of n floating-point numbers, return the maximum sum
 * found in any contiguous subarray of the input.
 **/

/**
 * Restrictions: Numbers can be negative, positive or zero.
 * Cases:
 *  - empty array: 0
 *  - all positives: sum of all numbers
 *  - all negatives: 0
 **/

/**
 * Algorithm 1: Naive
 * 
 * Iterate over all pairs of integers i,j s.t. 0<=i<j<=n, calculating the sum
 * of all elements between the ith and jth elements. Update the maximum sum.
 *
 * Runtime complexity: O(n^3)
 * Space complexity: O(1)
 **/

function mcs1(x) {
  let max = 0;
  for (let i = 0; i < x.length; i++) {
    for (let j = i; j < x.length; j++) {
      let sum = 0;
      for (let k = i; k <= j; k++) {
        sum += x[k];
      }
      max = Math.max(max, sum);
    }
  }
  return max;
}

/**
 * Algorithm 2: Quadratic Algorithm 1
 * 
 * Iterate over all pairs of integers i,j as in the naive algorithm above.
 * Calculate the sum of all elements between the ith and jth elements simply by
 * adding the newest element to the sum so far. Update the maximum sum.
 *
 * Runtime complexity: O(n^2)
 * Space complexity: O(1)
 **/

function mcs2(x) {
  let max = 0;
  for (let i = 0; i < x.length; i++) {
    let sumSoFar = 0;
    for (let j = i; j < x.length; j++) {
      sumSoFar += x[j];
      max = Math.max(max, sumSoFar);
    }
  }
  return max;
}

/**
 * Algorithm 3: Quadratic Algorithm 2
 *
 * Iterate over all pairs of integers i,j as in the naive algorithm above,
 * storing the cumulative sum up to element k in an array. Take the difference
 * of two cumulative sums to obtain the sum between elements i and j.
 *
 * Runtime complexity: O(n^2)
 * Space complexity: O(n)
 */

function mcs3(x) {
  let max = 0;
  let cumSums = [x[0]];

  for (let k = 1; k < x.length; k++) {
    cumSums[k] = cumSums[k - 1] + x[k];
  }

  for (let i = 0; i < x.length; i++) {
    for (let j = i; j < x.length; j++) {
      let sumSoFar = cumSums[j] - (i > 0 ? cumSums[i-1] : 0);
      max = Math.max(max, sumSoFar);
    }
  }
  return max;
}

/**
 * Algorithm 4: Divide and Conquer
 *
 * Divide the array in half and find the max sum for the left and right. Then
 * find the max sum for the middle and take the max of the three.
 *
 * Runtime complexity: O(n log n)
 * Space Complexity: O(1)
 */

function mcs4(x) {
  function mcs4Helper(i, j) {
    if (i > j) { return 0; } // Empty array
    if (i === j) { return Math.max(0, x[i]); } // Single element array

    let m = Math.floor((i + j) / 2);

    let lmax = 0;
    let sumSoFar = 0;
    // Moving leftward from the middle, find the max sum
    for (let a = m; a >= i; a--) {
      sumSoFar += x[a];
      lmax = Math.max(lmax, sumSoFar);
    }
    let rmax = 0;
    sumSoFar = 0;
    // Moving rightward from the middle, find the max sum
    for (let b = m + 1; b <= j; b++) {
      sumSoFar += x[b];
      rmax = Math.max(rmax, sumSoFar);
    }

    return Math.max(mcs4Helper(i, m), mcs4Helper(m + 1, j), lmax + rmax);
  }
  return mcs4Helper(0, x.length - 1);
}

/**
 * Algorithm 5: Scanning
 *
 * Let maxSoFar be the MCS of an array and maxEndingHere be the MCS ending at
 * the last element of the array (maxEndingHere should always be >= 0 because it
 * either includes at least one element or none). Assume that maxSoFar and
 * maxEndingHere are known for the array x[0,n-1). Then to find the MCS for
 * x[0,n) we must find the max of the new maxEndingHere and the old maxSoFar.
 * 
 **/

 function mcs5(x) {
  let maxSoFar = 0;
  let maxEndingHere = 0;
  for (let i = 0; i < x.length; i++) {
    maxEndingHere = Math.max(maxEndingHere + x[i], 0);
    maxSoFar = Math.max(maxSoFar, maxEndingHere);
  }
  return maxSoFar;
 }

(function test() {
  let x1 = [];
  let x2 = [-40];
  let x3 = [31, -41, 59, 26, -53, 58, 97, -93, -23, 84];

  console.log(`Testing mcs1([${x1}]) --> ${mcs1(x1) === 0}`);
  console.log(`Testing mcs2([${x1}]) --> ${mcs2(x1) === 0}`);
  console.log(`Testing mcs3([${x1}]) --> ${mcs3(x1) === 0}`);
  console.log(`Testing mcs4([${x1}]) --> ${mcs4(x1) === 0}`);
  console.log(`Testing mcs5([${x1}]) --> ${mcs4(x1) === 0}`);

  console.log("\n");

  console.log(`Testing mcs1([${x2}]) --> ${mcs1(x2) === 0}`);
  console.log(`Testing mcs2([${x2}]) --> ${mcs2(x2) === 0}`);
  console.log(`Testing mcs3([${x2}]) --> ${mcs3(x2) === 0}`);
  console.log(`Testing mcs4([${x2}]) --> ${mcs4(x2) === 0}`);
  console.log(`Testing mcs5([${x2}]) --> ${mcs4(x2) === 0}`);

  console.log("\n");
  
  console.log(`Testing mcs1([${x3}]) --> ${mcs1(x3) === 187}`);
  console.log(`Testing mcs2([${x3}]) --> ${mcs2(x3) === 187}`);
  console.log(`Testing mcs3([${x3}]) --> ${mcs3(x3) === 187}`);
  console.log(`Testing mcs4([${x3}]) --> ${mcs4(x3) === 187}`);
  console.log(`Testing mcs5([${x3}]) --> ${mcs4(x3) === 187}`);
})();