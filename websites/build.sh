# Build the "thw" project
cd thw
yarn install --production --frozen-lockfile
yarn build
cd ..

echo "Successfully built website 'thw'"

