-- =============================================
-- GONDOR CHIC - Sample Data
-- =============================================

-- Catalogues
INSERT INTO Catalogue (nom_catalogue) VALUES
  ('Vêtements elfiques'),
  ('Vêtements feeriques');

-- Categories
INSERT INTO Categorie (nom_categorie, catalogue_id) VALUES
  ('Vêtements elfiques hiver', (SELECT id FROM Catalogue WHERE nom_catalogue = 'Vêtements elfiques' LIMIT 1)),
  ('Vêtements elfiques été', (SELECT id FROM Catalogue WHERE nom_catalogue = 'Vêtements elfiques' LIMIT 1)),
  ('Vêtements féériques hiver', (SELECT id FROM Catalogue WHERE nom_catalogue = 'Vêtements feeriques' LIMIT 1)),
  ('Vêtements féériques été', (SELECT id FROM Catalogue WHERE nom_catalogue = 'Vêtements feeriques' LIMIT 1));

-- Products
INSERT INTO Produit (reference_produit, libelle, description, prix_du_jour, quantite_en_stock, est_du_jour, image, categorie_id) VALUES
  ('PEH001', 'Pantalons elfiques hiver', NULL, 20000, 100, TRUE, NULL, (SELECT id FROM Categorie WHERE nom_categorie = 'Vêtements elfiques hiver' LIMIT 1)),
  ('PEH002', 'Pulls elfiques hiver', NULL, 50000, 50, FALSE, NULL, (SELECT id FROM Categorie WHERE nom_categorie = 'Vêtements elfiques hiver' LIMIT 1)),
  ('PEE001', 'Pantalons elfiques été', NULL, 30000, 20, TRUE, NULL, (SELECT id FROM Categorie WHERE nom_categorie = 'Vêtements elfiques été' LIMIT 1)),
  ('CEH001', 'Chemises elfiques hiver', NULL, 45000, 35, FALSE, NULL, (SELECT id FROM Categorie WHERE nom_categorie = 'Vêtements elfiques été' LIMIT 1)),
  ('PFH001', 'Pantalons féériques hiver', NULL, 22000, 80, TRUE, NULL, (SELECT id FROM Categorie WHERE nom_categorie = 'Vêtements féériques hiver' LIMIT 1)),
  ('PFH002', 'Pulls féériques hiver', NULL, 52000, 40, FALSE, NULL, (SELECT id FROM Categorie WHERE nom_categorie = 'Vêtements féériques hiver' LIMIT 1)),
  ('PFE001', 'Pantalons féériques été', NULL, 32000, 25, TRUE, NULL, (SELECT id FROM Categorie WHERE nom_categorie = 'Vêtements féériques été' LIMIT 1)),
  ('CFH001', 'Chemisiers féériques hiver', NULL, 48000, 15, FALSE, NULL, (SELECT id FROM Categorie WHERE nom_categorie = 'Vêtements féériques hiver' LIMIT 1));

-- End of sample data
