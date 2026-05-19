# Commandes utiles — Backend GondorChic

## Lancer l'application

```powershell
.\mvnw spring-boot:run
```
```terminal
mvnw spring-boot:run
```

## Seeder la base de données

Insère les clients de test (Leporteur, Lebrave, Pippin) avec leurs mots de passe encodés.
N'écrase pas les entrées existantes (idempotent).

```powershell
.\mvnw spring-boot:run "-Dspring-boot.run.profiles=seed"
```
```terminal
mvnw spring-boot:run "-Dspring-boot.run.profiles=seed"
```

| Pseudo | Mot de passe |
|--------|--------------|
| Leporteur | !totoXXS |
| Lebrave | titiXXL |
| Pippin | tataXS! |
| Necromancien | saruXXS! |
