module.exports = {
    apps: [
      {
        name: 'mi-suria',
        script: 'node_modules/.bin/next', // Path to the Next.js executable
        args: 'start', // Arguments to pass to the Next.js command (e.g., 'start')
        instances: 'max', // Number of instances to run (use 'max' to match CPU core count)
        exec_mode: 'cluster', // Execution mode (cluster or fork)
        watch: true, // Enable auto-restart on file changes
        env: {
          NODE_ENV: 'production',
          // Add any other environment variables your application needs
        },
      },
    ],
  };
  