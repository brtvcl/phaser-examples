function scaleValue(range1min, range1max, range2min, range2max, value) {

    // Calculate the normalized value within the first range
    const normalizedValue = (value - range1min) / (range1max - range1min);

    // Scale the normalized value to the second range
    const scaledValue = normalizedValue * (range2max - range2min) + range2min;

    return scaledValue;
}

export { scaleValue };