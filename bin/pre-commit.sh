#!/bin/bash

lint_files() {
	linting_command=$1
	files=$2

	if [ -n "$files" ] && ! $linting_command $files; then
		exit 1
	fi
}

staged_files=$( git diff --staged --diff-filter=d --name-only )

# Lint staged PHP files.
php_files=$( echo "$staged_files" | grep -E '/*\.php$' )
lint_files "npm run lint:php" "$php_files"

# Lint staged JS files.
js_files=$( echo "$staged_files" | grep -E '^src\/\S*\.js$' )
lint_files "npm run lint:js:files" "$js_files"

# Lint package.json.
if ! npm run lint:pkg-json; then
	exit 1
fi
