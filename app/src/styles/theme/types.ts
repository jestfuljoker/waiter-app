import { type colors, type font } from './tokens';

type Brand = `brand-${keyof typeof colors.brand}`;
type Gray = `gray-${keyof typeof colors.gray}`;
type Support = `support-${keyof typeof colors.support}`;

export type Color = Brand | Gray | Support;

export type FontSize = keyof typeof font.sizes;

export type FontWeight = keyof typeof font.weight;
