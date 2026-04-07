export function validateId(req, res, next) {
    // Försök att extrahera ID från olika möjliga parametrar
  const { userId, id, orderId } = req.params;
    
  const value = userId || id || orderId;
// Validera att ID är i korrekt format (t.ex. UUID)
  const uuidRegex = /^[0-9a-fA-F-]{36}$/;
    // Om ID inte finns eller inte matchar det förväntade formatet, returnera ett fel
  if (!value || !uuidRegex.test(value)) {
    return res.status(400).json({
      error: "Invalid ID format"
    });
  }

  next();
}