module.exports = function(grunt) {

  require('load-grunt-tasks')(grunt);
	
  // Project configuration.
  grunt.initConfig({
	pkg: grunt.file.readJSON('package.json'),
	creds: grunt.file.readJSON('gitcreds.json'),
	uglify: {
		options: {
			compress: {
				global_defs: {
					"EO_SCRIPT_DEBUG": false
				},
				dead_code: true
				},
			banner: '/*! <%= pkg.title %> <%= pkg.version %> <%= grunt.template.today("yyyy-mm-dd HH:MM") %> */\n'
		},
		build: {
			files: [{
				expand: true,	// Enable dynamic expansion.
				src: ['js/*.js', '!js/*.min.js'], // Actual pattern(s) to match.
				ext: '.min.js',   // Dest filepaths will have this extension.
			}]
		}
	},
	jshint: {
		options: {
			reporter: require('jshint-stylish'),
			globals: {
				"EO_SCRIPT_DEBUG": false,
			},
			 '-W099': true, //Mixed spaces and tabs
			 '-W083': true,//TODO Fix functions within loop
			 '-W082': true, //Todo Function declarations should not be placed in blocks
			 '-W020': true, //Read only - error when assigning EO_SCRIPT_DEBUG a value.
		},
		all: [ 'js/*.js', '!js/*.min.js' ]
  	},

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
 

 	// bump version numbers and push tag to github
	release: {
		options: {
			push: false,
			github: { 
				repo: '<%= pkg.author %>/<%= pkg.name %>', //put your user/repo here
				usernameVar: '<%= creds.username %>', //ENVIRONMENT VARIABLE that contains Github username 
				passwordVar: '<%= creds.password %>' //ENVIRONMENT VARIABLE that contains Github password
			}
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

	// get transifex translations
	transifex: {
		"nav-menu-roles": {
			options: {
				targetDir: "languages",		// download specified resources / langs only
		//		resources: ["localizable_enstrings"],
				languages: ["es"],
				filename : "<%= pkg.name %>-_lang_.json",
		//		templateFn: function(strings) { return "bacon"; }
			}
		}
	},


	// turn po files into mo files
	po2mo: {
		files: {
			src: 'languages/*.po',
			expand: true,
		},
	},

	// automatically update the docs, scripts on change	
	watch: {
		readme: {
			files: ['readme.txt'],
			tasks: ['wp_readme_to_markdown'],
			options: {
			spawn: false,
			},
		  },
		scripts: {
			files: ['js/*.js'],
			tasks: ['newer:jshint','newer:uglify'],
			options: {
			spawn: false,
			},
		  },
	},

});

grunt.registerTask( 'docs', [ 'wp_readme_to_markdown'] );

// bump version numbers 
// grunt release		1.4.1 -> 1.4.2
// grunt release:minor	1.4.1 -> 1.5.0
// grint release:major	1.4.1 -> 2.0.0


grunt.registerTask( 'test', [ 'jshint' ] );
grunt.registerTask( 'build', [ 'test', 'uglify', 'pot', 'po2mo', 'wp_readme_to_markdown', 'clean', 'copy' ] );
grunt.registerTask( 'deploy', [ 'checkbranch:master', 'checkrepo:deploy',  'test', 'wp_readme_to_markdown', 'clean', 'copy', 'wp_deploy' ] );

grunt.registerTask( 'default', [ 'wp_deploy' ] );
};
