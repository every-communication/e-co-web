export const getSemanticColor = (color: string): string => {
	const semanticColor = window.getComputedStyle(document.documentElement).getPropertyValue(color).trim();
	if (!semanticColor) throw new Error(`Semantic color ${color} not found`);
	return semanticColor;
};
