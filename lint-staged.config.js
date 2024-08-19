function escapeDollar(filepath) {
	return filepath.replace(/\$/g, "\\$");
}

export default {
	"src/**/*.{js,jsx,ts,tsx}": (filenames) => [
		`prettier --w ${filenames.map(escapeDollar).join(" ")} --ignore-unknown --check`,
		`eslint --fix ${filenames.map(escapeDollar).join(" ")}`,
	],
	"src/**/*.scss": (filenames) => `stylelint --fix ${filenames.map(escapeDollar).join(" ")}`,
};
