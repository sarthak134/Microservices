pipeline {
    agent any

    environment {
        // Your exact Docker and Kubernetes paths
        PATH = "C:\\Users\\HP\\AppData\\Local\\Programs\\DockerDesktop\\resources\\bin;C:\\ProgramData\\chocolatey\\bin;${env.PATH}"

        DOCKER_USER = 'sarthakjos134'
        DOCKER_CREDS = 'dockerhub-credentials'
        TAG = 'latest'
    }

    stages {
        stage('1. Checkout Code') {
            steps {
                echo 'Pulling code from GitHub...'
                git branch: 'main', url: 'https://github.com/sarthak134/Microservices.git'
            }
        }

        stage('2. Build Backend (Maven Wrapper)') {
            steps {
                echo 'Verifying and packaging backend JARs...'
                script {
                    bat '''
                    cd eureka-server && if exist mvnw.cmd (call mvnw.cmd package -DskipTests)
                    cd ..
                    cd gateway && if exist mvnw.cmd (call mvnw.cmd package -DskipTests)
                    cd ..
                    cd identity-service && if exist mvnw.cmd (call mvnw.cmd package -DskipTests)
                    cd ..
                    cd account-service && if exist mvnw.cmd (call mvnw.cmd package -DskipTests)
                    cd ..
                    cd customer-service && if exist mvnw.cmd (call mvnw.cmd package -DskipTests)
                    cd ..
                    '''
                }
            }
        }

        stage('3. Build Frontend (React)') {
            steps {
                echo 'Building React Vite frontend...'
                dir('banking-frontend-jwt') {
                    bat 'npm install --legacy-peer-deps'
                    bat 'npm run build'
                }
            }
        }

        stage('4. Docker Build & Push') {
            steps {
                echo 'Building and pushing images to Docker Hub...'
                withCredentials([usernamePassword(credentialsId: "${DOCKER_CREDS}", passwordVariable: 'DOCK_PASS', usernameVariable: 'DOCK_USER')]) {
                    bat 'docker login -u %DOCK_USER% -p %DOCK_PASS%'

                    // 1. Eureka Server
                    bat "docker build -t ${DOCKER_USER}/eurekaserverimage:${TAG} ./eureka-server"
                    bat "docker push ${DOCKER_USER}/eurekaserverimage:${TAG}"

                    // 2. Gateway
                    bat "docker build -t ${DOCKER_USER}/getwayimages:${TAG} ./gateway"
                    bat "docker push ${DOCKER_USER}/getwayimages:${TAG}"

                    // 3. Auth Service
                    bat "docker build -t ${DOCKER_USER}/identityserviceimage:${TAG} ./identity-service"
                    bat "docker push ${DOCKER_USER}/identityserviceimage:${TAG}"

                    // 4. Account Service
                    bat "docker build -t ${DOCKER_USER}/accountserviceimage:${TAG} ./account-service"
                    bat "docker push ${DOCKER_USER}/accountserviceimage:${TAG}"

                    // 5. Customer Service
                    bat "docker build -t ${DOCKER_USER}/customerserviceimage:${TAG} ./customer-service"
                    bat "docker push ${DOCKER_USER}/customerserviceimage:${TAG}"

                    // 6. Bank Portal (Frontend)
                    bat "docker build -t ${DOCKER_USER}/bankfrontend:${TAG} ./banking-frontend-jwt"
                    bat "docker push ${DOCKER_USER}/bankfrontend:${TAG}"
                }
            }
        }

        stage('5. Deploy to Kubernetes') {
            steps {
                echo 'Applying deployment to Kubernetes...'
                bat 'kubectl apply -f k8s -n bankapp'
            }
        }
    }

    post {
        success {
            echo '🎉 Fullstack Microservices successfully deployed to Kubernetes!'
        }
        failure {
            echo '❌ Pipeline failed. Check the stage logs above.'
        }
    }
}