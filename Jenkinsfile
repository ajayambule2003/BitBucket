pipeline {
    agent any

    environment {
        REMOTE_SERVER = 'http://localhost:3030'
        REMOTE_PATH = 'A:/Github/BitBucket'
        SSH_PRIVATE_KEY = credentials('git@github.com:ajayambule2003/BitBucket.git')  
        GIT_REPO = 'https://github.com/ajayambule2003/BitBucket.git'
    }

    stages {
        stage('Clone Repository') {
            steps {
                
                git branch: 'main', url: "${GIT_REPO}"
            }
        }
        
        stage('Install Dependencies') {
            steps {
                script {
                    
                    sh 'npm install'
                }
            }
        }
        
        stage('Run Tests') {
            steps {
                script {
                    
                    sh 'npm test'
                }
            }
        }
        
        stage('Deploy to Remote Server') {
            steps {
                script {
                    
                    sh 'tar -czf app.tar.gz .'
 
                    sh """
                        scp -i ${SSH_PRIVATE_KEY} app.tar.gz ${REMOTE_SERVER}:${REMOTE_PATH}
                    """
 
                    sh """
                        ssh -i ${SSH_PRIVATE_KEY} ${REMOTE_SERVER} <<EOF
                            cd ${REMOTE_PATH}
                            tar -xzf app.tar.gz
                            cd your-app-folder
                            npm install
                            pm2 restart node_app || pm2 start app.js --name "node_app"
                        EOF
                    """
                }
            }
        }
    }

    post {
        always {
            echo 'Pipeline completed.'
        }
        success {
            echo 'Deployment was successful!'
        }
        failure {
            echo 'Deployment failed. Check the logs.'
        }
    }
}
