import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";
import prettier from "eslint-config-prettier/flat";

export default defineConfig([
	...nextVitals,
	...nextTs,
	prettier,
	{
		rules: {
			"react/react-in-jsx-scope": "off"
		}
	},
	globalIgnores([".next/**", "out/**", "build/**", "next-env.d.ts"])
]);
