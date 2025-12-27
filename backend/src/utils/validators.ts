/**
 * Validates Riot Games PUUID format.
 * PUUIDs are UUIDs without dashes (32 hexadecimal characters).
 */

export const isValidPUUID = (puuid: string): boolean => {
    const puuidRegex = /^[a-zA-z0-9-]{32,78}$/;
    return puuidRegex.test(puuid);
};

/**
 * Validates Riot ID format (name#tag).
 * Name: 3-16 characters (letters, numbers, spaces, underscores, hyphens)
 * Tag: 3-5 digits
 */
export const isValidRiotId = (name: string, tag: string): boolean => {
    const nameRegex = /^.{3,16}$/;
    const tagRegex = /^[a-zA-Z0-9]{3,5}$/;
    return nameRegex.test(name) && tagRegex.test(tag);
};
