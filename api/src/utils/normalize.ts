/**
 * Normalizes a string by converting to lowercase and removing diacritics, then removes extra whitespace.
 *
 * @param str - the input string to be normalized
 * @return the normalized string
 */
export function normalizeString(str: string): string {
	const normalizedString = str
		.toLowerCase()
		.normalize('NFD')
		.replace(/[\u0300-\u036f]/g, '');

	const trimmedString = normalizedString.trim();

	return trimmedString;
}
