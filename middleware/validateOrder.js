import db from "../data/db.js";

export function validateOrder(req, res, next) {
  const { items } = req.body || {};
    // 1. Kontrollera att items finns och är en icke-tom array
  if (!items || !Array.isArray(items) || items.length === 0) {
    return res.status(400).json({
      error: "Order must contain at least one item",
    });
  }
  // 2. Validera varje item i ordern
  for (const item of items) {
    const { productId, quantity, price } = item;

    if (!productId || !quantity || price == null) {
      return res.status(400).json({
        error: "Each item must include productId, quantity and price",
      });
    }

    if (quantity < 1) {
      return res.status(400).json({
        error: "Quantity must be at least 1",
      });
    }
    // 3. Hämta produktdata från databasen och jämför priset
    const product = db
      .prepare("SELECT * FROM products WHERE id = ?")
      .get(productId);

    if (!product) {
      return res.status(400).json({
        error: `Product with id ${productId} does not exist`,
      });
    }

    if (product.price !== price) {
      return res.status(400).json({
        error: `Price mismatch for product ${productId}`,
      });
    }
  }
  // Om alla valideringar passerar, fortsätt till nästa middleware eller route handler
  next();
}