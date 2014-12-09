# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations
import django.contrib.gis.db.models.fields


class Migration(migrations.Migration):

    dependencies = [
        ('ConsultCafeApp', '0002_auto_20141208_0552'),
    ]

    operations = [
        migrations.AlterField(
            model_name='personlocation',
            name='location',
            field=django.contrib.gis.db.models.fields.PointField(srid=4326),
        ),
    ]
