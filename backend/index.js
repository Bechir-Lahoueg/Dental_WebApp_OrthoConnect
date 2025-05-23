const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const PDFDocument = require('pdfkit'); // Importer PDFKit
const fs = require('fs');
const app = express();
const port = 3001; // Port du backend

// Middleware
app.use(cors());
app.use(express.json());

// Connexion à MySQL
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'dentiste-db'
});

db.connect(err => {
  if (err) {
    console.error('Erreur de connexion à la base de données:', err);
    return;
  }
  console.log('Connexion à la base de données réussie');
});

//------------l'authentification de login----------------------
app.post('/api/login', (req, res) => {
  const { email, password } = req.body;

  const sql = 'SELECT * FROM user WHERE email = ? AND password = ?';
  db.query(sql, [email, password], (err, results) => {
    if (err) {
      console.error('Erreur lors de la vérification de l\'utilisateur:', err);
      res.status(500).send({ success: false, message: 'Erreur interne du serveur' });
      return;
    }

    if (results.length > 0) {
      // Utilisateur trouvé, connexion réussie
      res.json({ success: true, message: 'Connexion réussie', user: results[0] });
    } else {
      // Aucune correspondance trouvée
      res.status(401).json({ success: false, message: 'Email ou mot de passe incorrect' });
    }
  });
});

//-------------l'authentification de login (Prothésiste)------------------
app.post('/api/loginprothesiste', (req, res) => {
  const { email, password } = req.body;

  const sql = 'SELECT * FROM prothesiste WHERE email = ? AND password = ?';
  db.query(sql, [email, password], (err, results) => {
    if (err) {
      console.error('Erreur lors de la vérification du prothésiste:', err);
      res.status(500).send({ success: false, message: 'Erreur interne du serveur' });
      return;
    }

    if (results.length > 0) {
      // Prothésiste trouvé, connexion réussie
      res.json({ success: true, message: 'Connexion réussie', user: results[0] });
    } else {
      // Aucune correspondance trouvée
      res.status(401).json({ success: false, message: 'Email ou mot de passe incorrect' });
    }
  });
});

//---------------------------reset password----------------------------
//----------dentiste--------------
// Route pour réinitialiser le mot de passe
app.post('/reset-password', (req, res) => {
  const { email, secretCode, newPassword } = req.body;

  // Vérifier si l'email existe
  const checkEmailQuery = 'SELECT * FROM user WHERE email = ?';
  db.query(checkEmailQuery, [email], (err, results) => {
    if (err) {
      return res.status(500).json({ message: 'Erreur du serveur' });
    }
    
    if (results.length === 0) {
      return res.status(404).json({ message: 'Email non trouvé' });
    }

    // Vérifier le code secret
    const user = results[0];
    if (user.secret_code !== secretCode) {
      return res.status(400).json({ message: 'Code secret incorrect' });
    }

    // Mettre à jour le mot de passe dans la base de données sans le hacher
    const updatePasswordQuery = 'UPDATE user SET password = ? WHERE email = ?';
    db.query(updatePasswordQuery, [newPassword, email], (err, results) => {
      if (err) {
        return res.status(500).json({ message: 'Erreur lors de la mise à jour du mot de passe' });
      }

      return res.status(200).json({ message: 'Mot de passe réinitialisé avec succès' });
    });
  });
});

//------------prothesiste---------------
// Route pour réinitialiser le mot de passe des prothésistes
app.post('/reset-password-prothesiste', (req, res) => {
  const { email, secretCode, newPassword } = req.body;

  // Vérifier si l'email existe
  const checkEmailQuery = 'SELECT * FROM prothesiste WHERE email = ?';
  db.query(checkEmailQuery, [email], (err, results) => {
    if (err) {
      return res.status(500).json({ message: 'Erreur du serveur' });
    }
    
    if (results.length === 0) {
      return res.status(404).json({ message: 'Email non trouvé' });
    }

    // Vérifier le code secret
    const prothesiste = results[0];
    if (prothesiste.secret_code !== secretCode) {
      return res.status(400).json({ message: 'Code secret incorrect' });
    }

    // Mettre à jour le mot de passe dans la base de données sans le hacher
    const updatePasswordQuery = 'UPDATE prothesiste SET password = ? WHERE email = ?';
    db.query(updatePasswordQuery, [newPassword, email], (err, results) => {
      if (err) {
        return res.status(500).json({ message: 'Erreur lors de la mise à jour du mot de passe' });
      }

      return res.status(200).json({ message: 'Mot de passe réinitialisé avec succès' });
    });
  });
});


// -----------------CRUD pour les patients------------------

//--------- Récupérer tous les patients
app.get('/api/patients', (req, res) => {
  db.query('SELECT * FROM patients', (err, results) => {
    if (err) {
      console.error(err);
      res.status(500).send({ error: 'Erreur de récupération des patients' });
      return;
    }
    res.json(results);
  });
});

//--------- Ajouter un nouveau patient
app.post('/api/patients', (req, res) => {
  const { name, age, email } = req.body;

  // ---------Validation des données
  if (!name || !age || !email) {
    return res.status(400).json({ error: 'Nom, âge et email sont requis' });
  }

  const sql = 'INSERT INTO patients (name, age, email) VALUES (?, ?, ?)';
  db.query(sql, [name, age, email], (err, results) => {
    if (err) {
      console.error(err);
      res.status(500).send({ error: 'Erreur d\'ajout du patient' });
      return;
    }
    res.status(201).json({ patient: { id: results.insertId, name, age, email } });
  });
});

// -------------Mettre à jour un patient
app.put('/api/patients/:id', (req, res) => {
  const { id } = req.params;
  const { name, age, email } = req.body;

  // ------------Validation des données
  if (!name || !age || !email) {
    return res.status(400).json({ error: 'Nom, âge et email sont requis' });
  }

  const sql = 'UPDATE patients SET name = ?, age = ?, email = ? WHERE id = ?';
  db.query(sql, [name, age, email, id], (err, results) => {
    if (err) {
      console.error(err);
      res.status(500).send({ error: 'Erreur de mise à jour du patient' });
      return;
    }
    if (results.affectedRows === 0) {
      return res.status(404).json({ error: 'Patient non trouvé' });
    }
    res.json({ message: 'Patient mis à jour avec succès' });
  });
});

// ----------------Supprimer un patient
app.delete('/api/patients/:id', (req, res) => {
  const { id } = req.params;

  db.query('DELETE FROM patients WHERE id = ?', [id], (err, results) => {
    if (err) {
      console.error(err);
      res.status(500).send({ error: 'Erreur de suppression du patient' });
      return;
    }
    if (results.affectedRows === 0) {
      return res.status(404).json({ error: 'Patient non trouvé' });
    }
    res.json({ message: 'Patient supprimé avec succès' });
  });
});

//-----------------------------gestion Demande--------------------------
// Route pour récupérer les demandes
app.get('/get-demandes/:userId', (req, res) => {
  const userId = req.params.userId;

  const query = 'SELECT * FROM demandes WHERE userId = ?';
  db.query(query, [userId], (err, results) => {
    if (err) {
      console.error('Erreur lors de la récupération des demandes:', err);
      return res.status(500).json({ error: 'Erreur serveur' });
    }
    res.json(results);
  });
});

// Route pour ajouter une demande
app.post('/add-demande', (req, res) => {
  const { type, description, size, quantity, contenance, dueDate, price, userId } = req.body;

  const query = `
    INSERT INTO demandes (type, description, size, quantity, contenance, dueDate, price, status, userId)
    VALUES (?, ?, ?, ?, ?, ?, ?, 'En attente', ?)
  `;
  const values = [type, description, size, quantity, contenance, dueDate, price, userId];

  db.query(query, values, (err, result) => {
    if (err) {
      console.error('Erreur lors de l\'ajout de la demande:', err);
      return res.status(500).json({ error: 'Erreur serveur lors de l\'ajout de la demande' });
    }
    res.json({
      id: result.insertId,
      type,
      description,
      size,
      quantity,
      contenance,
      dueDate,
      price,
      status: 'En attente',
      userId
    });
  });
});

// Route pour mettre à jour le statut de la demande (Accepter/Rejeter avec prix)
app.put('/update-demande/:demandeId', (req, res) => {
  const demandeId = req.params.demandeId;
  const { status, price } = req.body; // Status: "Accepté" ou "Rejeté"

  const query = 'UPDATE demandes SET status = ?, price = ? WHERE id = ?';
  db.query(query, [status, price || null, demandeId], (err, result) => {
    if (err) {
      console.error('Erreur lors de la mise à jour de la demande:', err);
      return res.status(500).json({ error: 'Erreur serveur lors de la mise à jour de la demande' });
    }
    res.json({ message: `Demande ${status}`, id: demandeId });
  });
});

// Route pour récupérer les demandes acceptées
app.get('/api/demandes/accepted', (req, res) => {
  const query = 'SELECT * FROM demandes WHERE status = "Accepté"';
  db.query(query, (err, results) => {
    if (err) {
      console.error('Erreur lors de la récupération des demandes:', err);
      return res.status(500).json({ error: 'Erreur interne du serveur' });
    }
    res.json(results);  // Retourner les demandes acceptées
  });
});

// Route pour mettre à jour le produit final d'une demande
app.put('/api/demandes/update/:id', (req, res) => {
  const { id } = req.params;
  const { final_product } = req.body; // Nouveau produit final envoyé dans le body

  const query = 'UPDATE demandes SET final_product = ? WHERE id = ?';
  db.query(query, [final_product, id], (err, result) => {
    if (err) {
      console.error('Erreur lors de la mise à jour du produit final:', err);
      return res.status(500).json({ error: 'Erreur interne du serveur' });
    }
    if (result.affectedRows > 0) {
      res.status(200).json({ message: 'Produit final mis à jour avec succès' });
    } else {
      res.status(404).json({ error: 'Demande non trouvée' });
    }
  });
});

//-----------------------facture-----------------------
app.get('/api/invoices', (req, res) => {
  const { startDate, endDate } = req.query;
  
  console.log("Paramètres reçus : ", { startDate, endDate });  // Ajoutez cette ligne pour vérifier les paramètres

  if (!startDate || !endDate) {
    return res.status(400).json({ error: 'Les dates de début et de fin sont obligatoires' });
  }

  const query = `
    SELECT id, type, description, size, quantity, contenance, dueDate, price, status, userId, creation_date
    FROM demandes
    WHERE status = 'Accepté' 
    AND DATE(creation_date) BETWEEN ? AND ?
  `;

  db.query(query, [startDate, endDate], (err, results) => {
    if (err) {
      console.error('Erreur de la requête SQL:', err);
      return res.status(500).json({ error: 'Erreur serveur' });
    }

    if (results.length === 0) {
      return res.status(404).json({ message: 'Aucune demande trouvée dans cette période' });
    }

    res.json(results);  // Envoi des résultats au frontend
  });
});

// Route pour générer la facture en PDF
app.get('/api/invoices/:id/pdf', (req, res) => {
  const invoiceId = req.params.id;

  // Récupérer les informations de la facture depuis la base de données
  const query = 'SELECT * FROM invoices WHERE id = ?';
  db.query(query, [invoiceId], (err, results) => {
    if (err) {
      console.error('Erreur lors de la récupération de la facture:', err);
      return res.status(500).json({ error: 'Erreur serveur' });
    }

    if (results.length === 0) {
      return res.status(404).json({ error: 'Facture non trouvée' });
    }

    const invoice = results[0];

    // Créer un document PDF
    const doc = new PDFDocument();

    // Définir le nom du fichier PDF
    const fileName = `facture_${invoice.id}.pdf`;
    const filePath = `./uploads/${fileName}`;

    // Créer un fichier PDF sur le serveur
    doc.pipe(fs.createWriteStream(filePath));

    // Ajouter des informations à la facture
    doc.fontSize(18).text('Facture', { align: 'center' });
    doc.moveDown();
    doc.fontSize(12).text(`ID Facture: ${invoice.id}`);
    doc.text(`Type: ${invoice.type}`);
    doc.text(`Description: ${invoice.description}`);
    doc.text(`Quantité: ${invoice.quantity}`);
    doc.text(`Prix: ${invoice.price} EUR`);
    doc.text(`Date de création: ${invoice.creation_date}`);
    doc.text(`Date d\'échéance: ${invoice.dueDate}`);
    
    // Fin du document
    doc.end();

    // Envoyer le PDF au client
    doc.on('finish', () => {
      res.download(filePath, fileName, (err) => {
        if (err) {
          console.error('Erreur lors du téléchargement de la facture:', err);
        }
        // Optionnel : Supprimer le fichier après le téléchargement
        fs.unlink(filePath, (err) => {
          if (err) {
            console.error('Erreur lors de la suppression du fichier PDF:', err);
          }
        });
      });
    });
  });
});

// Route pour générer et télécharger le PDF de la facture
app.post('/api/generate-pdf', async (req, res) => {
  const { demandes, total } = req.body;

  // Créer un nouveau document PDF
  const doc = new PDFDocument({ margin: 50 });

  // Format de la date (November 28, 2024 )
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  const formattedDate = new Date().toLocaleDateString('en-US', options);

  // En-tête de la facture
  doc.fontSize(26).font('Helvetica-Bold').text('Facture de Demandes Acceptées', { align: 'center' });
  doc.fontSize(12).font('Helvetica').text(`Date de génération : ${formattedDate}`, { align: 'right' });
  doc.moveDown(2);

  // Informations du dentiste (Exemple)
  doc.fontSize(12).font('Helvetica').text('Dentiste : Nom du Dentiste', { align: 'left' });
  doc.text('Adresse : Exemple, Rue de la Santé', { align: 'left' });
  doc.text('Téléphone : +216 000 000 000', { align: 'left' });
  doc.moveDown(1);

  // Tableau des demandes
  doc.fontSize(14).font('Helvetica-Bold').text('Détails des demandes', { underline: true });
  doc.moveDown(1);

  // Tableau avec bordures
  const tableTop = doc.y;
  const tableLeft = 50;
  const tableWidth = 500;
  const rowHeight = 20;
  const columnWidths = [150, 150, 150, 100];  // Largeur des colonnes : Demande, Type, Description, Prix
  const rows = demandes.map(demande => [
    `${demande.type}`,        // Nom ou code de la demande
    `${demande.description}`,           // Type de demande
    new Date(demande.creation_date).toLocaleDateString('en-US', options),    // Formater la date de création
    `${demande.price} TND`,      // Prix de la demande
  ]);

  // Fonction pour dessiner les lignes du tableau
  const drawTable = () => {
    doc.fontSize(10).font('Helvetica');

    // Entête du tableau
    doc.rect(tableLeft, tableTop, columnWidths[0], rowHeight).stroke();
    doc.text('Type', tableLeft + 5, tableTop + 5);

    doc.rect(tableLeft + columnWidths[0], tableTop, columnWidths[1], rowHeight).stroke();
    doc.text('Description', tableLeft + columnWidths[0] + 5, tableTop + 5);

    doc.rect(tableLeft + columnWidths[0] + columnWidths[1], tableTop, columnWidths[2], rowHeight).stroke();
    doc.text('Creation Date', tableLeft + columnWidths[0] + columnWidths[1] + 5, tableTop + 5);

    doc.rect(tableLeft + columnWidths[0] + columnWidths[1] + columnWidths[2], tableTop, columnWidths[3], rowHeight).stroke();
    doc.text('Price', tableLeft + columnWidths[0] + columnWidths[1] + columnWidths[2] + 5, tableTop + 5);

    // Dessiner les lignes pour chaque ligne de données
    rows.forEach((row, index) => {
      const yPos = tableTop + (index + 1) * rowHeight;

      row.forEach((cell, colIndex) => {
        doc.rect(tableLeft + columnWidths.slice(0, colIndex).reduce((a, b) => a + b, 0), yPos, columnWidths[colIndex], rowHeight).stroke();
        doc.text(cell, tableLeft + columnWidths.slice(0, colIndex).reduce((a, b) => a + b, 0) + 5, yPos + 5);
      });
    });
  };

  // Dessiner le tableau
  drawTable();

  // Montant total
  doc.moveDown(2);
  doc.fontSize(14).font('Helvetica-Bold').text(`Montant total : ${total} TND`, { align: 'right' });

  // Ligne de séparation avant de finir
  doc.moveDown(2);
  doc.fontSize(12).font('Helvetica').text('--------------------------------------');

  // Finaliser et envoyer le PDF
  res.setHeader('Content-Type', 'application/pdf');
  res.setHeader('Content-Disposition', 'attachment; filename=facture.pdf');

  doc.pipe(res);
  doc.end();
});



// Lancer le serveur
app.listen(port, () => {
  console.log(`Backend démarré sur http://localhost:${port}`);
});
