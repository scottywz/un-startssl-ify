JPM := jpm

all: un-startssl-ify.xpi

un-startssl-ify.xpi: *.js icon*.png package.json
	rm -f jid1-LmWyqIiZsQfskA@jetpack*.xpi
	${JPM} xpi
	mv jid1-LmWyqIiZsQfskA@jetpack*.xpi $@
