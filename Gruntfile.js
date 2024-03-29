module.exports = function(grunt) {

  require('load-grunt-tasks')(grunt);
	
  // Project configuration.
  grunt.initConfig({
	pkg: grunt.file.readJSON('package.json'),

	clean: {
		//Clean up build folder
		main: ['build/**']
	},

	copy: {
		// Copy the plugin to a versioned release directory
		main: {
			src:  [
				'**',
				'!*~',
				'!node_modules/**',
				'!build/**',
				'!.git/**','!.gitignore','!.gitmodules',
				'!tests/**',
				'!vendor/**',
				'!src/**',
				'!Gruntfile.js','!package.json','!package-lock.json',
				'!composer.lock','!composer.phar','!composer.json',
				'!CONTRIBUTING.md',
				'!gitcreds.json',
				'!.gitignore',
				'!.gitmodules',
				'!*~',
				'!*.sublime-workspace',
				'!*.sublime-project',
				'!*.transifexrc',
				'!deploy.sh',
				'!languages/.tx',
				'!languages/tx.exe',
				'!README.md',
				'!.wordpress-org/**',
				'!.github/**',
			],
			dest: 'build/'
		},
	},

	// Make a zipfile.
	compress: {
		main: {
			options: {
				mode: 'zip',
				archive: 'deploy/<%= pkg.name %>-<%= pkg.version %>.zip',
			},
			expand: true,
			cwd: 'build/',
			dest: '<%= pkg.name %>',
			src: [ '**/*' ]
		},
	},

	// bump version numbers
	replace: {
		Version: {
			src: [
				'readme.txt',
				'readme.md',
				'<%= pkg.name %>.php'
			],
			overwrite: true,
			replacements: [
				{ 
					from: /\*\*Stable tag:\*\* .*/,
					to: "**Stable tag:** <%= pkg.version %>  "
				},
				{
					from: /Stable tag: .*/,
					to: "Stable tag: <%= pkg.version %>"
				},
				{ 
					from: /Version:.\d+(\.\d+)+/,
					to: "Version: <%= pkg.version %>"
				},
				{ 
					from: /public \$version = \'.*/,
					to: "public $version = '<%= pkg.version %>';"
				},
				{
					from: /CONST VERSION = \'.*/,
					to: "CONST VERSION = '<%= pkg.version %>';"
				}
			]
		}
	},

    // Documentation
	wp_readme_to_markdown: {
		convert:{
			files: {
				'readme.md': 'readme.txt'
			},
		},
	},

	// # Internationalization 

	// Add text domain
	addtextdomain: {
		textdomain: '<%= pkg.name %>',
		target: {
			files: {
				src: ['*.php', '**/*.php', '!node_modules/**', '!build/**']
			}
		}
	},

  });

  grunt.registerTask( 'docs', [ 'wp_readme_to_markdown'] );
  grunt.registerTask( 'build', [ 'replace', 'clean', 'copy' ] );
  grunt.registerTask( 'deploy', [ 'build', 'compress' ] );
  grunt.registerTask( 'release', [ 'deploy', 'clean' ] );
  grunt.registerTask( 'zip', [ 'clean', 'copy', 'compress' ] );

};
