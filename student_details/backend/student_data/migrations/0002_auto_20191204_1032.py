# Generated by Django 3.0 on 2019-12-04 10:32

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('student_data', '0001_initial'),
    ]

    operations = [
        migrations.RenameField(
            model_name='student',
            old_name='first_name',
            new_name='firstName',
        ),
        migrations.RenameField(
            model_name='student',
            old_name='last_name',
            new_name='lastName',
        ),
    ]
