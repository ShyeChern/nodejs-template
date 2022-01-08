/**
 * Merge sort
 * Use when array size is large (size > 10)
 * @param {array} arr Array to sort
 * @param {string} field Field name to search if it is array of object. Optional
 * @param {boolean} isReverse Sort array in descending. Default to false (ascending)
 * @param {function} primer Function to convert the value. Optional
 * @returns sorted array
 */
module.exports.mergeSort = (arr, { field, isReverse, primer } = { isReverse: false }) => {
	// helper function to merge two array in order
	const merge = (left, right) => {
		const results = [];
		let key;
		if (field) {
			key = primer ? (x) => primer(x[field]) : (x) => x[field];
		} else {
			key = primer ? (x) => primer(x) : (x) => x;
		}
		// break out loop if one of the array gets empty
		while (left.length && right.length) {
			// Pick the smaller among the smallest element of left and right sub arrays
			if (!isReverse && key(left[0]) < key(right[0])) {
				// ascending
				results.push(left.shift());
			} else if (isReverse && key(left[0]) > key(right[0])) {
				// descending
				results.push(left.shift());
			} else {
				results.push(right.shift());
			}
		}
		// Concatenating the leftover elements in case didn't go through entire left or right array
		return [...results, ...left, ...right];
	};

	// base case
	if (arr.length < 2) {
		return arr;
	}
	const mid = Math.floor(arr.length / 2);
	const left = this.mergeSort(arr.slice(0, mid), { field, isReverse, primer });
	const right = this.mergeSort(arr.slice(mid), { field, isReverse, primer });
	return merge(left, right);
};

/**
 * Find the index of the value in array. The array must be sorted
 * @param {array} arr Sorted array
 * @param {*} value value to find
 * @param {string} field Field name to search if it is array of object. Optional
 * @returns index of the array, -1 if not found
 */
module.exports.binarySearch = (arr, value, field) => {
	let start = 0;
	let end = arr.length - 1;
	while (start <= end) {
		const middle = Math.floor((start + end) / 2);
		let current;
		if (field) {
			current = arr[middle][field];
		} else {
			current = arr[middle];
		}
		if (current === value) {
			// found the value
			return middle;
		} else if (current < value) {
			// continue searching to the right
			start = middle + 1;
		} else {
			// search searching to the left
			end = middle - 1;
		}
	}
	// not found
	return -1;
};
