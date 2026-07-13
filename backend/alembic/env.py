import os
import sys
from logging.config import fileConfig
from sqlalchemy import engine_from_config, pool
from alembic import context
from dotenv import load_dotenv

# ================= 1. PATH CONFIGURATION (ALWAYS FIRST) =================
# Aap abhi 'backend' folder ke andar hain, toh BASE_DIR 'backend' hoga.
BASE_DIR = os.path.abspath(os.path.join(os.path.dirname(__file__), ".."))
sys.path.append(BASE_DIR)

# .env file ko safely load karein
load_dotenv(os.path.join(BASE_DIR, ".env"))

# ================= 2. MODEL IMPORTS (AFTER PATHS ARE SET) =================
# Hamesha path append karne ke baad import karein. 
# 'backend' folder ke andar khade hain, isliye direct 'app' se shuru hoga.
from app.core.database import Base
from app.models.user import User
from app.models.document import Document

# ================= 3. ALEMBIC CONFIGURATION =================
# context.config ko instantiate karne ke baad hi options set kar sakte hain.
config = context.config

# .env se DATABASE_URL uthakar alembic configuration me injection karein
config.set_main_option(
    "sqlalchemy.url",
    os.getenv("DATABASE_URL")
)

# Interpret the config file for Python logging.
if config.config_file_name is not None:
    fileConfig(config.config_file_name)

# Model's MetaData object for 'autogenerate' support
target_metadata = Base.metadata

# ================= 4. MIGRATION RUNNERS =================

def run_migrations_offline() -> None:
    """Run migrations in 'offline' mode."""
    url = config.get_main_option("sqlalchemy.url")
    context.configure(
        url=url,
        target_metadata=target_metadata,
        literal_binds=True,
        dialect_opts={"paramstyle": "named"},
    )

    with context.begin_transaction():
        context.run_migrations()

def run_migrations_online() -> None:
    """Run migrations in 'online' mode."""
    connectable = engine_from_config(
        config.get_section(config.config_ini_section, {}),
        prefix="sqlalchemy.",
        poolclass=pool.NullPool,
    )

    with connectable.connect() as connection:
        context.configure(
            connection=connection, 
            target_metadata=target_metadata
        )

        with context.begin_transaction():
            context.run_migrations()

if context.is_offline_mode():
    run_migrations_offline()
else:
    run_migrations_online()