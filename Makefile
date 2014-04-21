CFX := cfx

all: un-startssl-ify.xpi

un-startssl-ify.xpi: data/* lib/*.js package.json
	$(CFX) xpi --force-mobile
