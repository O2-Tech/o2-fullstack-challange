import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export class CreateAllTables1746592591116 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'products',
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          { name: 'name', type: 'varchar', length: '255', isNullable: false },
          { name: 'description', type: 'text', isNullable: true },
          { name: 'available_quantity', type: 'int', default: 0 },
          {
            name: 'unit_price',
            type: 'decimal',
            precision: 10,
            scale: 2,
            isNullable: false,
          },
          {
            name: 'category',
            type: 'varchar',
            length: '100',
            isNullable: true,
          },
          {
            name: 'created_at',
            type: 'datetime',
            default: 'CURRENT_TIMESTAMP',
          },
        ],
      }),
    );

    await queryRunner.createTable(
      new Table({
        name: 'stock_movements',
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          { name: 'product_id', type: 'int' },
          { name: 'type', type: 'enum', enum: ['in', 'out'] },
          { name: 'quantity', type: 'int', isNullable: false },
          {
            name: 'movement_date',
            type: 'datetime',
            default: 'CURRENT_TIMESTAMP',
          },
        ],
      }),
    );

    await queryRunner.createForeignKey(
      'stock_movements',
      new TableForeignKey({
        columnNames: ['product_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'products',
        onDelete: 'CASCADE',
      }),
    );

    await queryRunner.createTable(
      new Table({
        name: 'sales',
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          {
            name: 'sale_date',
            type: 'datetime',
            default: 'CURRENT_TIMESTAMP',
          },
          {
            name: 'total_value',
            type: 'decimal',
            precision: 10,
            scale: 2,
            isNullable: false,
          },
        ],
      }),
    );

    await queryRunner.createTable(
      new Table({
        name: 'sale_items',
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          { name: 'sale_id', type: 'int' },
          { name: 'product_id', type: 'int' },
          { name: 'quantity', type: 'int' },
          { name: 'unit_price', type: 'decimal', precision: 10, scale: 2 },
        ],
      }),
    );

    await queryRunner.createForeignKeys('sale_items', [
      new TableForeignKey({
        columnNames: ['sale_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'sales',
        onDelete: 'CASCADE',
      }),
      new TableForeignKey({
        columnNames: ['product_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'products',
        onDelete: 'CASCADE',
      }),
    ]);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('sale_items');
    await queryRunner.dropTable('sales');
    await queryRunner.dropTable('stock_movements');
    await queryRunner.dropTable('products');
  }
}
