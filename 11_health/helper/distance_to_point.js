function distance_to_point(x1, y1, x2, y2) {
    let dx = Math.abs(x1 - x2);
    let dy = Math.abs(y1 - y2);
    return Math.sqrt(dx**2 + dy**2);
};

export default distance_to_point;