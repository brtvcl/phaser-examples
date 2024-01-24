export const PRIMARY_WEAPONS = {
    AR: "AR", // M4A1
    AK: "AK", // Kalashnikov
    M4: "M4" // Shotgun
};

export const AMMO_TYPES = {
    HEAVY: "HEAVY",
    LIGHT: "LIGHT",
    SHOTGUN: "SHOTGUN",
}

export const PRIMARY_WEAPONS_CONFIG = {
    AR: {
        fireRate: 15,
        magazineCapacity: 25,
        ammo: AMMO_TYPES.LIGHT,
        heatMap: {
            10: 0,
            20: -2,
            30: -4,
            40: -5,
            50: -3,
            60: -1,
            70: 0,
            80: 1,
            90: 2
        }
    },
    AK: {
        fireRate: 12,
        magazineCapacity: 30,
        ammo: AMMO_TYPES.HEAVY,
        heatMap: {
            10: 0,
            20: -2,
            30: -4,
            40: -5,
            50: -3,
            60: -1,
            70: 0,
            80: 1,
            90: 2
        }
    },
    M4: {
        fireRate: 1,
        magazineCapacity: 5,
        ammo: AMMO_TYPES.SHOTGUN,
        heatMap: {
            10: 0,
            20: -2,
            30: -4,
            40: -5,
            50: -3,
            60: -1,
            70: 0,
            80: 1,
            90: 2
        }
    }
};


export const ammoTypeItemMap = {
    HEAVY: "HEAVY_AMMO",
    LIGHT: "LIGHT_AMMO",
    SHOTGUN: "SHOTGUN_AMMO"
};

// Player slots
export const SLOTS = {
    PRIMARY: "PRIMARY",
    SECONDARY: "SECONDARY",
    HEALING: "HEALING",
    UTIL: "UTIL",
}

export const SECONDARY_WEAPONS = {
    GLOCK: "GLOCK"
}

export const SECONDARY_WEAPONS_CONFIG = {
    GLOCK: {
        fireRate: 15,
        magazineCapacity: 19,
        ammo: AMMO_TYPES.LIGHT,
    },
};