-- Active: 1753683184075@@127.0.0.1@5432@gondor_chic
-- =============================================
-- GONDOR CHIC - Database Schema
-- MCD Implementation
-- =============================================

-- Create Catalogue table
CREATE TABLE Catalogue (
    id SERIAL PRIMARY KEY,
    nom_catalogue VARCHAR(100) NOT NULL
);

-- Create Catégorie table
CREATE TABLE Categorie (
    id SERIAL PRIMARY KEY,
    nom_categorie VARCHAR(100) NOT NULL,
    catalogue_id INT NOT NULL,
    FOREIGN KEY (catalogue_id) REFERENCES Catalogue(id)
);

-- Create Produit table
CREATE TABLE Produit (
    id SERIAL PRIMARY KEY,
    reference_produit VARCHAR(10) NOT NULL,
    libelle VARCHAR(100) NOT NULL,
    description TEXT,
    prix_du_jour DECIMAL(10, 2),
    quantite_en_stock INT DEFAULT 0,
    est_du_jour BOOLEAN DEFAULT FALSE,
    image VARCHAR(255),
    categorie_id INT,
    FOREIGN KEY (categorie_id) REFERENCES Categorie(id)
);

-- Create Client table
CREATE TABLE Client (
    id SERIAL PRIMARY KEY,
    numero_client VARCHAR(10) NOT NULL UNIQUE,
    nom VARCHAR(100) NOT NULL,
    prenom VARCHAR(100) NOT NULL,
    pseudo VARCHAR(50) NOT NULL,
    mdp VARCHAR(255) NOT NULL,
    adresse_livraison VARCHAR(255),
    adresse_facturation VARCHAR(255)
);

-- Create Commande table
CREATE TABLE Commande (
    id SERIAL PRIMARY KEY,
    numero_commande VARCHAR(10) NOT NULL,
    date_commande DATE NOT NULL,
    montant DECIMAL(10, 2),
    statut VARCHAR(50),
    client_id INT NOT NULL,
    FOREIGN KEY (client_id) REFERENCES Client(id)
);

-- Create Ligne_de_commande table
CREATE TABLE Ligne_de_commande (
    id SERIAL PRIMARY KEY,
    quantite INT NOT NULL,
    montant DECIMAL(10, 2),
    commande_id INT NOT NULL,
    produit_id INT NOT NULL,
    FOREIGN KEY (commande_id) REFERENCES Commande(id),
    FOREIGN KEY (produit_id) REFERENCES Produit(id)
);
