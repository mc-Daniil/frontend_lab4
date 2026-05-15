"use strict";
// Реализация
function distance(a, b, c, d) {
    // distance(x1, y1, x2, y2)
    if (typeof a === "number" &&
        typeof b === "number" &&
        typeof c === "number" &&
        typeof d === "number") {
        return Math.sqrt((c - a) ** 2 + (d - b) ** 2);
    }
    // distance(p1, p2)
    if (typeof a !== "number" && typeof b !== "number") {
        return Math.sqrt((b.x - a.x) ** 2 + (b.y - a.y) ** 2);
    }
    throw new Error("Incorrect arguments");
}
console.log(distance(0, 0, 3, 4));
const p1 = { x: 0, y: 0 };
const p2 = { x: 3, y: 4 };
console.log(distance(p1, p2));
