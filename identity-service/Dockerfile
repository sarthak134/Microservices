FROM openjdk:28-ea-20-slim
RUN mkdir /microservice
COPY ./target/identity-service-0.0.1-SNAPSHOT.jar /microservice
EXPOSE 9898
VOLUME csbmicroservices
CMD ["java","-jar","/microservice/identity-service-0.0.1-SNAPSHOT.jar"]