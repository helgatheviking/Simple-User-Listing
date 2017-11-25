module.exports = function(grunt) {

  require('load-grunt-tasks')(grunt);
	
  // Project configuration.
  grunt.initConfig({
	pkg: grunt.file.readJSON('package.json'),

	clean: {
		//Clean up build folder
		main: ['build/<%= pkg.name %>']
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
				'!Gruntfile.js','!package.json',
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
				'!wp-assets/**'
			],
			dest: 'build/<%= pkg.name %>/'
		},
	},
	
    checkrepo: {
    	deploy: {
            tag: {
                eq: '<%= pkg.version %>',    // Check if highest repo tag is equal to pkg.version
            },
            tagged: true, // Check if last repo commit (HEAD) is not tagged
            clean: true,   // Check if the repo working directory is clean
        }
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

	// deploy to wordpress.org
    wp_deploy: {
    	deploy:{
            options: {
        		svn_user: '<%= pkg.author %>',
        		plugin_slug: '<%= pkg.name %>',
        		build_dir: 'build/<%= pkg.name %>/',
        		temp_path: "D:/SVN/",
            },
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

	// Generate .pot file
	makepot: {
		target: {
			options: {
				domainPath: '/languages', // Where to save the POT file.
				exclude: ['build'], // List of files or directories to ignore.
				mainFile: '<%= pkg.name %>.php', // Main project file.
				potFilename: '<%= pkg.name %>.pot', // Name of the POT file.
				type: 'wp-plugin' // Type of project (wp-plugin or wp-theme).
			}
		}
	},


	// turn po files into mo files
	po2mo: {
		files: {
			src: 'languages/*.po',
			expand: true,
		},
	}

});

grunt.registerTask( 'docs', [ 'wp_readme_to_markdown'] );

grunt.registerTask( 'build', [ 'test', 'replace', 'makepot', 'po2mo', 'clean', 'copy' ] );
grunt.registerTask( 'deploy', [ 'build', 'checkbranch:master', 'checkrepo:deploy', 'build', 'wp_deploy' ] );

};
