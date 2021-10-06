#! /bin/sh -e

if [ "$PROCFILE" = "new-client/Procfile" ]; then
    yarn workspace bca_nhs_client build
fi
