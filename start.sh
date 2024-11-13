docker stop $(docker container ls -aq)
docker build . -t dndventuress/mental-toughness-quiz
docker login
docker tag dndventuress/mental-toughness-quiz dndventuress/mental-toughness-quiz:latest
docker images | grep dndventuress/mental-toughness-quiz
docker push dndventuress/mental-toughness-quiz