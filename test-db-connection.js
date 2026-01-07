const { Client } = require('pg');

async function testConnection() {
  const client = new Client({
    host: '127.0.0.1',
    port: 5432,
    database: 'dispatch_dev',
    user: 'dispatch_user',
    password: 'test',
  });

  try {
    console.log('Attempting to connect...');
    await client.connect();
    console.log('✓ Connected successfully');

    const res = await client.query('SELECT current_user, current_database(), version()');
    console.log('✓ Query executed:', res.rows[0]);

    const schemaRes = await client.query(`
      SELECT schema_name, schema_owner
      FROM information_schema.schemata
      WHERE schema_name = 'public'
    `);
    console.log('✓ Public schema info:', schemaRes.rows[0]);

    const permRes = await client.query(`
      SELECT has_schema_privilege('dispatch_user', 'public', 'CREATE') as can_create,
             has_schema_privilege('dispatch_user', 'public', 'USAGE') as can_use
    `);
    console.log('✓ Schema permissions:', permRes.rows[0]);

    await client.end();
    console.log('✓ Connection closed');
  } catch (err) {
    console.error('✗ Error:', err.message);
    process.exit(1);
  }
}

testConnection();
