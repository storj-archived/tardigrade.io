VERSION := $(shell utils/version)
export VERSION

BRANCH := $(shell git rev-parse --abbrev-ref HEAD | sed "s!/!-!g")
ifeq (${BRANCH_NAME},master)
TAG ?= ${VERSION}
CLUSTER ?= prod
DEPLOYMENT ?= tardigrade-io
else
TAG ?= ${VERSION}-${BRANCH_NAME}
CLUSTER ?= nonprod
DEPLOYMENT ?= staging-tardigrade-io
endif


.PHONY: build
build:
	docker build -t storjlabs/tardigrade.io:${TAG} .

.PHONY: push
ifeq (${BRANCH_NAME},master)
push:
	docker push storjlabs/tardigrade.io:${TAG}
	docker tag storjlabs/tardigrade.io:${TAG} storjlabs/tardigrade.io:$(shell echo '$${VERSION%.*}')
	docker tag storjlabs/tardigrade.io:${TAG} storjlabs/tardigrade.io:$(shell echo '$${VERSION%%.*}')
	docker push storjlabs/tardigrade.io:$(shell echo '$${VERSION%.*}')
	docker push storjlabs/tardigrade.io:$(shell echo '$${VERSION%%.*}')
else
push:
	docker push storjlabs/tardigrade.io:${TAG}
endif

.PHONY: deploy
deploy:
	kubectl --context ${CLUSTER} -n websites patch deployment ${DEPLOYMENT} \
	-p'{"spec":{"template":{"spec":{"containers":[{"name":"www","image":"storjlabs/tardigrade.io:${TAG}"}]}}}}'


.PHONY: clean
clean:
	-docker rmi storjlabs/tardigrade.io:${TAG}
