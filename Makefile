.PHONY: build
build:
	yarn build

deploy: build
	rm -rf deploy/dist deploy/images
	cp -r dist/ deploy/dist
	cp -r images/ deploy/images
	cp index.html deploy/index.html
	docker build -t whistle-invader deploy
	docker stop whistle-invader || echo "no container to stop"
	docker rm whistle-invader || echo "no container to remove"
	docker run --name whistle-invader -p 2999:80 --restart always -d whistle-invader
