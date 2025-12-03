
export const name = "2025-10-18-02_create_branches";

export async function up(conn) {
  await conn.execute(`
    CREATE TABLE IF NOT EXISTS branches (
      id INT AUTO_INCREMENT PRIMARY KEY,
      company_id INT NOT NULL,
      name VARCHAR(191) NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      INDEX idx_branches_company_id (company_id),
      CONSTRAINT fk_branches_company_id FOREIGN KEY (company_id)
        REFERENCES companies(id) ON DELETE CASCADE
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
  `);
}
