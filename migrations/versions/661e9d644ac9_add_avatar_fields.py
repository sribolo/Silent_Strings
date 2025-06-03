"""Add avatar fields

Revision ID: 661e9d644ac9
Revises: 86b595641d6d
Create Date: 2024-03-21 10:00:00.000000

"""
from alembic import op
import sqlalchemy as sa
from sqlalchemy.dialects import postgresql

# revision identifiers, used by Alembic.
revision = '661e9d644ac9'
down_revision = '86b595641d6d'
branch_labels = None
depends_on = None

def upgrade():
    # Create new JSON columns
    op.add_column('users', sa.Column('avatar_hair_new', postgresql.JSON(), nullable=True))
    op.add_column('users', sa.Column('avatar_clothes_new', postgresql.JSON(), nullable=True))
    op.add_column('users', sa.Column('avatar_acc_new', postgresql.JSON(), nullable=True))
    op.add_column('users', sa.Column('avatar_face_new', postgresql.JSON(), nullable=True))

    # Convert existing data to JSON format
    op.execute("""
        UPDATE users 
        SET avatar_hair_new = CASE 
            WHEN avatar_hair IS NOT NULL THEN json_build_object('default', json_build_object('name', avatar_hair))
            ELSE NULL 
        END,
        avatar_clothes_new = CASE 
            WHEN avatar_clothes IS NOT NULL THEN json_build_object('default', json_build_object('name', avatar_clothes))
            ELSE NULL 
        END,
        avatar_acc_new = CASE 
            WHEN avatar_acc IS NOT NULL THEN json_build_object('default', json_build_object('name', avatar_acc))
            ELSE NULL 
        END,
        avatar_face_new = CASE 
            WHEN avatar_face IS NOT NULL THEN json_build_object('default', json_build_object('name', avatar_face))
            ELSE NULL 
        END
    """)

    # Drop old columns
    op.drop_column('users', 'avatar_hair')
    op.drop_column('users', 'avatar_clothes')
    op.drop_column('users', 'avatar_acc')
    op.drop_column('users', 'avatar_face')

    # Rename new columns to original names
    op.alter_column('users', 'avatar_hair_new', new_column_name='avatar_hair')
    op.alter_column('users', 'avatar_clothes_new', new_column_name='avatar_clothes')
    op.alter_column('users', 'avatar_acc_new', new_column_name='avatar_acc')
    op.alter_column('users', 'avatar_face_new', new_column_name='avatar_face')

def downgrade():
    # Create new VARCHAR columns
    op.add_column('users', sa.Column('avatar_hair_old', sa.String(120), nullable=True))
    op.add_column('users', sa.Column('avatar_clothes_old', sa.String(120), nullable=True))
    op.add_column('users', sa.Column('avatar_acc_old', sa.String(120), nullable=True))
    op.add_column('users', sa.Column('avatar_face_old', sa.String(120), nullable=True))

    # Convert JSON data back to strings
    op.execute("""
        UPDATE users 
        SET avatar_hair_old = avatar_hair->'default'->>'name',
            avatar_clothes_old = avatar_clothes->'default'->>'name',
            avatar_acc_old = avatar_acc->'default'->>'name',
            avatar_face_old = avatar_face->'default'->>'name'
    """)

    # Drop JSON columns
    op.drop_column('users', 'avatar_hair')
    op.drop_column('users', 'avatar_clothes')
    op.drop_column('users', 'avatar_acc')
    op.drop_column('users', 'avatar_face')

    # Rename old columns back to original names
    op.alter_column('users', 'avatar_hair_old', new_column_name='avatar_hair')
    op.alter_column('users', 'avatar_clothes_old', new_column_name='avatar_clothes')
    op.alter_column('users', 'avatar_acc_old', new_column_name='avatar_acc')
    op.alter_column('users', 'avatar_face_old', new_column_name='avatar_face')
