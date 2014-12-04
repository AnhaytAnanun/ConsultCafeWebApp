# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations
import django.contrib.gis.db.models.fields


class Migration(migrations.Migration):

    dependencies = [
        ('ConsultCafeApp', '0002_resto_kitchen'),
    ]

    operations = [
        migrations.CreateModel(
            name='Business',
            fields=[
                ('name', models.CharField(max_length=50, unique=True, serialize=False, primary_key=True)),
                ('wage', models.IntegerField()),
                ('income', models.IntegerField()),
                ('created', models.DateTimeField()),
                ('updated', models.DateTimeField()),
            ],
            options={
            },
            bases=(models.Model,),
        ),
        migrations.CreateModel(
            name='Person',
            fields=[
                ('username', models.CharField(max_length=50, unique=True, serialize=False, primary_key=True)),
                ('age', models.IntegerField()),
                ('sex', models.IntegerField()),
                ('busType', models.CharField(max_length=50)),
                ('kitchen', models.CharField(max_length=50)),
                ('nationality', models.CharField(max_length=50)),
                ('token', models.CharField(unique=True, max_length=32)),
                ('created', models.DateTimeField()),
                ('updated', models.DateTimeField()),
            ],
            options={
            },
            bases=(models.Model,),
        ),
        migrations.CreateModel(
            name='PersonLocation',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('location', django.contrib.gis.db.models.fields.PolygonField(srid=4326)),
                ('created', models.DateTimeField()),
                ('username', models.ForeignKey(to='ConsultCafeApp.Person')),
            ],
            options={
            },
            bases=(models.Model,),
        ),
        migrations.CreateModel(
            name='RentRect',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('rect', models.IntegerField()),
                ('rent', django.contrib.gis.db.models.fields.PolygonField(srid=4326)),
                ('created', models.DateTimeField()),
                ('updated', models.DateTimeField()),
            ],
            options={
            },
            bases=(models.Model,),
        ),
        migrations.AlterField(
            model_name='resto',
            name='type',
            field=models.ForeignKey(to='ConsultCafeApp.Business'),
        ),
    ]
