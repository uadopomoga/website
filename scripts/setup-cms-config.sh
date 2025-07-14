#!/bin/bash

NODE_ENV=${NODE_ENV:-"development"}

echo "Setting up CMS config for environment: $NODE_ENV"

if [[ "$NODE_ENV" == "production" ]]; then
    echo "Using production config..."
    cp public/admin/config.prod.yml public/admin/config.yml
elif [[ "$NODE_ENV" == "development" ]]; then
    echo "Using development config..."
    cp public/admin/config.dev.yml public/admin/config.yml
else
    echo "Unknown environment: $NODE_ENV."
    echo "Should be 'development' or 'production'"
    exit 1
fi

echo "CMS config setup complete!"
