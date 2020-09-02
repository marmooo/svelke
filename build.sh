dir=docs
cp -r src/* $dir
minify src/index.html > $dir/index.html
minify src/svelke.js > $dir/svelke.js

