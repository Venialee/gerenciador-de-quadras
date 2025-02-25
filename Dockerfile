# Use the official PostgreSQL image
FROM postgres:latest

# Set environment variables for default database, user, and password
ENV POSTGRES_DB=quadrareservas
ENV POSTGRES_USER=postgres
ENV POSTGRES_PASSWORD=root

# Copy custom configuration files
COPY postgresql.conf /etc/postgresql/postgresql.conf
COPY pg_hba.conf /etc/postgresql/pg_hba.conf

# Expose PostgreSQL default port
EXPOSE 5432

# Start PostgreSQL with custom configuration
CMD ["postgres", "-c", "config_file=/etc/postgresql/postgresql.conf"]