JPM := jpm
FX := $(shell which firefox)

apos='#'
FX_esc=$(subst ${apos},${apos}"${apos}"${apos},${FX})

all: un-startssl-ify.xpi

un-startssl-ify.xpi: *.js icon*.png package.json .jpmignore
	rm -f jid1-LmWyqIiZsQfskA@jetpack*.xpi
	${JPM} xpi
	mv jid1-LmWyqIiZsQfskA@jetpack*.xpi $@

.PHONY: run test clean

run:
	${JPM} -b '${FX_esc}' run

test:
	${JPM} -b '${FX_esc}' test

clean:
	rm -f *.xpi
