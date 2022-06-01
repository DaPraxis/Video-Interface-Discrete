// loop-based factorial function
export function factorial(n) {
    if (n < 0 || n !== Math.floor(n)) {
        throw Error("factorial requires nonnegative integer, received " + n);
    }
    let curr = 1;
    for (let i = 1; i <= n; i++) {
        curr *= i;
    }
    return curr
}

/**
 * used https://medium.com/@aiswaryamathur/find-the-n-th-permutation-of-an-ordered-string-using-factorial-number-system-9c81e34ab0c8
 * to figure out algorithm
 */
export function numToPermutation(n, size) {
    n = (n + factorial(size)) % factorial(size);  // make sure 0 <= n < factorial(size)
    let indices = [];  // final permutation
    let choices = [];  // numbers yet to be added to permutation
    for (let i = 0; i < size; i ++) {
        choices.push(i);
    }  // at the beginning, every number is yet to be added
    for (let i = size - 1; i >= 0; i--) {
        // next factoriadic digit, aka which index to get from choices
        let currIndex = Math.floor(n / factorial(i));
        indices.push(choices.splice(currIndex, 1)[0]);
        n = n % factorial(i);
    }
    return indices;
}

export function randomPermutation(size) {
    return numToPermutation(Math.floor(Math.random() * factorial(size)), size);
}
