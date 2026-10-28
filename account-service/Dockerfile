FROM openjdk:28-ea-20-slim
RUN mkdir /microservice
COPY ./target/account-service-0.0.1-SNAPSHOT.jar /microservice
EXPOSE 8082
VOLUME csbmicroservices
CMD ["java","-jar","/microservice/account-service-0.0.1-SNAPSHOT.jar"]