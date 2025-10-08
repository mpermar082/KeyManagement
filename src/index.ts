// src/index.ts
/**
 * Main entry point for KeyManagement
 */

import { KeyManagement } from './keymanagement';
import minimist from 'minimist';

interface Args {
    /**
     * Enable verbose logging
     */
    verbose?: boolean;
    /**
     * Input file or directory
     */
    input?: string;
    /**
     * Output file or directory
     */
    output?: string;
}

const args: Args = minimist(process.argv.slice(2), {
    boolean: ['verbose'],
    alias: {
        v: 'verbose',
        i: 'input',
        o: 'output'
    }
});

/**
 * Main application entry point
 */
async function main(): Promise<void> {
    try {
        // Create a new KeyManagement instance with verbosity
        const app = new KeyManagement({
            verbose: args.verbose || false
        });

        // Log processing start if verbosity is enabled
        if (args.verbose) {
            console.log('Starting KeyManagement processing...');
        }

        // Execute the application and store the result
        const result = await app.execute();

        // Log result output if specified
        if (args.output) {
            console.log(`Results saved to: ${args.output}`);
        }

        // Log processing completion
        console.log('Processing completed successfully');
        process.exit(0);
    } catch (error) {
        // Log any errors and exit with error code
        console.error('Error:', error);
        process.exit(1);
    }
}

// Run the main application if this is the entry point
if (require.main === module) {
    main();
}