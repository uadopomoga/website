#!/bin/bash

ENV=${NODE_ENV:-"dev"}

echo "Setting up CMS config for environment: $ENV"

if [[ "$ENV" == "main" ]] || [[ "$ENV" == "production" ]]; then
    echo "Using production config..."
    cp public/admin/config.prod.yml public/admin/config.yml
elif [[ "$ENV" == "dev" ]] || [[ "$ENV" == "development" ]]; then
    echo "Using development config..."
    cp public/admin/config.dev.yml public/admin/config.yml
else
    echo "Unknown environment: $ENV. Using development config as fallback..."
    cp public/admin/config.dev.yml public/admin/config.yml
fi

echo "CMS config setup complete!"
