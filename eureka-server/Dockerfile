FROM openjdk:28-ea-20-slim
RUN mkdir /microservice
COPY ./target/eureka-server-0.0.1-SNAPSHOT.jar /microservice
EXPOSE 8761
VOLUME csbmicroservices
CMD ["java","-jar","/microservice/eureka-server-0.0.1-SNAPSHOT.jar"]