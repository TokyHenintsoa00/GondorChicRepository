-- =============================================
-- GONDOR CHIC - Sample Data
-- =============================================

-- Sample clients
INSERT INTO Client (numero_client, nom, prenom, adresse_livraison, adresse_facturation) VALUES
  ('2600000001', 'Sacquet', 'Frodon', NULL, NULL),
  ('2600000002', 'Gamegie', 'Sam', NULL, NULL),
  ('2600000003', 'Took', 'Peregrin', NULL, NULL);

-- Sample products
INSERT INTO Produit (reference_produit, libelle, description, prix_du_jour, quantite_en_stock, est_du_jour, image, categorie_id) VALUES
  ('P001', 'Pantalons elfique hiver', NULL, 20000, 100, TRUE, 'https://example.com/chaudron.jpg', NULL),
  ('P002', 'Pull elfique hiver', NULL, 50000, 50, FALSE, 'https://example.com/anduril.jpg', NULL),
  ('P003', 'Pantalons elfique ete', NULL, 30000, 20, TRUE, 'https://example.com/cape.jpg', NULL);

-- End of sample data
