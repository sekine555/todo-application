RM = rm -rf
DOCKER_COMPOSE_FILE = ./docker-compose.local.yml
MYSQL_DATA_DIR = ./docker/db/mysql/data/
TESTDB_DATA_DIR = ./docker/testdb/mysql/data/

# Modify commands for Windows
ifeq ($(OS),Windows_NT)
	RM = cmd.exe /C rd /S /Q
	MYSQL_DATA_DIR = .\docker\db\mysql\data\	
	TESTDB_DATA_DIR = .\docker\testdb\mysql\data\	
endif

# Tear down all services
down:
	docker-compose -f $(DOCKER_COMPOSE_FILE) down --rmi all --volumes --remove-orphans

# Remove database directories
clean:
	-$(RM) $(MYSQL_DATA_DIR)
	-$(RM) $(TESTDB_DATA_DIR)

# Start up all services
up:
	docker-compose -f $(DOCKER_COMPOSE_FILE) up -d --build

# Main target
db: down clean up
