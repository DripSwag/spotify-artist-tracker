# Generated by Django 4.1.3 on 2023-05-05 10:44

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0004_artistid'),
    ]

    operations = [
        migrations.AddField(
            model_name='artistid',
            name='name',
            field=models.CharField(default='', max_length=50),
        ),
        migrations.AddField(
            model_name='artistid',
            name='pictureLink',
            field=models.CharField(default='', max_length=100),
        ),
    ]
