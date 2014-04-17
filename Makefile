JSCOMPILER='uglifyjs'
CSSMINIFIER='cleancss'

.PHONY: all dist pages

all: dist

dist:
	$(JSCOMPILER) src/gameoflife.js > dist/gameoflife.min.js

pages: dist
	$(CSSMINIFIER) example/style.css > style.css
	cp example/index.html index.html
	sed -i 's@\.\./src/gameoflife.js@dist/gameoflife.min.js@g' index.html

