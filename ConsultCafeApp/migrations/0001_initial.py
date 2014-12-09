# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations
import django.contrib.gis.db.models.fields


class Migration(migrations.Migration):

    dependencies = [
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
        migrations.CreateModel(
            name='Resto',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('name', models.CharField(max_length=50)),
                ('kitchen', models.CharField(max_length=50)),
                ('location', django.contrib.gis.db.models.fields.PointField(srid=4326)),
                ('customers', models.FloatField()),
                ('wages', models.IntegerField()),
                ('rent', models.IntegerField()),
                ('income', models.IntegerField()),
                ('area', models.FloatField()),
                ('created', models.DateTimeField()),
                ('updated', models.DateTimeField()),
                ('type', models.ForeignKey(to='ConsultCafeApp.Business')),
            ],
            options={
            },
            bases=(models.Model,),
        ),
    ]
