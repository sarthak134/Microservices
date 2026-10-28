FROM openjdk:28-ea-20-slim
RUN mkdir /microservice
COPY ./target/customer-service-0.0.1-SNAPSHOT.jar /microservice
EXPOSE 8081
VOLUME csbmicroservices
CMD ["java","-jar","/microservice/customer-service-0.0.1-SNAPSHOT.jar"]