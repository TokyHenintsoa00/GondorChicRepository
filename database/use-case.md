# Diagramme de cas d'utilisation

```mermaid
flowchart LR
    actor(["Client Web"])

    subgraph sys["Système GondorChic"]
        UC1("S'identifier")
        UC2("Afficher la page d'accueil")
        UC3("Voir le produit du jour")
        UC4("Se déconnecter")
    end

    actor --> UC1
    actor --> UC4
    UC1 -->|"include"| UC2
    UC2 -->|"include"| UC3
```
