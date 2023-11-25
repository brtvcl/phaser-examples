/**
 * Checks for collision of rectangle to rectangle.
 * @param {Object} r1
 * @param {number} r1.x
 * @param {number} r1.y
 * @param {number} r1.w
 * @param {number} r1.h
 * @param {Object} r2
 * @param {number} r2.x
 * @param {number} r2.y
 * @param {number} r2.w
 * @param {number} r2.h
 */
export function rectangle_to_rectangle(r1, r2) {
	if (r1.x < r2.x + r2.w && r1.x + r1.w > r2.x && r1.y < r2.y + r2.h && r1.h + r1.y > r2.y) {
		// Collision
		return true;
	};

	// No collision
	return false;
}