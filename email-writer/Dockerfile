# Stage 1: Build with Maven
FROM maven:3.9.9-eclipse-temurin-21 AS build
WORKDIR /app
COPY pom.xml .
RUN mvn dependency:go-offline

COPY src ./src
RUN mvn clean package -DskipTests


RUN ls -la /app/target/

# Stage 2: Run with JDK
FROM eclipse-temurin:21-jdk


WORKDIR /app
COPY --from=build /app/target/email-writer-0.0.1-SNAPSHOT.jar .
EXPOSE 8080
ENTRYPOINT ["java", "-jar", "email-writer-0.0.1-SNAPSHOT.jar"]
