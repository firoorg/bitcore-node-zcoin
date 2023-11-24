#/usr/bin/env bash

echo "This script downloads Zcoin Insight server sources and creates a NodeJS to host the server."
echo "The bitcore-node-zcoin library should be downloaded and accessible from the cwd."
echo "Parameter 1 is used as the new node name. The default new node name is n."
echo

set -x

lib_name=bitcore-node-zcoin

(cd $lib_name; npm i)

node_name=${1-n}

$lib_name/bin/bitcore-node-zcoin create $node_name

cd $node_name

node_modules/bitcore-node-zcoin/bin/bitcore-node-zcoin install firoorg/insight-ui-zcoin
node_modules/bitcore-node-zcoin/bin/bitcore-node-zcoin install firoorg/insight-api-zcoin

find . -name "zcore-lib" -type d -not -path "./node_modules/zcore-lib" | xargs rm -rf

set +x

echo 
echo "Please enter proper settings to the $node_name/bitcore-node-zcoin.json file and use the" 
echo "  cd $node_name; node_modules/bitcore-node-zcoin/bin/bitcore-node-zcoin start"
echo "command to start Insight server."
