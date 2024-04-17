
# How to build

```bash
yarn build-keycloak-theme    
```

# How to test

launch the command
```bash
docker-compose up -d
```
If the  container is previously launched, we stop it beforehand with the command
```bash
docker-compose down
``` 

# How to deploy

Clone the repository [Keycloack](https://github.com/science4tech/keycloak) and  all the content files found inside the dist_keycloak folder to the flavor/theme folder of the cloned repository
