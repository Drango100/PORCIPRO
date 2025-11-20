// ...existing code...
export async function up(conn) {
  // Insertar módulo principal Porcicola
  const [result] = await conn.execute(`
    INSERT INTO modules (name, parent_id, created_at)
    VALUES ('Porcicultura', 1, NOW());
  `);

  const porcicolaId = result.insertId;

  // Lista de submódulos
  const submodules = [
    'Inventario Porcicola',
    'Fertilidad',
    'Sanidad',
    'Nutrición',
    'Engorde',
    'Producción',
    'Mortalidad',
    'Lotes',
    'Granjas'
  ];

  // Insertar submódulos
  for (const name of submodules) {
    await conn.execute(
      `INSERT INTO modules (name, parent_id, created_at) VALUES (?, ?, NOW())`,
      [name, porcicolaId]
    );
  }
}
// ...existing code...