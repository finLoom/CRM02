

DB Cloud Clusters



Try these steps:

First, exit your current psql session:

    \q

Connect to the database as the postgres user:

    psql -U postgres -d brisa

Once connected as postgres, create the schema and grant permissions:

    sql CREATE SCHEMA bb;
    GRANT ALL ON SCHEMA bb TO budi;
    ALTER SCHEMA bb OWNER TO budi;
    ALTER DEFAULT PRIVILEGES IN SCHEMA bb GRANT ALL ON TABLES TO budi;

Verify the schema was created:

    \dn

Exit postgres session:

    \q



Example:

    brisa=# CREATE SCHEMA bb;
    CREATE SCHEMA
    brisa=# GRANT ALL ON SCHEMA bb TO budi;
    ALTER SCHEMA bb OWNER TO budi;
    ALTER DEFAULT PRIVILEGES IN SCHEMA bb GRANT ALL ON TABLES TO budi;
    GRANT
    ALTER SCHEMA
    ALTER DEFAULT PRIVILEGES
    brisa=# \dn
List of schemas
Name  |       Owner       
--------+-------------------
bb     | budi
public | pg_database_owner
(2 rows)
