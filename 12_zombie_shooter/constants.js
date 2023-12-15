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
    },
    AK: {
        fireRate: 12,
        magazineCapacity: 30,
        ammo: AMMO_TYPES.HEAVY,
    },
    M4: {
        fireRate: 1,
        magazineCapacity: 5,
        ammo: AMMO_TYPES.SHOTGUN
    }
};


export const ammoTypeItemMap = {
    HEAVY: "HEAVY_AMMO",
    LIGHT: "LIGHT_AMMO",
    SHOTGUN: "SHOTGUN_AMMO"
};
